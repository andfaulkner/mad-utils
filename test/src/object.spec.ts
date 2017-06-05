/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT OBJECT MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, object, assignFrozenClone, numKeys, eachPair, isMultilangTextObj } from '../../shared';
import { expectFunctionExists } from '../../node';

const obj = m_.object;

describe(`object sub-module`, function() {
    it(`exists`, function() {
        expect(object).to.exist;
    });
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
});
