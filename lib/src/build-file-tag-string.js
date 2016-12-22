"use strict";
var padEnd = require('string.prototype.padend');
var isFunction = require('lodash.isfunction');
const validateBuildFileTagStringInput = (filename, colourizer, rpadSize) => {
    const colourizerTypeError = '[mad-logs] 2nd arg to buildFileTagString must be a function ' +
        'from the "colors" module, or be excluded';
    const filenameTypeError = '[mad-logs] 1st arg to buildFileTagString must be a string';
    if (typeof filename !== 'string') {
        console.error(filenameTypeError);
        throw new TypeError(filenameTypeError);
    }
    if (colourizer && !isFunction(colourizer) && !colourizer._styles) {
        console.error(colourizerTypeError);
        throw new TypeError(colourizerTypeError);
    }
    if (colourizer && isFunction(colourizer) && !colourizer._styles) {
        console.error(colourizerTypeError);
        throw new TypeError(colourizerTypeError);
    }
};
/**
 * Build and return tag string for prepending to log outputs. Intended to ID the file from
 * which a log originated, and make it easy to see in the CLI output without close inspection.
 * Ensures consistency between generated tags (especially in terms of padding)
 *
 * @param  {string} fileName - name of originating file
 * @param  {function} colourizer - chain of composed colors.js functions, set up to apply all
 *                                 styles in the chain to any string it's passed to
 * @param {number} rpadSize - amount to pad tag with, on the right side
 * @return {string} styled output string
 */
exports.buildFileTagString = (filename, colourizer, rpadSize = 20) => {
    validateBuildFileTagStringInput(filename, colourizer, rpadSize);
    // colourize the filename, if a colourizer function is present
    const colouredFilename = (colourizer)
        ? colourizer(filename)
        : filename;
    // get width of the colour encoding info
    let colourWidth = (colourizer)
        ? colouredFilename.length - filename.length
        : 0;
    let TAG = padEnd(`${colouredFilename}`, rpadSize + colourWidth, ' ');
    return TAG;
};
//# sourceMappingURL=build-file-tag-string.js.map