// Import shared modules, and re-export them for top-level access.
import { array, date, decorator, Enum, error, json, number, object, query, search, string,
         types as isoTypes } from './shared';
export { array, date, decorator, Enum, error, json, number, object, query, search, string }

import { isNode } from 'detect-node';
export { isNode }

// Import middleware (and middleware-handling) module
import * as middleware from './src/node/middleware';
export * from './src/node/middleware';
export { middleware };
export { middleware as middlewares };
export { middleware as mware };
export { middleware as MW }

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
    file,
    isNode,
    json,
    middleware,
    number,
    object,
    query,
    search,
    str: string,
    string,
    test,
    type: types,
    types,
    typing: types,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;
