/******************************************** IMPORTS *********************************************/
export { isInt, isInteger, isIntegerLike, isNumberLike, isNumLike } from './types-iso';
/**************************************** TYPE DEFINITIONS ****************************************/
export interface UUIDNamespace {
    (): string;
    len8: () => string;
    len6: () => string;
    noDashes: () => string;
}
export declare type Int1To2 = 1 | 2;
export declare type Int1To3 = 1 | 2 | 3;
export declare type Int1To5 = Int1To3 | 4 | 5;
export declare type Int1To7 = Int1To5 | 6 | 7;
export declare type Int1To10 = Int1To7 | 8 | 9 | 10;
export declare type Int1To20 = Int1To10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export declare type Int1To25 = Int1To20 | 21 | 22 | 23 | 24 | 25;
export declare type Int1To30 = Int1To25 | 26 | 27 | 28 | 29 | 30;
export declare type Int1To40 = Int1To30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export declare type Int1To50 = Int1To40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export declare type Int1To60 = Int1To50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;
export declare type Int1To70 = Int1To60 | 61 | 62 | 63 | 64 | 66 | 66 | 67 | 68 | 69 | 70;
export declare type Int1To80 = Int1To70 | 71 | 72 | 73 | 74 | 77 | 76 | 77 | 78 | 79 | 80;
export declare type Int1To90 = Int1To80 | 81 | 82 | 83 | 84 | 88 | 86 | 88 | 88 | 89 | 90;
export declare type Int1To100 = Int1To90 | 91 | 92 | 93 | 94 | 99 | 96 | 99 | 99 | 99 | 100;
export declare type Int0To1 = 0 | 1;
export declare type Int0To2 = 0 | Int1To2;
export declare type Int0To3 = 0 | Int1To3;
export declare type Int0To5 = 0 | Int1To5;
export declare type Int0To7 = 0 | Int1To7;
export declare type Int0To10 = 0 | Int1To10;
export declare type Int0To20 = 0 | Int1To20;
export declare type Int0To25 = 0 | Int1To25;
export declare type Int0To30 = 0 | Int1To20;
export declare type Int0To40 = 0 | Int1To30;
export declare type Int0To50 = 0 | Int1To40;
export declare type Int0To60 = 0 | Int1To50;
export declare type Int0To70 = 0 | Int1To60;
export declare type Int0To80 = 0 | Int1To70;
export declare type Int0To90 = 0 | Int1To80;
export declare type Int0To100 = 0 | Int1To100;
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
/********************************************* RANDOM *********************************************/
/**
 * Randomly get HEADS or TAILS. 50-50 chance of either.
 * @return {'HEADS'|'TAILS'} 'HEADS' or 'TAILS' - at random.
 */
export declare const coinFlip: () => "HEADS" | "TAILS";
/**
 * Randomly get a number from 1 to 6.
 * @return {number} 1, 2, 3, 4, 5, or 6 - at random.
 */
export declare const diceRoll6Sided: () => 1 | 2 | 3 | 4 | 5 | 6;
/**
 * Generate a random integer between (and including) given min & max values
 *
 * @param {number} min Lowest possible number that can be generated
 * @param {number} max Highest possible number that can be generated
 *
 * @return {number} Randomly selected integer between given min & max values
 */
export declare const getRandomInt: (min: number, max: number) => number;
/**
 * Export UUID
 * If uuid itself is run as a function, it generates a UUID
 * uuid object contains child functions uuid.len6, uuid.len8, & uuid.noDashes
 */
export declare const uuid: UUIDNamespace;
/**
 * Regex for detecting UUID
 */
export declare const uuidRegex: RegExp;
/**
 * Return true if given value is a UUID (v4)
 */
export declare const isUUID: (value: any) => value is string;
/********************************************* RANGE **********************************************/
/**
 * Create range between given numbers, with the provided interval.
 * @param {number} start Number to start at.
 * @param {number} end   Number to end at.
 * @param {number} increment Amount to increase by with each subsequent number. {DEF: 1} {OPT}
 * @return {Array<number>} Array containing all numbers in the interval.
 */
export declare const createRangeArray: (start: number, end: number, increment?: number) => number[];
