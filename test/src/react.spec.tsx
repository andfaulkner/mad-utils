/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';


/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { IfTruthy, buildNamedSfc } from '../../react';

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(IfTruthy, 'IfTruthy', '(React utility component)');
    expectFunctionExists(buildNamedSfc, 'buildNamedSfc', '(React utility component)');
});
