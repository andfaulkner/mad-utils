/******************************************** IMPORTS *********************************************/
import { RealAny, isArray } from './types-iso';

/******************************************** MATCHING ********************************************/
/**
 * Returns true if array matchVals contains valToFind. Note that it uses simple JSON.stringify
 * for array and object comparison. Curried. Sane behaviour for matching against null,
 * undefined, NaN, etc. (e.g. NaN matched against an array with NaN returns true).
 * @param {Array<any>} matchVals - Array to check for item matching valToFind.
 * @param {any} valToFind - Value to search for in matchVals.
 * @return {boolean} true if valToFind is found in matchVals.
 */
export const matchAny = (matchVals: any[]) => (valToFind: any): boolean => {
    const isValToFindObj = typeof valToFind === 'object' && valToFind != null;
    const cleanValToFind = isValToFindObj ? JSON.stringify(valToFind) : valToFind;
    const isValToFindNaN = typeof valToFind === 'number' && isNaN(valToFind);
    return matchVals.some(val => {
        if (isValToFindNaN && typeof val === 'number' && isNaN(val)) return true;
        return isValToFindObj ? cleanValToFind === (val && JSON.stringify(val))
                              : cleanValToFind === val;
    });
};

/**
 * Determine if an array contains a given value.
 * @param {Array} arr Array to check for the given value
 * @param {string} val - value to search for in the array.
 * @return {boolean} true if arr contains val
 */
export const contains = (arr: any[], val: any): boolean =>
    arr.some(item => (item === val || (typeof item === 'number' && typeof val === 'number'
                                       && isNaN(item) && isNaN(val))));

export { contains as includes };


/*********************************** ARRAY & COLLECTION HELPERS ***********************************/

//
// SINGLE ITEM FROM START OR END
//

/** Return first item in an array. */
export function first(str: string): string;
export function first<T>(arr: T[]): T;
export function first<T>(arrOrStr: T[] | string): T | string { return arrOrStr[0]; }

/** Return second item in an array. */
export function second<T>(str: string): string;
export function second<T>(arr: T[]): T;
export function second<T>(arrOrStr: T[] | string): T | string { return arrOrStr[1]; }

/** Return third item in an array. */
export function third<T>(str: string): string;
export function third<T>(arr: T[]): T;
export function third<T>(arrOrStr: T[] | string): T | string { return arrOrStr[2]; }

/** Return last item in an array or string. */
export function last(str: string): string;
export function last<T>(arr: T[]): T;
export function last<T>(arrOrStr: T[] | string): T | string { return arrOrStr.slice(-1)[0]; }

/** Return second last item in an array or string. */
export function secondLast(str: string): string;
export function secondLast<T>(arr: T[]): T;
export function secondLast<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr.slice(-2, -1)[0];
}

/** Return third last item in an array. */
// tslint:disable-next-line:no-magic-numbers max-line-length
export function thirdLast(str: string): string;
export function thirdLast<T>(arr: T[]): T;
export function thirdLast<T>(arrOrStr: T[] | string ): T | string {
    // tslint:disable-next-line:no-magic-numbers
    return arrOrStr.slice(-3, -2)[0];
}

//
// MULTIPLE ITEMS FROM START OR END
//

/** Return first 2 items in an array. */
export function first2<T>(str: string): string;
export function first2<T>(arr: T[]): T[];
export function first2<T>(arrOrStr: T[] | string): T[] | string { return arrOrStr.slice(0, 2); }

/** Return first 3 items in an array. */
export function first3<T>(str: string): string;
export function first3<T>(arr: T[]): T[];
// tslint:disable-next-line:no-magic-numbers
export function first3<T>(arrOrStr: T[] | string): T[] | string { return arrOrStr.slice(0, 3); }

/** Return last 2 items in an array. */
export function last2(str: string): string;
export function last2<T>(arr: T[]): T[];
export function last2<T>(arrOrStr: T[] | string): T[] | string { return arrOrStr.slice(-2); }

/** Return last 3 items in an array. */
export function last3(str: string): string;
export function last3<T>(arr: T[]): T[];
// tslint:disable-next-line:no-magic-numbers
export function last3<T>(arrOrStr: T[] | string): T[] | string { return arrOrStr.slice(-3); }

//
// VARIABLE NUMBER OF ITEMS FROM START OR END
//

