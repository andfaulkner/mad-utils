/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../node';

/******************************* IMPORT FUNCTION MODULE FOR TESTING *******************************/
import { func as functionFromNode } from '../../node';
import { func as functionFromBrowser } from '../../browser';
import * as functionModule from '../../src/function';
import { m_, func, getFnAsArr } from '../../shared';


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
});
