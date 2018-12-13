/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/**************************************** TESTING MODULES *****************************************/
import {expect} from 'chai';
import {expectFunctionExists, expectNonEmptyObjectExists} from '../../node';

/******************************** IMPORT SEARCH MODULE FOR TESTING ********************************/
import {m_, search} from '../../shared';
import {escapeRegExp, matches, matchesIgnoreCase, replaceAll, fuzzySearch} from '../../src/search';

import {search as searchFromNode} from '../../node';
import {search as searchFromBrowser} from '../../browser';
import * as searchModule from '../../src/search';

const falseWhen = `should return false when`;
const trueWhen = `should return true when`;

/********************************************* TESTS **********************************************/
describe(`search sub-module`, function() {
    expectNonEmptyObjectExists(search, 'search (from shared/base export)');
    expectNonEmptyObjectExists(m_.search, 'search (from m_ top-level namespace)');
    expectNonEmptyObjectExists(searchModule, 'search (import all from search.ts file)');
    expectNonEmptyObjectExists(searchFromNode, 'search (from Node export)');
    expectNonEmptyObjectExists(searchFromBrowser, 'search (from Browser export)');

    // Existence of several functions exported from string module via search module
    expectFunctionExists(escapeRegExp);
    expectFunctionExists(matches);
    expectFunctionExists(matchesIgnoreCase);
    expectFunctionExists(replaceAll);

    describe(`fuzzySearch`, function() {
        it(`exists`, function() {
            expect(fuzzySearch).to.exist;
        });

        it(`${trueWhen} needle and haystack are the same`, function() {
            expect(fuzzySearch(`asdf`, `asdf`)).to.eql(true);
        });

        it(`${trueWhen} haystack contains needle`, function() {
            expect(fuzzySearch(`asdf`, `12345asdfqwerty`)).to.eql(true);
        });

        it(`should be true when haystack has needle w 2 letters flipped (i.e. error-tolerant)`, function() {
            expect(fuzzySearch(`asdf`, `12345adsfqwerty`)).to.eql(true);
        });

        it(
            `${trueWhen} needle is in haystack, but spread out with other letters between ` +
                `letters of needle (going forwards in haystack)`,
            function() {
                expect(fuzzySearch(`asdf`, `1a23s45d67f89`)).to.eql(true);
            }
        );

        it(`${falseWhen} needle isn't in haystack`, function() {
            expect(fuzzySearch(`asdf`, `123456`)).to.eql(false);
            expect(fuzzySearch(`asdf`, ``)).to.eql(false);
        });

        it(`${trueWhen} needle is an empty string and haystack isn't`, function() {
            expect(fuzzySearch(``, `123456`)).to.eql(true);
            expect(fuzzySearch(``, `123456`)).to.eql(true);
        });

        it(
            `${falseWhen} an earlier needle char is >= 2 chars before a later needle char in ` +
                `haystack, where there are no duplicate chars`,
            function() {
                expect(fuzzySearch(`asdf`, `s12adf3456`)).to.eql(false);
                expect(fuzzySearch(`meeka`, `meea12345k`)).to.eql(false);
            }
        );

        it(
            `${trueWhen} earlier needle char is >= 2 chars before later needle char in haystack, ` +
                `but the earlier needle char is a duplicate of a later needle char`,
            function() {
                expect(fuzzySearch(`meeka`, `0e123meka456789`)).to.eql(true);
            }
        );
    });
});
