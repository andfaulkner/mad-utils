/******************************************** IMPORTS *********************************************/
export { isInt, isInteger, isIntegerLike, isNumberLike, isNumLike } from './types-iso';
/**************************************** TYPE DEFINITIONS ****************************************/
export interface UUIDNamespace {
    (): string;
    len8: () => string;
    len6: () => string;
    noDashes: () => string;
}
/** @return {string} Randomly generated sequence 6 characters long e.g. AB790517 */
export declare const len6: () => string;
/** @return {string} Randomly generated sequence 8 characters long e.g. 0E8526 */
export declare const len8: () => string;
/** @return {string} Generate a UUID without any dashes (e.g. 505BB6B57D684C2488DD1522B34CF539) */
export declare const noDashes: () => string;
/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
export declare const uuid: UUIDNamespace;
