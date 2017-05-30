/// <reference types="connect" />
import { ApplyMiddlewareFn, ExpressApp, MWare } from './types-node';
import * as connect from 'connect';
/**
 * Returns an Express-consumable middleware if NODE_ENV is 'production'.
 * @param {Object} opts Middleware config. Normally passed directly to the middleware function.
 * @return {Function} signature: (middleware: connect.HandleFunction) => express.Application
 *   |> @param {Middleware} middleware - Express middleware to conditionally apply.
 *   |> @return {Middleware} In production: returns param 'middleware' with param 'opts' passed in.
 *                           In development: returns a 'passthrough' middleware that does nothing.
 *
 * @example Apply "helmet" middleware to an Express Application or Router in production only:
 *              app.use(useMiddlewareInProdOnly()(helmet));
 *
 * @example Apply middleware only in production, with options provided to the middleware:
 *              app.use(useMiddlewareInProdOnly(helmetConfig)(helmet));
 *          Above is equivalent to the following Express middleware application pattern:
 *              app.use(helmet(helmetConfig));
 *
 * @example With chaining:
 *              app.use(useMiddlewareInProdOnly(faviconPath)(expressFavicon))
 *                 .use(useMiddlewareInProdOnly()(helmet))
 *                 .use(morganLogging)
 *                 .use(useMiddlewareInProdOnly()(productionLogger))
 */
export declare const useMiddlewareInProdOnly: <T>(opts?: T) => (middleware: MWare<T>) => connect.Server;
/**
 * @alias for useMiddlewareInProdOnly
 */
export declare const useMiddlewareInProductionOnly: <T>(opts?: T) => (middleware: MWare<T>) => connect.Server;
/**
 * Apply any number of middlewares to the given express application.
 */
export declare const composeExpressMiddlewares: <T extends ExpressApp>(app: T, ...midwareApplicators: ApplyMiddlewareFn[]) => T;
export { composeExpressMiddlewares as composeExpressMiddlewareApplicators };
