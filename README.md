----------------------------------------------------------------------------------------------------
# mad-utils

Collection of utilities I keep repeatedly rewriting across projects.

![mad-utils](https://i.giphy.com/media/rQOT9sBxBtkSk/giphy.webp)

----------------------------------------------------------------------------------------------------
Examples - most useful methods
==============================
(see full docs in lower sections for more details)

### cap1LowerRest :: (string) => string
Capitalize first letter, convert rest to lowercase.
```
cap1LowerRest('aSdF'); // => 'Asdf'
```

### capitalize :: (string) => string
Capitalize first letter. Leave the rest as-is.
```
capitalize('asdf'); // => 'Asdf'
capitalize('asDf'); // => 'AsDf'
```

### eliminateWhitespace :: (string) => string
```
eliminateWhitespace('    asdf 123    ff    '); // => 'asdf123ff'
```

### switchExpr :: ((cond: any, valueToReturnIfCondTruthy: V)\*, defaultValue?: W) => V | W | never;
Function-based switch statement. Takes 2 or more args.
*   Args 1, 3, 5, 7, etc. are the conditions, and 2, 4, 6, etc. their corresponding return values.
    *   On hitting a truthy odd-numbered arg, switchExpr returns the next (even-numbered) arg, then exits.
    *   If none are truthy, the default value is returned (the last argument - which must be an odd-numbered arg).
        *   If no default value is present after all conditions returned false, throws an error.

Examples:
```
switchExpr(true, 'val1');                // Output: 'val1'

switchExpr(false, 'val1', 'defaultVal'); // Output: 'defaultVal'

switchExpr(
    false, 'v1',
    true, 'v2',
    'defaultReturnVal');                 // Output: 'v2'

switchExpr(undefined, 'v1', '', 'v2');   // Throws Error
```

### first :: (Array<T|any>) => T|any;
```
first([1,2,3]); => 1
```

### last :: (Array<T|any>) => T|any;
```
last([1,2,3]); => 3
```

### matchAny :: (any[]) => (any) => boolean
Search array for value. Returns true if array contains value.
Uses simple JSON.stringify for comparison.
```
matchAny([1, 2, 3])(2);
// => true

matchAny(['a', 6, [1, 2, 3], 'gr'])([1, 2, 3]);
// => true
```

### uuid :: () => string
```
uuid(); // => 5A42CCCF-6B10-488B-B957-4D1E5A113DA4
uuid(); // => 38259F99-73D5-4EE1-B11F-5D33CE8AD2C6
```

### get :: (Object, string, any?) => any
Safely get the item at the given object path.
```
const obj = {a: {b: {c: 'value'}}};
get(obj, 'a.b.c');                    // => 'value'
get(obj, 'a.b.zzz', 'default value'); // => 'default value'
```

### isBoolean :: (any) => boolean
```
isBoolean(true); // => true
isBoolean(false); // => true
isBoolean({}); // => false
```

### isFalse :: (any) => boolean
```
isFalse(true); // => false
isFalse(false); // => true
isFalse('ok'); // => false
```

### isInt :: (any) => boolean
```
isInt(5); // => true
isInt(-10); // => true
isInt(1.6); // => false
isInt('okok'); // => false
```

### pushIfNew :: (T[], T) => T[]
```
const arr = [1, 2, 3]

pushIfNew(3); // => [1, 2, 3]
pushIfNew(4); // => [1, 2, 3, 4]

console.log(arr); // => [1, 2, 3, 4]
```

### repeatChars :: (string, number) => string
```
repeatChars('a', 5); // => 'aaaaa'
repeatChars('aa', 5); // => 'aaaaaaaaaa'
```

### getLangFromURLPathname ::
Signature:
```
<T = ('en' | 'fr')>(
    string? = location.pathname,
    T[]?    = ['en', 'fr']
    T?      = 'en'
) => string
```

TODO confirm getLangFromURLPathname signature

Example usage:
```
// With URL http://example.com/auth/fr/ok:
getLangFromURLPathname(); // => 'fr'

// With URL http://example.com/en/auth/ok:
getLangFromURLPathname(); // => 'en'

// With URL given as param:
getLangFromURLPathname(`http://example.com/auth/sp/ok`, [`en`, `fr`, `sp`]); // => 'sp'
```

### parseQueryParams :: (queryParamsString?: string = window.location.search) => Object
```
// With URL http://example.com/home?hello=everyone&gr=argh:
parseQueryParams(); // => { hello: 'everyone', gr: 'argh' }
```



----------------------------------------------------------------------------------------------------
Installation
============
*   npm:
```
npm install --save mad-utils
```

*   yarn:
```
yarn add mad-utils
```

----------------------------------------------------------------------------------------------------

*   NOTE: the documentation is an extreme work-in-progress.
*   Recent versions have considerably changed the design, API, and even structure from earlier ones.
    *   Considerably more functions are available
    *   Existing functions have been massively changed (mostly to be more robust & less surprising);
    *   The library has been split into 3 parts:
        *   node
        *   browser
        *   isomorphic/shared
            *   consumed by default, and also used by both the node and browser submodules.
    *   A few exports have been deprecated (such as the parseDate function and ParsedDate type)
        *   Mostly due to irrelevance (items were taken from my own projects).
    *   (The docs still remain mostly up to date)



----------------------------------------------------------------------------------------------------
Sub-modules
===========
*   Broken into 3 sub-modules: node, browser, and isomorphic.
*   The node and browser sub-modules each include the entirety of the isomorphic sub-module.

Isomorphic
----------
### Importing isomorphic (default) submodule
```
// Import all namespaces, functions, types, etc. from isomorphic submodule
import {m_} from 'mad-utils';

// Import isomorphic namespaces
import {array, json, enum, number, object, query, string, types} from 'mad-utils';

// Import individual isomorphic functions, types, classes, etc.
import {first, isNumberLike, parseQueryParams, castToNum, stringToEnumVal} from 'mad-utils';
```

*   All modules exported from mad-utils provide everything in the isomorphic module.

### Isomorphic namespaces
*   array
*   date
*   enum
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
*   validation

All of the above namespaces are also importable from the NodeJS and Browser modules.

NodeJS submodule
----------------
*   Isomorphic exports, plus exports that will only work in a Node environment, such as:
    *   Anything using the NodeJS core API.
    *   Anything requiring file handling.
    *   Anything based on DOM-free unit testing.
    *   Anything intended for use with (or relying on) on a browser-unfriendly library:
        *   e.g. Express, Mocha, Chai.

*   Will generally crash your application if imported into the browser.

### Importing node sub-module
```
// Import all namespaces, functions, types, etc. from node & isomorphic submodules
import {m_} from 'mad-utils/lib/node';

// Import node (and isomorphic) namespaces
import {file, test, middleware, webpackUtils, nodeError, date} from 'mad-utils/lib/node';

// Import individual node (and isomorphic) functions, types, classes, etc.
import {
    isDir,
    wasRunAsScript,
    replaceInFile,
    getJsFilesInDir,
    globalActivateCleanStack,
    useMiddlewareInProductionOnly,
    third,
    thirdLast,
    splitLines,
    composeExpressMiddlewares,
    isNonMinFile,
    eliminateWhitespace
} from 'mad-utils/lib/node';
```

### Node-specific namespaces
*   file
*   middleware
*   nodeError
*   test
*   webpackUtils
*   types (expanded to include both isomorphic and Node-specific types)


Browser submodule
-----------------
*   Exports that will only work in a browser environment, or one with a mocked DOM (e.g. JSDom)
*   Generally causes errors to throw if used in Node without a special environment set up
    *   e.g. JSDom, or inclusion of various window mocks/polyfills

### Importing browser submodule
```
// Import all namespaces, functions, types, etc. from browser submodule
import {m_} from 'mad-utils/lib/browser';

// Import namespaces from browser (and isomorphic) submodules
import {dom, types} from 'mad-utils/lib/node';

// Import individual browser (and isomorphic) functions, types, classes, etc.
import {
    browserVersion,
    browserEngineVersion,
    getUserAgentString,
    assignFrozenClone
} from 'mad-utils/lib/node';
```

### Browser namespaces
*   dom
*   types (expanded to include both isomorphic and Browser-specific types)



----------------------------------------------------------------------------------------------------
Functions, by namespace
=======================
More import notes
-----------------
If using a high-level import (mUtils, m_, \_\_), you can access functions either via their namespaces or directory. E.g.
```
mUtils.search.replaceAll
mUtils.replaceAll
__.number.isInt
__.isInt
m_.date.isLeapYear
m_.isLeapYear
m_.array.secondLast
m_.secondLast
...etc...
```

`mUtils`, `__`, and `m_` are 'full collection' exports

You can also get them like this if you hate named imports:
```
import madUtils from 'mad-utils';
const h = madUtils.m_;
```

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

Common types [WIP]
------------------
### NumLike
Either a number, or a string that can be parsed to a number

### StrOrNever
Either a string, or 'Never' (indicating an error threw in the function)



----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
Namespace contents
==================
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
Namespace: array (isomorphic)
=============================
Get items from array by position
--------------------------------
### first :: (T[]) => T
Return first item in given array

```
first(['a', 'b', 'c', 'd']);  // => 'a'
```

### second :: (T[]) => T
Return second item in given array

```
second(['a', 'b', 'c', 'd']);  // => 'b'
```

### third :: (T[]) => T
Return third item in given array

```
third(['a', 'b', 'c', 'd']);  // => 'c'
```

### last :: (T[]) => T
Return last item in given array

```
last(['a', 'b', 'c', 'd']);  // => 'd'
```

### secondLast :: (T[]) => T
Return secondLast item in given array

```
secondLast(['a', 'b', 'c', 'd']);  // => 'c'
```

### thirdLast :: (T[]) => T
Return thirdLast item in given array

```
thirdLast(['a', 'b', 'c', 'd']);  // => 'b'
```

### first2 :: (T[]) => T[]
Return first 2 items in given array

```
first2(['a', 'b', 'c', 'd']);  // => ['a', 'b']
```

### first3 :: (T[]) => T[]
Return first 3 items in given array

```
first3(['a', 'b', 'c', 'd']);  // => ['a', 'b', 'c']
```

### last2 :: (T[]) => T[]
Return last 2 items in given array

```
last2(['a', 'b', 'c', 'd']);  // => ['c', 'd']
```

### last3 :: (T[]) => T[]
Return last 3 items in given array

```
last3(['a', 'b', 'c', 'd']);  // => ['b', 'c', 'd']
```

### firstN :: (T[], number) => T[]
Return first 'n' number of items from given array

```
firstN(['a', 'b', 'c', 'd'], 2);  // => ['a', 'b']
```

### lastN :: (T[], Int) => T[]
Return last 'n' items from given array.
Return full array if too many items requested.

```
lastN(['a', 'b', 'c', 'd'], 2);  // => ['c', 'd']
```

Create array
------------
### arrayN :: (length: Int) => undefined[]
Create empty array of given length (integer).

```
arrayN(3);  // => [undefined, undefined, undefined]
```

### splitLines :: (string, {preserveEmptyLines: false}) => string[]
Split large multiline string into array where each line is an item.
Removes blank lines by default, unless preserveEmptyLines option is set to true.

```
splitLines(
    'first line' +
    '\n ' +
    'third line' +
    '\n',
    'fourth line'
);
// => ['first line', ' ', 'third line', 'fourth line']

splitLines(`
    first line

    second line`,
    {preserveEmptyLines: true}
);
// => ['', 'first line', '', 'second line']
```

Exclude items from array by position
------------------------------------
### withoutFirst :: (T[] | string) => T[] | string
Remove first character or array item.

```
withoutFirst([1, 2, 3, 4, 5]) // => [2, 3, 4, 5]
withoutFirst('hello');  // => 'ello'
```

### withoutFirst2 :: (T[] | str) => T[] | str
Remove first 2 characters or array items.

```
withoutFirst2([1, 2, 3, 4, 5]); // => [3, 4, 5]
withoutFirst2('abcdef'); // => 'cdef'
```

### withoutFirst3 :: (T[] | string) => T[] | string
Remove first 3 characters or array items.

```
withoutFirst3([1, 2, 3, 4, 5]); // => [4, 5]
```

### withoutLast :: (T[] | string) => T[] | string
Remove last character or array item.

```
withoutLast([1, 2, 3, 4, 5]); // => [1, 2, 3, 4]
```

### withoutLast2 :: (T[] | string) => T[] | string
Remove last 2 characters or array items.

```
withoutLast2([1, 2, 3, 4, 5]); // => [1, 2, 3]
```

### withoutLast3 :: (T[] | string) => T[] | string
Remove last 3 characters or array items.

```
withoutLast3([1, 2, 3, 4, 5]); // => [1, 2]
```

### withoutFirstN :: (T[]|str, number) => T[] | string
Remove first N characters or array items.

```
withoutFirstN([1, 2, 3, 4, 5], 3); // => [4, 5]
```

### withoutLastN :: (T[] | string, number) => T[] | string
Remove last N characters or array items.

```
withoutLastN([1, 2, 3, 4, 5], 3); // => [1, 2]
```

Array typechecking
------------------
### isArray :: (T[] | T) => boolean
True if item is an array

```
isArray([]); // => true

class CustomArray extends Array { }

isArray(new CustomArray()); // => true
```

Add to or subtract from array
-----------------------------
### removeMatches :: (any[], any[] | any) => any[]
NON-MUTATIVE. PERFORMANCE-INTENSIVE.

Return new array with all items in arr2OrItem removed from array1.
If array2 is not an array, remove matching item from array1.


```
removeMatches([1, 2, 3], 2); // => [1, 3]

removeMatches([1, 2, 3, 4, 5], [1, 4]); // => [2, 3, 5]
```

### rmAllFalsy
(arr: any[]) => arr[]
*   Return new array with all falsy values in the given array eliminated.
*   NON-MUTATIVE

Examples:

    rmAllFalsy([1, 2, 3, false, null, 4, 0, 'asdf', '', 'ok', undefined, 'fine']);
    // => [1, 2, 3, 4, 'asdf', 'ok']

Array searching
---------------
### matchAny: (haystack: T[]) => (needle: T) => boolean
Search an array for a value.
*   Returns true if array haystack contains needle.

Note that it uses simple JSON.stringify for array and object comparison
*   use something else if deep comparisons are required.

Sane behaviour for matching against null, undefined, NaN, etc.
*   e.g. NaN matched against an array with NaN returns true

Curried.

Examples:
```
matchAny([1, 2, 3])(2);
// => true

matchAny(['a', 6, [1, 2, 3], 'gr'])([1, 2, 3]);
// => true

matchAny(['a', 6, null, 'last'])(null);
// => true
```



----------------------------------------------------------------------------------------------------
Namespace: date (isomorphic)
============================
### [TYPE] NumRange0To6
Shorthand for any number between 0 and 6

### [CONSTANT] defaultTimestampFormat :: string
String that creates a timestamp in a nice, human-readable format when passed to MomentJS.
`YYYY/MM/DD : hh:mm:ss`

Examples:
```
console.log(defaultTimestampFormat);
// => `YYYY/MM/DD : HH:mm:ss`;
```

### isLeapYear :: (year: NumLike) => boolean
Returns true if given year is a leap year.
Accepts integers, strings that can be converted to integers, and arrays with a
single item, where said item is an integer or string convertable to an integer.
Any other input will throw.

Examples:
```
isLeapYear(2004); // => true
isLeapYear(2003); // => false
```

### convertDayOfWeekNumToString :: (day: 0..6, abbrev: boolean) => string | never
Converts numeric day of the week to string day of the week. e.g. 0 -> 'Sunday', 6 -> 'Saturday'
Args:
*   day: number from 0 to 6 for conversion
*   abbrev: If true, return the shorthand day names (e.g. 'Mon' vs. 'Monday'). Default: false.

Examples:
```
convertDayOfWeekNumToString(5); // => 'Friday'
convertDayOfWeekNumToString(2, true); // => 'Tues'
```

### now
(timeFormat?: string) => string
*   Get the current date, formatted for display in the stream of Express logs to the CLI.
*   Args:
    *   timeFormat?: Optional momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
        *   More info at https://momentjs.com/docs/#/parsing/string-format/

Examples:
```
now(); // => 2017/05/28 : 02:51:39
now(`YYYY/MM hh:mm`); // => 2017/02 02:51
```

### isDateLike (exported from types-iso - see below)



----------------------------------------------------------------------------------------------------
Namespace: dom (browser)
========================
### getUserAgentString :: () => string
Return raw and unparsed browser user agent string (convenience function)

Example:
```
getUserAgentString();
// => "Mozilla/4.0 (Macintosh; Intel Mac OS X 7_12_6) AppleWebKit/501.16 (KHTML, like Gecko) Chrome/50.0.1010.99 Safari/210.22"
```

### osName :: () => string
Extract name of current user's OS (operating system) from browser user agent string.
(Note: Memoizes result - i.e. 1st call to function stores result; all future calls reference stored result).

Example:
```
osName(); // => "Mac OS"
```

### osNameSnakeCase :: () => string
Extract name of OS from browser user agent string, & convert it to snake_case.
(Note: memoizes result)

Example:
```    
osNameSnakeCase(); // => "mac_os"
```

### browserName :: () => string
Extract name of current browser from browser user agent string.
(Note: memoizes result)

Example:
```
browserName(); // => "Firefox"
```

### browserEngineName :: () => string
Extract name of current browser's rendering engine from browser user agent string.
(Note: memoizes result)

Example:
```
browserEngineName(); // => "Webkit"
```

### osVersion
Extract version of current OS from browser user agent string.
(Note: memoizes result)

Example:
```
osVersion(); // => "15.9.1"
```

### browserVersion :: () => string
Extract version of current browser from browser user agent string.
(Note: memoizes result)

Example:
```
browserVersion(); // => "64.1.5284.259"
```

### browserEngineVersion :: () => string
Extract version of current browser's rendering engine from browser's user agent string.
(Note: memoizes result)

Example:
```
browserEngineVersion(); // => "530.12"
```



----------------------------------------------------------------------------------------------------
Namespace: enum (isomorphic)
============================
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



----------------------------------------------------------------------------------------------------
Namespace: error (isomorphic)
=============================
### DecoratorError
*   WIP documentation

### scrubStackTrace
*   WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: error (node)
=======================
### globalActivateCleanStack :: () => void
Remove pointless stacktrace items (node core).
Modify the stacktrace length to be unlimited.
Effects get applied globally immediately on running the function.
*   Affects error handling behaviour for the entire life of the Node process this was run in.

Examples:
```
globalActivateCleanStack();
// /\-- This is literally the only way to use it.
```


----------------------------------------------------------------------------------------------------
Namespace: file (node)
======================
### isDir :: (fileOrDirPath: string) => boolean
Returns true if inode (aka file, directory, socket, etc.) at absolute path is a directory.

```
isDir(path.join(rootPath, 'node_modules')); // => isTrue
```

### wasRunAsScript :: () => boolean
Must always be called like this: `wasRunAsScript(path.basename(__filename))`.
WARNING: has some edge cases (Fixing them is a WIP TODO):
*   Will (incorrectly) return true if the current file has the same name as the file that launched the process.
    *   e.g. if process was launched by [project root]/server/index.js, and wasRunAsScript is run in [project root]/server/api/index.js, it will return true.
*   Will not work for filenames with certain characters, such as (, ), [, ], and certain other special regex chars (. and - are OK).

Example (in some-file.js, with process launched via `node some-file.js`):
```
wasRunAsScript(path.basename(__filename)); // => true
```

### pathFromRoot
WIP documentation

### replaceInFile
WIP documentation

### getJsFilesInDir
WIP documentation

### isFileInDir
WIP documentation

### isNonMinFile
WIP documentation

### endsInDotJs :: (string) => boolean
True if the given string (generally a path) ends in `.js`.

Example:
```
endsInDotJs(`asdf.js`); // => true
```

### getBaseFilenameFromPath
WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: function (isomorphic)
================================
### switchExpr :: (...(cond: any, retValIfCondTru: V), def?: W) => V | W | never;
Function-based switch statement.

For each pair of args:
*   the 1st arg is a condition that passes if truthy.
*   the 2nd arg is the value returned if the condition passes.

If no conditions pass, and there was:
*   ...an odd number of arguments given, then the final arg given to the function is returned.
*   ...an even number of arguments given, an error is thrown.

Examples:
```
switchExpr(true, 'val1');                                // => 'val1'
switchExpr(true, 'val1', 'defaultVal');                  // => 'val1'
switchExpr(false, 'val1', 'defaultVal');                 // => 'defaultVal'
switchExpr(false, 'v1', 'condition1', 'v2');             // => 'v2'
switchExpr(false, 'v1', null, 'v2', 'defaultReturnVal'); // => 'v2'
switchExpr(false, 'v1', null, 'v2');                     // => [throws error]
switchExpr(false, 'v1');                                 // => [throws error]

let size = 'large';

switchExpr(
    size === 'tiny',   8,
    size === 'small',  10,
    size === 'medium', 12,
    size === 'large',  16,
    size === 'huge',   20,
                       12
);
// => 16
```

General syntax:
```
switchExpr(
    COND1, val_returned_if_COND1_truthy,
    COND2, val_returned_if_COND2_truthy,
    ...,
    defaultReturnVal
)
```


### loopN :: (number, (...args) => T) => T[]
Run given function the given number of times.

Return results of all runs of the function as an array containing all N return vals.

Examples:
```
loopN(2, () => 'return_value'); // => ['return_value', 'return_value']

let i = 0;
loopN(10, () => i++); // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(i)        // => 10
```

### loop2 :: ((...args) => T) => T[]
Run given function twice, and return results of both runs of the function as an array.

Example:
```
loop2(() => 'return_value'); // => ['return_value', 'return_value']
```

###  loop3, loop4, loop5
See loop2 above, but run the associated number of times
*   e.g. loop4 runs 4 the function 4X instead of twice

Examples:
```
loop3(() => 'ret_val'); // => ['ret_val', 'ret_val', 'ret_val']
loop4(() => 'ret_val'); // => ['ret_val', 'ret_val', 'ret_val', 'ret_val']
loop5(() => 'ret_val'); // => ['ret_val', 'ret_val', 'ret_val', 'ret_val', 'ret_val']

let i = 0;
loop5(() => i++); // => [0, 1, 2, 3, 4]
console.log(i)    // => 5
```

### getFnAsArr :: (fn: Function) => string[]
Return a function's source code in nicely spaced array format.

Examples:
```
getFnAsArr(() => 'ok')
// => [ 'function () { return \'ok\'; }' ]

function testFn() {
    console.log('log 1');
    return 'output';
}
getFnAsArr(testFn);
// => [ 'function testFn() {',
//      '    console.log(\'log 1\');',
//      '    return \'output\';',
//      '}']
```



----------------------------------------------------------------------------------------------------
Namespace: json (isomorphic)
============================
### jsonStringifyWFuncs :: (Object) => string
Stringify, while keeping the functions in position by pre-converting them to strings.

Example:
```
jsonStringifyWFuncs({a: 123, b: 'asdf', c: () => 'asdf'})
// =>
    '{"a":123,"b":"asdf","c":"function () { return \'asdf\'; }"}'
```

WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: locale (isomorphic)
==============================
### commonLangsObj :: Record<string, string>
*   Object containing a set of common languages and their common ID codes
*   e.g. `{af: 'Afrikaans', en: 'English', ...}`

### commonLangAbbrevs :: string[]
*   Array of common abbreviations for the most common languages
*   e.g. `['af', 'en', ...]`

### commonLangNames :: string[]
*   Array of the names of the most common languages
*   e.g. `['Afrikaans', 'English', ...]`

### canadaLangsObj :: Record<string, string>
*   Object mapping Canada's official languages to their abbreviations
*   `{en: `English`, fr: `French`}`

### canadaLangAbbrevs :: string[]
*   Array of the abbreviations of Canada's official languages
*   `['en', 'fr']`

### canadaLangNames :: string[]
*   Array of the names of Canada's official languages
*   `['English', 'French']`

### englishVariants
*   Array of variants of English, by locale (codes)
*   `['english', 'en', 'en_ca', 'en_us', ...]`

### frenchVariants :: string[]
*   Array of variants of French, by locale (codes)
*   `['french', 'fr', 'fr_fr', 'fr_ca', ...]`



----------------------------------------------------------------------------------------------------
Namespace: middleware (node)
============================
### useMiddlewareInProdOnly
WIP documentation

### composeExpressMiddlewares
WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: number (isomorphic)
==============================
### isInteger :: (any) => boolean
Returns true if given value is an integer.

Examples:
```
isInteger(1);      // => true
isInteger(232);    // => true
isInteger(82.12);  // => false
isInteger('232');  // => false
isInteger('asdf'); // => false
```

(Alias: isInt)

### isIntegerLike :: (any) => boolean
Returns true if given value is an integer-like string or integer.

Examples:
```
isIntegerLike(232);    // => true
isIntegerLike('232');  // => true
isIntegerLike('asdf'); // => false
isInteger(82.12);      // => false
```

### isNumberLike :: (any) => boolean
Returns true if given value is a number-like string or number.

Examples:
```
isNumberLike(1);         // => true
isNumberLike(9267.84);   // => true
isNumberLike('1');       // => true
isNumberLike('9267.84'); // => true
isNumberLike('1.2');     // => true
isNumberLike('.2');      // => true

isNumberLike('1.2.2');   // => false
isNumberLike('asdf');    // => false
isNumberLike(true);      // => false
```

(Alias: isNumLike) 

### uuid () => string
Generate a UUID, in format e.g. `3A0BF2C7-3077-45A0-97ED-EC5F13F127F1`.

Examples:
```
uuid(); // => 'F6779B17-8CD1-409B-A2AA-1FE80CB86654'
uuid(); // => 'B574571F-097A-4ADB-837C-DCE8472C3314'
```



----------------------------------------------------------------------------------------------------
Namespace: object (isomorphic)
==============================
### get :: (obj: Object, path: string, default: any?) => any
Safely get the item at the given object path.

Arguments:
*   1st: object to get from.
*   2nd: object path to get value from.
*   3rd: default value (if no value found at given path).

Examples:
```
const obj = {a: {b: {c: 'value'}}};

get(obj, 'a.b.c'); // => 'value'

get(obj, 'a.b.zzz', 'default value'); // => 'default value'
```

### assignFrozenClone :: (Object, ...Object[]) => Readonly<Object>
Non-mutatively merge all given objects together (like Object.assign) & deep-freeze the result.

Examples:
```
const obj = assignFrozenClone({a: 1, b: 2}, {c: 3, d: 4});
// => {a: 1, b: 2, c: 3, d: 4}

obj.a = 6;
obj.a // => 1
            ^--- note that it didn't change
```

### deepFreeze :: (Object) => Readonly<Object>
Deep freeze given object
MUTATIVE! (But still returns original)

Examples:
```
const obj = deepFreeze({a: 1, b: 2, c: 3, d: 4});
// obj = {a: 1, b: 2, c: 3, d: 4}

obj.a = 6;
console.log(obj.a); // => 1
                    //    ^--- note that it didn't change

// Note that it also mutates the object:
const obj = {a: 1, b: 2, c: 3, d: 4};
deepFreeze(obj);
obj.a = 6;
console.log(obj.a); // => 1
```

### eachPair :: <T extends object>(data: T, fn: (val, key) => any) => T
Run given function on each pair in given object.
CURRIED, NON-MUTATIVE.

Examples:
```
const arr = [];
const putKeyValPairInArr = eachPair((v, k) => arr.push(k + v));
putKeyValPairInArr({a: 1, b: 2});

console.log(arr); // => ['a1', 'b2']
```

### numKeys :: (Object) => number
Return number of keys in given object.

Examples:
```
numKeys({a: 1, b: 2}); // => 2
```

### hasKey :: (Object, string) => boolean
Return true if given object has given key.

Examples:
```
hasKey({a: 1, b: 2}, 'a');  // => true
hasKey({a: 1, b: 2}, 'c');  // => false
```

### defineProps :: (obj: I, string, val: any, mutable?: bool) => N & I {Object}
Add {key} with value {val} to {obj}. If {mutable} true, make new prop mutable.

Generics:
1.  N (NewKVPair) extends Object = {}
    *   New key-value pair to add to object.
2.  I (InputObject) extends Object = {}
    *   Original input object to mutate (and return).

Arguments:
*   obj: InputObject - object to mutate.
*   key: string - new key to add to given object (at arg 'obj').
*   val: Any - value to assign to new key.
*   isMutable: boolean? - if true, make new property mutable. Default: false.

Return value: (InputObject & NewKVPair)
*   InputObject with new key-value pair properties merged in.
*   Note that it also mutates the original value.

Examples:
```
const obj = {a: 'eh', b: 'bee'}
defineProps(obj, 'c', 'sea');
// returns (and new value of obj) :: {a: 'eh', b: 'bee', c: 'sea'}

const obj = {a: 'eh', b: 'bee'}
defineProps(obj, 'c', 'sea');
defineProps(obj, 'c', 'seeeee');
// returns (and new value of obj) :: {a: 'eh', b: 'bee', c: 'sea'}

const obj = {a: 'eh', b: 'bee'}
defineProps(obj, 'c', 'sea', true);
defineProps(obj, 'c', 'seeeee', true);
// returns (and new value of obj) :: {a: 'eh', b: 'bee', c: 'seeeee'}
```


----------------------------------------------------------------------------------------------------
Namespace: url (isomorphic)
=============================
#### getLangFromURLPathname
Signature:
```
(
    string? = window.location.pathname,
    string[]? = ['en','fr'],
    string? = 'en'
) => string
```
Get the currently selected language out of the current URL.

Note: this is a 'rough' method not intended to work in all circumstances.
*   You need to be storing the language in the URL for this to work

In Node, default value window.location.pathname gets set to '' if it doesn't exist.

Examples:
```
// Assuming we're at URL 'http://example.com/auth/fr/ok':
getLangFromURLPathname();
// => 'fr'

// Assuming we're at URL 'http://example.com/auth/fr/ok':
getLangFromURLPathname(window.location.pathname);
// => 'fr'

getLangFromURLPathname('/asdf/123asdfawzu/en/eiuherg/awzp1');
// => 'en'

getLangFromURLPathname('/asdf/123asdfawzu/sp/eiuherg/awzp1', ['en', 'sp']);
// => 'sp'

getLangFromURLPathname('/asdf/123asdfawzu/au/eiuherg/awzp1', ['en', 'fr', 'sp']);
// => 'en'

getLangFromURLPathname('/asdf/123asdfawzu/au/eiuherg/awzp1', ['en', 'fr', 'sp'], 'fr');
// => 'fr'
```

#### parseQueryParams :: (queryParamsString?: string = window.location.search) => Object
Convert the current query params into an object.

Note that running it without explicitly passing the queryParamsString works, but can give stale results.
*   It will still point to the query params present on initial page load if window.location.search not explicitly passed.
*   Not a problem unless something changes the query params after page load.

Examples (at URL `'http://example.com/home?hello=everyone&gr=argh'`):
```
parseQueryParams(window.location.search);
// => {hello: 'everyone', gr: 'argh'}

parseQueryParams();
// => {hello: 'everyone', gr: 'argh'}
```

#### lastUrlPath :: (url: string = hrefDef, strict: boolean = true) => string
Get the last path in the given URL, with no / prepended, & query params excluded.

Returns '' if no paths in url.

Sets 'strict mode' to true by default, meaning trailing slashes aren't ignored.
*   If one is present, return value becomes ''.

If first param is null or undefined, uses the current page's URL as the url value.

Examples:
```
// Assuming we're at URL 'http://example.com/home?hello=everyone&gr=argh'
lastUrlPath(); // => 'home'

// Assuming we're at URL 'http://example.com/asdf/?hello=everyone&gr=argh'
lastUrlPath(); // => ''
lastUrlPath(null, false); // => 'asdf'

lastUrlPath('http://example.com'); // => ''
lastUrlPath('http://example.com/'); // => ''
lastUrlPath('http://example.com/', false); // => ''
lastUrlPath('http://example.com/asdf'); // => 'asdf'
lastUrlPath('http://example.com/asdf/'); // => ''
lastUrlPath('http://example.com/asdf/', false); // => 'asdf'
```

#### normalizeURLPathname (url: string) => string
Normalize given [url] {string}, converting to this format:
*   `/main/en/home`
*   `/main/en/home?key=value`

Does the following actions:
*   Remove leading & trailing whitespace, and trailing `/`
*   Precedes URL with single `/`
*   Removes all repeat slashes (e.g. `//` -> `/`; `///` -> `/`)
*   Replace `/?` with `?`

Examples:
```
normalizeURLPathname(``);                         // Output: ``
normalizeURLPathname(`/asdf/123`);                // Output: `/asdf/123`
normalizeURLPathname(`  /  `);                    // Output: `/`
normalizeURLPathname(`/////`);                    // Output: `/`
normalizeURLPathname(`/asdf//123`);               // Output: `/asdf/123`
normalizeURLPathname(`asdf`);                     // Output: `/asdf`
normalizeURLPathname(`/asdf/?key=val`);           // Output: `/asdf?key=val`
normalizeURLPathname(` ab//cd/ef///?key=val/  `); // Output: `/ab/cd/ef?key=val`
```



----------------------------------------------------------------------------------------------------
Namespace: search (isomorphic)
==============================
### escapeRegExp
*   WIP documentation

### matches
*   WIP documentation

### matchesIgnoreCase
*   WIP documentation

### replaceAll
*   WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: string ((Alias: str)) (isomorphic)
=============================================
### cap1LowerRest :: (string) => string
Make the first letter uppercase and the rest lowercase.

Examples:
```
cap1LowerRest('asdf'); // => 'Asdf'
cap1LowerRest('aSdF'); // => 'Asdf'
cap1LowerRest('This was already cap.'); // => 'This was already cap.'
cap1LowerRest('This Was Already Cap.'); // => 'This was already cap.'
cap1LowerRest('not Already Cap.'); // => 'Not already cap.'
```

### capitalize :: (string) => string
Make the first letter uppercase, and leave the rest as-is.

Examples:
```
capitalize('asdf'); // => 'Asdf'
capitalize('aSdF'); // => 'ASdF'
capitalize('This was already cap.'); // => 'This was already cap.'
capitalize('not Already Cap.'); // => 'Not Already Cap.'
```

### removeMatchingText :: (string, string|RegExp) => string
Return copy of string with all instances of substring or regexp (matcherToRm) removed.

Examples:
```
removeMatchingText('HeRMlloRM woRMrldRM', 'RM');     // => 'Hello world'
removeMatchingText('RMqwertyRM uioprm',   /rm ?/ig); // => 'qwertyuiop'
removeMatchingText('Hello world',         'ASafer'); // => 'Hello world'
```

### replaceAll :: (string, match: string|RegExp, replace: string) => string
Replace all matching strings or regexes in a text segment with given replacement string.
All matching strings get replaced.

Args:
*   1st arg: string to replace text in
*   match:   string(s) to replace (replace all matches)
*   replace: string to replace matches with

Examples:
```
replaceAll('The duck here is the best Jerry! The best!', 'best', 'bees-knees');
// => 'The duck here is the bees-knees Jerry! The bees-knees!'

replaceAll('The duck here is the best Jerry! The best!', /[tT]he best/g, 'OK');
// => 'The duck here is OK Jerry! OK!'
```

### chomp :: (string, charsToChomp: string = '\n\r') => string
Remove all chars in charsToChomp string from end of given string (1st arg).

Defaults to eliminating carriage return and newline (\n\r).

Examples:
```
chomp('asdf\n\r\n\r');                        // => 'asdf'
chomp('asdf\n \r  \n\r', '\n\r ');            // => 'asdf'
chomp('\n  \ras\ndf\n \r  \n\r   ', '\n\r '); // => '\n  \ras\ndf'
chomp('asdf\r \n', ' \n');                    // => 'asdf\r'
```

### escapeRegExp
*   WIP documentation

### isVoidOrString
*   WIP documentation

### matches
*   See docs in search namespace.

### matchesIgnoreCase
*   WIP documentation

### stringToEnumVal
*   WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: test (node)
======================
### expectNonEmptyObjectExists
Create Mocha test that passes if given object exists and is not empty

Examples:
```
expectEmptyObject({}); // << will not pass
expectEmptyObject({ a: 1 }); // << will pass
```

### expectEmptyObject
Create Mocha test that passes if given object is empty

Examples:
```
expectEmptyObject({}); // << will pass
expectEmptyObject({ a: 1 }); // << will not pass
```

### expectFunctionExists (ALIAS: expectFuncExists)
Create Mocha test that passes if given function exists

Examples:
```
const inc = (a: number) => a + 1;
expectFunctionExists({}); // << will not pass
expectFunctionExists(() => null); // << will pass
expectFunctionExists(inc); // << will pass
```



----------------------------------------------------------------------------------------------------
Namespace: types (Alias: type) (isomorphic)
===========================================
### isDateLike :: (any) => boolean
Return true if arg is a moment or Date instance; or a string, object, or number that moment can parse.

Excludes:
*   negative numbers
*   strings that parse to negative numbers
*   objects with date-irrelevant keys e.g. {year: 1123, bear: 'grizzly'}

Examples:
```
isDateLike('1990-12-10'); // => true
isDateLike(moment());     // => true
isDateLike(new Date());   // => true
isDateLike('asdf');       // => false
isDateLike(false);        // => false
```

### isBoolean :: (any) => boolean
Return true if arg is a boolean value (either true or false)

Examples:
```
isBoolean(false);         // => true
isBoolean(true);          // => true
isBoolean(Boolean(true)); // => true
isBoolean('');            // => false
isBoolean(0);             // => false
isBoolean('true');        // => false
isBoolean(() => true);    // => false
```

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

### isVoidOrString
*   True if given item doesn't exist, or is a string.
*   WIP documentation

### isInteger
*   True if given item is an integer
*   (see "number" section above)

### isIntegerLike
*   True if given item is an integer or string containing an item that can be converted to an integer.
*   (see "number" section above)



----------------------------------------------------------------------------------------------------
Namespace: type (node)
======================
### MWare
WIP documentation

### Middleware
WIP documentation

### ApplyMiddlewareFn
WIP documentation

### ExpressApp
WIP documentation

### Color
WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: type (browser)
=========================
WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: validation (isomorphic)
==================================
### isValidString
WIP documentation

### isEmailPotentiallyValid
WIP documentation

### noLowercase
WIP documentation

### noUppercase
WIP documentation

### noNumber
WIP documentation

### noSpecialChars
WIP documentation

### latinLangCharRegex
WIP documentation



----------------------------------------------------------------------------------------------------
Namespace: webpack (node)
=========================
WIP documentation

Documentation is a major WIP.
TODO More documentation in README.
TODO Document special React module.
