import * as connect from 'connect';
import { colors } from 'mad-logs/lib/node';
import { Application, Router } from 'express';
/**
 * Generic signature for Express (slash Connect) middlewares
 */
export declare type MWare<T> = (T: T) => connect.HandleFunction;
/**
 * @alias for MWare<T>
 */
export declare type Middleware<T> = MWare<T>;
export declare type ApplyMiddlewareFn = <T>(app: T) => T;
export declare type ExpressApp = Application | Router;
export declare type Color = typeof colors.reset;
