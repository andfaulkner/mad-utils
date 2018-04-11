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
var env_var_helpers_1 = require("env-var-helpers");
var string_1 = require("./string");
/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {StrOrVoid|RealAny} val Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
exports.isVoidOrString = function (val) {
    return typeof val === 'undefined' || val === null || typeof val === 'string';
};
/**
 * Detect whether given value is a number. (Note: NaN returns false here).
 * @param {any} val Test if val is a number
 * @return {boolean} If given value is a number, return true; otherwise return false.
 */
exports.isNumber = function (val) {
    if (typeof val === 'undefined' || val == null)
        return false;
    if (typeof val === 'number' && !isNaN(val))
        return true;
    if (Object.getPrototypeOf(val) === Number && !isNaN(val))
        return true;
    if (val instanceof Number)
        return true;
    return false;
};
exports.isNum = exports.isNumber;
/**
 * Returns true if the given argument is a number, a string that can be parsed into a number, or
 * a 1-item array containing either aforementioned type.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} val Item being tested for number-like nature.
 * @param {boolean} allowArrayWith1Num Return true for 1-item number arrays e.g. [7]. Default: false
 * @return {boolean} True if item is 'number-like', otherwise false.
 */
exports.isNumberLike = function (val, allowArrayWith1Num) {
    if (allowArrayWith1Num === void 0) { allowArrayWith1Num = false; }
    if (typeof val === 'undefined' || val == null)
        return false;
    if (exports.isNumber(val))
        return true;
    if (typeof val === 'string') {
        if (val
            .replace('.', '')
            .replace(/^\-/, '')
            .match(/\D/)) {
            return false;
        }
        // Allow strings in e.g. '.123' and '-.123' format to pass
        var cleanVal = val.match(/^\.\d/) ? '0' + val : val;
        cleanVal = val.match(/^\-\.\d/) ? val.replace(/^-./, '-0.') : cleanVal;
        return !isNaN(parseInt(cleanVal, 10));
    }
    // Avoid checking nested arrays for numbers to prevent e.g. [[[[[2]]]]] from returning true.
    // Also allows explicitly blocking single-item arrays with just 1 number ([5]) being true.
    if (!allowArrayWith1Num)
        return false;
    if (exports.isArray(val) && val.length === 1)
        return exports.isNumberLike(val[0], false);
    return false;
};
exports.isNumLike = exports.isNumberLike;
/**
 * Returns true if given value is an integer (does not include num-like strings).
 * @param {any} val Value to check type of.
 * @return {boolean} true if given value is integer.
 */
exports.isInteger = function (val) {
    if (Number.isInteger)
        return Number.isInteger(val);
    return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
};
exports.isInt = exports.isInteger;
/**
 * True if val is an integer or a string that can be converted to an integer.
 * @param {any} val - Item to test.
 * @return {boolean} true if tested item is integer-like (or an integer).
 */
exports.isIntegerLike = function (val) {
    if (exports.isInteger(val))
        return true;
    if (!exports.isNumberLike(val))
        return false;
    var vStr = val.toString();
    if (!string_1.matches(/\./g)(vStr) || vStr.endsWith('.'))
        return true;
    var strSplitOnDots = vStr.split('.');
    if (strSplitOnDots.length === 2)
        return !!strSplitOnDots[1].match(/^0*$/g);
    return false;
};
exports.isIntLike = exports.isIntegerLike;
/**
 * True if val is a string or a number.
 * @param {any} val - Item to test.
 * @return {boolean} true if tested item is a string or a number.
 */
exports.isStringOrNumber = function (val) {
    return typeof val === 'string' || exports.isNumberLike(val);
};
/**
 * Returns true if val is true or false.
 * @param {any} val - Item to test.
 * @return {boolean} true if val is a boolean.
 */
exports.isBoolean = function (val) {
    if (val === true || val === false)
        return true;
    var hasValueOfFn = val && val.valueOf && typeof val.valueOf === 'function';
    if (hasValueOfFn && (val.valueOf() === true || val.valueOf() === false))
        return true;
    return false;
};
exports.isBool = exports.isBoolean;
/**
 * Returns true if the given argument is a moment instance, Date instance, or any string, number,
 * or object that moment is able to parse. Excludes negative numbers and strings that parse to
 * negative numbers, and objects with date-irrelevant keys (e.g. { year: 1123, bear: 'grizzly' })
 * @param {any} val - Item to test for Date-like properties
 * @return {boolean} True if item is date-like.
 */
exports.isDateLike = function (val) {
    if (val instanceof moment || val instanceof Date)
        return true;
    if (((typeof val === 'number' || val instanceof Number) && val < 0) ||
        (typeof val === 'string' && parseInt(val, 10) < 0)) {
        return false;
    }
    if (typeof val === 'object' &&
        Object.keys(val).find(function (key) {
            return !key.match(/((hours?)|(minutes?)|((milli)?seconds?)|(days?)|(dates?)|(months?)|(years?))/);
        })) {
        return false;
    }
    return moment(val)._isValid;
};
/**
 * True if the given object is an array. Robust and works across multiple JS environments.
 * @param {any} val Check if val is an array.
 * @return {boolean} True if arg 'value' is an Array,
 */
