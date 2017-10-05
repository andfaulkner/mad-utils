"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/**************************************** IMPORT UTILITIES ****************************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
var node_1 = require("../../node");
var node_2 = require("../../node");
var node_3 = require("../../node");
var webpackModule = require("../../src/node/webpack");
/********************************************* TESTS **********************************************/
describe("webpack sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.webpack, 'webpack (from shared/base export)');
    test_1.expectNonEmptyObjectExists(node_1.m_.webpack, 'webpack (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(webpackModule, 'webpack (import all from webpack.ts file)');
    test_1.expectNonEmptyObjectExists(node_3.webpack, 'webpack (from Node export)');
    it("has alias webpackUtils", function () {
        chai_1.expect(node_1.webpackUtils).to.exist;
    });
    describe("function handlebarsPluginFactory", function () {
        node_2.expectFunctionExists(node_1.webpack.handlebarsPluginFactory);
    });
});
//# sourceMappingURL=webpack.spec.js.map