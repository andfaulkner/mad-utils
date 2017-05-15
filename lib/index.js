"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
require("reflect-metadata");
const moment = require("moment");
const chai_1 = require("chai");
const common_constants_1 = require("common-constants");
const { dateAndTime } = common_constants_1.commonConstants;
const array_collection_1 = require("./src/array-collection");
__export(require("./src/array-collection"));
const event_1 = require("./src/event");
__export(require("./src/event"));
/******************************************** LOGGING *********************************************/
const mad_logs_1 = require("mad-logs");
const log = mad_logs_1.logFactory()(`mad-utils`, mad_logs_1.logMarkers.default);
/********************************************* CONFIG *********************************************/
const stackNoiseLibsRegex = /\/node_modules(?=\/).*(\/react\/|\/mocha\/|\/ts\-node\/)/g;
const nodeStackNoiseRegex = / \(timers\.js:[0-9]/g;
/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
exports.isNumericEnumItem = (val, Enum) => !exports.isDataEnumItem(val, Enum);
exports.isIndexEnumItem = exports.isNumericEnumItem;
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is: a) present in the given enum; and b) A non-numeric
 *                   'data' value (i.e. a value that was actually set).
 * @example Below, Suits[1] & Suits['1'] are truthy (they'd return 'CLUBS'). isDataEnumItem still
 *         knows to mark them false: it knows 0, '0', 1, '1', etc. are indexes, not actual values:
 *             enum Suits { HEARTS, CLUBS, SPADES, DIAMONDS }
 *                 Suits['HEARTS'];                   // => 0
 *                 isDataEnumItem('HEARTS', Suits);   // => true
 *                 Suits['WRENCHES']                  // => undefined
 *                 isDataEnumItem('WRENCHES', Suits); // => false
 *                 Suits['1']                         // => 'CLUBS'
 *                 isDataEnumItem('1', Suits);        // => false
 */
exports.isDataEnumItem = (val, Enum) => typeof Enum[val] === 'number';
/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
exports.enumValToString = (Enum, val, caps = null) => {
    const outVal = (typeof val === 'string') ? val : Enum[val];
    switch (caps) {
        case 'lower': return outVal.toLowerCase();
        case 'upper': return outVal.toUpperCase();
        default: return outVal;
    }
};
/**
 * Convert given enum value in string form to its numeric index.
 */
exports.stringToEnumVal = (val, Enum) => {
    log.verbose(`stringToEnumVal :: Enum:`, Enum, `;; val:`, val);
    for (let item in Enum) {
        if (exports.isDataEnumItem(item, Enum) && item.toLowerCase() === val.toLowerCase()) {
            return Enum[item];
        }
    }
    log.warn(`stringToEnumVal ::
        WARNING: stringToEnumVal: no matches of given value - ${val} - in given enum:
            ${JSON.stringify(Enum)}
        ...returning 99999.`);
    let stack;
    // NOTE: NOT AN ACTUAL ERROR CALL. THIS IS DONE TO ACQUIRE THE STACKTRACE.
    try {
        throw new Error();
    }
    catch (e) {
        stack = e.stack;
    }
    // Display clean stack trace up to point of 'Error' creation.
    const cleanStack = scrubStackTrace(stack, 'stringToEnumVal');
    console.log(cleanStack, '\n');
    return 99999;
};
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
/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 */
function scrubStackTrace(stack, srcFn) {
    // Create label IDing the cleaned stack, including (optionally) IDing the requesting function.
    const stackLabel = `  Stack (minus vendor & core) up to ${srcFn ? srcFn + ' ' : ''}call:`;
    // Replace 'Error' statement with stack label.
    return stack
        .split(/^Error(?=\n)/).join(stackLabel)
        .split(/\n    at /g)
        .filter(line => !line.match(stackNoiseLibsRegex))
        .filter(line => !line.match(nodeStackNoiseRegex))
        .join('\n   |-> ');
}
exports.scrubStackTrace = scrubStackTrace;
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
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 */
exports.parseQueryParams = (queryParamsString = window.location.search) => {
    return queryParamsString.replace(/^\?/, '').split('&').reduce((acc, pair) => {
        return Object.assign(acc, {
            [pair.split('=')[0]]: pair.split('=')[1]
        });
    }, {});
};
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
/***************************************** JSON UTILITIES *****************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
exports.jsonStringifyWFuncs = (obj) => JSON.stringify(obj, (key, value) => typeof value === 'function' ? value.toString() : value);
const newlineStr = `
`;
exports.jsonParseWFuncRehydrate_unsafe = (json) => {
    const objFromStrJSON = JSON.parse(json, (key, val) => {
        if (typeof val === 'function') {
            const isFuncStr = val.match(/^function\s+[a-zA-Z0-9_\$]*?\s*\([^\)]*\)[\s\n]*\{.*\}$/);
            const isLambdaStr = val.match(/^\([^\)]*\)\s\=>\s/);
            if (isLambdaStr || isFuncStr) {
                // Detect all args from function string, pull them into an array.
                let funcArgs = _extractArgsFromFuncStr(val);
                // Exclude unneeded parts in all function strings (both arrow & regular function)
                let funcStr = _baseCleanFuncStrForNewFunc(val);
                // Type-specific cleanups on function string (separate cleans for arrow & regular)
                if (isFuncStr) {
                    funcStr = funcStr.replace(/^function[^\(]\([^\)]*\)\s*\{\) => \{?/, '');
                }
                else if (isLambdaStr) {
                    funcStr = funcStr.replace(/^\([^\)]*\) => \{?/, '');
                }
                const newFunc = new Function(...funcArgs, funcStr);
                return log.verbose(newFunc);
            }
        }
        return val;
    });
    log.verbose(`JSONParseWFuncRehydrate_unsafe :: objFromStrJSON:`, objFromStrJSON);
    return objFromStrJSON;
};
/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function.
 * @param {string} valStr - Stringified function, to perform clean on.
 * @return {string} partially cleaned function string.
 */
const _baseCleanFuncStrForNewFunc = (valStr) => valStr.replace(/\}$/, '}').replace(/\'/g, '"').replace(/\n/g, newlineStr);
/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text).
 * @param {Function} valStr - Stringified function.
 * @return {string[]} Arguments pulled from the stringified function
 */
