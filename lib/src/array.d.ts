/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/**
 * Create array containing requested number of repeats of a given fillValue, or containing
 * requested number of repeats of undefined if no fillValue is given.
 * @param {number} len - Length of array to create.
 * @param {RealAny} fillValue [OPTIONAL]: Item to repeat 'len' number of times.
 * @return {Array<void|typeof fillValue>} Array containing 'len' # of repeats of 'fillValue'
 *                                        (or undefined if fillValue is not given)
 */
export declare const arrayN: <T>(len: number, fillValue?: T) => void[] | T[];
/** Return last item in an array or string. */
export declare function last(str: string): string;
export declare function last<T>(arr: T[]): T;
/** Return second last item in an array or string. */
export declare function secondLast(str: string): string;
export declare function secondLast<T>(arr: T[]): T;
/** Return third last item in an array. */
export declare function thirdLast(str: string): string;
export declare function thirdLast<T>(arr: T[]): T;
/** Return last 2 items in an array. */
export declare function last2(str: string): string;
export declare function last2<T>(arr: T[]): T[];
/** Return last 3 items in an array. */
export declare function last3(str: string): string;
export declare function last3<T>(arr: T[]): T[];
/** Return last N items in an array. */
export declare function lastN(str: string, n: number): string;
export declare function lastN<T>(arr: T[], n: number): T[];
/** Return first item in an array. */
export declare function first(str: string): string;
export declare function first<T>(arr: T[]): T;
/** Return second item in an array. */
export declare function second<T>(str: string): string;
export declare function second<T>(arr: T[]): T;
/** Return third item in an array. */
export declare function third<T>(str: string): string;
export declare function third<T>(arr: T[]): T;
/** Return first 2 items in an array. */
export declare function first2<T>(str: string): string;
export declare function first2<T>(arr: T[]): T[];
/** Return first 3 items in an array. */
export declare function first3<T>(str: string): string;
export declare function first3<T>(arr: T[]): T[];
/**
 * Return first N items in an array. Returned the whole array if you request too many items.
 */
export declare function firstN(str: string, n: number): string;
export declare function firstN<T>(arr: T[], n: number): T[];
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
 * Eliminate all falsy values from the given array.
 *
 * @param {Array} arr - Array containing any values of any type.
 * @return {Array} - input array minus falsy vals. Eliminates 0, '', null, undefined, NaN, false.
 */
export declare const rmAllFalsy: (arr: any[]) => any[];
/**
 * Split large multiline string into array where each line is an item. Also removes blank lines.
 *
 * @param {String} str - Multiline string to split into array where each line is an array item.
 *                       Splits on '\n' char.
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed.
 */
export declare const splitLines: (str: string) => any[];
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
