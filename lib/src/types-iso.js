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
var moment = require("moment");
var error_1 = require("./error");
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
 * Returns true if the given argument is a number or a string that can be parsed into a number.
 * Excludes NaN, which is not considered number-like. Accepts '.123' and '-.123' formatted numbers.
 * @param {RealAny} arg - item being tested for number-like nature.
 * @return {boolean} True if item is number-like, otherwise false.
 */
exports.isNumberLike = function (arg) {
    if (typeof arg === 'number' && !isNaN(arg))
        return true;
    if (typeof arg === 'string') {
        if (arg.replace('.', '').replace(/^\-/, '').match(/\D/))
            return false;
        // Let '.123' and '-.123' type strings through.
        var cleanArg = arg.match(/^\.\d/) ? '0' + arg : arg;
        cleanArg = arg.match(/^\-\.\d/) ? arg.replace(/^-./, '-0.') : cleanArg;
        return !isNaN(parseInt(cleanArg, 10));
    }
    return false;
};
/**
 * Returns true if the given arguments is a moment instance, Date instance, or any string that
 * moment is able to parse. Excludes negative numbers and strings that parse to negative numbers,
 * and objects with date-irrelevant keys.
 *
 * @param {any} arg - Item to test for Date-like properties
 * @return {boolean} True if item is date-like.
 */
exports.isDateLike = function (arg) {
    if ((arg instanceof moment) || (arg instanceof Date))
        return true;
    if ((typeof arg === 'number' && arg < 0) || (typeof arg === 'string' && parseInt(arg) < 0)) {
        return false;
    }
    if (typeof arg === 'object' && Object.keys(arg).find(function (key) {
        return !key.match(/((hours?)|(minutes?)|((milli)?seconds?)|(days?)|(dates?)|(months?)|(years?))/);
    })) {
        return false;
    }
    return moment(arg)._isValid;
};
/**
 * True if the given object is an array. Robust and works across multiple JS environments.
 *
 * @param {any} value - Check if this is an array.
 * @return {boolean} True if arg 'value' is an Array,
 */
exports.isArray = function (value) {
    // Fully compliant ES5, ES6, ES7, ES8 ES[+] environments
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
        && value.constructor
        && (value.constructor.name === 'Array'
            || (Object.getPrototypeOf && Object.getPrototypeOf(value.constructor) === Array)
            || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
};
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
exports.isInt = function (val) {
    var valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
        : (valAsFloat | 0) === valAsFloat;
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
var object_1 = require("./object");
exports.isMultilangTextObj = object_1.isMultilangTextObj;
//# sourceMappingURL=types-iso.js.map