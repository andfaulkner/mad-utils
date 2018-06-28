"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Regex & lib filtering utils
var stackNoiseLibsRegex = /\/node_modules(?=\/).*(\/react\/|\/mocha\/|\/ts\-node\/)/g;
var nodeStackNoiseRegex = / \(timers\.js:[0-9]/g;
var stackFilterNode = new RegExp('[lL]oad \\(module\\.js:[0-9]', '');
var alphaNumSet = "[a-zA-Z0-9_]+";
var defLibsToExclude = ['express', 'body-parser', 'cookie-parser'];
/**
 * Remove unneeded statements from given stack trace: calls to Node core & common
 * third-party libs. Replaces error statement with an info label. Optionally IDs
 * the function requesting the stack.
 * @param {string} stack Stacktrace in string form
 * @param {string} srcFn Name of source function stacktrace originated from
 */
function scrubStackTrace(stack, srcFn) {
    // Create label IDing the cleaned stack, including (optionally) IDing the requesting function.
    var stackLabel = "  Stack (minus vendor & core) up to " + (srcFn ? srcFn + ' ' : '') + "call:";
    // Replace 'Error' statement with stack label.
    return (stack
        .split(/^Error(?=\n)/)
        .join(stackLabel)
        // Filter useless stack info
        .split(/\n    at /g)
        // Exclude stacktrace references to mocha, react, and ts-node.
        .filter(function (line) { return !line.match(stackNoiseLibsRegex); })
        // Exclude stacktrace references to NodeJS' internal timers.js module.
        .filter(function (line) { return !line.match(nodeStackNoiseRegex); })
        .join('\n   |-> '));
}
exports.scrubStackTrace = scrubStackTrace;
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
        var cleanLibName = lib.replace('-', '-');
        if (idx !== libsToRm.length - 1) {
            acc += "(" + cleanLibName + ")|";
        }
        else {
            acc += "(" + cleanLibName + "))";
        }
        return acc;
    }, "(");
    // Filtering regexes
    var stackFilterLibs = new RegExp("node_modules/" + filterLibStr + "/lib", '');
    // Filter the stack, rejoin into string, & return result
    return stack
        .split('\n')
        .filter(function (stackEl) { return !stackFilterLibs.exec(stackEl); })
        .filter(function (stackEl) { return !stackFilterNode.exec(stackEl); })
        .join('\n');
}
exports.removeFromStack = removeFromStack;
function getFirstStackItem(stackOrError) {
    return (typeof stackOrError === 'string')
        ? stackOrError.split('\n    at ')[0]
        : stackOrError.stack.split('\n    at ')[0];
}
exports.getFirstStackItem = getFirstStackItem;
function getSecondStackItem(stackOrError) {
    return (typeof stackOrError === 'string')
        ? stackOrError.split('\n    at ')[1]
        : stackOrError.stack.split('\n    at ')[1];
}
exports.getSecondStackItem = getSecondStackItem;
function getThirdStackItem(stackOrError) {
    return (typeof stackOrError === 'string')
        ? stackOrError.split('\n    at ')[2]
        : stackOrError.stack.split('\n    at ')[2];
}
exports.getThirdStackItem = getThirdStackItem;
//# sourceMappingURL=error.js.map