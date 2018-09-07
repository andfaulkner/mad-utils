/******************************************** IMPORTS *********************************************/
import {Any, RealAny, isArray} from './types-iso';

/******************************************** MATCHING ********************************************/
/**
 * @curried
 * Returns true if array matchVals contains valToFind
 * Uses simple JSON.stringify for array and object comparison
 * Sane behaviour for matching against null, undefined, NaN, etc. (e.g. NaN
 * matched against an array with NaN returns true)
 *
 * @param {Array<any>} matchVals Array to check for item matching valToFind
 * @param {any} valToFind Value to search for in matchVals
 *
 * @return {boolean} true if valToFind is found in matchVals
 */
export const matchAny = (matchVals: any[]) => (valToFind: any): boolean => {
    const isValToFindObj = typeof valToFind === 'object' && valToFind != null;
    const cleanValToFind = isValToFindObj ? JSON.stringify(valToFind) : valToFind;
    const isValToFindNaN = typeof valToFind === 'number' && isNaN(valToFind);
    return matchVals.some(val => {
        if (isValToFindNaN && typeof val === 'number' && isNaN(val)) return true;
        return isValToFindObj
            ? cleanValToFind === (val && JSON.stringify(val))
            : cleanValToFind === val;
    });
};

/**
 * Determine if an array contains a given value
 * @param {Array} arr Array to check for the given value
 * @param {string} val Value to search for in the array
 * @return {boolean} true if arr contains val
 */
export const contains = (arr: any[], val: any): boolean =>
    arr.some(
        item =>
            item === val ||
            (typeof item === 'number' && typeof val === 'number' && isNaN(item) && isNaN(val))
    );

export {contains as includes};

/*********************************** ARRAY & COLLECTION HELPERS ***********************************/

//
// SINGLE ITEM FROM START OR END
//

/**
 * Return first character of a string
 * @param {T[]} str String to return first character from
 */
export function first(str: string): string;

/**
 * Return first item of an array
 * @param {T[]} arr Array to return first item from
 */
export function first<T>(arr: T[]): T;
export function first<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr[0];
}

/**
 * Return 2nd character of a string
 * @param {T[]} str String to return 2nd character from
 */
export function second<T>(str: string): string;

/**
 * Return 2nd item of an array
 * @param {T[]} arr Array to return 2nd item from
 */
export function second<T>(arr: T[]): T;
export function second<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr[1];
}

/** Return third item in an array */
export function third<T>(str: string): string;
export function third<T>(arr: T[]): T;
export function third<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr[2];
}

/** Return last item in an array or string */
export function last(str: string): string;
export function last<T>(arr: T[]): T;
export function last<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr.slice(-1)[0];
}

/** Return second last item in an array or string */
export function secondLast(str: string): string;
export function secondLast<T>(arr: T[]): T;
export function secondLast<T>(arrOrStr: T[] | string): T | string {
    return arrOrStr.slice(-2, -1)[0];
}

/** Return third last item in an array */
// tslint:disable-next-line:no-magic-numbers max-line-length
export function thirdLast(str: string): string;
export function thirdLast<T>(arr: T[]): T;
export function thirdLast<T>(arrOrStr: T[] | string): T | string {
    // tslint:disable-next-line:no-magic-numbers
    return arrOrStr.slice(-3, -2)[0];
}

//
// MULTIPLE ITEMS FROM START OR END
//

/** Return first 2 items in an array */
export function first2<T>(str: string): string;
export function first2<T>(arr: T[]): T[];
export function first2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, 2);
}

/** Return first 3 items in an array */
export function first3<T>(str: string): string;
export function first3<T>(arr: T[]): T[];
// tslint:disable-next-line:no-magic-numbers
export function first3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, 3);
}

/** Return last 2 items in an array */
export function last2(str: string): string;
export function last2<T>(arr: T[]): T[];
export function last2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(-2);
}

/** Return last 3 items in an array */
export function last3(str: string): string;
export function last3<T>(arr: T[]): T[];
// tslint:disable-next-line:no-magic-numbers
export function last3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(-3);
}

//
// VARIABLE NUMBER OF ITEMS FROM START OR END
//

/**
 * @return 1st N items in an array or full array if you request more items than array contains
 */
export function firstN(str: string, n: number): string;
export function firstN<T>(arr: T[], n: number): T[];
export function firstN<T>(arrOrStr: T[] | string, n: number): T[] | string {
    if (typeof arrOrStr === 'string') return arrOrStr.slice(0, n);
    return arrOrStr.length >= n ? arrayN<void>(n).map((__, idx) => arrOrStr[idx]) : arrOrStr;
}

