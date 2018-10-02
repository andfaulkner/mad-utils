/// <reference types="express" />

import {HandleFunction} from 'connect';
import {colors} from 'mad-logs/lib/node';

/**
 * Not a true import
 * Just imports the type defs
 */
import {Application, Router} from 'express';

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

/**
 * Express application types
 */
export type ExpressApp = Application | Router;

/**
 * Hack to get the private "Color" type from from the colors module
 */
export type Color = typeof colors.reset;
