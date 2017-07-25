/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
export declare const assignFrozenClone: <T>(...args: {}[]) => Readonly<T>;
/**
 * [MUTATIVE] Deep freeze the given object.
 * @param {Object} obj - Object to deeply freeze.
 * @return {Readme<Object>} The original object, frozen. Note that it freezes
 *                          the object itself as well - it does not create a
 *                          frozen copy (the return is for convenience).
 */
export declare const deepFreeze: <T>(obj: T) => Readonly<T>;
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
export declare const get: <T extends Object>(propPath: string | string[], objIn: T) => any;
/**
 * Return true if val is (probably) a multilanguage string object (multi also includes '1 language')
 * Not foolproof: assumes one of the languages is either English or French. It won't work otherwise.
 *
 * @param {val} val - Value to type check.
 * @return {boolean} true if object's properties suggest it's a multilanguage string object.
 */
export declare const isMultilangTextObj: (obj: any) => boolean;
/**
 * Run the given function on the given object. Iterator operates on the value and key of any
 * object provided, in the order "val", "key".
 *
 * @param {Function} func - (val, key) => void | any. Function to iterates over provided object.
 * @param {T extends object} obj - Object to iterate over.
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
export declare const eachPair: <T extends Object>(func: (val: T[keyof T], key?: keyof T) => any) => (obj: T) => T;
/**
 * Get number of keys/pairs in an object. If given a non-object, return 0.
 * @param {Object} obj - Object to get the number of keys of.
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys).
 */
export declare const numKeys: (obj: any) => number;
export declare const numPairs: (obj: any) => number;
/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
export declare const hasKey: <T extends Object>(obj: T, matchKey: string) => boolean;
/********************************************* MERGE **********************************************/
export declare type MergeParamTypes<T> = Object | string | T[] | any[] | null | undefined;
export declare type MergeReturnTypes<T> = Object | string | T[] | any[] | {};
/**
 * [NON-MUTATIVE] merge all objects into a single object.
 * @param {Object} obj1 First object to merge into new object
 * @param {Object} obj2 Second object to merge into new object
 * @param {Object[]} otherObjs Any number of further objects to merge in.
 * @return {Object} conglomerate object. Contains all key-value pairs from all args given.
 */
export declare function merge<R, S>(obj1: S, obj2: R, ...otherObjs: S[]): R;
/**
 * [NON-MUTATIVE] merge all objects into a single object (deals with 'single argument' case).
 * @param {Object} obj Object to "merge" (since there's only one, it just merges with {})
 * @return {Object} Merged object (simply a duplicate of obj).
 */
export declare function merge<R>(obj: R): R;
/**
 * [NON-MUTATIVE] merge all strings into a single string.
 * @param {string} strs Strings to merge.
 * @return {string} Conglomerate string. E.g. given args 'ab' & 'cd', would return 'abcd'
 */
export declare function merge(...strs: string[]): string;
/**
 * [NON-MUTATIVE] concatenate all given arrays, of given type.
 * @param {Array<T>[]} arrs Arrays to concatenate, all of type T.
 * @return {T[]} Conglomerate array. e.g. given args [1, 2] & [3]], would return [1, 2, 3].
 */
export declare function merge<T>(...arrs: T[][]): T[];
/**
 * [NON-MUTATIVE] concatenate all given arrays, containing any types.
 * @param {Array<T>[]} arrs Arrays to concatenate, containing items of any type.
 * @return {T[]} Concatenated array (from params), containing only values of declared type (T).
 * @example merge<number>([1, 3], [6]); // => [1, 3, 6]. Return type: number[].
 */
export declare function merge(...objs: any[][]): any[];
/**
 * [NON-MUTATIVE] return empty object ({})
 */
export declare function merge(): {};
/**
 * [NON-MUTATIVE] return empty object ({})
 */
export declare function merge(obj: null | undefined): {};
