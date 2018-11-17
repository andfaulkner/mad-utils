/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/**************************************** TESTING MODULES *****************************************/
import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../node';

/******************************** IMPORT SEARCH MODULE FOR TESTING ********************************/
import { m_, search } from '../../shared';
import { escapeRegExp, matches, matchesIgnoreCase, replaceAll } from '../../src/search';

import { search as searchFromNode } from '../../node';
import { search as searchFromBrowser } from '../../browser';
import searchModule from '../../src/search';

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
});
