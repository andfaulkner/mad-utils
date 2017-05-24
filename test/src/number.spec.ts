/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

//
//  FULLY TESTED
//

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists } from '../../src/node/test';


/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/

import { m_, number } from '../../shared';


const err = m_.number;


/********************************************* TESTS **********************************************/
describe(`number sub-module`, function() {
    it(`exists`, function() {
        expect(number).to.exist;
        console.log(`number:`, number);
    });

    expectFunctionExists(number.isInt, 'number.isInt', '(from types-iso');
    expectFunctionExists(number.isNumberLike, 'number.isInt', '(from types-iso');
});
