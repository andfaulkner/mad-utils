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
var validation_1 = require("../../src/validation");
/********************************************* TESTS **********************************************/
describe("validation sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.validation, 'validation (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.validation, 'validation (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.validation, 'validation (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.validation, 'validation (from Browser export)');
    describe("validateCanadaPostalCode", function () {
        it("Returns true given Canadian postal codes in lowercase with no spaces", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("k3k2k2")).to.equal(true);
            chai_1.expect(validation_1.validateCanadaPostalCode("m2m1k2")).to.equal(true);
        });
        it("Returns true given Canadian postal codes in uppercase with no spaces", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("M6N9W2")).to.equal(true);
            chai_1.expect(validation_1.validateCanadaPostalCode("O2P4N8")).to.equal(true);
        });
        it("Returns true given Canadian postal codes in uppercase with spaces", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("L7V 5E2")).to.equal(true);
            chai_1.expect(validation_1.validateCanadaPostalCode("O9O 7V6")).to.equal(true);
        });
        it("Returns true given Canadian postal codes in lowercase with spaces", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("j8t 7r3")).to.equal(true);
            chai_1.expect(validation_1.validateCanadaPostalCode("w4q 6a6")).to.equal(true);
        });
        it("Returns false given empty string or null", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("")).to.equal(false);
            chai_1.expect(validation_1.validateCanadaPostalCode(null)).to.equal(false);
        });
        it("Returns false given invalid postal codes", function () {
            chai_1.expect(validation_1.validateCanadaPostalCode("12345")).to.equal(false);
            chai_1.expect(validation_1.validateCanadaPostalCode("9J8H7D")).to.equal(false);
            chai_1.expect(validation_1.validateCanadaPostalCode("9j8h7d")).to.equal(false);
            chai_1.expect(validation_1.validateCanadaPostalCode("IWEJFOIWEJGFOIJEGOIJERG")).to.equal(false);
            chai_1.expect(validation_1.validateCanadaPostalCode("010101010101010")).to.equal(false);
        });
    });
});
//# sourceMappingURL=validation.spec.js.map