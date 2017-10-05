"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//
//  FULLY TESTED
//
/*************************************** IMPORT TEST UTILS ****************************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var numberModule = require("../../src/number");
/********************************************* TESTS **********************************************/
describe("number sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.number, 'number (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.number, 'number (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(numberModule, 'number (import all from number.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.number, 'number (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.number, 'number (from Browser export)');
    test_1.expectFunctionExists(shared_1.number.isInt, 'number.isInt', '(from types-iso');
    test_1.expectFunctionExists(shared_1.number.isNumberLike, 'number.isInt', '(from types-iso');
    test_1.expectFunctionExists(shared_1.number.uuid, 'number.uuid', '(from number)');
    describe('uuid', function () {
        it("generates a valid UUID if run as a function", function () {
            var testUuid1 = shared_1.number.uuid();
            console.log("\n    number.uuid: testUuid1:", testUuid1);
            chai_1.expect(testUuid1).to.exist;
            chai_1.expect(testUuid1).to.be.a('string');
            chai_1.expect(testUuid1)
                .to.match(/^[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}$/);
        });
        test_1.expectFunctionExists(browser_1.uuid.len6, 'uuid.len6');
        test_1.expectFunctionExists(browser_1.uuid.len8, 'uuid.len8');
        test_1.expectFunctionExists(browser_1.uuid.noDashes, 'uuid.noDashes');
        it(".len6 -- ", function () {
            chai_1.expect(browser_1.uuid.len6()).to.be.a('string');
            chai_1.expect(browser_1.uuid.len6()).to.have.length(6);
            chai_1.expect(browser_1.uuid.len8).to.exist;
        });
        it(".len8 -- ", function () {
            chai_1.expect(browser_1.uuid.len8()).to.be.a('string');
            chai_1.expect(browser_1.uuid.len8()).to.have.length(8);
        });
        it(".noDashes -- ", function () {
            chai_1.expect(browser_1.uuid.noDashes()).to.be.a('string');
            chai_1.expect(browser_1.uuid.noDashes()).to.have.length(32);
            chai_1.expect(browser_1.uuid.noDashes()).not.to.contain('-');
        });
    });
});
//# sourceMappingURL=number.spec.js.map