/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('enum.spec.ts', colors.blue.bgMagenta));


/******************************** IMPORT ENUM MODULE FOR TESTING **********************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

import { m_, Enum } from '../../shared';
import { Enum as EnumFromNode } from '../../node';
import { Enum as EnumFromBrowser } from '../../browser';
import * as EnumModule from '../../src/enum';

const en = m_.enum;


/********************************************* TESTS **********************************************/
describe(`enum sub-module`, function() {
    enum ColorTest { BLUE, ReD, black }
    enum Suits { HEARTS, CLUBS, SPADES, DIAMONDS }

    expectNonEmptyObjectExists(Enum, 'Enum (from shared/base export)');
    expectNonEmptyObjectExists(m_.Enum, 'Enum (from m_ top-level namespace)');
    expectNonEmptyObjectExists(EnumModule, 'Enum (import all from Enum.ts file)');
    expectNonEmptyObjectExists(EnumFromNode, 'Enum (from Node export)');
    expectNonEmptyObjectExists(EnumFromBrowser, 'Enum (from Browser export)');

    it('.enumValToString -- Converts an enum item into a string', function() {
        expect(m_.enum.enumValToString(ColorTest, ColorTest.ReD)).to.eql('ReD');
        expect(m_.enum.enumValToString(ColorTest, ColorTest.BLUE)).to.eql('BLUE');
        expect(m_.enum.enumValToString(ColorTest, ColorTest.black)).to.eql('black');
    });

    it('.enumToStringArray -- Converts an enum into an ordered array of strings', function() {
        expect(m_.enum.enumToStringArray(ColorTest)).to.eql(['BLUE', 'ReD', 'black']);
        expect(m_.enum.enumToStringArray(ColorTest)).to.not.eql(['ReD', 'BLUE', 'black']);
    });

    describe('.stringToEnumVal --', function() {
        it('Returns numeric enum val if given enum has given val.', function() {
            expect(m_.enum.stringToEnumVal('black', ColorTest)).to.eql(2);
            expect(m_.enum.stringToEnumVal('HEARTS', Suits)).to.eql(0);
            expect(m_.enum.stringToEnumVal('BLUE', ColorTest)).to.eql(0);
            expect(m_.enum.stringToEnumVal('ReD', ColorTest)).to.eql(1);
            expect(m_.enum.stringToEnumVal('SPADES', Suits)).to.eql(2);
            expect(m_.enum.stringToEnumVal('DIAMONDS', Suits)).to.eql(3);
        });

        it('Ignores caps.', function() {
            expect(m_.enum.stringToEnumVal('Black', ColorTest)).to.eql(2);
            expect(m_.enum.stringToEnumVal('BLACK', ColorTest)).to.eql(2);
            expect(m_.enum.stringToEnumVal('BLaCK', ColorTest)).to.eql(2);
            expect(m_.enum.stringToEnumVal('BluE', ColorTest)).to.eql(0);
            expect(m_.enum.stringToEnumVal('RED', ColorTest)).to.eql(1);
            expect(m_.enum.stringToEnumVal('diamonds', Suits)).to.eql(3);
            expect(m_.enum.stringToEnumVal('dIaMoNDs', Suits)).to.eql(3);
        });

        it('Return 99999 if no match, including indexes', function() {
            expect(m_.enum.stringToEnumVal('O_R_a_N_g_E', ColorTest)).to.eql(99999);
            expect(m_.enum.stringToEnumVal('1', ColorTest)).to.eql(99999);
            expect(m_.enum.stringToEnumVal('0', ColorTest)).to.eql(99999);
            expect(m_.enum.stringToEnumVal('2', Suits)).to.eql(99999);
        });
    });

    // tslint:disable-next-line
    it('.isDataEnumItem -- Detects if a str matches an enum val & accounts for the index vals.)', function() {
        log.silly("isDataEnumItem tests :: Suits['HEARTS']:", Suits['HEARTS']);
        expect(m_.enum.isDataEnumItem('HEARTS', Suits)).to.be.true;

        log.silly("isDataEnumItem tests :: Suits['WRENCHES']:", Suits['WRENCHES']);
        expect(m_.enum.isDataEnumItem('WRENCHES', Suits)).to.be.false;

        log.silly("isDataEnumItem tests :: Suits['1']:", Suits['1']);
        expect(m_.enum.isDataEnumItem('1', Suits)).to.be.false;
        expect(m_.enum.isDataEnumItem('0', Suits)).to.be.false;
        expect(m_.enum.isDataEnumItem(1, Suits)).to.be.false;

        log.silly("isDataEnumItem tests :: Suits[0]:", Suits[0]);
        expect(m_.enum.isDataEnumItem(0, Suits)).to.be.false;
    });
});
