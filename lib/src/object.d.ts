/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects
 * Completely safe, doesn't freeze the original object
 *
 * @param {...Object[]} args Any # of objects to merge together into the merged clone object
 * @return {Object} Frozen merged version of provided objects; Clones originals - no mutation
 */
export declare const assignFrozenClone: <T>(...args: {}[]) => Readonly<T>;
/**
 * [MUTATIVE] Deep freeze the given object
 *
 * @param {Object} obj Object to deeply freeze
 * @return {Readme<Object>} The original object, frozen
 *                          Note that it freezes the object itself - it doesn't
 *                          create a frozen copy (the return is for convenience)
 */
export declare const deepFreeze: <T>(obj: T) => Readonly<T>;
/**
 * Run the given function on the given object
 * Iterator operates on the value & key of any object provided, in order: 'val', 'key'
 *
 * @param {Function} to iterate over provided object -- (val, key) => void | any
 * @param {T extends object} obj Object to iterate over
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
export declare const eachPair: <T extends Object>(func: (val: T[Extract<keyof T, string>], key?: Extract<keyof T, string>) => any) => (obj: T) => T;
/**
 * Get number of keys/pairs in an object
 * If given a non-object, return 0
 *
 * @param {Object} obj Object to get the number of keys of
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys)
 */
export declare const numKeys: (obj: any) => number;
export { numKeys as numPairs };
/**
 * Powerful key inspection tool
 * Shows keys of object and all objects in its prototype chain
 * Displays object name at each layer in the chain
 *
 * @param {Object} obj Object to get the keys of
 * @param {Object} showHidden If true, also display hidden keys.
 * @param {boolean} showProtoChainPosition If true, log objects showing each key's prototype
 *                                         chain position & the associated objects' names
 * @return {string[]} List of keys in obj & its prototype chain (w/ hidden keys if showHidden=true)
 */
export declare const inspectKeyTree: (obj: any, showHidden?: boolean, showProtoChainPosition?: boolean) => string[];
export { inspectKeyTree as inspectKeys };
export { inspectKeyTree as keyInspector };
export { inspectKeyTree as keyTreeInspector };
/**
 * Determine if an object contains a given key
 *
 * @param {Object} obj Object to check for the given key
 * @param {string} matchKey Key to search for in obj
 * @return {boolean} true if obj contains matchKey
 */
export declare const hasKey: <T extends Object>(obj: T, matchKey: string) => boolean;
export { hasKey as containsKey };
export { hasKey as includesKey };
/**
 * Define a new property on an object without overwriting existing property
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to assign value at
 * @param {RealAny} value Value to assign to property on object 'obj' (first param)
 * @param {boolean} mutable If true, make new property mutable [Default: false]
 * @return {Object} with new property added
 */
export declare const defineProp: <R extends object = any>(obj: object, keyName: string, value: any, mutable?: boolean | "deletable" | "mutable" | "immutable", enumerable?: boolean) => R;
export { defineProp as defineProperty };
/**
 * Define a new method on an object. Naturally immutable & non-enumerable
 * Must be a function
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to add function at
 * @param {Function} value Function to assign to key on object 'obj' (1st param in NewKVPair)
 * @return {Object} with new property added
 */
export declare const defineMethod: <R extends object = any>(obj: object, keyName: string, func: Function) => R;
/**
 * Define an immutable public property on an object
 * Does not overwrite existing property
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
export declare const defineImmutableProp: <R extends object = any>(obj: object, keyName: string, propVal: any) => R;
export { defineImmutableProp as defineImmutableMethod };
export { defineImmutableProp as addImmutableProp };
export { defineImmutableProp as addImmutableMethod };
/**
 * Define a mutable but not deletable public property on an obj, without
 * overwriting existing props
 *
 * @prop {Object} obj Object being merged into
 * @prop {string} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 * @return {Object} Initial object with given property added
 */
export declare const defineMutableProp: <R extends object = any>(obj: object, keyName: string, propVal: any) => R;
export { defineMutableProp as defineMutableMethod };
export { defineMutableProp as addMutableProp };
export { defineMutableProp as addMutableMethod };
/**
 * Define a deletable & mutable public property on an object, without
 * overwriting existing props
 *
 * @prop {Object} obj Object being merged into
 * @prop {string} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 * @return {Object} Initial object with given property added
 */
export declare const defineDeletableProp: <R extends object = any>(obj: object, keyName: string, propVal: any) => R;
export { defineDeletableProp as defineDeletableMethod };
export { defineDeletableProp as addDeletableProp };
export { defineDeletableProp as addDeletableMethod };
/**
 * Define a public mutable (even deletable) getter property on an object
 * @generic <R> Return object
 *
 * @prop {Object} obj Object being merged into
 * @prop {string} keyName Name of new getter prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new getter property
 *
 * @return {Object} Initial object with given property added
 */
export declare const defineGetterProp: <R extends object = any>(obj: object, keyName: string, propVal: () => any) => R;
export { defineGetterProp as addGetterProp };
export { defineGetterProp as addGetter };
export { defineGetterProp as defineGetter };
export { defineGetterProp as addGetProp };
export { defineGetterProp as defineGetProp };
/******************************************** SORTING *********************************************/
/**
 * Sort an object by its keys, return duplicate object
 *
 * @param {Object} obj Source object (sort its keys)
 * @return {Object} Duplicate of input object with keys sorted
 */
export declare const sortObject: (obj: Record<string, any>) => Record<string, any>;
/********************************************** OMIT **********************************************/
export declare type OmitPred<T = any> = (val: T, key?: string, obj?: Object) => boolean;
/**
 * Omit property with the given key from obj
 * @param {string[]} prop Key to omit from the given object
 */
export declare function omit<R = O, O extends object = Object>(obj: O, prop: string): R;
/**
 * Omit all properties with keys matching strings in the given array, from obj
 * @param {string[]} props Keys to omit from the given object
 */
export declare function omit<R = O, O extends object = Object>(obj: O, props: string[]): R;
/**
 * Omit all properties from obj, where predicate doesn't return true
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export declare function omit<R = O, O extends object = Object, T = any>(obj: O, predicate: OmitPred<T>): R;
/**
 * Omit all properties from obj, where a) predicate returns falsy; or b) key
 * matches given string
 *
 * @param {string[]} prop Key to omit from the given object
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export declare function omit<R = O, O extends object = Object, T = any>(obj: O, prop: string, predicate: OmitPred<T>): R;
/**
 * Omit all properties from object, where either:
 *     a) predicate returns falsy; or
 *     b) key matches one of the given strings
 * @param {string[]} props Keys to omit from the given object
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export declare function omit<R = O, O extends object = Object, T = any>(obj: O, props: string[], predicate: OmitPred<T>): R;
/************************************** SAFE PROPERTY ACCESS **************************************/
/**
 * Safely get the given prop (via array of path props or 'access string') from
 * the given object
 *
 * @param {string[]|string} propPath String in 'key1.key2.etc' form, or array of strings
 *                                   where each item is a key to traverse into:
 *                                   e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj Object to get the value from using the given path
 * @return {any} Value found at the given path
 */
export declare const get: <RV = any, O extends string | number | boolean | object | Function | Symbol = {}>(obj: O, propPath: string | string[], defaultValue?: RV) => RV;
