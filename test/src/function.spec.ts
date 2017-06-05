/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { expect } from 'chai';
import { expectFunctionExists } from '../../node';

import { m_, func, getFnAsArr } from '../../shared';

const dec = m_.function;


/********************************************* TESTS **********************************************/
describe(`func sub-module`, function() {
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
