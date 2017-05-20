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

import * as json from './src/json';
export * from './src/json';
export { json };

import * as number from './src/number';
export * from './src/number';
export { number };

import * as object from './src/object';
export * from './src/object';
export { object };

import * as query from './src/query';
export * from './src/query';
export { query };

import * as search from './src/search';
export * from './src/search';
export { search };

import * as string from './src/string';
export * from './src/string';
export { string };

import * as types from './src/types-iso';
export * from './src/types-iso';
export { types };

// Import isNode (detect node vs browser)
import * as isNode from 'detect-node';

/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export const mUtils = {
    array,
    date,
    decorator,
    decorators: decorator,
    enum: Enum,
    Enum,
    error,
    isNode,
    json,
    number,
    object,
    query,
    search,
    str: string,
    string,
    type: types,
    types,
    typing: types,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
