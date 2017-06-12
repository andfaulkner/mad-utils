/// <reference types="node-polyglot" />
import * as Polyglot from 'node-polyglot';
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
/**
 * Union aliases
 */
export declare type StrOrNum = string | number;
export declare type NumOrStr = StrOrNum;
export declare type StringOrNumber = StrOrNum;
export declare type NumberOrString = StrOrNum;
export declare type StrOrNever = string | never;
export declare type NeverOrStr = string | never;
/**
 * Any type that can potentially be cast to a number.
 */
export declare type NumLike = StrOrNum | StrOrNum[];
/**
 * Alias to indicate variable injected by a decorator.
 */
export declare type Injection<T> = T;
export declare type InjectionType<T> = T;
export declare type OptionalInjection<T> = T;
export declare type OptionalInjectedType<T> = T;
export declare type RequiredInjection<T> = T;
export declare type RequiredInjectionType<T> = T;
export declare type MandatoryInjection<T> = T;
export declare type MandatoryInjectionType<T> = T;
/**
 * Extend to (optionally) include Polyglot
 */
export interface PolyglotProps {
    polyglot?: Readonly<Polyglot>;
}
/*************************************** HTTP REQUEST TYPES ***************************************/
/**
 * Most commonly used HTTP Request types.
 */
export declare type MainHTTPRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export declare type MainHTTPReqType = MainHTTPRequestType;
export declare type MainHttpRequestType = MainHTTPRequestType;
export declare type MainHttpReqType = MainHTTPRequestType;
/**
 * All (known) HTTP Request types.
 */
export declare type AnyHTTPReqType = MainHTTPReqType | 'OPTIONS' | 'TRACE' | 'CONNECT' | 'HEAD';
export declare type AnyHTTPRequestType = AnyHTTPReqType;
export declare type AnyHttpReqType = AnyHTTPReqType;
export declare type AnyHttpRequestType = AnyHTTPReqType;
export declare type HTTPRequestType = AnyHTTPReqType;
export declare type HTTPReqType = AnyHTTPReqType;
export declare type HttpRequestType = AnyHTTPReqType;
export declare type HttpReqType = AnyHTTPReqType;
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {StringOrNonexistent|RealAny} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export declare const isNonexistentOrString: (val: any) => boolean;
/**
 * Returns true if the given argument is a number, a string that can be parsed into a number, or
 * a 1-item array containing either aforementioned type.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} arg - item being tested for number-like nature.
 * @return {boolean} True if item is number-like, otherwise false.
 */
export declare const isNumberLike: (arg: any) => boolean;
/**
 * @alias isNumberLike
 */
export declare const isNumLike: (arg: any) => boolean;
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 */
export declare const isInteger: (val: any) => boolean;
/**
 * @alias for isInteger
 */
export declare const isInt: (val: any) => boolean;
/**
 * Returns true if the given argument is a moment instance, Date instance, or any string, number,
 * or object that moment is able to parse. Excludes negative numbers and strings that parse to
 * negative numbers, and objects with date-irrelevant keys (e.g. { year: 1123, bear: 'grizzly' })
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
/**
 * Convert string representation of a boolean value to a boolean value. Return error if this
 * isn't possible. If something is already a boolean, it simply passes it through.
 * @example converts 'yes' to true, 'f' to false, 'true' to true, true to true, 'n' to false, etc.
 * @param {string|boolean} val - value to convert to string or boolean. Must be 'y', 'n', 't', 'f',
 *                               'yes', no', 'true', or 'false' (case-insensitive); or a boolean.
 * @return {boolean|Error} true if val is y, t, yes, or true. false if it's n, f, no, or false.
 *                         Otherwise throw.
 */
export declare const boolStringToBool: (val: string | boolean) => boolean;
/**
 * @alias for boolStringToBool
 */
export declare const toBoolFromBoolString: (val: string | boolean) => boolean;
export { isMultilangTextObj } from './object';