/** Return last N items in an array */
export function lastN(str: string, n: number): string;
export function lastN<T>(arr: T[], n: number): T[];
export function lastN<T>(arrOrStr: T[] | string, n: number): string | T[] {
    return arrOrStr.slice(-1 * n);
}

//
// CREATE NEW ARRAY
//

/**
 * Create array of requested # of repeats of given fillVal, or undefined if no fillVal given
 * @param {number} len Length of array to create
 * @param {RealAny} fillVal Item to repeat 'len' number of times {OPT}
 * @return {Array<void|typeof fillVal>} Array w 'len' # of fillVal arg (or undefined) repeats
 */
export const arrayN = <T>(len: number, fillVal?: T): T[] | never => {
    const nonIntegerFirstArgErr = 'mad-utils :: first arg to arrayN must be an integer';

    if (typeof len !== 'number' || isNaN(parseInt(len.toString(), 10))) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    if (len < 0) throw new TypeError('mad-utils :: first arg to arrayN must be an integer above 0');
    if (len.toString().match(/\./)) throw new TypeError(nonIntegerFirstArgErr);

    const cleanLen = typeof len === 'string' ? parseInt(len, 10) : len;

    return typeof fillVal !== 'undefined'
        ? Array.from(Array(cleanLen)).map(__ => fillVal)
        : Array.from(Array(cleanLen));
};

/************************ EXCLUDE ITEMS FROM START OR END OF ARRAY/STRING *************************/
/**
 * Exclude first item from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude first item from
 * @return {Array<any>} Array with first item excluded
 */
export function withoutFirst<T>(str: string): string;
export function withoutFirst<T>(arr: T[]): T[];
export function withoutFirst<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(1);
}

/**
 * Exclude last item from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude last item from
 * @return {Array<any>} Array with last item excluded
 */
export function withoutLast<T>(str: string): string;
export function withoutLast<T>(arr: T[]): T[];
export function withoutLast<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -1);
}

/**
 * Exclude first 2 items from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude first 2 items from
 * @return {Array<any>} Array with first 2 items excluded
 */
export function withoutFirst2<T>(str: string): string;
export function withoutFirst2<T>(arr: T[]): T[];
export function withoutFirst2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(2);
}

/**
 * Exclude first 3 items from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude first 3 items from
 * @return {Array<any>} Array with first 3 items excluded
 */
export function withoutFirst3<T>(str: string): string;
export function withoutFirst3<T>(arr: T[]): T[];
export function withoutFirst3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(3);
}

/**
 * Exclude last 2 items from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude last 2 items from
 * @return {Array<any>} Array with last 2 items excluded
 */
export function withoutLast2<T>(str: string): string;
export function withoutLast2<T>(arr: T[]): T[];
export function withoutLast2<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -2);
}

/**
 * Exclude last 3 items from string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude last 3 items from
 * @return {Array<any>} Array with last 3 items excluded
 */
export function withoutLast3<T>(str: string): string;
export function withoutLast3<T>(arr: T[]): T[];
// tslint:disable-next-line: no-magic-numbers
export function withoutLast3<T>(arrOrStr: T[] | string): T[] | string {
    return arrOrStr.slice(0, -3);
}

/**
 * Exclude given number of items from end of string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude last N items from
 * @return {Array<any>} Array with last N items excluded
 */
export function withoutLastN<T>(str: string, numToRm: number): string;
export function withoutLastN<T>(arr: T[], numToRm: number): T[];
export function withoutLastN<T>(arrOrStr: T[] | string, numToRm: number): T[] | string {
    return arrOrStr.slice(0, numToRm === 0 ? arrOrStr.length : -1 * numToRm);
}

/**
 * Exclude given number of items from beginning of string or array
 * @param {Array<any>|string} arrOrStr Array or string to exclude first N items from
 * @return {Array<any>} Array with first N items excluded
 */
export function withoutFirstN<T>(str: string, numToRm: number): string;
export function withoutFirstN<T>(arr: T[], numToRm: number): T[];
export function withoutFirstN<T>(arrOrStr: T[] | string, numToRm: number): T[] | string {
    return arrOrStr.slice(1 * numToRm);
}

/**
 * @nonMutative
 *
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it
 *     If either arr1 or arr2 are undefined, it ignores it and just returns the other
 *     If both are undefined, it returns []
 *     If a non-array value besides null is given, it wraps the item in an array before
 *     performing the concatenation
 *
 * @param {Array<RealAny>|RealAny} arr1 If array, concatenate arr2 to the end
 *                                      If value, wrap in arr before concatenating
 *                                      (e.g. 3 is treated as [3]
 * @param {Array<RealAny>|RealAny} arr2 Array or value to concatenate to the end of arr1
 * @return {Array<RealAny>} Result of attaching arr2 to the end of arr1
 */
