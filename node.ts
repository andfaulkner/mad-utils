import {Moment} from 'moment';

// Import shared modules, and re-export them for top-level access
import {
    array,
    date,
    decorator,
    Enum,
    error,
    func,
    locale,
    number,
    object,
    url,
    search,
    string,
    types as isoTypes,
    validation,
    dataTypes,
    stream,
} from './shared';

/***** Merge shared & Node error handling and export *****/
import * as nodeError from './src/node/node-error';
export * from './src/node/node-error';
export {nodeError};

import * as errorShared from './shared';
export {error as errorShared} from './shared';

const err = {...errorShared, ...nodeError};
export {err};
export {err as error};

/***** Export Node-specific modules/namespaces *****/
// Import & export middleware (and middleware-handling) module/namespace
import * as middleware from './src/node/middleware';
export * from './src/node/middleware';
export {middleware};
export {middleware as middlewares};
export {middleware as mware};
export {middleware as MW};

// Import & export test module/namespace
import * as test from './src/node/test';
export * from './src/node/test';
export {test};

// Import & export file & file-handling module/namespace
import * as file from './src/node/file';
export * from './src/node/file';
export {file};

// Import ExpressJS routing helpers module
import * as expressRouting from './src/node/express-routing';
export * from './src/node/express-routing';
export {expressRouting};

/***** Build & export Node-specific types *****/
// Build final NodeJS types object by merging isomorphic types with Node-specific types
// Export all, including merged-in types from types-iso
import * as nodeTypes from './src/node/types-node';
export * from './src/node/types-node';
export const types = Object.assign(isoTypes, nodeTypes, dataTypes);

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
    function: func,
    functionUtils: func,
    genericDataTypes: dataTypes,
    isNode,
    locale,
    middleware,
    nodeErr: nodeError,
    nodeError,
    number,
    object,
    url,
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
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;

/************************************ COMMON FUNCTION EXPORTS *************************************/
import {commonShared} from './shared';
import {useMiddlewareInProdOnly} from './src/node/middleware';
import * as connect from 'connect';

/**
 * Most common functions from mad-utils used in Node
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
