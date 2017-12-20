/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test';

/******************************** IMPORT OBJECT MODULE FOR TESTING ********************************/
import { m_, object, assignFrozenClone, merge, addImmutableProp, addMutableProp,
        numKeys, hasKey, inspectKeyTree,
        eachPair, isMultilangTextObj, get } from '../../shared';
import { expectFunctionExists } from '../../node';

import { object as objectFromNode } from '../../node';
import { object as objectFromBrowser } from '../../browser';
import * as objectModule from '../../src/object';


/********************************************* TESTS **********************************************/
describe(`object sub-module`, function() {
    expectNonEmptyObjectExists(object, 'object (from shared/base export)');
    expectNonEmptyObjectExists(m_.object, 'object (from m_ top-level namespace)');
    expectNonEmptyObjectExists(objectModule, 'object (import all from object.ts file)');
    expectNonEmptyObjectExists(objectFromNode, 'object (from Node export)');
    expectNonEmptyObjectExists(objectFromBrowser, 'object (from Browser export)');

    describe(`.assignFrozenClone -- merge objs into new obj & deepfreeze the result`, function() {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: 3, d: 4 };
        const frozenClonedObj = assignFrozenClone<typeof obj1 & typeof obj2>(obj1, obj2);

        expectFunctionExists(assignFrozenClone);
        expectFunctionExists(m_.object.assignFrozenClone);

        it(`--merges objects`, function() {
            expect(frozenClonedObj).to.have.keys('a', 'b', 'c', 'd');
            expect(frozenClonedObj.a).to.eql(1);
            expect(frozenClonedObj.b).to.eql(2);
            expect(frozenClonedObj.c).to.eql(3);
            expect(frozenClonedObj.d).to.eql(4);
        });
        it(`--does not mutate original objects`, function() {
            expect(obj1).to.not.have.keys('c', 'd');
            expect(obj2).to.not.have.keys('a', 'b');
        });
        it(`--freezes the resultant merged object`, function() {
            expect(() => { (frozenClonedObj as any).e = 'gr' }).to.throw(TypeError);
            expect((frozenClonedObj as any).e).to.not.exist;
        });
    });

    describe('numKeys', function() {
        expectFunctionExists(numKeys);
        expectFunctionExists(m_.object.numKeys);

        it('returns number of keys in an object', function() {
            expect(numKeys({})).to.eql(0);
            expect(numKeys({ a: 'one' })).to.eql(1);
            expect(numKeys({ a: 'one', b: 'two', c: 'three' })).to.eql(3);
        });

        it('returns 0 if given non-object or array or function w/ no keys ' +
           'directly assigned', function()
       {
            expect(numKeys(null)).to.eql(0);
            expect(numKeys(undefined)).to.eql(0);
            expect(numKeys(10)).to.eql(0);
            expect(numKeys('ok')).to.eql(0);
            expect(numKeys([])).to.eql(0);
            expect(numKeys(false)).to.eql(0);
            expect(numKeys(true)).to.eql(0);
        });
    });

    describe(`inspectKeyTree`, function() {
        it(`returns array (and can run without crashing)`, function() {
            expect(inspectKeyTree({})).to.exist;
            expect(inspectKeyTree({})).to.be.an('array');
        });
    });

    describe('eachPair', function() {
        expectFunctionExists(eachPair);
        expectFunctionExists(m_.object.eachPair);
        it(`runs given function taking args (val, key) on each key-value pair in an ` +
            `object`, function()
        {
            let count = 0;
            const testObj = { a: 'eh', b: 'bee', c: 'cee', d: 'dee' };
            eachPair<any>((val, key) => count++)(testObj);
            expect(count).to.eql(4);

            const testObj2 = { a: 1, b: 2, c: 3, d: 4 };
            let total = 0;
            eachPair<any>((val, key) => { total = total + val })(testObj2);
            expect(total).to.eql(10);
        });
    });

    describe('isMultilangTextObj', function() {
        expectFunctionExists(isMultilangTextObj);
        expectFunctionExists(m_.object.isMultilangTextObj);
        it(`should return true if given an object with key en or english (upper or lower case), ` +
            `containing a string`, function()
        {
            expect(isMultilangTextObj({ en: 'hello' })).to.be.true;
            expect(isMultilangTextObj({ En: 'hello' })).to.be.true;
            expect(isMultilangTextObj({ English: 'hello' })).to.be.true;
            expect(isMultilangTextObj({ EngliSh: 'hello' })).to.be.true;
            expect(isMultilangTextObj({ EN: 'hello' })).to.be.true;
        });
        it(`should return true if given an object with key en or english (upper or lower case), ` +
            `containing null`, function()
        {
            expect(isMultilangTextObj({ en: null })).to.be.true;
            expect(isMultilangTextObj({ english: null })).to.be.true;
            expect(isMultilangTextObj({ ENGLISH: null })).to.be.true;
            expect(isMultilangTextObj({ EN: null })).to.be.true;
        });
        it(`should return true if given an object with key fr or french, containing a ` +
            `string`, function()
        {
            expect(isMultilangTextObj({ fr: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ french: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ FR: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ fReNCh: 'bonjour' })).to.be.true;
        });
        it(`should return true if given an object with key fr, containing null`, function() {
            expect(isMultilangTextObj({ fr: null })).to.be.true;
            expect(isMultilangTextObj({ french: null })).to.be.true;
            expect(isMultilangTextObj({ fR: null })).to.be.true;
            expect(isMultilangTextObj({ FRENCH: null })).to.be.true;
        });
        it(`should return true if given an object with keys en & fr (or english and french, or ` +
           `any combination -- in any case), both containing either null or strings`, function()
        {
            expect(isMultilangTextObj({ en: 'hello', fr: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ en: 'hello', fr: null })).to.be.true;
            expect(isMultilangTextObj({ En: null, french: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ engLiSh: 'hello', frENch: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ EN: 'hello', fr: null })).to.be.true;
            expect(isMultilangTextObj({ EN: null, FR: 'bonjour' })).to.be.true;
            expect(isMultilangTextObj({ ENGLISH: null, FRENCH: null })).to.be.true;
        });
        it(`should return true if given an object with numerous keys besides en or fr, but with ` +
            `en included (any combo, in any case), with all containing strings`, function()
        {
            expect(isMultilangTextObj({ za: 'ok', en: 'hello', ge: 'ein' })).to.be.true;
            expect(isMultilangTextObj({ za: 'ok', FRENCH: 'bonjour', ge: 'ein', '1': 'one' }))
                .to.be.true;
        });
        it(`should return false if given object without either key fr or en, or both, or some ` +
            `variant of either`, function()
        {
            expect(isMultilangTextObj({ asdf: 'zzzzz', noteng: 'fr' })).to.be.false;
            expect(isMultilangTextObj({ asdfen: 'enenen', frfrfr: 'french' })).to.be.false;
        });
    });

    describe(`hasKey`, function() {
        expectFunctionExists(m_.object.hasKey);
        expectFunctionExists(hasKey);
        it(`returns true if key exists in object`, function() {
            const obj = { a: 'one' };
            expect(hasKey(obj, 'a')).to.equal(true);
        });
        it(`returns false if key doesn't exist in object`, function() {
            const obj = { a: 'one' };
            expect(hasKey(obj, 'b')).to.equal(false);
        });
        it(`returns false if object doesn't exist`, function() {
            let obj: Object;
            expect(hasKey(obj, 'a')).to.equal(false);
        });
    });

    describe(`get`, function() {
        expectFunctionExists(m_.object.get);
        expectFunctionExists(get);

        const obj1 = { a: 'one' };
        const obj2 = { a: { b: 'innerLvl2' } };
        const obj3 = { a: { b: { c: 'innerLvl3' } } };

        it(`returns matching key in object, when given string propPath w/ dots`, function() {
            expect(get('a', obj1)).to.eql('one');
            expect(get('a.b', obj2)).to.eql('innerLvl2')
            expect(get('a.b.c', obj3)).to.eql('innerLvl3')
        });
        it(`returns matching key in object when given string propPath w/ square braces`, function() {
            expect(get('a[b]', obj2)).to.eql('innerLvl2')
            expect(get('a[b][c]', obj3)).to.eql('innerLvl3')
        });

        it(`returns undefined if key doesn't exist in object & no defVal given`, function() {
            expect(get('b', obj1)).to.be.undefined;
            expect(get('a.b.d.h.j', obj1)).to.be.undefined;
            expect(get('a[j][z][gr]', obj2)).to.be.undefined;
        });
        it(`returns undefined if object doesn't exist & no defVal given`, function() {
            let obj: Object;
            expect(get('a', obj)).to.be.undefined;
        });

        it(`returns undefined if given object with path undefined or undefined`, function() {
            expect(get('a', undefined)).to.be.undefined;
        });

        it(`if given defaultValue, return it if key doesn't exist in object`, function() {
            expect(get('b', obj1, 'DEFAULT')).to.eql('DEFAULT');
            expect(get('a.b.d.h.j', obj1, 'DEFAULT')).to.eql('DEFAULT');
            expect(get('a[j][z][gr]', obj2, 'DEFAULT')).to.eql('DEFAULT');
        });
        it(`if given defaultValue, return it if object doesn't exist`, function() {
            let obj: Object;
            expect(get('b', obj, 'DEFAULT')).to.eql('DEFAULT');
        });

        it(`handles null property by returning undefined or default value`, function() {
            expect(get(null, obj1)).to.be.undefined;
            expect(get(null, obj1, 'DEF')).to.eql('DEF');
        });
        it(`handles undefined property by returning undefined or default value`, function() {
            expect(get(undefined, obj1)).to.be.undefined;
            expect(get(undefined, obj1, 'DEF')).to.eql('DEF');
        });
        it(`handles '' property by returning undefined or default value`, function() {
            expect(get('', obj1)).to.be.undefined;
            expect(get('', obj1, 'DEF')).to.eql('DEF');
        });
    });

    describe(`merge`, function() {
        it(`merges 2 objects together, where each has 1 key-value pair`, function() {
            expect(merge({a: 'a'}, {b: 'b'})).to.eql({ a: 'a', b: 'b' });
        });
        it(`merges 3 objects together, where each has 1 key-value pair`, function() {
            expect(merge({a: 'a'}, {b: 'b'}, {c: 'c'})).to.eql({a: 'a', b: 'b', c: 'c'});
        });
        it(`merges 3 objects together, where each has multiple key-value pairs`, function() {
            expect(merge({a: 'a', b: 'b'}, {c: 'c', d: 'd', e: 'e'})).to.eql(
                         {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'});
        });
        it(`can merge a blank object and an object with contents`, function() {
            expect(merge({}, { a: 'a' })).to.eql({ a: 'a' });
            expect(merge({ a: 'a' }, {})).to.eql({ a: 'a' });
        });
        it(`returns {} if given undefined`, function() {
            expect(merge(undefined)).to.eql({});
        });
        it(`returns {} if given null`, function() {
            expect(merge(null)).to.eql({});
        });
        it(`returns {} if given null`, function() {
            expect(merge(null)).to.eql({});
        });
        it(`merges strings together if given strings`, function() {
            expect(merge('a', 'b', '123')).to.eql('ab123');
        });
        it(`concats arrays if given arrays`, function() {
            expect(merge(['a', 'b', 'cdef'], ['g', 'h'])).to.eql(['a', 'b', 'cdef', 'g', 'h']);
        });
        it(`skips over undefined when merging arrays`, function() {
            expect(merge(['a', 'b', 'cdef'], undefined, ['g', 'h'])).to.eql(
                         ['a', 'b', 'cdef', 'g', 'h']);
        });
        it(`skips over null when merging arrays`, function() {
            expect(merge(['a', 'b', 'cdef'], null, ['g', 'h'])).to.eql(
                         ['a', 'b', 'cdef', 'g', 'h']);
        });

        it(`skips over undefined in 1st arg, & merges rest as arrays if array given as 2nd arg`, function() {
            expect(merge(undefined, ['a', 'b', 'cdef'], ['g', 'h'])).to.eql(
                         ['a', 'b', 'cdef', 'g', 'h']);
        });
        it(`skips over null in 1st arg, & merges rest as arrays if array given as 2nd arg`, function() {
            expect(merge(null, ['a', 'b', 'cdef'], ['g', 'h'])).to.eql(
                         ['a', 'b', 'cdef', 'g', 'h']);
        });
        it(`skips over undefined in 1st arg, & merges rest as objects if object given as 2nd arg`, function() {
            expect(merge(undefined, {a: 'a'}, {b: 'b'})).to.eql({a: 'a', b: 'b'});
        });
        it(`skips over null in 1st arg, & merges rest as objects if object given as 2nd arg`, function() {
            expect(merge(null, {a: 'a'}, {b: 'b'})).to.eql({a: 'a', b: 'b'});
        });
        it(`skips over undefined in 1st arg, & merges rest as strings if string given as 2nd arg`, function() {
            expect(merge(undefined, 'gr', ' ', 'argh')).to.eql('gr argh');
        });
        it(`skips over null in 1st arg, & merges rest as strings if string given as 2nd arg`, function() {
            expect(merge(null, 'gr', ' ', 'argh')).to.eql('gr argh');
        });

        it(`returns {} if given a pile of nulls`, function() {
            expect(merge(null, null, null, null)).to.eql({});
        });
        it(`returns {} if given a pile of undefined values`, function() {
            expect(merge(undefined, undefined, undefined, undefined)).to.eql({});
        });
        it(`returns {} if given a pile of mixed undefined and null values`, function() {
            expect(merge(undefined, null, undefined, undefined, null, null)).to.eql({});
        });
    });


    describe(`addImmutableProp`, function() {
        expectFunctionExists(m_.object.addImmutableProp);
        expectFunctionExists(addImmutableProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = { };
            addImmutableProp(obj, 'a', 'eh');
            expect((obj as any).a).to.equal('eh');
        });
        it(`should not be able to overwrite properties it has already defined`, function() {
            const obj = { };
            addImmutableProp(obj, 'a', 'eh');
            addImmutableProp(obj, 'a', 'okok'); // Should not change the value.
            expect((obj as any).a).to.equal('eh');
        });
        it(`should return the original object with properties added`, function() {
            const obj = { };
            const newObj = addImmutableProp<{ gr: string }, typeof obj>(obj, 'gr', 'argh');
            expect(newObj.gr).to.eql('argh');
        });
    });

    describe(`addMutableProp`, function() {
        expectFunctionExists(m_.object.addMutableProp);
        expectFunctionExists(addMutableProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = { };
            addMutableProp(obj, 'a', 'eh');
            expect((obj as any).a).to.equal('eh');
        });
        it(`should be able to overwrite properties it has already defined`, function() {
            const obj = { };
            addMutableProp(obj, 'a', 'eh');
            addMutableProp(obj, 'a', 'okok'); // Should change the value.
            expect((obj as any).a).to.equal('okok');
        });
        it(`should return the original object with properties added`, function() {
            const obj = { };
            const newObj = addMutableProp<{ gr: string }, typeof obj>(obj, 'gr', 'argh');
            expect(newObj.gr).to.eql('argh');
        });
    });
});
