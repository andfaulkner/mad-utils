/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../node';

/******************************* IMPORT FUNCTION MODULE FOR TESTING *******************************/
import { func as functionFromNode } from '../../node';
import { func as functionFromBrowser } from '../../browser';
import * as functionModule from '../../src/function';
import { m_, func, getFnAsArr, condSwitch, loopN } from '../../shared';


/********************************************* TESTS **********************************************/
describe(`func sub-module`, function() {
    expectNonEmptyObjectExists(func, 'function (from shared/base export)');
    expectNonEmptyObjectExists(m_.function, 'function (from m_ top-level namespace)');
    expectNonEmptyObjectExists(functionModule, 'function (import all from function.ts file)');
    expectNonEmptyObjectExists(functionFromNode, 'function (from Node export)');
    expectNonEmptyObjectExists(functionFromBrowser, 'function (from Browser export)');

    it(`exists`, function() {
        expect(func).to.exist;
        expect(m_.function).to.exist;
    });

    describe(`getFnAsArr function`, function() {
        expectFunctionExists(getFnAsArr);
        it(`Displays the source code of a function in an array, with 1 item per line`, function() {
            function exampleFunction() {
                console.log('I am an example');
            }
            const exampleFunctionFnArr = func.getFnAsArr(exampleFunction);
            expect(exampleFunctionFnArr).to.be.length(3);
            expect(exampleFunctionFnArr).to.be.an('array');
            expect(exampleFunctionFnArr[0]).to.match(/function exampleFunction\(\)/);
            expect(exampleFunctionFnArr[1]).to.match(/console\.log\('I am an example'\);/);
            expect(exampleFunctionFnArr[2]).to.match(/\}/);
        });
    });

    describe(`condSwitch function`, function() {
        expectFunctionExists(condSwitch);
        it(`Returns the 2nd arg if the 1st arg is truthy`, function() {
            expect(condSwitch(true, 'val1', 'elseVal')).to.eql('val1');
            expect(condSwitch(true, 'val1', true, 'arg2', true, 'arg3', 'elseVal')).to.eql('val1');
            expect(condSwitch('cond1', 'val1', 'cond2', 'val2', 'cond3', 'val3', 'elseVal')).to.eql('val1');
        });
        it(`Returns the 3rd arg if the 1st arg is falsy and only 3 args were given`, function() {
            expect(condSwitch(false, 'val1', 'elseVal')).to.eql('elseVal');
        });
        it(`Returns the last arg if all other 'condition' args are falsy`, function() {
            expect(condSwitch(false, 'val1', undefined, 'val2', 'elseVal')).to.eql('elseVal');
            expect(condSwitch(0, 'v1', null, 'v2', NaN, 'v3', 'elseVal')).to.eql('elseVal');
            expect(condSwitch('', 'v1', false, 'v2', null, 'v3', 'elseVal')).to.eql('elseVal');
        });
        it(`Allows any odd number of conditions`, function() {
            expect(condSwitch(
                '' + '', 'val1',    undefined, 'val2',
                      0, 'val3',    null,      'val4',
                    NaN, 'val5',    '',        'val6',
                  false, 'val7',    0 + 0,     'val8',  'elseVal')).to.eql('elseVal');
            const nan = '' as any / 0;
            expect(condSwitch(
                '' + '', 'val1',    undefined, 'val2',
                      0, 'val3',    null,      'val4',
                    NaN, 'val5',    '',        'val6',
                  false, 'val7',    0 + 0,     'val8',
                  0 - 0, 'val9',    1 - 1,     'val10',
                    nan, 'val11',   0 * 0,     'val12',
                  0 / 0, 'val13',   10099 * 0, 'val14',  'elseVal')).to.eql('elseVal');
            expect(condSwitch(
                '' + '', 'val1',    undefined, 'val2',
                      0, 'val3',    null,      'val4',
                    NaN, 'val5',    '',        'val6',
                  false, 'val7',    0 + 0,     'val8',
                  0 - 0, 'val9',    1 - 1,     'val10',
                   true, 'val11',   0 * 0,     'val12',
                  0 / 0, 'val13',   10099 * 0, 'val14',  'elseVal')).to.eql('val11');
        });
        it(`allows an even number of conditions as long as at least one condition returns truthy`, function() {
            expect(condSwitch(true, 'v1', false, 'v2')).to.eql('v1');
            expect(condSwitch(false, 'v1', true, 'v2', 'c3', 'v3')).to.eql('v2');
            expect(condSwitch(false, 'v1', null, 'v2', 0, 'v3', 'c4', 'v4')).to.eql('v4');
        });
        it(`throws if given an even number of conditions and no conditions are truthy`, function() {
            expect(() => condSwitch(0, 'v1', false, 'v2')).to.throw(Error);
            expect(() => condSwitch(null, 'v1', false, 'v2', '', 'v3')).to.throw(Error);
            expect(() => condSwitch(false, 'v1', null, 'v2', '', 'v3', 0, 'v4')).to.throw(Error);
        });
    });

    describe(`loopN`, function() {
        it(`runs given function requested # of times, & returns array holding all return values.`, function() {
            expect(loopN(2, () => 'return_value')).to.eql(['return_value', 'return_value']);
            let i = 0;
            expect(loopN(3, () => ++i)).to.eql([1, 2, 3]);
            expect(i).to.eql(3);

            let j = 0;
            expect(loopN(15, () => j++)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            expect(j).to.eql(15);
        });
    });
});