/**
 * Return first N items in an array. Returns the whole array if you request too many items.
 */
export function firstN(str: string, n: number): string;
export function firstN<T>(arr: T[], n: number): T[];
export function firstN <T>(arrOrStr: T[] | string, n: number): T[] | string {
    if (typeof arrOrStr === 'string') return arrOrStr.slice(0, n);
    return arrOrStr.length >= n ? arrayN<void>(n).map((__, idx) => arrOrStr[idx]) : arrOrStr;
}

/** Return last N items in an array. */
export function lastN(str: string, n: number): string;
export function lastN<T>(arr: T[], n: number): T[];
export function lastN<T>(arrOrStr: T[] | string, n: number): string | T[] {
    return arrOrStr.slice(-1 * n);
}

//
// CREATE NEW ARRAY
//

/**
 * Create array containing requested number of repeats of a given fillValue, or containing
 * requested number of repeats of undefined if no fillValue is given.
 * @param {number} len - Length of array to create.
 * @param {RealAny} fillValue [OPTIONAL]: Item to repeat 'len' number of times.
 * @return {Array<void|typeof fillValue>} Array containing 'len' # of repeats of 'fillValue'
 *                                        (or undefined if fillValue is not given)
 */
export const arrayN = <T>(len: number, fillValue?: T): void[] | T[] | never => {
    const nonIntegerFirstArgErr = 'mad-utils :: first arg to arrayN must be an integer';
    if (typeof len !== 'number' || isNaN(parseInt(len.toString(), 10))) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    if (len < 0) {
        throw new TypeError('mad-utils :: first arg to arrayN must be an integer above 0');
    }
    if (len.toString().match(/\./)) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    const cleanLen = (typeof len === 'string') ? parseInt(len, 10) : len;
    if (fillValue) return Array.from(Array(cleanLen)).map(item => fillValue);
    return Array.from(Array(cleanLen));
};


/************************ EXCLUDE ITEMS FROM START OR END OF ARRAY/STRING *************************/
/**
 * Exclude first item from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first item from.
 * @return {Array<any>} Array with first item excluded.
 */
export function withoutFirst<T>(str: string): string;
export function withoutFirst<T>(arr: T[]): T[];
export function withoutFirst<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(1);
}

/**
 * Exclude last item from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last item from.
 * @return {Array<any>} Array with last item excluded.
 */
export function withoutLast<T>(str: string): string;
export function withoutLast<T>(arr: T[]): T[];
export function withoutLast<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -1);
}

/**
 * Exclude first 2 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first 2 items from.
 * @return {Array<any>} Array with first 2 items excluded.
 */
export function withoutFirst2<T>(str: string): string;
export function withoutFirst2<T>(arr: T[]): T[];
export function withoutFirst2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(2);
}

/**
 * Exclude first 3 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first 3 items from.
 * @return {Array<any>} Array with first 3 items excluded.
 */
export function withoutFirst3<T>(str: string): string;
export function withoutFirst3<T>(arr: T[]): T[];
export function withoutFirst3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(3);
}

/**
 * Exclude last 2 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last 2 items from.
 * @return {Array<any>} Array with last 2 items excluded.
 */
export function withoutLast2<T>(str: string): string;
export function withoutLast2<T>(arr: T[]): T[];
export function withoutLast2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -2);
}

/**
 * Exclude last 3 items from string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last 3 items from.
 * @return {Array<any>} Array with last 3 items excluded.
 */
export function withoutLast3<T>(str: string): string;
export function withoutLast3<T>(arr: T[]): T[];
// tslint:disable-next-line: no-magic-numbers
export function withoutLast3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -3);
}

/**
 * Exclude given number of items from end of string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude last N items from.
 * @return {Array<any>} Array with last N items excluded.
 */
export function withoutLastN<T>(str: string, numToRm: number): string;
export function withoutLastN<T>(arr: T[], numToRm: number) : T[];
export function withoutLastN<T>(arrOrStr: T[] | string, numToRm: number): T[] | string {
    return arrOrStr.slice(0, (numToRm === 0) ? arrOrStr.length : (-1 * numToRm));
}

/**
 * Exclude given number of items from beginning of string or array.
 * @param {Array<any>|string} arrOrStr - Array or string to exclude first N items from.
 * @return {Array<any>} Array with first N items excluded.
 */
