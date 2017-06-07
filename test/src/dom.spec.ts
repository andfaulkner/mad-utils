/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/********************************* IMPORT DOM MODULE FOR TESTING **********************************/
import { expect } from 'chai';

import { m_, dom, $ } from '../../browser';

import { dom as domFromBrowser } from '../../browser';
import * as domModule from '../../src/browser/dom';

import { expectNonEmptyObjectExists } from '../../src/node/test'
const docObjModel = m_.dom;


/********************************************* TESTS **********************************************/
describe(`dom sub-module`, function() {
    expectNonEmptyObjectExists(dom, 'dom (from shared/base export)');
    expectNonEmptyObjectExists(m_.dom, 'dom (from m_ top-level namespace)');
    expectNonEmptyObjectExists(domModule, 'dom (import all from dom.ts file)');
    expectNonEmptyObjectExists(domFromBrowser, 'dom (from Browser export)');

    it('-- has document.getElementById stand-in $', function() {
        expect($).to.be.a('function');
        expect(dom.$).to.be.a('function');
        expect(m_.dom.$).to.be.a('function');
    });
});
