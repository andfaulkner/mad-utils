/******************************************** IMPORTS *********************************************/
import * as moment from 'moment';
import { expect } from 'chai';


/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('misc-utils::index.ts', colors.green.bgWhite));


/************************************ CORE LANGUAGE UTILITIES *************************************/
const isArray = (value: any): boolean => {
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
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
const get = <T extends Object>(propPath: string[] | string, obj: T): any | void => {
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


/******************************************** ARRAYS **********************************************/
/**
 * Return last item in an array.
 */
export const last = <T>(arr: T[]): T => (arr.length > 0) ? arr[arr.length - 1] : void 0;

/**
 * Return second last item in an array.
 */
export const secondLast = <T>(arr: T[]): T => (arr.length > 1) ? arr[arr.length - 2] : void 0;

/**
 * Return third last item in an array.
 */
export const thirdLast = <T>(arr: T[]): T => (arr.length > 2) ? arr[arr.length - 3] : void 0;


/********************************************* DATE ***********************************************/
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

/***************************************** TEST FUNCTIONS *****************************************/
/**
 * Expect that testValue is an empty object.
 */
const expectEmptyObject = (testValue: any) => {
    expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    expect(testValue).to.be.an('object');
    expect(testValue).to.not.be.null;
    expect(testValue).to.not.be.undefined;
};

/******************************************** BROWSER *********************************************/
/**
 * If given a "store" object, try to get item at given key from it. Next try to get it from browser
 * localStorage or sessionStorage. Finally, try key in 'this' binding. Return null if all fail.
 */
const getFromStorage = (key: string, store?: Object): string | null => {
    // Use value from store param, if it was provided.
    if (store && store[key]) {
        return store[key];
    }

    // Try to grab value off the window storage objects
    try {
        if (window && window.sessionStorage && window.localStorage) {
            return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
        }
    } catch(e) {
        log.error('getFromStorage: not in a browser environment, cannot use window object');
    }

    // Try to grab the value from 'this' binding.
    if (this && this[key]) {
        return this[key];
    }
};

/***************************************** DATA UTILITIES *****************************************/
/**
 * Return true if argument is a multilanguage string object
 */
export const isMultilangTextObj = (val: any): boolean => {
    return !!(
        typeof val === 'object' &&
        Object.keys(val).length > 1 &&
        Object.keys(val).find(matches('en')) &&
        Object.keys(val).some(isNonexistentOrString) &&
        isNonexistentOrString(val.en)
    );
};

/**
 * Inversion of String.prototype.match, for usage as a predicate.
 */
const matches = (matchAgainst: string) => (val: string): boolean => !!val.match(matchAgainst);

/**
 *  Returns true if the value is null, undefined, or a string.
 */
const isNonexistentOrString = (val: any) => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};

