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

// TODO unit test uuid.len6, uuid.len8, and uuid.noDashes.