const _extractArgsFromFuncStr = (valStr) => valStr.match(/^[^\(]*\([^\)]*\)/)[0].replace(/^[^\(]*\(/, '').replace(/\)/g, '').split(/,\s*/);
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
    last: array_collection_1.last, last2: array_collection_1.last2, last3: array_collection_1.last3,
    firstN: array_collection_1.firstN, lastN: array_collection_1.lastN, arrayN: array_collection_1.arrayN,
    secondLast: array_collection_1.secondLast, thirdLast: array_collection_1.thirdLast, isArray,
    get: array_collection_1.get,
};
const str = {
    cap1LowerRest,
    capitalize,
    escapeRegExp,
    isNonexistentOrString: exports.isNonexistentOrString,
    matches: exports.matches,
    matchesIgnoreCase: exports.matchesIgnoreCase,
    replaceAll,
    stringToEnumVal: exports.stringToEnumVal,
};
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: {
        isArray,
        first: array_collection_1.first,
        second: array_collection_1.second,
        third: array_collection_1.third,
        first2: array_collection_1.first2,
        first3: array_collection_1.first3,
        last: array_collection_1.last,
        secondLast: array_collection_1.secondLast,
        thirdLast: array_collection_1.thirdLast,
        last2: array_collection_1.last2,
        last3: array_collection_1.last3,
        lastN: array_collection_1.lastN,
        firstN: array_collection_1.firstN,
        arrayN: array_collection_1.arrayN,
        append: array_collection_1.append,
        without: {
            last: array_collection_1.withoutLast,
            last2: array_collection_1.withoutLast2,
            last3: array_collection_1.withoutLast3,
            lastN: array_collection_1.withoutLastN,
            first: array_collection_1.withoutFirst,
            first2: array_collection_1.withoutFirst2,
            first3: array_collection_1.withoutFirst3,
            firstN: array_collection_1.withoutFirstN,
        },
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
        enumValToString: exports.enumValToString,
        stringToEnumVal: exports.stringToEnumVal,
        isNumericEnumItem: exports.isNumericEnumItem,
        isIndexEnumItem: exports.isIndexEnumItem,
        isDataEnumItem: exports.isDataEnumItem,
    },
    error: {
        DecoratorError: exports.DecoratorError,
        scrubStackTrace,
    },
    event: {
        mouseEventFactory: event_1.mouseEventFactory,
    },
    json: {
        jsonStringifyWFuncs: exports.jsonStringifyWFuncs,
        jsonParseWFuncRehydrate_unsafe: exports.jsonParseWFuncRehydrate_unsafe,
    },
    number: {
        isInt,
        isNumberLike,
    },
    object: {
        isMultilangTextObj: exports.isMultilangTextObj,
        get: array_collection_1.get,
    },
    query: {
        parseQueryParams: exports.parseQueryParams,
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