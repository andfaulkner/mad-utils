// TODO Test sortObject
// TODO Test inspectKeyTree

/******************************************** IMPORTS *********************************************/
import {isVoidOrString, RealAny, isArray, isFunction} from './types-iso';
import {matchesIgnoreCase, replaceAll} from './string';
import {englishVariants, frenchVariants} from './internal/lang-constants';
import {flatten, rmAllFalsy} from './array';

import deepFreezeStrict = require('deep-freeze-strict');
import {isVerbose} from 'env-var-helpers';

/********************************************* CONFIG *********************************************/
const {assign, keys} = Object;

const braceMatchRegex = /(([^\[\]]+)|([[^\[\]]*\]))/g;

/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
export const assignFrozenClone = <T>(...args: {}[]): Readonly<T> =>
    deepFreezeStrict<T>(assign({}, ...args));

/**
 * [MUTATIVE] Deep freeze the given object.
 * @param {Object} obj - Object to deeply freeze.
 * @return {Readme<Object>} The original object, frozen. Note that it freezes
 *                          the object itself as well - it does not create a
 *                          frozen copy (the return is for convenience).
 */
export const deepFreeze = <T>(obj: T): Readonly<T> => deepFreezeStrict<T>(obj);

/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
export const get = <
    RV = any,
    O extends object | number | string | Function | Symbol | boolean = {}
>(
    obj: O,
    propPath: string[] | string,
    defaultValue: RV = undefined
): RV => {
    // Handle obj value of null
    if (obj === null) return obj as null;

    // Handle undefined obj
    if (typeof obj === 'undefined') return defaultValue;

    // Handle bad or empty prop paths
    if (propPath === '' || propPath == null || typeof propPath === 'undefined') return defaultValue;

    // Parse property path
    const propArr =
        typeof propPath === 'string'
            ? rmAllFalsy(
                  flatten(
                      propPath
                          .replace(/\.\.+/g, '.')
                          .split('.')
                          .map(str => {
                              const match = str.match(braceMatchRegex);
                              return match && match.filter(s => s !== ']' && s !== '[');
                          })
                  )
              )
            : propPath;

    // Walk obj by property path array
    return (propArr as Array<string>).reduce((acc, key: string) => {
        if (typeof acc === 'undefined' || acc === null) return defaultValue;
        if (typeof acc[key] === 'undefined') return defaultValue;
        return acc[key];
    }, obj);
};

/**
 * Return true if val is (probably) a multilanguage string object (multi also includes '1 language')
 * Not foolproof: assumes one of the languages is either English or French. It won't work otherwise.
 *
 * @param {val} val - Value to type check.
 * @return {boolean} true if object's properties suggest it's a multilanguage string object.
 */
export const isMultilangTextObj = (obj: RealAny): boolean => {
    let matchingKey;
    return !!(
        typeof obj === 'object' &&
        obj !== null &&
        keys(obj).length > 0 &&
        keys(obj).find(key => {
            if (
                englishVariants.find(matchesIgnoreCase(key)) ||
                frenchVariants.find(matchesIgnoreCase(key))
            ) {
                matchingKey = key;
                return true;
            }
        }) &&
        (typeof matchingKey === 'string' || matchingKey == null || matchingKey == undefined) &&
        isVoidOrString(obj[matchingKey])
    );
};

/**
 * Run the given function on the given object. Iterator operates on the value and key of any
 * object provided, in the order "val", "key".
 *
 * @param {Function} func - (val, key) => void | any. Function to iterates over provided object.
 * @param {T extends object} obj - Object to iterate over.
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
export const eachPair = <T extends Object>(
    func: ((val: T[Extract<keyof T, string>], key?: Extract<keyof T, string>) => void | RealAny)
) => (obj: T): T => {
    keys(obj).forEach((key: Extract<keyof T, string>) => func(obj[key], key));
    return obj;
};

/**
 * Get number of keys/pairs in an object. If given a non-object, return 0.
 * @param {Object} obj - Object to get the number of keys of.
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys).
 */
export const numKeys = (obj: RealAny): number => {
    if (typeof obj !== 'object' || obj == null || obj == undefined) return 0;
    return keys(obj).length;
};
export {numKeys as numPairs};

