/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new (...args: any[]): {};
}
export declare type RealAny = any;
export declare type StringOrNonexistent = string | null | undefined;
export { StringOrNonexistent as StrOrNonexistent };
export interface SingletonInterface<U> {
    new (...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}
export declare type StrOrNum = string | number;
export declare type NumOrStr = StrOrNum;
export declare type StringOrNumber = StrOrNum;
export declare type NumberOrString = StrOrNum;
/**
 * Any type that can potentially be cast to a number.
 */
export declare type NumLike = StrOrNum | StrOrNum[];
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {StringOrNonexistent|RealAny} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export declare const isNonexistentOrString: (val: any) => boolean;
/**
 * Returns true if the given argument is a number or a string that can be parsed into a number.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} arg - item being tested for number-like nature.
 * @return {boolean} True if item is number-like, otherwise false.
 */
export declare const isNumberLike: (arg: any) => boolean;
/**
 * Returns true if the given arguments is a moment instance, Date instance, or any string that
 * moment is able to parse. Excludes negative numbers and strings that parse to negative numbers,
 * and objects with date-irrelevant keys.
 *
 * @param {any} arg - Item to test for Date-like properties
 * @return {boolean} True if item is date-like.
 */
export declare const isDateLike: (arg: any) => boolean;
/**
 * True if the given object is an array. Robust and works across multiple JS environments.
 *
 * @param {any} value - Check if this is an array.
 * @return {boolean} True if arg 'value' is an Array,
 */
export declare const isArray: (value: any) => boolean;
/**
 * Returns true if given value can be converted to a number (integer, float, string that can be
 * parsed to an int or float, or a 1-item array containing any of the aforementioned types)
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is a number.
 */
export declare const isNumLike: (val: any) => boolean;
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 */
export declare const isInt: (val: any) => boolean;
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
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
 *  // It will now only be possible to create one instance of class SomeSingleton.
 */
export declare const singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
/**
 * Convert item to a number (if given item is of a type that can be converted as such).
 * If not, throw an error if this is specified.
 * @param {NumLike} numLike - value to cast to a number
 * @param {boolean} throwOnFail (OPTIONAL) - When true, throw if given type isn't a number.
 *                              When false, return an Error if given type isn't a number.
 * @return {number|Error|never} value converted to number, Error, or nothing if it threw error.
 */
export declare const castToNum: (numLike: NumLike, throwOnFail?: boolean) => number | Error;
export { isMultilangTextObj } from './object';
