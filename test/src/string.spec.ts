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
        removeMatchingText, chomp,
        eliminateWhitespace, removeWhitespace, rmWhitespace, rmSpaces,
        getBaseFilenameFromPath,
        endsInDotJs, endsInDotTs, endsInDotCss, endsInDotHbs, endsInDotJson, endsInDotJsx,
        endsInDotScss, endsInDotTsx, endsWithExt,
        toSnakeCase, toCamelCase,
        withLeftIndent,
        isWhitespaceChar, isAlphanumericChar, isOperatorChar, matchCharInChars,
        removeSurroundingQuotes, removeSurroundingRegexSlashes,
        isRegexString, getFlagsFromRegexString,
        matchFirst,
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

    it('.capitalize -- returns \'\' if given \'\'', function() {
        expect(capitalize('')).to.eql('');
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
        });
        it(`should replace all matching instances of given RegExp w given replacement`, function() {
            const replacedWRegex = replaceAll(testStr, /[tT]he best/g, 'OK');
            expect(replacedWRegex).to.equal('The duck here is OK Jerry! OK!');
        });
        it(`should leave initial string as-is if no matches found`, function() {
            const replacedWRegex = replaceAll(testStr, /[sS]rsly OK, yagotme\?/g, 'hmmmmm');
            expect(replacedWRegex).to.equal(testStr);
            const replacedWStr = replaceAll(testStr, `I'm not in the test string`, 'REPLACE');
            expect(replacedWStr).to.equal(testStr);
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
        it(`should return true if given a regex to search for, then the returned function is given a string that the regex matches`,
        function() {
            expect(matches(/asdf/)('asdfasdf')).to.be.true;
            expect(matches(/2/)('123')).to.be.true;
            expect(matches(/z/)('z')).to.be.true;
            expect(matches(/z/)('aefaezjtyjrty')).to.be.true;
            expect(matches(/qwerty/)('12345qwertyuiop')).to.be.true;
        });
        it(`should return true if given a regex to search for, then the returned function is given a number that (when converted to string) the regex matches`,
        function() {
            expect(matches(/2/)(123)).to.be.true;
            expect(matches(/\./)(143.234)).to.be.true;
            expect(matches(/3\.2/)(143.234)).to.be.true;
        });
        it(`should return true if given a string predicate, then the returned function is given a string that the predicate matches`,
        function() {
            expect(matches('asdf')('asdfasdf')).to.be.true;
            expect(matches('2')('123')).to.be.true;
            expect(matches('0')('909')).to.be.true;
            expect(matches('z')('z')).to.be.true;
            expect(matches('z')('aefaezjtyjrty')).to.be.true;
        });
        it(`should return false if given a string predicate, then the returned function is given a string that the predicate doesn't match`,
        function() {
            expect(matches('2')('3')).to.be.false;
            expect(matches('88')('18385')).to.be.false;
            expect(matches('0')('1')).to.be.false;
            expect(matches('3987')('1234')).to.be.false;
            expect(matches('abc')('def')).to.be.false;
            expect(matches('zzz')('aaa')).to.be.false;
            expect(matches('xax')('ii')).to.be.false;
        });
        it(`should return true if given a number predicate, then the returned function is given a number that the predicate matches (when both are converted into strings)`,
        function() {
            expect(matches(2)(123)).to.be.true;
            expect(matches(8)(1283)).to.be.true;
            expect(matches(111)(311183)).to.be.true;
            expect(matches(0)(0)).to.be.true;
            expect(matches(1.0)(1.0)).to.be.true;
            expect(matches(1.0)(1)).to.be.true;
        });
        it(`should return false if given a number predicate, then the returned function is given a number that the predicate doesn't match (when both are converted into strings)`,
        function() {
            expect(matches(2)(3)).to.be.false;
            expect(matches(88)(18385)).to.be.false;
            expect(matches(0)(1)).to.be.false;
            expect(matches(3987)(1234)).to.be.false;
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

    describe('removeWhitespace', function() {
        expectFunctionExists(removeWhitespace);
        // Ensure aliases exist.
        expectFunctionExists(eliminateWhitespace);
        expectFunctionExists(rmWhitespace);
        expectFunctionExists(rmSpaces);

        it(`should remove all whitespace from a string (non-mutatively)`, function() {
            expect(removeWhitespace('asdf')).to.eql('asdf');
            expect(removeWhitespace(' asdf ')).to.eql('asdf');
            expect(removeWhitespace(' hello universe! ')).to.eql('hellouniverse!');
            expect(removeWhitespace('        w ')).to.eql('w');
            expect(removeWhitespace('And   Now For   Something     Completely Different     '))
                .to.eql('AndNowForSomethingCompletelyDifferent');
            expect(removeWhitespace('         ')).to.eql('');
        });
    });

    describe('toSnakeCase', function() {
        expectFunctionExists(matchesIgnoreCase);
        expectFunctionExists(toSnakeCase);
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

    describe('toCamelCase', function() {
        expectFunctionExists(toCamelCase);
        it(`returns camelCase form of camelCase string (i.e. it remains camelCase)`, function() {
            expect(toCamelCase('someTestString')).to.eql('someTestString');
        });
        it(`returns camelCase form of PascalCase string`, function() {
            expect(toCamelCase('SomeTestString')).to.eql('someTestString');
        });
        it(`returns camelCase form of dash-case string`, function() {
            expect(toCamelCase('some-test-string')).to.eql('someTestString');
        });
        it(`returns camelCase form of dash-case string with caps`, function() {
            expect(toCamelCase('Some-Test-String')).to.eql('someTestString');
        });
        it(`returns camelCase form of "sentences"`, function() {
            expect(toCamelCase('Some test string')).to.eql('someTestString');
        });
        it(`returns camelCase form of dot.separated.strings (with .s replaced by _s)`, function() {
            expect(toCamelCase('Some.test.string')).to.eql('someTestString');
        });
        it(`returns camelCase form of string preceded by underscores`, function() {
            expect(toCamelCase('_____SomeTestString')).to.eql('someTestString');
        });
        it(`returns camelCase form of string preceded by dashes`, function() {
            expect(toCamelCase('-----SomeTestString')).to.eql('someTestString');
        });
        it(`returns camelCase form of string preceded by dashes & underscores`, function() {
            expect(toCamelCase('-___-SomeTestString')).to.eql('someTestString');
        });
        it(`eliminates apostrophes, ?, !, |, ',', and '.'`, function() {
            expect(toCamelCase('Some,TestString?!?')).to.eql('someTestString');
            expect(toCamelCase("SomeTest'String")).to.eql('someTestString');
            expect(toCamelCase('SomeTest!String')).to.eql('someTestString');
            expect(toCamelCase('SomeTest|||String')).to.eql('someTestString');
            expect(toCamelCase('Some.test,,,,,string"')).to.eql('someTestString');
            expect(toCamelCase('Some.test....string...,"')).to.eql('someTestString');
            expect(toCamelCase('Some.test....??|string...,!!"')).to.eql('someTestString');
            expect(toCamelCase('\'\'\'Some`test`string???!|`"')).to.eql('someTestString');
        });
        it(`eliminates special chars: @#$%^&*_-+\\;:?/~`, function() {
            expect(toCamelCase('Some@Test#String')).to.eql('someTestString');
            expect(toCamelCase('Some$Test%String')).to.eql('someTestString');
            expect(toCamelCase('Some&Test^String')).to.eql('someTestString');
            expect(toCamelCase('\'\'\'Some`test`string???!|`"')).to.eql('someTestString');
            expect(toCamelCase('Some,test,string')).to.eql('someTestString');
            expect(toCamelCase('Some=test=string')).to.eql('someTestString');
            expect(toCamelCase('Some+test+string')).to.eql('someTestString');
            expect(toCamelCase('Some~test~string~~')).to.eql('someTestString');
            expect(toCamelCase('Some\\testString\\')).to.eql('someTestString');
            expect(toCamelCase('Some::::testString;;;;')).to.eql('someTestString');
            expect(toCamelCase('****#**#Some*testString*')).to.eql('someTestString');
            expect(toCamelCase('~SomeTestString')).to.eql('someTestString');
            expect(toCamelCase('~Some~~~~Test~~~string~~~~~;')).to.eql('someTestString');
            expect(toCamelCase('*=+Some~~^^Test~!!!string|||')).to.eql('someTestString');
            expect(toCamelCase('++Some+++++++Test++++++string+++++')).to.eql('someTestString');
        });

        it(`eliminates quotes, capitalizing the first char directly after each quote`, function() {
            expect(toCamelCase('Some"test"string')).to.eql('someTestString');
            expect(toCamelCase('Some"Test"String')).to.eql('someTestString');
            expect(toCamelCase('Some\'Test\'String')).to.eql('someTestString');
            expect(toCamelCase('Some`Test`String')).to.eql('someTestString');
            expect(toCamelCase('Some"Test\'String')).to.eql('someTestString');
            expect(toCamelCase('Some`Test"String')).to.eql('someTestString');
        });

        it(`eliminates braces - {}[]{}<>, capitalizing 1st char directly after each`, function() {
            expect(toCamelCase('Some(test)string')).to.eql('someTestString');
            expect(toCamelCase('(someTestString)')).to.eql('someTestString');
            expect(toCamelCase('[some]testString)')).to.eql('someTestString');
            expect(toCamelCase('[someTest]String)')).to.eql('someTestString');
            expect(toCamelCase('{someTest}string)')).to.eql('someTestString');
            expect(toCamelCase('{someTest)string)')).to.eql('someTestString');
            expect(toCamelCase('{someTest)string]]]])')).to.eql('someTestString');
            expect(toCamelCase('{{{{{someTest)string]]]])')).to.eql('someTestString');
            expect(toCamelCase('{{{{{some()))((Test)string]]]])')).to.eql('someTestString');
            expect(toCamelCase('))))))someTest]]]]]]]string{{{{{{][[]')).to.eql('someTestString');
            expect(toCamelCase('Some<test>string')).to.eql('someTestString');
            expect(toCamelCase('Some>test<string')).to.eql('someTestString');
            expect(toCamelCase('Some>test<string>>>>>><><>>')).to.eql('someTestString');
            expect(toCamelCase('>>>Some>test<string>>>>>><><>>')).to.eql('someTestString');
            expect(toCamelCase('((((SomeTestString>>>>')).to.eql('someTestString');
            expect(toCamelCase('((((<<<<[]SomeTestString))))>>>>')).to.eql('someTestString');
            expect(toCamelCase('{<][<]SomeTestString)<(>(([]<<<<')).to.eql('someTestString');
        });

        it(`returns camelCase form of string preceded or followed by spaces`, function() {
            expect(toCamelCase(' SomeTestString')).to.eql('someTestString');
            expect(toCamelCase('some-test-string ')).to.eql('someTestString');
            expect(toCamelCase(' Some-Test-String ')).to.eql('someTestString');
            expect(toCamelCase('   someTestString      ')).to.eql('someTestString');
            expect(toCamelCase('        Some test string.')).to.eql('someTestString');
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

    describe(`chomp`, function() {
        it(`Removes \n\r from end of string by default (if no 2nd param given)`, function() {
            expect(chomp('asdf\n\r\n\r')).to.eql('asdf');
            expect(chomp('as\n\rdf\n\r\n\r')).to.eql('as\n\rdf');
        });
        it(`Removes all chars in 2nd param from end of string`, function() {
            expect(chomp('asdf\n \r  \n\r', '\n\r ')).to.eql('asdf');
            expect(chomp('  asdf\n \r  \n\r', '\n\r ')).to.eql('  asdf');
            expect(chomp(' \n as\ndf\n \r  \n\r', '\n\r ')).to.eql(' \n as\ndf');
        });
    });

    describe(`removeMatchingText`, function() {
        let str;
        let cleanedStr;
        before(function() {
            str = 'REMHello REMworldREM!';
            cleanedStr = removeMatchingText(str, 'REM');
        });
        it(`Creates copy of string with all instances of matching substring removed`, function() {
            expect(cleanedStr).to.eql('Hello world!');
        });
        it(`Creates copy of string with all instances of matching RegExp removed`, function() {
            expect(removeMatchingText('Gr argh gr', /[gG]r/g)).to.eql(' argh ');
        });
        it(`Does not alter original variable's contents`, function() {
            expect(str).to.eql('REMHello REMworldREM!');
        });
        it(`Returns initial string as-is if no matches found`, function() {
            const initStr = 'Hello world';
            expect(removeMatchingText(initStr, 'grargh')).to.eql(initStr);
        });
    });

    describe(`withLeftIndent -- special string template type`, function() {
        it(`indents single-line string the given number of spaces`, function() {
            expect(withLeftIndent`${4}asdf`).to.equal('    asdf');
            expect(withLeftIndent`${1}asdf`).to.equal(' asdf');
        });
        it(`can indent 0 spaces`, function() {
            expect(withLeftIndent`${0}asdf`).to.equal('asdf');
        });
        testWithLeftIndentMultilineBasic();
        it(`Removes preceding whitespace that exists on every line, replaces with given indent val`, function() {
            expect(withLeftIndent`${4}
                First line
                Second line`
            ).to.eql('    First line\n    Second line')
        });
        it(`Removes preceding whitespace that exists on every line, & adds no indent if indent val is 0`, function() {
            expect(withLeftIndent`${0}
                First line
                Second line`
            ).to.eql('First line\nSecond line')
        });
        it(`Defaults to indent 0`, function() {
            expect(withLeftIndent`
                First line
                Second line`
            ).to.eql('First line\nSecond line')
        });
    });

    describe(`isWhitespaceChar`, function() {
        it(`Returns true given a whitespace character`, function() {
            expect(isWhitespaceChar(' ')).to.be.true;
        });
        it(`Returns true given a newline character`, function() {
            expect(isWhitespaceChar('\n')).to.be.true;
        });
        it(`Returns true given a tab character`, function() {
            expect(isWhitespaceChar('\t')).to.be.true;
        });
        it(`Returns false given a non-whitespace character`, function() {
            expect(isWhitespaceChar('a')).to.be.false;
            expect(isWhitespaceChar('!')).to.be.false;
            expect(isWhitespaceChar('Z')).to.be.false;
            expect(isWhitespaceChar('1')).to.be.false;
            expect(isWhitespaceChar('0')).to.be.false;
        });
        it(`Returns false given multiple characters (even multiple whitespace characters)`, function() {
            expect(isWhitespaceChar('0123123')).to.be.false;
            expect(isWhitespaceChar('  ')).to.be.false;
            expect(isWhitespaceChar(' A ')).to.be.false;
        });
    });

    describe(`isAlphnumericChar`, function() {
        it(`returns true given an alphanumeric character`, function() {
            expect(isAlphanumericChar('a')).to.equal(true);
            expect(isAlphanumericChar('A')).to.equal(true);
            expect(isAlphanumericChar('r')).to.equal(true);
            expect(isAlphanumericChar('R')).to.equal(true);
            expect(isAlphanumericChar('9')).to.equal(true);
            expect(isAlphanumericChar('1')).to.equal(true);
            expect(isAlphanumericChar('0')).to.equal(true);
        });
        it(`returns false given a non-alphanumeric character`, function() {
            expect(isAlphanumericChar('@')).to.equal(false);
            expect(isAlphanumericChar('!')).to.equal(false);
            expect(isAlphanumericChar('_')).to.equal(false);
            expect(isAlphanumericChar('$')).to.equal(false);
            expect(isAlphanumericChar(' ')).to.equal(false);
            expect(isAlphanumericChar('\n')).to.equal(false);
            expect(isAlphanumericChar('\\')).to.equal(false);
            expect(isAlphanumericChar('[')).to.equal(false);
        });
        it(`returns false given multiple characters`, function() {
            expect(isAlphanumericChar('asdf')).to.equal(false);
            expect(isAlphanumericChar('  asdf')).to.equal(false);
            expect(isAlphanumericChar('aerg!ev*#H ')).to.equal(false);
        });
    });

    describe(`isOperatorChar`, function() {
        it(`returns true given an operator character`, function() {
            expect(isOperatorChar('+')).to.equal(true);
            expect(isOperatorChar('-')).to.equal(true);
            expect(isOperatorChar('*')).to.equal(true);
            expect(isOperatorChar('/')).to.equal(true);
            expect(isOperatorChar('%')).to.equal(true);
            expect(isOperatorChar('=')).to.equal(true);
            expect(isOperatorChar('<')).to.equal(true);
            expect(isOperatorChar('>')).to.equal(true);
            expect(isOperatorChar('&')).to.equal(true);
            expect(isOperatorChar('|')).to.equal(true);
            expect(isOperatorChar('!')).to.equal(true);
            expect(isOperatorChar('^')).to.equal(true);
            expect(isOperatorChar('~')).to.equal(true);
            expect(isOperatorChar('?')).to.equal(true);
            expect(isOperatorChar(':')).to.equal(true);
        });
        it(`returns false given a non-operator character`, function() {
            expect(isOperatorChar('y')).to.equal(false);
            expect(isOperatorChar('F')).to.equal(false);
            expect(isOperatorChar('0')).to.equal(false);
            expect(isOperatorChar('1')).to.equal(false);
            expect(isOperatorChar('9')).to.equal(false);
            expect(isOperatorChar('(')).to.equal(false);
            expect(isOperatorChar('$')).to.equal(false);
            expect(isOperatorChar('[')).to.equal(false);
            expect(isOperatorChar('')).to.equal(false);
            expect(isOperatorChar('{')).to.equal(false);
            expect(isOperatorChar(')')).to.equal(false);
            expect(isOperatorChar('#')).to.equal(false);
            expect(isOperatorChar('@')).to.equal(false);
            expect(isOperatorChar('\t')).to.equal(false);
            expect(isOperatorChar(' ')).to.equal(false);
            expect(isOperatorChar('\n')).to.equal(false);
            expect(isOperatorChar('\\')).to.equal(false);
        });
        it(`returns false given multiple characters`, function() {
            expect(isOperatorChar('asdf')).to.equal(false);
            expect(isOperatorChar(' += ')).to.equal(false);
            expect(isOperatorChar('++')).to.equal(false);
            expect(isOperatorChar('*=')).to.equal(false);
            expect(isOperatorChar('<<')).to.equal(false);
            expect(isOperatorChar('>=')).to.equal(false);
        });
    });

    describe(`removeSurroundingQuotes`, function() {
        expectFunctionExists(removeSurroundingQuotes);
        it(`Removes single quotes surrounding a string, ignoring inner single quotes`, function() {
            expect(removeSurroundingQuotes(`'asdf'`)).to.eql('asdf');
            expect(removeSurroundingQuotes(`'as'df'`)).to.eql(`as'df`);
        });
        it(`Removes double quotes surrounding a string, ignoring inner double quotes`, function() {
            expect(removeSurroundingQuotes(`"asdf"`)).to.eql(`asdf`);
            expect(removeSurroundingQuotes(`"as"df"`)).to.eql(`as"df`);
        });
        it(`Removes backticks surrounding a string, ignoring inner backticks`, function() {
            expect(removeSurroundingQuotes("`asdf`")).to.eql("asdf");
            expect(removeSurroundingQuotes("`as`df`")).to.eql("as`df");
        });
    });

    describe(`removeSurroundingRegexSlashes`, function() {
        expectFunctionExists(removeSurroundingRegexSlashes);
        it(`Removes regex slashes surrounding a string when no flags are present`, function() {
            expect(removeSurroundingRegexSlashes('/asdf/')).to.eql('asdf');
        });
        it(`Removes regex slashes surrounding a string and any included flags`, function() {
            expect(removeSurroundingRegexSlashes('/asdf/g')).to.eql('asdf');
            expect(removeSurroundingRegexSlashes('/asdf/mg')).to.eql('asdf');
            expect(removeSurroundingRegexSlashes('/asdf/yumig')).to.eql('asdf');
        });
        it(`Leaves slashes inside a string intact`, function() {
            expect(removeSurroundingRegexSlashes('/asdf/g')).to.eql('asdf');
            expect(removeSurroundingRegexSlashes('/asdf/mg')).to.eql('asdf');
            expect(removeSurroundingRegexSlashes('/asdf/yumig')).to.eql('asdf');
        });
    });

    describe(`isRegexString`, function() {
        expectFunctionExists(isRegexString);
        it(`returns true if string is in regex format with no flags`, function() {
            expect(isRegexString('/asdf/')).to.be.true;
            expect(isRegexString('/asdf_morechars/')).to.be.true;
            expect(isRegexString('/asdf_morechars234/')).to.be.true;
            expect(isRegexString('/asdf_morechars[0-9]]/')).to.be.true;
        });
        it(`returns true if string is in regex format with no flags`, function() {
            expect(isRegexString('/asdf/g')).to.be.true;
            expect(isRegexString('/asdf_morechars/yg')).to.be.true;
            expect(isRegexString('/asdf_morechars234/yum')).to.be.true;
            expect(isRegexString('/asdf_morechars[0-9]/yumig')).to.be.true;
        });
        it(`returns true if string is in regex format with no flags and has \\n vals`, function() {
            expect(isRegexString('/\n_[0-9a-zA-Z]+_\$/')).to.be.true;
        });
        it(`returns true if string is in regex format with flags and has \\n vals`, function() {
            expect(isRegexString('/\n_[0-9a-zA-Z]+_\$/yumig')).to.be.true;
        });
        it(`returns true if given a RegExp object`, function() {
            expect(isRegexString(/asdf/mig)).to.be.true;
            expect(isRegexString(new RegExp('asdf', 'gm'))).to.be.true;
        });
    });

    describe(`getFlagsFromRegexString`, function() {
        expectFunctionExists(getFlagsFromRegexString);
        it(`Returns a string of flag chars from a regex string with flags`, function() {
            expect(getFlagsFromRegexString('/asdfasdf/gm')).to.eql('gm');
            expect(getFlagsFromRegexString('/asdfasdf/yumig')).to.eql('yumig');
        });
        it(`Returns an empty string from a regex string with no flags`, function() {
            expect(getFlagsFromRegexString('/\n_[0-9a-zA-Z]+_\$/')).to.eql('');
            expect(getFlagsFromRegexString('/^[0-9]\*&__[a-z]\+~~/')).to.eql('');
        });
        it(`Returns null given an invalid regex string`, function() {
            expect(getFlagsFromRegexString('\n_[0-9a-zA-Z]+_\$/')).to.be.null;
            expect(getFlagsFromRegexString('_#\!_[0-9A-Z]+_ppQ\$/yumig')).to.be.null;
            expect(getFlagsFromRegexString('asdf')).to.be.null;
            expect(getFlagsFromRegexString('asdf/')).to.be.null;
            expect(getFlagsFromRegexString('/asdf')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/yumiga')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/mG')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/g1')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/h')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/!')).to.be.null;
        });
        it(`Returns null if given a regex string with duplicate flags`, function() {
            expect(getFlagsFromRegexString('/asdf/gg')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/yumiy')).to.be.null;
            expect(getFlagsFromRegexString('/asdf/mgim')).to.be.null;
        });
    });

    describe(`matchFirst`, function() {
        const testStr = 'TEST :: String to search in';
        
        it(`if given a string to find, returns 1st matching substring (it'll always be the ` +
           `string being searched for)`, function() {
            expect(matchFirst(testStr, 'TEST')).to.eql('TEST');
        });
        it(`returns empty string if no match`, function() {
            expect(matchFirst(testStr, 'okokok')).to.eql('');
            expect(matchFirst(testStr, /^should_not_match_anything/)).to.eql('');
        });
        it(`returns first substring matching given RegExp`, function() {
            expect(matchFirst(testStr, /^.+::/g)).to.eql('TEST ::');
            expect(matchFirst(testStr, /search [a-zA-Z]+$/g)).to.eql('search in');
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


/*********************************** MESSY withLeftIndent TESTS ***********************************/
function testWithLeftIndentMultilineBasic() {
    it(`indents each line in multiline string the given number of spaces`, function() {
        expect(defMultilineWithLeftIndentStr1()).to.equal('    asdf\n    asdf');
    });
    it(`does not indent empty lines`, function() {
        expect(defMultilineWithLeftIndentStr2()).to.equal('        asdf\n\n        asdf');
    });
}

function defMultilineWithLeftIndentStr1() {
return withLeftIndent`${4}
asdf
asdf`
}

function defMultilineWithLeftIndentStr2() {
return withLeftIndent`${8}
asdf

asdf`
}