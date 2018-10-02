import { Moment } from 'moment';
export * from './shared';
import { array, date, decorator, Enum, error, func, locale, number, object, url, search, string, validation, dataTypes, stream } from './shared';
/***** Merge shared & Node error handling and export *****/
import * as nodeError from './src/node/node-error';
export * from './src/node/node-error';
export { nodeError };
export { error as errorShared } from './shared';
declare const err: {
    globalActivateCleanStack: () => void;
    scrubStackTrace(stack: string, srcFn?: string): string;
    removeFromStack(stack: string, libsToRm?: string[]): string;
    getFirstStackItem(stack: string): string;
    getFirstStackItem<T extends Error>(error: T): string;
    getSecondStackItem(stack: string): string;
    getSecondStackItem<T extends Error>(error: T): string;
    getThirdStackItem(stack: string): string;
    getThirdStackItem<T extends Error>(error: T): string;
};
export { err };
export { err as error };
/***** Export Node-specific modules/namespaces *****/
import * as middleware from './src/node/middleware';
export * from './src/node/middleware';
export { middleware };
export { middleware as middlewares };
export { middleware as mware };
export { middleware as MW };
import * as test from './src/node/test';
export * from './src/node/test';
export { test };
import * as file from './src/node/file';
export * from './src/node/file';
export { file };
import * as expressRouting from './src/node/express-routing';
export * from './src/node/express-routing';
export { expressRouting };
/***** Build & export Node-specific types *****/
import * as nodeTypes from './src/node/types-node';
import * as typesIso from './src/types-iso';
export * from './src/node/types-node';
export declare const types: {
    biologicalSexes: Readonly<{
        male: "male";
        female: "female";
    }>;
    commonBiologicalSexes: Readonly<{
        male: "male";
        female: "female";
    }>;
    sexes: Readonly<{
        male: "male";
        female: "female";
    }>;
    commonSexes: Readonly<{
        male: "male";
        female: "female";
    }>;
    biologicalSexesWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    commonBiologicalSexesWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    sexesWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    commonSexesWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    sexWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    biologicalSexesWithOther: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    sexesWithOther: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    commonSexesWithOther: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    commonBiologicalSexesWithOther: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    gender: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    genderCommon: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }>;
    genderWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    genderCommonWithBoth: Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        both: "both";
    }>;
    genderFull: Readonly<Readonly<Readonly<{
        male: "male";
        female: "female";
    }> & {
        other: "other";
    }> & {
        transMale: "trans male";
        transFemale: "trans female";
        genderqueer: "genderqueer";
        genderfluid: "genderfluid";
        intersex: "intersex";
        agender: "agender";
        bigender: "bigender";
        nonBinary: "nonBinary";
        none: "none";
    }>;
    CANProvinces: Readonly<{
        on: "Ontario";
        qc: "Quebec";
        nb: "New Brunswick";
        ns: "Nova Scotia";
        pe: "Prince Edward Island";
        mb: "Manitoba";
        sk: "Saskatchewan";
        bc: "British Columbia";
        nt: "Northwest Territories";
        nu: "Nunavut";
        yt: "Yukon Territory";
        ab: "Alberta";
        nl: "Newfoundland and Labrador";
    }>;
    CANProvincesOrNone: Readonly<Readonly<{
        on: "Ontario";
        qc: "Quebec";
        nb: "New Brunswick";
        ns: "Nova Scotia";
        pe: "Prince Edward Island";
        mb: "Manitoba";
        sk: "Saskatchewan";
        bc: "British Columbia";
        nt: "Northwest Territories";
        nu: "Nunavut";
        yt: "Yukon Territory";
        ab: "Alberta";
        nl: "Newfoundland and Labrador";
    }> & {
        none: "none";
    }>;
    canadianProvinces: Readonly<{
        on: "Ontario";
        qc: "Quebec";
        nb: "New Brunswick";
        ns: "Nova Scotia";
        pe: "Prince Edward Island";
        mb: "Manitoba";
        sk: "Saskatchewan";
        bc: "British Columbia";
        nt: "Northwest Territories";
        nu: "Nunavut";
        yt: "Yukon Territory";
        ab: "Alberta";
        nl: "Newfoundland and Labrador";
    }>;
    canadianProvincesOrNone: Readonly<Readonly<{
        on: "Ontario";
        qc: "Quebec";
        nb: "New Brunswick";
        ns: "Nova Scotia";
        pe: "Prince Edward Island";
        mb: "Manitoba";
        sk: "Saskatchewan";
        bc: "British Columbia";
        nt: "Northwest Territories";
        nu: "Nunavut";
        yt: "Yukon Territory";
        ab: "Alberta";
        nl: "Newfoundland and Labrador";
    }> & {
        none: "none";
    }>;
    isUndefined: (value: any) => value is undefined;
    isNullOrUndefined: (val: any) => val is null;
    isVoidOrString: (val: any) => val is string;
    isAlphabeticChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
    isAlphaChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
    isNumber: <T extends number | Number = number>(val: any) => val is T;
    isNum: <T extends number | Number = number>(val: any) => val is T;
    isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
    isNumLike: <T extends string | number | String | Number = number>(val: any) => val is T;
    isInteger: <T extends string | number | String | Number = number>(val: any) => val is T;
    isInt: <T extends string | number | String | Number = number>(val: any) => val is T;
    isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T;
    isIntLike: <T extends string | number | String | Number = number>(val: any) => val is T;
    isString: <T extends string | String = string>(val: any) => val is T;
    isStringOrNumber: (val: any) => val is string | number | String | Number;
    isStringOrNum: (val: any) => val is string | number | String | Number;
    isStrOrNum: (val: any) => val is string | number | String | Number;
    isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
    isBool: <T extends boolean | Boolean = boolean>(val: any) => val is T;
    isDateLike: <T extends string | boolean | Object | Moment>(val: any) => val is T;
    isArray: <T = any>(val: any) => val is T[];
    isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
    isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T;
    isFunction: <T extends Function = (...args: any[]) => any>(val: any) => val is T;
    singleton: <T extends typesIso.ClassConstructor>(constructor: T) => typesIso.SingletonInterface<any> & T;
    boolStringToBool: (val: string | boolean, strict?: boolean) => boolean;
    toBoolFromBoolString: (val: string | boolean, strict?: boolean) => boolean;
} & typeof dataTypes;
/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus node-specific namespaces
 */