/**
 * Powerful key inspection tool. Shows keys of object and all objects in its prototype chain.
 * Displays object name at each layer in the chain
 * @param {Object} obj - Object to get the keys of
 * @param {Object} showHidden - If true, also display hidden keys.
 * @param {boolean} showProtoChainPosition If true, log objects showing each key's prototype
 *                                         chain position & the associated objects' names.
 * @return {string[]} List of keys in obj & its prototype chain (w/ hidden keys if showHidden=true)
 */
export const inspectKeyTree = (
    obj,
    showHidden = true,
    showProtoChainPosition = false
): string[] => {
    const getKeys = showHidden ? Object.getOwnPropertyNames : keys;
    const getName = obj => obj && obj.constructor && obj.constructor.name;

    const proto = obj && (obj as any).__proto__;
    const proto2 = proto && (proto as any).__proto__;
    const proto3 = proto2 && (proto2 as any).__proto__;
    const proto4 = proto3 && (proto3 as any).__proto__;
    const proto5 = proto4 && (proto4 as any).__proto__;
    const proto6 = proto5 && (proto5 as any).__proto__;
    const proto7 = proto6 && (proto6 as any).__proto__;
    const proto8 = proto7 && (proto7 as any).__proto__;

    const objData = {name: getName(obj), keys: getKeys(obj)};
    if (proto) assign(objData, {__proto__: {name: getName(proto), keys: getKeys(proto)}});
    if (proto2) assign(objData, {__proto__2: {name: getName(proto2), keys: getKeys(proto2)}});
    if (proto3) assign(objData, {__proto__3: {name: getName(proto3), keys: getKeys(proto3)}});
    if (proto4) assign(objData, {__proto__4: {name: getName(proto4), keys: getKeys(proto4)}});
    if (proto5) assign(objData, {__proto__5: {name: getName(proto5), keys: getKeys(proto5)}});
    if (proto6) assign(objData, {__proto__6: {name: getName(proto6), keys: getKeys(proto6)}});
    if (proto7) assign(objData, {__proto__7: {name: getName(proto7), keys: getKeys(proto7)}});
    if (proto8) assign(objData, {__proto__8: {name: getName(proto8), keys: getKeys(proto8)}});

    if (showProtoChainPosition) {
        console.log(
            assign({}, objData, {
                prototypeKeys: obj.prototype ? getKeys(obj.prototype) : [],
                constructorKeys: obj.constructor ? getKeys(obj.constructor) : [],
            })
        );
    }

    const allKeysInPrototypeChain = getKeys(objData)
        .reduce(
            (acc, collKey) =>
                collKey === 'name' || collKey === 'keys' ? acc : acc.concat(objData[collKey].keys),
            []
        )
        .concat(objData.keys || []);
    console.log(allKeysInPrototypeChain);

    return allKeysInPrototypeChain;
};

export {inspectKeyTree as inspectKeys};
export {inspectKeyTree as keyInspector};
export {inspectKeyTree as keyTreeInspector};

/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
export const hasKey = <T extends Object>(obj: T, matchKey: string): boolean => {
    if (typeof obj === 'object' && obj != null) {
        return keys(obj).some((k: Extract<keyof T, string>) => k === matchKey);
    }
    return false;
};
export {hasKey as containsKey};
export {hasKey as includesKey};

// /**
//  * @returns true if object contains given key
//  */
// export const containsKey = (obj: object, key: string): boolean =>
//     keys(obj).some(objKet => objKet === key);

/********************************************* MERGE **********************************************/
export type MergeParamTypes<T> = Object | string | T[] | any[] | null | undefined;
export type MergeReturnTypes<T> = Object | string | T[] | any[] | {};

/**
 * [NON-MUTATIVE] merge all objects into a single object.
 * @param {Object} o1 - First object to merge in.
 * @param {Object} ...objs - Optional additional objects to merge in.
 * @return {Object} conglomerate object. Contains all key-value pairs from all args given.
 */
export function merge<P, Q, R, S, T, U, V, W, X, Y, Z, L>(
    o1: P,
    o2?: Q,
    o3?: R,
    o4?: S,
    o5?: T,
    o6?: U,
    o7?: V,
    o8?: W,
    o9?: X,
    o10?: Y,
    o11?: Z,
    o12?: L
): P & Q & R & S & T & U & V & W & X & Y & Z & L;

