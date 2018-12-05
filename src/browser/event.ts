/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />

// Ensure window object exists & is accessible
var window = window || {}; // tslint:disable-line:no-var-keyword

/******************************************** IMPORTS *********************************************/
import isNode from 'detect-node';
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
