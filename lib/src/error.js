"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stackNoiseLibsRegex = /\/node_modules(?=\/).*(\/react\/|\/mocha\/|\/ts\-node\/)/g;
var nodeStackNoiseRegex = / \(timers\.js:[0-9]/g;
/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 */
function scrubStackTrace(stack, srcFn) {
    // Create label IDing the cleaned stack, including (optionally) IDing the requesting function.
    var stackLabel = "  Stack (minus vendor & core) up to " + (srcFn ? srcFn + ' ' : '') + "call:";
    // Replace 'Error' statement with stack label.
    return stack
        .split(/^Error(?=\n)/).join(stackLabel)
        .split(/\n    at /g)
        .filter(function (line) { return !line.match(stackNoiseLibsRegex); })
        .filter(function (line) { return !line.match(nodeStackNoiseRegex); })
        .join('\n   |-> ');
}
exports.scrubStackTrace = scrubStackTrace;
/**
 * Throw when a decorator is improperly used. Should only be declared in a decorator function.
 */
exports.DecoratorError = (function () {
    function DecoratorError(cause, decoratorName, wrappedItem) {
        Error.captureStackTrace(this);
        this.messageCause = this.message = cause;
        this.name = "DecoratorError";
        this.decoratorName = decoratorName;
        this.wrappedItem = wrappedItem;
        console.log('this.stack:', this.stack);
        console.error("ERROR :: Invalid usage of decorator " + decoratorName + ". " +
            (wrappedItem ? "Attempted to apply to " + wrappedItem + ". " : "") +
            ("Error cause: " + cause));
        return this;
    }
    DecoratorError.prototype = Object.create(Error.prototype);
    return DecoratorError;
})();
// Regex utils
var alphaNumSet = "[a-zA-Z0-9_]+";
var defLibsToExclude = ['express', 'body-parser', 'cookie-parser'];
/**
 * Remove all stack trace items containing references to any of the given libraries.
 * Must be passed an actual stack for this to work.
 * @param {string} stack The stacktrace itself
 * @param {Array<string>} libsToRm Exclude all stacktrace items coming from any of these libs
 * @return {string} Stacktrace with all items that reference any lib in libsToRm removed
 */
function removeFromStack(stack, libsToRm) {
    if (libsToRm === void 0) { libsToRm = defLibsToExclude; }
    // Partial regex for excluding all libraries in libsToRm. Inject into full regex.
    var filterLibStr = libsToRm.reduce(function (acc, lib, idx) {
        var cleanLibName = lib.replace('-', '\-');
        if (idx !== (libsToRm.length - 1)) {
            acc += "(" + cleanLibName + ")|";
        }
        else {
            acc += "(" + cleanLibName + "))";
        }
        return acc;
    }, "(");
    // Filtering regexes
    var stackFilterLibs = new RegExp("node_modules/" + filterLibStr + "/lib", '');
    var stackFilterNode = new RegExp('[lL]oad \\(module\\.js:[0-9]', '');
    // Filter the stack
    var cleanStack = stack
        .split('\n')
        .filter(function (stackEl, idx, arr) { return !(stackFilterLibs.exec(stackEl)); })
        .filter(function (stackEl, idx, arr) { return !(stackFilterNode.exec(stackEl)); })
        .join('\n');
    return cleanStack;
}
exports.removeFromStack = removeFromStack;
function getFirstStackItem(stackOrError) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[0];
    }
    return stackOrError.stack.split('\n    at ')[0];
}
exports.getFirstStackItem = getFirstStackItem;
function getSecondStackItem(stackOrError) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[1];
    }
    return stackOrError.stack.split('\n    at ')[1];
}
exports.getSecondStackItem = getSecondStackItem;
function getThirdStackItem(stackOrError) {
    if (typeof stackOrError === 'string') {
        return stackOrError.split('\n    at ')[2];
    }
    return stackOrError.stack.split('\n    at ')[2];
}
exports.getThirdStackItem = getThirdStackItem;
//
//  StackUtils sub-module
//
exports.StackUtils = (function () {
    return {
        removeFromStack: removeFromStack,
        getFirstStackItem: getFirstStackItem,
        getSecondStackItem: getSecondStackItem,
        getThirdStackItem: getThirdStackItem
    };
})();
//# sourceMappingURL=error.js.map