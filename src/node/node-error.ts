/**************************************************************************************************
*
*       @file ./node-error.ts
*
*       Error handling methods that can only be safely used in Node.
*
*/

import { isSilly, isInfo } from 'env-var-helpers';

/**
 * In node, remove pointless stacktrace items (node core) and modify the
 * stacktrace length to be unlimited.
 */
export const globalActivateCleanStack = () => {
    Error.stackTraceLimit = Infinity;
    if (!isSilly) require('clarify');
};