/**
 * [NON-MUTATIVE] merge all objects into a single object (deals with 'single argument' case).
 * @param {Object} obj Object to "merge" (since there's only one, it just merges with {})
 * @return {Object} Merged object (simply a duplicate of obj).
 */
export function merge<R>(obj: R): R;

/**
 * [NON-MUTATIVE] merge all strings into a single string.
 * @param {string} strs Strings to merge.
 * @return {string} Conglomerate string. E.g. given args 'ab' & 'cd', would return 'abcd'
 */
export function merge(...strs: string[]): string;
/**
 * [NON-MUTATIVE] concatenate all given arrays, of given type.
 * @param {Array<T>[]} arrs Arrays to concatenate, all of type T.
 * @return {T[]} Conglomerate array. e.g. given args [1, 2] & [3]], would return [1, 2, 3].
 */
export function merge<T>(...arrs: T[][]): T[];
/**
 * [NON-MUTATIVE] concatenate all given arrays, containing any types.
 * @param {Array<T>[]} arrs Arrays to concatenate, containing items of any type.
 * @return {T[]} Concatenated array (from params), containing only values of declared type (T).
 * @example merge<number>([1, 3], [6]); // => [1, 3, 6]. Return type: number[].
 */
export function merge(...objs: any[][]): any[];
/**
 * [NON-MUTATIVE] return empty object ({})
 */
export function merge(): {};
/**
 * [NON-MUTATIVE] return empty object ({})
 */
export function merge(obj: null | undefined): {};

/**
 * [NON-MUTATIVE] merge all objects, strings, or arrays together. All params must
 * be the same type (objects, strings, or arrays). Skips null or undefined values.
 * If given all nulls and/or undefineds, returns {}.
 * @param {Array<Object|string|any[]|undefined|null>} objs - items to merge.
 *        Note that all must be the same type (array, string, or object), but
 *        it can also handle undefined or null values (it skips them).
 *        Also handles pile of undefineds or nulls, which cause it to return {}.
 * @return {Object|string|Array<any>} Given items merged together, or {} if only
 *                                    received nulls and/or undefineds.
 */
export function merge<T>(...objs: MergeParamTypes<T>[]): MergeReturnTypes<T> {
    // Handle no given params. Return {} in this case.
    if (objs.length === 0) return {};
    // Determine if first value is null or undefined.
    const isFirstUndef = typeof objs[0] === 'undefined';
    const isFirstNull = objs[0] == null;
    const isFirstEmpty = isFirstUndef || isFirstNull;

    // Handle single null or undefined. Return {} in this case.
    if (isFirstEmpty && objs.length === 1) {
        const nilTypeName = isFirstUndef ? 'undefined' : 'null';
        if (isVerbose) console.trace(`WARNING: merge given ${nilTypeName}. Returning {}. Trace:`);
        return {};
    }

    // Handle cases where all args given are nulls and/or undefineds. Return {} in these cases.
    if (objs.every(obj => typeof obj === 'undefined' || obj == null)) return {};

    // Get type
    let firstNonNull = objs.find(val => typeof val !== undefined && val != null);
    let objType: string = typeof firstNonNull;
    if (isArray(firstNonNull)) objType = 'array';

    // Handle arrays - merge all the arrays in this case. Skip over null or undefined
    if (objType === 'array') {
        return objs.reduce<any[]>((acc: any[], curArr: any[]) => {
            if (typeof curArr === 'undefined' || curArr == null) return acc;
            return acc.concat(curArr);
        }, []);
    }

    // Handle strings - merge all strings into one giant string.
    if (objType === 'string') {
        return objs.reduce<string>((acc: string, curArr: string) => {
            if (typeof curArr === 'undefined' || curArr == null) return acc;
            return acc + curArr;
        }, '');
    }

    // Handle objects - merge all the objects into one object in this case.
    if (objType === 'object') {
        return objs.reduce((acc: Object, curObj: Object) => {
            if (typeof curObj === 'undefined' || curObj == null) return acc;
            if (typeof curObj === 'string' || isArray(curObj) || typeof curObj !== 'object') {
                throw new Error(
                    `If given object as the 1st value, merge will only accept ` +
                        `objects for the rest of the values, However, merge was given a ` +
                        `${isArray(curObj) ? 'array' : typeof curObj}.`
                );
            }
            return assign(acc, curObj);
        }, {});
    }
}

