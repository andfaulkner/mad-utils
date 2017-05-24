/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

//
//  FULLY TESTED
//

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, number } from '../../shared';

const err = m_.number;


/********************************************* TESTS **********************************************/
describe(`number sub-module`, function() {
    it(`exists`, function() {
        expect(number).to.exist;
        console.log(`number:`, number);
    });

    funcExists(number.isInt, 'number.isInt', '(from types-iso');
    funcExists(number.isNumberLike, 'number.isInt', '(from types-iso');
});

/**
 * Function exists if this runs without throwing.
 * @param {Function} func - Function to test
 * @param {string} name? - Name of function {OPTIONAL}
 */
function funcExists(func: Function, name?: string, extraMsg?: string) {
    it(`has function ${name ? name : func.name}${extraMsg ? ' ' + extraMsg : ''}`, function() {
        expect(func).to.exist;
        expect(func).to.be.a('function');
    })
}
