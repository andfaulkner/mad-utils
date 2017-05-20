/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, event, addClickEventToId, removeClickEventFromId } from '../../index';

const ev = m_.event;

/********************************************* TESTS **********************************************/
describe(`event sub-module`, function() {
    it(`exists`, function() {
        expect(event).to.exist;
    });
    it('has function mouseEventFactory, which builds mouse events but does nothing in Node',
        function() {
            const mouseEvent = m_.event.mouseEventFactory();
            expect(mouseEvent).to.be.null; // in node it shouldn't work
        }
    );
    it('has function removeClickEventFromId, which removes click events in browser but does nothing in Node',
        function() {
            expect(removeClickEventFromId()).to.be.null;
            expect(event.removeClickEventFromId()).to.be.null;
            expect(m_.event.removeClickEventFromId()).to.be.null;
        }
    );
    it('has function addClickEventToId, which adds click events in browser but does nothing in Node',
        function() {
            expect(addClickEventToId('', (ev: any) => '')).to.be.null;
            expect(event.addClickEventToId('', (ev: any) => '')).to.be.null;
            expect(m_.event.addClickEventToId('', (ev: any) => '')).to.be.null;
        }
    );
});
