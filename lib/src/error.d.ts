/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 * @param {string} stack Stacktrace in string form
 * @param {string} srcFn Name of source function stacktrace originated from
 */
export declare function scrubStackTrace(stack: string, srcFn?: string): string;
/**
 * Remove all stack trace items containing references to any of the given libraries.
 * Must be passed an actual stack for this to work.
 * @param {string} stack The stacktrace itself
 * @param {Array<string>} libsToRm Exclude all stacktrace items coming from any of these libs
 * @return {string} Stacktrace with all items that reference any lib in libsToRm removed
 */
export declare function removeFromStack(stack: string, libsToRm?: Array<string>): string;
/**
 * Split the stack trace, get the first item (aka the most recent item)
 */
export declare function getFirstStackItem(stack: string): string;
export declare function getFirstStackItem<T extends Error>(error: T): string;
/**
 * Split the stack trace, get the 2nd item (aka the 2nd most recent item).
 */
export declare function getSecondStackItem(stack: string): string;
export declare function getSecondStackItem<T extends Error>(error: T): string;
/**
 * Split the stack trace, get the 3rd item (aka the 3rd most recent item).
 */
export declare function getThirdStackItem(stack: string): string;
export declare function getThirdStackItem<T extends Error>(error: T): string;
