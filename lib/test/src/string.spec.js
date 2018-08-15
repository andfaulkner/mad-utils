"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/************************************* IMPORT TESTING MODULES *************************************/
var chai_1 = require("chai");
var node_1 = require("../../node");
/******************************** IMPORT STRING MODULE FOR TESTING ********************************/
var shared_1 = require("../../shared");
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var stringModule = require("../../src/string");
var str = shared_1.m_.string;
var matches = str.matches, replaceAll = str.replaceAll, cap1LowerRest = str.cap1LowerRest, capitalize = str.capitalize, escapeRegExp = str.escapeRegExp, matchesIgnoreCase = str.matchesIgnoreCase, removeMatchingText = str.removeMatchingText, chomp = str.chomp, removeWhitespace = str.removeWhitespace, getBaseFilenameFromPath = str.getBaseFilenameFromPath, endsInDotJs = str.endsInDotJs, endsInDotTs = str.endsInDotTs, endsInDotCss = str.endsInDotCss, endsInDotHbs = str.endsInDotHbs, endsInDotJson = str.endsInDotJson, endsInDotJsx = str.endsInDotJsx, endsInDotScss = str.endsInDotScss, endsInDotTsx = str.endsInDotTsx, endsWithExt = str.endsWithExt, toSnakeCase = str.toSnakeCase, toCamelCase = str.toCamelCase, deindent = str.deindent, isWhitespaceChar = str.isWhitespaceChar, isAlphanumericChar = str.isAlphanumericChar, isOperatorChar = str.isOperatorChar, removeSurroundingQuotes = str.removeSurroundingQuotes, removeSlashesFlagsSurroundingRegexString = str.removeSlashesFlagsSurroundingRegexString, isRegexString = str.isRegexString, getFlagsFromRegexString = str.getFlagsFromRegexString, matchFirst = str.matchFirst, leftPad = str.leftPad, rightPad = str.rightPad, centerPad = str.centerPad, pad = str.pad, deburrFrenchEnglish = str.deburrFrenchEnglish;
/******************************************** LOGGING *********************************************/
var node_3 = require("mad-logs/lib/node");
var log = node_3.nodeLogFactory(node_3.buildFileTag('string.spec.ts', node_3.colors.magenta.bgWhite));
/********************************************* TESTS **********************************************/
describe("string sub-module", function () {
    node_1.expectNonEmptyObjectExists(shared_1.string, 'string (from shared/base export)');
    node_1.expectNonEmptyObjectExists(shared_1.m_.string, 'string (from m_ top-level namespace)');
    node_1.expectNonEmptyObjectExists(stringModule, 'string (import all from string.ts file)');
    node_1.expectNonEmptyObjectExists(node_2.string, 'string (from Node export)');
    node_1.expectNonEmptyObjectExists(browser_1.string, 'string (from Browser export)');
    node_1.expectFunctionExists(capitalize);
    it('.capitalize -- capitalizes first char of given string', function () {
        chai_1.expect(shared_1.m_.string.capitalize('asdf')).to.eql('Asdf');
        chai_1.expect(shared_1.m_.str.capitalize('the quick brown fox')).to.eql('The quick brown fox');
        chai_1.expect(shared_1.m_.str.capitalize(' quick brown fox')).to.eql(' quick brown fox');
        chai_1.expect(shared_1.m_.str.capitalize('Quick brown fox')).to.eql('Quick brown fox');
        chai_1.expect(shared_1.m_.str.capitalize('The Quick Brown Fox')).to.eql('The Quick Brown Fox');
        chai_1.expect(shared_1.m_.str.capitalize('the Quick Brown Fox')).to.eql('The Quick Brown Fox');
        chai_1.expect(shared_1.m_.str.capitalize('THE QUICK BROWN FOX')).to.eql('THE QUICK BROWN FOX');
    });
    it(".capitalize -- returns '' if given ''", function () {
        chai_1.expect(capitalize('')).to.eql('');
    });
    node_1.expectFunctionExists(cap1LowerRest);
    it('.cap1LowerRest -- capitalizes 1st char of given string, turns rest to lowercase', function () {
        chai_1.expect(shared_1.m_.string.cap1LowerRest('asdf')).to.eql('Asdf');
        chai_1.expect(shared_1.m_.str.cap1LowerRest('the quick brown fox')).to.eql('The quick brown fox');
        chai_1.expect(shared_1.m_.str.cap1LowerRest(' quick brown fox')).to.eql(' quick brown fox');
        chai_1.expect(shared_1.m_.str.cap1LowerRest('Quick brown fox')).to.eql('Quick brown fox');
        chai_1.expect(shared_1.m_.str.cap1LowerRest('The Quick Brown Fox')).to.eql('The quick brown fox');
        chai_1.expect(shared_1.m_.str.cap1LowerRest('the Quick Brown Fox')).to.eql('The quick brown fox');
        chai_1.expect(shared_1.m_.str.cap1LowerRest('THE QUICK BROWN FOX')).to.eql('The quick brown fox');
    });
    describe('function replaceAll', function () {
        var testStr = 'The duck here is the best Jerry! The best!';
        node_1.expectFunctionExists(replaceAll);
        it("should replace all matching instances of given string w given replacement", function () {
            var replacedStr = replaceAll(testStr, 'best', 'bees-knees');
            chai_1.expect(replacedStr).to.equal('The duck here is the bees-knees Jerry! The bees-knees!');
        });
        it("should replace all matching instances of given RegExp w given replacement", function () {
            var replacedWRegex = replaceAll(testStr, /[tT]he best/g, 'OK');
            chai_1.expect(replacedWRegex).to.equal('The duck here is OK Jerry! OK!');
        });
        it("should leave initial string as-is if no matches found", function () {
            var replacedWRegex = replaceAll(testStr, /[sS]rsly OK, yagotme\?/g, 'hmmmmm');
            chai_1.expect(replacedWRegex).to.equal(testStr);
            var replacedWStr = replaceAll(testStr, "I'm not in the test string", 'REPLACE');
            chai_1.expect(replacedWStr).to.equal(testStr);
        });
    });
    describe('function "matches"', function () {
        node_1.expectFunctionExists(matches);
        it("should return true if used as a predicate in a find operation where the string " +
            "given to match can be found in the array .find is being called on", function () {
            chai_1.expect(['hello', 'everybody'].some(matches('everybody'))).to.be.true;
            chai_1.expect([1, 2, 3].some(matches(2))).to.be.true;
            chai_1.expect(['hello', 'everybody'].some(matches('dr nick'))).to.be.false;
            chai_1.expect([1, '2', 3].some(matches(2))).to.be.false;
            chai_1.expect([1, 2, 3].some(matches('2'))).to.be.false;
        });
        it("should return true if given a regex to search for, then the returned function is given a string that the regex matches", function () {
            chai_1.expect(matches(/asdf/)('asdfasdf')).to.be.true;
            chai_1.expect(matches(/2/)('123')).to.be.true;
            chai_1.expect(matches(/z/)('z')).to.be.true;
            chai_1.expect(matches(/z/)('aefaezjtyjrty')).to.be.true;
            chai_1.expect(matches(/qwerty/)('12345qwertyuiop')).to.be.true;
        });
        it("should return true if given a regex to search for, then the returned function is given a number that (when converted to string) the regex matches", function () {
            chai_1.expect(matches(/2/)(123)).to.be.true;
            chai_1.expect(matches(/\./)(143.234)).to.be.true;
            chai_1.expect(matches(/3\.2/)(143.234)).to.be.true;
        });
        it("should return true if given a string predicate, then the returned function is given a string that the predicate matches", function () {
            chai_1.expect(matches('asdf')('asdfasdf')).to.be.true;
            chai_1.expect(matches('2')('123')).to.be.true;
            chai_1.expect(matches('0')('909')).to.be.true;
            chai_1.expect(matches('z')('z')).to.be.true;
            chai_1.expect(matches('z')('aefaezjtyjrty')).to.be.true;
        });
        it("should return false if given a string predicate, then the returned function is given a string that the predicate doesn't match", function () {
            chai_1.expect(matches('2')('3')).to.be.false;
            chai_1.expect(matches('88')('18385')).to.be.false;
            chai_1.expect(matches('0')('1')).to.be.false;
            chai_1.expect(matches('3987')('1234')).to.be.false;
            chai_1.expect(matches('abc')('def')).to.be.false;
            chai_1.expect(matches('zzz')('aaa')).to.be.false;
            chai_1.expect(matches('xax')('ii')).to.be.false;
        });
        it("should return true if given a number predicate, then the returned function is given a number that the predicate matches (when both are converted into strings)", function () {
            chai_1.expect(matches(2)(123)).to.be.true;
            chai_1.expect(matches(8)(1283)).to.be.true;
            chai_1.expect(matches(111)(311183)).to.be.true;
            chai_1.expect(matches(0)(0)).to.be.true;
            chai_1.expect(matches(1.0)(1.0)).to.be.true;
            chai_1.expect(matches(1.0)(1)).to.be.true;
        });
        it("should return false if given a number predicate, then the returned function is given a number that the predicate doesn't match (when both are converted into strings)", function () {
            chai_1.expect(matches(2)(3)).to.be.false;
            chai_1.expect(matches(88)(18385)).to.be.false;
            chai_1.expect(matches(0)(1)).to.be.false;
            chai_1.expect(matches(3987)(1234)).to.be.false;
        });
    });
    describe('escapeRegExp', function () {
        node_1.expectFunctionExists(escapeRegExp);
        it("converts string to form that lets it be used as a pure 'literal' (where special regex" +
            "chars in the string are escaped for use as regular, literal values) when building " +
            "regexes with new RegExp", function () {
            chai_1.expect(escapeRegExp('')).to.eql('');
            chai_1.expect(escapeRegExp('asdf')).to.eql('asdf');
            chai_1.expect(escapeRegExp('ok[2]')).to.eql('ok\\[2\\]');
            chai_1.expect(escapeRegExp('*.min.js')).to.eql('\\*\\.min\\.js');
            var filenamesListMatches = 'config/*.ts, src/*.js, build/*.min.js, script/*.js'.match(new RegExp(escapeRegExp('*.js'), 'g'));
            chai_1.expect(filenamesListMatches).to.eql(['*.js', '*.js']);
        });
    });
    describe('removeWhitespace', function () {
        node_1.expectFunctionExists(removeWhitespace);
        it("should remove all whitespace from a string (non-mutatively)", function () {
            chai_1.expect(removeWhitespace('asdf')).to.eql('asdf');
            chai_1.expect(removeWhitespace(' asdf ')).to.eql('asdf');
            chai_1.expect(removeWhitespace(' hello universe! ')).to.eql('hellouniverse!');
            chai_1.expect(removeWhitespace('        w ')).to.eql('w');
            chai_1.expect(removeWhitespace('And   Now For   Something     Completely Different     ')).to.eql('AndNowForSomethingCompletelyDifferent');
            chai_1.expect(removeWhitespace('         ')).to.eql('');
        });
    });
    describe('toSnakeCase', function () {
        node_1.expectFunctionExists(matchesIgnoreCase);
        node_1.expectFunctionExists(toSnakeCase);
        it("returns snake_case form of camelCase string", function () {
            chai_1.expect(toSnakeCase('someTestString')).to.eql('some_test_string');
        });
        it("returns snake_case form of PascalCase string", function () {
            chai_1.expect(toSnakeCase('SomeTestString')).to.eql('some_test_string');
        });
        it("returns snake_case form of dash-case string", function () {
            chai_1.expect(toSnakeCase('some-test-string')).to.eql('some_test_string');
        });
        it("returns snake_case form of dash-case string with caps", function () {
            chai_1.expect(toSnakeCase('Some-Test-String')).to.eql('some_test_string');
        });
        it("returns snake_case form of \"sentences\"", function () {
            chai_1.expect(toSnakeCase('Some test string')).to.eql('some_test_string');
        });
        it("returns snake_case form of dot.separated.strings (with .s replaced by _s)", function () {
            chai_1.expect(toSnakeCase('Some.test.string')).to.eql('some_test_string');
        });
        it("returns snake_case form of string preceded by underscores", function () {
            chai_1.expect(toSnakeCase('_____SomeTestString')).to.eql('some_test_string');
        });
        it("returns snake_case form of string preceded by dashes", function () {
            chai_1.expect(toSnakeCase('-----SomeTestString')).to.eql('some_test_string');
        });
        it("returns snake_case form of string preceded by dashes & underscores", function () {
            chai_1.expect(toSnakeCase('-___-SomeTestString')).to.eql('some_test_string');
        });
        it("eliminates apostrophes, quotes, ?, !, |, and ,", function () {
            chai_1.expect(toSnakeCase('Some,TestString?!?')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase("SomeTest'String")).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('SomeTest"String')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('SomeTest`String')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('S"o\'me,Te|st|.Str!!,in?g!?!?,')).to.eql('some_test_string');
        });
        it("returns snake_case form of string preceded or followed by spaces", function () {
            chai_1.expect(toSnakeCase(' SomeTestString')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('some-test-string ')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase(' Some-Test-String ')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('   someTestString      ')).to.eql('some_test_string');
            chai_1.expect(toSnakeCase('        Some test string.')).to.eql('some_test_string');
        });
    });
    describe('toCamelCase', function () {
        node_1.expectFunctionExists(toCamelCase);
        it("returns camelCase form of camelCase string (i.e. it remains camelCase)", function () {
            chai_1.expect(toCamelCase('someTestString')).to.eql('someTestString');
        });
        it("returns camelCase form of PascalCase string", function () {
            chai_1.expect(toCamelCase('SomeTestString')).to.eql('someTestString');
        });
        it("returns camelCase form of dash-case string", function () {
            chai_1.expect(toCamelCase('some-test-string')).to.eql('someTestString');
        });
        it("returns camelCase form of dash-case string with caps", function () {
            chai_1.expect(toCamelCase('Some-Test-String')).to.eql('someTestString');
        });
        it("returns camelCase form of \"sentences\"", function () {
            chai_1.expect(toCamelCase('Some test string')).to.eql('someTestString');
        });
        it("returns camelCase form of dot.separated.strings (with .s replaced by _s)", function () {
            chai_1.expect(toCamelCase('Some.test.string')).to.eql('someTestString');
        });
        it("returns camelCase form of string preceded by underscores", function () {
            chai_1.expect(toCamelCase('_____SomeTestString')).to.eql('someTestString');
        });
        it("returns camelCase form of string preceded by dashes", function () {
            chai_1.expect(toCamelCase('-----SomeTestString')).to.eql('someTestString');
        });
        it("returns camelCase form of string preceded by dashes & underscores", function () {
            chai_1.expect(toCamelCase('-___-SomeTestString')).to.eql('someTestString');
        });
        it("eliminates apostrophes, ?, !, |, ',', and '.'", function () {
            chai_1.expect(toCamelCase('Some,TestString?!?')).to.eql('someTestString');
            chai_1.expect(toCamelCase("SomeTest'String")).to.eql('someTestString');
            chai_1.expect(toCamelCase('SomeTest!String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('SomeTest|||String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some.test,,,,,string"')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some.test....string...,"')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some.test....??|string...,!!"')).to.eql('someTestString');
            chai_1.expect(toCamelCase("'''Some`test`string???!|`\"")).to.eql('someTestString');
        });
        it("eliminates special chars: @#$%^&*_-+\\;:?/~", function () {
            chai_1.expect(toCamelCase('Some@Test#String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some$Test%String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some&Test^String')).to.eql('someTestString');
            chai_1.expect(toCamelCase("'''Some`test`string???!|`\"")).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some,test,string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some=test=string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some+test+string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some~test~string~~')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some\\testString\\')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some::::testString;;;;')).to.eql('someTestString');
            chai_1.expect(toCamelCase('****#**#Some*testString*')).to.eql('someTestString');
            chai_1.expect(toCamelCase('~SomeTestString')).to.eql('someTestString');
            chai_1.expect(toCamelCase('~Some~~~~Test~~~string~~~~~;')).to.eql('someTestString');
            chai_1.expect(toCamelCase('*=+Some~~^^Test~!!!string|||')).to.eql('someTestString');
            chai_1.expect(toCamelCase('++Some+++++++Test++++++string+++++')).to.eql('someTestString');
        });
        it("eliminates quotes, capitalizing the first char directly after each quote", function () {
            chai_1.expect(toCamelCase('Some"test"string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some"Test"String')).to.eql('someTestString');
            chai_1.expect(toCamelCase("Some'Test'String")).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some`Test`String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some"Test\'String')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some`Test"String')).to.eql('someTestString');
        });
        it("eliminates braces - {}[]{}<>, capitalizing 1st char directly after each", function () {
            chai_1.expect(toCamelCase('Some(test)string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('(someTestString)')).to.eql('someTestString');
            chai_1.expect(toCamelCase('[some]testString)')).to.eql('someTestString');
            chai_1.expect(toCamelCase('[someTest]String)')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{someTest}string)')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{someTest)string)')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{someTest)string]]]])')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{{{{{someTest)string]]]])')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{{{{{some()))((Test)string]]]])')).to.eql('someTestString');
            chai_1.expect(toCamelCase('))))))someTest]]]]]]]string{{{{{{][[]')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some<test>string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some>test<string')).to.eql('someTestString');
            chai_1.expect(toCamelCase('Some>test<string>>>>>><><>>')).to.eql('someTestString');
            chai_1.expect(toCamelCase('>>>Some>test<string>>>>>><><>>')).to.eql('someTestString');
            chai_1.expect(toCamelCase('((((SomeTestString>>>>')).to.eql('someTestString');
            chai_1.expect(toCamelCase('((((<<<<[]SomeTestString))))>>>>')).to.eql('someTestString');
            chai_1.expect(toCamelCase('{<][<]SomeTestString)<(>(([]<<<<')).to.eql('someTestString');
        });
        it("returns camelCase form of string preceded or followed by spaces", function () {
            chai_1.expect(toCamelCase(' SomeTestString')).to.eql('someTestString');
            chai_1.expect(toCamelCase('some-test-string ')).to.eql('someTestString');
            chai_1.expect(toCamelCase(' Some-Test-String ')).to.eql('someTestString');
            chai_1.expect(toCamelCase('   someTestString      ')).to.eql('someTestString');
            chai_1.expect(toCamelCase('        Some test string.')).to.eql('someTestString');
        });
    });
    describe('matchesIgnoreCase', function () {
        node_1.expectFunctionExists(matchesIgnoreCase);
        it("returns true if an item in the tested array matches the given string, even if the " +
            "casing (lower vs upper) is different", function () {
            chai_1.expect(matchesIgnoreCase('asdf')('asdf')).to.be.true;
            chai_1.expect(matchesIgnoreCase('AsDf')('asdf')).to.be.true;
            chai_1.expect(matchesIgnoreCase('asdf')('ASDF')).to.be.true;
            chai_1.expect(['one', 'two', '3'].find(matchesIgnoreCase('TWO'))).to.eql('two');
        });
    });
    describe("getBaseFilenameFromPath", function () {
        it("should return just the filename given an absolute or relative file path", function () {
            chai_1.expect(getBaseFilenameFromPath('file.ts')).to.eql('file.ts');
            chai_1.expect(getBaseFilenameFromPath('/file.ts')).to.eql('file.ts');
            chai_1.expect(getBaseFilenameFromPath('./src/somewhere/file.ts')).to.eql('file.ts');
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
    describe('endsWithExt', function () {
        var ext1 = 'js';
        var ext2 = 'md';
        node_1.expectFunctionExists(endsWithExt);
        it("Returns true if a string (presumably a filename) ends in given 1-part extension", function () {
            chai_1.expect(endsWithExt('someFile.js', 'js')).to.be.true;
            chai_1.expect(endsWithExt('path/to/someFile.asdf', 'asdf')).to.be.true;
            chai_1.expect(endsWithExt('./another/path/to/file.zzz', 'zzz')).to.be.true;
        });
        it("Returns true if a string (presumably a filename) ends in given 2-part extension", function () {
            chai_1.expect(endsWithExt('./type/def/file/file.d.ts', 'd.ts')).to.be.true;
            chai_1.expect(endsWithExt('./type/def/file/file.d.ts.cache', 'd.ts.cache')).to.be.true;
        });
        it("Returns true if a string (presumably a filename) ends in given 3-part extension", function () {
            chai_1.expect(endsWithExt('./type/def/file/file.d.ts.cache', 'd.ts.cache')).to.be.true;
        });
        it("Returns true if a string (presumably a filename) ends in given 4-part extension", function () {
            chai_1.expect(endsWithExt('./typedef/file.d.ts.cache.lock', 'd.ts.cache.lock')).to.be.true;
        });
        it("Return false if string (presumably a filename) doesn't end w given ext", function () {
            chai_1.expect(endsWithExt('asdf', 'js')).to.be.false;
            chai_1.expect(endsWithExt('', 'tsx')).to.be.false;
            chai_1.expect(endsWithExt('./path/to/file.sh', 'bash')).to.be.false;
        });
    });
    describe("leftPad", function () {
        it("adds given char (whitespace) N # of times to left side of given string", function () {
            var paddedStr1 = leftPad('asdf', 7, ' ');
            chai_1.expect(paddedStr1).to.eql('   asdf');
        });
        it("adds given char (nonwhitespace) N # of times on left side of arg string", function () {
            var paddedStr1 = leftPad('asdf', 7, 'z');
            chai_1.expect(paddedStr1).to.eql('zzzasdf');
        });
        it("return string as-is if final expected length less than initial str length", function () {
            var paddedStr1 = leftPad('qwertyuiop', 5, ' ');
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
        it("if padChar not given, use ' ' by default", function () {
            var paddedStr1 = leftPad('qwertyuiop', 15);
            chai_1.expect(paddedStr1).to.eql('     qwertyuiop');
        });
        it("if length not given, return the string as-is by default", function () {
            var paddedStr1 = leftPad('qwertyuiop');
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
    });
    describe("rightPad", function () {
        it("adds given char (whitespace) N # of times to right side of given string", function () {
            var paddedStr1 = rightPad('asdf', 7, ' ');
            chai_1.expect(paddedStr1).to.eql('asdf   ');
        });
        it("adds given char (nonwhitespace) N # of times on right side of arg string", function () {
            var paddedStr1 = rightPad('asdfzzz', 7, 'z');
            chai_1.expect(paddedStr1).to.eql('asdfzzz');
        });
        it("return string as-is if final expected length less than initial str length", function () {
            var paddedStr1 = rightPad('qwertyuiop', 5, ' ');
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
        it("if padChar not given, use ' ' by default", function () {
            var paddedStr1 = rightPad('qwertyuiop', 15);
            chai_1.expect(paddedStr1).to.eql('qwertyuiop     ');
        });
        it("if length not given, return the string as-is by default", function () {
            var paddedStr1 = rightPad('qwertyuiop');
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
    });
    describe("centerPad", function () {
        it("adds given char (whitespace) to both sides of outWidth. Puts half on each side if " +
            "original string must be expanded by an even number of of chars", function () {
            var paddedStr1 = centerPad('asdf', 12, 'z');
            chai_1.expect(paddedStr1).to.eql('zzzzasdfzzzz');
        });
        it("adds given char (whitespace) to both sides of outWidth. Puts half on each side if " +
            "original string must be expanded by an even number of of chars. Rounds down for left" +
            "side, & up for right side", function () {
            var paddedStr1 = centerPad('asdf', 8, ' ');
            chai_1.expect(paddedStr1).to.eql('  asdf  ');
        });
        it("returns string as-is if final expected length less than initial str width", function () {
            var paddedStr1 = centerPad('qwertyuiop', 5, ' ');
            log.info("paddedStr1:", paddedStr1);
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
        it("if padChar not given, use ' ' by default", function () {
            var paddedStr1 = centerPad('qwertyuiop', 16);
            chai_1.expect(paddedStr1).to.eql('   qwertyuiop   ');
        });
        it("if length not given, return the string as-is by default", function () {
            var paddedStr1 = centerPad('qwertyuiop');
            chai_1.expect(paddedStr1).to.eql('qwertyuiop');
        });
    });
    describe("pad", function () {
        it("if final arg is 'center', adds given char to both sides of outWidth. Puts 1/2 on each" +
            " side if original string must be expanded by an even number of of chars", function () {
            var paddedStr1 = pad('asdf', 12, 'z', 'center');
            chai_1.expect(paddedStr1).to.eql('zzzzasdfzzzz');
        });
        it("if final arg is 'left' & given char is whitespace, add N # of whitespace chars to " +
            "left side of given string to pad", function () {
            var paddedStr1 = pad('asdf', 12, ' ', 'left');
            chai_1.expect(paddedStr1).to.eql('        asdf');
        });
        it("if final arg is 'right' & given char is a non-whitespace char, add N # of repeats " +
            "of the char to right side of the given string (i.e. given to fn to pad it)", function () {
            var paddedStr1 = pad('asdf', 12, '|', 'right');
            chai_1.expect(paddedStr1).to.eql('asdf||||||||');
        });
    });
    describe("chomp", function () {
        it("Removes \n\r from end of string by default (if no 2nd param given)", function () {
            chai_1.expect(chomp('asdf\n\r\n\r')).to.eql('asdf');
            chai_1.expect(chomp('as\n\rdf\n\r\n\r')).to.eql('as\n\rdf');
        });
        it("Removes all chars in 2nd param from end of string", function () {
            chai_1.expect(chomp('asdf\n \r  \n\r', '\n\r ')).to.eql('asdf');
            chai_1.expect(chomp('  asdf\n \r  \n\r', '\n\r ')).to.eql('  asdf');
            chai_1.expect(chomp(' \n as\ndf\n \r  \n\r', '\n\r ')).to.eql(' \n as\ndf');
        });
    });
    describe("removeMatchingText", function () {
        var str;
        var cleanedStr;
        before(function () {
            str = 'REMHello REMworldREM!';
            cleanedStr = removeMatchingText(str, 'REM');
        });
        it("Creates copy of string with all instances of matching substring removed", function () {
            chai_1.expect(cleanedStr).to.eql('Hello world!');
        });
        it("Creates copy of string with all instances of matching RegExp removed", function () {
            chai_1.expect(removeMatchingText('Gr argh gr', /[gG]r/g)).to.eql(' argh ');
        });
        it("Does not alter original variable's contents", function () {
            chai_1.expect(str).to.eql('REMHello REMworldREM!');
        });
        it("Returns initial string as-is if no matches found", function () {
            var initStr = 'Hello world';
            chai_1.expect(removeMatchingText(initStr, 'grargh')).to.eql(initStr);
        });
        it("Removes match only at beginning or end of string if regexp requests it", function () {
            var initStr = 'Hello old world';
            chai_1.expect(removeMatchingText(initStr, /ld$/g)).to.eql('Hello old wor');
        });
    });
    describe("deindent -- special string template type", function () {
        it("Leaves single-line strings as-is", function () {
            chai_1.expect(deindent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Some test string"], ["Some test string"])))).to.eql("Some test string");
            chai_1.expect(deindent(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])))).to.eql("");
        });
        it("Eliminates one linebreak at start of string", function () {
            chai_1.expect(deindent(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nSome test string"], ["\\nSome test string"])))).to.eql("Some test string");
        });
        it("Eliminates one linebreak at end of string", function () {
            chai_1.expect(deindent(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Some test string\n"], ["Some test string\\n"])))).to.eql("Some test string");
        });
        it("Leaves all linebreaks after the 1st at start or end of string", function () {
            chai_1.expect(deindent(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Some test string\n\n"], ["Some test string\\n\\n"])))).to.eql("Some test string\n");
            chai_1.expect(deindent(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\n\n\nSome test string"], ["\\n\\n\\n\\nSome test string"])))).to.eql("\n\n\nSome test string");
            chai_1.expect(deindent(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\nSome test string\n\n"], ["\\n\\nSome test string\\n\\n"])))).to.eql("\nSome test string\n");
        });
        it("Doesn't eliminate space preceding line for single-line strings", function () {
            chai_1.expect(deindent(templateObject_8 || (templateObject_8 = __makeTemplateObject(["    Some test string"], ["    Some test string"])))).to.eql("    Some test string");
        });
        it("Reduces indent down to the level of the smallest-indented row", function () {
            var outStr = deindent(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n                Hello,\n                    Is it biscotti I'm looking for?\n                        Hello?\n                Sincerely, The Cookie Monster\n            "], ["\n                Hello,\n                    Is it biscotti I'm looking for?\n                        Hello?\n                Sincerely, The Cookie Monster\n            "])));
            // prettier-ignore
            chai_1.expect(outStr).to.eql("Hello,\n" +
                "    Is it biscotti I'm looking for?\n" +
                "        Hello?\n" +
                "Sincerely, The Cookie Monster");
        });
        it("Handles interpolations", function () {
            var cookieType = "biscotti";
            var name = "The Cookie Monster";
            var outStr = deindent(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n                Hello,\n                    Is it ", " I'm looking for?\n                        Hello?\n                Sincerely, ", "\n\n            "], ["\n                Hello,\n                    Is it ", " I'm looking for?\n                        Hello?\n                Sincerely, ", "\n\n            "])), cookieType, name);
            // prettier-ignore
            chai_1.expect(outStr).to.eql("Hello,\n" +
                "    Is it biscotti I'm looking for?\n" +
                "        Hello?\n" +
                "Sincerely, The Cookie Monster\n");
        });
    });
    describe("isWhitespaceChar", function () {
        it("Returns true given a whitespace character", function () {
            chai_1.expect(isWhitespaceChar(' ')).to.be.true;
        });
        it("Returns true given a newline character", function () {
            chai_1.expect(isWhitespaceChar('\n')).to.be.true;
        });
        it("Returns true given a tab character", function () {
            chai_1.expect(isWhitespaceChar('\t')).to.be.true;
        });
        it("Returns false given a non-whitespace character", function () {
            chai_1.expect(isWhitespaceChar('a')).to.be.false;
            chai_1.expect(isWhitespaceChar('!')).to.be.false;
            chai_1.expect(isWhitespaceChar('Z')).to.be.false;
            chai_1.expect(isWhitespaceChar('1')).to.be.false;
            chai_1.expect(isWhitespaceChar('0')).to.be.false;
        });
        it("Returns false given multiple characters (even multiple whitespace characters)", function () {
            chai_1.expect(isWhitespaceChar('0123123')).to.be.false;
            chai_1.expect(isWhitespaceChar('  ')).to.be.false;
            chai_1.expect(isWhitespaceChar(' A ')).to.be.false;
        });
    });
    describe("isAlphnumericChar", function () {
        it("returns true given an alphanumeric character", function () {
            chai_1.expect(isAlphanumericChar('a')).to.equal(true);
            chai_1.expect(isAlphanumericChar('A')).to.equal(true);
            chai_1.expect(isAlphanumericChar('r')).to.equal(true);
            chai_1.expect(isAlphanumericChar('R')).to.equal(true);
            chai_1.expect(isAlphanumericChar('9')).to.equal(true);
            chai_1.expect(isAlphanumericChar('1')).to.equal(true);
            chai_1.expect(isAlphanumericChar('0')).to.equal(true);
        });
        it("returns false given a non-alphanumeric character", function () {
            chai_1.expect(isAlphanumericChar('@')).to.equal(false);
            chai_1.expect(isAlphanumericChar('!')).to.equal(false);
            chai_1.expect(isAlphanumericChar('_')).to.equal(false);
            chai_1.expect(isAlphanumericChar('$')).to.equal(false);
            chai_1.expect(isAlphanumericChar(' ')).to.equal(false);
            chai_1.expect(isAlphanumericChar('\n')).to.equal(false);
            chai_1.expect(isAlphanumericChar('\\')).to.equal(false);
            chai_1.expect(isAlphanumericChar('[')).to.equal(false);
        });
        it("returns false given multiple characters", function () {
            chai_1.expect(isAlphanumericChar('asdf')).to.equal(false);
            chai_1.expect(isAlphanumericChar('  asdf')).to.equal(false);
            chai_1.expect(isAlphanumericChar('aerg!ev*#H ')).to.equal(false);
        });
    });
    describe("isOperatorChar", function () {
        it("returns true given an operator character", function () {
            chai_1.expect(isOperatorChar('+')).to.equal(true);
            chai_1.expect(isOperatorChar('-')).to.equal(true);
            chai_1.expect(isOperatorChar('*')).to.equal(true);
            chai_1.expect(isOperatorChar('/')).to.equal(true);
            chai_1.expect(isOperatorChar('%')).to.equal(true);
            chai_1.expect(isOperatorChar('=')).to.equal(true);
            chai_1.expect(isOperatorChar('<')).to.equal(true);
            chai_1.expect(isOperatorChar('>')).to.equal(true);
            chai_1.expect(isOperatorChar('&')).to.equal(true);
            chai_1.expect(isOperatorChar('|')).to.equal(true);
            chai_1.expect(isOperatorChar('!')).to.equal(true);
            chai_1.expect(isOperatorChar('^')).to.equal(true);
            chai_1.expect(isOperatorChar('~')).to.equal(true);
            chai_1.expect(isOperatorChar('?')).to.equal(true);
            chai_1.expect(isOperatorChar(':')).to.equal(true);
        });
        it("returns false given a non-operator character", function () {
            chai_1.expect(isOperatorChar('y')).to.equal(false);
            chai_1.expect(isOperatorChar('F')).to.equal(false);
            chai_1.expect(isOperatorChar('0')).to.equal(false);
            chai_1.expect(isOperatorChar('1')).to.equal(false);
            chai_1.expect(isOperatorChar('9')).to.equal(false);
            chai_1.expect(isOperatorChar('(')).to.equal(false);
            chai_1.expect(isOperatorChar('$')).to.equal(false);
            chai_1.expect(isOperatorChar('[')).to.equal(false);
            chai_1.expect(isOperatorChar('')).to.equal(false);
            chai_1.expect(isOperatorChar('{')).to.equal(false);
            chai_1.expect(isOperatorChar(')')).to.equal(false);
            chai_1.expect(isOperatorChar('#')).to.equal(false);
            chai_1.expect(isOperatorChar('@')).to.equal(false);
            chai_1.expect(isOperatorChar('\t')).to.equal(false);
            chai_1.expect(isOperatorChar(' ')).to.equal(false);
            chai_1.expect(isOperatorChar('\n')).to.equal(false);
            chai_1.expect(isOperatorChar('\\')).to.equal(false);
        });
        it("returns false given multiple characters", function () {
            chai_1.expect(isOperatorChar('asdf')).to.equal(false);
            chai_1.expect(isOperatorChar(' += ')).to.equal(false);
            chai_1.expect(isOperatorChar('++')).to.equal(false);
            chai_1.expect(isOperatorChar('*=')).to.equal(false);
            chai_1.expect(isOperatorChar('<<')).to.equal(false);
            chai_1.expect(isOperatorChar('>=')).to.equal(false);
        });
    });
    describe("removeSurroundingQuotes", function () {
        node_1.expectFunctionExists(removeSurroundingQuotes);
        it("Removes single quotes surrounding a string, ignoring inner single quotes", function () {
            chai_1.expect(removeSurroundingQuotes("'asdf'")).to.eql('asdf');
            chai_1.expect(removeSurroundingQuotes("'as'df'")).to.eql("as'df");
        });
        it("Removes double quotes surrounding a string, ignoring inner double quotes", function () {
            chai_1.expect(removeSurroundingQuotes("\"asdf\"")).to.eql("asdf");
            chai_1.expect(removeSurroundingQuotes("\"as\"df\"")).to.eql("as\"df");
        });
        it("Removes backticks surrounding a string, ignoring inner backticks", function () {
            chai_1.expect(removeSurroundingQuotes('`asdf`')).to.eql('asdf');
            chai_1.expect(removeSurroundingQuotes('`as`df`')).to.eql('as`df');
        });
    });
    describe("removeSlashesFlagsSurroundingRegexString", function () {
        node_1.expectFunctionExists(removeSlashesFlagsSurroundingRegexString);
        it("Removes regex slashes surrounding a string when no flags are present", function () {
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/')).to.eql('asdf');
        });
        it("Removes regex slashes surrounding a string and any included flags", function () {
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/g')).to.eql('asdf');
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/mg')).to.eql('asdf');
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/yumig')).to.eql('asdf');
        });
        it("Leaves slashes inside a string intact", function () {
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/g')).to.eql('asdf');
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/mg')).to.eql('asdf');
            chai_1.expect(removeSlashesFlagsSurroundingRegexString('/asdf/yumig')).to.eql('asdf');
        });
    });
    describe("isRegexString", function () {
        node_1.expectFunctionExists(isRegexString);
        it("returns true if string is in regex format with no flags", function () {
            chai_1.expect(isRegexString('/asdf/')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars/')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars234/')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars[0-9]]/')).to.be.true;
        });
        it("returns true if string is in regex format with no flags", function () {
            chai_1.expect(isRegexString('/asdf/g')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars/yg')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars234/yum')).to.be.true;
            chai_1.expect(isRegexString('/asdf_morechars[0-9]/yumig')).to.be.true;
        });
        it("returns true if string is in regex format with no flags and has \\n vals", function () {
            chai_1.expect(isRegexString('/\n_[0-9a-zA-Z]+_$/')).to.be.true;
        });
        it("returns true if string is in regex format with flags and has \\n vals", function () {
            chai_1.expect(isRegexString('/\n_[0-9a-zA-Z]+_$/yumig')).to.be.true;
        });
        it("returns true if given a RegExp object", function () {
            chai_1.expect(isRegexString(/asdf/gim)).to.be.true;
            chai_1.expect(isRegexString(new RegExp('asdf', 'gm'))).to.be.true;
        });
    });
    describe("getFlagsFromRegexString", function () {
        node_1.expectFunctionExists(getFlagsFromRegexString);
        it("Returns a string of flag chars from a regex string with flags", function () {
            chai_1.expect(getFlagsFromRegexString('/asdfasdf/gm')).to.eql('gm');
            chai_1.expect(getFlagsFromRegexString('/asdfasdf/yumig')).to.eql('yumig');
        });
        it("Returns an empty string from a regex string with no flags", function () {
            chai_1.expect(getFlagsFromRegexString('/\n_[0-9a-zA-Z]+_$/')).to.eql('');
            chai_1.expect(getFlagsFromRegexString('/^[0-9]*&__[a-z]+~~/')).to.eql('');
        });
        it("Returns null given an invalid regex string", function () {
            chai_1.expect(getFlagsFromRegexString('\n_[0-9a-zA-Z]+_$/')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('_#!_[0-9A-Z]+_ppQ$/yumig')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('asdf')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('asdf/')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/yumiga')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/mG')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/g1')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/h')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/!')).to.be.null;
        });
        it("Returns null if given a regex string with duplicate flags", function () {
            chai_1.expect(getFlagsFromRegexString('/asdf/gg')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/yumiy')).to.be.null;
            chai_1.expect(getFlagsFromRegexString('/asdf/mgim')).to.be.null;
        });
    });
    describe("matchFirst", function () {
        var testStr = 'TEST :: String to search in';
        it("if given a string to find, returns 1st matching substring (i.e. the str searched for)", function () {
            chai_1.expect(matchFirst(testStr, 'TEST')).to.eql('TEST');
        });
        it("returns empty string if no match", function () {
            chai_1.expect(matchFirst(testStr, 'okokok')).to.eql('');
            chai_1.expect(matchFirst(testStr, /^should_not_match_anything/)).to.eql('');
        });
        it("returns first substring matching given RegExp", function () {
            chai_1.expect(matchFirst(testStr, /^.+::/g)).to.eql('TEST ::');
            chai_1.expect(matchFirst(testStr, /search [a-zA-Z]+$/g)).to.eql('search in');
        });
    });
    describe("deburrFrenchEnglish", function () {
        it("Removes accents from words", function () {
            chai_1.expect(deburrFrenchEnglish('tête-à-tête')).to.equal('tete-a-tete');
            chai_1.expect(deburrFrenchEnglish('smörgåsbord')).to.equal('smorgasbord');
            chai_1.expect(deburrFrenchEnglish("maître d'hôtel")).to.equal("maitre d'hotel");
            chai_1.expect(deburrFrenchEnglish('cause célèbre')).to.equal('cause celebre');
            chai_1.expect(deburrFrenchEnglish('cañón')).to.equal('canon');
        });
        it("Leaves words as-is if no accents", function () {
            chai_1.expect(deburrFrenchEnglish('hello')).to.equal('hello');
        });
        it("Returns empty strings as-is", function () {
            chai_1.expect(deburrFrenchEnglish('')).to.equal('');
        });
        it("Returns null as ''", function () {
            chai_1.expect(deburrFrenchEnglish(null)).to.equal('');
        });
    });
});
/**
 * Test an endsWith* function
 */
function testMatchFilenameWithExtensionFunction(funcName, func, ext, nonMatchingExt) {
    describe("" + funcName, function () {
        node_1.expectFunctionExists(func);
        it("Returns true if a string (presumably a filename) ends in ." + ext, function () {
            var matchingFilename1 = "someFile." + ext;
            var matchingFilename2 = "somewhere/example/path/another-file." + ext;
            chai_1.expect(func(matchingFilename1)).to.be.true;
            chai_1.expect(func(matchingFilename2)).to.be.true;
        });
        it("Returns false if a string (presumably a filename) does not end in ." + ext, function () {
            var nonMatchingFilename1 = 'does/not/match';
            var nonMatchingFilename2 = 'not-a-${ext}-file';
            var nonMatchingFilename3 = "./name-w-" + ext + "-but-without-extension-" + ext + "." + nonMatchingExt;
            var nonMatchingFilename4 = 'path/to/not-a-${ext}-file-either.${nonMatchingExt}';
            chai_1.expect(func(nonMatchingFilename1)).to.be.false;
            chai_1.expect(func(nonMatchingFilename2)).to.be.false;
            chai_1.expect(func(nonMatchingFilename3)).to.be.false;
            chai_1.expect(func(nonMatchingFilename4)).to.be.false;
        });
    });
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=string.spec.js.map