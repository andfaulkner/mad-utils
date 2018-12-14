// TODO Test sortObject
// TODO Test inspectKeyTree
// TODO Consider returning isObject, and make it a proper "is"-typed function

/******************************************** IMPORTS *********************************************/
import {RealAny, isArray, isFunction} from './types-iso';
import {flatten, rmAllFalsy} from './array';
import deepFreezeStrict = require('deep-freeze-strict');

/********************************************* CONFIG *********************************************/
const {assign, keys} = Object;
const braceMatchRegex = /(([^\[\]]+)|([[^\[\]]*\]))/g;

/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects
 * Completely safe, doesn't freeze the original object
 *
 * @param {...Object[]} args Any # of objects to merge together into the merged clone object
 * @return {Object} Frozen merged version of provided objects; Clones originals - no mutation
 */
export const assignFrozenClone = <T>(...args: {}[]): Readonly<T> =>
    deepFreezeStrict<T>(assign({}, ...args));

/**
 * [MUTATIVE] Deep freeze the given object
 *
 * @param {Object} obj Object to deeply freeze
 * @return {Readme<Object>} The original object, frozen
 *                          Note that it freezes the object itself - it doesn't
 *                          create a frozen copy (the return is for convenience)
 */
export const deepFreeze = <T>(obj: T): Readonly<T> => deepFreezeStrict<T>(obj);

/**
 * Run the given function on the given object
 * Iterator operates on the value & key of any object provided, in order: 'val', 'key'
 *
 * @param {Function} to iterate over provided object -- (val, key) => void | any
 * @param {T extends object} obj Object to iterate over
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
export const eachPair = <T extends Object>(
    func: ((val: T[Extract<keyof T, string>], key?: Extract<keyof T, string>) => void | RealAny)
) => (obj: T): T => {
    keys(obj).forEach((key: Extract<keyof T, string>) => func(obj[key], key));
    return obj;
};

/**
 * Get number of keys/pairs in an object
 * If given a non-object, return 0
 *
 * @param {Object} obj Object to get the number of keys of
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys)
 */
export const numKeys = (obj: RealAny): number => {
    if (typeof obj !== 'object' || obj == null || obj == undefined) return 0;
    return keys(obj).length;
};

export {numKeys as numPairs};

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
 * Determine if an object contains a given key
 *
 * @param {Object} obj Object to check for the given key
 * @param {string} matchKey Key to search for in obj
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

/*********************************** ADD NEW OBJECT PROPERTIES ************************************/
/**
 * Select correct defineProperty (for use with defineImmutableProp)
 */
const defineProperty = (Reflect && Reflect.defineProperty) || Object.defineProperty;

/**
 * Define a new property on an object without overwriting existing property
 *
 * @param {Object} obj Object being merged into
 * @param {string|number|symbol} keyName Name of property to assign value at
 * @param {RealAny} value Value to assign to property on object 'obj' (first param)
 * @param {boolean} mutable If true, make new property mutable [Default: false]
 * @return {Object} with new property added
 */
export const defineProp = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
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
 * Define a new method on an object. Naturally immutable & non-enumerable
 * Must be a function
 *
 * @param {Object} obj Object being merged into
 * @param {string|number|symbol} keyName Name of property to add function at
 * @param {Function} value Function to assign to key on object 'obj' (1st param in NewKVPair)
 * @return {Object} with new property added
 */
export const defineMethod = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
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
 * Define an immutable public property on an object
 * Does not overwrite existing property
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string|number|symbol} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
export const defineImmutableProp = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
    propVal: RealAny
): R => {
    const res = defineProp(obj, keyName, propVal, 'immutable');
    return (res || obj) as R;
};

export {defineImmutableProp as defineImmutableMethod};
export {defineImmutableProp as addImmutableProp};
export {defineImmutableProp as addImmutableMethod};

/**
 * Define a mutable but not deletable public property on an obj, without
 * overwriting existing props
 *
 * @prop {Object} obj Object being merged into
 * @prop {string|number|symbol} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 * @return {Object} Initial object with given property added
 */
export const defineMutableProp = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
    propVal: RealAny
): R => {
    defineProp(obj, keyName, propVal, 'mutable');
    return obj as R;
};

export {defineMutableProp as defineMutableMethod};
export {defineMutableProp as addMutableProp};
export {defineMutableProp as addMutableMethod};

/**
 * Define a deletable & mutable public property on an object, without
 * overwriting existing props
 *
 * @prop {Object} obj Object being merged into
 * @prop {string|number|symbol} keyName Name of new prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new property
 * @return {Object} Initial object with given property added
 */
export const defineDeletableProp = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
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
 * @prop {Object} obj Object being merged into
 * @prop {string|number|symbol} keyName Name of new getter prop to add to the gven object
 * @prop {string} propVal Actual value to assign to the new getter property
 *
 * @return {Object} Initial object with given property added
 */
export const defineGetterProp = <R extends object = any>(
    obj: object,
    keyName: string | number | symbol,
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

/********************************************** OMIT **********************************************/
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
 * Omit all properties from obj, where a) predicate returns falsy; or b) key
 * matches given string
 *
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

/************************************** SAFE PROPERTY ACCESS **************************************/
/**
 * Safely get the given prop (via array of path props or 'access string') from
 * the given object
 *
 * @param {string[]|string|number} propPath String in 'key1.key2.etc' form, number,
 *                                 or array of strings where each item is a key
 *                                 to traverse into:
 *                                 e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj Object to get the value from using the given path
 * @return {any} Value found at the given path
 */
export const get = <
    RV = any,
    O extends object | number | string | Function | Symbol | boolean = {}
>(
    obj: O,
    propPath: string[] | string | number,
    defaultValue: RV = undefined
): RV => {
    // Handle obj value of null
    if (obj === null) return obj as null;

    // Handle undefined obj
    if (typeof obj === `undefined`) return defaultValue;

    // Handle bad or empty prop paths
    if (propPath === `` || propPath == null || typeof propPath === `undefined`) return defaultValue;

    // Handle numeric prop paths
    if (typeof propPath === `number`) return obj[propPath.toString()];

    // Parse property path
    const propArr =
        typeof propPath === `string`
            ? rmAllFalsy(
                  flatten(
                      propPath
                          .replace(/\.\.+/g, `.`)
                          .split(`.`)
                          .map(str => {
                              const match = str.match(braceMatchRegex);
                              return match && match.filter(s => s !== `]` && s !== `[`);
                          })
                  )
              )
            : propPath;

    // Walk obj by property path array
    return (propArr as Array<string>).reduce((acc, key: string) => {
        if (typeof acc === `undefined` || acc === null) return defaultValue;
        if (typeof acc[key] === `undefined`) return defaultValue;
        return acc[key];
    }, obj);
};
