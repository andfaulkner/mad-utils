"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("../../node");
/******************************** IMPORT SEARCH MODULE FOR TESTING ********************************/
var shared_1 = require("../../shared");
var search_1 = require("../../src/search");
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var searchModule = require("../../src/search");
/********************************************* TESTS **********************************************/
describe("search sub-module", function () {
    node_1.expectNonEmptyObjectExists(shared_1.search, 'search (from shared/base export)');
    node_1.expectNonEmptyObjectExists(shared_1.m_.search, 'search (from m_ top-level namespace)');
    node_1.expectNonEmptyObjectExists(searchModule, 'search (import all from search.ts file)');
    node_1.expectNonEmptyObjectExists(node_2.search, 'search (from Node export)');
    node_1.expectNonEmptyObjectExists(browser_1.search, 'search (from Browser export)');
    // Existence of several functions exported from string module via search module
    node_1.expectFunctionExists(search_1.escapeRegExp);
    node_1.expectFunctionExists(search_1.matches);
    node_1.expectFunctionExists(search_1.matchesIgnoreCase);
    node_1.expectFunctionExists(search_1.replaceAll);
});
//# sourceMappingURL=search.spec.js.map