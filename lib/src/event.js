"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNode = require("detect-node");
// default global
var global = (isNode) ? global
    : ((typeof window !== 'undefined')
        ? window
        : global);
// Construct a new click event
exports.mouseEventFactory = (globalTarget = global) => new MouseEvent('click', { 'view': globalTarget, 'bubbles': true, 'cancelable': true });
//# sourceMappingURL=event.js.map