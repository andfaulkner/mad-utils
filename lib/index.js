"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
require("reflect-metadata");
const moment = require("moment");
const chai_1 = require("chai");
const common_constants_1 = require("common-constants");
const { dateAndTime } = common_constants_1.commonConstants;
// if (typeof window === 'undefined') {
//     var window = {};
// }
// const _global = (typeof window !== 'undefined') ? window : global;
/******************************************** LOGGING *********************************************/
const mad_logs_1 = require("mad-logs");
const log = mad_logs_1.logFactory()(`misc-utils`, mad_logs_1.logMarkers.checkmate);
/********************************************** ENUM **********************************************/
/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
function enumValToString(Enum, val, caps = null) {
    const outVal = (typeof val === 'string') ? val : Enum[val];
    switch (caps) {
        case 'lower': return outVal.toLowerCase();
        case 'upper': return outVal.toUpperCase();
        default: return outVal;
    }
}
exports.enumValToString = enumValToString;
/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
function enumToStringArray(Enum) {
    let values = [];
    // Stores all the values in the values list.
    for (let i in Enum) {
        if (typeof Enum[i] !== 'number')
            values.push(Enum[i]);
    }
    return values;
}
exports.enumToStringArray = enumToStringArray;
;
/******************************************* DECORATORS *******************************************/
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
exports.singleton = (constructor, ...varargs) => {
    if (varargs.length > 0) {
        throw new exports.DecoratorError('Can only apply @singleton to classes', 'singleton', constructor);
    }
    const SingletonClass = (_a = class SingletonClass extends constructor {
            constructor(...args) {
                if (SingletonClass._instance)
                    return SingletonClass._instance;
                super(...args);
                SingletonClass._instance = this;
                return SingletonClass._instance;
            }
        },
        _a._instance = null,
        _a.new = (...args) => {
            if (!_a._instance) {
                _a._instance = new _a(...args);
            }
            return _a._instance;
        },
        _a);
    Object.defineProperty(SingletonClass, 'name', { value: constructor.name });
    return SingletonClass;
    var _a;
};
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
function notForWebUse(alternative, envUsage = 'native mobile client or Java server') {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('nonWebMethods', `${target.name} :: ${propertyKey}`, target, '${target.name}_${propertyKey}');
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.warn(`Method ${propertyKey} on class ${target.constructor.name} cannot be used in a ` +
                `Javascript/Typescript environment - it is for ${envUsage} usage only. ` +
                (alternative ? ('Use ' + alternative + ' instead.') : ''));
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.notForWebUse = notForWebUse;
;
/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
exports.DecoratorError = (() => {
    function DecoratorError(cause, decoratorName, wrappedItem) {
        Error.captureStackTrace(this);
        this.messageCause = this.message = cause;
        this.name = `DecoratorError`;
        this.decoratorName = decoratorName;
        this.wrappedItem = wrappedItem;
        console.log('this.stack:', this.stack);
        console.error(`ERROR :: Invalid usage of decorator ${decoratorName}. ` +
            (wrappedItem ? `Attempted to apply to ${wrappedItem}. ` : ``) +
            `Error cause: ${cause}`);
        return this;
    }
    DecoratorError.prototype = Object.create(Error.prototype);
    return DecoratorError;
})();
/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
function cap1LowerRest(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
exports.cap1LowerRest = cap1LowerRest;
/**
 * Capitalize the first letter of a string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
/**
 * Replace all matching strings in a text segment with a given replacement string.
 * Can also match against a regex.
 * The main benefit is the fact that *ALL* matching strings get replaced.
 *
 * @param {string} text - string to search and replace in.
 * @param {string|RegExp} find - string or RegExp to match against
 * @param {string} replace - replacement text
 *
 * @return {string} text, with replacements made.
 */
function replaceAll(text, find, replace) {
    return (typeof find === 'string')
        ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
        : text.replace(find, replace);
}
exports.replaceAll = replaceAll;
/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
exports.matches = (matchAgainst) => (val) => !!val.match(matchAgainst);
/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
exports.matchesIgnoreCase = (matchAgainst) => (val) => {
    return !!val.toLowerCase().match(matchAgainst.toLowerCase());
};
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
exports.isNonexistentOrString = (val) => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};
/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
 */
function escapeRegExp(regexStr) {
    return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');
}
exports.escapeRegExp = escapeRegExp;
/********************************************* TYPES **********************************************/
/**
 * Returns true if the given argument is a number or a string.
 */
function isNumberLike(arg) {
    if (typeof arg === 'number') {
        return true;
    }
    return typeof arg === 'string' && !isNaN(parseInt(arg, 10));
}
exports.isNumberLike = isNumberLike;
/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
function isDateLike(arg) {
    return typeof arg === 'string' || arg instanceof moment || arg instanceof Date;
}
exports.isDateLike = isDateLike;
/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
function isArray(value) {
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
}
exports.isArray = isArray;
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
exports.isMultilangTextObj = (obj) => {
    const englishVariants = ['en', 'en_ca', 'en_gb', 'en_us'];
    let matchingKey;
    return !!(typeof obj === 'object'
        && Object.keys(obj).length > 1
        && Object.keys(obj).find(key => {
            if (englishVariants.find(exports.matchesIgnoreCase(key))) {
                matchingKey = key;
                return true;
            }
        })
        && typeof matchingKey === 'string'
        && exports.isNonexistentOrString(obj[matchingKey]));
};
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
function isInt(val) {
    const valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
        : (valAsFloat | 0) === valAsFloat;
}
exports.isInt = isInt;
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
exports.expectEmptyObject = (testValue) => {
    chai_1.expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    chai_1.expect(testValue).to.be.an('object');
    chai_1.expect(testValue).to.not.be.null;
    chai_1.expect(testValue).to.not.be.undefined;
};
/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/**
 * Return last item in an array.
 */
exports.last = (arr) => (arr.length >= 1) ? arr[arr.length - 1] : void 0;
/**
 * Return second last item in an array.
 */
exports.secondLast = (arr) => (arr.length >= 2) ? arr[arr.length - 2] : void 0;
/**
 * Return third last item in an array.
 */
exports.thirdLast = (arr) => (arr.length >= 3) ? arr[arr.length - 3] : void 0;
/**
 * Return last 2 items in an array.
 */
function last2(arr) {
    return (arr.length >= 2) ? [arr[arr.length - 2], arr[arr.length - 1]] : void 0;
}
exports.last2 = last2;
/**
 * Return last 3 items in an array.
 */
function last3(arr) {
    return (arr.length >= 3) ? [arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1]]
        : void 0;
}
exports.last3 = last3;
/**
 * Return last N items in an array.
 */
