import { $ } from './dom';

/******************************************** IMPORTS *********************************************/
import * as isNode from 'detect-node';
import { isMocha, isVerbose } from 'env-var-helpers';

/**************************************** PROJECT IMPORTS *****************************************/
const fnName = 'mad-utils::event';
import { browserOnly } from '../isomorphic-enforcement';

/**************************************** DEFAULTS, CONFIG ****************************************/
// Default global
var global = (isNode)
    ? global
    : ((typeof (window as any) !== 'undefined')
        ? (window as Window)
        : global);

//*************************************** TYPE DEFINITIONS ****************************************/
export type EventFunction = (ev: MouseEvent) => void;


/**************************************** EXPORT FUNCTIONS ****************************************/
// Construct a new click event
export const mouseEventFactory: ((globalTarget?: any) => MouseEvent) = (isNode)
    ? (globalTarget = global): MouseEvent => {
        browserOnly('mouseEventFactory');
        return null;
    }
    : (globalTarget = global): MouseEvent =>
          // Triggerable built-in event.
          new MouseEvent('click', { 'view': globalTarget, 'bubbles': true, 'cancelable': true });

// Generic event remover
export const removeClickEventFromId: ((id?: string, event?) => (ev?: MouseEvent) => void) = (isNode)
    ? (id: string = '', event = null) => {
        browserOnly('removeClickEventFromId')
        return null;
    }
    : (id: string, event) => (ev: MouseEvent) => {
        $(id).removeEventListener('click', event);
    };

// Generic event adder: addEventToId('id-event-2', function(ev: MouseEvent) { alert('doThing') });
export const addClickEventToId: ((id: string, cb: EventFunction) => void) = (isNode)
    ? (id: string = '', event = null) => {
        browserOnly('addClickEventToId')
        return null;
    }
    : (id: string, cb: EventFunction) => {
          $(id).addEventListener('click', cb, false);
    }
