# mad-utils

*   Utilities I keep repeatedly rewriting across projects.

----

![mad-utils](https://i.giphy.com/media/rQOT9sBxBtkSk/giphy.webp)

## Most useful (see full docs in lower sections for more details):

#### cap1LowerRest:
(string) => string

    cap1LowerRest('aSdF'); // => 'Asdf'

#### capitalize:
(string) => string

    capitalize('asdf'); // => 'Asdf'
    
#### eliminateWhitespace:
(string) => string

    eliminateWhitespace('    asdf 123    ff    '); // => 'asdf123ff'

#### getLangFromUrlPathname:
(urlPath? = location.pathname, supportedLangs?: string[] = 'en'|'fr', defLang? = 'en') => string

    // With URL http://example.com/auth/fr/ok:
    getLangFromUrlPathName(); // => 'fr'.
    
#### parseQueryParams:
(queryParamsString?: string = window.location.search) => Object

    // With URL http://example.com/home?hello=everyone&gr=argh:
    parseQueryParams(); // => { hello: 'everyone', gr: 'argh' }

#### last:
(Array<T|any>) => T|any;

    last([1,2,3]); => 3

#### first:
(Array<T|any>) => T|any;

    first([1,2,3]); => 1

#### matchAny
(any[]) => (any) => boolean
Search array for value. Returns true if array contains value. Uses simple JSON.stringify for comparison.

    matchAny([1, 2, 3])(2);
    // => true

    matchAny(['a', 6, [1, 2, 3], 'gr'])([1, 2, 3]);
    // => true

----

*   NOTE: the documentation is an extreme work-in-progress.
*   Recent versions have considerably changed the design, API, and even structure.
    *   Considerably more functions are available
    *   Existing functions have been massively changed (mostly to be more robust & less surprising);
    *   The library has been split into 3 parts:
        *   node
        *   browser
        *   isomorphic/shared
            *   consumed by default, and also used by both the node and browser sub-modules
    *   A few exports have been deprecated (such as the parseDate function and ParsedDate type)
        *   Mostly due to irrelevance (items were taken from my own projects)

----
Sub-modules
===========
*   Broken into 3 sub-modules: node, browser, and isomorphic.
*   The node and browser sub-modules each include the entirety of the isomorphic sub-module

Isomorphic
----------
### Importing isomorphic sub-module

    // Import all namespaces, functions, types, etc. from isomorphic submodule
    import { m_ } from 'mad-utils';

    // Import isomorphic namespaces
    import { array, json, enum, number, object, query, string, types, decorator } from 'mad-utils';

    // Import isomorphic namespaces
    // Import individual isomorphic functions, types, classes, etc.
    import { first, isNumberLike, parseQueryParams, castToNum, stringToEnumVal } from 'mad-utils';

*   All modules exported from mad-utils provide everything in the isomorphic module.

### Isomorphic namespaces
*   array
*   date
*   error
*   func / functionUtils
*   json
*   locale
*   number
*   object
*   query
*   search
*   string
*   types

All of the above namesapaces are also importable from the NodeJS and Browser modules

NodeJS
------
*   exports that will only work in a Node environment, such as:
    *   Anything using the NodeJS core API
    *   Anything requiring file handling
    *   Anything based on DOM-free unit testing
    *   Anything intended for use with (or relying on) on a browser-unfriendly library
        *   e.g. Express, Mocha, Chai

*   Will generally crash your application if imported into the browser

### Importing NodeJS sub-module
    // Import all namespaces, functions, types, etc. from node & isomorphic submodules
    import { m_ } from 'mad-utils/lib/node';

    // Import node (and isomorphic) namespaces
    import { file, test, middleware, webpackUtils, nodeError, date } from 'mad-utils/lib/node';

    // Import individual node (and isomorphic) functions, types, classes, etc.
    import { isDir, wasRunAsScript, replaceInFile, getJsFilesInDir,
             globalActivateCleanStack, handlebarsPluginFactory, third,
             useMiddlewareInProductionOnly, composeExpressMiddlewares,
             isNonMinFile, eliminateWhitespace, thirdLast, splitLines } from 'mad-utils/lib/node';

### Node-specific namespaces
*   file
*   middleware
*   nodeError
*   test
*   webpackUtils
*   types (expanded to include both isomorphic and Node-specific types)


Browser
-------
*   Exports that will only work in a browser environment, or one with a mocked DOM (e.g. JSDom)
*   Generally causes errors to throw if used in Node without a special environment set up
    *   e.g. JSDom, or inclusion of various window mocks/polyfills

### Importing Browser sub-module

    // Import all namespaces, functions, types, etc. from browser submodule
    import { m_ } from 'mad-utils/lib/browser';

    // Import namespaces from browser (and isomorphic) submodules
    import { dom, event, localStorageUtils, types } from 'mad-utils/lib/node';

    // Import individual browser (and isomorphic) functions, types, classes, etc.
    import { mouseEventFactory, removeClickEventFromId,
             addClickEventToId, getFunctionSrcAsArray,
             methodNotForWebUse, getFromStorage, commonLangsObj,
             jsonStringifyWFuncs, canadaLangNames, assignFrozenClone } from 'mad-utils/lib/node';

### Browser namespaces
*   dom
*   event
*   localStorageUtils
*   types (expanded to include both isomorphic and Browser-specific types)


Functions, by namespace
=======================
More import notes
-----------------
If using a high-level import (mUtils, m_, __), you can access functions either via their namespaces or directory. E.g.

    mUtils.search.replaceAll
    mUtils.replaceAll
    __.number.isInt
    __.isInt
    m_.date.isLeapYear
    m_.isLeapYear
    m_.array.secondLast
    m_.secondLast
    ...etc...

mUtils, __, and m_ are 'full collection' exports. You can also get it them like this if you hate named imports:

    import * as madUtils from 'mad-utils';
    const h = madUtils.m_;

Namespace strategy
------------------
Inclusive, overlapping namespace strategy used.

Namespaces treated more like keywords than parent types.
*   Many functions are included in more than 1 namespace.

The main philosophy behind this API design is to make common functions maximally available.
*   Repeatedly checking sifthing through namespaces trying to remember where a function lives is annoying.
*   However, having 100s of functions together in a giant namespace with no other form of organization available is also annoying.
*   I opted for a compromise, where everything was included in a giant namespace, while also including smaller "sub-namespaces".
    *   This also has import advantages, since you can opt to pull in as much or as little as you need on each reference to mad-utils, without having to import whole namespaces and pluck individual functions off.

Common types
------------
### NumLike
*   Numbers, strings that can be parsed to numbers (floats), and arrays with a single item where said item is a number or string parseable to a number

### StrOrNever
*   Either a string or 'Never' (indicating a thrown error)


----
Namespace contents
==================
----

Namespace : array
=================
Get items from array by position
--------------------------------
### first
(arr: T[]) => T
*   Return first item in given array

Examples:

    first(['a', 'b', 'c', 'd']);
    // => 'a'

### second
(arr: T[]) => T
*   Return second item in given array

Examples:

    second(['a', 'b', 'c', 'd']);
    // => 'b'

### third
(arr: T[]) => T
*   Return third item in given array

Examples:

    third(['a', 'b', 'c', 'd']);
    // => 'c'

### last
(arr: T[]) => T
*   Return last item in given array

Examples:

    last(['a', 'b', 'c', 'd']);
    // => 'd'

### secondLast
(arr: T[]) => T
*   Return secondLast item in given array

Examples:

    secondLast(['a', 'b', 'c', 'd']);
    // => 'c'

### thirdLast
(arr: T[]) => T
*   Return thirdLast item in given array

Examples:

    thirdLast(['a', 'b', 'c', 'd']);
    // => 'b'

### first2
(arr: T[]) => T[]
*   Return first 2 items in given array

Examples:

    first2(['a', 'b', 'c', 'd']);
    // => ['a', 'b']

### first3
(arr: T[]) => T[]
*   Return first 3 items in given array

Examples:

    first3(['a', 'b', 'c', 'd']);
    // => ['a', 'b', 'c']

### last2
(arr: T[]) => T[]
*   Return last 2 items in given array

Examples:

    last2(['a', 'b', 'c', 'd']);
    // => ['c', 'd']

### last3
(arr: T[]) => T[]
*   Return last 3 items in given array

Examples:

    last3(['a', 'b', 'c', 'd']);
    // => ['b', 'c', 'd']

### firstN
(arr: T[], n: number) => T[]
*   Return first 'n' number of items from given array

Examples:

    firstN(['a', 'b', 'c', 'd'], 2);
    // => ['a', 'b']

### lastN
(arr: T[], n: number) => T[]
*   Return last 'n' items from given array. Return full array if too many items requested.

Examples:

    lastN(['a', 'b', 'c', 'd'], 2)
    // => ['c', 'd']

Create array
------------
### arrayN
(len: number) => undefined[]
*   Create empty array of given length.

Examples:

    arrayN(6)
    // => [ undefined, undefined, undefined, undefined, undefined, undefined ]

### splitLines
(str: string, opts: { preserveEmptyLines: false }): string[] => 
*   Split large multiline string into array where each line is an item
*   Removes blank lines by default, unless preserveEmptyLines option is set to true.

Examples:

    splitLines(`
        first line

        third line`);
    // => ['first line',
           'third line']

    splitLines(`
        first line

        third line`,
        { preserveEmptyLines: true });
    // => ['',
           'first line',
           '',
           'third line']

