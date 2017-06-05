/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/**************************************** TESTING MODULES *****************************************/
import { expect } from 'chai';
import { expectFunctionExists } from '../../node';

/******************************** IMPORT SEARCH MODULE FOR TESTING ********************************/
import { m_, search } from '../../shared';
import { escapeRegExp, matches, matchesIgnoreCase, replaceAll } from '../../src/search';

/********************************************* TESTS **********************************************/
describe(`search sub-module`, function() {
    it(`exists`, function() {
        expect(search).to.exist;
    });
    // Existence of several functions exported from string module via search module
    expectFunctionExists(escapeRegExp);
    expectFunctionExists(matches);
    expectFunctionExists(matchesIgnoreCase);
    expectFunctionExists(replaceAll);
});
