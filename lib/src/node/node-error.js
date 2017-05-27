/**************************************************************************************************
*
*       @file ./node-error.ts
*
*       Error handling methods that can only be safely used in Node.
*
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_var_helpers_1 = require("env-var-helpers");
/**
 * In node, remove pointless stacktrace items (node core) and modify the
 * stacktrace length to be unlimited.
 */
exports.activateLogLevelSizedCleanStack = function () {
    Error.stackTraceLimit = Infinity;
    if (!env_var_helpers_1.isSilly)
        require('clarify');
};
//# sourceMappingURL=node-error.js.map