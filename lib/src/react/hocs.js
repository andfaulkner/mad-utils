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
var mad_logs_1 = require("mad-logs");
var log = mad_logs_1.logFactory()("hocs", mad_logs_1.logMarkers.angryBird);
/********************************************* EXPORT *********************************************/
/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
function buildNamedSfc(displayName, statelessComponent) {
    var NamedSfc = statelessComponent;
    NamedSfc.displayName = displayName;
    return NamedSfc;
}
exports.buildNamedSfc = buildNamedSfc;
;
// Aliases for buildNamedSfc
exports.buildNamedStatelessComponent = buildNamedSfc;
exports.setSfcDisplayName = buildNamedSfc;
exports.setCmpDisplayName = buildNamedSfc;
exports.setDisplayName = buildNamedSfc;
/**
 * Log a React class component's name and props directly before rendering.
 * @param {MadLog} logger - MadLogs instance to use for logging the component data.
 */
function logOnRender(logger) {
    if (logger === void 0) { logger = log; }
    return function logOnRenderHOC(WrappedComponent) {
        var Enhancer = (function (_super) {
            __extends(Enhancer, _super);
            function Enhancer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = _this.state || {};
                _this.events = _this.events || {};
                return _this;
            }
            Enhancer.prototype.render = function () {
                var parentName = Object.getPrototypeOf(this.constructor).name;
                logger.verbose("Rendering " + parentName + " with this.props:", this.props);
                return _super.prototype.render.call(this);
            };
            return Enhancer;
        }(WrappedComponent));
        exports.setDisplayName(WrappedComponent.name + "_logger", Enhancer);
        return Enhancer;
    };
}
//# sourceMappingURL=hocs.js.map