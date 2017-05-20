/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return last item in an array. */
export declare const last: <T>(arr: T[]) => T;
/** Return second last item in an array. */
export declare const secondLast: <T>(arr: T[]) => T;
/** Return third last item in an array. */
export declare const thirdLast: <T>(arr: T[]) => T;
/** Return last 2 items in an array. */
export declare const last2: <T>(arr: T[]) => T[];
/** Return last 3 items in an array. */
export declare const last3: <T>(arr: T[]) => T[];
/** Return last N items in an array. */
export declare const lastN: <T>(arr: T[], n: number) => T[];
/** Return first item in an array. */
export declare const first: <T>(arr: T[]) => T;
/** Return second item in an array. */
export declare const second: <T>(arr: T[]) => T;
/** Return third item in an array. */
export declare const third: <T>(arr: T[]) => T;
/** Return first 2 items in an array. */
export declare const first2: <T>(arr: T[]) => T[];
/** Return first 3 items in an array. */
export declare const first3: <T>(arr: T[]) => T[];
/**
 * Return first N items in an array. Returned the whole array if you request too many items.
 */
export declare function firstN<T>(arr: T[], n: number): T[];
/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
export declare const arrayN: (len: number) => any[];
/**
 * Exclude the first few or the last few items.
 */
export declare const withoutLast: <T>(arr: T[]) => T[];
export declare const withoutLast2: <T>(arr: T[]) => T[];
export declare const withoutLast3: <T>(arr: T[]) => T[];
export declare const withoutLastN: <T>(arr: T[], numToRm: number) => T[];
export declare const withoutFirst: <T>(arr: T[]) => T[];
export declare const withoutFirst2: <T>(arr: T[]) => T[];
export declare const withoutFirst3: <T>(arr: T[]) => T[];
export declare const withoutFirstN: <T>(arr: T[], numToRm: number) => T[];
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
