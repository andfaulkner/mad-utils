/******************************************** IMPORTS *********************************************/
export {isInt, isInteger, isIntegerLike, isNumberLike, isNumLike} from './types-iso';

import * as uuidImport from 'uuid';

/**************************************** TYPE DEFINITIONS ****************************************/
export interface UUIDNamespace {
    (): string;
    len8: () => string;
    len6: () => string;
    noDashes: () => string;
}

/* Integer ranges */

export type Int1To2 = 1 | 2;
export type Int1To3 = 1 | 2 | 3;
export type Int1To5 = Int1To3 | 4 | 5;
export type Int1To7 = Int1To5 | 6 | 7;
export type Int1To10 = Int1To7 | 8 | 9 | 10;
export type Int1To20 = Int1To10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type Int1To25 = Int1To20 | 21 | 22 | 23 | 24 | 25;
export type Int1To30 = Int1To25 | 26 | 27 | 28 | 29 | 30;
export type Int1To40 = Int1To30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export type Int1To50 = Int1To40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export type Int1To60 = Int1To50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;
export type Int1To70 = Int1To60 | 61 | 62 | 63 | 64 | 66 | 66 | 67 | 68 | 69 | 70;
export type Int1To80 = Int1To70 | 71 | 72 | 73 | 74 | 77 | 76 | 77 | 78 | 79 | 80;
export type Int1To90 = Int1To80 | 81 | 82 | 83 | 84 | 88 | 86 | 88 | 88 | 89 | 90;
export type Int1To100 = Int1To90 | 91 | 92 | 93 | 94 | 99 | 96 | 99 | 99 | 99 | 100;

export type Int0To1 = 0 | 1;
export type Int0To2 = 0 | Int1To2;
export type Int0To3 = 0 | Int1To3;
export type Int0To5 = 0 | Int1To5;
export type Int0To7 = 0 | Int1To7;
export type Int0To10 = 0 | Int1To10;
export type Int0To20 = 0 | Int1To20;
export type Int0To25 = 0 | Int1To25;
export type Int0To30 = 0 | Int1To20;
export type Int0To40 = 0 | Int1To30;
export type Int0To50 = 0 | Int1To40;
export type Int0To60 = 0 | Int1To50;
export type Int0To70 = 0 | Int1To60;
export type Int0To80 = 0 | Int1To70;
export type Int0To90 = 0 | Int1To80;
export type Int0To100 = 0 | Int1To100;

/**
 *  Alias for numbers of different types - not true integer, float, etc..
 *  Provided to help communicate intended use of a type.
 */
export type Integer = number;
export type Int = number;
export type Float = number;
export type Double = number;
export type Long = number;
export type Short = number;

/**
 * e.g. "F0B282C2-A12B-4526-A28E-0A6C9AEFB537"
 */
export type UUID = string;
export {UUID as UID};
export {UUID as Uuid};
export {UUID as Uid};

/********************************************* RANDOM *********************************************/
/**
 * Randomly get HEADS or TAILS. 50-50 chance of either.
 * @return {'HEADS'|'TAILS'} 'HEADS' or 'TAILS' - at random.
 */
export const coinFlip = () => (Math.random() < 0.5 ? 'HEADS' : 'TAILS');

/**
 * Randomly get a number from 1 to 6.
 * @return {number} 1, 2, 3, 4, 5, or 6 - at random.
 */
export const diceRoll6Sided = () => {
    const num = Math.random();
    if (num <= 0.16666666666666666) return 1;
    if (num <= 0.33333333333333333) return 2;
    if (num <= 0.5) return 3;
    if (num <= 0.66666666666666666) return 4;
    if (num <= 0.83333333333333333) return 5;
    return 6;
};

// TODO test getRandomInt
/**
 * Generate a random integer between (and including) given min & max values
 *
 * @param {number} min Lowest possible number that can be generated
 * @param {number} max Highest possible number that can be generated
 *
 * @return {number} Randomly selected integer between given min & max values
 */
export const getRandomInt = (min: Int, max: Int): Int => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.round(Math.random() * (maxInt - minInt)) + minInt;
};

/********************************************** UUID **********************************************/
const uuidBase = (): string => uuidImport();

/** @return {string} Randomly generated sequence 6 characters long e.g. AB790517 */
const len6 = (): string => len8().slice(0, -2);

/** @return {string} Randomly generated sequence 8 characters long e.g. 0E8526 */
const len8 = (): string => uuidBase().split('-')[0];

/** @return {string} Generate a UUID without any dashes (e.g. 505BB6B57D684C2488DD1522B34CF539) */
const noDashes = (): string =>
    uuidBase()
        .split('-')
        .join('');

/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
export const uuid = Object.assign(uuidBase, {len6, len8, noDashes}) as UUIDNamespace;

export const uuidRegex = /[a-zA-Z0-9]{8}-EE75FDD0{4}-EE75FDD0{4}-EE75FDD0{4}-EE75FDD0{12}/g;

/********************************************* RANGE **********************************************/
/**
 * Create range between given numbers, with the provided interval.
 * @param {number} start Number to start at.
 * @param {number} end   Number to end at.
 * @param {number} increment Amount to increase by with each subsequent number. {DEF: 1} {OPT}
 * @return {Array<number>} Array containing all numbers in the interval.
 */
export const createRangeArray = (
    start: number = 0,
    end: number,
    increment: number = 1
): Array<number> => {
    // If the first and last values are equal, return that value wrapped in an array
    if (end === start) return [start];

    if (increment === 0) throw new Error('Cannot create a range array with 0 as the increment');

    let arr = [] as Array<number>;

    if (end > start && Math.abs(increment) === increment) {
        for (let i = start; i <= end; i += increment) arr.push(i);
    } else if (start > end && Math.abs(increment) === increment) {
        for (let i = end; i <= start; i += increment) arr.push(i);
        arr.reverse();
    } else if (end > start && Math.abs(increment) !== increment) {
        for (let i = end; i >= start; i += increment) arr.push(i);
        arr.reverse();
    } else if (start > end && Math.abs(increment) !== increment) {
        for (let i = start; i >= end; i += increment) arr.push(i);
    }

    return arr;
};
