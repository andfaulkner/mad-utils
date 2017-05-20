/******************************************** IMPORTS *********************************************/
import 'reflect-metadata';
import * as array from './src/array';
export * from './src/array';
import * as Enum from './src/enum';
export * from './src/enum';
import * as error from './src/error';
export * from './src/error';
import * as event from './src/event';
export { event };
export { addClickEventToId, mouseEventFactory, removeClickEventFromId } from './src/event';
import * as object from './src/object';
export * from './src/object';
import * as string from './src/string';
export * from './src/string';
import * as types from './src/types';
export * from './src/types';
import * as dom from './src/dom';
export { dom };
export { $ } from './src/dom';
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
export declare function notForWebUse(alternative?: string, envUsage?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/********************************************* ERRORS *********************************************/
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 */
export declare const parseQueryParams: <T>(queryParamsString?: string) => T;
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
export declare const expectEmptyObject: (testValue: any) => void;
/***************************************** JSON UTILITIES *****************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
export declare const jsonStringifyWFuncs: (obj: Object) => string;
export declare const jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
export declare type NumRange1To7 = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * True if the given year is a leap year.
 */
export declare function isLeapYear(year: number): boolean;
/**
 * Convert numeric day of the week to string day of the week.
 * Monday is the 1st day (1 becomes 'Monday', 2 becomes 'Tuesday', 7 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
export declare function convertDayOfWeekNumToString(day: NumRange1To7): string | never;
export declare type ParsedDate = {
    dateObj: Date;
    date: number;
    year: number;
    month: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    ms: number;
    isLeapYear: boolean;
    daysInYear: number;
    dayOfWeekNum: NumRange1To7;
    dayOfWeekName: string;
    dayOfWeekShortName: string;
    timezoneOffset: number;
    unixTimestampMs: number;
};
/**
 * Split a date into a more convenient date info object
 */
export declare const parseDate: (date: Date) => ParsedDate;
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
export declare const now: (timestampFormat?: string) => string;
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export declare const mUtils: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: error.DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const _: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: error.DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const __: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: error.DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const m_: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: error.DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const madUtils: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: error.DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