function lastN(arr, n) {
    return (arr.length >= n)
        ? exports.arrayN(n).map((__, idx) => arr[arr.length - n + idx])
        : arr;
}
exports.lastN = lastN;
/**
 * Return first N items in an array. Returned undefined if you request too many items.
 */
function firstN(arr, n) {
    return (arr.length >= n)
        ? exports.arrayN(n).map((__, idx) => arr[idx])
        : arr;
}
exports.firstN = firstN;
/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
exports.arrayN = (len) => Array.from(Array(len));
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
exports.get = (propPath, obj) => {
    const propPathClean = (typeof propPath === 'string')
        ? propPath.split('.')
        : propPath;
    return propPathClean
        .map((prop) => typeof prop === 'number' ? parseInt(prop, 10) : prop)
        .reduce((obj, propPathPart) => {
        if (!(obj && obj[propPathPart]))
            return null;
        if (obj[propPathPart].constructor.name === 'array')
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null;
    }, obj);
};
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
            throw new Error(`INVALID DAY OF WEEK: MUST BE NUMBER FROM 0 TO 6. Input day: ${day}`);
        }
    }
}
exports.convertDayOfWeekNumToString = convertDayOfWeekNumToString;
/**
 * Split a date into a more convenient date info object
 */
exports.parseDate = (date) => {
    const year = date.getFullYear();
    const ms = date.getMilliseconds();
    const isLeap = isLeapYear(year);
    const dayOfWeek = date.getDay();
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
        timezoneOffset: date.getTimezoneOffset() / dateAndTime.minutesPerHour,
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
exports.now = (timestampFormat = `YYYY/MM/DD : hh:mm:ss`) => {
    return moment().format(timestampFormat);
};
/******************************** EXPORT - WITH PSEUDO-NAMESPACES *********************************/
const coll = {
    last: exports.last, last2, last3,
    firstN, lastN, arrayN: exports.arrayN,
    secondLast: exports.secondLast, thirdLast: exports.thirdLast, isArray,
    get: exports.get,
};
const str = {
    cap1LowerRest,
    capitalize,
    escapeRegExp,
    isNonexistentOrString: exports.isNonexistentOrString,
    matches: exports.matches,
    matchesIgnoreCase: exports.matchesIgnoreCase,
    replaceAll,
};
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: {
        isArray,
        last: exports.last,
        last2,
        last3,
        lastN,
        secondLast: exports.secondLast,
        thirdLast: exports.thirdLast,
        firstN,
        arrayN: exports.arrayN,
    },
    coll,
    collection: coll,
    date: {
        isLeapYear,
        convertDayOfWeekNumToString,
        parseDate: exports.parseDate,
        now: exports.now,
    },
    decorator: {
        DecoratorError: exports.DecoratorError,
        notForWebUse,
        singleton: exports.singleton,
    },
    enum: {
        enumToStringArray,
        enumValToString,
    },
    error: {
        DecoratorError: exports.DecoratorError,
    },
    number: {
        isInt,
        isNumberLike,
    },
    object: {
        isMultilangTextObj: exports.isMultilangTextObj,
        get: exports.get,
    },
    search: {
        escapeRegExp,
        matches: exports.matches,
        matchesIgnoreCase: exports.matchesIgnoreCase,
        replaceAll,
    },
    str,
    string: str,
    test: {
        expectEmptyObject: exports.expectEmptyObject
    },
    type: {
        isArray,
        isDateLike,
        isNumberLike,
        isMultilangTextObj: exports.isMultilangTextObj,
        matches: exports.matches,
        matchesIgnoreCase: exports.matchesIgnoreCase,
        isNonexistentOrString: exports.isNonexistentOrString,
        isInt,
    },
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports._ = exports.mUtils;
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=index.js.map