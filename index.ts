/******************************************** IMPORTS *********************************************/
import 'reflect-metadata';

import * as moment from 'moment';
import { expect } from 'chai';
import * as envVarHelpers from 'env-var-helpers';

import { dateTime } from 'common-constants';

import { RealAny } from './src/types';

// Import collection / array module
import { append, arrayN, first, first2, first3, firstN, last, last2, last3, lastN, second,
         secondLast, third, thirdLast, withoutFirst, withoutFirst2, withoutFirst3, withoutFirstN,
         withoutLast, withoutLast2, withoutLast3, withoutLastN
} from './src/array';

import * as array from './src/array';
export * from './src/array';

import * as Enum from './src/enum';
export * from './src/enum';

import * as error from './src/error';
export * from './src/error';

// Import event module
import * as event from './src/event';
export { event };
export { addClickEventToId, mouseEventFactory, removeClickEventFromId } from './src/event';

import * as object from './src/object';
export * from './src/object';

import * as string from './src/string';
export * from './src/string';

import * as types from './src/types';
export * from './src/types';

// Import isNode (detect node vs browser)
import * as isNode from 'detect-node';

// Import DOM module
import * as dom from './src/dom';
export { dom }
export { $ } from './src/dom';

/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`mad-utils`, logMarkers.default);


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
export function notForWebUse(alternative?: string, envUsage = 'native mobile client or Java server') {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('nonWebMethods', `${target.name} :: ${propertyKey}`, target,
                               '${target.name}_${propertyKey}');

        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.warn(
                `Method ${propertyKey} on class ${target.constructor.name} cannot be used in a ` +
                `Javascript/Typescript environment - it is for ${envUsage} usage only. ` +
                (alternative ? ('Use ' + alternative + ' instead.') : '')
            );
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
};


/********************************************* ERRORS *********************************************/


/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 */
export const parseQueryParams = <T>(queryParamsString: string = window.location.search): T => {
   return queryParamsString.replace(/^\?/, '').split('&').reduce(
        (acc, pair) => {
            return Object.assign(acc, {
                [pair.split('=')[0]]: pair.split('=')[1]
            })
        },
    {}) as T;
};


/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
export const expectEmptyObject = (testValue: any) => {
    expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    expect(testValue).to.be.an('object');
    expect(testValue).to.not.be.null;
    expect(testValue).to.not.be.undefined;
};


/***************************************** JSON UTILITIES *****************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
export const jsonStringifyWFuncs = (obj: Object): string =>
    JSON.stringify(obj, (key: string, value: RealAny) =>
        typeof value === 'function' ? value.toString() : value);

const newlineStr = `
`;

export const jsonParseWFuncRehydrate_unsafe = (json: string): Object => {
    const objFromStrJSON = JSON.parse(json, (key: string, val: any) => {
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
                    funcStr = funcStr.replace(/^function[^\(]\([^\)]*\)\s*\{\) => \{?/, '')
                } else if (isLambdaStr) {
                    funcStr = funcStr.replace(/^\([^\)]*\) => \{?/, '')
                }

                const newFunc = new Function(...funcArgs, funcStr);
                return log.verbose(newFunc) as Function;
            }
        }
        return val;
    });
    log.verbose(`JSONParseWFuncRehydrate_unsafe :: objFromStrJSON:`, objFromStrJSON);
    return objFromStrJSON;
}



/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function.
 * @param {string} valStr - Stringified function, to perform clean on.
 * @return {string} partially cleaned function string.
 */
const _baseCleanFuncStrForNewFunc = (valStr: string): string => valStr.replace(/\}$/, '}').replace(/\'/g, '"').replace(/\n/g, newlineStr);

/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text).
 * @param {Function} valStr - Stringified function.
 * @return {string[]} Arguments pulled from the stringified function
 */
const _extractArgsFromFuncStr = (valStr: string): string[] => valStr.match(/^[^\(]*\([^\)]*\)/)[0].replace(/^[^\(]*\(/, '').replace(/\)/g, '').split(/,\s*/);


//********************************************** DATE **********************************************/
export type NumRange1To7 = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * True if the given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
    if (year % 4 === 0 && year % 100 !== 0) return true;
    if (year % 400 === 0) return true;
    return false;
}

