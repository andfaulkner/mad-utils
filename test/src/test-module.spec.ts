/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT TESTS MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists, expectEmptyObject} from '../../src/node/test';

import {m_, test} from '../../node';
import {test as testFromNode} from '../../node';
import testModule from '../../src/node/test';

const testHelpers = m_.test;

/********************************************* TESTS **********************************************/
describe(`test sub-module`, function() {
    expectNonEmptyObjectExists(test, 'test (from shared/base export)');
    expectNonEmptyObjectExists(m_.test, 'test (from m_ top-level namespace)');
    expectNonEmptyObjectExists(testModule, 'test (import all from test.ts file)');
    expectNonEmptyObjectExists(testFromNode, 'test (from Node export)');
    expectEmptyObject({});
});
