"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
require("jsdom-global/register");
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT EVENT MODULE FOR TESTING *********************************/
var browser_1 = require("../../browser");
var browser_2 = require("../../browser");
var eventModule = require("../../src/browser/event");
var ev = browser_1.m_.event;
/********************************************* TESTS **********************************************/
describe("event sub-module", function () {
    test_1.expectNonEmptyObjectExists(browser_1.event, 'event (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.m_.event, 'event (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(eventModule, 'event (import all from event.ts file)');
    test_1.expectNonEmptyObjectExists(browser_2.event, 'event (from Browser export)');
    it('has function mouseEventFactory, which creates mouse events builder that emits MouseEvent objects if run in browser, but does nothing in Node', function () {
        var mouseEvent = browser_1.m_.event.mouseEventFactory();
        chai_1.expect(mouseEvent).to.be.null; // in node it shouldn't work
        // TODO test new allowInNode param
    });
    it('has function removeClickEventFromId, which removes click events in browser but does nothing in Node', function () {
        chai_1.expect(browser_1.removeClickEventFromId()).to.be.null;
        chai_1.expect(browser_1.event.removeClickEventFromId()).to.be.null;
        chai_1.expect(browser_1.m_.event.removeClickEventFromId()).to.be.null;
    });
    it('has function addClickEventToId, which adds click events in browser but does nothing in Node', function () {
        chai_1.expect(browser_1.addClickEventToId('', function (ev) { return ''; })).to.be.null;
        chai_1.expect(browser_1.event.addClickEventToId('', function (ev) { return ''; })).to.be.null;
        chai_1.expect(browser_1.m_.event.addClickEventToId('', function (ev) { return ''; })).to.be.null;
    });
});
//# sourceMappingURL=event.spec.js.map