export function append(arr1: Any[] | Any, arr2: Any[] | Any, ...arrs: Any[]): Any[] {
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

    const first2Arrs = _cleanArrForAppend(arr1).concat(_cleanArrForAppend(arr2));

    return arrs.length > 0 ? arrs.reduce((acc, arr) => acc.concat(arr), first2Arrs) : first2Arrs;
}

/**
 * @nonMutative
 * @performanceIntensive

 * Return new array with all items in arr2OrItem removed from array1; or if
 * array2 is not an array, remove matching item from array1
 * @param {any[]} arr1 Array to remove items from
 * @param {any[]|any} arr2OrItem Remove all items in this array, or remove item if not an array
 * @return {any[]} arr1 with all items in arr2OrItem (or the item itself) removed
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

export type _FalsyType = 'allFalsy' | 'nullUndef' | 'keep0' | 'keepStr';

/**
 * Remove falsy values from the given array
 * By default removes all falsy val types, but 2nd param can set it to only rm
 * certain falsy types
 *
 * @param {Array} arr Array containing any values of any type
 * @param {string} falsyTypes: 'allFalsy'  [DEFAULT] Remove all falsy values
 *                             'nullUndef' Remove only null & undefined values
 *                             'keep0'     Remove all falsy values except 0
 *                             'keepStr'   Remove all falsy values except ''
 * @return {Array} arr param with falsy vals of set types removed (default: remove all falsy vals)
 */
export const rmAllFalsy = <T = any>(arr: T[], falsyType: _FalsyType = 'allFalsy'): T[] => {
    switch (falsyType) {
        case undefined:
        case 'allFalsy':
            return arr.filter(val => !!val);
        case 'keep0':
            return arr.filter(val => !!val || (val as any) === 0);
        case 'keepStr':
            return arr.filter(val => !!val || (val as any) === '');
        case 'nullUndef':
            return arr.filter(val => val !== null && typeof val !== 'undefined');
        default:
            throw new Error(
                `If set, Array.compact arg must be 1 of 'allFalsy', ` +
                    `'nullUndef', 'keep0', or 'keepStr'`
            );
    }
};

export {rmAllFalsy as compact};
export {rmAllFalsy as rmFalsyVals};

/**
 * Add item to array if item not already present in array
 *
 * @param {Array} arr Array to potentially add item to
 * @param {any} newItem Item to potentially add to array (if array doesn't already contain it)
 * @return {Array} Initially given array, with item potentially added
 */
export function pushIfUniq<T = any>(arr: T[], newItem: T): T[] {
    if (!arr.some(arrItem => arrItem === newItem)) arr.push(newItem);
    return arr;
}

export {pushIfUniq as pushIfNew};
export {pushIfUniq as pushUniq};

/**
 * Split large multiline string into array where each line is an item
 * Also removes blank lines
 *
 * @param {String} str Multiline string to split into array where each line is an array item
 *                       Splits on '\n' char
 * @param {Object} opts::
 *        @param {boolean} preserveEmptyLines If true, remove all blank lines. Off by default
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed
 */
export const splitLines = (
    str: string,
    opts: {preserveEmptyLines: boolean} = {preserveEmptyLines: false}
): string[] =>
    opts.preserveEmptyLines ? str.toString().split('\n') : rmAllFalsy(str.toString().split('\n'));

/**
 * Count number of occurrences of matching value in the array
 *
 * @param {any[]} arr Array to search for the item
 * @param {any} value Item to search for in the array
 * @return {number} Number of occurrences of the item in the array
 */
export function countOccurrences<T = any>(arr: T[] | string, value: T): number;

/**
 * Return map with number of occurrences of each value/char in the given array/string
 * { Map :: [ItemType] -> number }
 *
 * @param {any[]} arr Array to search for the item
 * @return {Map<any, number>} Map of each item in the array vs its number of occurences
 */
export function countOccurrences<T = any>(arr: T[] | string): Map<T, number>;
export function countOccurrences(arr: any[] | string, value?: any): Map<any, number> | number {
    const map = new Map<any, number>();
    for (let item of arr) map.set(item, (map.get(item) || 0) + 1);
    return typeof value === 'undefined' ? map : map.get(value);
}

