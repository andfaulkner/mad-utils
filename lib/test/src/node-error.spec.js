"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
var node_1 = require("../../node");
var node_2 = require("../../node");
var nodeErrorModule = require("../../src/node/node-error");
/********************************************* TESTS **********************************************/
describe("error sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.nodeError, 'nodeError (from shared/base export)');
    test_1.expectNonEmptyObjectExists(node_1.m_.nodeError, 'm_.nodeError (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(node_1.m_.nodeErr, 'm_.nodeErr (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(nodeErrorModule, 'nodeError (import all from nodeError.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.error, 'nodeError (from Node export)');
});
//# sourceMappingURL=node-error.spec.js.map