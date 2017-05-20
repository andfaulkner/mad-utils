import moment from 'moment';

/************************************ COMMON TYPE DEFINITIONS *************************************/
// For cases where something truly can be any value (contrast with the most common
// case where 'any' is used in lieu of determining a highly complex type)
export type RealAny = any;

/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export const isNonexistentOrString = (val: any): boolean => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};
/**
 * Returns true if the given argument is a number or a string.
 */
export function isNumberLike(arg: any): boolean {
    if (typeof arg === 'number') {
        return true;
    }
    return typeof arg === 'string' && !isNaN(parseInt(arg, 10));
}

/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
export function isDateLike(arg: any): boolean {
    return typeof arg === 'string' || arg instanceof moment || arg instanceof Date;
}


/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export function isArray(value: any): boolean {
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
}

/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export function isInt(val) {
    const valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
                        : (valAsFloat | 0) === valAsFloat;
}

export { isMultilangTextObj } from './object';

