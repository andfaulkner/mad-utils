import { array, date, decorator, Enum, func, json, locale, number, object, query, search, string, types as isoTypes } from './shared';
export { array, date, decorator, Enum, func, json, locale, number, object, query, search, string };
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
export { isNode };
import * as middleware from './src/node/middleware';
export * from './src/node/middleware';
export { middleware };
export { middleware as middlewares };
export { middleware as mware };
export { middleware as MW };
import * as nodeError from './src/node/node-error';
export * from './src/node/node-error';
export { nodeError };
import * as errorShared from './shared';
export { error as errorShared } from './shared';
declare const err: {} & typeof errorShared & typeof nodeError;
export { err };
export { err as error };
import * as test from './src/node/test';
export * from './src/node/test';
export { test };
import * as file from './src/node/file';
export * from './src/node/file';
export { file };
import * as nodeTypes from './src/node/types-node';
export declare const types: typeof isoTypes & typeof nodeTypes;
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
export declare const mUtils: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: {} & typeof errorShared & typeof nodeError;
    err: {} & typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    file: typeof file;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    middleware: typeof middleware;
    nodeErr: typeof nodeError;
    nodeError: typeof nodeError;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: {} & typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes & typeof nodeTypes;
    types: typeof isoTypes & typeof nodeTypes;
    typing: typeof isoTypes & typeof nodeTypes;
    webpack: typeof webpack;
    webpackUtils: typeof webpack;
};
export declare const __: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: {} & typeof errorShared & typeof nodeError;
    err: {} & typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    file: typeof file;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    middleware: typeof middleware;
    nodeErr: typeof nodeError;
    nodeError: typeof nodeError;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: {} & typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes & typeof nodeTypes;
    types: typeof isoTypes & typeof nodeTypes;
    typing: typeof isoTypes & typeof nodeTypes;
    webpack: typeof webpack;
    webpackUtils: typeof webpack;
};
export declare const m_: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: {} & typeof errorShared & typeof nodeError;
    err: {} & typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    file: typeof file;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    middleware: typeof middleware;
    nodeErr: typeof nodeError;
    nodeError: typeof nodeError;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: {} & typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes & typeof nodeTypes;
    types: typeof isoTypes & typeof nodeTypes;
    typing: typeof isoTypes & typeof nodeTypes;
    webpack: typeof webpack;
    webpackUtils: typeof webpack;
};
export declare const madUtils: {
    array: typeof array;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: {} & typeof errorShared & typeof nodeError;
    err: {} & typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    file: typeof file;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    middleware: typeof middleware;
    nodeErr: typeof nodeError;
    nodeError: typeof nodeError;
    number: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    stacktrace: {} & typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes & typeof nodeTypes;
    types: typeof isoTypes & typeof nodeTypes;
    typing: typeof isoTypes & typeof nodeTypes;
    webpack: typeof webpack;
    webpackUtils: typeof webpack;
};