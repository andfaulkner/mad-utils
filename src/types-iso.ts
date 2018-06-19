/******************************************** IMPORTS *********************************************/
import * as moment from 'moment';
import {isVerbose} from 'env-var-helpers';
import {matches} from './string';
import * as Polyglot from 'node-polyglot';

/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new (...args: any[]): {};
}

export interface SingletonInterface<U> {
    new (...args: any[]): U;
    new <Y>(...args: any[]): Y;
}

// For cases where something truly can be any value
export type RealAny = any;
export {RealAny as Any};

/**
 * Union aliases
 */
export type StrOrNum = string | number;
export type StrOrNever = string | never;
export type StrOrVoid = string | void;
export type StrOrErr = string | Error;

/**
 * Alias to indicate variable injected by a decorator
 */
export type Injection<T> = T;
export {Injection as OptionalInjection};
export {Injection as RequiredInjection};
export {Injection as MandatoryInjection};

/**
 * Extend to (optionally) include Polyglot
 */
export interface PolyglotProps {
    polyglot?: Readonly<Polyglot>;
}

// Record / Hash aliases
export type StringHash = Record<string, string>;
export type StringNumHash = Record<string, number>;

export type BoolOrError = boolean | Error;
export {BoolOrError as BoolOrErr};
export {BoolOrError as ErrOrBool};
export {BoolOrError as ErrorOrBool};
export {BoolOrError as ErrorOrBoolean};
export {BoolOrError as BooleanOrError};

/*************************************** HTTP REQUEST TYPES ***************************************/
/**
 * Most commonly used HTTP Request types
 */
export type CommonHTTPRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export {CommonHTTPRequestType as MainHTTPRequestType};
export {CommonHTTPRequestType as CommonRequestType};

/**
 * All (known) HTTP Request types
 */
export type AnyHTTPReqType = CommonHTTPRequestType | 'OPTIONS' | 'TRACE' | 'CONNECT' | 'HEAD';
export {AnyHTTPReqType as HTTPRequestType};

/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string
 *  @param {StrOrVoid|RealAny} val Value to type check
 *  @return {boolean} true if val is null, undefined, or a string
 */
export const isVoidOrString = (val: StrOrVoid | RealAny): val is undefined | null | string =>
    typeof val === 'undefined' || val === null || isString(val);

/**
 * Detect whether given value is a number. (Note: NaN returns false here)
 * @param {any} val Test if val is a number
 * @return {boolean} If given value is a number, return true; otherwise return false
 */
export const isNumber = <T extends number | Number = number>(val: RealAny): val is T => {
    if (typeof val === 'undefined' || val == null) return false;

    if (typeof val === 'number' && !isNaN(val)) return true;
    if (Object.getPrototypeOf(val) === Number && !isNaN(val)) return true;
    if (val instanceof Number) return true;

    return false;
};

export {isNumber as isNum};

/**
 * Returns true if the given argument is a number or a string that can be parsed into a number
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers
 * @param {RealAny} val Item being tested for number-like nature
 * @return {boolean} True if item is 'number-like', otherwise false
 */
export const isNumberLike = <T extends number | Number | string | String = number>(
    val: RealAny
): val is T => {
    if (typeof val === 'undefined' || val == null) return false;
    if (isNumber(val)) return true;

    if (isString(val)) {
        if (
            val
                .replace('.', '')
                .replace(/^\-/, '')
                .match(/\D/)
        ) {
            return false;
        }

        // Allow strings in e.g. '.123' and '-.123' format to pass
        let cleanVal = val.match(/^\.\d/) ? '0' + val : val;
        cleanVal = val.match(/^\-\.\d/) ? val.replace(/^-./, '-0.') : cleanVal;

        return !isNaN(parseInt(cleanVal, 10));
    }

    return false;
};

export {isNumberLike as isNumLike};

/**
 * Returns true if given value is an integer (does not include num-like strings)
 * @param {any} val Value to check type of
 * @return {boolean} true if given value is integer
 */
export const isInteger = <T extends number | Number | string | String = number>(
    val: RealAny
): val is T => {
    if (Number.isInteger) return Number.isInteger(val);
    return typeof isNumber(val) && isFinite(val) && Math.floor(val) === val;
};

export {isInteger as isInt};

/**
 * True if val is an integer or a string that can be converted to an integer
 * @param {any} val Item to test
 * @return {boolean} true if tested item is integer-like (or an integer)
 */
