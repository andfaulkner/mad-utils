"use strict";
// TODO Test sortObject
// TODO Test inspectKeyTree
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
var string_1 = require("./string");
var lang_constants_1 = require("./internal/lang-constants");
var array_1 = require("./array");
var deepFreezeStrict = require("deep-freeze-strict");
var env_var_helpers_1 = require("env-var-helpers");
/********************************************* CONFIG *********************************************/
var assign = Object.assign, keys = Object.keys;
var braceMatchRegex = /(([^\[\]]+)|([[^\[\]]*\]))/g;
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
exports.deepFreeze = function (obj) { return deepFreezeStrict(obj); };
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
exports.get = function (obj, propPath, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    // Handle obj value of null
    if (obj === null)
        return obj;
    // Handle undefined obj
    if (typeof obj === 'undefined')
        return defaultValue;
    // Handle bad or empty prop paths
    if (propPath === '' || propPath == null || typeof propPath === 'undefined')
        return defaultValue;
    // Parse property path
    var propArr = typeof propPath === 'string'
        ? array_1.flatten(propPath
            .replace(/\.\.+/g, '.')
            .split('.')
            .map(function (str) { return str.match(braceMatchRegex).filter(function (s) { return s !== ']' && s !== '['; }); }))
        : propPath;
    // Walk obj by property path array
    return propArr.reduce(function (acc, key) {
        if (typeof acc === 'undefined' || acc === null)
            return defaultValue;
        if (typeof acc[key] === 'undefined')
            return defaultValue;
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
exports.isMultilangTextObj = function (obj) {
    var matchingKey;
    return !!(typeof obj === 'object' &&
        obj !== null &&
        keys(obj).length > 0 &&
        keys(obj).find(function (key) {
            if (lang_constants_1.englishVariants.find(string_1.matchesIgnoreCase(key)) ||
                lang_constants_1.frenchVariants.find(string_1.matchesIgnoreCase(key))) {
                matchingKey = key;
                return true;
            }
        }) &&
        (typeof matchingKey === 'string' || matchingKey == null || matchingKey == undefined) &&
        types_iso_1.isVoidOrString(obj[matchingKey]));
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
    keys(obj).forEach(function (key) { return func(obj[key], key); });
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
    return keys(obj).length;
};
exports.numPairs = exports.numKeys;
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
    var getKeys = showHidden ? Object.getOwnPropertyNames : keys;
    var getName = function (obj) { return obj && obj.constructor && obj.constructor.name; };
    var proto = obj && obj.__proto__;
    var proto2 = proto && proto.__proto__;
    var proto3 = proto2 && proto2.__proto__;
    var proto4 = proto3 && proto3.__proto__;
    var proto5 = proto4 && proto4.__proto__;
    var proto6 = proto5 && proto5.__proto__;
    var proto7 = proto6 && proto6.__proto__;
    var proto8 = proto7 && proto7.__proto__;
    var objData = { name: getName(obj), keys: getKeys(obj) };
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
        .reduce(function (acc, collKey) {
        return collKey === 'name' || collKey === 'keys' ? acc : acc.concat(objData[collKey].keys);
    }, [])
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
        return keys(obj).some(function (k) { return k === matchKey; });
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
/*********************************** ADD NEW OBJECT PROPERTIES ************************************/
// Select correct defineProperty (for use with defineImmutableProp)
var defineProperty = (Reflect && Reflect.defineProperty) || Object.defineProperty;
/**
 * Define a new property on an object. Does not overwrite existing property.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to assign value at
 * @param {RealAny} value Value to assign to property on object 'obj' (first param)
 * @param {boolean} mutable If true, make new property mutable. Defaults to false.
 * @return {Object} with new property added.
 */
exports.defineProp = function (obj, keyName, value, mutable, enumerable) {
    if (mutable === void 0) { mutable = 'immutable'; }
    if (enumerable === void 0) { enumerable = true; }
    defineProperty(obj, keyName, {
        enumerable: enumerable,
        configurable: mutable === 'deletable',
        writable: mutable !== false && mutable !== 'immutable',
        value: value,
    });
    return obj;
};
exports.defineProperty = exports.defineProp;
/**
 * Define a new method on an object. Naturally immutable & non-enumerable. Must be a function.
 * @generic <NewKVPairs> - Interface containing new function prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @param {Object} obj Object being merged into
 * @param {string} keyName Name of property to add function at
 * @param {Function} value Function to assign to key on object 'obj' (first param in NewKFPair)
 * @return {Object} with new property added
 */
exports.defineMethod = function (obj, keyName, func) {
    defineProperty(obj, keyName, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: func,
    });
    return obj;
};
/**
 * Define an immutable public property on an object. Does not overwrite existing property.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 * @return {Object} Initial object with given property added
 */
exports.defineImmutableProp = function (obj, keyName, propVal) {
    var res = exports.defineProp(obj, keyName, propVal, 'immutable');
    return (res || obj);
};
exports.defineImmutableMethod = exports.defineImmutableProp;
exports.addImmutableProp = exports.defineImmutableProp;
exports.addImmutableMethod = exports.defineImmutableProp;
/**
 * Define a mutable but not deletable public property on an obj. Doesn't overwrite existing props.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 *
 * @return {Object} Initial object with given property added
 */
exports.defineMutableProp = function (obj, keyName, propVal) {
    exports.defineProp(obj, keyName, propVal, 'mutable');
    return obj;
};
exports.defineMutableMethod = exports.defineMutableProp;
exports.addMutableProp = exports.defineMutableProp;
exports.addMutableMethod = exports.defineMutableProp;
/**
 * Define a deletable & mutable public property on an object. Doesn't overwrite existing props.
 * @generic <NewKVPairs> - Interface containing new prop and its type
 * @generic <InputObject> - Type of object being merged into
 *
 * @prop {Object} obj - Object being merged into.
 * @prop {string} keyName - Name of new prop to add to the gven object.
 * @prop {string} propVal - Actual value to assign to the new property.
 *
 * @return {Object} Initial object with given property added
 */
exports.defineDeletableProp = function (obj, keyName, propVal) {
    exports.defineProp(obj, keyName, propVal, 'deletable');
    return obj;
};
exports.defineDeletableMethod = exports.defineDeletableProp;
exports.addDeletableProp = exports.defineDeletableProp;
exports.addDeletableMethod = exports.defineDeletableProp;
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
exports.defineGetterProp = function (obj, keyName, propVal) {
    defineProperty(obj, keyName, { enumerable: true, configurable: true, get: propVal });
    return obj;
};
exports.addGetterProp = exports.defineGetterProp;
exports.addGetter = exports.defineGetterProp;
exports.defineGetter = exports.defineGetterProp;
exports.addGetProp = exports.defineGetterProp;
exports.defineGetProp = exports.defineGetterProp;
/******************************************** SORTING *********************************************/
/**
 * Sort an object by its keys, return duplicate object.
 *
 * @param {Object} obj Source object (sort its keys)
 * @return {Object} Duplicate of input object with keys sorted
 */
exports.sortObject = function (obj) {
    return keys(obj)
        .sort()
        .reduce(function (acc, key) {
        return assign(acc, (_a = {}, _a[key] = obj[key], _a));
        var _a;
    }, {});
};
/********************************************** OMIT **********************************************/
function isNonArrayOrFuncObj(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
function isObjectObject(val) {
    return isNonArrayOrFuncObj(val) && Object.prototype.toString.call(val) === '[object Object]';
}
function isPlainObject(val) {
    // If it's an object that returns [object Object]'
    if (isObjectObject(val) === false)
        return false;
    // If it has a modified constructor
    if (typeof val.constructor !== 'function')
        return false;
    // If it has a modified prototype
    if (isObjectObject(val.constructor.prototype) === false)
        return false;
    // If constructor does not have an Object-specific method
    if (val.constructor.prototype.hasOwnProperty('isPrototypeOf') === false)
        return false;
    // Most likely a plain Object
    return true;
}
function isObject(val) {
    return val != null && (isPlainObject(val) || typeof val === 'function' || Array.isArray(val));
}
/*
 * ACTUAL OMIT IMPLEMENTATION
 */
function omit(obj, props, fn) {
    if (!isObject(obj))
        return {};
    if (typeof props === 'function') {
        fn = props;
        props = [];
    }
    if (typeof props === 'string')
        props = [props];
    return keys(obj).reduce(function (acc, k) {
        return !props ||
            (props.indexOf(k) === -1 && (!types_iso_1.isFunction(fn) || fn(obj[k], k, obj)))
            ? assign(acc, (_a = {}, _a[k] = obj[k], _a))
            : acc;
        var _a;
    }, {});
}
exports.omit = omit;
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
//# sourceMappingURL=object.js.map