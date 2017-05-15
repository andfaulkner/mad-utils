import { $ } from './dom';

/******************************************** IMPORTS *********************************************/
import * as isNode from 'detect-node';


/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`event.ts`, logMarkers.brainwave);


/**************************************** DEFAULTS, CONFIG ****************************************/
// Default global
var global = (isNode)
    ? global
    : ((typeof (window as any) !== 'undefined')
        ? (window as Window)
        : global);


//*************************************** TYPE DEFINITIONS ****************************************/
type EventFunction = (ev: MouseEvent) => void;


/******************************************** HELPERS *********************************************/
/**
 * Output warning if function can't run in Node.
 */
const browserOnly = (fnName: string) => (...args): void => {
    log.verbose(`{$fnName} not usable in node - browser only`);
};


/**************************************** EXPORT FUNCTIONS ****************************************/
// Construct a new click event
export const mouseEventFactory = (isNode)
    ? browserOnly('mouseEventFactory')
    : (globalTarget = global) =>
          // Triggerable built-in event.
          new MouseEvent('click', { 'view': globalTarget, 'bubbles': true, 'cancelable': true });

// Generic event remover
export const removeClickEventFromId = (isNode)
    ? browserOnly('removeClickEventFromId')
    : (id: string, event) => (ev: MouseEvent) => {
        $(id).removeEventListener('click', event);
    };

// Generic event adder: addEventToId('id-event-2', function(ev: MouseEvent) { alert('doThing') });
export const addClickEventToId = (isNode)
    ? browserOnly('addClickEventToId')
    : (id: string, cb: EventFunction) => {
          $(id).addEventListener('click', cb, false);
    }
