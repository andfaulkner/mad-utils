/******************************************** IMPORTS *********************************************/
import 'reflect-metadata';
/************************************ COMMON TYPE DEFINITIONS *************************************/
export declare type RealAny = any;
/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
export declare const isNumericEnumItem: (val: any, Enum: any) => boolean;
export declare const isIndexEnumItem: (val: any, Enum: any) => boolean;
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
export declare const isDataEnumItem: (val: any, Enum: any) => boolean;
/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
export declare const enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
/**
 * Convert given enum value in string form to its numeric index.
 */
export declare const stringToEnumVal: (val: string, Enum: any) => number;
/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
export declare function enumToStringArray<E>(Enum: any): any[];
export interface ClassConstructor {
    new (...args: any[]): {};
}
export interface SingletonInterface<U> {
    new (...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}
/******************************************* DECORATORS *******************************************/
/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
export declare const singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
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
export declare type DecoratorErrorProps = {
    message: string;
    messageCause: string;
    decoratorName: string;
    wrappedItem?: any;
};
export interface DecoratorError {
    new (cause: string, decoratorName: string, wrappedItem?: any): DecoratorErrorProps;
}
/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
export declare const DecoratorError: DecoratorError;
/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 */
export declare function scrubStackTrace(stack: string, srcFn?: string): string;
/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export declare function cap1LowerRest(str: string): string;
/**
 * Capitalize the first letter of a string.
 */
export declare function capitalize(str: string): string;
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
export declare function replaceAll(text: string, find: string | RegExp, replace: string): string;
/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export declare const matches: (matchAgainst: string) => (val: string) => boolean;
/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export declare const matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export declare const isNonexistentOrString: (val: any) => boolean;
/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
 */
export declare function escapeRegExp(regexStr: string): string;
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @return {Object} Query params as object
 */
export declare const parseQueryParams: <T>(queryParamsString?: string) => T;
/********************************************* TYPES **********************************************/
/**
 * Returns true if the given argument is a number or a string.
 */
export declare function isNumberLike(arg: any): boolean;
/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
export declare function isDateLike(arg: any): boolean;
/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export declare function isArray(value: any): boolean;
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
export declare const isMultilangTextObj: (obj: any) => boolean;
/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export declare function isInt(val: any): boolean;
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
export declare const expectEmptyObject: (testValue: any) => void;
/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return last item in an array. */
export declare const last: <T>(arr: T[]) => T;
/** Return second last item in an array. */
export declare const secondLast: <T>(arr: T[]) => T;
/** Return third last item in an array. */
export declare const thirdLast: <T>(arr: T[]) => T;
/** Return last 2 items in an array. */
export declare const last2: <T>(arr: T[]) => T[];
/** Return last 3 items in an array. */
export declare const last3: <T>(arr: T[]) => T[];
/** Return last N items in an array. */
export declare const lastN: <T>(arr: T[], n: number) => T[];
/** Return first item in an array. */
export declare const first: <T>(arr: T[]) => T;
/** Return second item in an array. */
export declare const second: <T>(arr: T[]) => T;
/** Return third item in an array. */
export declare const third: <T>(arr: T[]) => T;
/** Return first 2 items in an array. */
export declare const first2: <T>(arr: T[]) => T[];
/** Return first 3 items in an array. */
export declare const first3: <T>(arr: T[]) => T[];
/**
 * Return first N items in an array. Returned undefined if you request too many items.
 */
export declare function firstN<T>(arr: T[], n: number): T[];
/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
export declare const arrayN: (len: number) => any[];
/**
 * Exclude the first few or the last few items.
 */
export declare const withoutLast: <T>(arr: T[]) => T[];
export declare const withoutLast2: <T>(arr: T[]) => T[];
export declare const withoutLast3: <T>(arr: T[]) => T[];
export declare const withoutLastN: <T>(arr: T[], numToRm: number) => T[];
export declare const withoutFirst: <T>(arr: T[]) => T[];
export declare const withoutFirst2: <T>(arr: T[]) => T[];
export declare const withoutFirst3: <T>(arr: T[]) => T[];
export declare const withoutFirstN: <T>(arr: T[], numToRm: number) => T[];
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
export declare const get: <T extends Object>(propPath: string | string[], obj: T) => any;
/**
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it.
 * If either arr1 or arr2 are undefined, it ignores it and just returns the other.
 * If both are undefined, it returns [].
 * If a non-array value besides null is given, it wraps the item in an array before
 * performing the concatenation.
 *
 * @param {Array<RealAny>|RealAny} arr1 - If array, concatenate arr2 to the end. If value, wrap
 *                                        in array before concatenating (e.g. 3 is treated as [3].
 * @param {Array<RealAny>|RealAny} arr2 - Array or value to concatenate to the end of arr1
 * @return {Array<RealAny>} Result of attaching arr2 to the end of arr1
 */
export declare const append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
/**
 * @export mUtils - module
 */
export declare const mUtils: {
    array: {
        isArray: (value: any) => boolean;
        first: <T>(arr: T[]) => T;
        second: <T>(arr: T[]) => T;
        third: <T>(arr: T[]) => T;
        first2: <T>(arr: T[]) => T[];
        first3: <T>(arr: T[]) => T[];
        last: <T>(arr: T[]) => T;
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
    coll: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    collection: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
    };
    enum: {
        enumToStringArray: <E>(Enum: any) => any[];
        enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
        stringToEnumVal: (val: string, Enum: any) => number;
        isNumericEnumItem: (val: any, Enum: any) => boolean;
        isIndexEnumItem: (val: any, Enum: any) => boolean;
        isDataEnumItem: (val: any, Enum: any) => boolean;
    };
    error: {
        DecoratorError: DecoratorError;
        scrubStackTrace: (stack: string, srcFn?: string) => string;
    };
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: {
        isMultilangTextObj: (obj: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    string: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {
        isArray: (value: any) => boolean;
        isDateLike: (arg: any) => boolean;
        isNumberLike: (arg: any) => boolean;
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
        isInt: (val: any) => boolean;
    };
};
export declare const _: {
    array: {
        isArray: (value: any) => boolean;
        first: <T>(arr: T[]) => T;
        second: <T>(arr: T[]) => T;
        third: <T>(arr: T[]) => T;
        first2: <T>(arr: T[]) => T[];
        first3: <T>(arr: T[]) => T[];
        last: <T>(arr: T[]) => T;
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
    coll: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    collection: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
    };
    enum: {
        enumToStringArray: <E>(Enum: any) => any[];
        enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
        stringToEnumVal: (val: string, Enum: any) => number;
        isNumericEnumItem: (val: any, Enum: any) => boolean;
        isIndexEnumItem: (val: any, Enum: any) => boolean;
        isDataEnumItem: (val: any, Enum: any) => boolean;
    };
    error: {
        DecoratorError: DecoratorError;
        scrubStackTrace: (stack: string, srcFn?: string) => string;
    };
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: {
        isMultilangTextObj: (obj: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    string: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {
        isArray: (value: any) => boolean;
        isDateLike: (arg: any) => boolean;
        isNumberLike: (arg: any) => boolean;
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
        isInt: (val: any) => boolean;
    };
};
export declare const __: {
    array: {
        isArray: (value: any) => boolean;
        first: <T>(arr: T[]) => T;
        second: <T>(arr: T[]) => T;
        third: <T>(arr: T[]) => T;
        first2: <T>(arr: T[]) => T[];
        first3: <T>(arr: T[]) => T[];
        last: <T>(arr: T[]) => T;
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
    coll: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    collection: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
    };
    enum: {
        enumToStringArray: <E>(Enum: any) => any[];
        enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
        stringToEnumVal: (val: string, Enum: any) => number;
        isNumericEnumItem: (val: any, Enum: any) => boolean;
        isIndexEnumItem: (val: any, Enum: any) => boolean;
        isDataEnumItem: (val: any, Enum: any) => boolean;
    };
    error: {
        DecoratorError: DecoratorError;
        scrubStackTrace: (stack: string, srcFn?: string) => string;
    };
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: {
        isMultilangTextObj: (obj: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    string: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {
        isArray: (value: any) => boolean;
        isDateLike: (arg: any) => boolean;
        isNumberLike: (arg: any) => boolean;
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
        isInt: (val: any) => boolean;
    };
};
export declare const m_: {
    array: {
        isArray: (value: any) => boolean;
        first: <T>(arr: T[]) => T;
        second: <T>(arr: T[]) => T;
        third: <T>(arr: T[]) => T;
        first2: <T>(arr: T[]) => T[];
        first3: <T>(arr: T[]) => T[];
        last: <T>(arr: T[]) => T;
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
    coll: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    collection: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
    };
    enum: {
        enumToStringArray: <E>(Enum: any) => any[];
        enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
        stringToEnumVal: (val: string, Enum: any) => number;
        isNumericEnumItem: (val: any, Enum: any) => boolean;
        isIndexEnumItem: (val: any, Enum: any) => boolean;
        isDataEnumItem: (val: any, Enum: any) => boolean;
    };
    error: {
        DecoratorError: DecoratorError;
        scrubStackTrace: (stack: string, srcFn?: string) => string;
    };
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: {
        isMultilangTextObj: (obj: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    string: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {
        isArray: (value: any) => boolean;
        isDateLike: (arg: any) => boolean;
        isNumberLike: (arg: any) => boolean;
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
        isInt: (val: any) => boolean;
    };
};
export declare const madUtils: {
    array: {
        isArray: (value: any) => boolean;
        first: <T>(arr: T[]) => T;
        second: <T>(arr: T[]) => T;
        third: <T>(arr: T[]) => T;
        first2: <T>(arr: T[]) => T[];
        first3: <T>(arr: T[]) => T[];
        last: <T>(arr: T[]) => T;
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        append: (arr1: any, arr2: any, ...arrs: any[]) => any[];
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
    coll: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    collection: {
        last: <T>(arr: T[]) => T;
        last2: <T>(arr: T[]) => T[];
        last3: <T>(arr: T[]) => T[];
        firstN: <T>(arr: T[], n: number) => T[];
        lastN: <T>(arr: T[], n: number) => T[];
        arrayN: (len: number) => any[];
        secondLast: <T>(arr: T[]) => T;
        thirdLast: <T>(arr: T[]) => T;
        isArray: (value: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    date: {
        isLeapYear: (year: number) => boolean;
        convertDayOfWeekNumToString: (day: NumRange1To7) => string;
        parseDate: (date: Date) => ParsedDate;
        now: (timestampFormat?: string) => string;
    };
    decorator: {
        DecoratorError: DecoratorError;
        notForWebUse: (alternative?: string, envUsage?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        singleton: <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => SingletonInterface<any> & T;
    };
    enum: {
        enumToStringArray: <E>(Enum: any) => any[];
        enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
        stringToEnumVal: (val: string, Enum: any) => number;
        isNumericEnumItem: (val: any, Enum: any) => boolean;
        isIndexEnumItem: (val: any, Enum: any) => boolean;
        isDataEnumItem: (val: any, Enum: any) => boolean;
    };
    error: {
        DecoratorError: DecoratorError;
        scrubStackTrace: (stack: string, srcFn?: string) => string;
    };
    json: {
        jsonStringifyWFuncs: (obj: Object) => string;
        jsonParseWFuncRehydrate_unsafe: (json: string) => Object;
    };
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: {
        isMultilangTextObj: (obj: any) => boolean;
        get: <T extends Object>(propPath: string | string[], obj: T) => any;
    };
    query: {
        parseQueryParams: <T>(queryParamsString?: string) => T;
    };
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    string: {
        cap1LowerRest: (str: string) => string;
        capitalize: (str: string) => string;
        escapeRegExp: (regexStr: string) => string;
        isNonexistentOrString: (val: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
        stringToEnumVal: (val: string, Enum: any) => number;
    };
    test: {
        expectEmptyObject: (testValue: any) => void;
    };
    type: {
        isArray: (value: any) => boolean;
        isDateLike: (arg: any) => boolean;
        isNumberLike: (arg: any) => boolean;
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
        isInt: (val: any) => boolean;
    };
};
