import { ClassConstructor, SingletonInterface, singleton } from './types-iso';

const stackNoiseLibsRegex = /\/node_modules(?=\/).*(\/react\/|\/mocha\/|\/ts\-node\/)/g;
const nodeStackNoiseRegex = / \(timers\.js:[0-9]/g;

/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 */
export function scrubStackTrace(stack: string, srcFn?: string) {
    // Create label IDing the cleaned stack, including (optionally) IDing the requesting function.
    const stackLabel = `  Stack (minus vendor & core) up to ${srcFn ? srcFn + ' ' : ''}call:`;
    // Replace 'Error' statement with stack label.
    return stack
        .split(/^Error(?=\n)/).join(stackLabel)
        // Filter useless stack info
        .split(/\n    at /g)
        // Exclude stacktrace references to mocha, react, and ts-node.
        .filter(line => !line.match(stackNoiseLibsRegex))
        // Exclude stacktrace references to NodeJS' internal timers.js module.
        .filter(line => !line.match(nodeStackNoiseRegex))
        .join('\n   |-> ')
}

export type DecoratorErrorProps = {
    message: string,
    messageCause: string,
    decoratorName: string,
    wrappedItem?: any,
};

export interface DecoratorError {
    new(cause: string, decoratorName: string, wrappedItem?: any): DecoratorErrorProps;
}

/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
export const DecoratorError = (() => {
    function DecoratorError(cause: string, decoratorName: string, wrappedItem?: any): void {
        Error.captureStackTrace(this);
        this.messageCause = this.message = cause;
        this.name = `DecoratorError`;
        this.decoratorName = decoratorName;
        this.wrappedItem = wrappedItem;
        console.log('this.stack:', this.stack);
        console.error(`ERROR :: Invalid usage of decorator ${decoratorName}. ` +
                      (wrappedItem ? `Attempted to apply to ${wrappedItem}. ` : ``) +
                      `Error cause: ${cause}`);
        return this;
    }

    DecoratorError.prototype = Object.create(Error.prototype);
    return ((DecoratorError as any) as DecoratorError);
})();

// Regex utils
const alphaNumSet = `[a-zA-Z0-9_]+`;

const defLibsToExclude = ['express', 'body-parser', 'cookie-parser'];

/**
 * Remove all stack trace items containing references to any of the given libraries.
 * Must be passed an actual stack for this to work.
 * @param {string} stack The stacktrace itself
 * @param {Array<string>} libsToRm Exclude all stacktrace items coming from any of these libs
 * @return {string} Stacktrace with all items that reference any lib in libsToRm removed
 */
export function removeFromStack(stack: string, libsToRm: Array<string> = defLibsToExclude): string {
    // Partial regex for excluding all libraries in libsToRm. Inject into full regex.
    const filterLibStr = libsToRm.reduce((acc, lib, idx) => {
        const cleanLibName = lib.replace('-', '\-');
        if (idx !== (libsToRm.length - 1)) {
            acc += `(${cleanLibName})|`
        } else {
            acc += `(${cleanLibName}))`
        }
        return acc;
    }, `(`);

    // Filtering regexes
    const stackFilterLibs = new RegExp(`node_modules\/${filterLibStr}\/lib`, '');
    const stackFilterNode = new RegExp('[lL]oad \\(module\\.js:[0-9]', '');

    // Filter the stack
    const cleanStack = stack
        .split('\n')
        .filter((stackEl, idx, arr) => !(stackFilterLibs.exec(stackEl)))
        .filter((stackEl, idx, arr) => !(stackFilterNode.exec(stackEl)))
        .join('\n');

    return cleanStack;
}

/**
 * Split the stack trace, get the first item (aka the most recent item)
 */
export function getFirstStackItem(stack: string);
export function getFirstStackItem<T extends Error>(error: T);
export function getFirstStackItem<T extends Error>(stackOrError: string | T) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[0];
    }
    return stackOrError.stack.split('\n    at ')[0];
}

/**
 * Split the stack trace, get the 2nd item (aka the 2nd most recent item).
 */
export function getSecondStackItem(stack: string);
export function getSecondStackItem<T extends Error>(error: T);
export function getSecondStackItem<T extends Error>(stackOrError: string | T) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[1];
    }
    return stackOrError.stack.split('\n    at ')[1];
}

/**
 * Split the stack trace, get the 3rd item (aka the 3rd most recent item).
 */
export function getThirdStackItem(stack: string);
export function getThirdStackItem<T extends Error>(error: T);
export function getThirdStackItem<T extends Error>(stackOrError: string | T) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[2];
    }
    return stackOrError.stack.split('\n    at ')[2];
}


//
//  StackUtils sub-module
//

export const StackUtils = (() => {
    return {
        removeFromStack,
        getFirstStackItem,
        getSecondStackItem,
        getThirdStackItem
    }
})();
