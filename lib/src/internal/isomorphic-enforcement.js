"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** HELPERS *********************************************/
/**
 * Output warning if function can't run in Node.
 */
exports.browserOnly = function (fnName) {
    console.warn("*** " + fnName + " not usable in node - browser only ***");
};
//# sourceMappingURL=isomorphic-enforcement.js.map