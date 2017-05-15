"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("./dom");
/******************************************** IMPORTS *********************************************/
const isNode = require("detect-node");
/******************************************** LOGGING *********************************************/
const mad_logs_1 = require("mad-logs");
const log = mad_logs_1.logFactory()(`event.ts`, mad_logs_1.logMarkers.brainwave);
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
const browserOnly = (fnName) => (...args) => {
    log.verbose(`{$fnName} not usable in node - browser only`);
};
/**************************************** EXPORT FUNCTIONS ****************************************/
// Construct a new click event
exports.mouseEventFactory = (isNode)
    ? (globalTarget = global) => {
        browserOnly('mouseEventFactory');
        return null;
    }
    : (globalTarget = global) => 
    // Triggerable built-in event.
    new MouseEvent('click', { 'view': globalTarget, 'bubbles': true, 'cancelable': true });
// Generic event remover
exports.removeClickEventFromId = (isNode)
    ? (id = '', event = null) => {
        browserOnly('removeClickEventFromId');
        return null;
    }
    : (id, event) => (ev) => {
        dom_1.$(id).removeEventListener('click', event);
    };
// Generic event adder: addEventToId('id-event-2', function(ev: MouseEvent) { alert('doThing') });
exports.addClickEventToId = (isNode)
    ? (id = '', event = null) => {
        browserOnly('addClickEventToId');
        return null;
    }
    : (id, cb) => {
        dom_1.$(id).addEventListener('click', cb, false);
    };
//# sourceMappingURL=event.js.map