/*********************************** ADD NEW OBJECT PROPERTIES ************************************/
// Select correct defineProperty (for use with defineImmutableProp)
const defineProperty = (Reflect && Reflect.defineProperty) || Object.defineProperty;

/**
 * Define a new property on an object without overwriting existing property
 * @generic <R> Return object
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to assign value at
 * @param {RealAny} value Value to assign to property on object 'obj' (first param)
 * @param {boolean} mutable If true, make new property mutable. Defaults to false
 * @return {Object} with new property added
 */
export const defineProp = <R extends object = any>(
    obj: object,
    keyName: string,
    value: RealAny,
    mutable: false | true | 'deletable' | 'mutable' | 'immutable' = 'immutable',
    enumerable: boolean = true
): R => {
    defineProperty(obj, keyName, {
        enumerable,
        configurable: mutable === 'deletable',
        writable: mutable !== false && mutable !== 'immutable',
        value,
    });
    return obj as R;
};

export {defineProp as defineProperty};

/**
 * Define a new method on an object. Naturally immutable & non-enumerable. Must be a function.
 * @generic <R> Return object
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to add function at
 * @param {Function} value Function to assign to key on object 'obj' (first param in NewKVPair)
 * @return {Object} with new property added
 */
// export const defineMethod = <NewKVPair extends Object = {}, InputObject extends Object = {}>(
//     obj: InputObject,
//     keyName: string,
//     func: NewKVPair[keyof NewKVPair] & Function
// ): InputObject & NewKVPair => {
export const defineMethod = <R extends object = any>(
    obj: object,
    keyName: string,
    func: Function
): R => {
    defineProperty(obj, keyName, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: func,
    });
    return obj as R;
};

/**
 * Define an immutable public property on an object. Does not overwrite existing property.
 * @generic <R> Return object
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
export const defineImmutableProp = <R extends object = any>(
    obj: object,
    keyName: string,
    propVal: RealAny
): R => {
    const res = defineProp(obj, keyName, propVal, 'immutable');
    return (res || obj) as R;
};

export {defineImmutableProp as defineImmutableMethod};
export {defineImmutableProp as addImmutableProp};
export {defineImmutableProp as addImmutableMethod};

/**
 * Define a mutable but not deletable public property on an obj, without overwriting existing props
 * @generic <R> Return object
 *
 * @prop {Object} obj Object being merged into
 * @prop {string} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 *
 * @return {Object} Initial object with given property added
 */
export const defineMutableProp = <R extends object = any>(
    obj: object,
    keyName: string,
    propVal: RealAny
): R => {
    defineProp(obj, keyName, propVal, 'mutable');
    return obj as R;
};

export {defineMutableProp as defineMutableMethod};
export {defineMutableProp as addMutableProp};
export {defineMutableProp as addMutableMethod};

/**
 * Define a deletable & mutable public property on an object, without overwriting existing props
 * @generic <R> Return object
 *
 * @prop {Object} obj Object being merged into
 * @prop {string} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 *
 * @return {Object} Initial object with given property added
 */
export const defineDeletableProp = <R extends object = any>(
    obj: object,
    keyName: string,
    propVal: RealAny
): R => {
    defineProp(obj, keyName, propVal, 'deletable');
    return obj as R;
};

export {defineDeletableProp as defineDeletableMethod};
export {defineDeletableProp as addDeletableProp};
export {defineDeletableProp as addDeletableMethod};

/**
 * Define a public mutable (even deletable) getter property on an object
 * @generic <R> Return object
 *
 * @prop {Object} obj - Object being merged into
 * @prop {string} keyName - Name of new getter prop to add to the gven object
 * @prop {string} propVal - Actual value to assign to the new getter property
 *
 * @return {Object} Initial object with given property added
 */
export const defineGetterProp = <R extends object = any>(
    obj: object,
    keyName: string,
    propVal: () => any
): R => {
    defineProperty(obj, keyName, {enumerable: true, configurable: true, get: propVal});
    return obj as R;
};

export {defineGetterProp as addGetterProp};
export {defineGetterProp as addGetter};
export {defineGetterProp as defineGetter};
export {defineGetterProp as addGetProp};
export {defineGetterProp as defineGetProp};

/******************************************** SORTING *********************************************/
/**
 * Sort an object by its keys, return duplicate object
 *
 * @param {Object} obj Source object (sort its keys)
 * @return {Object} Duplicate of input object with keys sorted
 */
