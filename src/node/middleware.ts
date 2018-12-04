import {ApplyMiddlewareFn, ExpressApp, MWare} from './types-node';
import connect from 'connect';

/**
 * Returns an Express-consumable middleware if NODE_ENV is 'production'
 *
 * @param {Object} opts
 *                 Middleware config
 *                 Normally passed directly to the middleware function
 * @return {Function} signature: (middleware: connect.HandleFunction) => express.Application
 *   |> @param {Middleware} middleware
 *              Express middleware to conditionally apply
 *   |> @return {Middleware}
 *              In production: returns param 'middleware' with param 'opts' passed in
 *              In development: returns a 'passthrough' middleware that does nothing
 *
 * Example: Apply "helmet" middleware to an Express Application or Router in production only:
 *              app.use(useMiddlewareInProdOnly()(helmet));
 *
 * Example: Apply middleware only in production, with options provided to the middleware:
 *              app.use(useMiddlewareInProdOnly(helmetConfig)(helmet));
 *          Above is equivalent to the following Express middleware application pattern:
 *              app.use(helmet(helmetConfig));
 *
 * Example: With chaining:
 *              app.use(useMiddlewareInProdOnly(faviconPath)(expressFavicon))
 *                 .use(useMiddlewareInProdOnly()(helmet))
 *                 .use(morganLogging)
 *                 .use(useMiddlewareInProdOnly()(productionLogger));
 */
export const useMiddlewareInProdOnly = <T>(opts?: T) => (middleware: MWare<T>): connect.Server => {
    const chain = connect();
    if (process.env.NODE_ENV === 'production') {
        chain.use(middleware(opts));
    }
    return chain;
};

/**
 * Alias for useMiddlewareInProdOnly
 */
export {useMiddlewareInProdOnly as useMiddlewareInProductionOnly};

/**
 * Apply any number of middlewares to the given express application
 */
export const composeExpressMiddlewares = <T extends ExpressApp>(
    app: T,
    ...midwareApplicators: ApplyMiddlewareFn[]
): T => midwareApplicators.reduce((acc, midwareAdder: ApplyMiddlewareFn) => midwareAdder(acc), app);

export {composeExpressMiddlewares as composeExpressMiddlewareApplicators};
