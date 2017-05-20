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
//# sourceMappingURL=error.js.map