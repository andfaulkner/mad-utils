"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("../../node");
var node_2 = require("../../node");
var middlewareModule = require("../../src/node/middleware");
var test_1 = require("../../src/node/test");
var mw = node_1.m_.middleware;
/********************************************* TESTS **********************************************/
describe("middleware sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.middleware, 'middleware (from shared/base export)');
    test_1.expectNonEmptyObjectExists(node_1.m_.middleware, 'middleware (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(middlewareModule, 'middleware (import all from middleware.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.middleware, 'middleware (from node export)');
});
//# sourceMappingURL=middleware.spec.js.map