Exclude items from array by position
------------------------------------
### withoutFirst
(arr|str) => any[]|str
*   Remove first character or array item.

Examples:

    withoutFirst([1, 2, 3, 4, 5])
    // => [2, 3, 4, 5]

    withoutFirst('hello')
    // => 'ello'

### withoutFirst2
(arr|str) => any[]|str
*   Remove first 2 characters or array items.

Examples:

    withoutFirst2([1, 2, 3, 4, 5])
    // => [3, 4, 5]

### withoutFirst3
(arr|str) => any[]|str
*   Remove first 3 characters or array items.

Examples:

    withoutFirst3([1, 2, 3, 4, 5])
    // => [4, 5]

### withoutLast
(arr|str) => any[]|str
*   Remove last character or array item.

Examples:

    withoutLast([1, 2, 3, 4, 5])
    // => [1, 2, 3, 4]

### withoutLast2
(arr|str) => any[]|str
*   Remove last 2 characters or array items.

Examples:

    withoutLast2([1, 2, 3, 4, 5])
    // => [1, 2, 3]

### withoutLast3
(arr|str) => any[]|str
*   Remove last 3 characters or array items.

Examples:

    withoutLast3([1, 2, 3, 4, 5])
    // => [1, 2]

### withoutFirstN
(arr|str, number) => any[]|str
*   Remove first N characters or array items.

