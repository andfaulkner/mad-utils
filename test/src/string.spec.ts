/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/************************************* IMPORT TESTING MODULES *************************************/
import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists } from '../../node';

/******************************** IMPORT STRING MODULE FOR TESTING ********************************/
import { m_, string } from '../../shared';

import { string as stringFromNode } from '../../node';
import { string as stringFromBrowser } from '../../browser';
import * as stringModule from '../../src/string';

const str = m_.string;
const { matches, replaceAll, cap1LowerRest, capitalize, escapeRegExp, matchesIgnoreCase,
        eliminateWhitespace, getBaseFilenameFromPath,
        endsInDotJs, endsInDotTs, endsInDotCss, endsInDotHbs, endsInDotJson, endsInDotJsx,
        endsInDotScss, endsInDotTsx, endsWithExt,
        toSnakeCase,
        leftPad, rightPad, centeredPad, pad, _cleanCharToPadWith } = str;

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('string.spec.ts', colors.magenta.bgWhite));


/********************************************* TESTS **********************************************/
describe(`string sub-module`, function() {
    expectNonEmptyObjectExists(string, 'string (from shared/base export)');
    expectNonEmptyObjectExists(m_.string, 'string (from m_ top-level namespace)');
    expectNonEmptyObjectExists(stringModule, 'string (import all from string.ts file)');
    expectNonEmptyObjectExists(stringFromNode, 'string (from Node export)');
    expectNonEmptyObjectExists(stringFromBrowser, 'string (from Browser export)');

    expectFunctionExists(capitalize);
    it('.capitalize -- capitalizes first char of given string', function() {
        expect(m_.string.capitalize('asdf')).to.eql('Asdf');
        expect(m_.str.capitalize('the quick brown fox')).to.eql('The quick brown fox');
        expect(m_.str.capitalize(' quick brown fox')).to.eql(' quick brown fox');
        expect(m_.str.capitalize('Quick brown fox')).to.eql('Quick brown fox');
        expect(m_.str.capitalize('The Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(m_.str.capitalize('the Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(m_.str.capitalize('THE QUICK BROWN FOX')).to.eql('THE QUICK BROWN FOX');
    });

    expectFunctionExists(cap1LowerRest);
    it('.cap1LowerRest -- capitalizes 1st char of given string, turns rest to lowercase', function() {
        expect(m_.string.cap1LowerRest('asdf')).to.eql('Asdf');
        expect(m_.str.cap1LowerRest('the quick brown fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest(' quick brown fox')).to.eql(' quick brown fox');
        expect(m_.str.cap1LowerRest('Quick brown fox')).to.eql('Quick brown fox');
        expect(m_.str.cap1LowerRest('The Quick Brown Fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest('the Quick Brown Fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest('THE QUICK BROWN FOX')).to.eql('The quick brown fox');
    });

    describe('function replaceAll', function() {
        const testStr = 'The duck here is the best Jerry! The best!';

        expectFunctionExists(replaceAll);
        it(`should replace all matching instances of given string w given replacement`, function() {
            const replacedStr = replaceAll(testStr, 'best', 'bees-knees');
            expect(replacedStr).to.equal('The duck here is the bees-knees Jerry! The bees-knees!');

            const replacedWRegex = replaceAll(testStr, /[tT]he best/g, 'OK');
            expect(replacedWRegex).to.equal('The duck here is OK Jerry! OK!');
        });
    });

    describe('function "matches"', function() {
        expectFunctionExists(matches);
        it(`should return true if used as a predicate in a find operation where the string ` +
            `given to match can be found in the array .find is being called on`, function()
        {
            expect(['hello', 'everybody'].some(matches('everybody'))).to.be.true;
            expect([1, 2, 3].some(matches(2))).to.be.true;
            expect(['hello', 'everybody'].some(matches('dr nick'))).to.be.false;
            expect([1, '2', 3].some(matches(2))).to.be.false;
            expect([1, 2, 3].some(matches('2'))).to.be.false;
        });
    });

    describe('escapeRegExp', function() {
        expectFunctionExists(escapeRegExp);
        it(`converts string to form that lets it be used as a pure 'literal' (where special regex` +
            `chars in the string are escaped for use as regular, literal values) when building ` +
            `regexes with new RegExp`, function()
        {
            expect(escapeRegExp('')).to.eql('');
            expect(escapeRegExp('asdf')).to.eql('asdf');
            expect(escapeRegExp('ok[2]')).to.eql('ok\\[2\\]');
            expect(escapeRegExp('*.min.js')).to.eql('\\*\\.min\\.js');

            const filenamesListMatches = 'config/*.ts, src/*.js, build/*.min.js, script/*.js'
                    .match(new RegExp(escapeRegExp('*.js'), 'g'));
            expect(filenamesListMatches).to.eql(['*.js', '*.js']);
        });
    });

    describe('eliminateWhitespace', function() {
        expectFunctionExists(eliminateWhitespace);
        it(`should remove all whitespace from a string (non-mutatively)`, function() {
            expect(eliminateWhitespace('asdf')).to.eql('asdf');
            expect(eliminateWhitespace(' asdf ')).to.eql('asdf');
            expect(eliminateWhitespace(' hello universe! ')).to.eql('hellouniverse!');
            expect(eliminateWhitespace('        w ')).to.eql('w');
            expect(eliminateWhitespace('And   Now For   Something     Completely Different     '))
                .to.eql('AndNowForSomethingCompletelyDifferent');
            expect(eliminateWhitespace('         ')).to.eql('');
        });
    });

    describe('toSnakeCase', function() {
        expectFunctionExists(matchesIgnoreCase);
        it(`returns snake_case form of camelCase string`, function() {
            expect(toSnakeCase('someTestString')).to.eql('some_test_string');
        });
        it(`returns snake_case form of PascalCase string`, function() {
            expect(toSnakeCase('SomeTestString')).to.eql('some_test_string');
        });
        it(`returns snake_case form of dash-case string`, function() {
            expect(toSnakeCase('some-test-string')).to.eql('some_test_string');
        });
        it(`returns snake_case form of dash-case string with caps`, function() {
            expect(toSnakeCase('Some-Test-String')).to.eql('some_test_string');
        });
        it(`returns snake_case form of "sentences"`, function() {
            expect(toSnakeCase('Some test string')).to.eql('some_test_string');
        });
        it(`returns snake_case form of dot.separated.strings (with .s replaced by _s)`, function() {
            expect(toSnakeCase('Some.test.string')).to.eql('some_test_string');
        });
        it(`returns snake_case form of string preceded by underscores`, function() {
            expect(toSnakeCase('_____SomeTestString')).to.eql('some_test_string');
        });
        it(`returns snake_case form of string preceded by dashes`, function() {
            expect(toSnakeCase('-----SomeTestString')).to.eql('some_test_string');
        });
        it(`returns snake_case form of string preceded by dashes & underscores`, function() {
            expect(toSnakeCase('-___-SomeTestString')).to.eql('some_test_string');
        });
        it(`eliminates apostrophes, quotes, ?, !, |, and ,`, function() {
            expect(toSnakeCase('Some,TestString?!?')).to.eql('some_test_string');
            expect(toSnakeCase("SomeTest'String")).to.eql('some_test_string');
            expect(toSnakeCase('SomeTest"String')).to.eql('some_test_string');
            expect(toSnakeCase('SomeTest`String')).to.eql('some_test_string');
            expect(toSnakeCase('S"o\'me,Te|st|.Str!!,in?g!?!?,')).to.eql('some_test_string');
        });
        it(`returns snake_case form of string preceded or followed by spaces`, function() {
            expect(toSnakeCase(' SomeTestString')).to.eql('some_test_string');
            expect(toSnakeCase('some-test-string ')).to.eql('some_test_string');
            expect(toSnakeCase(' Some-Test-String ')).to.eql('some_test_string');
            expect(toSnakeCase('   someTestString      ')).to.eql('some_test_string');
            expect(toSnakeCase('        Some test string.')).to.eql('some_test_string');
        });
    });

    describe('matchesIgnoreCase', function() {
        expectFunctionExists(matchesIgnoreCase);
        it(`returns true if an item in the tested array matches the given string, even if the ` +
            `casing (lower vs upper) is different`, function()
        {
            expect(matchesIgnoreCase('asdf')('asdf')).to.be.true;
            expect(matchesIgnoreCase('AsDf')('asdf')).to.be.true;
            expect(matchesIgnoreCase('asdf')('ASDF')).to.be.true;
            expect(['one', 'two', '3'].find(matchesIgnoreCase('TWO'))).to.eql('two');
        });
    });

    describe(`getBaseFilenameFromPath`, function() {
        it(`should return just the filename given an absolute or relative file path`, function() {
            expect(getBaseFilenameFromPath('file.ts')).to.eql('file.ts');
            expect(getBaseFilenameFromPath('/file.ts')).to.eql('file.ts');
            expect(getBaseFilenameFromPath('./src/somewhere/file.ts')).to.eql('file.ts');
        });
    });

    testMatchFilenameWithExtensionFunction('endsInDotJs', endsInDotJs, 'js', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotJsx', endsInDotJsx, 'jsx', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotTs', endsInDotTs, 'ts', 'js');
    testMatchFilenameWithExtensionFunction('endsInDotTsx', endsInDotTsx, 'tsx', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotJson', endsInDotJson, 'json', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotCss', endsInDotCss, 'css', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotScss', endsInDotScss, 'scss', 'ts');
    testMatchFilenameWithExtensionFunction('endsInDotHbs', endsInDotHbs, 'hbs', 'ts');

    describe('endsWithExt', function() {
        const ext1 = 'js';
        const ext2 = 'md';

        expectFunctionExists(endsWithExt);
        it(`Returns true if a string (presumably a filename) ends in given 1-part extension`, function() {
            expect(endsWithExt('someFile.js', 'js')).to.be.true;
            expect(endsWithExt('path/to/someFile.asdf', 'asdf')).to.be.true;
            expect(endsWithExt('./another/path/to/file.zzz', 'zzz')).to.be.true;
        });

        it(`Returns true if a string (presumably a filename) ends in given 2-part extension`, function() {
            expect(endsWithExt('./type/def/file/file.d.ts', 'd.ts')).to.be.true;
            expect(endsWithExt('./type/def/file/file.d.ts.cache', 'd.ts.cache')).to.be.true;
        });

        it(`Returns true if a string (presumably a filename) ends in given 3-part extension`, function() {
            expect(endsWithExt('./type/def/file/file.d.ts.cache', 'd.ts.cache')).to.be.true;
        });

        it(`Returns true if a string (presumably a filename) ends in given 4-part extension`, function() {
            expect(endsWithExt('./typedef/file.d.ts.cache.lock', 'd.ts.cache.lock')).to.be.true;
        });

        it(`Return false if string (presumably a filename) doesn't end w given ext`, function() {
            expect(endsWithExt('asdf', 'js')).to.be.false;
            expect(endsWithExt('', 'tsx')).to.be.false;
            expect(endsWithExt('./path/to/file.sh', 'bash')).to.be.false;
        });
    });

    describe(`leftPad`, function() {
        it(`adds given char (whitespace) N # of times to left side of given string`, function() {
            const paddedStr1 = leftPad('asdf', 7, ' ');
            expect(paddedStr1).to.eql('   asdf');
        });
        it(`adds given char (nonwhitespace) N # of times on left side of arg string`, function() {
            const paddedStr1 = leftPad('asdf', 7, 'z');
            expect(paddedStr1).to.eql('zzzasdf');
        });
        it(`return string as-is if final expected length less than initial str length`, function() {
            const paddedStr1 = leftPad('qwertyuiop', 5, ' ');
            expect(paddedStr1).to.eql('qwertyuiop');
        });
        it(`if padChar not given, use ' ' by default`, function() {
            const paddedStr1 = leftPad('qwertyuiop', 15);
            expect(paddedStr1).to.eql('     qwertyuiop');
        });
        it(`if length not given, return the string as-is by default`, function() {
            const paddedStr1 = leftPad('qwertyuiop');
            expect(paddedStr1).to.eql('qwertyuiop');
        });
    });

    describe(`rightPad`, function() {
        it(`adds given char (whitespace) N # of times to right side of given string`, function() {
            const paddedStr1 = rightPad('asdf', 7, ' ');
            expect(paddedStr1).to.eql('asdf   ');
        });
        it(`adds given char (nonwhitespace) N # of times on right side of arg string`, function() {
            const paddedStr1 = rightPad('asdfzzz', 7, 'z');
            expect(paddedStr1).to.eql('asdfzzz');
        });
        it(`return string as-is if final expected length less than initial str length`, function() {
            const paddedStr1 = rightPad('qwertyuiop', 5, ' ');
            expect(paddedStr1).to.eql('qwertyuiop');
        });
        it(`if padChar not given, use ' ' by default`, function() {
            const paddedStr1 = rightPad('qwertyuiop', 15);
            expect(paddedStr1).to.eql('qwertyuiop     ');
        });
        it(`if length not given, return the string as-is by default`, function() {
            const paddedStr1 = rightPad('qwertyuiop');
            expect(paddedStr1).to.eql('qwertyuiop');
        });
    });

    describe(`centeredPad`, function() {
        it(`adds given char (whitespace) to both sides of outWidth. Puts half on each side if ` +
            `original string must be expanded by an even number of of chars`, function()
        {
            const paddedStr1 = centeredPad('asdf', 12, 'z');
            expect(paddedStr1).to.eql('zzzzasdfzzzz');
        });
        it(`adds given char (whitespace) to both sides of outWidth. Puts half on each side if ` +
            `original string must be expanded by an even number of of chars. Rounds down for left` +
            `side, & up for right side`, function() {
            const paddedStr1 = centeredPad('asdf', 8, ' ');
            expect(paddedStr1).to.eql('  asdf  ');
        });
        it(`returns string as-is if final expected length less than initial str width`, function() {
            const paddedStr1 = centeredPad('qwertyuiop', 5, ' ');
            log.info(`paddedStr1:`, paddedStr1);
            expect(paddedStr1).to.eql('qwertyuiop');
        });
        it(`if padChar not given, use ' ' by default`, function() {
            const paddedStr1 = centeredPad('qwertyuiop', 16);
            expect(paddedStr1).to.eql('   qwertyuiop   ');
        });
        it(`if length not given, return the string as-is by default`, function() {
            const paddedStr1 = centeredPad('qwertyuiop');
            expect(paddedStr1).to.eql('qwertyuiop');
        });
    });

    describe(`pad`, function() {
        it(`if final arg is 'center', adds given char to both sides of outWidth. Puts 1/2 on each` +
            ` side if original string must be expanded by an even number of of chars`, function()
        {
            const paddedStr1 = pad('asdf', 12, 'z', 'center');
            expect(paddedStr1).to.eql('zzzzasdfzzzz');
        });
        it(`if final arg is 'left' & given char is whitespace, add N # of whitespace chars to ` +
           `left side of given string to pad`, function()
        {
            const paddedStr1 = pad('asdf', 12, ' ', 'left');
            expect(paddedStr1).to.eql('        asdf');
        });
        it(`if final arg is 'right' & given char is a non-whitespace char, add N # of repeats ` +
           `of the char to right side of the given string (i.e. given to fn to pad it)`, function()
        {
            const paddedStr1 = pad('asdf', 12, '|', 'right');
            expect(paddedStr1).to.eql('asdf||||||||');
        });
    });

    describe(`_cleanCharToPadWith (private function)`, function() {
        it(`returns '0' if given 0`, function() {
            expect((_cleanCharToPadWith as any)(0)).to.eql('0');
        });
        it(`returns '0' if given 0`, function() {
            expect((_cleanCharToPadWith as any)(0)).to.eql('0');
        });
    });
});

/**
 * Test an endsWith* function
 */
function testMatchFilenameWithExtensionFunction(
    funcName: string, func: Function, ext: string, nonMatchingExt: string)
{
    describe(`${funcName}`, function() {
        expectFunctionExists(func);
        it(`Returns true if a string (presumably a filename) ends in .${ext}`, function() {
            const matchingFilename1 = `someFile.${ext}`;
            const matchingFilename2 = `somewhere/example/path/another-file.${ext}`;
            expect(func(matchingFilename1)).to.be.true;
            expect(func(matchingFilename2)).to.be.true;
        });

        it(`Returns false if a string (presumably a filename) does not end in .${ext}`, function() {
            const nonMatchingFilename1 = 'does/not/match';
            const nonMatchingFilename2 = 'not-a-${ext}-file';
            const nonMatchingFilename3 =
                `./name-w-${ext}-but-without-extension-${ext}.${nonMatchingExt}`;
            const nonMatchingFilename4 = 'path/to/not-a-${ext}-file-either.${nonMatchingExt}';
            expect(func(nonMatchingFilename1)).to.be.false;
            expect(func(nonMatchingFilename2)).to.be.false;
            expect(func(nonMatchingFilename3)).to.be.false;
            expect(func(nonMatchingFilename4)).to.be.false;
        });
    });
}
