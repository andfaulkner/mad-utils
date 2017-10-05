"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
var shared_1 = require("../../shared");
/********************************************* TESTS **********************************************/
describe("Generic data tests", function () {
    describe("Canadian provinces", function () {
        test_1.expectNonEmptyObjectExists(shared_1.canadianProvinces, 'Canadian provinces object exists');
        test_1.expectNonEmptyObjectExists(shared_1.canadianProvincesOrNone, 'Canadian provinces object with none included exists');
        it("canadianProvinces is deep frozen", function () {
            chai_1.expect(shared_1.canadianProvinces).to.be.frozen;
        });
        it("canadianProvincesOrNone is deep frozen", function () {
            chai_1.expect(shared_1.canadianProvincesOrNone).to.be.frozen;
        });
    });
    describe("Sex/Gender", function () {
        test_1.expectNonEmptyObjectExists(shared_1.sexes, 'Basic sexes object exists');
        test_1.expectNonEmptyObjectExists(shared_1.sexesWithOther, 'Basic sexes object w "other" included exists');
        test_1.expectNonEmptyObjectExists(shared_1.gender, 'Basic gender object (identical to sexesWithOther) exists');
        test_1.expectNonEmptyObjectExists(shared_1.genderFull, 'Extensive gender object (with piles of "experimental" & less common genders) exists');
        it("sexes is deep frozen", function () {
            chai_1.expect(shared_1.sexes).to.be.frozen;
        });
        it("sexesWithOther is deep frozen", function () {
            chai_1.expect(shared_1.sexesWithOther).to.be.frozen;
        });
        it("gender is deep frozen", function () {
            chai_1.expect(shared_1.gender).to.be.frozen;
        });
        it("genderFull is deep frozen", function () {
            chai_1.expect(shared_1.genderFull).to.be.frozen;
        });
    });
});
//# sourceMappingURL=types-data-generic.spec.js.map