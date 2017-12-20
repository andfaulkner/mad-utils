"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
var string_1 = require("./string");
var lang_constants_1 = require("./internal/lang-constants");
var array_1 = require("./array");
var deepFreezeStrict = require("deep-freeze-strict");
var env_var_helpers_1 = require("env-var-helpers");
var assign = Object.assign;
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
    return deepFreezeStrict(assign.apply(void 0, [{}].concat(args)));
};
/**
 * [MUTATIVE] Deep freeze the given object.
 * @param {Object} obj - Object to deeply freeze.
 * @return {Readme<Object>} The original object, frozen. Note that it freezes
 *                          the object itself as well - it does not create a
 *                          frozen copy (the return is for convenience).
 */
exports.deepFreeze = function (obj) {
    return deepFreezeStrict(obj);
};
var braceMatchRegex = /(([^\[\]]+)|([[^\[\]]*\]))/g;
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
exports.get = function (objIn, propPath, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    // Handle bad values
    if ((typeof objIn === 'undefined')
        || (objIn == null)
        || (isNaN(objIn) && (objIn instanceof Number || typeof objIn === 'number'))
        || (propPath === '')
        || (propPath == null)
        || (typeof propPath === 'undefined')) {
        return defaultValue;
    }
    var propArr = (typeof propPath === 'string')
        ? array_1.flatten(propPath.replace(/\.\.+/g, '.')
            .split('.')
            .map(function (str) { return str.match(braceMatchRegex)
            .filter(function (subStr) { return (subStr !== ']') && (subStr !== '['); }); }))
        : propPath;
    return propArr.reduce(function (obj, objPathPt) {
        var exists = typeof obj !== 'undefined' && typeof obj === 'object' && obj != null;
        if (!exists)
            return defaultValue;
        if (obj[objPathPt])
            return obj[objPathPt];
        return defaultValue;
    }, objIn);
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
            if (lang_constants_1.englishVariants.find(string_1.matchesIgnoreCase(key)) ||
                lang_constants_1.frenchVariants.find(string_1.matchesIgnoreCase(key))) {
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
// TODO Test inspectKeyTree
/**
 * Powerful key inspection tool. Shows keys of object and all objects in its prototype chain.
 * Displays object name at each layer in the chain
 * @param {Object} obj - Object to get the keys of
 * @param {Object} showHidden - If true, also display hidden keys.
 * @param {boolean} showProtoChainPosition If true, log objects showing each key's prototype
 *                                         chain position & the associated objects' names.
 * @return {string[]} List of keys in obj & its prototype chain (w/ hidden keys if showHidden=true)
 */
exports.inspectKeyTree = function (obj, showHidden, showProtoChainPosition) {
    if (showHidden === void 0) { showHidden = true; }
    if (showProtoChainPosition === void 0) { showProtoChainPosition = false; }
    var getKeys = showHidden ? Object.getOwnPropertyNames : Object.keys;
    var getName = function (obj) { return obj && obj.constructor && obj.constructor.name; };
    var proto = obj && obj.__proto__;
    var proto2 = proto && proto.__proto__;
    var proto3 = proto2 && proto2.__proto__;
    var proto4 = proto3 && proto3.__proto__;
    var proto5 = proto4 && proto4.__proto__;
    var proto6 = proto5 && proto5.__proto__;
    var proto7 = proto6 && proto6.__proto__;
    var proto8 = proto7 && proto7.__proto__;
    var objData = { name: getName(obj), keys: getKeys(obj), };
    if (proto)
        assign(objData, { __proto__: { name: getName(proto), keys: getKeys(proto) } });
    if (proto2)
        assign(objData, { __proto__2: { name: getName(proto2), keys: getKeys(proto2) } });
    if (proto3)
        assign(objData, { __proto__3: { name: getName(proto3), keys: getKeys(proto3) } });
    if (proto4)
        assign(objData, { __proto__4: { name: getName(proto4), keys: getKeys(proto4) } });
    if (proto5)
        assign(objData, { __proto__5: { name: getName(proto5), keys: getKeys(proto5) } });
    if (proto6)
        assign(objData, { __proto__6: { name: getName(proto6), keys: getKeys(proto6) } });
    if (proto7)
        assign(objData, { __proto__7: { name: getName(proto7), keys: getKeys(proto7) } });
    if (proto8)
        assign(objData, { __proto__8: { name: getName(proto8), keys: getKeys(proto8) } });
    if (showProtoChainPosition) {
        console.log(assign({}, objData, {
            prototypeKeys: obj.prototype ? getKeys(obj.prototype) : [],
            constructorKeys: obj.constructor ? getKeys(obj.constructor) : [],
        }));
    }
    var allKeysInPrototypeChain = getKeys(objData)
        .reduce(function (acc, collKey) { return (collKey === 'name' || collKey === 'keys')
        ? acc
        : acc.concat(objData[collKey].keys); }, [])
        .concat(objData.keys || []);
    console.log(allKeysInPrototypeChain);
    return allKeysInPrototypeChain;
};
exports.inspectKeys = exports.inspectKeyTree;
exports.keyInspector = exports.inspectKeyTree;
exports.keyTreeInspector = exports.inspectKeyTree;
/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
exports.hasKey = function (obj, matchKey) {
    if (typeof obj === 'object' && obj != null) {
        return Object.keys(obj).some(function (k) { return k === matchKey; });
    }
    return false;
};
exports.containsKey = exports.hasKey;
exports.includesKey = exports.hasKey;
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
function merge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    // Handle no given params. Return {} in this case.
    if (objs.length === 0)
        return {};
    // Determine if first value is null or undefined.
    var isFirstUndef = typeof objs[0] === 'undefined';
    var isFirstNull = objs[0] == null;
    var isFirstEmpty = isFirstUndef || isFirstNull;
    // Handle single null or undefined. Return {} in this case.
    if (isFirstEmpty && objs.length === 1) {
        var nilTypeName = isFirstUndef ? 'undefined' : 'null';
        if (env_var_helpers_1.isVerbose)
            console.trace("WARNING: merge given " + nilTypeName + ". Returning {}. Trace:");
        return {};
    }
    // Handle cases where all args given are nulls and/or undefineds. Return {} in these cases.
    if (objs.every(function (obj) { return typeof obj === 'undefined' || obj == null; }))
        return {};
    // Get type
    var firstNonNull = objs.find(function (val) { return typeof val !== undefined && val != null; });
    var objType = typeof firstNonNull;
    if (types_iso_1.isArray(firstNonNull))
        objType = 'array';
    // Handle arrays - merge all the arrays in this case. Skip over null or undefined
    if (objType === 'array') {
        return objs.reduce(function (acc, curArr) {
            if (typeof curArr === 'undefined' || curArr == null)
                return acc;
            return acc.concat(curArr);
        }, []);
    }
    // Handle strings - merge all strings into one giant string.
    if (objType === 'string') {
        return objs.reduce(function (acc, curArr) {
            if (typeof curArr === 'undefined' || curArr == null)
                return acc;
            return acc + curArr;
        }, '');
    }
    // Handle objects - merge all the objects into one object in this case.
    if (objType === 'object') {
        return objs.reduce(function (acc, curObj) {
            if (typeof curObj === 'undefined' || curObj == null)
                return acc;
            if (typeof curObj === 'string' || types_iso_1.isArray(curObj) || typeof curObj !== 'object') {
                throw new Error("If given object as the 1st value, merge will only accept " +
                    "objects for the rest of the values, However, merge was given a " +
                    ((types_iso_1.isArray(curObj) ? 'array' : typeof curObj) + "."));
            }
            return assign(acc, curObj);
        }, {});
    }
}
exports.merge = merge;
;
/*********************************** ADD NEW OBJECT PROPERTIES ************************************/
// TODO test immutablePropConfig
/**
 * Create settings object for an immutable property.
 */
exports.immutablePropConfig = function (value) { return ({
    enumerable: true,
    configurable: false,
    writable: false,
    value: value
}); };
exports.mutablePropConfig = function (value) { return ({
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
}); };
// Select correct defineProperty (for use with defineImmutableProp)
var defineProperty = (Reflect && Reflect.defineProperty) || Object.defineProperty;
// TODO test defineImmutableProp
/**
 * Define an immutable public property on an object.
 * @param <O> - Type of object being merged into
 * @param <NProps> - Interface containing new prop and its type
 */
exports.defineProp = function (obj, methodName, method, mutable) {
    if (mutable === void 0) { mutable = false; }
    defineProperty(obj, methodName, mutable ? exports.mutablePropConfig(method) : exports.immutablePropConfig(method));
    return obj;
};
/**
 * Define an immutable public property on an object.
 * @generic <NProps> - Interface containing new prop and its type
 * @generic <O> - Type of object being merged into
 * @prop {Object} obj - Object being merged into.
 * @prop {string} propName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
exports.defineImmutableProp = function (obj, propName, propVal) {
    exports.defineProp(obj, propName, propVal, false);
    return obj;
};
exports.defineImmutableMethod = exports.defineImmutableProp;
exports.addImmutableProp = exports.defineImmutableProp;
exports.addImmutableMethod = exports.defineImmutableProp;
/**
 * Define a mutable (even deletable) public property on an object.
 * @generic <NProps> - Interface containing new prop and its type
 * @generic <O> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} propName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 *
 * @return {Object} Initial object with given property added
 */
exports.defineMutableProp = function (obj, propName, propVal) {
    exports.defineProp(obj, propName, propVal, true);
    return obj;
};
exports.defineMutableMethod = exports.defineMutableProp;
exports.addMutableProp = exports.defineMutableProp;
exports.addMutableMethod = exports.defineMutableProp;
/**
 * Define a public mutable (even deletable) getter property on an object.
 * @generic <O> - Type of object being merged into.
 * @generic <NProps> - Interface containing new getter prop and its type.
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} propName - Name of new getter prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new getter property.
 *
 * @return {Object} Initial object with given property added
 */
exports.defineGetterProp = function (obj, propName, propVal) {
    defineProperty(obj, propName, { enumerable: true, configurable: true, get: propVal });
    return obj;
};
exports.addGetterProp = exports.defineGetterProp;
exports.addGetter = exports.defineGetterProp;
exports.defineGetter = exports.defineGetterProp;
exports.addGetProp = exports.defineGetterProp;
exports.defineGetProp = exports.defineGetterProp;
//# sourceMappingURL=object.js.map