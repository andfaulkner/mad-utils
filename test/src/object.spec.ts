/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, object } from '../index';

const obj = m_.object;

describe(`object sub-module`, function() {
    it(`exists`, function() {
        expect(object).to.exist;
    });
    describe(`.assignFrozenClone -- merge objs into new obj & deepfreeze the result`, function() {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: 3, d: 4 };
        const cloneObj = m_.coll.assignFrozenClone<typeof obj1 & typeof obj2>(obj1, obj2);

        it('--exists', function() {
            expect(m_.coll.assignFrozenClone).to.exist;
        });
        it(`--merges objects`, function() {
            expect(cloneObj).to.have.keys('a', 'b', 'c', 'd');
            expect(cloneObj.a).to.eql(1);
            expect(cloneObj.b).to.eql(2);
            expect(cloneObj.c).to.eql(3);
            expect(cloneObj.d).to.eql(4);
        });
        it(`--does not mutate original objects`, function() {
            expect(obj1).to.not.have.keys('c', 'd');
            expect(obj2).to.not.have.keys('a', 'b');
        });
        it(`--freezes the resultant merged object`, function() {
            expect(() => { (cloneObj as any).e = 'gr' }).to.throw(TypeError);
            expect((cloneObj as any).e).to.not.exist;
        });
    });
});
