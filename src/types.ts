/// <reference path="../node_modules/@types/express/index.d.ts" />

import * as connect from 'connect';

import moment from 'moment';
import { DecoratorError } from './error';

// Not a true import. Gets around it by importing the type defs.
import { Application, Router } from 'express';

/************************************ COMMON TYPE DEFINITIONS *************************************/
export interface ClassConstructor {
    new(...args: any[]): {};
}

// For cases where something truly can be any value (contrast with the most common
// case where 'any' is used in lieu of determining a highly complex type)
export type RealAny = any;

export interface SingletonInterface<U> {
    new(...args: any[]): U;
    new: <Y>(...args: any[]) => Y;
}

/**
 * Generic signature for Express (slash Connect) middlewares
 */
export type MWare<T> = (T: T) => connect.HandleFunction;

export type ApplyMiddlewareFn = <T>(app: T) => T;
export type ExpressApp = Application | Router;

/***************************************** TYPE HANDLERS ******************************************/
/**
 *  Returns true if the value is null, undefined, or a string.
 *  @param {any} val - Value to type check.
 *  @return {boolean} true if val is null, undefined, or a string.
 */
export const isNonexistentOrString = (val: RealAny): boolean => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};
/**
 * Returns true if the given argument is a number or a string.
 */
export const isNumberLike = (arg: RealAny): boolean => {
    if (typeof arg === 'number') {
        return true;
    }
    return typeof arg === 'string' && !isNaN(parseInt(arg, 10));
};

/**
 * Returns true if the given arguments is a moment instance, Date instance, or a string.
 */
export const isDateLike = (arg: RealAny): boolean => {
    return typeof arg === 'string' || arg instanceof moment || arg instanceof Date;
};

/**
 * True if the given object is an array. Robust, and works across multiple JS environments.
 */
export const isArray = (value: RealAny): boolean => {
    // Fully compliant ES5, ES6, ES7, ES8 ES[+] environments
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
           && value.constructor
           && (value.constructor.name === 'Array'
               // All ES5 and higher environments
               || (Object.getPrototypeOf && Object.getPrototypeOf(value.constructor) === Array)
               // Pre-ES5 web browsers
               || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
};

/**
 * Returns true if given value is an integer.
 *
 * @param {any} value - value to check type of.
 * @return {boolean} true if given value is integer.
 *
 * TODO TEST!
 */
export const isInt = (val: RealAny): boolean => {
    const valAsFloat = parseFloat(val);
    return (isNaN(val)) ? false
                        : (valAsFloat | 0) === valAsFloat;
};

/**
 * TODO make the design-time behaviour more reasonable - i.e. proper type hints + Intellisense.
 *
 * Any class wrapped in this decorator becomes a singleton immediately.
 * Throws if attempt is made to wrap a non-class.
 */
export const singleton = <T extends ClassConstructor>(constructor: T, ...varargs: any[]) => {
    if (varargs.length > 0) {
        throw new DecoratorError('Can only apply @singleton to classes', 'singleton', constructor);
    }
    const SingletonClass = class SingletonClass extends constructor {
        private static _instance: SingletonClass = null;

        public static new = (...args: any[]) => {
            if (!SingletonClass._instance) {
                SingletonClass._instance = new SingletonClass(...args);
            }
            return SingletonClass._instance;
        }

        constructor(...args: any[]) {
            if (SingletonClass._instance) return SingletonClass._instance;
            super(...args);
            SingletonClass._instance = this;
            return SingletonClass._instance;
        }
    }

    Object.defineProperty(SingletonClass, 'name', { value: constructor.name });
    return SingletonClass as (SingletonInterface<any> & typeof constructor);
};

export { isMultilangTextObj } from './object';
