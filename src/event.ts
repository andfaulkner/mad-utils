import * as isNode from 'detect-node';

// default global
var global = (isNode) ? global
                      : ((typeof (window as any) !== 'undefined')
                          ? (window as Window)
                          : global);

// Construct a new click event
export const mouseEventFactory = (globalTarget = global) => new MouseEvent('click',
    { 'view': globalTarget, 'bubbles': true, 'cancelable': true }
);
