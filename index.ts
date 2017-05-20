/******************************************** IMPORTS *********************************************/
import * as array from './src/array';
export * from './src/array';
export { array }

import * as date from './src/date';
export * from './src/date';
export { date };

import * as decorator from './src/decorator';
export * from './src/decorator';
export { decorator };

import * as Enum from './src/enum';
export * from './src/enum';
export { Enum };

import * as error from './src/error';
export * from './src/error';
export { error };

import * as event from './src/event';
export * from './src/event';
export { event };

import * as json from './src/json';
export * from './src/json';
export { json };

import * as middleware from './src/middleware';
export * from './src/middleware';
export { middleware };
export { middleware as middlewares };
export { middleware as mware };
export { middleware as MW }

import * as object from './src/object';
export * from './src/object';
export { object };

import * as query from './src/query';
export * from './src/query';
export { query };

import * as string from './src/string';
export * from './src/string';
export { string };

import * as test from './src/test';
export * from './src/test';
export { test };

import * as types from './src/types';
export * from './src/types';
export { types };

// Import isNode (detect node vs browser)
import * as isNode from 'detect-node';

// Import DOM module
import * as dom from './src/dom';
export { dom }
export { $ } from './src/dom';

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
    Enum,
    error,
    event,
    isNode,
    json,
    middleware,
    middlewares: middleware,
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
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
