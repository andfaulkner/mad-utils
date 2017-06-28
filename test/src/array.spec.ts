/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

/************************************* IMPORT TEST UTILITIES **************************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists, expectFunctionExists } from '../../src/node/test';
import { inspect } from 'util';

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { m_, array, append,
        first, second, third,
        last, secondLast, thirdLast,
        first2, first3, firstN,
        last2, last3, lastN,
        arrayN,
        rmAllFalsy, splitLines, without,
        withoutLast, withoutLast2, withoutLast3, withoutLastN,
        withoutFirst, withoutFirst2, withoutFirst3, withoutFirstN,
        removeMatches } from '../../shared';

import { array as arrayFromNode } from '../../node';
import { array as arrayFromBrowser } from '../../browser';
import * as arrayModule from '../../src/array';


/********************************************* TESTS **********************************************/
describe(`array sub-module`, function() {
    expectNonEmptyObjectExists(array, 'array (from shared/base export)');
    expectNonEmptyObjectExists(m_.array, 'array (from m_ top-level namespace)');
    expectNonEmptyObjectExists(arrayModule, 'array (import all from array.ts file)');
    expectNonEmptyObjectExists(arrayFromNode, 'array (from node export)');
    expectNonEmptyObjectExists(arrayFromBrowser, 'array (from browser export)');

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

    describe(`-- #rmAllFalsy`, function() {
        it(`given arr w/ a single falsy val, returns new array w/ the falsy val rm`, function() {
            expect(rmAllFalsy(['one', undefined, 'three'])).to.eql(['one', 'three']);
            expect(rmAllFalsy(['one', 0, 'three'])).to.eql(['one', 'three']);
            expect(rmAllFalsy(['one', '', 'three'])).to.eql(['one', 'three']);
            expect(rmAllFalsy(['one', null, 'three'])).to.eql(['one', 'three']);
            expect(rmAllFalsy(['one', false, 'three'])).to.eql(['one', 'three']);
        });

        it(`given arr w/ multiple falsy vals, returns new array w/ the falsy vals rm`, function() {
            expect(rmAllFalsy(['one', false, false, false, 'three'])).to.eql(['one', 'three']);
            expect(rmAllFalsy([false, false, 'one', false, 'three', false]))
                .to.eql(['one', 'three']);
            expect(rmAllFalsy(['one', null, 'three', null, 'five', undefined]))
                .to.eql(['one', 'three', 'five']);
            expect(rmAllFalsy(['', '', 'one', 0, 'three', null, 'five', undefined, false]))
                .to.eql(['one', 'three', 'five']);
            expect(rmAllFalsy([false, '', '', '', 0, null, undefined, false])).to.eql([]);
        });

        it(`given arr with no falsy vals, returns duplicate of given array`, function() {
            expect(rmAllFalsy(['one', 'two', 'three'])).to.eql(['one', 'two', 'three']);
            expect(rmAllFalsy([true])).to.eql([true]);
            expect(rmAllFalsy([-1, 1, 'x'])).to.eql([-1, 1, 'x']);
            expect(rmAllFalsy([])).to.eql([]);
            expect(rmAllFalsy([{}])).to.eql([{}]);
        });

        it(`treats NaN as falsy & rms it from returned arrays`, function() {
            expect(rmAllFalsy([NaN])).to.eql([]);
            expect(rmAllFalsy([NaN, NaN, NaN])).to.eql([]);
            expect(rmAllFalsy([1, NaN, 3, NaN, 5])).to.eql([1, 3, 5]);
            expect(rmAllFalsy([NaN, NaN, {}, [], NaN, 22, 'ok'])).to.eql([{}, [], 22, 'ok']);
        });
    });

    describe(`-- #splitLines`, function() {
        expectFunctionExists(splitLines);
        expectFunctionExists(m_.array.splitLines);
        it(`splits strings into array, performing a division at each "\\n" char`, function() {
            expect(splitLines('1\n2')).to.eql(['1', '2']);
            expect(splitLines('1\n2\n3')).to.eql(['1', '2', '3']);
            expect(splitLines(' 1 \n2   \n three\n4')).to.eql([' 1 ', '2   ', ' three', '4']);
        });
        it(`excludes empty lines from output array, but includes lines with whitespace chars`, function() {
            expect(splitLines('a\n\nb')).to.eql(['a', 'b']);
            expect(splitLines('a\n\nb\n')).to.eql(['a', 'b']);
            expect(splitLines('\na\n\nb\n')).to.eql(['a', 'b']);
            expect(splitLines('\n \n\n \n ')).to.eql([' ', ' ', ' ']);
        });
        it(`converts empty string into empty array`, function() {
            expect(splitLines('')).to.eql([]);
        });
        it(`converts 'multiline empty' string into empty array`, function() {
            expect(splitLines('\n')).to.eql([]);
            expect(splitLines('\n\n')).to.eql([]);
            expect(splitLines('\n\n\n\n\n\n')).to.eql([]);
        });
    });

    describe(`-- without.last`, function() {
        expectFunctionExists(without.last);
        expectFunctionExists(withoutLast);
        expectFunctionExists(m_.array.withoutLast);
        it(`returns duplicate of given array, with last item excluded`, function() {
            expect(without.last(['a'])).to.eql([]);
            expect(without.last(['a', 2])).to.eql(['a']);
            expect(without.last(['a', 2, null])).to.eql(['a', 2]);
            expect(without.last(['a', 2, null, true])).to.eql(['a', 2, null]);
            expect(without.last(['a', 2, null, true, NaN])).to.eql(['a', 2, null, true]);
            expect(without.last(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null, true, NaN]);
        });
        it(`returns duplicate of given string, with last char excluded`, function() {
            expect(without.last('a')).to.eql('');
            expect(without.last('as')).to.eql('a');
            expect(without.last('asd')).to.eql('as');
            expect(without.last('asdf')).to.eql('asd');
            expect(without.last('asdf ')).to.eql('asdf');
            expect(without.last('asdf 123')).to.eql('asdf 12');
        });
    });

    describe(`-- without.last2`, function() {
        expectFunctionExists(without.last2);
        expectFunctionExists(withoutLast2);
        expectFunctionExists(m_.array.withoutLast2);
        it(`returns duplicate of given array, with last 2 items excluded`, function() {
            expect(without.last2(['a'])).to.eql([]);
            expect(without.last2(['a', 2])).to.eql([]);
            expect(without.last2(['a', 2, null])).to.eql(['a']);
            expect(without.last2(['a', 2, null, true])).to.eql(['a', 2]);
            expect(without.last2(['a', 2, null, true, NaN])).to.eql(['a', 2, null]);
            expect(without.last2(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null, true]);
        });
        it(`returns duplicate of given string, with last 2 chars excluded`, function() {
            expect(without.last2('a')).to.eql('');
            expect(without.last2('as')).to.eql('');
            expect(without.last2('asd')).to.eql('a');
            expect(without.last2('asdf')).to.eql('as');
            expect(without.last2('asdf ')).to.eql('asd');
            expect(without.last2('asdf 123')).to.eql('asdf 1');
        });
    });

    describe(`-- without.last3`, function() {
        expectFunctionExists(without.last3);
        expectFunctionExists(withoutLast3);
        expectFunctionExists(m_.array.withoutLast3);
        it(`returns duplicate of given array, with last 3 items excluded`, function() {
            expect(without.last3(['a'])).to.eql([]);
            expect(without.last3(['a', 2])).to.eql([]);
            expect(without.last3(['a', 2, null])).to.eql([]);
            expect(without.last3(['a', 2, null, true])).to.eql(['a']);
            expect(without.last3(['a', 2, null, true, NaN])).to.eql(['a', 2]);
            expect(without.last3(['a', 2, null, true, NaN, '6'])).to.eql(['a', 2, null]);
        });
        it(`returns duplicate of given string, with last 3 chars excluded`, function() {
            expect(without.last3('a')).to.eql('');
            expect(without.last3('as')).to.eql('');
            expect(without.last3('asd')).to.eql('');
            expect(without.last3('asdf')).to.eql('a');
            expect(without.last3('asdf ')).to.eql('as');
            expect(without.last3('asdf 123')).to.eql('asdf ');
        });
    });

    describe(`-- without.first`, function() {
        expectFunctionExists(without.first);
        expectFunctionExists(withoutFirst);
        expectFunctionExists(m_.array.withoutFirst);
        it(`returns duplicate of given array, with first item excluded`, function() {
            expect(without.first(['a'])).to.eql([]);
            expect(without.first(['a', 2])).to.eql([2]);
            expect(without.first(['a', 2, null])).to.eql([2, null]);
            expect(without.first(['a', 2, null, true])).to.eql([2, null, true]);
            expect(without.first(['a', 2, null, true, NaN])).to.eql([2, null, true, NaN]);
            expect(without.first(['a', 2, null, true, NaN, '6'])).to.eql([2, null, true, NaN, '6']);
        });
        it(`returns duplicate of given string, with first char excluded`, function() {
            expect(without.first('a')).to.eql('');
            expect(without.first('as')).to.eql('s');
            expect(without.first('asd')).to.eql('sd');
            expect(without.first('asdf')).to.eql('sdf');
            expect(without.first('asdf ')).to.eql('sdf ');
            expect(without.first('asdf 123')).to.eql('sdf 123');
        });
    });

    describe(`-- without.first2`, function() {
        expectFunctionExists(without.first2);
        expectFunctionExists(withoutFirst2);
        expectFunctionExists(m_.array.withoutFirst2);
        it(`returns duplicate of given array, with first 2 items excluded`, function() {
            expect(without.first2(['a'])).to.eql([]);
            expect(without.first2(['a', 2])).to.eql([]);
            expect(without.first2(['a', 2, null])).to.eql([null]);
            expect(without.first2(['a', 2, null, true])).to.eql([null, true]);
            expect(without.first2(['a', 2, null, true, NaN])).to.eql([null, true, NaN]);
            expect(without.first2(['a', 2, null, true, NaN, '6'])).to.eql([null, true, NaN, '6']);
        });
        it(`returns duplicate of given string, with first 2 chars excluded`, function() {
            expect(without.first2('a')).to.eql('');
            expect(without.first2('as')).to.eql('');
            expect(without.first2('asd')).to.eql('d');
            expect(without.first2('asdf')).to.eql('df');
            expect(without.first2('asdf ')).to.eql('df ');
            expect(without.first2('asdf 123')).to.eql('df 123');
        });
    });

    describe(`-- without.first3`, function() {
        expectFunctionExists(without.first3);
        expectFunctionExists(withoutFirst3);
        expectFunctionExists(m_.array.withoutFirst3);
        it(`returns duplicate of given array, with first 3 items excluded`, function() {
            expect(without.first3(['a'])).to.eql([]);
            expect(without.first3(['a', 2])).to.eql([]);
            expect(without.first3(['a', 2, null])).to.eql([]);
            expect(without.first3(['a', 2, null, true])).to.eql([true]);
            expect(without.first3(['a', 2, null, true, NaN])).to.eql([true, NaN]);
            expect(without.first3(['a', 2, null, true, NaN, '6'])).to.eql([true, NaN, '6']);
        });
        it(`returns duplicate of given string, with first 3 chars excluded`, function() {
            expect(without.first3('a')).to.eql('');
            expect(without.first3('as')).to.eql('');
            expect(without.first3('asd')).to.eql('');
            expect(without.first3('asdf')).to.eql('f');
            expect(without.first3('asdf ')).to.eql('f ');
            expect(without.first3('asdf 123')).to.eql('f 123');
        });
    });

    describe(`-- without.firstN`, function() {
        expectFunctionExists(without.firstN);
        expectFunctionExists(withoutFirstN);
        expectFunctionExists(m_.array.withoutFirstN);
        it(`returns duplicate of given array, with first N items excluded, where N is a given number`, function() {
            expect(without.firstN([1, 2, 3], 2)).to.eql([3]);
            expect(without.firstN([null, 'two', 'three', 4, 5], 3)).to.eql([4, 5]);
            expect(without.firstN([], 10)).to.eql([]);
            expect(without.firstN(['a'], 0)).to.eql(['a']);
        });
        it(`returns duplicate of given string, with first N chars excluded, where N is a given number`, function() {
            expect(without.firstN('abc', 2)).to.eql('c');
            expect(without.firstN('abcd fg', 3)).to.eql('d fg');
            expect(without.firstN('', 10)).to.eql('');
            expect(without.firstN('a', 0)).to.eql('a');
        });
    });

    describe(`-- without.lastN`, function() {
        expectFunctionExists(without.lastN);
        expectFunctionExists(withoutLastN);
        expectFunctionExists(m_.array.withoutLastN);
        it(`returns duplicate of given array, with last N items excluded, where N is a given number`, function() {
            expect(without.lastN([1, 2, 3], 2)).to.eql([1]);
            expect(without.lastN([null, 'two', 'three', 4, 5], 3)).to.eql([null, 'two']);
            expect(without.lastN([], 10)).to.eql([]);
            expect(without.lastN(['a'], 0)).to.eql(['a']);
        });
        it(`returns duplicate of given string, with last N chars excluded, where N is a given number`, function() {
            expect(without.lastN('abc', 2)).to.eql('a');
            expect(without.lastN('abcd fg', 3)).to.eql('abcd');
            expect(without.lastN('', 10)).to.eql('');
            expect(without.lastN('a', 0)).to.eql('a');
        });
    });

    describe(`-- removeMatches`, function() {
        expectFunctionExists(removeMatches);
        expectFunctionExists(removeMatches);
        expectFunctionExists(m_.array.removeMatches);
        it(`Excludes item given as second parameter from array given as 1st param`, function() {
            expect(removeMatches([1, 2, 3], 2)).to.eql([1, 3]);
            expect(removeMatches([null, 'two', 'three', 4], 'two')).to.eql([null, 'three', 4]);
        });
        it(`Return array given as 1st arg as-is if item given as 2nd arg not found`, function() {
            expect(removeMatches(['a'], 0)).to.eql(['a']);
            expect(removeMatches(['a', 'b', 123], 5435)).to.eql(['a', 'b', 123]);
        });
        it(`Returns empty array if first param is empty array`, function() {
            expect(removeMatches([], '')).to.eql([]);
            expect(removeMatches([], 'asdfasdf')).to.eql([]);
            expect(removeMatches([], null)).to.eql([]);
            expect(removeMatches([], [])).to.eql([]);
            expect(removeMatches([], ['a', '234', '435', 12])).to.eql([]);
        });
        it(`Excludes all items in second arg (array) from array given as 1st arg`, function() {
            expect(removeMatches([1, 2, 3], [2])).to.eql([1, 3]);
            expect(removeMatches([null, 'two', 'three', 4], ['two'])).to.eql([null, 'three', 4]);
            expect(removeMatches([null, 'two', 'three', 4], ['two', 4])).to.eql([null, 'three']);
            expect(removeMatches([null, 'two', 'three', 4], [null, 'two', 4])).to.eql(['three']);
            expect(removeMatches([null, 'two', 'three', 4], [null, 'two', 'three', 4])).to.eql([]);
            expect(removeMatches([null, 'two', 'three', 4], [null, 4, 'two', 'three'])).to.eql([]);
        });
        it(`Excludes items in 2nd arg from 1st arg even if duplicates found in 2nd arg`, function() {
            expect(removeMatches([null, 'two', 'three', 4], [null, 'two', 'two', 4])).to.eql(['three']);
            expect(removeMatches([null, 'two', 'three', 4], [null, 4, 'two', 'three', 4])).to
                .eql([]);
            expect(removeMatches([1, 2, 3, 4], [1, 4, 4, 4, 4, 4, 4, 4])).to.eql([2, 3]);
            expect(removeMatches([1, 2, 3, 4], [1, 4, 4, 4, 4, 4, 4, 4, 2])).to.eql([3]);
            expect(removeMatches([1, 2, 3, 4], [1, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2])).to
                .eql([3]);
        });
    });
});
