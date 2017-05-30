/// <reference types="express" />

import * as connect from 'connect';

import { colors } from 'mad-logs/lib/node';

// Not a true import. Gets around it by importing the type defs.
import { Application, Router } from 'express';

/**
 * Generic signature for Express (slash Connect) middlewares
 */
export type MWare<T> = (T: T) => connect.HandleFunction;
/**
 * @alias for MWare<T>
 */
export type Middleware<T> = MWare<T>;

export type ApplyMiddlewareFn = <T>(app: T) => T;
export type ExpressApp = Application | Router;

// Note: hack to get the private "Color" from from the colors module.
export type Color = typeof colors.reset;
