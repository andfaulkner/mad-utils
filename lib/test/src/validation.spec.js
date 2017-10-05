"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var validationModule = require("../../src/validation");
var err = shared_1.m_.validation;
/********************************************* TESTS **********************************************/
describe("validation sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.validation, 'validation (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.validation, 'validation (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.validation, 'validation (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.validation, 'validation (from Browser export)');
    describe("validation.isValidString:", function () {
        test_1.expectFunctionExists(shared_1.validation.isValidString);
    });
});
//# sourceMappingURL=validation.spec.js.map