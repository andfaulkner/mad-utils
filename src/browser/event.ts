/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />

// Ensure window object exists & is accessible
var window = window || {}; // tslint:disable-line:no-var-keyword

/******************************************** IMPORTS *********************************************/
import * as isNode from 'detect-node';
import { isMocha, isVerbose } from 'env-var-helpers';

/**************************************** PROJECT IMPORTS *****************************************/
const fnName = 'mad-utils::event';
import { browserOnly } from '../internal/isomorphic-enforcement';

/**************************************** DEFAULTS, CONFIG ****************************************/
// TODO probably remove this
// Default global
var global = (isNode)
    ? global
    : ((typeof (window as any) !== 'undefined')
        ? (window as Window)
        : global);

//*************************************** TYPE DEFINITIONS ****************************************/
export type EventFunction = (ev: MouseEvent) => void;


/**************************************** EXPORT FUNCTIONS ****************************************/
/**
 * Construct a new click event. Can optionally pass in a global object.
 * Generic event remover. Only works in browser unless allowInNode set.
 * @return {MouseEvent} Browser: newly constructed MouseEvent object. Node: null.
 * @param {boolean} allowInNode - If set to true, let this run in Node anyway. Defaults to false.
 */
export const mouseEventFactory: ((globalTarget?: any) => MouseEvent) =
    // Adjust behaviour based on whether this is running in Node or browser.
    isNode
        // Return null and show a warning if run in Node.
        ? (globalTarget = global): MouseEvent => {
            browserOnly('mouseEventFactory');
            return null;
        }
        // Return triggerable built-in event if run in browser.
        : (globalTarget = window): MouseEvent =>
              new MouseEvent('click', {
                  'view': globalTarget,
                  'bubbles': true,
                  'cancelable': true
              })

/**
 * Generic event remover.
 * In Node: returns null and emits warning that this can only works in the browser.
 * In browser: return function w signature:
 *     (ev?: MouseEvent) => void
 *     Running it removes matching MouseEvent from the element passed to the parent.
 *     Reason: The outputted function can be assigned as a clicked handler (e.g., in React).
 */
export const removeClickEventFromId: ((id?: string, event?) => (ev?: MouseEvent) => void) =
    isNode
        ? (id: string = '', event = null) => {
            browserOnly('removeClickEventFromId')
            return null;
        }
        : (id: string, event) => (ev: MouseEvent) => {
            document.getElementById
            && document.getElementById(id).removeEventListener('click', event);
        };

// Generic event adder: addEventToId('id-event-2', function(ev: MouseEvent) { alert('doThing') });
export const addClickEventToId: ((id: string, cb: EventFunction) => void) =
    isNode
        ? (id: string = '', event = null) => {
            browserOnly('addClickEventToId')
            return null;
        }
        : (id: string, cb: EventFunction) => {
            document.getElementById
            && document.getElementById(id).addEventListener('click', cb, false);
        };
