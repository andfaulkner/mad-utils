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

import * as query from './src/query';
export * from './src/query';

import * as string from './src/string';
export * from './src/string';

import * as test from './src/test';
export * from './src/test';

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

const search = {
    escapeRegExp: string.escapeRegExp,
    matches: string.matches,
    matchesIgnoreCase: string.matchesIgnoreCase,
    replaceAll: string.replaceAll,
};

const number = {
    isInt: types.isInt,
    isNumberLike: types.isNumberLike,
};

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
    number,
    object,
    query,
    search,
    str,
    string: str,
    test,
    type: typeMethods,
    types: typeMethods,
    typing: typeMethods,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const _ = mUtils;
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
