import { isNonexistentOrString } from './types';
import { matchesIgnoreCase } from './string';
import deepFreeze = require('deep-freeze-strict');

/********************************************* OBJECT *********************************************/

/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
export const assignFrozenClone = <T>(...args: {}[]): Readonly<T> => {
    return deepFreeze<T>(Object.assign({}, ...args));
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
export const get = <T extends Object>(propPath: string[] | string, obj: T): any | void => {
    const propPathClean: string[] = (typeof propPath === 'string') ? propPath.split('.')
                                                                   : propPath;
    return propPathClean
        .map((prop) => typeof prop === 'number' ? parseInt(prop, 10) : prop)
        .reduce((obj, propPathPart: string) => {
            if (!(obj && obj[propPathPart])) return null;
            if (obj[propPathPart].constructor.name === 'array') {
                return (obj && obj[propPathPart]) ? obj[propPathPart] : null
            }
        }, obj);
};

/**
 * Return true if val is (probably) a multilanguage string object.
 *
 * Not foolproof - assumes one of the languages is English, and that it's either Canadian, British,
 * or American English - or 'generic' English (with no locale specified).
 *
 * If English is not one of the languages, this will not work.
 *
 * TODO test this - a lot more.
 *
 * @param {val} val - Value to type check.
 * @return {boolean} true if object's properties suggest it's a multilanguage string object.
 */
export const isMultilangTextObj = (obj: any): boolean => {
    const englishVariants = ['en', 'en_ca', 'en_gb', 'en_us'];
    let matchingKey;
    return !!(typeof obj === 'object'
              && Object.keys(obj).length > 1
              && Object.keys(obj).find(key => {
                  if (englishVariants.find(matchesIgnoreCase(key))) {
                      matchingKey = key;
                      return true;
                  }
              })
              && typeof matchingKey === 'string'
              && isNonexistentOrString(obj[matchingKey]));
};

/**
 * Run the given function on the given object. Iterator operates on the value and key of any
 * object provided, in the order "val", "key".
 *
 * @param {Function} func - (val, key) => void | any. Function to iterates over provided object.
 * @param {T extends object} obj - Object to iterate over.
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
export const eachPair = <T extends Object>(func: ((val: T[keyof T], key?: keyof T) => void | any)) => (obj: T): T => {
    Object.keys(obj).forEach((key: keyof T) => func(obj[key], key));
    return obj;
};
