/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, array, append, first, second, third, last, last2, last3, lastN, secondLast, thirdLast,
        first2, first3, firstN, arrayN, rmAllFalsy, splitLines } from '../../shared';
import { inspect } from 'util';

const arr = m_.array;

/********************************************* TESTS **********************************************/
describe(`array sub-module`, function() {
    it(`exists`, function() {
        expect(array).to.exist;
    });

    describe(`-- #append`, function() {
        it(`-- exists : #append`, function() {
            expect(m_.array.append).to.exist;
            expect(append).to.exist;
        });
        it(`.append : merges all given arrays into 1`, function() {
            expect(append([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
            expect(append([1, 2], [3, 4], [5, 6])).to.eql([1, 2, 3, 4, 5, 6]);
            expect(append([1, 2], null, [5, 6])).to.eql([1, 2, 5, 6]);
        });
    });

    describe(`-- #first`, function() {
        it(`exists`, function() {
            expect(m_.array.first).to.exist;
            expect(first).to.exist;
        });
        it(`returns first item in an array`, function() {
            expect(m_.array.first(['one'])).to.eql('one');
            expect(m_.array.first(['one', 'two'])).to.eql('one');
        });
        it(`returns undefined if array is empty`, function() {
            expect(m_.array.first([])).to.be.undefined;
        });
    });
    describe(`-- #second`, function() {
        it(`exists`, function() {
            expect(m_.array.second).to.exist;
            expect(second).to.exist;
        });
        it(`returns second item in an array`, function() {
            expect(m_.array.second(['one', 'two'])).to.eql('two');
            expect(m_.array.second(['one', 'two', 'three'])).to.eql('two');
        });
        it(`returns undefined if array is empty or only has one item`, function() {
            expect(m_.array.second([])).to.be.undefined;
            expect(m_.array.second(['one'])).to.be.undefined;
        });
    });
    describe(`-- #third`, function() {
        it(`exists`, function() {
            expect(m_.array.third).to.exist;
            expect(third).to.exist;
        });
        it(`returns third item in an array`, function() {
            expect(m_.array.third(['one', 'two', 'three'])).to.eql('three');
            expect(m_.array.third(['one', 'two', 'three', 'four'])).to.eql('three');
        });
        it(`returns undefined if array is empty or only has 1 or 2 items`, function() {
            expect(m_.array.third([])).to.be.undefined;
            expect(m_.array.third(['one'])).to.be.undefined;
            expect(m_.array.third(['one', 'two'])).to.be.undefined;
        });
    });

    describe(`-- #last`, function() {
        it(`exists`, function() {
            expect(m_.array.last).to.exist;
            expect(last).to.exist;
        });
        it(`returns last item in an array`, function() {
            expect(m_.array.last(['one'])).to.eql('one');
            expect(m_.array.last(['one', 'two', 'three'])).to.eql('three');
            expect(m_.array.last(['one', 'two', 'three', 'four'])).to.eql('four');
        });
        it(`returns undefined if array is empty`, function() {
            expect(m_.array.last([])).to.be.undefined;
        });
    });

    describe(`-- #secondLast`, function() {
        it(`exists`, function() {
            expect(m_.array.secondLast).to.exist;
            expect(secondLast).to.exist;
        });
        it(`returns second last item in an array`, function() {
            expect(m_.array.secondLast(['one', 'two'])).to.eql('one');
            expect(m_.array.secondLast(['one', 'two', 'three'])).to.eql('two');
            expect(m_.array.secondLast(['one', 'two', 'three', 'four'])).to.eql('three');
        });
        it(`returns undefined if array is empty`, function() {
            expect(m_.array.secondLast([])).to.be.undefined;
        });
    });

    describe(`-- #thirdLast`, function() {
        it(`exists`, function() {
            expect(m_.array.thirdLast).to.exist;
            expect(thirdLast).to.exist;
        });
        it(`returns third last item in an array`, function() {
            expect(m_.array.thirdLast(['one', 'two', 'three'])).to.eql('one');
            expect(m_.array.thirdLast(['one', 'two', 'three', 'four'])).to.eql('two');
            expect(m_.array.thirdLast(['one', 'two', 'three', 'four', 'five'])).to.eql('three');
        });
        it(`returns undefined if array is empty`, function() {
            expect(m_.array.thirdLast([])).to.be.undefined;
        });
    });

    describe(`-- #last2`, function() {
        it(`exists`, function() {
            expect(m_.array.last2).to.exist;
            expect(last2).to.exist;
        });
        it(`returns last 2 items in an array (in array form)`, function() {
            expect(m_.array.last2(['one', 'two'])).to.eql(['one', 'two']);
            expect(m_.array.last2(['one', 'two', 'three'])).to.eql(['two', 'three']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.last2([])).to.eql([]);
        });
        it(`If source array has 1 item, return new array w/ 1 source array item`, function() {
            expect(m_.array.last2(['one'])).to.eql(['one']);
        });
    });
    describe(`-- #last3`, function() {
        it(`exists`, function() {
            expect(m_.array.last3).to.exist;
            expect(last3).to.exist;
        });
        it(`returns last 3 items in an array (in array form)`, function() {
            expect(m_.array.last3(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            expect(m_.array.last3(['one', 'two', '3', 'four'])).to.eql(['two', '3', 'four']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.last3([])).to.eql([]);
        });
        it(`If source array has less than 3 items, return clone of original array`, function() {
            expect(m_.array.last3(['one'])).to.eql(['one']);
            expect(m_.array.last3(['one', 'two'])).to.eql(['one', 'two']);
        });
    });
    describe(`-- #lastN`, function() {
        it(`exists`, function() {
            expect(m_.array.lastN).to.exist;
            expect(lastN).to.exist;
        });
        it(`returns requested # of items from end of source array (in array form)`, function() {
            expect(m_.array.lastN(['one', 'two', 'three'], 1)).to.eql(['three']);
            expect(m_.array.lastN(['one', 'two', 'three'], 2)).to.eql(['two', 'three']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.lastN([], 1)).to.eql([]);
            expect(m_.array.lastN([], 5)).to.eql([]);
        });
        it(`If src array has less than requested # of items, return src array clone`, function() {
            expect(m_.array.lastN(['one'], 2)).to.eql(['one']);
            expect(m_.array.lastN(['one', 'two'], 12)).to.eql(['one', 'two']);
        });
    });

    describe(`-- #first2`, function() {
        it(`exists`, function() {
            expect(m_.array.first2).to.exist;
            expect(first2).to.exist;
        });
        it(`returns first 2 items in an array (in array form)`, function() {
            expect(m_.array.first2(['one', 'two'])).to.eql(['one', 'two']);
            expect(m_.array.first2(['one', 'two', 'three'])).to.eql(['one', 'two']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.first2([])).to.eql([]);
        });
        it(`If source array has 1 item, return new array w/ 1 source array item`, function() {
            expect(m_.array.first2(['one'])).to.eql(['one']);
        });
    });
    describe(`-- #first3`, function() {
        it(`exists`, function() {
            expect(m_.array.first3).to.exist;
            expect(first3).to.exist;
        });
        it(`returns first 3 items in an array (in array form)`, function() {
            expect(m_.array.first3(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            expect(m_.array.first3(['one', 'two', '3', 'four'])).to.eql(['one', 'two', '3']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.first3([])).to.eql([]);
        });
        it(`If source array has less than 3 items, return clone of original array`, function() {
            expect(m_.array.first3(['one'])).to.eql(['one']);
            expect(m_.array.first3(['one', 'two'])).to.eql(['one', 'two']);
        });
    });
    describe(`-- #firstN`, function() {
        it(`exists`, function() {
            expect(m_.array.firstN).to.exist;
            expect(firstN).to.exist;
        });
        it(`returns requested # of items from start of source array (in array form)`, function() {
            expect(m_.array.firstN(['one', 'two', 'three'], 1)).to.eql(['one']);
            expect(m_.array.firstN(['one', 'two', 'three'], 2)).to.eql(['one', 'two']);
        });
        it(`returns empty array if source array is empty`, function() {
            expect(m_.array.firstN([], 1)).to.eql([]);
            expect(m_.array.firstN([], 5)).to.eql([]);
        });
        it(`If src array has less than requested # of items, return src array clone`, function() {
            expect(m_.array.firstN(['one'], 2)).to.eql(['one']);
            expect(m_.array.firstN(['one', 'two'], 12)).to.eql(['one', 'two']);
        });
    });

    describe(`-- #arrayN`, function() {
        it(`exists`, function() {
            expect(m_.array.arrayN).to.exist;
            expect(arrayN).to.exist;
        });
        it(`returns given length array of empty items if run w 1 integer arg`, function() {
            expect(m_.array.arrayN(1)).to.be.length(1);
            expect(m_.array.arrayN(3)).to.be.length(3);
            expect(m_.array.arrayN(3)).to.eql([undefined, undefined, undefined]);
            expect(m_.array.arrayN(1)).to.eql([undefined]);
        });
        it(`returns array containing given number of copies of provided item if run w 2 args: 1 ` +
            `int & 1 other item of any type`, function()
        {
            expect(m_.array.arrayN(1, 'asdf')).to.be.length(1);
            expect(m_.array.arrayN(1, 'asdf')).to.eql(['asdf']);
            expect(m_.array.arrayN(2, {})).to.be.length(2);
            expect(m_.array.arrayN(2, { ok: 'yep'})).to.eql([{ ok: 'yep'}, { ok: 'yep'}]);
            expect(arrayN(4, 5)).to.eql([5, 5, 5, 5]);
        });
        it(`returns empty array if first arg is array of length 0`, function() {
            expect(arrayN(0)).to.be.length(0);
            expect(arrayN(0)).to.eql([]);
            expect(arrayN(0, 'gr')).to.be.length(0);
            expect(arrayN(0, 'gr')).to.eql([]);
        });
        it(`throws if first arg is not an integer, or is below 0`, function() {
            expect(() => arrayN(-1)).to.throw(TypeError);
            expect(() => arrayN(4.12, [])).to.throw(TypeError);
            expect(() => arrayN(4.12, [`this shit ain't gon' fly`])).to.throw(TypeError);
        });
    });

    it(`-- exists : #rmAllFalsy`, function() {
        expect(m_.array.rmAllFalsy).to.exist;
        expect(rmAllFalsy).to.exist;
    });

    it(`-- exists : #splitLines`, function() {
        expect(m_.array.splitLines).to.exist;
        expect(splitLines).to.exist;
    });

    it(`-- exists : #without.last`, function() {
        expect(m_.array.without.last).to.exist;
    });
    it(`-- exists : #without.last2`, function() {
        expect(m_.array.without.last2).to.exist;
    });
    it(`-- exists : #without.last3`, function() {
        expect(m_.array.without.last3).to.exist;
    });
    it(`-- exists : #without.first`, function() {
        expect(m_.array.without.first).to.exist;
    });
    it(`-- exists : #without.first2`, function() {
        expect(m_.array.without.first2).to.exist;
    });
    it(`-- exists : #without.first3`, function() {
        expect(m_.array.without.first3).to.exist;
    });
    it(`-- exists : #without.firstN`, function() {
        expect(m_.array.without.firstN).to.exist;
    });
});
