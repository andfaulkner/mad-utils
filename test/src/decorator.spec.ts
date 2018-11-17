/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists, expectFunctionExists} from '../../src/node/test';

import {m_, decorator} from '../../shared';

import {decorator as decoratorFromNode} from '../../node';
import {decorator as decoratorFromBrowser} from '../../browser';
import * as decoratorModule from '../../src/decorator';
import {getDecoratorType} from '../../src/decorator';

const dec = m_.decorator;

/********************************************* TESTS **********************************************/
describe(`decorator sub-module`, function() {
    expectNonEmptyObjectExists(decorator, 'decorator (from shared/base export)');
    expectNonEmptyObjectExists(m_.decorator, 'decorator (from m_ top-level namespace)');
    expectNonEmptyObjectExists(decoratorModule, 'decorator (import all from decorator.ts file)');
    expectNonEmptyObjectExists(decoratorFromNode, 'decorator (from Node export)');
    expectNonEmptyObjectExists(decoratorFromBrowser, 'decorator (from Browser export)');

    expectFunctionExists(getDecoratorType, `getDecoratorType function in decorator module`);

    describe(`getDecoratorType`, function() {
        it(`returns CLASS if given a function as a single argument`, function() {
            expect(getDecoratorType(() => '')).to.eql('CLASS');
        });

        console.log(`\n\n\n*** decorator.spec :: MORE getDecoratorType TESTS REQUIRED ***\n\n\n`);
    });
});
