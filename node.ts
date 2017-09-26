// Import shared modules, and re-export them for top-level access.
import { array, date, decorator, Enum, error, func, json, locale, number, object, query, search, string,
         types as isoTypes, validation, dataTypes, stream } from './shared';
export { array, date, decorator, Enum, func, json, locale, number, object, query, search, string,
         validation, stream }

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
export * from './src/stream';
export * from './src/string';
export * from './src/validation';

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
export const types = Object.assign(isoTypes, nodeTypes, dataTypes);
export * from './src/node/types-node';
export * from './src/types-iso';
export * from './src/types-data-generic';

// Import Webpack utilities/helpers/plugins module.
import * as webpack from './src/node/webpack';
export * from './src/node/webpack';
export { webpack };
export { webpack as webpackUtils };

// Import ExpressJS routing helpers module.
import * as expressRouting from './src/node/express-routing';
export * from './src/node/express-routing';
export { expressRouting };

/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export const mUtils = {
    array,
    commonDataTypes: dataTypes,
    dataTypes,
    date,
    decorator,
    decorators: decorator,
    enum: Enum,
    Enum,
    error: err,
    err,
    errorShared,
    expressRouting,
    file,
    func,
    'function': func,
    functionUtils: func,
    genericDataTypes: dataTypes,
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
    stream,
    str: string,
    string,
    test,
    type: types,
    types,
    typing: types,
    validation,
    webpack,
    webpackUtils: webpack,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;

/************************************ COMMON FUNCTION EXPORTS *************************************/
import { commonShared } from './shared';
import { useMiddlewareInProdOnly } from './src/node/middleware';
import * as connect from 'connect';

/**
 * Most common functions from mad-utils used in Node.
 */
export const common = Object.assign({}, commonShared, {
    isDir: file.isDir,
    pathFromRoot: file.pathFromRoot,
    replaceInFile: file.replaceInFile,
    getJsFilesInDir: file.getJsFilesInDir,
    isFileInDir: file.isFileInDir,
    useMiddlewareInProdOnly,
    composeExpressMiddlewares: middleware.composeExpressMiddlewares,
    expectEmptyObject: test.expectEmptyObject,
    expectFuncExists: test.expectFuncExists,
    expectNonEmptyObjectExists: test.expectNonEmptyObjectExists,
});
