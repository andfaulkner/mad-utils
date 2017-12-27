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
export declare const get: <O = any, T extends object = {}>(objIn: T, propPath: string | string[], defaultValue?: O) => O;
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
export { numKeys as numPairs };
/**
 * Powerful key inspection tool. Shows keys of object and all objects in its prototype chain.
 * Displays object name at each layer in the chain
 * @param {Object} obj - Object to get the keys of
 * @param {Object} showHidden - If true, also display hidden keys.
 * @param {boolean} showProtoChainPosition If true, log objects showing each key's prototype
 *                                         chain position & the associated objects' names.
 * @return {string[]} List of keys in obj & its prototype chain (w/ hidden keys if showHidden=true)
 */
export declare const inspectKeyTree: (obj: any, showHidden?: boolean, showProtoChainPosition?: boolean) => string[];
export { inspectKeyTree as inspectKeys };
export { inspectKeyTree as keyInspector };
export { inspectKeyTree as keyTreeInspector };
/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
export declare const hasKey: <T extends Object>(obj: T, matchKey: string) => boolean;
export { hasKey as containsKey };
export { hasKey as includesKey };
/********************************************* MERGE **********************************************/
export declare type MergeParamTypes<T> = Object | string | T[] | any[] | null | undefined;
export declare type MergeReturnTypes<T> = Object | string | T[] | any[] | {};
/**
 * [NON-MUTATIVE] merge all objects into a single object.
 * @param {Object} o1 - First object to merge in.
 * @param {Object} ...objs - Optional additional objects to merge in.
 * @return {Object} conglomerate object. Contains all key-value pairs from all args given.
 */
export declare function merge<P, Q, R, S, T, U, V, W, X, Y, Z, L>(o1: P, o2?: Q, o3?: R, o4?: S, o5?: T, o6?: U, o7?: V, o8?: W, o9?: X, o10?: Y, o11?: Z, o12?: L): P & Q & R & S & T & U & V & W & X & Y & Z & L;
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
/*********************************** ADD NEW OBJECT PROPERTIES ************************************/
/**
 * Create settings object for an immutable property.
 */
export declare const immutablePropConfig: <T = any>(value: T) => {
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
    value: T;
};
export declare const mutablePropConfig: <T = any>(value: T) => {
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
    value: T;
};
/**
 * Define a property on an object. By default
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to assign value at
 * @param {RealAny} val Value to assign to property on object 'obj' (first param)
 * @param {boolean} mutable If true, make new property mutable. Defaults to false.
 * @return {Object} with new property added.
 */
export declare const defineProp: <NewKVPair extends Object = {}, InputObject extends Object = {}>(obj: InputObject, keyName: string, val: any, mutable?: boolean) => InputObject & NewKVPair;
/**
 * Define an immutable public property on an object.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
export declare const defineImmutableProp: <NewKVPair extends Object = {}, InputObject extends Object = {}>(obj: InputObject, keyName: string, propVal: any) => InputObject & NewKVPair;
export { defineImmutableProp as defineImmutableMethod };
export { defineImmutableProp as addImmutableProp };
export { defineImmutableProp as addImmutableMethod };
/**
 * Define a mutable (even deletable) public property on an object.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 *
 * @return {Object} Initial object with given property added
 */
export declare const defineMutableProp: <NewKVPair extends Object = {}, InputObject extends Object = {}>(obj: InputObject, keyName: string, propVal: any) => InputObject & NewKVPair;
export { defineMutableProp as defineMutableMethod };
export { defineMutableProp as addMutableProp };
export { defineMutableProp as addMutableMethod };
/**
 * Define a public mutable (even deletable) getter property on an object.
 * @generic <InputObject> - Type of object being merged into.
 * @generic <NProps> - Interface containing new getter prop and its type.
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new getter prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new getter property.
 *
 * @return {Object} Initial object with given property added
 */
export declare const defineGetterProp: <NewKVPair extends Object = {}, InputObject extends Object = {}>(obj: InputObject, keyName: string, propVal: () => any) => InputObject & NewKVPair;
export { defineGetterProp as addGetterProp };
export { defineGetterProp as addGetter };
export { defineGetterProp as defineGetter };
export { defineGetterProp as addGetProp };
export { defineGetterProp as defineGetProp };
