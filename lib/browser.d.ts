import { array, date, decorator, Enum, error, func, json, locale, number, object, url, search, string, types as isoTypes, validation, dataTypes, stream } from './shared';
export { array, date, decorator, Enum, error, func, json, locale, number, object, url, search, string, validation, stream };
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
export * from './src/url';
export * from './src/search';
export * from './src/stream';
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
import * as location from './src/browser/location';
export * from './src/browser/location';
export { location };
import * as localStore from './src/browser/local-store';
export * from './src/browser/local-store';
export { localStore };
export { localStore as localStorage };
export { localStore as localStoreUtils };
export { localStore as localStorageUtils };
import * as browserTypes from './src/browser/types-browser';
export * from './src/browser/types-browser';
export * from './src/types-iso';
export * from './src/types-data-generic';
export declare const types: typeof isoTypes & typeof browserTypes & typeof dataTypes;
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
export declare const mUtils: {
    array: typeof array;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    err: typeof error;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    location: typeof location;
    number: typeof number;
    object: typeof object;
    url: typeof url;
    search: typeof search;
    stacktrace: typeof error;
    stream: typeof stream;
    str: typeof string;
    string: typeof string;
    type: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    types: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    typing: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    validation: typeof validation;
};
export declare const __: {
    array: typeof array;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    err: typeof error;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    location: typeof location;
    number: typeof number;
    object: typeof object;
    url: typeof url;
    search: typeof search;
    stacktrace: typeof error;
    stream: typeof stream;
    str: typeof string;
    string: typeof string;
    type: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    types: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    typing: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    validation: typeof validation;
};
export declare const m_: {
    array: typeof array;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    err: typeof error;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    location: typeof location;
    number: typeof number;
    object: typeof object;
    url: typeof url;
    search: typeof search;
    stacktrace: typeof error;
    stream: typeof stream;
    str: typeof string;
    string: typeof string;
    type: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    types: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    typing: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    validation: typeof validation;
};
export declare const madUtils: {
    array: typeof array;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    date: typeof date;
    decorator: typeof decorator;
    decorators: typeof decorator;
    dom: typeof dom;
    enum: typeof Enum;
    Enum: typeof Enum;
    err: typeof error;
    error: typeof error;
    event: typeof event;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
    location: typeof location;
    number: typeof number;
    object: typeof object;
    url: typeof url;
    search: typeof search;
    stacktrace: typeof error;
    stream: typeof stream;
    str: typeof string;
    string: typeof string;
    type: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    types: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    typing: typeof isoTypes & typeof browserTypes & typeof dataTypes;
    validation: typeof validation;
};
/**
 * Most common functions from mad-utils used in browser.
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
    isArray: (val: any) => val is any[];
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
    parseQueryParams: <T>(queryParamsStr?: string) => T;
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
    repeatChars: (repStr: string, len: number) => string;
    endsWithExt: (inode: string, ext: string) => boolean;
    leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    centeredPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    isNonexistentOrString: (val: any) => val is string;
    isNumberLike: (val: any, allowArrayWith1Num?: boolean) => boolean;
    isBoolean: (val: any) => val is boolean;
    isDateLike: (val: any) => boolean;
    isTrue: (val: any, include1CharVal?: boolean) => val is true;
    castToNum: (numLike: isoTypes.NumLike, throwOnFail?: boolean) => number | Error;
    CharInputStream: typeof stream.CharInputStream;
    isNode: any;
} & {
    parseUserAgent: (userAgent?: string) => dom.ParsedUserAgent;
    getFromStorage: (key: string, store?: Object) => string | void;
};
