export { MiddlewareAdder, ExpressApp } from './types';
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
export declare const useMiddlewareInProdOnly: <T>(opts?: T) => (middleware: any) => any;
