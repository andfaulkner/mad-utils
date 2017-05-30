"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect = require("connect");
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
exports.useMiddlewareInProdOnly = function (opts) { return function (middleware) {
    var chain = connect();
    if (process.env.NODE_ENV === 'production') {
        chain.use(middleware(opts));
    }
    return chain;
}; };
/**
 * @alias for useMiddlewareInProdOnly
 */
exports.useMiddlewareInProductionOnly = exports.useMiddlewareInProdOnly;
/**
 * Apply any number of middlewares to the given express application.
 */
exports.composeExpressMiddlewares = function (app) {
    var midwareApplicators = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        midwareApplicators[_i - 1] = arguments[_i];
    }
    return midwareApplicators.reduce(function (acc, midwareAdder) { return midwareAdder(acc); }, app);
};
exports.composeExpressMiddlewareApplicators = exports.composeExpressMiddlewares;
//# sourceMappingURL=middleware.js.map