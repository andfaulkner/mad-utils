"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/************************************** THIRD-PARTY IMPORTS ***************************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var jsonModule = require("../../src/json");
/******************************************** LOGGING *********************************************/
var node_2 = require("mad-logs/lib/node");
var log = node_2.nodeLogFactory(node_2.buildFileTag('mad-utils::json.spec.ts', node_2.colors.green.bgWhite));
/********************************************** MOCK **********************************************/
var testObj = {
    a: 1,
    b: 2,
    c: 'cee',
    d: 'dee',
    fn1: function () {
        return 'Hello all!';
    },
    e: 'e',
    f: 6,
    g: 'seven',
    fn2: function () {
        return "Look at me, I'm the second function!";
    },
    h: 'Final data item in json',
    fn3: function () {
        console.log('Goodbye everyone!');
    }
};
var testObjJsonStr = JSON.stringify(testObj);
/********************************************* TESTS **********************************************/
describe("json sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.json, 'json (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.json, 'json (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(jsonModule, 'json (import all from json.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.json, 'json (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.json, 'json (from Browser export)');
    describe("functions exported", function () {
        var jsonStrWFuncs;
        var jsonParseWFuncRehydrate;
        before(function () {
            jsonStrWFuncs = shared_1.json.jsonStringifyWFuncs(testObj);
            jsonParseWFuncRehydrate = shared_1.json.jsonParseWFuncRehydrate_unsafe(testObjJsonStr);
        });
        it('exists', function () {
            chai_1.expect(shared_1.mUtils).to.exist;
        });
        describe("[namespace json] jsonStringifyWFuncs", function () {
            it("exists", function () {
                chai_1.expect(shared_1.json.jsonStringifyWFuncs).to.exist;
            });
            it("stringifies objects to json strings, preserving functions in string form", function () {
                chai_1.expect(jsonStrWFuncs).to.be.a('string');
                chai_1.expect(jsonStrWFuncs).to.contain('function');
                chai_1.expect(jsonStrWFuncs).to.contain('console.log');
                chai_1.expect(jsonStrWFuncs).to.contain('"a"');
                chai_1.expect(jsonStrWFuncs).to.contain('"b"');
                chai_1.expect(jsonStrWFuncs).to.contain('"c"');
                chai_1.expect(jsonStrWFuncs).to.contain('"f"');
            });
        });
        describe("[namespace json] jsonParseWFuncRehydrate_unsafe", function () {
            it("exists", function () {
                chai_1.expect(shared_1.mUtils.json.jsonParseWFuncRehydrate_unsafe).to.exist;
            });
            it("can be instantiated", function () {
                chai_1.expect(jsonParseWFuncRehydrate).to.exist;
                chai_1.expect(jsonParseWFuncRehydrate).to.be.an('object');
            });
        });
    });
});
//# sourceMappingURL=json.spec.js.map