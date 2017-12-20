"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
var node_1 = require("../../node");
var nodeExpressRouting = require("../../src/node/express-routing");
/********************************************* TESTS **********************************************/
describe("error sub-module", function () {
    test_1.expectNonEmptyObjectExists(node_1.expressRouting, 'nodeError (import all from nodeError.ts file)');
    test_1.expectNonEmptyObjectExists(nodeExpressRouting, 'nodeError (from Node export)');
    describe("getFirstUrlPath", function () {
        it("returns first path in given insecure full path URL", function () {
            chai_1.expect(node_1.getFirstUrlPath("http://example.com/CORRECT_PATH/two/3")).to.eql('CORRECT_PATH');
        });
        it("returns first path in given secure full path URL", function () {
            chai_1.expect(node_1.getFirstUrlPath("https://example.com/CORRECT_PATH/two/3")).to.eql('CORRECT_PATH');
        });
        it("returns first path in given localhost URL", function () {
            chai_1.expect(node_1.getFirstUrlPath("localhost:8080/CORRECT_PATH/two/3")).to.eql('CORRECT_PATH');
        });
        it("returns first path in given partial URL (paths only), with preceding '/'", function () {
            chai_1.expect(node_1.getFirstUrlPath("/CORRECT_PATH/two/3")).to.eql('CORRECT_PATH');
        });
        it("returns first path in given partial URL (paths only), with no preceding '/'", function () {
            chai_1.expect(node_1.getFirstUrlPath("CORRECT_PATH/two/3")).to.eql('CORRECT_PATH');
        });
        it("returns first path in given Request object (mock) at originalUrl", function () {
            chai_1.expect(node_1.getFirstUrlPath({ originalUrl: "http://example.com/CORRECT_PATH/two/3" }))
                .to.eql('CORRECT_PATH');
        });
    });
});
//# sourceMappingURL=node-express-routing.spec.js.map