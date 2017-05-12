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
*   WIP

### last2
*   WIP

### last3
*   WIP

### firstN
*   WIP

### lastN
*   WIP

### arrayN
*   WIP

### secondLast
*   WIP

### thirdLast
*   WIP

### isArray
*   WIP

### append (arr1: any[] | any, arr2: any[] | any) => any[]
*   Append all items in arr2 to the end of arr1 (non-mutatively) and return it.
*   If either arr1 or arr2 are undefined, it ignores it and just returns the other.
*   If both are undefined, it returns [].
*   If a non-array value besides null is given, it wraps the item in an array
    before performing the concatenation.


Namespace : collection  (Alias: coll)
-------------------------------------
### last
*   WIP

### last2
*   WIP

### last3
*   WIP

### firstN
*   WIP

### lastN
*   WIP

### arrayN
*   WIP

### secondLast
*   WIP

### thirdLast
*   WIP

### isArray
*   WIP

### get
*   WIP


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
*   WIP

### capitalize
*   WIP

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