export declare const mUtils: {
    expressRouting: typeof expressRouting;
    file: typeof file;
    middleware: typeof middleware;
    nodeErr: typeof nodeError;
    nodeError: typeof nodeError;
    search: typeof search;
    stream: typeof stream;
    test: typeof test;
    type: {
        biologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonBiologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        sexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        biologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonBiologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        biologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        sexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonBiologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        gender: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderCommon: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderCommonWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderFull: Readonly<Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }> & {
            transMale: "trans male";
            transFemale: "trans female";
            genderqueer: "genderqueer";
            genderfluid: "genderfluid";
            intersex: "intersex";
            agender: "agender";
            bigender: "bigender";
            nonBinary: "nonBinary";
            none: "none";
        }>;
        CANProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        CANProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        canadianProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        canadianProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        isUndefined: (value: any) => value is undefined;
        isNullOrUndefined: (val: any) => val is null;
        isVoidOrString: (val: any) => val is string;
        isAlphabeticChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isAlphaChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isNumber: <T extends number | Number = number>(val: any) => val is T;
        isNum: <T extends number | Number = number>(val: any) => val is T;
        isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isNumLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInteger: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInt: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isString: <T extends string | String = string>(val: any) => val is T;
        isStringOrNumber: (val: any) => val is string | number | String | Number;
        isStringOrNum: (val: any) => val is string | number | String | Number;
        isStrOrNum: (val: any) => val is string | number | String | Number;
        isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isBool: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isDateLike: <T extends string | boolean | Object | Moment>(val: any) => val is T;
        isArray: <T = any>(val: any) => val is T[];
        isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
        isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T;
        isFunction: <T extends Function = (...args: any[]) => any>(val: any) => val is T;
        singleton: <T extends typesIso.ClassConstructor>(constructor: T) => typesIso.SingletonInterface<any> & T;
        boolStringToBool: (val: string | boolean, strict?: boolean) => boolean;
        toBoolFromBoolString: (val: string | boolean, strict?: boolean) => boolean;
    } & typeof dataTypes;
    types: {
        biologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonBiologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        sexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        biologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonBiologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        biologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        sexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonBiologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        gender: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderCommon: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderCommonWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderFull: Readonly<Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }> & {
            transMale: "trans male";
            transFemale: "trans female";
            genderqueer: "genderqueer";
            genderfluid: "genderfluid";
            intersex: "intersex";
            agender: "agender";
            bigender: "bigender";
            nonBinary: "nonBinary";
            none: "none";
        }>;
        CANProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        CANProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        canadianProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        canadianProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        isUndefined: (value: any) => value is undefined;
        isNullOrUndefined: (val: any) => val is null;
        isVoidOrString: (val: any) => val is string;
        isAlphabeticChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isAlphaChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isNumber: <T extends number | Number = number>(val: any) => val is T;
        isNum: <T extends number | Number = number>(val: any) => val is T;
        isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isNumLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInteger: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInt: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isString: <T extends string | String = string>(val: any) => val is T;
        isStringOrNumber: (val: any) => val is string | number | String | Number;
        isStringOrNum: (val: any) => val is string | number | String | Number;
        isStrOrNum: (val: any) => val is string | number | String | Number;
        isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isBool: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isDateLike: <T extends string | boolean | Object | Moment>(val: any) => val is T;
        isArray: <T = any>(val: any) => val is T[];
        isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
        isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T;
        isFunction: <T extends Function = (...args: any[]) => any>(val: any) => val is T;
        singleton: <T extends typesIso.ClassConstructor>(constructor: T) => typesIso.SingletonInterface<any> & T;
        boolStringToBool: (val: string | boolean, strict?: boolean) => boolean;
        toBoolFromBoolString: (val: string | boolean, strict?: boolean) => boolean;
    } & typeof dataTypes;
    typing: {
        biologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonBiologicalSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        sexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        commonSexes: Readonly<{
            male: "male";
            female: "female";
        }>;
        biologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonBiologicalSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        commonSexesWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        sexWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        biologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        sexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        commonBiologicalSexesWithOther: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        gender: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderCommon: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }>;
        genderWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderCommonWithBoth: Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            both: "both";
        }>;
        genderFull: Readonly<Readonly<Readonly<{
            male: "male";
            female: "female";
        }> & {
            other: "other";
        }> & {
            transMale: "trans male";
            transFemale: "trans female";
            genderqueer: "genderqueer";
            genderfluid: "genderfluid";
            intersex: "intersex";
            agender: "agender";
            bigender: "bigender";
            nonBinary: "nonBinary";
            none: "none";
        }>;
        CANProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        CANProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        canadianProvinces: Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }>;
        canadianProvincesOrNone: Readonly<Readonly<{
            on: "Ontario";
            qc: "Quebec";
            nb: "New Brunswick";
            ns: "Nova Scotia";
            pe: "Prince Edward Island";
            mb: "Manitoba";
            sk: "Saskatchewan";
            bc: "British Columbia";
            nt: "Northwest Territories";
            nu: "Nunavut";
            yt: "Yukon Territory";
            ab: "Alberta";
            nl: "Newfoundland and Labrador";
        }> & {
            none: "none";
        }>;
        isUndefined: (value: any) => value is undefined;
        isNullOrUndefined: (val: any) => val is null;
        isVoidOrString: (val: any) => val is string;
        isAlphabeticChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isAlphaChar: <T extends string = string>(val: any, handleAccents?: boolean) => val is T;
        isNumber: <T extends number | Number = number>(val: any) => val is T;
        isNum: <T extends number | Number = number>(val: any) => val is T;
        isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isNumLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInteger: <T extends string | number | String | Number = number>(val: any) => val is T;
        isInt: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isIntLike: <T extends string | number | String | Number = number>(val: any) => val is T;
        isString: <T extends string | String = string>(val: any) => val is T;
        isStringOrNumber: (val: any) => val is string | number | String | Number;
        isStringOrNum: (val: any) => val is string | number | String | Number;
        isStrOrNum: (val: any) => val is string | number | String | Number;
        isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isBool: <T extends boolean | Boolean = boolean>(val: any) => val is T;
        isDateLike: <T extends string | boolean | Object | Moment>(val: any) => val is T;
        isArray: <T = any>(val: any) => val is T[];
        isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
        isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T;
        isFunction: <T extends Function = (...args: any[]) => any>(val: any) => val is T;
        singleton: <T extends typesIso.ClassConstructor>(constructor: T) => typesIso.SingletonInterface<any> & T;
        boolStringToBool: (val: string | boolean, strict?: boolean) => boolean;
        toBoolFromBoolString: (val: string | boolean, strict?: boolean) => boolean;
    } & typeof dataTypes;
    array: typeof array;
    date: typeof date;
    commonDataTypes: typeof dataTypes;
    dataTypes: typeof dataTypes;
    decorator: typeof decorator;
    decorators: typeof decorator;
    enum: typeof Enum;
    Enum: typeof Enum;
    err: typeof error;
    error: typeof error;
    find: typeof search;
    func: typeof func;
    function: typeof func;
    functionUtils: typeof func;
    genericDataTypes: typeof dataTypes;
    isNode: any;
    locale: typeof locale;
    math: typeof number;
    num: typeof number;
    number: typeof number;
    numeric: typeof number;
    object: typeof object;
    url: typeof url;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
    validation: typeof validation;
};
export { mUtils as __ };
export { mUtils as m_ };
export { mUtils as madUtils };
import * as connect from 'connect';
/**
 * Most common functions from mad-utils used in Node
 */
