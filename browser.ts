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

export {
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
    validation,
    stream,
};

export * from './src/array';
export * from './src/date';
export * from './src/decorator';
export * from './src/enum';
export * from './src/error';
export * from './src/function';
export * from './src/locale';
export * from './src/number';
export * from './src/object';
export * from './src/url';
export * from './src/search';
export * from './src/stream';
export * from './src/string';
export * from './src/validation';

import {isNode} from 'detect-node';
export {isNode};

// Import DOM module
import * as dom from './src/browser/dom';
export * from './src/browser/dom';
export {dom};

// Import event module
import * as event from './src/browser/event';
export * from './src/browser/event';
export {event};

// Import local-store module
import * as localStore from './src/browser/local-store';
export * from './src/browser/local-store';
export {localStore};
export {localStore as localStorage};
export {localStore as localStoreUtils};
export {localStore as localStorageUtils};

// Import browser-types (including merged-in types from types-iso)
import * as browserTypes from './src/browser/types-browser';
export * from './src/browser/types-browser';
export * from './src/types-iso';
export * from './src/types-data-generic';

// Build final browser types object by merging isomorphic types with browser-specific types
export const types = Object.assign(isoTypes, browserTypes, dataTypes);

/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
export const mUtils = {
    array,
    commonDataTypes: dataTypes,
    dataTypes,
    date,
    decorator,
    decorators: decorator,
    dom,
    enum: Enum,
    Enum,
    err: error,
    error,
    event,
    func,
    function: func,
    functionUtils: func,
    genericDataTypes: dataTypes,
    isNode,
    locale,
    localStore,
    localStoreUtils: localStore,
    localStorage: localStore,
    localStorageUtils: localStore,
    number,
    object,
    url,
    search,
    stacktrace: error,
    stream,
    str: string,
    string,
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

/**
 * Most common functions from mad-utils used in browser
 */
export const common = Object.assign({}, commonShared, {
    parseUserAgent: dom.parseUserAgent,
    getFromStorage: localStore.getFromStorage,
});
