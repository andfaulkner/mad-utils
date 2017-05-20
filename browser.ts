// Import shared modules
import { array, date, decorator, Enum, error, json, number, object, query, search, string,
         types as isoTypes } from './shared';
export { array, date, decorator, Enum, error, json, number, object, query, search, string }

import { isNode } from 'detect-node';
export { isNode }

// Import DOM module
import * as dom from './src/browser/dom';
export * from './src/browser/dom';
export { dom }

// Import event module
import * as event from './src/browser/event';
export * from './src/browser/event';
export { event }

// Import local-store module
import * as localStore from './src/browser/local-store';
export * from './src/browser/local-store';
export { localStore }

// Import browser-types
import * as browserTypes from './src/browser/types-browser';

// Build final browser types object by merging isomorphic types with browser-specific types.
export const types = Object.assign({}, isoTypes, browserTypes);


/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
export const mUtils = {
    array,
    date,
    decorator,
    decorators: decorator,
    dom,
    enum: Enum,
    Enum,
    error,
    event,
    isNode,
    json,
    localStore,
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