export declare const common: {
    first: typeof array.first;
    last: typeof array.last;
    first2: typeof array.first2;
    last2: typeof array.last2;
    without: {
        last: typeof array.withoutLast;
        last2: typeof array.withoutLast2;
        last3: typeof array.withoutLast3;
        lastN: typeof array.withoutLastN;
        first: typeof array.withoutFirst;
        first2: typeof array.withoutFirst2;
        first3: typeof array.withoutFirst3;
        firstN: typeof array.withoutFirstN;
    };
    withoutFirst: typeof array.withoutFirst;
    withoutLast: typeof array.withoutLast;
    withoutFirst2: typeof array.withoutFirst2;
    withoutLast2: typeof array.withoutLast2;
    removeMatches: typeof array.removeMatches;
    rmAllFalsy: <T = any>(arr: T[], falsyType?: array._FalsyType) => T[];
    isArray: <T = any>(val: any) => val is T[];
    isLeapYear: typeof date.isLeapYear;
    now: (timeFormat?: string) => string;
    condSwitch: typeof func.condSwitch;
    uuid: number.UUIDNamespace;
    hasKey: <T extends Object>(obj: T, matchKey: string) => boolean;
    eachPair: <T extends Object>(func: (val: T[Extract<keyof T, string>], key?: Extract<keyof T, string>) => any) => (obj: T) => T;
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
    centerPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
    isVoidOrString: (val: any) => val is string;
    isNumberLike: <T extends string | number | String | Number = number>(val: any) => val is T;
    isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T;
    isDateLike: <T extends string | boolean | Object | Moment>(val: any) => val is T;
    isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T;
    CharInputStream: typeof stream.CharInputStream;
    isNode: any;
} & {
    isDir: (fileOrDirPath: string) => boolean;
    pathFromRoot: (filePathFromRoot?: string) => string;
    replaceInFile: typeof file.replaceInFile;
    getJsFilesInDir: (dir: string, excludeMin?: boolean) => string[];
    isFileInDir: (dir: string, filename: string) => boolean;
    useMiddlewareInProdOnly: <T>(opts?: T) => (middleware: nodeTypes.MWare<T>) => connect.Server;
    composeExpressMiddlewares: <T extends nodeTypes.ExpressApp>(app: T, ...midwareApplicators: nodeTypes.ApplyMiddlewareFn[]) => T;
    expectEmptyObject: (testValue: any) => void;
    expectFuncExists: (func: Function, name?: string, extraMsg?: string) => void;
    expectNonEmptyObjectExists: (nonEmptyObj: any, name: string, extraMsg?: string) => void;
};