Examples:

    withoutFirstN([1, 2, 3, 4, 5], 4)
    // => [5]

### withoutLastN
(arr|str, number) => any[]|str
*   Remove last N characters or array items.

Examples:

    withoutLastN([1, 2, 3, 4, 5, 6, 7], 5)
    // => [1, 2]

Array typechecking
------------------
### isArray
(arr1: any[] | any) => boolean
*   True if item is an array

    isArray([]);
    // => true

    class CustomArray extends Array { }
    isArray(new CustomArray());
    // => true

Add to or subtract from array
-----------------------------
### append
(arr1: any[] | any | void, ...arrN: any[] | any | void) => any[]
*   Append all items in each array in arrN to the end of arr1 (non-mutatively) and return it.
    *   i.e. 2nd array gets appended to the 1st, after which 3rd array gets appended, & so on.
*   If any argument is undefined, it ignores it.
*   If all arguments are undefined, it returns [].
*   If a non-array value besides null is given, it wraps the item in an array before performing the concatenation.
*   Non-mutative: returns a new array.

    append([1, 2, 3], [4, 5, 6]);
    // => [1, 2, 3, 4, 5, 6]

    append([1, 2, 3], 'a', [4, 5, 6]);
    // => [1, 2, 3, 'a', 4, 5, 6]

    append([1, 2, 3], 'a', null, [4, 5, 6]);
    // => [1, 2, 3, 'a', 4, 5, 6]

### removeMatches
(arr: any[], arr2: any[] | any) => any[]
*   Return new array with all items in arr2OrItem removed from array1.
*   If array2 is not an array, remove matching item from array1.
*   NON-MUTATIVE. PERFORMANCE-INTENSIVE.

    removeMatches([1, 2, 3], 2);
    // => [1, 3]

    removeMatches([1, 2, 3, 4, 5], [1, 4]);
    // => [2, 3, 5]