exports.isArray = function (val) {
    // Works in fully compliant ES5, ES6, ES7, ES8 ES[+] environments (Node, new browsers, etc.)
    if (Array.isArray)
        return Array.isArray(val);
    // Works in browsers without Array.isArray.
    return !!(val &&
        val.constructor &&
        (val.constructor.name === 'Array' ||
            val instanceof Array ||
            // All ES5 and higher environments
            (Object.getPrototypeOf && Object.getPrototypeOf(val.constructor) === Array) ||
            // Pre-ES5 web browsers
            (val.constructor.__proto__ && val.constructor.__proto__.name === 'Array') ||
            // Ultra-robust (but noticeably slow) last-resort that works everywhere.
            Object.prototype.toString.call(val) === '[object Array]'));
};
/**
 * True if the given value is any variant of true ('true', 'True', 'TRUE', 'T', 't', or true).
 * @param {any} val Check if this is a variant of true.
 * @param {boolean} include1CharVal return true if given 't' or 'T' when include1CharVal is true.
 * @return {boolean} true if given value is a variant of true, otherwise false.
 */
exports.isTrue = function (val, include1CharVal) {
    if (include1CharVal === void 0) { include1CharVal = false; }
    return !!(val === 'true' ||
        val === 'True' ||
        val === 'TRUE' ||
        val === true ||
        (include1CharVal && val && (val === 't' || val === 'T')) ||
        (val &&
            val.toLowerCase &&
            (val.toLowerCase() === 'true' || (include1CharVal && val.toLowerCase() === 't'))));
};
/**
 * True if the given value is any variant of false ('false', 'False', 'FALSE', 'F', 'f', or false).
 * @param {any} val Check if this is a variant of false.
 * @param {boolean} include1CharVal return true if given 'f' or 'F' when include1CharVal is true.
 * @return {boolean} false if given value is a variant of false, otherwise false.
 */
exports.isFalse = function (val, include1CharVal) {
    if (include1CharVal === void 0) { include1CharVal = false; }
    return !!(val === 'false' ||
        val === 'False' ||
        val === 'FALSE' ||
        val === false ||
        (include1CharVal && (val === 'f' || val === 'F')) ||
        (typeof val !== 'undefined' &&
            val !== null &&
            val.toLowerCase &&
            (val.toLowerCase() === 'false' || (include1CharVal && val.toLowerCase() === 'f'))));
};
/**
 * @param {Any} val Return true if this value is a function
 * @return {boolean} True if val is a function, otherwise false
 */
exports.isFunction = function (val) {
    var str = Object.prototype.toString.call(val);
    return str === '[object Function]' || (typeof val === 'function' && str !== '[object RegExp]');
};
// TODO improve singleton design-time behaviour - i.e. proper type hints + Intellisense.
/**
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
 *  @param {T} constructor Class to make into a singleton
 */
exports.singleton = function (constructor) {
    var SingletonClass = (_a = /** @class */ (function (_super) {
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
            if (!_a._instance)
                _a._instance = new (_a.bind.apply(_a, [void 0].concat(args)))();
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
 * @param {NumLike} numLike Value to cast to a number
 * @param {boolean} throwOnFail (OPT) When true, throw if given type isn't a number.
 *                                    When false, return an Error if given type isn't a number.
 * @return {number|Error|never} value converted to number, Error, or nothing if it threw error.
 */
exports.castToNum = function (numLike, throwOnFail) {
    if (throwOnFail === void 0) { throwOnFail = true; }
    if (typeof numLike === 'number')
        return numLike;
    if (exports.isNumberLike(numLike, true))
        return parseFloat(numLike);
    var baseErrMsg = "castToNum can only accept numbers, #s in string form e.g. \"1\", or " +
        ("1-item arrays containing either type. Invalid value: " + numLike);
    if (throwOnFail) {
        throw new Error(baseErrMsg);
    }
    else {
        if (env_var_helpers_1.isVerbose)
            console.error("WARNING: " + baseErrMsg);
        return new Error(baseErrMsg);
    }
};
var bstbErrMsg = 'Must input true, false, t, f, y, n, yes, or no';
/**
 * Convert string representation of a boolean value to a boolean value. Return error if this
 * isn't possible. If something is already a boolean, it simply passes it through.
 * @example converts 'yes' to true, 'f' to false, 'true' to true, true to true, 'n' to false, etc.
 * @param {string|boolean} val Value to convert to string or boolean. Must be 'y', 'n', 't', 'f',
 *                             'yes', no', 'true', or 'false' (case-insensitive); or a boolean.
 * @return {boolean|Error} true if val is y, t, yes, or true. false if it's n, f, no, or false.
 *                         Otherwise throw.
 */
exports.boolStringToBool = function (val, strict) {
    if (strict === void 0) { strict = true; }
    // Ensure not void, undefined, or NaN, and that toString doesn't return null.
    if (typeof val === 'undefined' ||
        val === null ||
        isNaN(null) ||
        typeof val.toString() === 'undefined' ||
        typeof val.toString() !== 'string') {
        if (strict)
            throw new TypeError(bstbErrMsg);
        return null;
    }
    var lcVal = val.toString().toLowerCase();
    if (lcVal === 'true' || lcVal === 't' || lcVal === 'y' || lcVal === 'yes') {
        return true;
    }
    else if (lcVal === 'false' || lcVal === 'f' || lcVal === 'n' || lcVal === 'no') {
        return false;
    }
    if (strict)
        throw new TypeError(bstbErrMsg);
    return null;
};
exports.toBoolFromBoolString = exports.boolStringToBool;
//# sourceMappingURL=types-iso.js.map