/******************************************** IMPORTS *********************************************/
export { isInt, isInteger, isIntegerLike, isNumberLike, isNumLike } from './types-iso'

import * as uuidImport from 'uuid';

/**************************************** TYPE DEFINITIONS ****************************************/
export interface UUIDNamespace {
    (): string
    len8: () => string
    len6: () => string
    noDashes: () => string
}

export type Int1To10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Int1To20 = Int1To10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type Int1To30 = Int1To20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export type Int1To40 = Int1To30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export type Int1To50 = Int1To40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export type Int1To60 = Int1To50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;

/** Alias for number - not a true integer. Provided to help communicate intended use of a type */
export type Integer = number;

/******************************************** EXPORTS *********************************************/
const uuidBase = (): string => uuidImport();

/** @return {string} Randomly generated sequence 6 characters long e.g. AB790517 */
export const len6 = (): string => len8().slice(0, -2);

/** @return {string} Randomly generated sequence 8 characters long e.g. 0E8526 */
export const len8 = (): string => uuidBase().split('-')[0];

/** @return {string} Generate a UUID without any dashes (e.g. 505BB6B57D684C2488DD1522B34CF539) */
export const noDashes = (): string => uuidBase().split('-').join('');

/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
export const uuid = Object.assign(uuidBase, { len6, len8, noDashes }) as UUIDNamespace;
