"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var errorModule = require("../../src/error");
var err = shared_1.m_.error;
/********************************************* TESTS **********************************************/
describe("error sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.error, 'error (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.error, 'error (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(errorModule, 'error (import all from error.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.error, 'error (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.error, 'error (from Browser export)');
    it("contains functions to get stack items (by number)", function () {
        chai_1.expect(shared_1.error.getFirstStackItem).to.exist;
        chai_1.expect(shared_1.error.getSecondStackItem).to.exist;
        chai_1.expect(shared_1.error.getThirdStackItem).to.exist;
    });
    it("contains removeFromStack function to remove matching items from stack", function () {
        chai_1.expect(shared_1.error.removeFromStack).to.exist;
    });
});
//# sourceMappingURL=error.spec.js.map