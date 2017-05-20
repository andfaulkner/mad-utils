"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
require("reflect-metadata");
var moment = require("moment");
var chai_1 = require("chai");
var common_constants_1 = require("common-constants");
var array = require("./src/array");
__export(require("./src/array"));
var Enum = require("./src/enum");
__export(require("./src/enum"));
var error = require("./src/error");
__export(require("./src/error"));
// Import event module
var event = require("./src/event");
exports.event = event;
var event_1 = require("./src/event");
exports.addClickEventToId = event_1.addClickEventToId;
exports.mouseEventFactory = event_1.mouseEventFactory;
exports.removeClickEventFromId = event_1.removeClickEventFromId;
var object = require("./src/object");
__export(require("./src/object"));
var string = require("./src/string");
__export(require("./src/string"));
var types = require("./src/types");
__export(require("./src/types"));
// Import isNode (detect node vs browser)
var isNode = require("detect-node");
// Import DOM module
var dom = require("./src/dom");
exports.dom = dom;
var dom_1 = require("./src/dom");
exports.$ = dom_1.$;
/******************************************** LOGGING *********************************************/
var mad_logs_1 = require("mad-logs");
var log = mad_logs_1.logFactory()("mad-utils", mad_logs_1.logMarkers.default);
/******************************************* DECORATORS *******************************************/
/**
 * Method decorator factory. Marks method as not being usable in a web environment. Emits a
 * warning if method is called. Automatically adds it into a Reflect.defineMetadata compartment
 * marking web-unfriendly methods on the class, when containing class is instantiated.
 *
 * @param {string} alternative? - Method that should be used instead of the one called.
 * @param {string} envUsage - Environment the method is intended for use in.
 *
 * @return {Function} Actual decorator, for wrapping methods (this is a decorator factory).
 */
