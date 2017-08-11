"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var moment = require("moment");
var error_1 = require("./error");
var env_var_helpers_1 = require("env-var-helpers");
var string_1 = require("./string");
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {StringOrNonexistent|RealAny} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
exports.isNonexistentOrString = function (val) {
    return (typeof val === 'undefined') || (val === null) || (typeof val === 'string');
};
/**
 * Returns true if the given argument is a number, a string that can be parsed into a number, or
 * a 1-item array containing either aforementioned type.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} val - item being tested for number-like nature.
 * @return {boolean} True if item is number-like, otherwise false.
 */
exports.isNumberLike = function (val) {
    if (typeof val === 'undefined' || val == null)
        return false;
    if (typeof val === 'number' && !isNaN(val))
        return true;
    if (typeof val === 'string') {
        if (val.replace('.', '').replace(/^\-/, '').match(/\D/))
            return false;
        // Let '.123' and '-.123' type strings through.
        var cleanVal = val.match(/^\.\d/) ? '0' + val : val;
        cleanVal = val.match(/^\-\.\d/) ? val.replace(/^-./, '-0.') : cleanVal;
        return !isNaN(parseInt(cleanVal, 10));
    }
    if (exports.isArray(val) && val.length === 1) {
        return exports.isNumberLike(val[0]);
    }
    return false;
};
/**
 * @alias isNumberLike
 */
exports.isNumLike = exports.isNumberLike;
/**
 * Returns true if given value is an integer (does not include num-like strings).
 * @param {any} val - value to check type of.
 * @return {boolean} true if given value is integer.
 */
exports.isInteger = function (val) {
    if (exports.isNumberLike(val) && parseInt(val, 10) === parseFloat(val))
        return true;
    return false;
};
/**
 * True if val is an integer or a string that can be converted to an integer.
 * @param {any} val - Item to test.
 * @return {boolean} true if tested item is integer-like (or an integer).
 */
exports.isIntegerLike = function (val) {
    if (!exports.isNumberLike(val))
        return false;
    var vStr = val.toString();
    return !string_1.matches(/\./g)(val) || vStr.endsWith('.');
};
/**
 * True if val is a string or a number.
 * @param {any} val - Item to test.
 * @return {boolean} true if tested item is a string or a number.
 */
exports.isStringOrNumber = function (val) { return typeof val === 'string' || exports.isNumberLike(val); };
/**
 * @alias for isInteger
 */
exports.isInt = exports.isInteger;
/**
 * Returns true if val is true or false.
 * @param {any} val - Item to test.
 * @return {boolean} true if val is a boolean.
 */
exports.isBoolean = function (val) {
    if ((val === true) || (val === false))
        return true;
    var hasValueOfFn = val && val.valueOf && typeof val.valueOf === 'function';
    if (hasValueOfFn && ((val.valueOf() === true) || (val.valueOf() === false)))
        return true;
    return false;
};
/**
 * Returns true if the given argument is a moment instance, Date instance, or any string, number,
 * or object that moment is able to parse. Excludes negative numbers and strings that parse to
 * negative numbers, and objects with date-irrelevant keys (e.g. { year: 1123, bear: 'grizzly' })
 * @param {any} val - Item to test for Date-like properties
 * @return {boolean} True if item is date-like.
 */
exports.isDateLike = function (val) {
    if ((val instanceof moment) || (val instanceof Date))
        return true;
    if ((typeof val === 'number' && val < 0) || (typeof val === 'string' && parseInt(val) < 0)) {
        return false;
    }
    if (typeof val === 'object' && Object.keys(val).find(function (key) {
        return !key.match(/((hours?)|(minutes?)|((milli)?seconds?)|(days?)|(dates?)|(months?)|(years?))/);
    })) {
        return false;
    }
    return moment(val)._isValid;
};
/**
 * True if the given object is an array. Robust and works across multiple JS environments.
 * @param {any} val - Check if this is an array.
 * @return {boolean} True if arg 'value' is an Array,
 */
