/******************************************** IMPORTS *********************************************/
import { isNonexistentOrString, RealAny, isArray } from './types-iso';
import { matchesIgnoreCase, replaceAll } from './string';
import { englishVariants, frenchVariants } from './internal/lang-constants';
import deepFreezeStrict = require('deep-freeze-strict');
import { isVerbose } from 'env-var-helpers';

/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
export const assignFrozenClone = <T>(...args: {}[]): Readonly<T> => {
    return deepFreezeStrict<T>(Object.assign({}, ...args));
};

/**
 * [MUTATIVE] Deep freeze the given object.
 * @param {Object} obj - Object to deeply freeze.
 * @return {Readme<Object>} The original object, frozen. Note that it freezes the object itself as
 *                          well - it does not create a frozen copy (the return is for convenience)
 */
export const deepFreeze = <T>(obj: T): Readonly<T> => {
    return deepFreezeStrict<T>(obj);
};

type MergeParamTypes = Object | string | any[] | null | undefined;

/**
 * [IMMUTABLE] merge all objects, strings, or arrays together.
 * If given all nulls and/or undefineds, returns {}.
 * NOTE: Cannot handle cases where first 2 values are undefined/null, & the 3rd
 * is another type.
 * @param {Array<Object|string|any[]|undefined|null>} objs - items to merge.
 *        Note that all must be the same type (array, string, or object), but
 *        it can also handle undefined or null values (it skips them).
 *        Also handles pile of undefineds or nulls, which cause it to return {}.
 * @return {Object|string|Array<any>} Given items merged together, or {} if only
 *                                    received nulls and/or undefineds.
 */
export const merge = (...objs: MergeParamTypes[]): Object | string | any[] => {
    // Handle no given params. Return {} in this case.
    if (objs.length === 0) return {};
    // Determine if first value is null or undefined.
    const isFirstUndef = typeof objs[0] === 'undefined' ;
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

    // Handle arrays - merge all the arrays in this case. Skip over null or undefined
    if (isArray(objs[0]) || (isFirstEmpty && isArray(objs[1]))) {
        return objs.reduce<any[]>((acc: any[], curArr: any[]) => {
            if (typeof curArr === 'undefined' || curArr == null) return acc;
            return acc.concat(curArr);
        }, []);
    }

    // Handle strings - merge all strings into one giant string.
    if (typeof objs[0] === 'string' || (isFirstEmpty && typeof objs[1] === 'string')) {
        return objs.reduce<string>((acc: string, curArr: string) => {
            if (typeof curArr === 'undefined' || curArr == null) return acc;
            return acc + curArr;
        }, '');
    }

    // Handle objects - merge all the objects into one object in this case.
    return objs.reduce((acc: Object, curObj: Object) => {
        if (typeof curObj === 'undefined' || curObj == null) return acc;
        if (typeof curObj === 'string') {
            throw new Error(`If given an object as the 1st value, merge will only accept objects` +
                ` for the rest of the values, However, merge was given a ${typeof curObj}.`);
        }
        return Object.assign(acc, curObj);
    }, {});
};

/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
export const get = <T extends Object>(propPath: string[] | string, objIn: T): RealAny | void => {
    if (typeof objIn === 'undefined' || objIn == null) return null;

    return (typeof propPath === 'string' ? propPath.split('.') : propPath)
        .reduce((obj, objPathPt: string) => {
            const exists = typeof obj !== 'undefined' && typeof obj === 'object' && obj != null;
            if (!exists) return null;
            if (obj[objPathPt]) return obj[objPathPt];
            return null;
        }, objIn);
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
        typeof obj === 'object' && obj !== null
        && Object.keys(obj).length > 0
        && Object.keys(obj).find(key => {
            if (englishVariants.find(matchesIgnoreCase(key)) ||
                frenchVariants.find(matchesIgnoreCase(key)))
            {
                matchingKey = key;
                return true;
            }
        })
        && (typeof matchingKey === 'string'
            || matchingKey == null
            || matchingKey == undefined)
        && isNonexistentOrString(obj[matchingKey])
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
export const eachPair =
    <T extends Object>(func: ((val: T[keyof T], key?: keyof T) => void | RealAny)) => (obj: T): T =>
{
    Object.keys(obj).forEach((key: keyof T) => func(obj[key], key));
    return obj;
};

/**
 * Get number of keys/pairs in an object. If given a non-object, return 0.
 * @param {Object} obj - Object to get the number of keys of.
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys).
 */
export const numKeys = (obj: RealAny): number => {
    if (typeof obj !== 'object' || obj == null || obj == undefined) return 0;
    return Object.keys(obj).length;
}
export const numPairs = numKeys;

/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
export const hasKey = <T extends Object>(obj: T, matchKey: string): boolean => {
    if (typeof obj === 'object' && obj != null) {
        return Object.keys(obj).some((k: keyof T) => k === matchKey);
    }
    return false;
};

// TODO reducePair
