// Import shared modules, and re-export them for top-level access.
import { array, date, decorator, Enum, error, func, json, locale, number, object, query, search, string,
         types as isoTypes } from './shared';
export { array, date, decorator, Enum, func, json, locale, number, object, query, search, string }

export * from './src/array';
export * from './src/date';
export * from './src/decorator';
export * from './src/enum';
export * from './src/error';
export * from './src/function';
export * from './src/json';
export * from './src/locale';
export * from './src/number';
export * from './src/node/node-error';
export * from './src/object';
export * from './src/query';
export * from './src/search';
export * from './src/string';

import { isNode } from 'detect-node';
export { isNode }

// Import middleware (and middleware-handling) module
import * as middleware from './src/node/middleware';
export * from './src/node/middleware';
export { middleware };
export { middleware as middlewares };
export { middleware as mware };
export { middleware as MW }

import * as nodeError from './src/node/node-error';
export * from './src/node/node-error';
export { nodeError }

import * as errorShared from './shared';
export { error as errorShared } from './shared';

const err = Object.assign({}, errorShared, nodeError);
export { err }
export { err as error }

// Import test module
import * as test from './src/node/test';
export * from './src/node/test';
export { test };

// Import file & file-handling module
import * as file from './src/node/file';
export * from './src/node/file';
export { file };

// Build final NodeJS types object by merging isomorphic types with Node-specific types.
// Export all, including merged-in types from types-iso.
import * as nodeTypes from './src/node/types-node';
export const types = Object.assign(isoTypes, nodeTypes);
export * from './src/node/types-node';
export * from './src/types-iso';

import * as webpack from './src/node/webpack';
export * from './src/node/webpack';
export { webpack };
export { webpack as webpackUtils };

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
    error: err,
    err,
    errorShared,
    file,
    func,
    'function': func,
    functionUtils: func,
    isNode,
    json,
    jsonUtils: json,
    locale,
    middleware,
    nodeErr: nodeError,
    nodeError,
    number,
    object,
    query,
    search,
    stacktrace: err,
    str: string,
    string,
    test,
    type: types,
    types,
    typing: types,
    webpack,
    webpackUtils: webpack,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