export const isIntegerLike = <T extends number | Number | string | String = number>(
    val: RealAny
): val is T => {
    if (isInteger(val)) return true;
    if (!isNumberLike(val)) return false;

    const vStr = val.toString();
    if (!matches(/\./g)(vStr) || vStr.endsWith('.')) return true;

    const strSplitOnDots = vStr.split('.');
    if (strSplitOnDots.length === 2) return !!strSplitOnDots[1].match(/^0*$/g);
    return false;
};

export {isIntegerLike as isIntLike};

/**
 * True if val is a string or String-inheriting object
 * @param {any} val Value to test
 * @return {boolean} true if tested item is a string or String-inheriting object
 */
export const isString = <T extends string | String = string>(val: RealAny): val is T =>
    typeof val === 'string' ||
    (val != null &&
        typeof val === 'object' &&
        (Object.prototype.toString.call(val) === '[object String]' ||
            (val.constructor && Object.getPrototypeOf(val.constructor) === String)));
/**
 * True if val is a string or a number
 * @param {any} val Item to test
 * @return {boolean} true if tested item is a string or a number
 */
export const isStringOrNumber = (val: RealAny): val is number | Number | string | String =>
    isString(val) || isNumberLike(val);

/**
 * Returns true if val is true or false
 * @param {any} val Item to test
 * @return {boolean} true if val is a boolean
 */
export const isBoolean = <T extends boolean | Boolean = boolean>(val: any | boolean): val is T => {
    if (val === true || val === false) return true;

    const hasValueOfFn = val && val.valueOf && typeof val.valueOf === 'function';
    if (hasValueOfFn && (val.valueOf() === true || val.valueOf() === false)) return true;

    return false;
};

export {isBoolean as isBool};

/**
 * Returns true if the given argument is a moment instance, Date instance, or any string, number,
 * or object that moment is able to parse. Excludes negative numbers and strings that parse to
 * negative numbers, and objects with date-irrelevant keys (e.g. { year: 1123, bear: 'grizzly' })
 * @param {any} val Item to test for Date-like properties
 * @return {boolean} True if item is date-like
 */
export const isDateLike = (val: RealAny): boolean => {
    if (val instanceof moment || val instanceof Date) return true;
    if ((isNumber(val) && val < 0) || (isString(val) && parseInt(val, 10) < 0)) {
        return false;
    }
    if (
        typeof val === 'object' &&
        Object.keys(val).find(
            key =>
                !key.match(
                    /((hours?)|(minutes?)|((milli)?seconds?)|(days?)|(dates?)|(months?)|(years?))/
                )
        )
    ) {
        return false;
    }
    return (moment(val) as any)._isValid;
};

/**
 * True if given values is an array (Robust, works across multiple JS envs)
 * @param {any} val Check if val is an array
 * @return {boolean} True if arg 'value' is an Array
 */
export const isArray = <T = any>(val: RealAny): val is T[] => {
    // Works in fully compliant ES5, ES6, ES7, ES8 ES[+] environments (Node, new browsers, etc)
    if (Array.isArray) return Array.isArray(val);
    // Works in browsers without Array.isArray.
    return !!(
        val &&
        val.constructor &&
        (val.constructor.name === 'Array' ||
            val instanceof Array ||
            // All ES5 and higher environments
            (Object.getPrototypeOf && Object.getPrototypeOf(val.constructor) === Array) ||
            // Pre-ES5 web browsers
            (val.constructor.__proto__ && val.constructor.__proto__.name === 'Array') ||
            // Ultra-robust (but noticeably slow) last-resort that works everywhere.
            Object.prototype.toString.call(val) === '[object Array]')
    );
};

/**
 * True if the given value is any variant of true ('true', 'True', 'TRUE', 'T', 't', or true)
 * @param {any} val Check if this is a variant of true
 * @param {boolean} include1CharVal return true if given 't' or 'T' when include1CharVal is true
 * @return {boolean} true if given value is a variant of true, otherwise false
 */
export const isTrue = <T extends true | string | String = true>(
    val: RealAny,
    include1CharVal: boolean = false
): val is T =>
    val === true ||
    (isString(val) &&
        (val.toLowerCase() === 'true' || (include1CharVal && val.toLowerCase() === 't')));

/**
 * True if the given value is any variant of false ('false', 'False', 'FALSE', 'F', 'f', or false)
 * @param {any} val Check if this is a variant of false
 * @param {boolean} include1CharVal return true if given 'f' or 'F' when include1CharVal is true
 * @return {boolean} false if given value is a variant of false, otherwise false
 */
