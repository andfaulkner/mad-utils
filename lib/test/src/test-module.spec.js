"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
var node_1 = require("../../node");
var node_2 = require("../../node");
var testModule = require("../../src/node/test");
var testHelpers = node_1.m_.test;
/********************************************* TESTS **********************************************/
describe("test sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.test, 'test (from shared/base export)');
    test_1.expectNonEmptyObjectExists(node_1.m_.test, 'test (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(testModule, 'test (import all from test.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.test, 'test (from Node export)');
});
//# sourceMappingURL=test-module.spec.js.map