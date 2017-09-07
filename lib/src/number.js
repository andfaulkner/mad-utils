"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
exports.isInt = types_iso_1.isInt;
exports.isInteger = types_iso_1.isInteger;
exports.isIntegerLike = types_iso_1.isIntegerLike;
exports.isNumberLike = types_iso_1.isNumberLike;
exports.isNumLike = types_iso_1.isNumLike;
var uuidImport = require("uuid");
/******************************************** EXPORTS *********************************************/
var uuidBase = function () { return uuidImport(); };
/** @return {string} Randomly generated sequence 6 characters long e.g. AB790517 */
exports.len6 = function () { return exports.len8().slice(0, -2); };
exports.genLen6ID = exports.len6;
exports.gen6CharID = exports.len6;
exports.genLen6Str = exports.len6;
exports.gen6CharStr = exports.len6;
exports.genLen8ID = exports.len6;
/** @return {string} Randomly generated sequence 8 characters long e.g. 0E8526 */
exports.len8 = function () { return uuidBase().split('-')[0]; };
exports.gen8CharID = exports.len8;
exports.genLen8Str = exports.len8;
exports.gen8CharStr = exports.len8;
/** @return {string} Generate a UUID without any dashes (e.g. 505BB6B57D684C2488DD1522B34CF539) */
exports.noDashes = function () { return uuidBase().split('-').join(''); };
/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
exports.uuid = Object.assign(uuidBase, { len6: exports.len6, len8: exports.len8, noDashes: exports.noDashes });
//# sourceMappingURL=number.js.map