"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/************************************* IMPORT TEST UTILITIES **************************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var arrayModule = require("../../src/array");
/********************************************* TESTS **********************************************/
describe("array sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.array, 'array (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.array, 'array (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(arrayModule, 'array (import all from array.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.array, 'array (from node export)');
    test_1.expectNonEmptyObjectExists(browser_1.array, 'array (from browser export)');
    describe("-- #append", function () {
        it("-- exists : #append", function () {
            chai_1.expect(shared_1.m_.array.append).to.exist;
            chai_1.expect(shared_1.append).to.exist;
        });
        it(".append : merges all given arrays into 1", function () {
            chai_1.expect(shared_1.append([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
            chai_1.expect(shared_1.append([1, 2], [3, 4], [5, 6])).to.eql([1, 2, 3, 4, 5, 6]);
            chai_1.expect(shared_1.append([1, 2], null, [5, 6])).to.eql([1, 2, 5, 6]);
        });
    });
    describe("-- #first", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.first).to.exist;
            chai_1.expect(shared_1.first).to.exist;
        });
        it("returns first item in an array", function () {
            chai_1.expect(shared_1.m_.array.first(['one'])).to.eql('one');
            chai_1.expect(shared_1.m_.array.first(['one', 'two'])).to.eql('one');
        });
        it("returns undefined if array is empty", function () {
            chai_1.expect(shared_1.m_.array.first([])).to.be.undefined;
        });
    });
    describe("-- #second", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.second).to.exist;
            chai_1.expect(shared_1.second).to.exist;
        });
        it("returns second item in an array", function () {
            chai_1.expect(shared_1.m_.array.second(['one', 'two'])).to.eql('two');
            chai_1.expect(shared_1.m_.array.second(['one', 'two', 'three'])).to.eql('two');
        });
        it("returns undefined if array is empty or only has one item", function () {
            chai_1.expect(shared_1.m_.array.second([])).to.be.undefined;
            chai_1.expect(shared_1.m_.array.second(['one'])).to.be.undefined;
        });
    });
    describe("-- #third", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.third).to.exist;
            chai_1.expect(shared_1.third).to.exist;
        });
        it("returns third item in an array", function () {
            chai_1.expect(shared_1.m_.array.third(['one', 'two', 'three'])).to.eql('three');
            chai_1.expect(shared_1.m_.array.third(['one', 'two', 'three', 'four'])).to.eql('three');
        });
        it("returns undefined if array is empty or only has 1 or 2 items", function () {
            chai_1.expect(shared_1.m_.array.third([])).to.be.undefined;
            chai_1.expect(shared_1.m_.array.third(['one'])).to.be.undefined;
            chai_1.expect(shared_1.m_.array.third(['one', 'two'])).to.be.undefined;
        });
    });
    describe("-- #last", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.last).to.exist;
            chai_1.expect(shared_1.last).to.exist;
        });
        it("returns last item in an array", function () {
            chai_1.expect(shared_1.m_.array.last(['one'])).to.eql('one');
            chai_1.expect(shared_1.m_.array.last(['one', 'two', 'three'])).to.eql('three');
            chai_1.expect(shared_1.m_.array.last(['one', 'two', 'three', 'four'])).to.eql('four');
        });
        it("returns undefined if array is empty", function () {
            chai_1.expect(shared_1.m_.array.last([])).to.be.undefined;
        });
    });
    describe("-- #secondLast", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.secondLast).to.exist;
            chai_1.expect(shared_1.secondLast).to.exist;
        });
        it("returns second last item in an array", function () {
            chai_1.expect(shared_1.m_.array.secondLast(['one', 'two'])).to.eql('one');
            chai_1.expect(shared_1.m_.array.secondLast(['one', 'two', 'three'])).to.eql('two');
            chai_1.expect(shared_1.m_.array.secondLast(['one', 'two', 'three', 'four'])).to.eql('three');
        });
        it("returns undefined if array is empty", function () {
            chai_1.expect(shared_1.m_.array.secondLast([])).to.be.undefined;
        });
    });
    describe("-- #thirdLast", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.thirdLast).to.exist;
            chai_1.expect(shared_1.thirdLast).to.exist;
        });
        it("returns third last item in an array", function () {
            chai_1.expect(shared_1.m_.array.thirdLast(['one', 'two', 'three'])).to.eql('one');
            chai_1.expect(shared_1.m_.array.thirdLast(['one', 'two', 'three', 'four'])).to.eql('two');
            chai_1.expect(shared_1.m_.array.thirdLast(['one', 'two', 'three', 'four', 'five'])).to.eql('three');
        });
        it("returns undefined if array is empty", function () {
            chai_1.expect(shared_1.m_.array.thirdLast([])).to.be.undefined;
        });
    });
    describe("-- #last2", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.last2).to.exist;
            chai_1.expect(shared_1.last2).to.exist;
        });
        it("returns last 2 items in an array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.last2(['one', 'two'])).to.eql(['one', 'two']);
            chai_1.expect(shared_1.m_.array.last2(['one', 'two', 'three'])).to.eql(['two', 'three']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.last2([])).to.eql([]);
        });
        it("If source array has 1 item, return new array w/ 1 source array item", function () {
            chai_1.expect(shared_1.m_.array.last2(['one'])).to.eql(['one']);
        });
    });
    describe("-- #last3", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.last3).to.exist;
            chai_1.expect(shared_1.last3).to.exist;
        });
        it("returns last 3 items in an array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.last3(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            chai_1.expect(shared_1.m_.array.last3(['one', 'two', '3', 'four'])).to.eql(['two', '3', 'four']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.last3([])).to.eql([]);
        });
        it("If source array has less than 3 items, return clone of original array", function () {
            chai_1.expect(shared_1.m_.array.last3(['one'])).to.eql(['one']);
            chai_1.expect(shared_1.m_.array.last3(['one', 'two'])).to.eql(['one', 'two']);
        });
    });
    describe("-- #lastN", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.lastN).to.exist;
            chai_1.expect(shared_1.lastN).to.exist;
        });
        it("returns requested # of items from end of source array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.lastN(['one', 'two', 'three'], 1)).to.eql(['three']);
            chai_1.expect(shared_1.m_.array.lastN(['one', 'two', 'three'], 2)).to.eql(['two', 'three']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.lastN([], 1)).to.eql([]);
            chai_1.expect(shared_1.m_.array.lastN([], 5)).to.eql([]);
        });
        it("If src array has less than requested # of items, return src array clone", function () {
            chai_1.expect(shared_1.m_.array.lastN(['one'], 2)).to.eql(['one']);
            chai_1.expect(shared_1.m_.array.lastN(['one', 'two'], 12)).to.eql(['one', 'two']);
        });
    });
    describe("-- #first2", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.first2).to.exist;
            chai_1.expect(shared_1.first2).to.exist;
        });
        it("returns first 2 items in an array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.first2(['one', 'two'])).to.eql(['one', 'two']);
            chai_1.expect(shared_1.m_.array.first2(['one', 'two', 'three'])).to.eql(['one', 'two']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.first2([])).to.eql([]);
        });
        it("If source array has 1 item, return new array w/ 1 source array item", function () {
            chai_1.expect(shared_1.m_.array.first2(['one'])).to.eql(['one']);
        });
    });
    describe("-- #first3", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.first3).to.exist;
            chai_1.expect(shared_1.first3).to.exist;
        });
        it("returns first 3 items in an array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.first3(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            chai_1.expect(shared_1.m_.array.first3(['one', 'two', '3', 'four'])).to.eql(['one', 'two', '3']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.first3([])).to.eql([]);
        });
        it("If source array has less than 3 items, return clone of original array", function () {
            chai_1.expect(shared_1.m_.array.first3(['one'])).to.eql(['one']);
            chai_1.expect(shared_1.m_.array.first3(['one', 'two'])).to.eql(['one', 'two']);
        });
    });
    describe("-- #firstN", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.firstN).to.exist;
            chai_1.expect(shared_1.firstN).to.exist;
        });
        it("returns requested # of items from start of source array (in array form)", function () {
            chai_1.expect(shared_1.m_.array.firstN(['one', 'two', 'three'], 1)).to.eql(['one']);
            chai_1.expect(shared_1.m_.array.firstN(['one', 'two', 'three'], 2)).to.eql(['one', 'two']);
        });
        it("returns empty array if source array is empty", function () {
            chai_1.expect(shared_1.m_.array.firstN([], 1)).to.eql([]);
            chai_1.expect(shared_1.m_.array.firstN([], 5)).to.eql([]);
        });
        it("If src array has less than requested # of items, return src array clone", function () {
            chai_1.expect(shared_1.m_.array.firstN(['one'], 2)).to.eql(['one']);
            chai_1.expect(shared_1.m_.array.firstN(['one', 'two'], 12)).to.eql(['one', 'two']);
        });
    });
    describe("-- #arrayN", function () {
        it("exists", function () {
            chai_1.expect(shared_1.m_.array.arrayN).to.exist;
            chai_1.expect(shared_1.arrayN).to.exist;
        });
        it("returns given length array of empty items if run w 1 integer arg", function () {
            chai_1.expect(shared_1.m_.array.arrayN(1)).to.be.length(1);
            chai_1.expect(shared_1.m_.array.arrayN(3)).to.be.length(3);
            chai_1.expect(shared_1.m_.array.arrayN(3)).to.eql([undefined, undefined, undefined]);
            chai_1.expect(shared_1.m_.array.arrayN(1)).to.eql([undefined]);
        });
        it("returns array containing given number of copies of provided item if run w 2 args: 1 " +
            "int & 1 other item of any type", function () {
            chai_1.expect(shared_1.m_.array.arrayN(1, 'asdf')).to.be.length(1);
            chai_1.expect(shared_1.m_.array.arrayN(1, 'asdf')).to.eql(['asdf']);
            chai_1.expect(shared_1.m_.array.arrayN(2, {})).to.be.length(2);
            chai_1.expect(shared_1.m_.array.arrayN(2, { ok: 'yep' })).to.eql([{ ok: 'yep' }, { ok: 'yep' }]);
            chai_1.expect(shared_1.arrayN(4, 5)).to.eql([5, 5, 5, 5]);
        });
        it("returns empty array if first arg is array of length 0", function () {
            chai_1.expect(shared_1.arrayN(0)).to.be.length(0);
            chai_1.expect(shared_1.arrayN(0)).to.eql([]);
            chai_1.expect(shared_1.arrayN(0, 'gr')).to.be.length(0);
            chai_1.expect(shared_1.arrayN(0, 'gr')).to.eql([]);
        });
        it("throws if first arg is not an integer, or is below 0", function () {
            chai_1.expect(function () { return shared_1.arrayN(-1); }).to.throw(TypeError);
            chai_1.expect(function () { return shared_1.arrayN(4.12, []); }).to.throw(TypeError);
            chai_1.expect(function () { return shared_1.arrayN(4.12, ["this shit ain't gon' fly"]); }).to.throw(TypeError);
        });
    });
    describe("-- #rmAllFalsy", function () {
        it("given arr w/ a single falsy val, returns new array w/ the falsy val rm", function () {
            chai_1.expect(shared_1.rmAllFalsy(['one', undefined, 'three'])).to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy(['one', 0, 'three'])).to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy(['one', '', 'three'])).to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy(['one', null, 'three'])).to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy(['one', false, 'three'])).to.eql(['one', 'three']);
        });
        it("given arr w/ multiple falsy vals, returns new array w/ the falsy vals rm", function () {
            chai_1.expect(shared_1.rmAllFalsy(['one', false, false, false, 'three'])).to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy([false, false, 'one', false, 'three', false]))
                .to.eql(['one', 'three']);
            chai_1.expect(shared_1.rmAllFalsy(['one', null, 'three', null, 'five', undefined]))
                .to.eql(['one', 'three', 'five']);
            chai_1.expect(shared_1.rmAllFalsy(['', '', 'one', 0, 'three', null, 'five', undefined, false]))
                .to.eql(['one', 'three', 'five']);
            chai_1.expect(shared_1.rmAllFalsy([false, '', '', '', 0, null, undefined, false])).to.eql([]);
        });
        it("given arr with no falsy vals, returns duplicate of given array", function () {
            chai_1.expect(shared_1.rmAllFalsy(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            chai_1.expect(shared_1.rmAllFalsy([true])).to.eql([true]);
            chai_1.expect(shared_1.rmAllFalsy([-1, 1, 'x'])).to.eql([-1, 1, 'x']);
            chai_1.expect(shared_1.rmAllFalsy([])).to.eql([]);
            chai_1.expect(shared_1.rmAllFalsy([{}])).to.eql([{}]);
        });
        it("treats NaN as falsy & rms it from returned arrays", function () {
            chai_1.expect(shared_1.rmAllFalsy([NaN])).to.eql([]);
            chai_1.expect(shared_1.rmAllFalsy([NaN, NaN, NaN])).to.eql([]);
            chai_1.expect(shared_1.rmAllFalsy([1, NaN, 3, NaN, 5])).to.eql([1, 3, 5]);
            chai_1.expect(shared_1.rmAllFalsy([NaN, NaN, {}, [], NaN, 22, 'ok'])).to.eql([{}, [], 22, 'ok']);
        });
    });
    describe("-- #pushIfUniq", function () {
        it("adds item to array if array doesn't contain given item", function () {
            chai_1.expect(shared_1.pushIfUniq([1, 2, 3], 4)).to.eql([1, 2, 3, 4]);
            chai_1.expect(shared_1.pushIfUniq(['a', 'b', 'c'], 'd')).to.eql(['a', 'b', 'c', 'd']);
        });
        it("does not add item to array if array already contains given item", function () {
            chai_1.expect(shared_1.pushIfUniq([1, 2, 3], 2)).to.eql([1, 2, 3]);
            chai_1.expect(shared_1.pushIfUniq(['a', 'b', 'c'], 'c')).to.eql(['a', 'b', 'c']);
        });
    });
    describe("-- #splitLines", function () {
        test_1.expectFunctionExists(shared_1.splitLines);
        test_1.expectFunctionExists(shared_1.m_.array.splitLines);
        it("splits strings into array, performing a division at each \"\\n\" char", function () {
            chai_1.expect(shared_1.splitLines('1\n2')).to.eql(['1', '2']);
            chai_1.expect(shared_1.splitLines('1\n2\n3')).to.eql(['1', '2', '3']);
            chai_1.expect(shared_1.splitLines(' 1 \n2   \n three\n4')).to.eql([' 1 ', '2   ', ' three', '4']);
        });
        it("excludes empty lines from output array, but includes lines with whitespace chars", function () {
            chai_1.expect(shared_1.splitLines('a\n\nb')).to.eql(['a', 'b']);
            chai_1.expect(shared_1.splitLines('a\n\nb\n')).to.eql(['a', 'b']);
            chai_1.expect(shared_1.splitLines('\na\n\nb\n')).to.eql(['a', 'b']);
            chai_1.expect(shared_1.splitLines('\n \n\n \n ')).to.eql([' ', ' ', ' ']);
        });
        it("converts empty string into empty array", function () {
            chai_1.expect(shared_1.splitLines('')).to.eql([]);
        });
        it("converts 'multiline empty' string into empty array", function () {
            chai_1.expect(shared_1.splitLines('\n')).to.eql([]);
            chai_1.expect(shared_1.splitLines('\n\n')).to.eql([]);
            chai_1.expect(shared_1.splitLines('\n\n\n\n\n\n')).to.eql([]);
        });
        it("Keep empty lines in output if preserveEmptyLines option is set to true", function () {
            chai_1.expect(shared_1.splitLines('\n', { preserveEmptyLines: true })).to.eql(['', '']);
            chai_1.expect(shared_1.splitLines('\na\n', { preserveEmptyLines: true })).to.eql(['', 'a', '']);
            chai_1.expect(shared_1.splitLines('123a\n123\n', { preserveEmptyLines: true })).to
                .eql(['123a', '123', '']);
            // expect(splitLines('\n\n')).to.eql([]);
            // expect(splitLines('\n\n\n\n\n\n')).to.eql([]);
        });
    });
    describe("-- without.last", function () {
        test_1.expectFunctionExists(shared_1.without.last);
        test_1.expectFunctionExists(shared_1.withoutLast);
        test_1.expectFunctionExists(shared_1.m_.array.withoutLast);
        it("returns duplicate of given array, with last item excluded", function () {
            chai_1.expect(shared_1.without.last(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.last(['a', 2])).to.eql(['a']);
            chai_1.expect(shared_1.without.last(['a', 2, null])).to.eql(['a', 2]);
            chai_1.expect(shared_1.without.last(['a', 2, null, true])).to.eql(['a', 2, null]);
            chai_1.expect(shared_1.without.last(['a', 2, null, true, NaN])).to.eql(['a', 2, null, true]);
            chai_1.expect(shared_1.without.last(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null, true, NaN]);
        });
        it("returns duplicate of given string, with last char excluded", function () {
            chai_1.expect(shared_1.without.last('a')).to.eql('');
            chai_1.expect(shared_1.without.last('as')).to.eql('a');
            chai_1.expect(shared_1.without.last('asd')).to.eql('as');
            chai_1.expect(shared_1.without.last('asdf')).to.eql('asd');
            chai_1.expect(shared_1.without.last('asdf ')).to.eql('asdf');
            chai_1.expect(shared_1.without.last('asdf 123')).to.eql('asdf 12');
        });
    });
    describe("-- without.last2", function () {
        test_1.expectFunctionExists(shared_1.without.last2);
        test_1.expectFunctionExists(shared_1.withoutLast2);
        test_1.expectFunctionExists(shared_1.m_.array.withoutLast2);
        it("returns duplicate of given array, with last 2 items excluded", function () {
            chai_1.expect(shared_1.without.last2(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.last2(['a', 2])).to.eql([]);
            chai_1.expect(shared_1.without.last2(['a', 2, null])).to.eql(['a']);
            chai_1.expect(shared_1.without.last2(['a', 2, null, true])).to.eql(['a', 2]);
            chai_1.expect(shared_1.without.last2(['a', 2, null, true, NaN])).to.eql(['a', 2, null]);
            chai_1.expect(shared_1.without.last2(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null, true]);
        });
        it("returns duplicate of given string, with last 2 chars excluded", function () {
            chai_1.expect(shared_1.without.last2('a')).to.eql('');
            chai_1.expect(shared_1.without.last2('as')).to.eql('');
            chai_1.expect(shared_1.without.last2('asd')).to.eql('a');
            chai_1.expect(shared_1.without.last2('asdf')).to.eql('as');
            chai_1.expect(shared_1.without.last2('asdf ')).to.eql('asd');
            chai_1.expect(shared_1.without.last2('asdf 123')).to.eql('asdf 1');
        });
    });
    describe("-- without.last3", function () {
        test_1.expectFunctionExists(shared_1.without.last3);
        test_1.expectFunctionExists(shared_1.withoutLast3);
        test_1.expectFunctionExists(shared_1.m_.array.withoutLast3);
        it("returns duplicate of given array, with last 3 items excluded", function () {
            chai_1.expect(shared_1.without.last3(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.last3(['a', 2])).to.eql([]);
            chai_1.expect(shared_1.without.last3(['a', 2, null])).to.eql([]);
            chai_1.expect(shared_1.without.last3(['a', 2, null, true])).to.eql(['a']);
            chai_1.expect(shared_1.without.last3(['a', 2, null, true, NaN])).to.eql(['a', 2]);
            chai_1.expect(shared_1.without.last3(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null]);
        });
        it("returns duplicate of given string, with last 3 chars excluded", function () {
            chai_1.expect(shared_1.without.last3('a')).to.eql('');
            chai_1.expect(shared_1.without.last3('as')).to.eql('');
            chai_1.expect(shared_1.without.last3('asd')).to.eql('');
            chai_1.expect(shared_1.without.last3('asdf')).to.eql('a');
            chai_1.expect(shared_1.without.last3('asdf ')).to.eql('as');
            chai_1.expect(shared_1.without.last3('asdf 123')).to.eql('asdf ');
        });
    });
    describe("-- without.first", function () {
        test_1.expectFunctionExists(shared_1.without.first);
        test_1.expectFunctionExists(shared_1.withoutFirst);
        test_1.expectFunctionExists(shared_1.m_.array.withoutFirst);
        it("returns duplicate of given array, with first item excluded", function () {
            chai_1.expect(shared_1.without.first(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.first(['a', 2])).to.eql([2]);
            chai_1.expect(shared_1.without.first(['a', 2, null])).to.eql([2, null]);
            chai_1.expect(shared_1.without.first(['a', 2, null, true])).to.eql([2, null, true]);
            chai_1.expect(shared_1.without.first(['a', 2, null, true, NaN])).to.eql([2, null, true, NaN]);
            chai_1.expect(shared_1.without.first(['a', 2, null, true, NaN, '6'])).to.eql([2, null, true, NaN, '6']);
        });
        it("returns duplicate of given string, with first char excluded", function () {
            chai_1.expect(shared_1.without.first('a')).to.eql('');
            chai_1.expect(shared_1.without.first('as')).to.eql('s');
            chai_1.expect(shared_1.without.first('asd')).to.eql('sd');
            chai_1.expect(shared_1.without.first('asdf')).to.eql('sdf');
            chai_1.expect(shared_1.without.first('asdf ')).to.eql('sdf ');
            chai_1.expect(shared_1.without.first('asdf 123')).to.eql('sdf 123');
        });
    });
    describe("-- without.first2", function () {
        test_1.expectFunctionExists(shared_1.without.first2);
        test_1.expectFunctionExists(shared_1.withoutFirst2);
        test_1.expectFunctionExists(shared_1.m_.array.withoutFirst2);
        it("returns duplicate of given array, with first 2 items excluded", function () {
            chai_1.expect(shared_1.without.first2(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.first2(['a', 2])).to.eql([]);
            chai_1.expect(shared_1.without.first2(['a', 2, null])).to.eql([null]);
            chai_1.expect(shared_1.without.first2(['a', 2, null, true])).to.eql([null, true]);
            chai_1.expect(shared_1.without.first2(['a', 2, null, true, NaN])).to.eql([null, true, NaN]);
            chai_1.expect(shared_1.without.first2(['a', 2, null, true, NaN, '6'])).to.eql([null, true, NaN, '6']);
        });
        it("returns duplicate of given string, with first 2 chars excluded", function () {
            chai_1.expect(shared_1.without.first2('a')).to.eql('');
            chai_1.expect(shared_1.without.first2('as')).to.eql('');
            chai_1.expect(shared_1.without.first2('asd')).to.eql('d');
            chai_1.expect(shared_1.without.first2('asdf')).to.eql('df');
            chai_1.expect(shared_1.without.first2('asdf ')).to.eql('df ');
            chai_1.expect(shared_1.without.first2('asdf 123')).to.eql('df 123');
        });
    });
    describe("-- without.first3", function () {
        test_1.expectFunctionExists(shared_1.without.first3);
        test_1.expectFunctionExists(shared_1.withoutFirst3);
        test_1.expectFunctionExists(shared_1.m_.array.withoutFirst3);
        it("returns duplicate of given array, with first 3 items excluded", function () {
            chai_1.expect(shared_1.without.first3(['a'])).to.eql([]);
            chai_1.expect(shared_1.without.first3(['a', 2])).to.eql([]);
            chai_1.expect(shared_1.without.first3(['a', 2, null])).to.eql([]);
            chai_1.expect(shared_1.without.first3(['a', 2, null, true])).to.eql([true]);
            chai_1.expect(shared_1.without.first3(['a', 2, null, true, NaN])).to.eql([true, NaN]);
            chai_1.expect(shared_1.without.first3(['a', 2, null, true, NaN, '6'])).to.eql([true, NaN, '6']);
        });
        it("returns duplicate of given string, with first 3 chars excluded", function () {
            chai_1.expect(shared_1.without.first3('a')).to.eql('');
            chai_1.expect(shared_1.without.first3('as')).to.eql('');
            chai_1.expect(shared_1.without.first3('asd')).to.eql('');
            chai_1.expect(shared_1.without.first3('asdf')).to.eql('f');
            chai_1.expect(shared_1.without.first3('asdf ')).to.eql('f ');
            chai_1.expect(shared_1.without.first3('asdf 123')).to.eql('f 123');
        });
    });
    describe("-- without.firstN", function () {
        test_1.expectFunctionExists(shared_1.without.firstN);
        test_1.expectFunctionExists(shared_1.withoutFirstN);
        test_1.expectFunctionExists(shared_1.m_.array.withoutFirstN);
        it("returns duplicate of given array, with first N items excluded, where N is a given number", function () {
            chai_1.expect(shared_1.without.firstN([1, 2, 3], 2)).to.eql([3]);
            chai_1.expect(shared_1.without.firstN([null, 'two', 'three', 4, 5], 3)).to.eql([4, 5]);
            chai_1.expect(shared_1.without.firstN([], 10)).to.eql([]);
            chai_1.expect(shared_1.without.firstN(['a'], 0)).to.eql(['a']);
        });
        it("returns duplicate of given string, with first N chars excluded, where N is a given number", function () {
            chai_1.expect(shared_1.without.firstN('abc', 2)).to.eql('c');
            chai_1.expect(shared_1.without.firstN('abcd fg', 3)).to.eql('d fg');
            chai_1.expect(shared_1.without.firstN('', 10)).to.eql('');
            chai_1.expect(shared_1.without.firstN('a', 0)).to.eql('a');
        });
    });
    describe("-- without.lastN", function () {
        test_1.expectFunctionExists(shared_1.without.lastN);
        test_1.expectFunctionExists(shared_1.withoutLastN);
        test_1.expectFunctionExists(shared_1.m_.array.withoutLastN);
        it("returns duplicate of given array, with last N items excluded, where N is a given number", function () {
            chai_1.expect(shared_1.without.lastN([1, 2, 3], 2)).to.eql([1]);
            chai_1.expect(shared_1.without.lastN([null, 'two', 'three', 4, 5], 3)).to.eql([null, 'two']);
            chai_1.expect(shared_1.without.lastN([], 10)).to.eql([]);
            chai_1.expect(shared_1.without.lastN(['a'], 0)).to.eql(['a']);
        });
        it("returns duplicate of given string, with last N chars excluded, where N is a given number", function () {
            chai_1.expect(shared_1.without.lastN('abc', 2)).to.eql('a');
            chai_1.expect(shared_1.without.lastN('abcd fg', 3)).to.eql('abcd');
            chai_1.expect(shared_1.without.lastN('', 10)).to.eql('');
            chai_1.expect(shared_1.without.lastN('a', 0)).to.eql('a');
        });
    });
    describe("-- removeMatches", function () {
        test_1.expectFunctionExists(shared_1.removeMatches);
        test_1.expectFunctionExists(shared_1.removeMatches);
        test_1.expectFunctionExists(shared_1.m_.array.removeMatches);
        it("Excludes item given as second parameter from array given as 1st param", function () {
            chai_1.expect(shared_1.removeMatches([1, 2, 3], 2)).to.eql([1, 3]);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], 'two')).to.eql([null, 'three', 4]);
        });
        it("Return array given as 1st arg as-is if item given as 2nd arg not found", function () {
            chai_1.expect(shared_1.removeMatches(['a'], 0)).to.eql(['a']);
            chai_1.expect(shared_1.removeMatches(['a', 'b', 123], 5435)).to.eql(['a', 'b', 123]);
        });
        it("Returns empty array if first param is empty array", function () {
            chai_1.expect(shared_1.removeMatches([], '')).to.eql([]);
            chai_1.expect(shared_1.removeMatches([], 'asdfasdf')).to.eql([]);
            chai_1.expect(shared_1.removeMatches([], null)).to.eql([]);
            chai_1.expect(shared_1.removeMatches([], [])).to.eql([]);
            chai_1.expect(shared_1.removeMatches([], ['a', '234', '435', 12])).to.eql([]);
        });
        it("Excludes all items in second arg (array) from array given as 1st arg", function () {
            chai_1.expect(shared_1.removeMatches([1, 2, 3], [2])).to.eql([1, 3]);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], ['two'])).to.eql([null, 'three', 4]);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], ['two', 4])).to.eql([null, 'three']);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], [null, 'two', 4])).to.eql(['three']);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], [null, 'two', 'three', 4])).to.eql([]);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], [null, 4, 'two', 'three'])).to.eql([]);
        });
        it("Excludes items in 2nd arg from 1st arg even if duplicates found in 2nd arg", function () {
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], [null, 'two', 'two', 4])).to.eql(['three']);
            chai_1.expect(shared_1.removeMatches([null, 'two', 'three', 4], [null, 4, 'two', 'three', 4])).to
                .eql([]);
            chai_1.expect(shared_1.removeMatches([1, 2, 3, 4], [1, 4, 4, 4, 4, 4, 4, 4])).to.eql([2, 3]);
            chai_1.expect(shared_1.removeMatches([1, 2, 3, 4], [1, 4, 4, 4, 4, 4, 4, 4, 2])).to.eql([3]);
            chai_1.expect(shared_1.removeMatches([1, 2, 3, 4], [1, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2])).to
                .eql([3]);
        });
    });
    describe("-- matchAny", function () {
        it("returns true if given array contains given item (for numbers & strings)", function () {
            chai_1.expect(shared_1.matchAny([1, 2, 3])(3)).to.be.true;
            chai_1.expect(shared_1.matchAny([1, 'asdf', 3])('asdf')).to.be.true;
        });
        it("returns true if given array contains null and item is null", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', null, 3])(null)).to.be.true;
        });
        it("returns true if given array contains empty object and item is empty object", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', {}, 3])({})).to.be.true;
        });
        it("returns true if given array contains simple data object with props matching item", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', { a: 1 }, 3])({ a: 1 })).to.be.true;
        });
        it("returns true if given array contains undefined and item is undefined", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', undefined, 3])(undefined)).to.be.true;
        });
        it("returns true if given array contains NaN and item is NaN", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', NaN, 3])(NaN)).to.be.true;
        });
        it("returns true if given array contains empty array and item is empty array", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', [], 3])([])).to.be.true;
        });
        it("returns true if given array contains a simple array that matches the item", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', [1, 2, 3], 3])([1, 2, 3])).to.be.true;
        });
        it("returns false if no match is present", function () {
            chai_1.expect(shared_1.matchAny([1, 'asdf', [1, 2, 3], 3])('ok')).to.be.false;
            chai_1.expect(shared_1.matchAny([1, 'asdf', [1, 2, 3], 3])(12)).to.be.false;
            chai_1.expect(shared_1.matchAny([1, 'asdf', [1, 2, 3], 3])(null)).to.be.false;
            chai_1.expect(shared_1.matchAny([])('')).to.be.false;
        });
    });
    describe("contains", function () {
        it("Returns true if array contains given value", function () {
            chai_1.expect(shared_1.contains(['a', 'b', 'c'], 'b')).to.be.true;
            chai_1.expect(shared_1.contains([1, 2, 3], 3)).to.be.true;
            chai_1.expect(shared_1.contains([null], null)).to.be.true;
        });
        it("Returns false if array doesn't contain given value", function () {
            chai_1.expect(shared_1.contains(['a', 'b', 'c'], 'd')).to.be.false;
            chai_1.expect(shared_1.contains([1, 2, 3], 4)).to.be.false;
            chai_1.expect(shared_1.contains([], '')).to.be.false;
        });
    });
    describe("countOccurrences", function () {
        it("returns map of number of occurrences of each value in the array", function () {
            var map = new Map();
            map.set(9, 3);
            map.set('a', 1);
            map.set('b', 1);
            chai_1.expect(shared_1.countOccurrences([9, 9, 9, 'a', 'b'])).to.eql(map);
        });
        it("returns number of occurrences of given value in the array", function () {
            chai_1.expect(shared_1.countOccurrences([7, 9, 7, 'asdf', 7, 1, 7, null, 7], 7)).to.eql(5);
        });
    });
});
//# sourceMappingURL=array.spec.js.map