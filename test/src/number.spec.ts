/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

//
//  FULLY TESTED
//

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';


/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { m_, number } from '../../shared';
import { number as numberFromNode } from '../../node';
import { number as numberFromBrowser, uuid } from '../../browser';
import * as numberModule from '../../src/number';


/********************************************* TESTS **********************************************/
describe(`number sub-module`, function() {
    expectNonEmptyObjectExists(number, 'number (from shared/base export)');
    expectNonEmptyObjectExists(m_.number, 'number (from m_ top-level namespace)');
    expectNonEmptyObjectExists(numberModule, 'number (import all from number.ts file)');
    expectNonEmptyObjectExists(numberFromNode, 'number (from Node export)');
    expectNonEmptyObjectExists(numberFromBrowser, 'number (from Browser export)');

    expectFunctionExists(number.isInt, 'number.isInt', '(from types-iso');
    expectFunctionExists(number.isNumberLike, 'number.isInt', '(from types-iso');
    expectFunctionExists(number.uuid, 'number.uuid', '(from number)');

    describe('uuid', function() {
        it(`generates a valid UUID if run as a function`, function() {
            const testUuid1 = number.uuid();
            console.log(`\n    number.uuid: testUuid1:`, testUuid1);
            expect(testUuid1).to.exist;
            expect(testUuid1).to.be.a('string');
            expect(testUuid1)
                .to.match(/^[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}$/);
        });

        expectFunctionExists(uuid.len6, 'uuid.len6');
        expectFunctionExists(uuid.len8, 'uuid.len8');
        expectFunctionExists(uuid.noDashes, 'uuid.noDashes');

        it(`.len6 -- `, function() {
            expect(uuid.len6()).to.be.a('string');
            expect(uuid.len6()).to.have.length(6);
            expect(uuid.len8).to.exist;
        });

        it(`.len8 -- `, function() {
            expect(uuid.len8()).to.be.a('string');
            expect(uuid.len8()).to.have.length(8);
        });

        it(`.noDashes -- `, function() {
            expect(uuid.noDashes()).to.be.a('string');
            expect(uuid.noDashes()).to.have.length(32);
            expect(uuid.noDashes()).not.to.contain('-');
        });
    });
});
