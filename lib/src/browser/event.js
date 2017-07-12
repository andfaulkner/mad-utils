"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("./dom");
/******************************************** IMPORTS *********************************************/
var isNode = require("detect-node");
/**************************************** PROJECT IMPORTS *****************************************/
var fnName = 'mad-utils::event';
var isomorphic_enforcement_1 = require("../internal/isomorphic-enforcement");
/**************************************** DEFAULTS, CONFIG ****************************************/
// TODO probably remove this
// Default global
var global = (isNode)
    ? global
    : ((typeof window !== 'undefined')
        ? window
        : global);
/**************************************** EXPORT FUNCTIONS ****************************************/
/**
 * Construct a new click event. Can optionally pass in a global object.
 * Generic event remover. Only works in browser unless allowInNode set.
 * @return {MouseEvent} Browser: newly constructed MouseEvent object. Node: null.
 * @param {boolean} allowInNode - If set to true, let this run in Node anyway. Defaults to false.
 */
exports.mouseEventFactory = 
// Adjust behaviour based on whether this is running in Node or browser.
isNode
    ? function (globalTarget) {
        if (globalTarget === void 0) { globalTarget = global; }
        isomorphic_enforcement_1.browserOnly('mouseEventFactory');
        return null;
    }
    : function (globalTarget) {
        if (globalTarget === void 0) { globalTarget = window; }
        return new MouseEvent('click', {
            'view': globalTarget,
            'bubbles': true,
            'cancelable': true
        });
    };
/**
 * Generic event remover.
 * In Node: returns null and emits warning that this can only works in the browser.
 * In browser: return function w signature:
 *     (ev?: MouseEvent) => void
 *     Running it removes matching MouseEvent from the element passed to the parent.
 *     Reason: The outputted function can be assigned as a clicked handler (e.g., in React).
 */
exports.removeClickEventFromId = isNode
    ? function (id, event) {
        if (id === void 0) { id = ''; }
        if (event === void 0) { event = null; }
        isomorphic_enforcement_1.browserOnly('removeClickEventFromId');
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
        isomorphic_enforcement_1.browserOnly('addClickEventToId');
        return null;
    }
    : function (id, cb) {
        dom_1.$(id).addEventListener('click', cb, false);
    };
//# sourceMappingURL=event.js.map