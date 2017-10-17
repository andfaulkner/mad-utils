/******************************************** IMPORTS *********************************************/
export { isInt, isInteger, isIntegerLike, isNumberLike, isNumLike } from './types-iso';
/**************************************** TYPE DEFINITIONS ****************************************/
export interface UUIDNamespace {
    (): string;
    len8: () => string;
    len6: () => string;
    noDashes: () => string;
}
export declare type Int1To10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare type Int1To20 = Int1To10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export declare type Int1To30 = Int1To20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export declare type Int1To40 = Int1To30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export declare type Int1To50 = Int1To40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export declare type Int1To60 = Int1To50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;
/**
 *  Alias for numbers of different types - not true integer, float, etc..
 *  Provided to help communicate intended use of a type.
 */
export declare type Integer = number;
export declare type Int = number;
export declare type Float = number;
export declare type Double = number;
export declare type Long = number;
export declare type Short = number;
/**
 * e.g. "F0B282C2-A12B-4526-A28E-0A6C9AEFB537"
 */
export declare type UUID = string;
export { UUID as UID };
export { UUID as Uuid };
export { UUID as Uid };
/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
export declare const uuid: UUIDNamespace;
export declare const uuidRegex: RegExp;
