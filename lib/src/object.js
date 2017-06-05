"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
var string_1 = require("./string");
var lang_variants_1 = require("./internal/lang-variants");
var deepFreezeStrict = require("deep-freeze-strict");
/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
exports.assignFrozenClone = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return deepFreezeStrict(Object.assign.apply(Object, [{}].concat(args)));
};
/**
 * [MUTATIVE] Deep freeze the given object.
 * @param {Object} obj - Object to deeply freeze.
 * @return {Readme<Object>} The original object, frozen. Note that it freezes the object itself as
 *                          well - it does not create a frozen copy (the return is for convenience)
 */
exports.deepFreeze = function (obj) {
    return deepFreezeStrict(obj);
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
exports.get = function (propPath, obj) {
    var propPathClean = (typeof propPath === 'string') ? propPath.split('.')
        : propPath;
    return propPathClean
        .map(function (prop) { return typeof prop === 'number' ? parseInt(prop, 10) : prop; })
        .reduce(function (obj, propPathPart) {
        if (!(obj && obj[propPathPart]))
            return null;
        if (obj[propPathPart].constructor.name === 'array') {
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null;
        }
    }, obj);
};
/**
 * Return true if val is (probably) a multilanguage string object (multi also includes '1 language')
 * Not foolproof: assumes one of the languages is either English or French. It won't work otherwise.
 *
 * @param {val} val - Value to type check.
 * @return {boolean} true if object's properties suggest it's a multilanguage string object.
 */
exports.isMultilangTextObj = function (obj) {
    var matchingKey;
    return !!(typeof obj === 'object' && obj !== null
        && Object.keys(obj).length > 0
        && Object.keys(obj).find(function (key) {
            if (lang_variants_1.englishVariants.find(string_1.matchesIgnoreCase(key)) ||
                lang_variants_1.frenchVariants.find(string_1.matchesIgnoreCase(key))) {
                matchingKey = key;
                return true;
            }
        })
        && (typeof matchingKey === 'string'
            || matchingKey == null
            || matchingKey == undefined)
        && types_iso_1.isNonexistentOrString(obj[matchingKey]));
};
/**
 * Run the given function on the given object. Iterator operates on the value and key of any
 * object provided, in the order "val", "key".
 *
 * @param {Function} func - (val, key) => void | any. Function to iterates over provided object.
 * @param {T extends object} obj - Object to iterate over.
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
exports.eachPair = function (func) { return function (obj) {
    Object.keys(obj).forEach(function (key) { return func(obj[key], key); });
    return obj;
}; };
/**
 * Get number of keys/pairs in an object. If given a non-object, return 0.
 * @param {Object} obj - Object to get the number of keys of.
 * @return {number} Number of keys in the object, or 0 if it's a non-object (or has no keys).
 */
exports.numKeys = function (obj) {
    if (typeof obj !== 'object' || obj == null || obj == undefined)
        return 0;
    return Object.keys(obj).length;
};
exports.numPairs = exports.numKeys;
/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
exports.hasKey = function (obj, matchKey) {
    if (typeof obj === 'object') {
        return Object.keys(obj).some(function (k) { return k === matchKey; });
    }
    return false;
};
//# sourceMappingURL=object.js.map