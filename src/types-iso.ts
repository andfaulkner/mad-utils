import * as moment from 'moment';
import { DecoratorError } from './error';

/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new(...args: any[]): {};
}

// For cases where something truly can be any value (contrast with the most common
// case where 'any' is used in lieu of determining a highly complex type)
export type RealAny = any;

export interface SingletonInterface<U> {
    new(...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}

/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export const isNonexistentOrString = (val: RealAny): boolean =>
    (typeof val === 'undefined') || (val === null) || (typeof val === 'string');

/**
 * Returns true if the given argument is a number or a string that can be parsed into a number.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} arg - item being tested for number-like nature.
 * @return {boolean} True if item is number-like, otherwise false.
 */
export const isNumberLike = (arg: RealAny): boolean => {
    if (typeof arg === 'number' && !isNaN(arg)) return true;
    if (typeof arg === 'string') {
        if (arg.replace('.', '').replace(/^\-/, '').match(/\D/)) return false;
        // Let '.123' and '-.123' type strings through.
        let cleanArg = arg.match(/^\.\d/) ? '0' + arg : arg;
        cleanArg = arg.match(/^\-\.\d/) ? arg.replace(/^-./, '-0.') : cleanArg;
        return !isNaN(parseInt(cleanArg, 10));
    }
    return false;
};

/**
 * Returns true if the given arguments is a moment instance, Date instance, or any string that
 * moment is able to parse. Excludes negative numbers and strings that parse to negative numbers,
 * and objects with date-irrelevant keys.
 *
 * @param {any} arg - Item to test for Date-like properties
 * @return {boolean} True if item is date-like.
 */
export const isDateLike = (arg: RealAny): boolean => {
    if ((arg instanceof moment) || (arg instanceof Date)) return true;
    if ((typeof arg === 'number' && arg < 0) || (typeof arg === 'string' && parseInt(arg) < 0)) {
        return false;
    }
    if (typeof arg === 'object' && Object.keys(arg).find(key =>
        !key.match(/((hours?)|(minutes?)|((milli)?seconds?)|(days?)|(dates?)|(months?)|(years?))/))
    ) {
        return false;
    }
    return (moment(arg) as any)._isValid;
};

/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export const isArray = (value: RealAny): boolean => {
    // Fully compliant ES5, ES6, ES7, ES8 ES[+] environments
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
           && value.constructor
           && (value.constructor.name === 'Array'
               // All ES5 and higher environments
               || (Object.getPrototypeOf && Object.getPrototypeOf(value.constructor) === Array)
               // Pre-ES5 web browsers
               || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
};

/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export const isInt = (val: RealAny): boolean => {
    const valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
                        : (valAsFloat | 0) === valAsFloat;
};

/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
export const singleton = <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => {
    if (varargs.length > 0) {
        throw new DecoratorError('Can only apply @singleton to classes', 'singleton', constructor);
    }
    const SingletonClass = class SingletonClass extends constructor {
        private static _instance: SingletonClass = null;

        public static new = (...args: any[]) => {
            if (!SingletonClass._instance) {
                SingletonClass._instance = new SingletonClass(...args);
            }
            return SingletonClass._instance;
        }

        constructor(...args: any[]) {
            if (SingletonClass._instance) return SingletonClass._instance;
            super(...args);
            SingletonClass._instance = this;
            return SingletonClass._instance;
        }
    }

    Object.defineProperty(SingletonClass, 'name', { value: constructor.name });
    return SingletonClass as (SingletonInterface<any> & typeof constructor);
};

export { isMultilangTextObj } from './object';
