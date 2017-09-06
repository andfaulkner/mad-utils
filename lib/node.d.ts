/// <reference types="connect" />
import { array, date, decorator, Enum, func, json, locale, number, object, query, search, string, types as isoTypes, validation } from './shared';
export { array, date, decorator, Enum, func, json, locale, number, object, query, search, string, validation };
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
export * from './src/validation';
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
declare const err: typeof errorShared & typeof nodeError;
export { err };
export { err as error };
import * as test from './src/node/test';
export * from './src/node/test';
export { test };
import * as file from './src/node/file';
export * from './src/node/file';
export { file };
import * as nodeTypes from './src/node/types-node';
export declare const types: typeof isoTypes;
export * from './src/node/types-node';
export * from './src/types-iso';
import * as webpack from './src/node/webpack';
export * from './src/node/webpack';
export { webpack };
export { webpack as webpackUtils };
import * as expressRouting from './src/node/express-routing';
export * from './src/node/express-routing';
export { expressRouting };
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
    error: typeof errorShared & typeof nodeError;
    err: typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    expressRouting: typeof expressRouting;
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
    stacktrace: typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes;
    types: typeof isoTypes;
    typing: typeof isoTypes;
    validation: typeof validation;
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
    error: typeof errorShared & typeof nodeError;
    err: typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    expressRouting: typeof expressRouting;
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
    stacktrace: typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes;
    types: typeof isoTypes;
    typing: typeof isoTypes;
    validation: typeof validation;
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
    error: typeof errorShared & typeof nodeError;
    err: typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    expressRouting: typeof expressRouting;
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
    stacktrace: typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes;
    types: typeof isoTypes;
    typing: typeof isoTypes;
    validation: typeof validation;
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
    error: typeof errorShared & typeof nodeError;
    err: typeof errorShared & typeof nodeError;
    errorShared: typeof errorShared;
    expressRouting: typeof expressRouting;
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
    stacktrace: typeof errorShared & typeof nodeError;
    str: typeof string;
    string: typeof string;
    test: typeof test;
    type: typeof isoTypes;
    types: typeof isoTypes;
    typing: typeof isoTypes;
    validation: typeof validation;
    webpack: typeof webpack;
    webpackUtils: typeof webpack;
};
import * as connect from 'connect';
/**
 * Most common functions from mad-utils used in Node.
 */
export declare const common: {
    first: {
        (str: string): string;
        <T>(arr: T[]): T;
    };
    last: {
        (str: string): string;
        <T>(arr: T[]): T;
    };
    first2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    last2: {
        (str: string): string;
        <T>(arr: T[]): T[];
    };
    without: {
        last: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        last2: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        last3: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        lastN: {
            <T>(str: string, numToRm: number): string;
            <T>(arr: T[], numToRm: number): T[];
        };
        first: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        first2: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        first3: {
            <T>(str: string): string;
            <T>(arr: T[]): T[];
        };
        firstN: {
            <T>(str: string, numToRm: number): string;
            <T>(arr: T[], numToRm: number): T[];
        };
    };
    withoutFirst: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    withoutLast: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    withoutFirst2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    withoutLast2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    removeMatches: {
        (arr1: any[], arr2: any): any[];
        (arr1: any[], arr2: any[]): any[];
    };
    rmAllFalsy: (arr: any[]) => any[];
    isArray: (val: any) => boolean;
    isLeapYear: (year: isoTypes.NumLike) => boolean;
    now: (timeFormat?: string) => string;
    condSwitch: (cond: any, val: any, ...condValPairsAndOrDefVal: any[]) => any;
    uuid: number.UUIDNamespace;
    merge: {
        <P, Q, R, S, T, U, V, W, X, Y, Z, L>(o1: P, o2?: Q, o3?: R, o4?: S, o5?: T, o6?: U, o7?: V, o8?: W, o9?: X, o10?: Y, o11?: Z, o12?: L): P & Q & R & S & T & U & V & W & X & Y & Z & L;
        <R>(obj: R): R;
        (...strs: string[]): string;
        <T>(...arrs: T[][]): T[];
        (...objs: any[][]): any[];
        (): {};
        (obj: null): {};
    };
    hasKey: <T extends Object>(obj: T, matchKey: string) => boolean;
    eachPair: <T extends Object>(func: (val: T[keyof T], key?: keyof T) => any) => (obj: T) => T;
    assignFrozenClone: <T>(...args: {}[]) => Readonly<T>;
    deepFreeze: <T>(obj: T) => Readonly<T>;
    parseQueryParams: <T>(queryParamsString?: string) => T;
    getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
    urlMinusQueryParams: (url?: string) => string;
    toSnakeCase: (str: string, consecUppercaseToLowercase?: boolean) => string;
    cap1LowerRest: (str: string) => string;
    capitalize: (str: string) => string;
    replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    removeWhitespace: (str: string) => string;
    chomp: (str: string, charsToChomp?: string) => string;
    matchesIgnoreCase: (matchOn: string) => (val: string) => boolean;
    removeMatchingText: (str: string, matcherToRm: string | RegExp) => string;
    repeatChars: (repChar: string, len: number) => string;
    endsWithExt: (inode: string, ext: string) => boolean;
    leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    centeredPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    isNonexistentOrString: (val: any) => boolean;
    isNumberLike: (val: any, allowArrayWith1Num?: boolean) => boolean;
    isBoolean: (val: any) => boolean;
    isDateLike: (val: any) => boolean;
    isTrue: (val: any) => boolean;
    castToNum: (numLike: isoTypes.NumLike, throwOnFail?: boolean) => number | Error;
} & {
    isDir: (fileOrDirPath: string) => boolean;
    pathFromRoot: (filePathFromRoot?: string) => string;
    replaceInFile: {
        (filePath: string, findString: string, replace: string): string;
        (filePath: string, findRegex: RegExp, replace: string): string;
    };
    getJsFilesInDir: (dir: string, excludeMin?: boolean) => string[];
    isFileInDir: (dir: string, filename: string) => boolean;
    useMiddlewareInProdOnly: <T>(opts?: T) => (middleware: nodeTypes.MWare<T>) => connect.Server;
    composeExpressMiddlewares: <T extends nodeTypes.ExpressApp>(app: T, ...midwareApplicators: nodeTypes.ApplyMiddlewareFn[]) => T;
    expectEmptyObject: (testValue: any) => void;
    expectFuncExists: (func: Function, name?: string, extraMsg?: string) => void;
    expectNonEmptyObjectExists: (nonEmptyObj: any, name: string, extraMsg?: string) => void;
};