export const isFalse = <T extends false | string | String = false>(
    val: RealAny,
    include1CharVal: boolean = false
): val is T =>
    val === false ||
    (isString(val) &&
        (val.toLowerCase() === 'false' || (include1CharVal && val.toLowerCase() === 'f')));

/**
 * @param {Any} val Return true if this value is a function
 * @return {boolean} True if val is a function, otherwise false
 */
export const isFunction = <T extends Function = ((...args: any[]) => any)>(val: RealAny): val is T => {
    const str = {}.toString.call(val);
    return str === '[object Function]' || (typeof val === 'function' && str !== '[object RegExp]');
};

// TODO improve singleton design-time behaviour - i.e. proper type hints + Intellisense
/**
 * Any class wrapped in this decorator becomes a singleton immediately
 * Throws if attempt is made to wrap a non-class
 *
 * @example
 *       @singleton
 *       class SomeSingleton {
 *           someString: string;
 *           constructor(someString) {
 *               this.someString = someString
 *           }
 *       }
 *
 *  // It will now only be possible to create one instance of class SomeSingleton
 *  @param {T} constructor Class to make into a singleton
 */
export const singleton = <T extends ClassConstructor>(constructor: T) => {
    const SingletonClass = class SingletonClass extends constructor {
        private static _instance: SingletonClass = null;

        public static new = (...args: any[]) => {
            if (!SingletonClass._instance) SingletonClass._instance = new SingletonClass(...args);
            return SingletonClass._instance;
        };
        constructor(...args: any[]) {
            if (SingletonClass._instance) return SingletonClass._instance;
            super(...args);
            SingletonClass._instance = this;
            return SingletonClass._instance;
        }
    };

    Object.defineProperty(SingletonClass, 'name', {value: constructor.name});
    return SingletonClass as SingletonInterface<any> & typeof constructor;
};

/**
 * Convert item to a number (if given item is of a type that can be converted as such)
 * If not, throw an error if this is specified
 * @param {StrOrNum} val Value to cast to a number
 * @param {boolean} throwOnFail (OPT) When true, throw if given type isn't a number
 *                                    When false, return an Error if given type isn't a number
 * @return {number|Error|never} value converted to number, Error, or nothing if it threw error
 */
export const castToNum = (val: StrOrNum, throwOnFail = true): number | Error | never => {
    if (isNumber(val)) return val;
    if (isNumberLike(val)) return parseFloat(val as string);

    const baseErrMsg =
        `castToNum can only accept numbers, #s in string form e.g. "1", or ` +
        `1-item arrays containing either type. Invalid value: ${val}`;

    if (throwOnFail) {
        throw new Error(baseErrMsg);
    } else {
        if (isVerbose) console.error(`WARNING: ${baseErrMsg}`);
        return new Error(baseErrMsg);
    }
};

const bstbErrMsg = 'Must input true, false, t, f, y, n, yes, or no';

/**
 * Convert string representation of a boolean value to a boolean value
 * Throw error if conversion isn't possible
 * Passes boolean values through as-is
 * @example converts 'yes' to true, 'f' to false, 'true' to true, true to true, 'n' to false, etc.
 * @param {string|boolean} val Value to convert to string or boolean. Must be 'y', 'n', 't', 'f',
 *                             'yes', no', 'true', or 'false' (case-insensitive); or a boolean
 * @return {boolean|Error} true if val is y, t, yes, or true
 *                         false if it's n, f, no, or false
 *                         Otherwise throw
 */
export const boolStringToBool = (
    val: string | boolean,
    strict: boolean = true
): boolean | null | never => {
    // Ensure not void, undefined, or NaN, and that toString doesn't return null
    if (
        typeof val === 'undefined' ||
        val === null ||
        isNaN(null) ||
        typeof val.toString() === 'undefined' ||
        typeof val.toString() !== 'string'
    ) {
        if (strict) throw new TypeError(bstbErrMsg);
        return null;
    }

    const lcVal = val.toString().toLowerCase();
    if (lcVal === 'true' || lcVal === 't' || lcVal === 'y' || lcVal === 'yes') {
        return true;
    } else if (lcVal === 'false' || lcVal === 'f' || lcVal === 'n' || lcVal === 'no') {
        return false;
    }
    if (strict) throw new TypeError(bstbErrMsg);
    return null;
};

/**
 * @alias for boolStringToBool
 */
export {boolStringToBool as toBoolFromBoolString};
