"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var validationModule = require("../../src/validation");
/********************************************* TESTS **********************************************/
describe("validation sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.validation, 'validation (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.validation, 'validation (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.validation, 'validation (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.validation, 'validation (from Browser export)');
    describe("validation.isValidString:", function () {
        test_1.expectFunctionExists(shared_1.isValidString);
        it("should not throw if given a valid string", function () {
            chai_1.expect(isValidStringTestConditions('okok')).to.be.true;
            chai_1.expect(isValidStringTestConditions('ooo')).to.be.true;
            chai_1.expect(isValidStringTestConditions('oooooooooo')).to.be.true;
        });
        it("should return false if given a string missing a required value", function () {
            chai_1.expect(isValidStringTestConditions('asdfasdf'), "At least one 'o' is required").to.be
                .false;
        });
        it("should return false if given a string that's too short", function () {
            chai_1.expect(isValidStringTestConditions('o'), "String is too short").to.be.false;
        });
        it("should return false if given a string that's too long", function () {
            chai_1.expect(isValidStringTestConditions('giorshgiuehgega'), "String is too long").to.be
                .false;
        });
        it("should return false if given a string with a disallowed match", function () {
            chai_1.expect(isValidStringTestConditions(' oofewof '), "No whitespace allowed").to.be.false;
        });
        it("should return false if given a non-matching confirmation string", function () {
            chai_1.expect(isValidStringTestConditions('str_ok', 'non_match')).to.be.false;
        });
        it("should return true if given a matching confirmation string", function () {
            chai_1.expect(isValidStringTestConditions('str_ok', 'str_ok')).to.be.true;
        });
    });
});
var errDisplayCb = function (err) { return console.log(err); };
/**
 * Lets us easily run various tests on the various conditions in isValidString validation function.
 */
function isValidStringTestConditions(testStr, confirmStr) {
    var extraVal = typeof confirmStr === 'string'
        ? [{ type: 'match_confirmation', errMsg: "text.doesnt_match_confirm_str" }]
        : [];
    var conditions = extraVal.concat([
        { type: 'match', matcher: /o/g, errMsg: "text.input_doesnt_match" },
        { type: 'no_match', matcher: / /g, errMsg: "text.no_whitespace" },
        { type: 'max', matcher: 10, errMsg: "text.input_too_long" },
        { type: 'min', matcher: 3, errMsg: "text.input_too_short" },
    ]);
    return shared_1.isValidString({ testStr: testStr, confirmStr: confirmStr, conditions: conditions, errDisplayCb: errDisplayCb });
}
//# sourceMappingURL=validation.spec.js.map