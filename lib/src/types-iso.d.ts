/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new (...args: any[]): {};
}
export declare type RealAny = any;
export interface SingletonInterface<U> {
    new (...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export declare const isNonexistentOrString: (val: any) => boolean;
/**
 * Returns true if the given argument is a number or a string.
 */
export declare const isNumberLike: (arg: any) => boolean;
/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
export declare const isDateLike: (arg: any) => boolean;
/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export declare const isArray: (value: any) => boolean;
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export declare const isInt: (val: any) => boolean;
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
export declare const singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
export { isMultilangTextObj } from './object';
