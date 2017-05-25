/******************************************** IMPORTS *********************************************/
import { RealAny } from './types-iso';

/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return last item in an array. */
export const last = <T>(arr: T[]): T => arr.slice(-1)[0];

/** Return second last item in an array. */
export const secondLast = <T>(arr: T[]): T => arr.slice(-2, -1)[0];
/** Return third last item in an array. */
export const thirdLast = <T>(arr: T[]): T => arr.slice(-3, -2)[0];  // tslint:disable-line:no-magic-numbers max-line-length

/** Return last 2 items in an array. */
export const last2 = <T>(arr: T[]): T[] => arr.slice(-2);
/** Return last 3 items in an array. */
export const last3 = <T>(arr: T[]): T[] => arr.slice(-3); // tslint:disable-line:no-magic-numbers

/** Return last N items in an array. */
export const lastN = <T>(arr: T[], n: number): T[] => arr.slice(-1 * n);

/** Return first item in an array. */
export const first = <T>(arr: T[]): T => arr[0];
/** Return second item in an array. */
export const second = <T>(arr: T[]): T => arr[1];
/** Return third item in an array. */
export const third = <T>(arr: T[]): T => arr[2];

/** Return first 2 items in an array. */
export const first2 = <T>(arr: T[]): T[] => arr.slice(0, 2);
/** Return first 3 items in an array. */
export const first3 = <T>(arr: T[]): T[] => arr.slice(0, 3);

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

/**
 * Return first N items in an array. Returned the whole array if you request too many items.
 */
export function firstN <T>(arr: T[], n: number): T[] {
    return (arr.length >= n)
        ? arrayN<void>(n).map((item, idx) => arr[idx])
        : arr;
}

/**
 * Exclude the first few or the last few items.
 */
export const withoutLast = <T>(arr: T[]) : T[] => arr.slice(0, -1);
export const withoutLast2 = <T>(arr: T[]) : T[] => arr.slice(0, -2);
// tslint:disable-next-line: no-magic-numbers
export const withoutLast3 = <T>(arr: T[]) : T[] => arr.slice(0, -3);
export const withoutLastN = <T>(arr: T[], numToRm: number) : T[] => arr.slice(0, -1 * numToRm);
export const withoutFirst = <T>(arr: T[]) : T[] => arr.slice(1);
export const withoutFirst2 = <T>(arr: T[]) : T[] => arr.slice(2);
export const withoutFirst3 = <T>(arr: T[]) : T[] => arr.slice(3);
export const withoutFirstN = <T>(arr: T[], numToRm: number) : T[] => arr.slice(1 * numToRm);


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
