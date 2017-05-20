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