export {countOccurrences as count};
export {countOccurrences as countAll};
export {countOccurrences as countItems};
export {countOccurrences as countArrayItems};

/**
 * Remove duplicate characters from the string
 * @param {string|Array} coll String to remove duplicates from
 * @return {string} String with no duplicate characters (unique characters only)
 */
export function removeDuplicates(str: string): string;

/**
 * Remove duplicate values from the array
 * @param {Array} coll Array to remove duplicates from
 * @return {Array} Array with no duplicates (unique values only)
 */
export function removeDuplicates<T = any>(coll: T[]): T[];

export function removeDuplicates(coll: string | any[]): any[] | string {
    const occurrences = countOccurrences(coll).keys();
    let out = [];
    let cur;
    while ((cur = occurrences.next().value)) out.push(cur);
    return typeof coll === 'string' ? out.join('') : out;
}

export {removeDuplicates as uniq};
export {removeDuplicates as uniqVals};
export {removeDuplicates as unique};
export {removeDuplicates as uniqueVals};
export {removeDuplicates as removeDuplicateVals};
export {removeDuplicates as removeDuplicateItems};

/**
 * Namespace for certain "reversed" operations
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

/**
 * @return {number} Random absolute value integer between 0 and the given integer
 */
function randomAbsIntBelow(len: number): number {
    return Math.floor(Math.random() * len);
}

/******************************************* COLLECTION *******************************************/
/**
 * Get a random value from an array, or return undefined if array is empty
 *
 * @param {Array} coll Array to get random value from
 * @return {any|undefined} Item randomly selected from given array
 */
export function sample<T = any>(coll: T[]): T | undefined;

/**
 * Return random entry ([key, value]) from given object/collection, or undefined
 * if it has no keys
 *
 * @param {Object} coll Object to get random value from
 * @return {[string, any]|undefined} Randomly selected [key, value] array from object
 */
export function sample<T = any>(coll: Record<string, T>): [string, T] | undefined;

/**
 * Return random character from given string, or undefined if it's an empty string
 * @param {string} coll String to get random character from
 * @return {string|undefined} Randomly selected character from string
 */
export function sample<T = any>(coll: string): string | undefined;

/**
 * Return random pair from given Map, or return [] if it's an empty Map
 * @param {Map<K, V>} coll Map to get random pair from
 * @return {[K, V]} Randomly selected pair from string, or [] if map is empty
 */
export function sample<K = any, V = any>(coll: Map<K, V>): [K, V] | undefined[];

/**
 * Return random item from given Set, or return undefined if it's an empty Set
 * @param {Set<K>} coll Set to get random item from
 * @return {K} Randomly selected item from string, or undefined if set is empty
 */
export function sample<K = any>(coll: Set<K>): K | undefined;

// TODO make sample work for non-standard iterables
// Implementation
export function sample<T = any, K = any, V = any>(
    coll: T[] | string | Record<string, T> | Map<any, any>
): T | string | [string, T] | undefined | [K, V] | undefined[] {
    if (isArray(coll)) {
        return coll[Math.floor(randomAbsIntBelow((coll as T[]).length))];
    }

    if (typeof coll === 'string' || coll instanceof String) {
        return coll.split('')[randomAbsIntBelow(coll.split('').length)];
    }

    if (coll instanceof Map || coll instanceof Set) {
        if (coll.size === 0) return [];
        return Array.from(coll)[randomAbsIntBelow(coll.size)];
    }

    // Non-map or set objects
    if (typeof coll === 'object') {
        const objKeys = Object.keys(coll);
        if (objKeys.length === 0) return;
        const selectedKey = objKeys[randomAbsIntBelow(objKeys.length)];
        return [selectedKey, coll[selectedKey]];
    }
}

/**
 * Recursive function to help flatten an array
 */
const _flatWalker = <T = any>(accIn: T[], arr: T[]): T[] =>
    arr.reduce((acc, cur) => (isArray(cur) ? _flatWalker(acc, cur) : acc.concat(cur)), accIn);

/**
 * Deeply flatten an array ([arr]) - e.g. [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 * @param {Array} arr Array (or set of nested arrays) to flatten
 * @return {Array} Flattened array
 */
export const flatten = <T = any>(arr: T[]): T[] => _flatWalker([], arr);

/***************************************** BARREL EXPORT ******************************************/
export {isArray} from './types-iso';

/**************************************** INTERNAL HELPERS ****************************************/
/**
 * Ensures an array is an array
 */
function _cleanArrForAppend(a: RealAny[]) {
    return a.constructor.name !== 'Array' && a.constructor.constructor.name !== 'Array' ? [a] : a;
}
