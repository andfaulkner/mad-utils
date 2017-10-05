"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var stream_1 = require("../../src/stream");
var test_1 = require("../../src/node/test");
/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var shared_1 = require("../../shared");
/********************************************* TESTS **********************************************/
describe("stream sub-module", function () {
    test_1.expectFunctionExists(stream_1.CharInputStream, 'CharInputStream can be imported');
    test_1.expectFunctionExists(browser_1.CharInputStream, 'CharInputStream exported from browser submodule');
    test_1.expectFunctionExists(node_1.CharInputStream, 'CharInputStream exported from node submodule');
    test_1.expectFunctionExists(shared_1.CharInputStream, 'CharInputStream exported from shared submodule');
    describe('CharInputStream', function () {
        var inputStream;
        var firstCharFromPeek;
        var firstCharFrom2ndCallToPeek;
        var firstCharFromNext;
        var secondCharFromPeek;
        before(function () {
            inputStream = new stream_1.CharInputStream('Hello! I am test data from CharInputStream!');
            firstCharFromPeek = inputStream.peek();
            firstCharFrom2ndCallToPeek = inputStream.peek();
            firstCharFromNext = inputStream.next();
            secondCharFromPeek = inputStream.peek();
        });
        it("can be instantiated", function () {
            chai_1.expect(inputStream).to.exist;
            chai_1.expect(inputStream).to.be.a('object');
        });
        it("returns the next character without discarding it when peek is called", function () {
            chai_1.expect(firstCharFromPeek).to.equal(firstCharFrom2ndCallToPeek);
            chai_1.expect(firstCharFromPeek).to.equal('H');
            chai_1.expect(firstCharFrom2ndCallToPeek).to.equal('H');
        });
        it("returns the next char & removes it from left side of stream when next is called", function () {
            chai_1.expect(firstCharFromNext).to.eql('H');
            chai_1.expect(secondCharFromPeek).to.eql('e');
        });
    });
});
//# sourceMappingURL=stream.js.map