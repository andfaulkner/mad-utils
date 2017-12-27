/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

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
import { createRangeArray, coinFlip, diceRoll6Sided } from '../../src/number';


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
    describe('createRangeArray', function() {
        it(`should create an array of numbers incrementing by 1, by default`, function() {
            expect(createRangeArray(0, 10)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
        it(`should create an array of numbers incrementing by value of 3rd arg`, function() {
            expect(createRangeArray(0, 10, 2)).to.eql([0, 2, 4, 6, 8, 10]);
        });
        it(`should create an array of numbers starting & ending at given values`, function() {
            expect(createRangeArray(-10, 20, 5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });

        it(`should create arr of numbers w/ positive incrementor, & start < end val`, function() {
            expect(createRangeArray(-10, 20, 5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });
        it(`should create arr of numbers w/ positive incrementor, & start > end val`, function() {
            expect(createRangeArray(20, -10, 5)).to.eql([20, 15, 10, 5, 0, -5, -10]);
        });
        it(`should create arr of numbers w/ negative incrementor, & start < end val`, function() {
            expect(createRangeArray(-10, 20, -5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });
        it(`should create arr of numbers w/ negative incrementor, & start > end val`, function() {
            expect(createRangeArray(20, -10, -5)).to.eql([20, 15, 10, 5, 0, -5, -10]);
        });

    });

    describe('coinFlip', function() {
        it(`should produce either HEADS or TAILS every time, & at least 1 of each within 500 runs`, function() {
            let didGetHeads = false;
            let didGetTails = false;
            for (let i = 0; i < 500; i++) {
                if (coinFlip() === 'HEADS') didGetHeads = true;
                if (coinFlip() === 'TAILS') didGetTails = true;
                if (didGetHeads && didGetTails) break;
            }
            expect(didGetHeads).to.be.true;
            expect(didGetTails).to.be.true;
        });
    });

    describe('diceRoll6Sided', function() {
        it(`should output 1, 2, 3, 4, 5, or 6`, function() {
            expect(diceRoll6Sided()).to.be.a('number');
            expect(diceRoll6Sided()).to.be.lessThan(7).and.greaterThan(0);
            const roll = diceRoll6Sided();
            expect(Math.round(roll)).to.eql(roll);
        });
    });
});
