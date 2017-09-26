/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { CharInputStream } from '../../src/stream'

import { expectFunctionExists } from '../../src/node/test';

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { CharInputStream as CharInputStream_node } from '../../node';
import { CharInputStream as CharInputStream_browser } from '../../browser';
import { CharInputStream as CharInputStream_shared } from '../../shared';

/********************************************* TESTS **********************************************/
describe(`stream sub-module`, function() {
    expectFunctionExists(CharInputStream, 'CharInputStream can be imported');
    expectFunctionExists(CharInputStream_browser, 'CharInputStream exported from browser submodule');
    expectFunctionExists(CharInputStream_node, 'CharInputStream exported from node submodule');
    expectFunctionExists(CharInputStream_shared, 'CharInputStream exported from shared submodule');

    describe('CharInputStream', function() {
        let inputStream: CharInputStream;
        let firstCharFromPeek: string;
        let firstCharFrom2ndCallToPeek: string;
        let firstCharFromNext: string;
        let secondCharFromPeek: string;
        
        before(function() {
            inputStream = new CharInputStream('Hello! I am test data from CharInputStream!');
            firstCharFromPeek = inputStream.peek();
            firstCharFrom2ndCallToPeek = inputStream.peek();
            firstCharFromNext = inputStream.next();
            secondCharFromPeek = inputStream.peek();
        });

        it(`can be instantiated`, function() {
            expect(inputStream).to.exist;
            expect(inputStream).to.be.a('object');
        });

        it(`returns the next character without discarding it when peek is called`, function() {
            expect(firstCharFromPeek).to.equal(firstCharFrom2ndCallToPeek);
            expect(firstCharFromPeek).to.equal('H');
            expect(firstCharFrom2ndCallToPeek).to.equal('H');
        });

        it(`returns the next char & removes it from left side of stream when next is called`, function() {
            expect(firstCharFromNext).to.eql('H');
            expect(secondCharFromPeek).to.eql('e');
        });
    });
});
