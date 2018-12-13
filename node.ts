// Needed for exports to work correctly
import {Moment} from 'moment';

// Import shared modules, and re-export them for top-level access
import {m_} from './shared';
export * from './shared';

// Import shared modules for usage in typings
import {
    array,
    date,
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

import {error as errorShared} from './shared';
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
import * as typesIso from './src/types-iso';

export * from './src/node/types-node';
export const types = Object.assign(isoTypes, nodeTypes, dataTypes);

/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus node-specific namespaces
 */
export const mUtils = {
    ...m_,
    expressRouting,
    file,
    middleware,
    nodeErr: nodeError,
    nodeError,
    search,
    stream,
    test,
    type: types,
    types,
    typing: types,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export {mUtils as __};
export {mUtils as m_};
export {mUtils as madUtils};
