/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { common as nodeCommon } from '../../node';
import { common as browserCommon } from '../../browser';
import { commonShared as sharedCommon } from '../../shared';

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    expectNonEmptyObjectExists(nodeCommon,
        'Object with functions most commonly used in Node exported');
    expectNonEmptyObjectExists(browserCommon,
        'Object with functions most commonly used in browser exported');
    expectNonEmptyObjectExists(sharedCommon,
        'Object with functions used commonly in all environments exported');
});
