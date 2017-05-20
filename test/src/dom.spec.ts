/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, dom } from '../index';

const docObjModel = m_.dom;

describe(`dom sub-module`, function() {
    it(`exists`, function() {
        expect(dom).to.exist;
    });
    it('-- has document.getElementById stand-in $', function() {
        expect($).to.be.a('function');
        expect(dom.$).to.be.a('function');
        expect(m_.dom.$).to.be.a('function');
    });
});
