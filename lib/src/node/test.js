"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object
 * @param {any} testValue Value to check for emptiness
 */
exports.expectEmptyObject = function (testValue) {
    chai_1.expect(Object.keys(testValue)).to.be.empty;
    chai_1.expect(testValue).to.be.an('object');
    chai_1.expect(testValue).to.not.be.null;
    chai_1.expect(testValue).to.not.be.undefined;
};
/**
 * Create mocha unit test to ensure this function exists (success if this runs without throw)
 * Use given function name in test output
 * Display extraMsg after the rest of the test description
 *
 * @param {Function} func Function to test
 * @param {string} name? Name of function {OPTIONAL}
 */
exports.expectFuncExists = function (func, name, extraMsg) {
    it("has function " + (name ? name : func.name) + (extraMsg ? ' ' + extraMsg : ''), function () {
        chai_1.expect(func).to.exist;
        chai_1.expect(func).to.be.a('function');
    });
};
exports.expectFunctionExists = exports.expectFuncExists;
/**
 * Object exists and is not empty if this runs without throwing
 *
 * @param {Object} nonEmptyObj Object to test
 * @param {string} name? Name of function {OPTIONAL}
 */
exports.expectNonEmptyObjectExists = function (nonEmptyObj, name, extraMsg) {
    it(name + " exists and is not empty" + (extraMsg ? '. ' + extraMsg : ''), function () {
        chai_1.expect(nonEmptyObj).to.exist;
        chai_1.expect(nonEmptyObj).to.be.an('object');
        chai_1.expect(nonEmptyObj).to.not.be.null;
        chai_1.expect(nonEmptyObj).to.not.be.undefined;
        chai_1.expect(nonEmptyObj).to.not.eql({});
        chai_1.expect(nonEmptyObj).to.not.eql([]);
    });
};
//# sourceMappingURL=test.js.map