/******************************************** IMPORTS *********************************************/
import { RealAny } from './types-iso';
/******************************************** MATCHING ********************************************/
/**
 * Returns true if array matchVals contains valToFind. Note that it uses simple JSON.stringify
 * for array and object comparison. Curried. Sane behaviour for matching against null,
 * undefined, NaN, etc. (e.g. NaN matched against an array with NaN returns true).
 * @param {Array<any>} matchVals - Array to check for item matching valToFind.
 * @param {any} valToFind - Value to search for in matchVals.
 * @return {boolean} true if valToFind is found in matchVals.
 */
export declare const matchAny: (matchVals: any[]) => (valToFind: any) => boolean;
/**
 * Determine if an array contains a given value.
 * @param {Array} arr Array to check for the given value
 * @param {string} val - value to search for in the array.
 * @return {boolean} true if arr contains val
 */
export declare const contains: (arr: any[], val: any) => boolean;
export { contains as includes };
/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return first item in an array. */
export declare function first(str: string): string;
export declare function first<T>(arr: T[]): T;
/** Return second item in an array. */
export declare function second<T>(str: string): string;
export declare function second<T>(arr: T[]): T;
/** Return third item in an array. */
export declare function third<T>(str: string): string;
export declare function third<T>(arr: T[]): T;
/** Return last item in an array or string. */
export declare function last(str: string): string;
export declare function last<T>(arr: T[]): T;
/** Return second last item in an array or string. */
export declare function secondLast(str: string): string;
export declare function secondLast<T>(arr: T[]): T;
/** Return third last item in an array. */
export declare function thirdLast(str: string): string;
export declare function thirdLast<T>(arr: T[]): T;
/** Return first 2 items in an array. */
export declare function first2<T>(str: string): string;
export declare function first2<T>(arr: T[]): T[];
/** Return first 3 items in an array. */
export declare function first3<T>(str: string): string;
export declare function first3<T>(arr: T[]): T[];
/** Return last 2 items in an array. */
export declare function last2(str: string): string;
export declare function last2<T>(arr: T[]): T[];
/** Return last 3 items in an array. */
export declare function last3(str: string): string;
export declare function last3<T>(arr: T[]): T[];
/**
 * Return first N items in an array. Returns the whole array if you request too many items.
 */
export declare function firstN(str: string, n: number): string;
export declare function firstN<T>(arr: T[], n: number): T[];
/** Return last N items in an array. */
export declare function lastN(str: string, n: number): string;
export declare function lastN<T>(arr: T[], n: number): T[];
/**
 * Create array containing requested number of repeats of a given fillValue, or containing
 * requested number of repeats of undefined if no fillValue is given.
 * @param {number} len - Length of array to create.
 * @param {RealAny} fillValue [OPTIONAL]: Item to repeat 'len' number of times.
 * @return {Array<void|typeof fillValue>} Array containing 'len' # of repeats of 'fillValue'
 *                                        (or undefined if fillValue is not given)
 */
export declare const arrayN: <T>(len: number, fillValue?: T) => void[] | T[];
/************************ EXCLUDE ITEMS FROM START OR END OF ARRAY/STRING *************************/
/**
 * Exclude first item from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first item from.
 * @return {Array<any>} Array with first item excluded.
 */
export declare function withoutFirst<T>(str: string): string;
export declare function withoutFirst<T>(arr: T[]): T[];
/**
 * Exclude last item from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last item from.
 * @return {Array<any>} Array with last item excluded.
 */
export declare function withoutLast<T>(str: string): string;
export declare function withoutLast<T>(arr: T[]): T[];
/**
 * Exclude first 2 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first 2 items from.
 * @return {Array<any>} Array with first 2 items excluded.
 */
export declare function withoutFirst2<T>(str: string): string;
export declare function withoutFirst2<T>(arr: T[]): T[];
/**
 * Exclude first 3 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first 3 items from.
 * @return {Array<any>} Array with first 3 items excluded.
 */
export declare function withoutFirst3<T>(str: string): string;
export declare function withoutFirst3<T>(arr: T[]): T[];
/**
 * Exclude last 2 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last 2 items from.
 * @return {Array<any>} Array with last 2 items excluded.
 */
