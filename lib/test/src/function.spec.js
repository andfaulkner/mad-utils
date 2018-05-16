"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var node_1 = require("../../node");
/******************************* IMPORT FUNCTION MODULE FOR TESTING *******************************/
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var functionModule = require("../../src/function");
var shared_1 = require("../../shared");
/********************************************* TESTS **********************************************/
describe("function sub-module", function () {
    node_1.expectNonEmptyObjectExists(shared_1.func, 'function (from shared/base export)');
    node_1.expectNonEmptyObjectExists(shared_1.m_.function, 'function (from m_ top-level namespace)');
    node_1.expectNonEmptyObjectExists(functionModule, 'function (import all from function.ts file)');
    node_1.expectNonEmptyObjectExists(node_2.func, 'function (from Node export)');
    node_1.expectNonEmptyObjectExists(browser_1.func, 'function (from Browser export)');
    it("exists", function () {
        chai_1.expect(shared_1.func).to.exist;
        chai_1.expect(shared_1.m_.function).to.exist;
    });
    describe("getFnAsArr function", function () {
        node_1.expectFunctionExists(shared_1.getFnAsArr);
        it("Displays the source code of a function in an array, with 1 item per line", function () {
            function exampleFunction() {
                console.log('I am an example');
            }
            var exampleFunctionFnArr = shared_1.func.getFnAsArr(exampleFunction);
            chai_1.expect(exampleFunctionFnArr).to.be.length(3);
            chai_1.expect(exampleFunctionFnArr).to.be.an('array');
            chai_1.expect(exampleFunctionFnArr[0]).to.match(/function exampleFunction\(\)/);
            chai_1.expect(exampleFunctionFnArr[1]).to.match(/console\.log\('I am an example'\);/);
            chai_1.expect(exampleFunctionFnArr[2]).to.match(/\}/);
        });
    });
    describe("condSwitch function", function () {
        node_1.expectFunctionExists(shared_1.condSwitch);
        it("Returns the 2nd arg if the 1st arg is truthy", function () {
            chai_1.expect(shared_1.condSwitch(true, 'val1', 'elseVal')).to.eql('val1');
            chai_1.expect(shared_1.condSwitch(true, 'val1', true, 'arg2', true, 'arg3', 'elseVal')).to.eql('val1');
            chai_1.expect(shared_1.condSwitch('cond1', 'val1', 'cond2', 'val2', 'cond3', 'val3', 'elseVal')).to.eql('val1');
        });
        it("Returns the 3rd arg if the 1st arg is falsy and only 3 args were given", function () {
            chai_1.expect(shared_1.condSwitch(false, 'val1', 'elseVal')).to.eql('elseVal');
        });
        it("Returns the last arg if all other 'condition' args are falsy", function () {
            chai_1.expect(shared_1.condSwitch(false, 'val1', undefined, 'val2', 'elseVal')).to.eql('elseVal');
            chai_1.expect(shared_1.condSwitch(0, 'v1', null, 'v2', NaN, 'v3', 'elseVal')).to.eql('elseVal');
            chai_1.expect(shared_1.condSwitch('', 'v1', false, 'v2', null, 'v3', 'elseVal')).to.eql('elseVal');
        });
        it("Allows any odd number of conditions", function () {
            chai_1.expect(shared_1.condSwitch('' + '', 'val1', undefined, 'val2', 0, 'val3', null, 'val4', NaN, 'val5', '', 'val6', false, 'val7', 0 + 0, 'val8', 'elseVal')).to.eql('elseVal');
            var nan = '' / 0;
            chai_1.expect(shared_1.condSwitch('' + '', 'val1', undefined, 'val2', 0, 'val3', null, 'val4', NaN, 'val5', '', 'val6', false, 'val7', 0 + 0, 'val8', 0 - 0, 'val9', 1 - 1, 'val10', nan, 'val11', 0 * 0, 'val12', 0 / 0, 'val13', 10099 * 0, 'val14', 'elseVal')).to.eql('elseVal');
            chai_1.expect(shared_1.condSwitch('' + '', 'val1', undefined, 'val2', 0, 'val3', null, 'val4', NaN, 'val5', '', 'val6', false, 'val7', 0 + 0, 'val8', 0 - 0, 'val9', 1 - 1, 'val10', true, 'val11', 0 * 0, 'val12', 0 / 0, 'val13', 10099 * 0, 'val14', 'elseVal')).to.eql('val11');
        });
        it("allows an even number of conditions as long as at least one condition returns truthy", function () {
            chai_1.expect(shared_1.condSwitch(true, 'v1', false, 'v2')).to.eql('v1');
            chai_1.expect(shared_1.condSwitch(false, 'v1', true, 'v2', 'c3', 'v3')).to.eql('v2');
            chai_1.expect(shared_1.condSwitch(false, 'v1', null, 'v2', 0, 'v3', 'c4', 'v4')).to.eql('v4');
        });
        it("throws if given an even number of conditions and no conditions are truthy", function () {
            chai_1.expect(function () { return shared_1.condSwitch(0, 'v1', false, 'v2'); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.condSwitch(null, 'v1', false, 'v2', '', 'v3'); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.condSwitch(false, 'v1', null, 'v2', '', 'v3', 0, 'v4'); }).to.throw(Error);
        });
    });
    describe("loopN", function () {
        it("runs given function requested # of times, & returns array holding all return values.", function () {
            chai_1.expect(shared_1.loopN(2, function () { return 'return_value'; })).to.eql(['return_value', 'return_value']);
            var i = 0;
            chai_1.expect(shared_1.loopN(3, function () { return ++i; })).to.eql([1, 2, 3]);
            chai_1.expect(i).to.eql(3);
            var j = 0;
            chai_1.expect(shared_1.loopN(15, function () { return j++; })).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            chai_1.expect(j).to.eql(15);
        });
    });
    describe("loop2", function () {
        it("runs given function twice, & returns array holding both return values.", function () {
            chai_1.expect(shared_1.loop2(function () { return 'ret_val'; })).to.eql(['ret_val', 'ret_val']);
            var j = 0;
            chai_1.expect(shared_1.loop2(function () { return j++; })).to.eql([0, 1]);
            chai_1.expect(j).to.eql(2);
        });
    });
    describe("loop3", function () {
        it("runs given function 3X, & returns array holding all 3 return values.", function () {
            chai_1.expect(shared_1.loop3(function () { return 'ret_val'; })).to.eql(['ret_val', 'ret_val', 'ret_val']);
            var j = 0;
            chai_1.expect(shared_1.loop3(function () { return j++; })).to.eql([0, 1, 2]);
            chai_1.expect(j).to.eql(3);
        });
    });
    describe("loop4", function () {
        it("runs given function 4X, & returns array holding all 4 return values.", function () {
            chai_1.expect(shared_1.loop4(function () { return 'ret_val'; })).to.eql(['ret_val', 'ret_val', 'ret_val', 'ret_val']);
            var j = 0;
            chai_1.expect(shared_1.loop4(function () { return j++; })).to.eql([0, 1, 2, 3]);
            chai_1.expect(j).to.eql(4);
        });
    });
    describe("loop5", function () {
        it("runs given function 5X, & returns array holding all 5 return values.", function () {
            chai_1.expect(shared_1.loop5(function () { return 'r_val'; })).to.eql(['r_val', 'r_val', 'r_val', 'r_val', 'r_val']);
            var j = 0;
            chai_1.expect(shared_1.loop5(function () { return j++; })).to.eql([0, 1, 2, 3, 4]);
            chai_1.expect(j).to.eql(5);
        });
    });
    describe("throttle", function () {
        it("runs given function immediately if immediate param = true (default)", function () {
            var val = false;
            var throttledFn = shared_1.throttle(function () { return val = true; }, 200);
            throttledFn();
            chai_1.expect(val).to.be.true;
            var val2 = false;
            var throttledFn2 = shared_1.throttle(function () { return val2 = true; }, 200, true);
            throttledFn2();
            chai_1.expect(val2).to.be.true;
        });
        it("doesn't run given function immediately if immediate param = false", function () {
            var val = false;
            var throttledFn = shared_1.throttle(function () { return val = true; }, 200, false);
            throttledFn();
            chai_1.expect(val).to.be.false;
        });
        it("doesn't run function 2X if request to run occurs before [wait]ms elapses", function () {
            var val = 0;
            var throttledFn = shared_1.throttle(function () { return val++; }, 200, true);
            throttledFn();
            throttledFn();
            throttledFn();
            chai_1.expect(val).to.eql(1);
        });
        it("runs function again if request to run occurs after [wait]ms elapses", function () {
            var val = 0;
            var throttledFn = shared_1.throttle(function () { return val++; }, 200, true);
            throttledFn();
            setTimeout(function () { return throttledFn(); }, 300);
            throttledFn();
            throttledFn();
            setTimeout(function () { return chai_1.expect(val).to.eql(2); }, 500);
        });
    });
});
//# sourceMappingURL=function.spec.js.map