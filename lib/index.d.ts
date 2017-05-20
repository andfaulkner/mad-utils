/******************************************** IMPORTS *********************************************/
import * as array from './src/array';
export * from './src/array';
import * as date from './src/date';
export * from './src/date';
import * as decorator from './src/decorator';
export * from './src/decorator';
import * as Enum from './src/enum';
export * from './src/enum';
import * as error from './src/error';
export * from './src/error';
import * as event from './src/event';
export { event };
export { addClickEventToId, mouseEventFactory, removeClickEventFromId } from './src/event';
import * as json from './src/json';
export * from './src/json';
import * as object from './src/object';
export * from './src/object';
import * as query from './src/query';
export * from './src/query';
import * as string from './src/string';
export * from './src/string';
import * as test from './src/test';
export * from './src/test';
import * as types from './src/types';
export * from './src/types';
import * as dom from './src/dom';
export { dom };
export { $ } from './src/dom';
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export declare const mUtils: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: typeof date;
    decorator: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    decorators: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: typeof json;
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: typeof query;
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: typeof test;
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const _: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: typeof date;
    decorator: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    decorators: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: typeof json;
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: typeof query;
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: typeof test;
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const __: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: typeof date;
    decorator: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    decorators: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: typeof json;
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: typeof query;
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: typeof test;
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const m_: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: typeof date;
    decorator: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    decorators: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: typeof json;
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: typeof query;
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: typeof test;
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
export declare const madUtils: {
    array: {} & typeof array & {
        without: {
            last: <T>(arr: T[]) => T[];
            last2: <T>(arr: T[]) => T[];
            last3: <T>(arr: T[]) => T[];
            lastN: <T>(arr: T[], numToRm: number) => T[];
            first: <T>(arr: T[]) => T[];
            first2: <T>(arr: T[]) => T[];
            first3: <T>(arr: T[]) => T[];
            firstN: <T>(arr: T[], numToRm: number) => T[];
        };
    };
    date: typeof date;
    decorator: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    decorators: {} & typeof decorator & {
        DecoratorError: error.DecoratorError;
        singleton: <T extends types.ClassConstructor>(constructor: T, ...varargs: any[]) => types.SingletonInterface<any> & T;
    };
    dom: typeof dom;
    enum: typeof Enum;
    error: typeof error;
    event: typeof event;
    isNode: any;
    json: typeof json;
    number: {
        isInt: (val: any) => boolean;
        isNumberLike: (arg: any) => boolean;
    };
    object: typeof object;
    query: typeof query;
    search: {
        escapeRegExp: (regexStr: string) => string;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        replaceAll: (text: string, find: string | RegExp, replace: string) => string;
    };
    str: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    string: {} & {
        stringToEnumVal: (val: string, Enum: any) => number;
    } & typeof string;
    test: typeof test;
    type: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    types: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
    typing: {} & typeof types & {
        isMultilangTextObj: (obj: any) => boolean;
        matches: (matchAgainst: string) => (val: string) => boolean;
        matchesIgnoreCase: (matchAgainst: string) => (val: string) => boolean;
        isNonexistentOrString: (val: any) => boolean;
    };
};
