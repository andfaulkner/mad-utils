/******************************************** IMPORTS *********************************************/
import 'reflect-metadata';

import * as moment from 'moment';
import { expect } from 'chai';
import * as envVarHelpers from 'env-var-helpers';

import { commonConstants } from 'common-constants';
const { dateAndTime } = commonConstants;

// if (typeof window === 'undefined') {
//     var window = {};
// }

// const _global = (typeof window !== 'undefined') ? window : global;

/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`mad-utils`, logMarkers.checkmate);


/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
export const isNumericEnumItem = (val: any, Enum): boolean => !isDataEnumItem(val, Enum);
export const isIndexEnumItem = isNumericEnumItem;


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
export const isDataEnumItem = (val: any, Enum): boolean => typeof Enum[val] === 'number';

/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
export const enumValToString = <E>(Enum, val, caps: 'lower' | 'upper' | null = null): string => {
    const outVal: string = (typeof val === 'string') ? val : Enum[val] as string;
    switch(caps) {
        case 'lower': return outVal.toLowerCase();
        case 'upper': return outVal.toUpperCase();
        default: return outVal;
    }
}

export const stringToEnumVal = (val: string, Enum): number => {
    log.verbose(`stringToEnumVal :: Enum:`, Enum, `;; val:`, val);
    for (let item in Enum) {
        if (isDataEnumItem(item, Enum) && item.toLowerCase() === val.toLowerCase()) {
            return Enum[item];
        }
    }
    log.warn(`WARNING: stringToEnumVal: no matches of ${val} in enum ${Enum} ...returning 99999.`);
    return null;
}

/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
export function enumToStringArray<E>(Enum) {
    let values = [];
    // Stores all the values in the values list.
    for (let i in Enum) {
        if (typeof Enum[i] !== 'number') values.push(Enum[i]);
    }
    return values;
}


export interface ClassConstructor {
    new(...args: any[]): {};
};

