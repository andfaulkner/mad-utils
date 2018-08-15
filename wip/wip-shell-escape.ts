//
// PARTIALLY DONE STRING TEMPLATE THAT RUNS A STRING AS AN ESCAPED SHELL COMMAND
//
//
// See: https://github.com/TehShrike/shell-tag/blob/master/index.js
// And: https://github.com/chocolateboy/shell-escape-tag/blob/master/src/shell-escape-tag.js

import {flatten} from './array';
import shellEscape from 'any-shell-escape';

// See http://johnnyreina.com/programming/functional/2017/09/19/intro-zip.html
const zip = (arr1: any[], arr2: any[], zipper: Function) =>
    zipper
        ? arr1.map((val, idx) => zipper(val, arr2[idx]))
        : arr1.map((val, idx) => [val, arr2[idx]]);

/*
 * The (recursive) guts of _shellEscape
 * Returns a leaf node {string} or a possibly-empty array of arrays/leaf nodes
 * Prunes null & undefined by returning empty arrays
 */
const __shellEscape = (args, opts) => {
    if (Array.isArray(args)) {
        return args.map(arg => __shellEscape(arg, opts));
    } else if (args == null) {
        return [];
    } else {
        return opts.verbatim ? String(args) : shellEscape(String(args));
    }
};

/**
 * Performs the following mappings on the supplied value(s):
 *
 * - already-escaped/preserved values are passed through verbatim
 * - null & undefined are ignored (i.e. mapped to empty arrays,
 *   which are pruned by flatten)
 * - non-strings are stringified e.g. false -> `false`
 *
 * It then flattens the resulting array & returns its elements joined by a space
 */
const _shellEscape = (args, opts = {}) => flatten([__shellEscape(args, opts)]).join(` `);

/**
 * Escapes embedded string/array template parameters and passes through
 * already escaped/preserved parameters verbatim
 */
export const shellRun = function(strs, ...args) {
    let outStr = ``;
    for (const [str, arg] of zip(strs, args)) {
        outStr += `${str}${_shellEscape(arg)}`;
    }
    return outStr;
};
