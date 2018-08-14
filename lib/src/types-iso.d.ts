/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new (...args: any[]): {};
}
export interface SingletonInterface<U> {
    new (...args: any[]): U;
    new <Y>(...args: any[]): Y;
}
export declare type RealAny = any;
export { RealAny as Any };
/**
 * Union aliases
 */
export declare type StrOrNum = string | number;
export declare type StrOrNever = string | never;
export declare type StrOrVoid = string | void;
export declare type StrOrErr = string | Error;
/**
 * Alias to indicate variable injected by a decorator
 */
export declare type Injection<T> = T;
export { Injection as OptionalInjection };
export { Injection as RequiredInjection };
export { Injection as MandatoryInjection };
export declare type StringHash = Record<string, string>;
export declare type StringNumHash = Record<string, number>;
export declare type BoolOrError = boolean | Error;
export { BoolOrError as BoolOrErr };
export { BoolOrError as ErrOrBool };
export { BoolOrError as ErrorOrBool };
export { BoolOrError as ErrorOrBoolean };
export { BoolOrError as BooleanOrError };
/*************************************** HTTP REQUEST TYPES ***************************************/
/**
 * Most commonly used HTTP Request types
 */
export declare type CommonHTTPRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export { CommonHTTPRequestType as MainHTTPRequestType };
export { CommonHTTPRequestType as CommonRequestType };
/**
 * All (known) HTTP Request types
 */
export declare type AnyHTTPReqType = CommonHTTPRequestType | 'OPTIONS' | 'TRACE' | 'CONNECT' | 'HEAD';
export { AnyHTTPReqType as HTTPRequestType };
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if [val] is null, undefined, or a string
 *  @param {StrOrVoid|RealAny} val Value to type check
 *  @return {boolean} true if val is null, undefined, or a string
 */
export declare const isVoidOrString: (val: any) => val is string;
/**
 * Returns true if [val] is an alphabetic character
 */
export declare const isAlphabeticChar: <T extends string = string>(val: any) => val is T;
export { isAlphabeticChar as isAlphaChar };
/**
 * Detect whether [val] is a number (Note: NaN returns false here)
 * @param {any} val Test if val is a number
 * @return {boolean} If given value is a number, return true; otherwise return false
 */
export declare const isNumber: <T extends number | Number = number>(val: any) => val is T;
export { isNumber as isNum };
/**
 * Returns true if [val] is a number, or a string that can be parsed into a number
 * Excludes NaN, accepts '.123' and '-.123' formatted numbers
 * @param {RealAny} val Item being tested for number-like nature
 * @return {boolean} True if item is 'number-like', otherwise false
 */
export declare const isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
export { isNumberLike as isNumLike };
/**
 * Returns true if [val] is an integer (does not include num-like strings)
 * @param {any} val Value to check type of
 * @return {boolean} true if given value is integer
 */
export declare const isInteger: <T extends string | number | String | Number = number>(val: any) => val is T;
export { isInteger as isInt };
/**
 * Returns true if [val] is an integer, or a string that can be converted to an integer
 * @param {any} val Item to test
 * @return {boolean} true if tested item is integer-like (or an integer)
 */
export declare const isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T;
export { isIntegerLike as isIntLike };
/**
 * True if [val] is a string, or a String-inheriting object
 * @param {any} val Value to test
 * @return {boolean} true if tested item is a string or String-inheriting object
 */
export declare const isString: <T extends string | String = string>(val: any) => val is T;
/**
 * True if [val] is a string or a number
 * @param {any} val Value to test
 * @return {boolean} true if tested item is a string or a number
 */
export declare const isStringOrNumber: (val: any) => val is string | number | String | Number;
export { isStringOrNumber as isStringOrNum };
export { isStringOrNumber as isStrOrNum };
/**
 * Returns true if [val] is true or false
 * @param {any} val Item to test
 * @return {boolean} true if val is a boolean
 */
export declare const isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
export { isBoolean as isBool };
/**
 * Returns true if [val] is a moment instance, Date instance, or any string,
 * number, or object that moment is able to parse
 * Excludes negative numbers and strings that parse to negative numbers, and
 * objects with date-irrelevant keys (e.g. { year: 1123, bear: 'grizzly' })
 * @param {any} val Value to test for Date-like properties
 * @return {boolean} True if value is date-like
 */
export declare const isDateLike: (val: any) => boolean;
/**
 * True if given values is an array (robust, works across multiple JS envs)
 * @param {any} val Check if val is an array
 * @return {boolean} True if arg 'value' is an Array
 */
export declare const isArray: <T = any>(val: any) => val is T[];
/**
 * True if the given value is any variant of true ('true', 'True', 'TRUE', 'T', 't', or true)
 * @param {any} val Check if this is a variant of true
 * @param {boolean} include1CharVal return true if given 't' or 'T' when include1CharVal is true
 * @return {boolean} true if given value is a variant of true, otherwise false
 */
export declare const isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
/**
 * True if the given value is any variant of false ('false', 'False', 'FALSE', 'F', 'f', or false)
 * @param {any} val Check if this is a variant of false
 * @param {boolean} include1CharVal return true if given 'f' or 'F' when include1CharVal is true
 * @return {boolean} false if given value is a variant of false, otherwise false
 */
export declare const isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T;
/**
 * @param {Any} val Return true if this value is a function
 * @return {boolean} True if val is a function, otherwise false
 */
export declare const isFunction: <T extends Function = (...args: any[]) => any>(val: any) => val is T;
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
export declare const singleton: <T extends ClassConstructor>(constructor: T) => SingletonInterface<any> & T;
/**
 * Convert item to a number (if given item is of a type that can be converted as such)
 * If not, throw an error if this is specified
 * @param {StrOrNum} val Value to cast to a number
 * @param {boolean} throwOnFail (OPT) When true, throw if given type isn't a number
 *                                    When false, return an Error if given type isn't a number
 * @return {number|Error|never} value converted to number, Error, or nothing if it threw error
 */
export declare const castToNum: (val: string | number, throwOnFail?: boolean) => number | Error;
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
export declare const boolStringToBool: (val: string | boolean, strict?: boolean) => boolean;
export { boolStringToBool as toBoolFromBoolString };
