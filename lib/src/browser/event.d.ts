export declare type EventFunction = (ev: MouseEvent) => void;
/**************************************** EXPORT FUNCTIONS ****************************************/
export declare const mouseEventFactory: ((globalTarget?: any) => MouseEvent);
export declare const removeClickEventFromId: ((id?: string, event?) => (ev?: MouseEvent) => void);
export declare const addClickEventToId: ((id: string, cb: EventFunction) => void);