### rmAllFalsy
(arr: any[]) => arr[]
*   Return new array with all falsy values in the given array eliminated.
*   NON-MUTATIVE

    rmAllFalsy([1, 2, 3, false, null, 4, 0, 'asdf', '', 'ok', undefined, 'fine']);
    // => [1, 2, 3, 4, 'asdf', 'ok']

Array searching
---------------
### matchAny
(matchVals: any[]) => (valToFind: any) => boolean
*   Search an array for a value.
*   Returns true if array matchVals contains valToFind.
*   Note that it uses simple JSON.stringify for array and object comparison
    *   use something else if deep comparisons are required.
*   Curried
*   Sane behaviour for matching against null, undefined, NaN, etc.
    *   e.g. NaN matched against an array with NaN returns true

Examples:

    matchAny([1, 2, 3])(2);
    // => true

    matchAny(['a', 6, [1, 2, 3], 'gr'])([1, 2, 3]);
    // => true

    matchAny(['a', 6, null, 'last'])(null);
    // => true


Namespace : date
================
### [TYPE] NumRange0To6
*   Shorthand for any number between 0 and 6

### [CONST] defaultTimestampFormat
*   string that creates a timestamp in a nice, human-readable format when passed to MomentJS.
`YYYY/MM/DD : hh:mm:ss`

### [FUNC] isLeapYear
(year: NumLike) => boolean
*   Returns true if given year is a leap year
*   Accepts integers, strings that can be converted to integers, and arrays with a single item, where said item is an integer or string convertable to an integer.
*   Any other input will throw.

### [FUNC] convertDayOfWeekNumToString
(day: NumRange0To6, abbreviate: boolean) => StrOrNever

*   Converts numeric day of the week to string day of the week. e.g. 0 -> 'Sunday', 6 -> 'Saturday'
*   Args:
    *   day: number from 0 to 6 for conversion
    *   abbreviate: If true, return the shorthand day names (e.g. 'Mon' vs. 'Monday'). Defaults to false.

```
    convertDayOfWeekNumToString(5); // => 'Friday'
    convertDayOfWeekNumToString(2, true); // => 'Tues'
```

### [FUNC] now
(timeFormat?: string) => string
*   Get the current date, formatted for display in the stream of Express logs to the CLI.
*   Args:
    *   timeFormat?: Optional momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
        *   More info at https://momentjs.com/docs/#/parsing/string-format/

```
    now(); // => 2017/05/28 : 02:51:39
    now(`YYYY/MM hh:mm`); // => 2017/02 02:51
```

### [FUNC] isDateLike (exported from types-iso - see below)


Namespace : decorator
=====================
### DecoratorError
*   WIP documentation

### notForWebUse
*   WIP documentation

### singleton
*   WIP documentation


Namespace : dom (browser)
=========================
WIP documentation

Namespace : enum
================
### enumToStringArray
*   WIP documentation

### enumValToString
*   WIP documentation

### stringToEnumVal
*   WIP documentation

### isNumericEnumItem
*   WIP documentation

### isIndexEnumItem
*   WIP documentation

### isDataEnumItem
*   WIP documentation


Namespace : error (isomorphic)
==============================
### DecoratorError
*   WIP documentation

### scrubStackTrace
*   WIP documentation

Namespace : error (node)
========================
WIP documentation

Namespace : event (browser)
===========================
WIP documentation

Namespace : file (node)
=======================
WIP documentation

Namespace : function
====================
WIP documentation

Namespace : json
================
### jsonStringifyWFuncs
(obj: Object) => string
*   Stringify, while keeping the functions in position by pre-converting them to strings.

Examples:

    jsonStringifyWFuncs({ a: 123, b: 'asdf', c: () => 'asdf' })
    // => '{"a":123,"b":"asdf","c":"function () { return \'asdf\'; }"}'

WIP documentation

Namespace : localStore (browser)
================================
WIP documentation

Namespace : locale
==================
WIP documentation

Namespace : middleware
======================
WIP documentation

Namespace : number
==================
### isInteger (Alias: isInt)
(any) => boolean
*   Returns true if given value is an integer

