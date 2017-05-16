"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("./dom");
/******************************************** IMPORTS *********************************************/
var isNode = require("detect-node");
/******************************************** LOGGING *********************************************/
var mad_logs_1 = require("mad-logs");
var log = mad_logs_1.logFactory()("event.ts", mad_logs_1.logMarkers.brainwave);
/**************************************** DEFAULTS, CONFIG ****************************************/
// Default global
var global = (isNode)
    ? global
    : ((typeof window !== 'undefined')
        ? window
        : global);
/******************************************** HELPERS *********************************************/
/**
 * Output warning if function can't run in Node.
 */
var browserOnly = function (fnName) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    log.verbose("{$fnName} not usable in node - browser only");
}; };
/**************************************** EXPORT FUNCTIONS ****************************************/
// Construct a new click event
exports.mouseEventFactory = (isNode)
    ? function (globalTarget) {
        if (globalTarget === void 0) { globalTarget = global; }
        browserOnly('mouseEventFactory');
        return null;
    }
    : function (globalTarget) {
        if (globalTarget === void 0) { globalTarget = global; }
        // Triggerable built-in event.
        return new MouseEvent('click', { 'view': globalTarget, 'bubbles': true, 'cancelable': true });
    };
// Generic event remover
exports.removeClickEventFromId = (isNode)
    ? function (id, event) {
        if (id === void 0) { id = ''; }
        if (event === void 0) { event = null; }
        browserOnly('removeClickEventFromId');
        return null;
    }
    : function (id, event) { return function (ev) {
        dom_1.$(id).removeEventListener('click', event);
    }; };
// Generic event adder: addEventToId('id-event-2', function(ev: MouseEvent) { alert('doThing') });
exports.addClickEventToId = (isNode)
    ? function (id, event) {
        if (id === void 0) { id = ''; }
        if (event === void 0) { event = null; }
        browserOnly('addClickEventToId');
        return null;
    }
    : function (id, cb) {
        dom_1.$(id).addEventListener('click', cb, false);
    };
//# sourceMappingURL=event.js.map