export interface SingletonInterface<U> {
    new(...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}



/******************************************* DECORATORS *******************************************/
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
export const singleton = <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => {
    if (varargs.length > 0) {
        throw new DecoratorError('Can only apply @singleton to classes', 'singleton', constructor);
    }
    const SingletonClass = class SingletonClass extends constructor {
        private static _instance: SingletonClass = null;

        public static new = (...args: any[]) => {
            if (!SingletonClass._instance) {
                SingletonClass._instance = new SingletonClass(...args);
            }
            return SingletonClass._instance;
        }

        constructor(...args: any[]) {
            if (SingletonClass._instance) return SingletonClass._instance;
            super(...args);
            SingletonClass._instance = this;
            return SingletonClass._instance;
        }
    }

    Object.defineProperty(SingletonClass, 'name', { value: constructor.name });
    return SingletonClass as (SingletonInterface<any> & typeof constructor);
}


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
export type DecoratorErrorProps = {
    message: string,
    messageCause: string,
    decoratorName: string,
    wrappedItem?: any,
};

export interface DecoratorError {
    new(cause: string, decoratorName: string, wrappedItem?: any): DecoratorErrorProps;
}

/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
export const DecoratorError = (() => {
    function DecoratorError(cause: string, decoratorName: string, wrappedItem?: any): void {
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
    return ((DecoratorError as any) as DecoratorError);
})();


/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export function cap1LowerRest(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
export function replaceAll(text: string, find: string | RegExp, replace: string) {
    return (typeof find === 'string')
            ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
            : text.replace(find, replace);
}

/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export const matches = (matchAgainst: string) => (val: string): boolean => !!val.match(matchAgainst);

/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export const matchesIgnoreCase = (matchAgainst: string) => (val: string): boolean => {
    return !!val.toLowerCase().match(matchAgainst.toLowerCase());
};

/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export const isNonexistentOrString = (val: any): boolean => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};

/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
 */
export function escapeRegExp(regexStr: string) {
    return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');
}


/********************************************* TYPES **********************************************/
/**
 * Returns true if the given argument is a number or a string.
 */
export function isNumberLike(arg: any): boolean {
    if (typeof arg === 'number') {
        return true;
    }
    return typeof arg === 'string' && !isNaN(parseInt(arg, 10));
}

/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
export function isDateLike(arg: any): boolean {
    return typeof arg === 'string' || arg instanceof moment || arg instanceof Date;
}


/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export function isArray(value: any): boolean {
    // Fully compliant ES5, ES6, ES7, ES8 ES[+] environments
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
           && value.constructor
           && (value.constructor.name === 'Array'
               // All ES5 and higher environments
               || (Object.getPrototypeOf && Object.getPrototypeOf(value.constructor) === Array)
               // Pre-ES5 web browsers
               || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
}

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
export const isMultilangTextObj = (obj: any): boolean => {
    const englishVariants = ['en', 'en_ca', 'en_gb', 'en_us'];
    let matchingKey;
    return !!(typeof obj === 'object'
              && Object.keys(obj).length > 1
              && Object.keys(obj).find(key => {
                  if (englishVariants.find(matchesIgnoreCase(key))) {
                      matchingKey = key;
                      return true;
                  }
              })
              && typeof matchingKey === 'string'
              && isNonexistentOrString(obj[matchingKey]));
};

/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export function isInt(val) {
    const valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
                        : (valAsFloat | 0) === valAsFloat;
}


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


/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/**
 * Return last item in an array.
 */
export const last = <T>(arr: T[]): T => (arr.length >= 1) ? arr[arr.length - 1] : void 0;

/**
 * Return second last item in an array.
 */
export const secondLast = <T>(arr: T[]): T => (arr.length >= 2) ? arr[arr.length - 2] : void 0;

/**
 * Return third last item in an array.
 */
export const thirdLast = <T>(arr: T[]): T => (arr.length >= 3) ? arr[arr.length - 3] : void 0;

/**
 * Return last 2 items in an array.
 */
export function last2 <T>(arr: T[]): T[] {
    return (arr.length >= 2) ? [arr[arr.length - 2], arr[arr.length - 1]] : void 0;
}

/**
 * Return last 3 items in an array.
 */
export function last3 <T>(arr: T[]): T[] {
    return (arr.length >= 3) ? [arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1]]
                             : void 0;
}

/**
 * Return last N items in an array.
 */
export function lastN <T>(arr: T[], n: number): T[] {
    return (arr.length >= n)
        ? arrayN(n).map((__, idx) => arr[arr.length - n + idx])
        : arr;
}

/**
 * Return first N items in an array. Returned undefined if you request too many items.
 */
export function firstN <T>(arr: T[], n: number): T[] {
    return (arr.length >= n)
        ? arrayN(n).map((__, idx) => arr[idx])
        : arr;
}

/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
export const arrayN = (len: number): any[] => Array.from(Array(len));


/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
export const get = <T extends Object>(propPath: string[] | string, obj: T): any | void => {
    const propPathClean: string[] = (typeof propPath === 'string')
                                        ? propPath.split('.')
                                        : propPath;
    return propPathClean
        .map((prop) => typeof prop === 'number' ? parseInt(prop, 10) : prop)
        .reduce((obj, propPathPart: string) => {
            if (!(obj && obj[propPathPart])) return null;
            if (obj[propPathPart].constructor.name === 'array')
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null
        }, obj);
}

/********************************************** DATE **********************************************/
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

        timezoneOffset     : date.getTimezoneOffset() / dateAndTime.minutesPerHour,
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
const coll = {
    last,       last2,      last3,
    firstN,     lastN,      arrayN,
    secondLast, thirdLast,  isArray,
    get,
};

const str = {
    cap1LowerRest,
    capitalize,
    escapeRegExp,
    isNonexistentOrString,
    matches,
    matchesIgnoreCase,
    replaceAll,
    stringToEnumVal,
};

/**
 * @export mUtils - module
 */
export const mUtils = {
    array: {
        isArray,
        last,
        last2,
        last3,
        lastN,
        secondLast,
        thirdLast,
        firstN,
        arrayN,
    },
    coll,
    collection: coll,
    date: {
        isLeapYear,
        convertDayOfWeekNumToString,
        parseDate,
        now,
    },
    decorator: {
        DecoratorError,
        notForWebUse,
        singleton,
    },
    enum: {
        enumToStringArray,
        enumValToString,
        stringToEnumVal,
        isNumericEnumItem,
        isIndexEnumItem,
        isDataEnumItem,
    },
    error: {
        DecoratorError,
    },
    number: {
        isInt,
        isNumberLike,
    },
    object: {
        isMultilangTextObj,
        get,
    },
    search: {
        escapeRegExp,
        matches,
        matchesIgnoreCase,
        replaceAll,
    },
    str,
    string: str,
    test: {
        expectEmptyObject
    },
    type: {
        isArray,
        isDateLike,
        isNumberLike,
        isMultilangTextObj,
        matches,
        matchesIgnoreCase,
        isNonexistentOrString,
        isInt,
    },
}

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const _ = mUtils;
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
