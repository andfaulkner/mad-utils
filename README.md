# mad-utils

*   Utilities I keep repeatedly rewriting across projects.

----
Functions, by namespace
=======================
To import namespaced functions:

    import { mUtils } from 'mad-utils';

Access functions in namespaces via:

    mUtils.search.replaceAll
    mUtils.number.isInt
    mUtils.date.isLeapYear
    mUtils.enum.enumValToString
    mUtils.collection.isArray
    mUtils.string.cap1LowerRest
    mUtils.array.secondLast
    mUtils.collection.secondLast
    ...etc...

mUtils is one of the 'namespace collection' exports. You can also get it like this if you hate named imports:

    import * as madUtils from 'mad-utils';
    const h = madUtils._;

Collection of namespaces available at multiple import locations. The following are all identical:

    import { _, __ m_, mUtils, madUtils } from 'mad-utils';

You can also just import functions one-by-one from a free-for-all top-level namespace. e.g.:

    import {  }


Inclusive, overlapping namespace strategy used.
Namespaces treated more like keywords than parent types.
Many functions are included in more than 1 namespace.
*   The main purpose of this API is to make common functions maximally available.
    *   Repeatedly checking each section hoping to remember where a function lives is annoying.
        *   ...but having 100s of them together in a giant namespace with no other form of organization available is also annoying.
    *   Compromise: Give everything to 

Function guide
==============
Namespace : array
-----------------
### last
(arr: T[]) => T
*   Return last item in given array

    last(['a', 'b', 'c', 'd']);
    // => 'd'

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

### secondLast
*   Return second-last item from given array. Return undefined if array has less than 2 items.

    secondLast(['a', 'b', 'c', 'd'])
    // => 'c'

### thirdLast
*   Return second-last item from given array. Return undefined if array has less than 3 items.

    thirdLast(['a', 'b', 'c', 'd'])
    // => 'b'

### isArray
*   True if item is an array

    isArray([]);
    // => true

    class CustomArray extends Array { }
    isArray(new CustomArray());
    // => true


### arrayN
(len: number) => undefined[]
*   Create empty array of given length.

    arrayN(6)
    // => [ undefined, undefined, undefined, undefined, undefined, undefined ]

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
### isLeapYear
*   WIP

### convertDayOfWeekNumToString
*   WIP

### parseDate
*   WIP

### now
*   WIP


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
