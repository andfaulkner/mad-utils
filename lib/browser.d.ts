import { array, date, decorator, Enum, error, func, json, locale, number, object, query, search, string, types as isoTypes, validation } from './shared';
export { array, date, decorator, Enum, error, func, json, locale, number, object, query, search, string, validation };
export * from './src/array';
export * from './src/date';
export * from './src/decorator';
export * from './src/enum';
export * from './src/error';
export * from './src/function';
export * from './src/json';
export * from './src/locale';
export * from './src/number';
export * from './src/object';
export * from './src/query';
export * from './src/search';
export * from './src/string';
export * from './src/validation';
import { isNode } from 'detect-node';
export { isNode };
import * as dom from './src/browser/dom';
export * from './src/browser/dom';
export { dom };
import * as event from './src/browser/event';
export * from './src/browser/event';
export { event };
import * as localStore from './src/browser/local-store';
export * from './src/browser/local-store';
export { localStore };
export { localStore as localStorage };
export { localStore as localStoreUtils };
export { localStore as localStorageUtils };
import * as browserTypes from './src/browser/types-browser';
export * from './src/browser/types-browser';
export * from './src/types-iso';
export declare const types: {} & typeof isoTypes & typeof browserTypes;
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
export declare const mUtils: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: {} & typeof isoTypes & typeof browserTypes;
    types: {} & typeof isoTypes & typeof browserTypes;
    typing: {} & typeof isoTypes & typeof browserTypes;
    validation: typeof validation;
};
export declare const __: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: {} & typeof isoTypes & typeof browserTypes;
    types: {} & typeof isoTypes & typeof browserTypes;
    typing: {} & typeof isoTypes & typeof browserTypes;
    validation: typeof validation;
};
export declare const m_: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: {} & typeof isoTypes & typeof browserTypes;
    types: {} & typeof isoTypes & typeof browserTypes;
    typing: {} & typeof isoTypes & typeof browserTypes;
    validation: typeof validation;
};
export declare const madUtils: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: {} & typeof isoTypes & typeof browserTypes;
    types: {} & typeof isoTypes & typeof browserTypes;
    typing: {} & typeof isoTypes & typeof browserTypes;
    validation: typeof validation;
};
