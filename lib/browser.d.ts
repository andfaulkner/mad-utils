import { Moment } from 'moment';
export * from './shared';
import { array, date, decorator, Enum, error, func, locale, number, object, url, search, string, typesIso, validation, dataTypes, stream } from './shared';
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
/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus browser-specific namespaces
 */
export declare const mUtils: {
    dom: typeof dom;
    event: typeof event;
    localStore: typeof localStore;
    localStoreUtils: typeof localStore;
    localStorage: typeof localStore;
    localStorageUtils: typeof localStore;
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
    stream: typeof stream;
    object: typeof object;
    url: typeof url;
    search: typeof search;
    srch: typeof search;
    stacktrace: typeof error;
    str: typeof string;
    string: typeof string;
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
    };
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
    };
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
    };
    validation: typeof validation;
};
export { mUtils as __ };
export { mUtils as m_ };
export { mUtils as madUtils };
