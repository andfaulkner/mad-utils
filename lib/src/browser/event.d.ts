/// <reference path="../../../node_modules/typescript/lib/lib.dom.d.ts" />
export declare type EventFunction = (ev: MouseEvent) => void;
/**************************************** EXPORT FUNCTIONS ****************************************/
/**
 * Construct a new click event. Can optionally pass in a global object.
 * Generic event remover. Only works in browser unless allowInNode set.
 * @return {MouseEvent} Browser: newly constructed MouseEvent object. Node: null.
 * @param {boolean} allowInNode - If set to true, let this run in Node anyway. Defaults to false.
 */
export declare const mouseEventFactory: ((globalTarget?: any) => MouseEvent);
/**
 * Generic event remover.
 * In Node: returns null and emits warning that this can only works in the browser.
 * In browser: return function w signature:
 *     (ev?: MouseEvent) => void
 *     Running it removes matching MouseEvent from the element passed to the parent.
 *     Reason: The outputted function can be assigned as a clicked handler (e.g., in React).
 */
export declare const removeClickEventFromId: ((id?: string, event?: any) => (ev?: MouseEvent) => void);
export declare const addClickEventToId: ((id: string, cb: EventFunction) => void);
