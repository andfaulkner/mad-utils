"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** LOGGING *********************************************/
var shared_1 = require("mad-logs/lib/shared");
var log = shared_1.logFactory("hocs", shared_1.Styles.angryBird);
/********************************************* EXPORT *********************************************/
/**
 * Log a React class component's name and props directly before rendering
 *
 * Example: @logOnRender(log) class MyClass { ... }
 *
 * @param {Log} logger MadLogs instance to use for logging the component data
 * @param {string} verbosity verbosity level to log at {Default: 'verbose'}
 */
function logOnRender(logger, verbosity) {
    if (logger === void 0) { logger = log; }
    if (verbosity === void 0) { verbosity = 'verbose'; }
    return function logOnRenderHOC(WrappedComponent) {
        var Enhancer = /** @class */ (function (_super) {
            __extends(Enhancer, _super);
            function Enhancer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Enhancer.prototype.render = function () {
                var parentName = Object.getPrototypeOf(this.constructor).name;
                logger[verbosity]("Rendering " + parentName + " with this.props:", this.props);
                return _super.prototype.render.call(this);
            };
            return Enhancer;
        }(WrappedComponent));
        Enhancer.displayName = WrappedComponent.name + "_logger";
        return Enhancer;
    };
}
exports.logOnRender = logOnRender;
//# sourceMappingURL=hocs.js.map