exports.isArray = function (val) {
    // Works in fully compliant ES5, ES6, ES7, ES8 ES[+] environments (Node, new browsers, etc.)
    if (Array.isArray)
        return Array.isArray(val);
    // Works in browsers without Array.isArray.
    return !!((val)
        && val.constructor
        && (val.constructor.name === 'Array'
            || (Object.getPrototypeOf && Object.getPrototypeOf(val.constructor) === Array)
            || (val.constructor.__proto__ && val.constructor.__proto__.name === 'Array')));
};
/**
 * True if the given value is any variant of true ('true', 'True', 'TRUE', 'T', 't', or true).
 * @param {any} val Check if this is a variant of true.
 * @return {boolean} true if given value is a variant of true, otherwise false.
 */
exports.isTrue = function (val) {
    return !!(val === 'true' || val === 'True' || val === 'TRUE' || val === true);
};
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 *
 * @example
 *       @singleton
 *       class SomeSingleton {
 *           someString: string;
 *           constructor(someString) {
 *               this.someString = someString
 *           }
 *       }
 *
 *  // It will now only be possible to create one instance of class SomeSingleton.
 */
exports.singleton = function (constructor) {
    var varargs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varargs[_i - 1] = arguments[_i];
    }
    if (varargs.length > 0) {
        throw new error_1.DecoratorError('Can only apply @singleton to classes', 'singleton', constructor);
    }
    var SingletonClass = (_a = (function (_super) {
            __extends(SingletonClass, _super);
            function SingletonClass() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = this;
                if (SingletonClass._instance)
                    return SingletonClass._instance;
                _this = _super.apply(this, args) || this;
                SingletonClass._instance = _this;
                return SingletonClass._instance;
            }
            return SingletonClass;
        }(constructor)),
        _a._instance = null,
        _a.new = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!_a._instance) {
                _a._instance = new (_a.bind.apply(_a, [void 0].concat(args)))();
            }
            return _a._instance;
        },
        _a);
    Object.defineProperty(SingletonClass, 'name', { value: constructor.name });
    return SingletonClass;
    var _a;
};
/**
 * Convert item to a number (if given item is of a type that can be converted as such).
 * If not, throw an error if this is specified.
 * @param {NumLike} numLike - value to cast to a number
 * @param {boolean} throwOnFail (OPTIONAL) - When true, throw if given type isn't a number.
 *                              When false, return an Error if given type isn't a number.
 * @return {number|Error|never} value converted to number, Error, or nothing if it threw error.
 */
exports.castToNum = function (numLike, throwOnFail) {
    if (throwOnFail === void 0) { throwOnFail = true; }
    if (typeof numLike === 'number')
        return numLike;
    if (exports.isNumberLike(numLike))
        return parseFloat(numLike);
    var baseErrMsg = 'castToNum can only accept numbers, #s in string form e.g. "1", or 1-item' +
        (" arrays containing either type. Invalid value: " + numLike);
    if (throwOnFail) {
        throw new Error(baseErrMsg);
    }
    else {
        if (env_var_helpers_1.isVerbose)
            console.error("WARNING: " + baseErrMsg);
        return new Error(baseErrMsg);
    }
};
/**
 * Convert string representation of a boolean value to a boolean value. Return error if this
 * isn't possible. If something is already a boolean, it simply passes it through.
 * @example converts 'yes' to true, 'f' to false, 'true' to true, true to true, 'n' to false, etc.
 * @param {string|boolean} val - value to convert to string or boolean. Must be 'y', 'n', 't', 'f',
 *                               'yes', no', 'true', or 'false' (case-insensitive); or a boolean.
 * @return {boolean|Error} true if val is y, t, yes, or true. false if it's n, f, no, or false.
 *                         Otherwise throw.
 */
exports.boolStringToBool = function (val) {
    var lcVal = val.toString().toLowerCase();
    if (lcVal === 'true' || lcVal === 't' || lcVal === 'y' || lcVal === 'yes') {
        return true;
    }
    else if (lcVal === 'false' || lcVal === 'f' || lcVal === 'n' || lcVal === 'no') {
        return false;
    }
    throw new TypeError('Must input true, false, t, f, y, n, yes, or no');
};
/**
 * @alias for boolStringToBool
 */
exports.toBoolFromBoolString = exports.boolStringToBool;
var object_1 = require("./object");
exports.isMultilangTextObj = object_1.isMultilangTextObj;
//# sourceMappingURL=types-iso.js.map