/**
 * Convert numeric day of the week to string day of the week.
 * Monday is the 1st day (1 becomes 'Monday', 2 becomes 'Tuesday', 7 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
export function convertDayOfWeekNumToString(day: NumRange1To7): string | never {
    switch(day.toString()) {
        case '0':  return 'Sunday';
        case '1':  return 'Monday';
        case '2':  return 'Tuesday';
        case '3':  return 'Wednesday';
        case '4':  return 'Thursday';
        case '5':  return 'Friday';
        case '6':  return 'Saturday';
        default: {
            throw new Error(`INVALID DAY OF WEEK: MUST BE NUMBER FROM 0 TO 6. Input day: ${day}`);
        }
    }
}

export type ParsedDate = {
    dateObj            : Date,
    date               : number,
    year               : number,
    month              : number,
    hour               : number,
    minute             : number,
    second             : number,
    millisecond        : number,
    ms                 : number,
    isLeapYear         : boolean,
    daysInYear         : number,
    dayOfWeekNum       : NumRange1To7,
    dayOfWeekName      : string,
    dayOfWeekShortName : string,
    timezoneOffset     : number,
    unixTimestampMs    : number,
}

/**
 * Split a date into a more convenient date info object
 */
export const parseDate = (date: Date): ParsedDate => {
    const year = date.getFullYear();
    const ms = date.getMilliseconds();
    const isLeap = isLeapYear(year);
    const dayOfWeek = date.getDay() as NumRange1To7;

    return {
        dateObj            : date,

        date               : date.getDate(),
        year               : year,
        month              : date.getMonth() + 1, // month is 1 less than you'd expect.

        hour               : date.getHours(),
        minute             : date.getMinutes(),
        second             : date.getSeconds(),
        millisecond        : ms,
        ms                 : ms,

        isLeapYear         : isLeap,
        daysInYear         : (isLeap ? 366 : 365),
        dayOfWeekNum       : dayOfWeek,
        dayOfWeekName      : convertDayOfWeekNumToString(dayOfWeek),
        dayOfWeekShortName : date.toString().split(' ')[0],

        timezoneOffset     : date.getTimezoneOffset() / dateTime.minutesPerHour,
        unixTimestampMs    : date.getTime(), // milliseconds since 01-01-1970
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
export const now = (timestampFormat: string = `YYYY/MM/DD : hh:mm:ss`) => {
    return moment().format(timestampFormat);
};

/******************************** EXPORT - WITH PSEUDO-NAMESPACES *********************************/
const str = Object.assign({}, { stringToEnumVal }, string);

const arr = Object.assign({}, array, {
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

const typeMethods = Object.assign({}, types, {
    isMultilangTextObj: object.isMultilangTextObj,
    matches: string.matches,
    matchesIgnoreCase: string.matchesIgnoreCase,
    isNonexistentOrString: types.isNonexistentOrString,
});


/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export const mUtils = {
    array: arr,
    date: {
        isLeapYear,
        convertDayOfWeekNumToString,
        parseDate,
        now,
    },
    decorator: {
        DecoratorError: error.DecoratorError,
        notForWebUse,
        singleton: types.singleton,
    },
    dom,
    enum: Enum,
    error,
    event,
    isNode,
    json: {
        jsonStringifyWFuncs,
        jsonParseWFuncRehydrate_unsafe,
    },
    number: {
        isInt: types.isInt,
        isNumberLike: types.isNumberLike,
    },
    object,
    query: {
        parseQueryParams,
    },
    search: {
        escapeRegExp: string.escapeRegExp,
        matches: string.matches,
        matchesIgnoreCase: string.matchesIgnoreCase,
        replaceAll: string.replaceAll,
    },
    str,
    string: str,
    test: {
        expectEmptyObject
    },
    type: typeMethods,
    types: typeMethods,
    typing: typeMethods,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const _ = mUtils;
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
