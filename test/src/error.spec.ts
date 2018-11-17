/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import {m_, error} from '../../shared';

import {error as errorFromNode} from '../../node';
import {error as errorFromBrowser} from '../../browser';
import * as errorModule from '../../src/error';

const err = m_.error;

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    expectNonEmptyObjectExists(error, 'error (from shared/base export)');
    expectNonEmptyObjectExists(m_.error, 'error (from m_ top-level namespace)');
    expectNonEmptyObjectExists(errorModule, 'error (import all from error.ts file)');
    expectNonEmptyObjectExists(errorFromNode, 'error (from Node export)');
    expectNonEmptyObjectExists(errorFromBrowser, 'error (from Browser export)');

    it(`contains functions to get stack items (by number)`, function() {
        expect(error.getFirstStackItem).to.exist;
        expect(error.getSecondStackItem).to.exist;
        expect(error.getThirdStackItem).to.exist;
    });
    it(`contains removeFromStack function to remove matching items from stack`, function() {
        expect(error.removeFromStack).to.exist;
    });
});
