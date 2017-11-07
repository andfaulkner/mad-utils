"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var decoratorModule = require("../../src/decorator");
var dec = shared_1.m_.decorator;
/********************************************* TESTS **********************************************/
describe("decorator sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.decorator, 'decorator (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.decorator, 'decorator (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(decoratorModule, 'decorator (import all from decorator.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.decorator, 'decorator (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.decorator, 'decorator (from Browser export)');
});
//# sourceMappingURL=decorator.spec.js.map