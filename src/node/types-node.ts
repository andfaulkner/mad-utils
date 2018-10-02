/// <reference types="express" />

import {HandleFunction} from 'connect';

/**
 * Not a true import - just imports the type defs
 */
import {Application, Router} from 'express';

/**
 * Express application types
 */
export type ExpressApp = Application | Router;

/******************** MIDDLEWARE TYPES ********************/
/**
 * Generic signature for Express (slash Connect) middlewares
 */
export type MWare<T> = (T: T) => HandleFunction;

/**
 * Generic signature for Express (slash Connect) middlewares
 * Alias for MWare type
 */
export type Middleware<T> = MWare<T>;

/**
 * Function for applying a middleware to a given object
 */
export type ApplyMiddlewareFn = <T extends Object | object | Function>(app: T) => T;