export declare function withoutLast2<T>(str: string): string;
export declare function withoutLast2<T>(arr: T[]): T[];
/**
 * Exclude last 3 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last 3 items from.
 * @return {Array<any>} Array with last 3 items excluded.
 */
export declare function withoutLast3<T>(str: string): string;
export declare function withoutLast3<T>(arr: T[]): T[];
/**
 * Exclude given number of items from end of string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last N items from.
 * @return {Array<any>} Array with last N items excluded.
 */
export declare function withoutLastN<T>(str: string, numToRm: number): string;
export declare function withoutLastN<T>(arr: T[], numToRm: number): T[];
/**
 * Exclude given number of items from beginning of string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first N items from.
 * @return {Array<any>} Array with first N items excluded.
 */
export declare function withoutFirstN<T>(str: string, numToRm: number): string;
export declare function withoutFirstN<T>(arr: T[], numToRm: number): T[];
/**
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it.
 * If either arr1 or arr2 are undefined, it ignores it and just returns the other.
 * If both are undefined, it returns [].
 * If a non-array value besides null is given, it wraps the item in an array before
 * performing the concatenation.
 * NON-MUTATIVE
 *
 * @param {Array<RealAny>|RealAny} arr1 - If array, concatenate arr2 to the end. If value, wrap
 *                                        in array before concatenating (e.g. 3 is treated as [3].
 * @param {Array<RealAny>|RealAny} arr2 - Array or value to concatenate to the end of arr1
 * @return {Array<RealAny>} Result of attaching arr2 to the end of arr1
 */
export declare const append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
/**
 * Return new array with all items in arr2OrItem removed from array1; or if array2 is
 * not an array, remove matching item from array1. NON-MUTATIVE. PERFORMANCE-INTENSIVE.
 * @param {any[]} arr1 - Array to remove items from.
 * @param {any[]|any} arr2OrItem - Remove all items in this array, or remove item if not an array.
 * @return {any[]} arr1 with all items in arr2OrItem (or the item itself) removed.
 */
export declare function removeMatches(arr1: RealAny[], arr2: any): RealAny[];
export declare function removeMatches(arr1: RealAny[], arr2: RealAny[]): RealAny[];
/**
 * Return new array with all falsy values in the given array eliminated.
 * @param {Array} arr - Array containing any values of any type.
 * @return {Array} - input array minus falsy vals. Eliminates 0, '', null, undefined, NaN, false.
 */
export declare const rmAllFalsy: (arr: any[]) => any[];
/**
 * Add item to array if item not already present in array.
 * @param {Array} arr Array to potentially add item to
 * @param {any} newItem Item to potentially add to array (if array doesn't already contain it)
 * @return {Array} Initially given array, with item potentially added.
 */
export declare function pushIfUniq<T = any>(arr: T[], newItem: T): T[];
export { pushIfUniq as pushIfNew };
export { pushIfUniq as pushUniq };
/**
 * Split large multiline string into array where each line is an item. Also removes blank lines.
 * @param {String} str - Multiline string to split into array where each line is an array item.
 *                       Splits on '\n' char.
 * @param {Object} opts::
 *        @param {boolean} preserveEmptyLines - If true, remove all blank lines. Off by default.
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed.
 */
export declare const splitLines: (str: string, opts?: {
    preserveEmptyLines: boolean;
}) => string[];
/**
 * Count number of occurrences of matching value in the array.
 * @param {any[]} arr - Array to search for the item.
 * @param {any} value - Item to search for in the array.
 * @return {number} Number of occurrences of the item in the array.
 */
export declare function countOccurrences(arr: any[], value: any): number;
/**
 * Count number of occurrences of each value in the array. Return map containing all values.
 * @param {any[]} arr - Array to search for the item.
 * @return {Map<any, number>} Map of each item in the array vs. its number of occurences.
 */
export declare function countOccurrences(arr: any[]): Map<any, number>;
/**
 * Namespace for certain "reversed" operations.
 */
export declare const without: {
    last: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    last2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    last3: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    lastN: {
        <T>(str: string, numToRm: number): string;
        <T>(arr: T[], numToRm: number): T[];
    };
    first: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    first2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    first3: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    firstN: {
        <T>(str: string, numToRm: number): string;
        <T>(arr: T[], numToRm: number): T[];
    };
};
export { isArray } from './types-iso';
