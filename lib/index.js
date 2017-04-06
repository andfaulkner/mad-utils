"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const chai_1 = require("chai");
/******************************************** LOGGING *********************************************/
const node_1 = require("mad-logs/lib/node");
const log = node_1.nodeLogFactory(node_1.buildFileTag('misc-utils::index.ts', node_1.colors.green.bgWhite));
/************************************ CORE LANGUAGE UTILITIES *************************************/
const isArray = (value) => {
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
        && value.constructor
        && (value.constructor.name === 'Array'
            || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
};
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
const get = (propPath, obj) => {
    const propPathClean = (typeof propPath === 'string')
        ? propPath.split('.')
        : propPath;
    propPathClean.map((prop) => typeof prop === 'number' ? parseInt(prop, 10) : );
    return propPathClean.reduce((obj, propPathPart) => {
        if (!(obj && obj[propPathPart]))
            return null;
        if (obj[propPathPart].constructor.name === 'array')
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null;
    }, obj);
};
/******************************************** ARRAYS **********************************************/
/**
 * Return last item in an array.
 */
exports.last = (arr) => (arr.length > 0) ? arr[arr.length - 1] : void 0;
/**
 * Return second last item in an array.
 */
exports.secondLast = (arr) => (arr.length > 1) ? arr[arr.length - 2] : void 0;
/**
 * Return third last item in an array.
 */
exports.thirdLast = (arr) => (arr.length > 2) ? arr[arr.length - 3] : void 0;
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
exports.now = (timestampFormat = `YYYY/MM/DD : hh:mm:ss`) => {
    return moment().format(timestampFormat);
};
/***************************************** TEST FUNCTIONS *****************************************/
/**
 * Expect that testValue is an empty object.
 */
const expectEmptyObject = (testValue) => {
    chai_1.expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    chai_1.expect(testValue).to.be.an('object');
    chai_1.expect(testValue).to.not.be.null;
    chai_1.expect(testValue).to.not.be.undefined;
};
/******************************************** BROWSER *********************************************/
/**
 * If given a "store" object, try to get item at given key from it. Next try to get it from browser
 * localStorage or sessionStorage. Finally, try key in 'this' binding. Return null if all fail.
 */
const getFromStorage = (key, store) => {
    // Use value from store param, if it was provided.
    if (store && store[key]) {
        return store[key];
    }
    // Try to grab value off the window storage objects
    try {
        if (window && window.sessionStorage && window.localStorage) {
            return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
        }
    }
    catch (e) {
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
exports.isMultilangTextObj = (val) => {
    return !!(typeof val === 'object' &&
        Object.keys(val).length > 1 &&
        Object.keys(val).find(matches('en')) &&
        Object.keys(val).some(isNonexistentOrString) &&
        isNonexistentOrString(val.en));
};
/**
 * Inversion of String.prototype.match, for usage as a predicate.
 */
const matches = (matchAgainst) => (val) => !!val.match(matchAgainst);
/**
 *  Returns true if the value is null, undefined, or a string.
 */
const isNonexistentOrString = (val) => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};
//# sourceMappingURL=index.js.map