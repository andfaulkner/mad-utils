/******************************************** IMPORTS *********************************************/
import * as array from './src/array';
export * from './src/array';
export { array };
import * as date from './src/date';
export * from './src/date';
export { date };
import * as decorator from './src/decorator';
export * from './src/decorator';
export { decorator };
import * as Enum from './src/enum';
export * from './src/enum';
export { Enum };
import * as error from './src/error';
export * from './src/error';
export { error };
import * as func from './src/function';
export * from './src/function';
export { func };
import * as json from './src/json';
export * from './src/json';
export { json };
import * as locale from './src/locale';
export * from './src/locale';
export { locale };
import * as number from './src/number';
export * from './src/number';
export { number };
import * as object from './src/object';
export * from './src/object';
export { object };
import * as query from './src/query';
export * from './src/query';
export { query };
import * as search from './src/search';
export * from './src/search';
export { search };
import * as string from './src/string';
export * from './src/string';
export { string };
import * as types from './src/types-iso';
export * from './src/types-iso';
export { types };
import * as dataTypes from './src/types-data-generic';
export * from './src/types-data-generic';
export { dataTypes };
import * as validation from './src/validation';
export * from './src/validation';
export { validation };
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export declare const mUtils: {
    array: typeof array;
    date: typeof date;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    find: typeof search;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    math: typeof number;
    num: typeof number;
    number: typeof number;
    numeric: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: typeof types;
    types: typeof types;
    typing: typeof types;
    validation: typeof validation;
};
export declare const __: {
    array: typeof array;
    date: typeof date;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    find: typeof search;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    math: typeof number;
    num: typeof number;
    number: typeof number;
    numeric: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: typeof types;
    types: typeof types;
    typing: typeof types;
    validation: typeof validation;
};
export declare const m_: {
    array: typeof array;
    date: typeof date;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    find: typeof search;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    math: typeof number;
    num: typeof number;
    number: typeof number;
    numeric: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: typeof types;
    types: typeof types;
    typing: typeof types;
    validation: typeof validation;
};
export declare const madUtils: {
    array: typeof array;
    date: typeof date;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    error: typeof error;
    find: typeof search;
    func: typeof func;
    'function': typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    json: typeof json;
    jsonUtils: typeof json;
    locale: typeof locale;
    math: typeof number;
    num: typeof number;
    number: typeof number;
    numeric: typeof number;
    object: typeof object;
    query: typeof query;
    search: typeof search;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    type: typeof types;
    types: typeof types;
    typing: typeof types;
    validation: typeof validation;
};
/************************************ EXPORT COMMON FUNCTIONS *************************************/
export declare const commonShared: {
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
    isLeapYear: (year: types.NumLike) => boolean;
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
    isTrue: (val: any, include1CharVal?: boolean) => boolean;
    castToNum: (numLike: types.NumLike, throwOnFail?: boolean) => number | Error;
};
export { commonShared as commonIso };
