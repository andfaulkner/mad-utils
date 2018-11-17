// Needed for exports to work correctly
import {Moment} from 'moment';

/******************************************** IMPORTS *********************************************/
import array from './src/array';
export * from './src/array';
export {array};

import date from './src/date';
export * from './src/date';
export {date};

import decorator from './src/decorator';
export * from './src/decorator';
export {decorator};

import Enum from './src/enum';
export * from './src/enum';
export {Enum};

import error from './src/error';
export * from './src/error';
export {error};

import func from './src/function';
export * from './src/function';
export {func};

import locale from './src/locale';
export * from './src/locale';
export {locale};

import number from './src/number';
export * from './src/number';
export {number};

import object from './src/object';
export * from './src/object';
export {object};

import url from './src/url';
export * from './src/url';
export {url};

import search from './src/search';
export * from './src/search';
export {search};

import string from './src/string';
export * from './src/string';
export {string};

import typesIso from './src/types-iso';
export * from './src/types-iso';
export {typesIso};

import dataTypes from './src/types-data-generic';
export * from './src/types-data-generic';
export {dataTypes};

import validation from './src/validation';
export * from './src/validation';
export {validation};

import stream from './src/stream';
export * from './src/stream';
export {stream};

// Import isNode (detect node vs browser)
import isNode from 'detect-node';
export {isNode};

// Build final types object by merging isomorphic types with data types
// Note that this excludes straight types (it only includes type utils)
export const types = {...typesIso, ...dataTypes};

/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus browser-specific namespaces
 */
export const mUtils = {
    array,
    date,
    commonDataTypes: dataTypes,
    dataTypes,
    decorator,
    decorators: decorator,
    enum: Enum,
    Enum,
    err: error,
    error,
    find: search,
    func: func,
    function: func,
    functionUtils: func,
    genericDataTypes: dataTypes,
    isNode,
    locale,
    math: number,
    num: number,
    number,
    numeric: number,
    stream,
    object,
    url,
    search,
    srch: search,
    stacktrace: error,
    str: string,
    string,
    type: types,
    types,
    typing: types,
    validation,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export {mUtils as __};
export {mUtils as m_};
export {mUtils as madUtils};