export const sortObject = (obj: Record<string, any>): Record<string, any> =>
    keys(obj)
        .sort()
        .reduce((acc, key) => assign(acc, {[key]: obj[key]}), {});

/********************************************** OMIT **********************************************/
function isNonArrayOrFuncObj(val: RealAny) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function isObjectObject(val: RealAny) {
    return isNonArrayOrFuncObj(val) && Object.prototype.toString.call(val) === '[object Object]';
}

function isPlainObject(val: RealAny) {
    // If it's an object that returns [object Object]'
    if (isObjectObject(val) === false) return false;

    // If it has a modified constructor
    if (typeof val.constructor !== 'function') return false;

    // If it has a modified prototype
    if (isObjectObject(val.constructor.prototype) === false) return false;

    // If constructor does not have an Object-specific method
    if (val.constructor.prototype.hasOwnProperty('isPrototypeOf') === false) return false;

    // Most likely a plain Object
    return true;
}

function isObject(val: RealAny) {
    return val != null && (isPlainObject(val) || typeof val === 'function' || Array.isArray(val));
}

export type OmitPred<T = any> = (val: T, key?: string, obj?: Object) => boolean;

/**
 * Omit property with the given key from obj
 * @param {string[]} prop Key to omit from the given object
 */
export function omit<R = O, O extends object = Object>(obj: O, prop: string): R;

/**
 * Omit all properties with keys matching strings in the given array, from obj
 * @param {string[]} props Keys to omit from the given object
 */
export function omit<R = O, O extends object = Object>(obj: O, props: string[]): R;

/**
 * Omit all properties from obj, where predicate doesn't return true
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export function omit<R = O, O extends object = Object, T = any>(obj: O, predicate: OmitPred<T>): R;

/**
 * Omit all properties from obj, where a) predicate returns falsy; or b) key matches given string
 * @param {string[]} prop Key to omit from the given object
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export function omit<R = O, O extends object = Object, T = any>(
    obj: O,
    prop: string,
    predicate: OmitPred<T>
): R;

/**
 * Omit all properties from object, where either:
 *     a) predicate returns falsy; or
 *     b) key matches one of the given strings
 * @param {string[]} props Keys to omit from the given object
 * @param {Function} predicate :: (val: any, key: string, coll?) => boolean
 */
export function omit<R = O, O extends object = Object, T = any>(
    obj: O,
    props: string[],
    predicate: OmitPred<T>
): R;

/*
 * ACTUAL OMIT IMPLEMENTATION
 */
export function omit<O extends object = Object, T = any>(
    obj: Object,
    props: string | string[] | OmitPred<T>,
    fn?: OmitPred<T>
) {
    if (!isObject(obj)) return {};

    if (typeof props === 'function') {
        fn = props;
        props = [];
    }

    if (typeof props === 'string') props = [props];

    return keys(obj).reduce(
        (acc, k) =>
            !props ||
            ((props as any[]).indexOf(k) === -1 && (!isFunction(fn) || fn(obj[k], k, obj)))
                ? assign(acc, {[k]: obj[k]})
                : acc,
        {}
    );
}

// /*
//  * ACTUAL OMIT IMPLEMENTATION
//  */
// export function omit<O extends object = Object, T = any>(
//     obj: Object,
//     props: string | string[] | OmitPred<T>,
//     fn?: OmitPred<T>
// ) {
//     if (!isObject(obj)) return {};
//     if (!props || props.length < 1) return obj;

//     if (typeof props === 'function') {
//         fn = props;
//         props = [];
//     }

//     if (typeof props === 'string') props = [props];

//     // Get all of own and inherited keys
//     let objKeys = [];
//     for (let key in props) {
//         if (
//             !(
//                 key === 'constructor' &&
//                 ((typeof obj[key] === 'function' && obj[key].prototype) ||
//                     Object.prototype.hasOwnProperty.call(obj, key))
//             )
//         ) {
//             objKeys.push(key);
//         }
//     }

//     return objKeys.reduce(
//         (acc, k) =>
//             !props ||
//             ((props as any[]).indexOf(k) === -1 && (!isFunction(fn) || fn(obj[k], k, obj)))
//                 ? assign(acc, {[k]: obj[k]})
//                 : acc,
//         {}
//     );
// }
