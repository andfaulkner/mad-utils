/**************************************************************************************************
*
*       @file ./node-error.ts
*
*       Error handling methods that can only be safely used in Node.
*
*/
/**
 * In node, remove pointless stacktrace items (node core) and modify the
 * stacktrace length to be unlimited.
 */
export declare const globalActivateCleanStack: () => void;
