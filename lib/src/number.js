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
/********************************************* RANDOM *********************************************/
/**
 * Randomly get HEADS or TAILS. 50-50 chance of either.
 * @return {'HEADS'|'TAILS'} 'HEADS' or 'TAILS' - at random.
 */
exports.coinFlip = function () { return (Math.random() < 0.5) ? 'HEADS' : 'TAILS'; };
/**
 * Randomly get a number from 1 to 6.
 * @return {number} 1, 2, 3, 4, 5, or 6 - at random.
 */
exports.diceRoll6Sided = function () {
    var num = Math.random();
    if (num <= (0.16666666666666666))
        return 1;
    if (num <= (0.33333333333333333))
        return 2;
    if (num <= (0.5))
        return 3;
    if (num <= (0.66666666666666666))
        return 4;
    if (num <= (0.83333333333333333))
        return 5;
    return 6;
};
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
/**
 * Create range between given numbers, with the provided interval.
 * @param {number} start Number to start at.
 * @param {number} end   Number to end at.
 * @param {number} increment Amount to increase by with each subsequent number. {DEF: 1} {OPT}
 * @return {Array<number>} Array containing all numbers in the interval.
 */
exports.createRangeArray = function (start, end, increment) {
    if (start === void 0) { start = 0; }
    if (increment === void 0) { increment = 1; }
    var arr = [];
    for (var i = start; i <= end; i += increment)
        arr.push(i);
    return arr;
};
//# sourceMappingURL=number.js.map