# mad-utils

*   Utilities I keep repeatedly rewriting across projects.

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


Namespace contents
==================
Namespace : array
-----------------
### first
(arr: T[]) => T
*   Return first item in given array

    first(['a', 'b', 'c', 'd']);
    // => 'a'

### second
(arr: T[]) => T
*   Return second item in given array

    second(['a', 'b', 'c', 'd']);
    // => 'b'

### third
(arr: T[]) => T
*   Return third item in given array

    third(['a', 'b', 'c', 'd']);
    // => 'c'

### last
(arr: T[]) => T
*   Return last item in given array

    last(['a', 'b', 'c', 'd']);
    // => 'd'

### secondLast
(arr: T[]) => T
*   Return secondLast item in given array

    secondLast(['a', 'b', 'c', 'd']);
    // => 'c'

### thirdLast
(arr: T[]) => T
*   Return thirdLast item in given array

    thirdLast(['a', 'b', 'c', 'd']);
    // => 'b'

### first2
(arr: T[]) => T[]
*   Return first 2 items in given array

    first2(['a', 'b', 'c', 'd']);
    // => ['a', 'b']

### first3
(arr: T[]) => T[]
*   Return first 3 items in given array

    first3(['a', 'b', 'c', 'd']);
    // => ['a', 'b', 'c']

### last2
(arr: T[]) => T[]
*   Return last 2 items in given array

    last2(['a', 'b', 'c', 'd']);
    // => ['c', 'd']

### last3
(arr: T[]) => T[]
*   Return last 3 items in given array

    last3(['a', 'b', 'c', 'd']);
    // => ['b', 'c', 'd']

### firstN
(arr: T[], n: number) => T[]
*   Return first 'n' number of items from given array

    firstN(['a', 'b', 'c', 'd'], 2);
    // => ['a', 'b']

### lastN
(arr: T[], n: number) => T[]
*   Return last 'n' items from given array. Return full array if too many items requested.

    lastN(['a', 'b', 'c', 'd'], 2)
    // => ['c', 'd']

### arrayN
(len: number) => undefined[]
*   Create empty array of given length.

    arrayN(6)
    // => [ undefined, undefined, undefined, undefined, undefined, undefined ]

### isArray
*   True if item is an array

    isArray([]);
    // => true

    class CustomArray extends Array { }
    isArray(new CustomArray());
    // => true


### append (arr1: any[] | any | void, ...arrN: (any[] | any | void)[]) => any[]
*   Non-mutative: returns a new array.
*   Append all items in each array in arrN to the end of arr1 (non-mutatively) and return it.
    *   i.e. 2nd array gets appended to the 1st, after which 3rd array gets appended, & so on.
*   If any argument is undefined, it ignores it
*   If all arguments are undefined, it returns [].
*   If a non-array value besides null is given, it wraps the item in an array
    before performing the concatenation.

    append([1, 2, 3], [4, 5, 6]);
    // => [1, 2, 3, 4, 5, 6]

    append([1, 2, 3], 'a', [4, 5, 6]);
    // => [1, 2, 3, 'a', 4, 5, 6]

    append([1, 2, 3], 'a', null, [4, 5, 6]);
    // => [1, 2, 3, 'a', 4, 5, 6]


Namespace : collection  (Alias: coll)
-------------------------------------
*   Also includes all items in the array category

### get
*   Get the item at the given object path.

### assignFrozenClone
*   Non-mutatively merge all given objects together (like Object.assign) & deep-freeze the result

    const obj = assignFrozenClone({ a: 1, b: 2}, { c: 3, d: 4 });
    // => { a: 1, b: 2, c: 3, d: 4 }
    obj.a = 6;
    obj.a // => 1
    //          /\\--- note that it didn't change


Namespace : date
----------------
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
---------------------
### DecoratorError
*   WIP

### notForWebUse
*   WIP

### singleton
*   WIP


Namespace : enum
----------------
### enumToStringArray
*   WIP

### enumValToString
*   WIP

### stringToEnumVal
*   WIP

### isNumericEnumItem
*   WIP

### isIndexEnumItem
*   WIP

### isDataEnumItem
*   WIP


Namespace : error
-----------------
### DecoratorError
*   WIP

### scrubStackTrace
*   WIP


Namespace : number
------------------
### isInt
*   WIP

### isNumberLike
*   WIP


Namespace : object
------------------
### isMultilangTextObj
*   WIP

### get
*   WIP


Namespace : search
------------------
### escapeRegExp
*   WIP

### matches
*   WIP

### matchesIgnoreCase
*   WIP

### replaceAll
*   WIP


Namespace string (Alias: str)
-----------------------------
### cap1LowerRest
*   Make the first letter uppercase, and the rest lowercase.

### capitalize
*   Make the first letter uppercase, and leave the rest as-is.

### escapeRegExp
*   WIP

### isNonexistentOrString
*   WIP

### matches
*   WIP

### matchesIgnoreCase
*   WIP

### replaceAll
*   WIP

### stringToEnumVal
*   WIP

Namespace : test
----------------
### expectEmptyObject
*   WIP


Namespace : type (isomorphic)
-----------------------------
[FUNC] isDateLike
(arg: RealAny) => boolean
*   Return true if arg is a moment or Date instance; or a string, object, or number that moment can parse.
    *   Excludes:
        *   negative numbers
        *   strings that parse to negative numbers
        *   objects with date-irrelevant keys e.g. { year: 1123, bear: 'grizzly' }


Namespace : type
----------------
### isArray
*   WIP

### isDateLike
*   WIP

### isNumberLike
*   WIP

### isMultilangTextObj
*   WIP

### matches
*   WIP

### matchesIgnoreCase
*   WIP

### isNonexistentOrString
*   WIP

### isInt
*   WIP

----

Documentation is a major WIP.
TODO document these at least a bit (I don't have time right now)
