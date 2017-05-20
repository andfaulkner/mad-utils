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

import * as date from './src/date';
export * from './src/date';

import * as decorator from './src/decorator';
export * from './src/decorator';

import * as Enum from './src/enum';
export * from './src/enum';

import * as error from './src/error';
export * from './src/error';

// Import event module
import * as event from './src/event';
export { event };
export { addClickEventToId, mouseEventFactory, removeClickEventFromId } from './src/event';

import * as json from './src/json';
export * from './src/json';

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


/******************************** EXPORT - WITH PSEUDO-NAMESPACES *********************************/
const str = Object.assign({}, { stringToEnumVal: Enum.stringToEnumVal }, string);

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

const decorators = Object.assign({}, decorator, {
    DecoratorError: error.DecoratorError,
    singleton: types.singleton,
});

/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export const mUtils = {
    array: arr,
    date,
    decorator: decorators,
    decorators,
    dom,
    enum: Enum,
    error,
    event,
    isNode,
    json,
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
