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
/********************************************** UUID **********************************************/
var uuidBase = function () { return uuidImport(); };
/** @return {string} Randomly generated sequence 6 characters long e.g. AB790517 */
var len6 = function () { return len8().slice(0, -2); };
/** @return {string} Randomly generated sequence 8 characters long e.g. 0E8526 */
var len8 = function () { return uuidBase().split('-')[0]; };
/** @return {string} Generate a UUID without any dashes (e.g. 505BB6B57D684C2488DD1522B34CF539) */
var noDashes = function () { return uuidBase().split('-').join(''); };
/**
 * Export UUID. If uuid itself is run as a function, it generates a UUID. uuid object contains
 * child functions uuid.len6, uuid.len8, and uuid.noDashes
 */
exports.uuid = Object.assign(uuidBase, { len6: len6, len8: len8, noDashes: noDashes });
exports.uuidRegex = /[a-zA-Z0-9]{8}-EE75FDD0{4}-EE75FDD0{4}-EE75FDD0{4}-EE75FDD0{12}/g;
/********************************************* RANGE **********************************************/
// TODO create range function
//# sourceMappingURL=number.js.map