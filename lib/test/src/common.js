"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var shared_1 = require("../../shared");
/********************************************* TESTS **********************************************/
describe("common exports sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.common, 'Object with functions most commonly used in Node exported');
    test_1.expectNonEmptyObjectExists(browser_1.common, 'Object with functions most commonly used in browser exported');
    test_1.expectNonEmptyObjectExists(shared_1.commonShared, 'Object with functions used commonly in all environments exported');
});
//# sourceMappingURL=common.js.map