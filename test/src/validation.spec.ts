/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists, expectFunctionExists} from '../../src/node/test';

import {m_, validation} from '../../shared';
import {validation as validationFromNode} from '../../node';
import {validation as validationFromBrowser} from '../../browser';
import * as validationModule from '../../src/validation';

/********************************************* TESTS **********************************************/
describe(`validation sub-module`, function() {
    expectNonEmptyObjectExists(validation, 'validation (from shared/base export)');
    expectNonEmptyObjectExists(m_.validation, 'validation (from m_ top-level namespace)');
    expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    expectNonEmptyObjectExists(validationFromNode, 'validation (from Node export)');
    expectNonEmptyObjectExists(validationFromBrowser, 'validation (from Browser export)');
});
