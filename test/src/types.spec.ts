/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************* IMPORT TYPES MODULES FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, types as typesIso } from '../../shared';
import { types as typesNode } from '../../node';
import { types as typesBrowser } from '../../browser';


/********************************************* TESTS **********************************************/
describe(`types sub-modules`, function() {
    describe(`types-iso sub-module`, function() {
        it(`exists`, function() {
            expect(typesIso).to.exist;
        });
    });
    describe(`types-browser sub-module`, function() {
        it(`exists`, function() {
            expect(typesBrowser).to.exist;
        });
    });
    describe(`types-node sub-module`, function() {
        it(`exists`, function() {
            expect(typesNode).to.exist;
        });
    });
});