Examples:

    isInteger(1); // => true
    isInteger(232); // => true
    isInteger(82.12); // => false
    isInteger('232'); // => false
    isInteger('asdf'); // => false

### isIntegerLike
(any) => boolean
*   Returns true if given value is an integer-like string or integer.

Examples:

    isIntegerLike(232); // => true
    isIntegerLike('232'); // => true
    isIntegerLike('asdf'); // => false
    isInteger(82.12); // => false

### isNumberLike (Alias: isNumLike)
(any) => boolean
*   Returns true if given value is a number-like string or number

Examples:

    isNumberLike(1); // => true
    isNumberLike(9267.84); // => true
    isNumberLike('1'); // => true
    isNumberLike('9267.84'); // => true
    isNumberLike('1.2'); // => true
    isNumberLike('.2'); // => true

    isNumberLike('1.2.2'); // => false
    isNumberLike('asdf'); // => false
    isNumberLike(true); // => false

### uuid
() => string
*   Generate a UUID, in format e.g. 3A0BF2C7-3077-45A0-97ED-EC5F13F127F1

Examples:

    uuid();
    // => 'F6779B17-8CD1-409B-A2AA-1FE80CB86654'

Namespace : object
==================
### get
*   Get the item at the given object path.

### assignFrozenClone
(Object, ...Object[]): Readonly<Object>
*   Non-mutatively merge all given objects together (like Object.assign) & deep-freeze the result

Examples:

    const obj = assignFrozenClone({ a: 1, b: 2}, { c: 3, d: 4 });
    // => { a: 1, b: 2, c: 3, d: 4 }
    obj.a = 6;
    obj.a // => 1
    //          /\\--- note that it didn't change

### deepFreeze
(Object): Readonly<Object>
*   deep-freeze given object
*   MUTATIVE! (But still returns original)

Examples:

    const obj = deepFreeze({ a: 1, b: 2, c: 3, d: 4 });
    // obj = { a: 1, b: 2, c: 3, d: 4 }
    obj.a = 6;
    obj.a
    // => 1
    //   /\\--- note that it didn't change

    const obj = { a: 1, b: 2, c: 3, d: 4 };
    deepFreeze(obj);
    obj.a = 6;
    obj.a
    // => 1

### isMultilangTextObj
(Object): boolean
*   Returns true if given object is (probably) a multilanguage text object.
*   Not foolproof: e.g. assumes one of the languages is english or french
*   Multilanguage text object is considered any object containing one of the following keys, with any capitalization, and with an assigned value of type string or undefined or null:
    *   en_in, en, en_ca, en_us, en_gb, en_au, en_bz, en_cb, english, en_ie, en_jm, en_nz, en_ph, en_za, en_tt, eng, french, fr, fr_fr, fr_ca, fr_lu, fr_ch

Examples:

    isMultilangTextObj({ en: 'ok' })
    // => true

    isMultilangTextObj({ asdf: 'gr' })
    // => false

    isMultilangTextObj({ en: 12345 })
    // => false

    isMultilangTextObj({ fr: 'gr', asdf: 123 })
    // => true

    isMultilangTextObj({ en_cb: null, asdf: 123 })
    // => true

### eachPair
(Function(val, key)) => (Object) => Object (of original value)
*   Run given function on each pair in given object
*   CURRIED, NON-MUTATIVE

Examples:

    const arr = [];
    const putKeyValPairInArr = eachPair((v, k) => arr.push(k + v));
    putKeyValPairInArr({ a: 1, b: 2 });
    console.log(arr);
    // => ['a1', 'b2']

### numKeys
(Object) => number
*   Return number of keys in given object.

Examples:

    numKeys({ a: 1, b: 2 });
    // => 2

### hasKey
(Object, string) => boolean
*   Return true if given object has given key.

Examples:

    hasKey({ a: 1, b: 2 }, 'a');
    // => true

    hasKey({ a: 1, b: 2 }, 'c');
    // => false

Namespace : query
=================
#### getLangFromUrlPathname:
(urlPath? = location.pathname, supportedLangs?: string[] = 'en'|'fr', defLang? = 'en') => string
*   Get the currently selected language out of the current URL
*   Note: this is a 'rough' method not intended to work in all circumstances.
    *   E.g. you need to be storing the language in the URL for this to work

