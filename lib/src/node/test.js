"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
exports.expectEmptyObject = function (testValue) {
    chai_1.expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    chai_1.expect(testValue).to.be.an('object');
    chai_1.expect(testValue).to.not.be.null;
    chai_1.expect(testValue).to.not.be.undefined;
};
/**
 * Function exists if this runs without throwing.
 * @param {Function} func - Function to test
 * @param {string} name? - Name of function {OPTIONAL}
 */
exports.expectFuncExists = function (func, name, extraMsg) {
    it("has function " + (name ? name : func.name) + (extraMsg ? ' ' + extraMsg : ''), function () {
        chai_1.expect(func).to.exist;
        chai_1.expect(func).to.be.a('function');
    });
};
exports.expectFunctionExists = exports.expectFuncExists;
//# sourceMappingURL=test.js.map