function notForWebUse(alternative, envUsage) {
    if (envUsage === void 0) { envUsage = 'native mobile client or Java server'; }
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('nonWebMethods', target.name + " :: " + propertyKey, target, '${target.name}_${propertyKey}');
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("Method " + propertyKey + " on class " + target.constructor.name + " cannot be used in a " +
                ("Javascript/Typescript environment - it is for " + envUsage + " usage only. ") +
                (alternative ? ('Use ' + alternative + ' instead.') : ''));
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.notForWebUse = notForWebUse;
;
/********************************************* ERRORS *********************************************/
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 */
exports.parseQueryParams = function (queryParamsString) {
    if (queryParamsString === void 0) { queryParamsString = window.location.search; }
    return queryParamsString.replace(/^\?/, '').split('&').reduce(function (acc, pair) {
        return Object.assign(acc, (_a = {},
            _a[pair.split('=')[0]] = pair.split('=')[1],
            _a));
        var _a;
    }, {});
};
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
exports.expectEmptyObject = function (testValue) {
    chai_1.expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    chai_1.expect(testValue).to.be.an('object');
    chai_1.expect(testValue).to.not.be.null;
    chai_1.expect(testValue).to.not.be.undefined;
};
/***************************************** JSON UTILITIES *****************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
exports.jsonStringifyWFuncs = function (obj) {
    return JSON.stringify(obj, function (key, value) {
        return typeof value === 'function' ? value.toString() : value;
    });
};
var newlineStr = "\n";
exports.jsonParseWFuncRehydrate_unsafe = function (json) {
    var objFromStrJSON = JSON.parse(json, function (key, val) {
        if (typeof val === 'function') {
            var isFuncStr = val.match(/^function\s+[a-zA-Z0-9_\$]*?\s*\([^\)]*\)[\s\n]*\{.*\}$/);
            var isLambdaStr = val.match(/^\([^\)]*\)\s\=>\s/);
            if (isLambdaStr || isFuncStr) {
                // Detect all args from function string, pull them into an array.
                var funcArgs = _extractArgsFromFuncStr(val);
                // Exclude unneeded parts in all function strings (both arrow & regular function)
                var funcStr = _baseCleanFuncStrForNewFunc(val);
                // Type-specific cleanups on function string (separate cleans for arrow & regular)
                if (isFuncStr) {
                    funcStr = funcStr.replace(/^function[^\(]\([^\)]*\)\s*\{\) => \{?/, '');
                }
                else if (isLambdaStr) {
                    funcStr = funcStr.replace(/^\([^\)]*\) => \{?/, '');
                }
                var newFunc = new (Function.bind.apply(Function, [void 0].concat(funcArgs, [funcStr])))();
                return log.verbose(newFunc);
            }
        }
        return val;
    });
    log.verbose("JSONParseWFuncRehydrate_unsafe :: objFromStrJSON:", objFromStrJSON);
    return objFromStrJSON;
};
/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function.
 * @param {string} valStr - Stringified function, to perform clean on.
 * @return {string} partially cleaned function string.
 */
var _baseCleanFuncStrForNewFunc = function (valStr) { return valStr.replace(/\}$/, '}').replace(/\'/g, '"').replace(/\n/g, newlineStr); };
/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text).
 * @param {Function} valStr - Stringified function.
 * @return {string[]} Arguments pulled from the stringified function
 */
var _extractArgsFromFuncStr = function (valStr) { return valStr.match(/^[^\(]*\([^\)]*\)/)[0].replace(/^[^\(]*\(/, '').replace(/\)/g, '').split(/,\s*/); };
/**
 * True if the given year is a leap year.
 */
function isLeapYear(year) {
    if (year % 4 === 0 && year % 100 !== 0)
        return true;
    if (year % 400 === 0)
        return true;
    return false;
}
exports.isLeapYear = isLeapYear;
/**
 * Convert numeric day of the week to string day of the week.
 * Monday is the 1st day (1 becomes 'Monday', 2 becomes 'Tuesday', 7 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
function convertDayOfWeekNumToString(day) {
    switch (day.toString()) {
        case '0': return 'Sunday';
        case '1': return 'Monday';
        case '2': return 'Tuesday';
        case '3': return 'Wednesday';
        case '4': return 'Thursday';
        case '5': return 'Friday';
        case '6': return 'Saturday';
        default: {
            throw new Error("INVALID DAY OF WEEK: MUST BE NUMBER FROM 0 TO 6. Input day: " + day);
        }
    }
}
exports.convertDayOfWeekNumToString = convertDayOfWeekNumToString;
/**
 * Split a date into a more convenient date info object
 */
exports.parseDate = function (date) {
    var year = date.getFullYear();
    var ms = date.getMilliseconds();
    var isLeap = isLeapYear(year);
    var dayOfWeek = date.getDay();
    return {
        dateObj: date,
        date: date.getDate(),
        year: year,
        month: date.getMonth() + 1,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: ms,
        ms: ms,
        isLeapYear: isLeap,
        daysInYear: (isLeap ? 366 : 365),
        dayOfWeekNum: dayOfWeek,
        dayOfWeekName: convertDayOfWeekNumToString(dayOfWeek),
        dayOfWeekShortName: date.toString().split(' ')[0],
        timezoneOffset: date.getTimezoneOffset() / common_constants_1.dateTime.minutesPerHour,
        unixTimestampMs: date.getTime(),
    };
};
/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI.
 *
 * @param {string} timestampFormat - [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                                   See https://momentjs.com/docs/#/parsing/string-format/
 * @return {string} Current date and time, formatted for use in a timestamp
 *
 * @example Return current date + time as default-formatted timestamp:
 *              now(); // => 2017/02/28 : 12:53:57
 *
 * @example Return current date + time as timestamp without day or second:
 *              now(`YYYY/MM hh:mm`); // => 2017/02 12:53
 */
exports.now = function (timestampFormat) {
    if (timestampFormat === void 0) { timestampFormat = "YYYY/MM/DD : hh:mm:ss"; }
    return moment().format(timestampFormat);
};
/******************************** EXPORT - WITH PSEUDO-NAMESPACES *********************************/
var str = Object.assign({}, { stringToEnumVal: Enum.stringToEnumVal }, string);
var arr = Object.assign({}, array, {
    without: {
        last: array.withoutLast,
        last2: array.withoutLast2,
        last3: array.withoutLast3,
        lastN: array.withoutLastN,
        first: array.withoutFirst,
        first2: array.withoutFirst2,
        first3: array.withoutFirst3,
        firstN: array.withoutFirstN,
    }
});
var typeMethods = Object.assign({}, types, {
    isMultilangTextObj: object.isMultilangTextObj,
    matches: string.matches,
    matchesIgnoreCase: string.matchesIgnoreCase,
    isNonexistentOrString: types.isNonexistentOrString,
});
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: arr,
    date: {
        isLeapYear: isLeapYear,
        convertDayOfWeekNumToString: convertDayOfWeekNumToString,
        parseDate: exports.parseDate,
        now: exports.now,
    },
    decorator: {
        DecoratorError: error.DecoratorError,
        notForWebUse: notForWebUse,
        singleton: types.singleton,
    },
    dom: dom,
    enum: Enum,
    error: error,
    event: event,
    isNode: isNode,
    json: {
        jsonStringifyWFuncs: exports.jsonStringifyWFuncs,
        jsonParseWFuncRehydrate_unsafe: exports.jsonParseWFuncRehydrate_unsafe,
    },
    number: {
        isInt: types.isInt,
        isNumberLike: types.isNumberLike,
    },
    object: object,
    query: {
        parseQueryParams: exports.parseQueryParams,
    },
    search: {
        escapeRegExp: string.escapeRegExp,
        matches: string.matches,
        matchesIgnoreCase: string.matchesIgnoreCase,
        replaceAll: string.replaceAll,
    },
    str: str,
    string: str,
    test: {
        expectEmptyObject: exports.expectEmptyObject
    },
    type: typeMethods,
    types: typeMethods,
    typing: typeMethods,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports._ = exports.mUtils;
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=index.js.map