Examples:

    // Assuming we're at URL 'http://example.com/auth/fr/ok':
    getLangFromUrlPathName();
    // => 'fr'
    
#### parseQueryParams:
(queryParamsString?: string = window.location.search) => Object
*   Convert the current query params into an object
*   Note that running it without explicitly passing the queryParamsString works, but can give stale results.
    *   It will still point to the query params present on initial page load if window.location.search not explicitly passed.
    *   Not a problem unless something changes the query params after page load.

Examples:

    // Assuming we're at URL 'http://example.com/home?hello=everyone&gr=argh'
    parseQueryParams(window.location.search);
    // => { hello: 'everyone', gr: 'argh' }

    parseQueryParams();
    // => { hello: 'everyone', gr: 'argh' }


Namespace : search
==================
### escapeRegExp
*   WIP documentation

### matches
*   WIP documentation

### matchesIgnoreCase
*   WIP documentation

### replaceAll
*   WIP documentation


Namespace string (Alias: str)
=============================
### cap1LowerRest
(string) => string
*   Make the first letter uppercase, and the rest lowercase.

Examples:

    cap1LowerRest('asdf'); // => 'Asdf'
    cap1LowerRest('aSdF'); // => 'Asdf'
    cap1LowerRest('This was already cap.'); // => 'This was already cap.'
    cap1LowerRest('This Was Already Cap.'); // => 'This was already cap.'
    cap1LowerRest('not Already Cap.'); // => 'Not already cap.'

### capitalize
(string) => string
*   Make the first letter uppercase, and leave the rest as-is.

Examples:

    capitalize('asdf'); // => 'Asdf'
    capitalize('aSdF'); // => 'ASdF'
    capitalize('This was already cap.'); // => 'This was already cap.'
    capitalize('This Was Already Cap.'); // => 'This Was Already Cap.'
    capitalize('not Already Cap.'); // => 'Not Already Cap.'


### escapeRegExp
*   WIP documentation

### isNonexistentOrString
*   WIP documentation

### matches
*   See docs in search namespace.

### matchesIgnoreCase
*   WIP documentation

### replaceAll
*   WIP documentation

### stringToEnumVal
*   WIP documentation

Namespace : test
================
### expectNonEmptyObjectExists
*   Create Mocha test that passes if given object exists and is not empty

Examples:

    expectEmptyObject({}); // << will not pass
    expectEmptyObject({ a: 1 }); // << will pass

### expectEmptyObject
*   Create Mocha test that passes if given object is empty

Examples:

    expectEmptyObject({}); // << will pass
    expectEmptyObject({ a: 1 }); // << will not pass

### expectFunctionExists (ALIAS: expectFuncExists)
*   Create Mocha test that passes if given function exists

Examples:

    const inc = (a: number) => a + 1;
    expectFunctionExists({}); // << will not pass
    expectFunctionExists(() => null); // << will pass
    expectFunctionExists(inc); // << will pass


Namespace : types (isomorphic)
==============================
[FUNC] isDateLike
(arg: RealAny) => boolean
*   Return true if arg is a moment or Date instance; or a string, object, or number that moment can parse.
    *   Excludes:
        *   negative numbers
        *   strings that parse to negative numbers
        *   objects with date-irrelevant keys e.g. { year: 1123, bear: 'grizzly' }

### isArray
*   (see array section above)

### isNumberLike
*   True if given item is a number or a string that can be parsed into a number
*   WIP documentation

### isMultilangTextObj
*   (see locale section above)

### matches
*   curried, matcher-first match function
*   WIP documentation

### matchesIgnoreCase
*   True if 2 given strings' match, with casing ignored.
*   WIP documentation

### isNonexistentOrString
*   True if given item doesn't exist, or is a string.
*   WIP documentation

### isInteger
*   True if given item is an integer
*   WIP documentation

### isIntegerLike
*   True if given item is an integer or string containing an item that can be converted to an integer.
*   WIP documentation

Namespace : type (node)
=======================
WIP documentation

Namespace : type (browser)
==========================
WIP documentation

Namespace : validation
======================
WIP documentation

Namespace : webpack (node)
==========================
WIP documentation

Documentation is a major WIP.
TODO More documentation in README.
TODO Document special React module.