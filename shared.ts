// Needed for exports to work correctly
import {Moment} from 'moment';

/******************************************** IMPORTS *********************************************/
import * as array from './src/array';
export * from './src/array';
export {array};

import * as date from './src/date';
export * from './src/date';
export {date};

import * as Enum from './src/enum';
export * from './src/enum';
export {Enum};

import * as error from './src/error';
export * from './src/error';
export {error};

import * as func from './src/function';
export * from './src/function';
export {func};

import * as locale from './src/locale';
export * from './src/locale';
export {locale};

import * as number from './src/number';
export * from './src/number';
export {number};

import * as object from './src/object';
export * from './src/object';
export {object};

import * as url from './src/url';
export * from './src/url';
export {url};

import * as search from './src/search';
export * from './src/search';
export {search};

import * as string from './src/string';
export * from './src/string';
export {string};

import * as typesIso from './src/types-iso';
export * from './src/types-iso';
export {typesIso};

import * as dataTypes from './src/types-data-generic';
export * from './src/types-data-generic';
export {dataTypes};

import * as validation from './src/validation';
export * from './src/validation';
export {validation};

import * as stream from './src/stream';
export * from './src/stream';
export {stream};

// Import isNode (detect node vs browser)
import * as isNode from 'detect-node';
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
