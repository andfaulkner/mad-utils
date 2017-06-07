/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

import { m_, decorator } from '../../shared';

import { decorator as decoratorFromNode } from '../../node';
import { decorator as decoratorFromBrowser } from '../../browser';
import * as decoratorModule from '../../src/decorator';

const dec = m_.decorator;


/********************************************* TESTS **********************************************/
describe(`decorator sub-module`, function() {
    expectNonEmptyObjectExists(decorator, 'decorator (from shared/base export)');
    expectNonEmptyObjectExists(m_.decorator, 'decorator (from m_ top-level namespace)');
    expectNonEmptyObjectExists(decoratorModule, 'decorator (import all from decorator.ts file)');
    expectNonEmptyObjectExists(decoratorFromNode, 'decorator (from Node export)');
    expectNonEmptyObjectExists(decoratorFromBrowser, 'decorator (from Browser export)');
});
