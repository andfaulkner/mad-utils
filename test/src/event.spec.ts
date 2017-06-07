/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/******************************** IMPORT EVENT MODULE FOR TESTING *********************************/
import { m_, event, addClickEventToId, removeClickEventFromId } from '../../browser';
import { event as eventFromBrowser } from '../../browser';
import * as eventModule from '../../src/browser/event';

const ev = m_.event;

/********************************************* TESTS **********************************************/
describe(`event sub-module`, function() {
    expectNonEmptyObjectExists(event, 'event (from shared/base export)');
    expectNonEmptyObjectExists(m_.event, 'event (from m_ top-level namespace)');
    expectNonEmptyObjectExists(eventModule, 'event (import all from event.ts file)');
    expectNonEmptyObjectExists(eventFromBrowser, 'event (from Browser export)');

    it('has function mouseEventFactory, which creates mouse events builder that emits MouseEvent objects if run in browser, but does nothing in Node',
        function() {
            const mouseEvent = m_.event.mouseEventFactory();
            expect(mouseEvent).to.be.null; // in node it shouldn't work
            // TODO test new allowInNode param
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
