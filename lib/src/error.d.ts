/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 */
export declare function scrubStackTrace(stack: string, srcFn?: string): string;
export declare type DecoratorErrorProps = {
    message: string;
    messageCause: string;
    decoratorName: string;
    wrappedItem?: any;
};
export interface DecoratorError {
    new (cause: string, decoratorName: string, wrappedItem?: any): DecoratorErrorProps;
}
/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
export declare const DecoratorError: DecoratorError;
export declare namespace StackUtils {
    /**
     * Remove all stack trace items containing references to any of the given libraries.
     * Must be passed an actual stack for this to work.
     * @param {string} stack The stacktrace itself
     * @param {Array<string>} libsToRm Exclude all stacktrace items coming from any of these libs
     * @return {string} Stacktrace with all items that reference any lib in libsToRm removed
     */
    function removeFromStack(stack: string, libsToRm?: Array<string>): string;
    /**
     * Split the stack trace, get the first item (aka the most recent item)
     */
    function getFirstStackItem(stack: string): any;
    function getFirstStackItem<T extends Error>(error: T): any;
    /**
     * Split the stack trace, get the 2nd item (aka the 2nd most recent item).
     */
    function getSecondStackItem(stack: string): any;
    function getSecondStackItem<T extends Error>(error: T): any;
    /**
     * Split the stack trace, get the 3rd item (aka the 3rd most recent item).
     */
    function getThirdStackItem(stack: string): any;
    function getThirdStackItem<T extends Error>(error: T): any;
}
