/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import {common as nodeCommon} from '../../node';

/********************************************* TESTS **********************************************/
describe(`common exports sub-module`, function() {
    expectNonEmptyObjectExists(
        nodeCommon,
        'Object with functions most commonly used in Node exported'
    );
});
