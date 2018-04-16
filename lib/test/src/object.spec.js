"use strict";
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT OBJECT MODULE FOR TESTING ********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var objectModule = require("../../src/object");
/********************************************* TESTS **********************************************/
describe("object sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.object, 'object (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.object, 'object (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(objectModule, 'object (import all from object.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.object, 'object (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.object, 'object (from Browser export)');
    describe(".assignFrozenClone -- merge objs into new obj & deepfreeze the result", function () {
        var obj1 = { a: 1, b: 2 };
        var obj2 = { c: 3, d: 4 };
        var frozenClonedObj = shared_1.assignFrozenClone(obj1, obj2);
        node_1.expectFunctionExists(shared_1.assignFrozenClone);
        node_1.expectFunctionExists(shared_1.m_.object.assignFrozenClone);
        it("--merges objects", function () {
            chai_1.expect(frozenClonedObj).to.have.keys('a', 'b', 'c', 'd');
            chai_1.expect(frozenClonedObj.a).to.eql(1);
            chai_1.expect(frozenClonedObj.b).to.eql(2);
            chai_1.expect(frozenClonedObj.c).to.eql(3);
            chai_1.expect(frozenClonedObj.d).to.eql(4);
        });
        it("--does not mutate original objects", function () {
            chai_1.expect(obj1).to.not.have.keys('c', 'd');
            chai_1.expect(obj2).to.not.have.keys('a', 'b');
        });
        it("--freezes the resultant merged object", function () {
            chai_1.expect(function () {
                frozenClonedObj.e = 'gr';
            }).to.throw(TypeError);
            chai_1.expect(frozenClonedObj.e).to.not.exist;
        });
    });
    describe('numKeys', function () {
        node_1.expectFunctionExists(shared_1.numKeys);
        node_1.expectFunctionExists(shared_1.m_.object.numKeys);
        it('returns number of keys in an object', function () {
            chai_1.expect(shared_1.numKeys({})).to.eql(0);
            chai_1.expect(shared_1.numKeys({ a: 'one' })).to.eql(1);
            chai_1.expect(shared_1.numKeys({ a: 'one', b: 'two', c: 'three' })).to.eql(3);
        });
        it('returns 0 if given non-object or array or function w/ no keys ' + 'directly assigned', function () {
            chai_1.expect(shared_1.numKeys(null)).to.eql(0);
            chai_1.expect(shared_1.numKeys(undefined)).to.eql(0);
            chai_1.expect(shared_1.numKeys(10)).to.eql(0);
            chai_1.expect(shared_1.numKeys('ok')).to.eql(0);
            chai_1.expect(shared_1.numKeys([])).to.eql(0);
            chai_1.expect(shared_1.numKeys(false)).to.eql(0);
            chai_1.expect(shared_1.numKeys(true)).to.eql(0);
        });
    });
    describe("inspectKeyTree", function () {
        it("returns array (and can run without crashing)", function () {
            chai_1.expect(shared_1.inspectKeyTree({})).to.exist;
            chai_1.expect(shared_1.inspectKeyTree({})).to.be.an('array');
        });
    });
    describe('eachPair', function () {
        node_1.expectFunctionExists(shared_1.eachPair);
        node_1.expectFunctionExists(shared_1.m_.object.eachPair);
        it("runs given function taking args (val, key) on each key-value pair in an " + "object", function () {
            var count = 0;
            var testObj = { a: 'eh', b: 'bee', c: 'cee', d: 'dee' };
            shared_1.eachPair(function (val, key) { return count++; })(testObj);
            chai_1.expect(count).to.eql(4);
            var testObj2 = { a: 1, b: 2, c: 3, d: 4 };
            var total = 0;
            shared_1.eachPair(function (val, key) {
                total = total + val;
            })(testObj2);
            chai_1.expect(total).to.eql(10);
        });
    });
    describe('isMultilangTextObj', function () {
        node_1.expectFunctionExists(shared_1.isMultilangTextObj);
        node_1.expectFunctionExists(shared_1.m_.object.isMultilangTextObj);
        it("should return true if given an object with key en or english (upper or lower case), " +
            "containing a string", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ en: 'hello' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ En: 'hello' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ English: 'hello' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ EngliSh: 'hello' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ EN: 'hello' })).to.be.true;
        });
        it("should return true if given an object with key en or english (upper or lower case), " +
            "containing null", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ en: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ english: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ ENGLISH: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ EN: null })).to.be.true;
        });
        it("should return true if given an object with key fr or french, containing a " + "string", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ fr: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ french: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ FR: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ fReNCh: 'bonjour' })).to.be.true;
        });
        it("should return true if given an object with key fr, containing null", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ fr: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ french: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ fR: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ FRENCH: null })).to.be.true;
        });
        it("should return true if given an object with keys en & fr (or english and french, or " +
            "any combination -- in any case), both containing either null or strings", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ en: 'hello', fr: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ en: 'hello', fr: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ En: null, french: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ engLiSh: 'hello', frENch: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ EN: 'hello', fr: null })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ EN: null, FR: 'bonjour' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ ENGLISH: null, FRENCH: null })).to.be.true;
        });
        it("should return true if given an object with numerous keys besides en or fr, but with " +
            "en included (any combo, in any case), with all containing strings", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ za: 'ok', en: 'hello', ge: 'ein' })).to.be.true;
            chai_1.expect(shared_1.isMultilangTextObj({ za: 'ok', FRENCH: 'bonjour', ge: 'ein', '1': 'one' })).to
                .be.true;
        });
        it("should return false if given object without either key fr or en, or both, or some " +
            "variant of either", function () {
            chai_1.expect(shared_1.isMultilangTextObj({ asdf: 'zzzzz', noteng: 'fr' })).to.be.false;
            chai_1.expect(shared_1.isMultilangTextObj({ asdfen: 'enenen', frfrfr: 'french' })).to.be.false;
        });
    });
    describe("hasKey", function () {
        node_1.expectFunctionExists(shared_1.m_.object.hasKey);
        node_1.expectFunctionExists(shared_1.hasKey);
        it("returns true if key exists in object", function () {
            var obj = { a: 'one' };
            chai_1.expect(shared_1.hasKey(obj, 'a')).to.equal(true);
        });
        it("returns false if key doesn't exist in object", function () {
            var obj = { a: 'one' };
            chai_1.expect(shared_1.hasKey(obj, 'b')).to.equal(false);
        });
        it("returns false if object doesn't exist", function () {
            var obj;
            chai_1.expect(shared_1.hasKey(obj, 'a')).to.equal(false);
        });
    });
    describe("get", function () {
        node_1.expectFunctionExists(shared_1.m_.object.get);
        node_1.expectFunctionExists(shared_1.get);
        var obj1 = { a: 'one' };
        var obj2 = { a: { b: 'innerLvl2' } };
        var obj3 = { a: { b: { c: 'innerLvl3' } } };
        it("returns matching key in object, when given string propPath w/ dots", function () {
            chai_1.expect(shared_1.get(obj1, 'a')).to.eql('one');
            chai_1.expect(shared_1.get(obj2, 'a.b')).to.eql('innerLvl2');
            chai_1.expect(shared_1.get(obj3, 'a.b.c')).to.eql('innerLvl3');
        });
        it("returns matching key in object when given string propPath w/ square braces", function () {
            chai_1.expect(shared_1.get(obj2, 'a[b]')).to.eql('innerLvl2');
            chai_1.expect(shared_1.get(obj3, 'a[b][c]')).to.eql('innerLvl3');
        });
        it("returns undefined if key doesn't exist in object & no defVal given", function () {
            chai_1.expect(shared_1.get(obj1, 'b')).to.be.undefined;
            chai_1.expect(shared_1.get(obj1, 'a.b.d.h.j')).to.be.undefined;
            chai_1.expect(shared_1.get(obj2, 'a[j][z][gr]')).to.be.undefined;
        });
        it("returns undefined if object doesn't exist & no defVal given", function () {
            var obj;
            chai_1.expect(shared_1.get(obj, 'a')).to.be.undefined;
        });
        it("returns undefined if given object with path undefined or undefined", function () {
            chai_1.expect(shared_1.get(undefined, 'a')).to.be.undefined;
        });
        it("if given defaultValue, return it if key doesn't exist in object", function () {
            chai_1.expect(shared_1.get(obj1, 'b', 'DEFAULT')).to.eql('DEFAULT');
            chai_1.expect(shared_1.get(obj1, 'a.b.d.h.j', 'DEFAULT')).to.eql('DEFAULT');
            chai_1.expect(shared_1.get(obj2, 'a[j][z][gr]', 'DEFAULT')).to.eql('DEFAULT');
        });
        it("if given defaultValue, return it if object doesn't exist", function () {
            var obj;
            chai_1.expect(shared_1.get(obj, 'b', 'DEFAULT')).to.eql('DEFAULT');
        });
        it("handles null property by returning undefined or default value", function () {
            chai_1.expect(shared_1.get(obj1, null)).to.be.undefined;
            chai_1.expect(shared_1.get(obj1, null, 'DEF')).to.eql('DEF');
        });
        it("handles undefined property by returning undefined or default value", function () {
            chai_1.expect(shared_1.get(obj1, undefined)).to.be.undefined;
            chai_1.expect(shared_1.get(obj1, undefined, 'DEF')).to.eql('DEF');
        });
        it("handles '' property by returning undefined or default value", function () {
            chai_1.expect(shared_1.get(obj1, '')).to.be.undefined;
            chai_1.expect(shared_1.get(obj1, '', 'DEF')).to.eql('DEF');
        });
        it("eliminates duplicate dots", function () {
            chai_1.expect(shared_1.get(obj3, 'a.....b..c')).to.eql('innerLvl3');
        });
    });
    describe("merge", function () {
        it("merges 2 objects together, where each has 1 key-value pair", function () {
            chai_1.expect(shared_1.merge({ a: 'a' }, { b: 'b' })).to.eql({ a: 'a', b: 'b' });
        });
        it("merges 3 objects together, where each has 1 key-value pair", function () {
            chai_1.expect(shared_1.merge({ a: 'a' }, { b: 'b' }, { c: 'c' })).to.eql({ a: 'a', b: 'b', c: 'c' });
        });
        it("merges 3 objects together, where each has multiple key-value pairs", function () {
            chai_1.expect(shared_1.merge({ a: 'a', b: 'b' }, { c: 'c', d: 'd', e: 'e' })).to.eql({
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                e: 'e',
            });
        });
        it("can merge a blank object and an object with contents", function () {
            chai_1.expect(shared_1.merge({}, { a: 'a' })).to.eql({ a: 'a' });
            chai_1.expect(shared_1.merge({ a: 'a' }, {})).to.eql({ a: 'a' });
        });
        it("returns {} if given undefined", function () {
            chai_1.expect(shared_1.merge(undefined)).to.eql({});
        });
        it("returns {} if given null", function () {
            chai_1.expect(shared_1.merge(null)).to.eql({});
        });
        it("returns {} if given null", function () {
            chai_1.expect(shared_1.merge(null)).to.eql({});
        });
        it("merges strings together if given strings", function () {
            chai_1.expect(shared_1.merge('a', 'b', '123')).to.eql('ab123');
        });
        it("concats arrays if given arrays", function () {
            chai_1.expect(shared_1.merge(['a', 'b', 'cdef'], ['g', 'h'])).to.eql(['a', 'b', 'cdef', 'g', 'h']);
        });
        it("skips over undefined when merging arrays", function () {
            chai_1.expect(shared_1.merge(['a', 'b', 'cdef'], undefined, ['g', 'h'])).to.eql([
                'a',
                'b',
                'cdef',
                'g',
                'h',
            ]);
        });
        it("skips over null when merging arrays", function () {
            chai_1.expect(shared_1.merge(['a', 'b', 'cdef'], null, ['g', 'h'])).to.eql([
                'a',
                'b',
                'cdef',
                'g',
                'h',
            ]);
        });
        it("skips over undefined in 1st arg, & merges rest as arrays if array given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(undefined, ['a', 'b', 'cdef'], ['g', 'h'])).to.eql([
                'a',
                'b',
                'cdef',
                'g',
                'h',
            ]);
        });
        it("skips over null in 1st arg, & merges rest as arrays if array given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(null, ['a', 'b', 'cdef'], ['g', 'h'])).to.eql([
                'a',
                'b',
                'cdef',
                'g',
                'h',
            ]);
        });
        it("skips over undefined in 1st arg, & merges rest as objects if object given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(undefined, { a: 'a' }, { b: 'b' })).to.eql({ a: 'a', b: 'b' });
        });
        it("skips over null in 1st arg, & merges rest as objects if object given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(null, { a: 'a' }, { b: 'b' })).to.eql({ a: 'a', b: 'b' });
        });
        it("skips over undefined in 1st arg, & merges rest as strings if string given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(undefined, 'gr', ' ', 'argh')).to.eql('gr argh');
        });
        it("skips over null in 1st arg, & merges rest as strings if string given as 2nd arg", function () {
            chai_1.expect(shared_1.merge(null, 'gr', ' ', 'argh')).to.eql('gr argh');
        });
        it("returns {} if given a pile of nulls", function () {
            chai_1.expect(shared_1.merge(null, null, null, null)).to.eql({});
        });
        it("returns {} if given a pile of undefined values", function () {
            chai_1.expect(shared_1.merge(undefined, undefined, undefined, undefined)).to.eql({});
        });
        it("returns {} if given a pile of mixed undefined and null values", function () {
            chai_1.expect(shared_1.merge(undefined, null, undefined, undefined, null, null)).to.eql({});
        });
    });
    describe("defineImmutableProp", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineImmutableProp);
        node_1.expectFunctionExists(shared_1.defineImmutableProp);
        it("should be able to add a new property to an object by mutating it externally", function () {
            var obj = {};
            shared_1.defineImmutableProp(obj, 'a', 'eh');
            chai_1.expect(obj.a).to.equal('eh');
        });
        it("should not be able to overwrite properties it has already defined", function () {
            var obj = {};
            shared_1.defineImmutableProp(obj, 'a', 'eh');
            shared_1.defineImmutableProp(obj, 'a', 'okok'); // Should not change the value.
            chai_1.expect(obj.a).to.equal('eh');
        });
        it("should return the original object with properties added", function () {
            var obj = {};
            var newObj = shared_1.defineImmutableProp(obj, 'gr', 'argh');
            chai_1.expect(newObj.gr).to.eql('argh');
        });
    });
    describe("defineMutableProp", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineMutableProp);
        node_1.expectFunctionExists(shared_1.defineMutableProp);
        it("should be able to add a new property to an object by mutating it externally", function () {
            var obj = {};
            shared_1.defineMutableProp(obj, 'a', 'eh');
            chai_1.expect(obj.a).to.equal('eh');
        });
        it("should be able to overwrite properties it has already defined", function () {
            var obj = {};
            shared_1.defineMutableProp(obj, 'a', 'eh');
            shared_1.defineMutableProp(obj, 'a', 'okok'); // Should change the value.
            chai_1.expect(obj.a).to.equal('okok');
        });
        it("should return the original object with properties added", function () {
            var obj = {};
            var newObj = shared_1.defineMutableProp(obj, 'gr', 'argh');
            chai_1.expect(newObj.gr).to.eql('argh');
        });
    });
    describe("defineDeletableProp", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineDeletableProp);
        node_1.expectFunctionExists(shared_1.defineDeletableProp);
        it("should be able to add a new property to an object by mutating it externally", function () {
            var obj = {};
            shared_1.defineDeletableProp(obj, 'a', 'eh');
            chai_1.expect(obj.a).to.equal('eh');
        });
        it("should be able to overwrite properties it has already defined", function () {
            var obj = {};
            shared_1.defineDeletableProp(obj, 'a', 'eh');
            shared_1.defineDeletableProp(obj, 'a', 'okok'); // Should change the value.
            chai_1.expect(obj.a).to.equal('okok');
        });
        it("should allow properties it's used to define to be deleted", function () {
            var obj = {};
            shared_1.defineDeletableProp(obj, 'a', 'eh');
            delete obj.a;
            chai_1.expect(obj.a).to.be.undefined;
        });
        it("should return the original object with properties added", function () {
            var obj = {};
            var newObj = shared_1.defineDeletableProp(obj, 'gr', 'argh');
            chai_1.expect(newObj.gr).to.eql('argh');
        });
    });
    describe("defineGetterProp", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineGetterProp);
        node_1.expectFunctionExists(shared_1.defineGetterProp);
        it("should be able to add a new property to an object by mutating it externally", function () {
            var obj = {};
            shared_1.defineGetterProp(obj, 'a', function () { return 'ehhhhhh'; });
            chai_1.expect(obj.a).to.equal('ehhhhhh');
        });
        it("should return the original object with properties added", function () {
            var obj = {};
            var newObj = shared_1.defineGetterProp(obj, 'a', function () { return 'ehhhhhh'; });
            chai_1.expect(newObj.a).to.equal('ehhhhhh');
        });
        it("should be able to overwrite properties it has already defined", function () {
            var obj = {};
            shared_1.defineGetterProp(obj, 'a', function () { return 'eh'; });
            shared_1.defineGetterProp(obj, 'a', function () { return 'okok'; }); // Should change the value.
            chai_1.expect(obj.a).to.equal('okok');
        });
    });
    describe("defineMethod", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineMethod);
        node_1.expectFunctionExists(shared_1.defineMethod);
        var obj = {};
        before(function () {
            shared_1.defineMethod(obj, 'fn', function fn() { return 'ok'; });
        });
        it("should add a new function to an object", function () {
            chai_1.expect(obj.fn).to.be.a('function');
            chai_1.expect(obj.fn()).to.eql('ok');
        });
        it("function added to object should be immutable", function () {
            try {
                obj.fn = 'ok';
            }
            catch (_a) { }
            chai_1.expect(obj.fn).to.be.a('function');
            chai_1.expect(obj.fn()).to.eql('ok');
            try {
                delete obj.fn;
            }
            catch (_b) { }
            chai_1.expect(obj.fn).to.be.a('function');
            chai_1.expect(obj.fn()).to.eql('ok');
        });
        it("function added to object should not be unenumerable", function () {
            Object.keys(obj);
            chai_1.expect(Object.keys(obj)).to.not.include('fn');
        });
    });
    describe("defineProp", function () {
        node_1.expectFunctionExists(shared_1.m_.object.defineProp);
        node_1.expectFunctionExists(shared_1.defineProp);
        it("can add new property to object by mutating it externally", function () {
            var obj = {};
            shared_1.defineProp(obj, 'b', 'bee');
            chai_1.expect(obj.b).to.equal('bee');
        });
        it("should return the original object with properties added", function () {
            var obj = {};
            var newObj = shared_1.defineProp(obj, 'a', 'ehh');
            chai_1.expect(newObj.a).to.equal('ehh');
        });
        it("can add new getter property to object by mutating it externally", function () {
            var obj = {};
            shared_1.defineProp(obj, 'a', 'ehh');
            chai_1.expect(obj.a).to.equal('ehh');
        });
        it("should not be able to overwrite properties it has already defined by default", function () {
            var obj = {};
            shared_1.defineProp(obj, 'b', 'bee');
            shared_1.defineProp(obj, 'b', 'BEEEEEEE'); // Should not change the value.
            chai_1.expect(obj.b).to.equal('bee');
        });
        it("should not be able to overwrite properties it has already defined if mutable arg = false", function () {
            var obj = {};
            shared_1.defineProp(obj, 'a', 'eh', false);
            shared_1.defineProp(obj, 'a', 'okok', false); // Should not change the value.
            chai_1.expect(obj.a).to.equal('eh');
        });
        it("should be able to overwrite already-defined property if mutable arg was true", function () {
            var obj = {};
            shared_1.defineProp(obj, 'a', 'eh', true);
            shared_1.defineProp(obj, 'a', 'okok', true); // Should change the value.
            chai_1.expect(obj.a).to.equal('okok');
        });
        it("should allow edits & deletion of prop defined w mutable arg 'deletable'", function () {
            var obj = {};
            // Should set the prop.
            var newObj = shared_1.defineProp(obj, 'a', 'eh', 'deletable');
            chai_1.expect(newObj.a).to.equal('eh');
            // Should allow modification of the prop.
            newObj.a = 'ay-eeeee!';
            chai_1.expect(newObj.a).to.equal('ay-eeeee!');
            // Should allow deletion of the prop.
            delete newObj.a;
            chai_1.expect(newObj.a).to.be.undefined;
        });
    });
    describe("omit", function () {
        var testObj = { a: 1, b: 2 };
        var testObjBig = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
        it("return object omitting property with key matching the given string", function () {
            chai_1.expect(shared_1.omit(testObj, 'a')).to.eql({ b: 2 });
            chai_1.expect(shared_1.omit(testObj, 'z')).to.eql(testObj);
        });
        it("given empty object, always returns empty object", function () {
            chai_1.expect(shared_1.omit({}, '')).to.eql({});
            chai_1.expect(shared_1.omit({}, 'asdfaerg')).to.eql({});
            chai_1.expect(shared_1.omit({}, [])).to.eql({});
            chai_1.expect(shared_1.omit({}, ['a'])).to.eql({});
            chai_1.expect(shared_1.omit({}, ['a', 'b', 'c', 'd'])).to.eql({});
        });
        it("return object omitting properties with keys matching the given strings", function () {
            chai_1.expect(shared_1.omit(testObj, ['a'])).to.eql({ b: 2 });
            chai_1.expect(shared_1.omit(testObj, ['a', 'b'])).to.eql({});
            chai_1.expect(shared_1.omit(testObjBig, ['a', 'b', 'd', 'f'])).to.eql({ c: 3, e: 5 });
            chai_1.expect(shared_1.omit(testObjBig, ['b', 'c', 'd'])).to.eql({ a: 1, e: 5, f: 6 });
        });
        it("returns object omitting properties where given predicate returned falsy", function () {
            chai_1.expect(shared_1.omit(testObj, function (val, key) { return key === 'a'; })).to.eql({ a: 1 });
            chai_1.expect(shared_1.omit(testObjBig, function (val) { return val > 3; })).to.eql({ d: 4, e: 5, f: 6 });
        });
        it("returns obj omitting props where predicate->falsy or key matched string", function () {
            chai_1.expect(shared_1.omit(testObjBig, 'e', function (val) { return val > 3; })).to.eql({ d: 4, f: 6 });
        });
        it("returns obj omitting props where predicate->falsy or key matched one of the strings", function () {
            chai_1.expect(shared_1.omit(testObjBig, ['d', 'e'], function (val) { return val > 2; })).to.eql({ c: 3, f: 6 });
        });
    });
});
//# sourceMappingURL=object.spec.js.map