export function withoutFirstN<T>(str: string, numToRm: number): string;
export function withoutFirstN<T>(arr: T[], numToRm: number): T[];
export function withoutFirstN<T>(arrOrStr: T[] | string, numToRm: number): T[] | string {
    return arrOrStr.slice(1 * numToRm);
}

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
export const append =
    (arr1: RealAny[] | RealAny, arr2: RealAny[] | RealAny, ...arrs: RealAny[]): RealAny[] =>
{
    const isArr1Undefined = typeof arr1 === 'undefined' || arr1 === null;
    const isArr2Undefined = typeof arr2 === 'undefined' || arr2 === null;

    if (arrs.length > 0) {
        arr1 = arr1 || [];
        arr2 = arr2 || [];
    } else if (isArr1Undefined && isArr2Undefined) {
        return [];
    } else if (isArr1Undefined) {
        return arr2;
    } else if (isArr2Undefined) {
        return arr1;
    }

    const cleanArr = (arr: RealAny[]) =>
        (arr.constructor.name !== 'Array' && arr.constructor.constructor.name !== 'Array')
            ? [arr] : arr;

    const first2Arrs = cleanArr(arr1).concat(cleanArr(arr2));

    return (arrs.length > 0)
        ? arrs.reduce((acc, arr) => acc.concat(arr), first2Arrs)
        : first2Arrs;
};

/**
 * Return new array with all items in arr2OrItem removed from array1; or if array2 is
 * not an array, remove matching item from array1. NON-MUTATIVE. PERFORMANCE-INTENSIVE.
 * @param {any[]} arr1 - Array to remove items from.
 * @param {any[]|any} arr2OrItem - Remove all items in this array, or remove item if not an array.
 * @return {any[]} arr1 with all items in arr2OrItem (or the item itself) removed.
 */
export function removeMatches(arr1: RealAny[], arr2: any): RealAny[];
export function removeMatches(arr1: RealAny[], arr2: RealAny[]): RealAny[];
export function removeMatches(arr1: RealAny[], arr2: RealAny[] | any): RealAny[] {
    return arr1.filter(arr1Item => {
        if (isArray(arr2)) {
            return (arr2 as Array<any>).every(arr2Item => arr2Item !== arr1Item);
        }
        return arr1Item !== arr2;
    });
}

/**
 * Return new array with all falsy values in the given array eliminated.
 * @param {Array} arr - Array containing any values of any type.
 * @return {Array} - input array minus falsy vals. Eliminates 0, '', null, undefined, NaN, false.
 */
export const rmAllFalsy = (arr: RealAny[]) => arr.filter(item => !!item);

/**
 * Split large multiline string into array where each line is an item. Also removes blank lines.
 * @param {String} str - Multiline string to split into array where each line is an array item.
 *                       Splits on '\n' char.
 * @param {Object} opts::
 *        @param {boolean} preserveEmptyLines - If true, remove all blank lines. Off by default.
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed.
 */
export const splitLines =
(str: string, opts: { preserveEmptyLines: boolean } = { preserveEmptyLines: false }): string[] =>
    opts.preserveEmptyLines
        ? str.toString().split('\n')
        : rmAllFalsy(str.toString().split('\n'));

// TODO test countOccurrences.

/**
 * Count number of occurrences of matching value in the array.
 * @param {any[]} arr - Array to search for the item.
 * @param {any} value - Item to search for in the array.
 * @return {number} Number of occurrences of the item in the array.
 */
export function countOccurrences(arr: any[], value: any): number;

/**
 * Count number of occurrences of each value in the array. Return map containing all values.
 * @param {any[]} arr - Array to search for the item.
 * @return {Map<any, number>} Map of each item in the array vs. its number of occurences.
 */
export function countOccurrences(arr: any[]): Map<any, number>;
export function countOccurrences(arr: any[], value?: any): Map<any, number> | number {
    const map = new Map<any, number>();
    for (let item of arr) map.set(item, (map.get(item) || 0) + 1);
    return (typeof value === 'undefined') ? map : map.get(value);
}

/**
 * Namespace for certain "reversed" operations.
 */
export const without = {
    last: withoutLast,
    last2: withoutLast2,
    last3: withoutLast3,
    lastN: withoutLastN,
    first: withoutFirst,
    first2: withoutFirst2,
    first3: withoutFirst3,
    firstN: withoutFirstN,
};

export { isArray } from './types-iso';
