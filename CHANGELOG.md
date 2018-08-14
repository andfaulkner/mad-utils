0.67.1
======
Remove dev module fs-extra (there's fs-extra-promise already)

Upgrade dev modules
- synk -> v1.90.2
- prettier -> v1.14.2
- nodemon -> v1.18.3
- ts-node -> v7.0.1
- sinon -> 6.1.5
- tslint -> 5.11.0
  - Also upgrade all plugins to latest

0.67.0 [BREAKING]
=================
Remove node-polyglot module
Remove PolyglotProps type

Gets singleton method (from types-iso) works in environments where both:
- running Object.defineProperty on a read-only value throws
- all classes are read-only

Makes isDateLike more robust:
- Includes moment.isMoment check
- Returns false immediately on receiving undefined, null, or false



0.66.3 [BREAKING]
=================
Upgrade env-var-helpers to v5.0.0 (a semi-breaking change)
Upgrade errorsmith to v0.4.1 (semi-breaking)
Upgrade mad-logs to v10.3.3 (semi-breaking)

Remove errorsmith

0.65.1
======
throttle function:
*   Fix typings
*   Can now handles arguments
*   Transfers data keys on source function to throttled return function
*   Leaves "this" binding alone in throttled return function


0.65.0 [BREAKING CHANGES]
=========================
Remove entire JSON module
*   Remove jsonParseWFuncRehydrate_unsafe function
*   Remove jsonStringifyWFuncs function

More missing tests (sortObject)

0.64.4 (version jump due to release error)
==========================================
dateStringWithMonthTextToMoment improvements:
*   Handles 2-part date strings (returns null)
*   Handles text strings with dashes in them (returns null)
*   Handles text 'phrases' - i.e. strings with spaces in them (returns null)

0.63.2
======
dateStringWithMonthTextToMoment improvements:
*   Handles moment objects (returns them as-is)
*   Handles single digit values for month & date

0.63.1
======
Warning always shown when null returned from dateStringWithMonthTextToMoment

0.63.0
======
moment.js is now a peer dependency (to allow for proper locale handling)

Various typing & doc fixes

Add dateStringWithMonthTextToMoment function
*   Converts any date string containing a text-based month into a moment object
*   Handles fallback strings if fallback given

0.62.1
======
Add isAlphaChar alias for isAlphabeticChar

More robust check for moment object validity

0.62.0
======
Rename character utility types (capitalize the names):
*   char -> Char
*   chars -> Chars
*   character -> Character
*   characters -> Characters

Add isAlphabeticChar function that returns true if given an alphabetic character

README.md changes:
*   Remove merge function
*   Update 'get' function description

0.61.0
======
Add isStringOrNumber aliases isStringOrNum & isStrOrNum

More TS-usable docs in function module

Remove 'location' module - moved to storage in wip/old/browser--geocode.ts
*   Reason: too specific, too brittle, too tied to Google
*   Eliminates "getCurrentCity" function

Remove unwanted log in node/test.ts module
*   Previously, expectEmptyObject would log typeof testValue

0.60.0 [BREAKING CHANGES]
=========================
Remove confusing DecoratorError pseudo-class/function

getArgsFromFuncAsString (now getArgNames):
    - Rename to getArgNames
    - Returns an array of arguments rather than a comma-separated string
    - Remove aliases getParamNames, getParameterNames, getArgumentNames, getArgs
    - Add unit tests

Export getRandomInt function to generate a random integer between min and max values

condSwitch docs improved (adds note about usage with prettier)

Unit tests for:
    - runAll
    - getRandomInt

0.59.0 [BREAKING CHANGES]
=========================
New function 'runAll' - runs all functions in the given array & return results of each

Remove functions:
    - delegateAll - it's too dangerous & erratic to use safely
    - merge - it's pointless and confusing. Use ES7 object spread syntax instead
              e.g. {key: val, ...something}

nyc working (test-coverage)
File cleanups (prettier, docs more consistent)

0.58.4
======
Formatted CHANGELOG

Fix typings for isFunction

SCSS text utils:
    *   Convert ls-#.# to ls-#pt# & ls-#p#
    *   Higher specificity for font-family utils
    *   Higher specificity for font-size

"sample" function:
    *   handles empty Maps & Sets
    *   unit tests for Map & Set
    *   type signatures for Map & Set inputs

0.58.1
======
Fix typings (to allow TS v2.9.2 to work) in object module for:
    *   defineProp
    *   defineMethod
    *   defineMethod
    *   defineImmutableProp
    *   defineMutableProp
    *   defineDeletableProp
    *   defineGetterProp

Code cleanup (prettier, doc fixes) on all tests, object module, & types-iso module

0.58.0
======
Upgrade Typescript to v2.9.2

Add rmAllFalsy alias rmFalsyVals
*   Reason: the name 'rmAllFalsy' is unsemantic, because the function can be
    configured to instead remove a selected subset of falsy val types

Remove NumberLike, NumLike types

isNumberLike function no longer handles string & nunber arrays with 1 item
isLeapYear function no longer takes string & nunber arrays with 1 item


----------------------------------------------------------------------------------------------------
0.57.5
======
Add optional 2nd config param to rmAllFalsy (alias: compact) function, with options:
    *   'allFalsy'  - Remove all falsy values [DEFAULT]
    *   'nullUndef' - Remove only null & undefined values
    *   'keep0'     - Remove all falsy values except 0
    *   'keepStr'   - Remove all falsy values except ''

0.57.4
======
Add deburrFrenchEnglish function
*   Deburr map contains all accents/diacritics found in both English and French
    *   These get mapped to the accentless versions

0.57.3
======
Add more z-indexes to SCSS utils

0.57.2
======
New alias for rmAllFalsy: compact
Function 'sample' working for Set & Map objects
Rm logs from function 'get'

0.57.1
======
Revamped get function:
-   Can now handle symbol, string, boolean, function, & number types as input
    -   Traverses all of the above
-   Returns null if value at final path is null
-   Handles trailing and preceding dots in path
-   Many more function tests

New ls-0pt* namespace/aliases (e.g. ls-0pt5) for letter-spacing SCSS utils
-   Previously it was only found at ls-0p* (e.g. ls-0p5), which caused confusion


----------------------------------------------------------------------------------------------------
0.56.0
======
Add robust isString function to types-iso module
Add type guards to types-iso functions
More robust isStringOrNumber function (detects more string cases)
Simpler isTrue & isFalse functions
Replace typeof comparisons in types-iso with more robust detection functions (isString, etc)


----------------------------------------------------------------------------------------------------
0.55.3
======
Fix dark-sky-blue color class names (in SCSS util classes)

0.55.2
======
Add throttle function
Clean up after changes to blue SCSS util class changes

0.55.1
======
Add border-radius by percentage util-styles e.g. br-10p
Update & clean up general rules in in-code docs for SCSS utils (in util-styles)

0.55.0
======
Changes to blue colour SCSS util classes:
    *   Rename SCSS variable   ::  "midLightBlue"       => "lighterSkyBlue"
        *   Rename SCSS class  ::  "mid-light-blue"     => "lighter-sky-blue"
    *   Rename SCSS variable   ::  "paleSkyBlue"        => "skyBlue"
        *   Rename SCSS class  ::  "pale-sky-blue"      => "sky-blue"
    *   Rename SCSS variable   ::  "skyBlue"            => "darkSkyBlue"
        *   Rename SCSS class  ::  "sky-blue"           => "dark-sky-blue"
    *   Rename SCSS variable   ::  "slightlyDarkBlue"   => "palestDarkBlue"
        *   Rename SCSS class  ::  "slightly-dark-blue" => "palest-dark-blue"
    *   New SCSS variable  :: "palerDarkBlue"
        *   New SCSS class :: "pale-dark-blue"
    *   Rename SCSS variable   ::  "slightDarkBlue"     => "paleDarkBlue"
        *   Rename SCSS class  ::  "slight-dark-blue"   => "pale-dark-blue"


----------------------------------------------------------------------------------------------------
0.54.3
======
Quick patch to fix .outline-none & .no-outline CSS util classes
    *   set to operate on focus rather than always

0.54.2
======
Add .gitattributes
Add .outline-none & .no-outline CSS util classes
Upgrade colors module to 1.2.4 (and @types/colors to 1.2.1)

0.54.1
======
Add getCookieFromReq function to express-routing
*   Extracts cookie from express request headers property

isSupportedLang (express-routing):
*   now eliminates trailing slashes before comparison
*   Unit tests

0.54.0
======
Fix express-routing: getNoTrailingSlashUrl function
    *   Rename getNoTrailingSlashUrl -> getUrlPathFromReq
    *   Fix docs
    *   Takes keepTrailingSlash param (default false) that leaves trailing slash on end if true
    *   It no longer sometimes duplicates pre-slash string parts
    *   Removed lodash dependency (from getUrlPathFromReq)
    *   Unit tests

Rename checks for request type (express-routing):
    isJsAsset -> isRequestForJsAsset
    isJSAsset -> isJsAssetRequest
    isCssAsset -> isRequestForCssAsset
    isCSSAsset -> isCssAssetRequest


----------------------------------------------------------------------------------------------------
0.53.4
======
Upgrade common-constants -> v4.1.0
Upgrade dev modules (prettier, tslint, etc)

0.53.3
======
Width & height utils for 0px (h-0, w-0, maxw-0, maxh-0, minw-0, minh-0, w-all-0, h-all-0)

0.53.2
======
Fixes error in object module -> get function (where 0 & '' values trigger the default value)
Fixes bc-gray in border.scss (it changes border-color, not border-color-right)

0.53.1
======
New BoolOrError type - either a boolean or an error. Aliases:
    - BoolOrErr
    - ErrOrBool
    - ErrorOrBool
    - ErrorOrBoolean
    - BooleanOrError

More in-code docs for util-styles (SCSS)

0.53.0
======
Fixes arrayN function (array module) - can correctly create arrays filled with falsy values


----------------------------------------------------------------------------------------------------
0.52.2
======
Adds new defineMethod function to object module

0.52.1
======
Upgrades errorsmith to v0.3.0

0.52.0
======
Removed Injection aliases:
    - MandatoryInjectionViaDecoratorType
    - MandatoryInjectionViaDecorator
    - MandatoryInjectionType
    - RequiredInjectionType
    - OptionalInjectedType
    - InjectionType

Removed HTTPRequestType aliases:
    - AnyHTTPRequestType
    - AnyHttpRequestType
    - AnyHttpReqType
    - HTTPReqType
    - HttpRequestType
    - HttpReqType

Remove MainHTTPRequestType aliases:
    - MainHTTPReqType
    - MainHttpRequestType
    - MainHttpReqType

Added MainHTTPRequestType aliases:
    - CommonHTTPRequestType
    - CommonRequestType

Removed StrOrNum aliases:
    - NumOrStr
    - NumberOrString

Removed StrOrErr alias: StrOrError
    - also, corrected StrOrErr to match on string (rather than String)

Removed StringNumHash alias: StringNumberHash

Renamed StrOrNonexistent to StrOrVoid, and removed alias StringOrNonexistent
Renamed isNonexistentOrString to isVoidOrString

Added function 'isFunction' on types-iso module
Added function 'omit' on 'object' module

Ran prettier on:
    - types-react.ts
    - types-iso.ts
    - object.spec.ts


----------------------------------------------------------------------------------------------------
0.51.3
======
Cleaned up code in array module

Upgraded React, React-DOM, moment, lodash, nodemon, prettier, & tslint (+ all tslint plugins)

0.51.2
======
publish script expanded - added docs, renamed, more functionality
    *   Made reinstallation into Javelin & webclient optional

0.51.1
======
Added basic publish script

0.51.0
======
Eliminated the following aliases from the string module:
    *   toSnakecase (alias of toSnakeCase) 
    *   rmSpaces, rmWhitespace, eliminateWhitespace (aliases of removeWhitespace) 
    *   getFirstMatch, firstMach (aliases of matchFirst)
    *   repeatString, repeatChar (aliases of repeatChars)
    *   centeredPad (alias of centerPad)
    *   withoutSurroundingQuotes (alias of removeSurroundingQuotes)
    *   isRegexStr (alias of isRegexString)
    *   getFlagsFromRegexStr (alias of getFlagsFromRegexString)

No longer exporting \_cleanCharToPadWith from string module (it's now local-only)

Renamed removeSurroundingRegexSlashes -> removeSlashesFlagsSurroundingRegexString & removed aliases:
    *   withoutSurroundingRegexSlashes
    *   withoutRegexSlashesAndFlags
    *   removeRegexSlashesAndFlags
    *   removeSurroundingRegexSlashesAndFlags

Removed matchCharInChars from string module, along with aliases isOneOfChars & matchOneOfChars

toSnakeCase now handles slashes (replaces / or \ with \_)


----------------------------------------------------------------------------------------------------
0.50.3
======
Fixed object module error
Exported sortObject

0.50.2
======
Added sortObject function in object module
Object module cleanups (prettier, extracted keys from Object, etc.) 

0.50.1
======
Added new function getRandomInt:
*  gets random integer between given min & max values

Typescript upgraded to 2.7.2

Upgraded modules to latest: tslint, eslint, prettier, ts-node, nodemon

Various styling, linting, transpiling, etc configuration changes
*   made consistent with other projects

0.50.0
======
Prettier run on: error, decorator, function 
Cleanups in error module - including more added typings
'wip' directory added, work-in-progress error & function code moved into it


----------------------------------------------------------------------------------------------------
0.49.2
======
Exporting DecoratorTargetType type from decorator module
Fixed getDecoratorType docs
Removed test code from decorator module

0.49.1
======
getDecoratorType function added to decorator.ts
*   determines what type of decorator the arguments represent
*   e.g. if arguments received by placing a decorator above a class, emits "CLASS";
         on a static prop, it emits 'STATIC_PROPERTY', etc.


----------------------------------------------------------------------------------------------------
0.48.0
======
isInteger (isInt) & isIntegerLike (isIntLike) made saner & more robust:
*   isInteger no longer accepts integer-like strings (e.g. "12", "43.0")
    *   (reason: that's what isIntegerLike is for).
*   isInteger tries to use built-in Number.isInteger before using custom solution.
*   isIntegerLike now accepts strings ending in .0, .00, .000, .0000, .00000, etc.
*   More extensive isIntegerLike & isInteger tests.

SCSS utils:
*   More overflow SCSS util types
*   Cleaned up SCSS layout utils & handled more titling edge cases

Unit test for regular expressions given to removeMatchingText function


----------------------------------------------------------------------------------------------------
0.47.3
======
Number->createChangeArray :: Now handles:
*   negative incrementor
*   equal start val & end val
*   incrementor of '0' (it throws, unless start val === end val)
*   end val lower than start val (it creates a decrementing array)

More createChangeArray unit tests.

0.47.2
======
Better docs, arg names, generic names, & generic defaults for:
    Object->defineProp
    Object->defineImmutableProp
    Object->defineMutableProp
    Object->defineGetterProp

Added Object->defineProp to README.md.
Fixed CHANGELOG.md formatting.

0.47.1
======
Object#defineProp: Better docs, wrote unit tests

0.47.0
======
Validation#isValidString:
* unit tested (most of it, but not 100% thoroughly)
* added new 'exact length' condition (len, length, exact_length, length_equals)
* custom error ourputs on fail, for conditions where no error message given
* changed 'error' param in 'condition' object (within 'conditions' array) to be 'errMsg'
* more reusable typings
* conditions turned into union types with all allowed values provided, rather than being treated as being type 'string'


----------------------------------------------------------------------------------------------------
0.46.1
======
Object#get: Fixed generic typing.
*   New generic type for function: <O = any, T extends object = {}>
    *   Reason: with previous generic signature, it was impossible to define an output type without an input type

Object#define\*Prop - minor type fixes (generic can now more easily specify the new property value)
Unit tested Object#defineGetterProp

0.46.0
======
Object#get:
*   handles square braces for grabbing values (not just dots)
*   more robust 'bad input' detection
*   fails with undefined
*   gives undefined rather than throwing under more circumstances
*   allows combination of . and [] for calling
*   unit tested extensively
*   working with arrays (DOES NOT split strings though, which is good)

Array#flatten function created: turns nested arrays into a single flat array

More margin SCSS utils - with negative margins:
*   mt-n75, mb-n75, mr-n75, ml-n75
    ...up to:
*   mt-n1000, mb-n1000, mr-n1000, ml-n1000
*   in between:
    *   every multiple of 10 up to 100
    *   every multiple of 100 or 250, up to 1000

Repaired getFirstUrlPath function in express-routing
Unit tested getFirstUrlPath & getLastUrlPath


----------------------------------------------------------------------------------------------------
0.45.2
======
Aliased overflow util style namespace in SCSS utils - added ovx and ovy prefixes e.g.
  ovx-hidden
  ovy-overlay
  ovx-scroll
  ovy-visible

0.45.1
======
More overflow util styles
Node -> 8.9.1

0.45.0
======
MAJOR BREAKING CHANGE ::
bug fixed in w-###p size utilities. -all suffix was forgotten, so all w-###p utils acted like w-all-###p utils.
This means all w-###p utils contained width, max-width, and mid-width properties, while w-all-###p did not work at all.


----------------------------------------------------------------------------------------------------
0.44.0
======
Upgraded modules:
*   TS to v2.16.2 (major upgrade)
*   React & React-DOM (both internal) to v16
*   Enzyme to v3 (internal)
All tests & functions modified to account for upgraded modules (& prior React upgrade)
isTrue & isFalse made fully case-insensitive
displayName values added to built-in React components
Removed buildNamedSfc/setNamedSfc
Rotation SCSS utilities 
...etc.


----------------------------------------------------------------------------------------------------
0.43.0
======
Upgraded typings for React & React-DOM to v16
Fixed peerDependencies to provide a range


----------------------------------------------------------------------------------------------------
0.42.4
======
Fixed replaceInFile type signature
Cleaned file module (shrank size etc)

0.42.3
======
Using shared mad-logs in node file module
Upgraded env-var-helpers & lodash

0.42.0
======
'prettier' code styling added:
*   module installed
*   configured with .prettierrc config file added
*   styled string.ts, types-iso.ts, types-iso.spec.ts, function.ts, date.ts, array.ts 
Removed external-location barrel exports from string, array, date, & types-iso
Various cleanups in array, string, types-iso, date
Types known following type detection methods in types-iso


----------------------------------------------------------------------------------------------------
0.41.0
======
boolStringToBool: saner behaviour
*   added 2nd param that (if set to false) returns null instead of throwing if invalid input given
*   unit tested boolStringToBool


----------------------------------------------------------------------------------------------------
0.40.0
======
Removed all re-exports from array included in string module


----------------------------------------------------------------------------------------------------
0.39.12
=======
Added more whitespace utils

0.39.9
======
Added more align-items, align-self flexbox layout CSS class aliases in SCSS utils

0.39.8
======
New margin sizes available: 17px, 18px, 17%, 18%, -17px, -18px, -17%, -18% 
Fixed isNumberLike to handle objects that extend Number
Code comment (and autocomplete) fixes/edits in types-iso module
New isNumber function - detects if value is any kind of number. Alias:
*   isNum

0.39.5
======
Number type detection functions can now handle any custom numeric objects with Number as prototype. Applies to:
* isNumberLike
* isNumLike
* isInteger
* isInt
* isIntegerLike
* isIntLike
* isStringOrNumber
This also allows passing of custom numeric objects to castToNum function

0.39.4
======
Fixed typings & in-code docs in array module

0.39.3
======
More flexbox SCSS util aliases

0.39.2
======
Added isInt, isIntLike, isBool aliases
Fixed alias export method (partially) in types-iso
Set types-iso number detectors to handle Number object instances
Updated tests to include new aliases

0.39.1
======
Added lightened-gray colour to SCSS utils

0.39.0
======
Removed .bot-* SCSS utils (they took up needless space)


----------------------------------------------------------------------------------------------------
0.38.10
=======
Considerably more position SCSS/CSS utilities

0.38.9
======
Added more getLangFromUrlPathname aliases:
*   langFromUrl
*   langFromURL
*   getLangFromUrl
*   getLangFromURL

New convenience union type export: StrOrErr, with alias:
*   StrOrError

0.38.2
======
firstMatch renamed to matchFirst (in string module :: string.ts)

0.38.0
======
Renamed query module -> url module
*   It's now found in src/url.ts, rather than src/query.ts

Fixed typings of various url (query) module function

Cleaned up url functions to avoid using 'cached' window.location object
*   It now re-retrieves the window.location object on every use, ensuring the value stays fresh.

Added string module function:
*   firstMatch

Added url functions:
*   urlGetQuery, with aliases:
    *   getQueryParamString
    *   getQueryParamString
    *   urlGetQueryString
    *   urlGetQueryParamString

*   urlWithoutProtocol, with aliases:
    *   urlMinusProtocol

*   urlProtocolString, with aliases:
    *   urlGetProtocolString
    *   getUrlProtocolString
    *   getURLProtocolString
    *   getProtocolStringFromUrl
    *   getProtocolStringFromURL

*   urlMinusLastPath, with aliases:
    *   getURLMinusLastPath
    *   getUrlMinusLastPath

*   swapLastURLPath, with aliases:
    *   swapLastUrlPath

*   swapMatchingURLPaths, with aliases:
    *   swapMatchingUrlPaths
    *   swapUrlPaths
    *   swapURLPaths
    *   urlSwapPathMatches
    *   urlSwapMatchingPaths
    *   replaceMatchingURLPaths
    *   replaceMatchingUrlPaths
    *   replaceUrlPaths
    *   replaceURLPaths
    *   urlReplacePathMatches
    *   urlReplaceMatchingPaths


----------------------------------------------------------------------------------------------------
0.37.2
======
*   Added createRangeArray
    *   function to create numeric range arrays with a given start value, end value & value to increment by
*   Added random value generator functions:
    *   diceRoll6Sided: randomly outputs 1, 2, 3, 4, 5, or 6
    *   coinFlip: randomly outputs 'HEADS' or 'TAILS' 

0.37.1
======
*   More integer ranges added:
    *   Now goes all the way to Int1To100, increasing by usual 10 digit increments
    *   Int0To[##] series (e.g. Int0To10, Int0To20, Int0To30, ..., Int0To100)
    *   Int0To5, Int1To5, Int0To25, Int1To25
    *   Int0To1, Int0To2, Int0To3, Int0To7, Int1To2, Int1To3, Int1To7

0.37.0
======
*   Renamed near-faint-blue -> pale-sky-blue
*   All colours now work with borders (i.e. every colour can be used as a border colour)
    *   Borders found at styles with naming convention: 'border-{name-of-colour}'. e.g.:
        border-blue
        border-near-light-gray
        border-pale-sky-blue
        border-light-purple


----------------------------------------------------------------------------------------------------
0.36.6
======
*   defineGetterProp method. Aliases:
    *   addGetterProp 
    *   addGetter
    *   defineGetter
    *   addGetProp
    *   defineGetProp

0.36.2
======
Added functions:
*   removeSurroundingQuotes. Aliases:
    *   withoutSurroundingQuotes
*   isRegexString. Aliases:
    *   isRegexStr
*   getFlagsFromRegexString. Aliases:
    *   getFlagsFromRegexStr
*   removeSurroundingRegexSlashes. Aliases:
    *   withoutSurroundingRegexSlashes
    *   withoutRegexSlashesAndFlags
    *   removeRegexSlashesAndFlags
    *   removeRegexLiteralChars

0.36.1
======
Added function:
*   removeDuplicates. Aliases:
    *   uniq, uniqVals, uniqueVals, removeDuplicateVals, removeDuplicateItems
    *   uniqChars, uniqueChars, removeDuplicateChars

Made countOccurrences also work for strings (rather than just arrays)

Added numerous aliases for countOccurrences:
    *   count, countAll, countItems, countArrayItems
    *   countChars, countCharOccurrences, charOccurrences, charCount

0.36.0
======
Added new 'sample' function - gets a random value from a collection (string, array, or object)

Removed confusing UUID functions from number module and top-level namespace - replaced with props in UUID namespace:
*   noDashes <-- now found at uuid.noDashes
*   genLen6ID, gen6CharID, genLen6Str, gen6CharStr <-- now found at uuid.len6
*   genLen8ID, gen8CharID, genLen8Str, gen8CharStr <-- now found at uuid.len8

More robust isArray check

Added functions:
*   insectKeyTree: Gives detailed information on keys in object's full prototype chain
*   pushIfUniq: Pushes item into array only if array doesn't already have a matching item.
    *   alias: pushIfNew
    *   alias: pushUniq

Added types:
*   Any: Another alias for any


----------------------------------------------------------------------------------------------------
0.35.0
======
Upgraded Typescript to 2.5.2

Upgraded Node to 8.6.0

New functions:
*   defineImmutableProp
*   defineMutableProp
*   countOccurences
*   immutablePropConfig
*   isAlphanumericChar
*   isWhitespaceChar
*   isNumericChar
*   isOperatorChar
*   getArgsFromFuncAsString, with aliases:
    *   getParamNames
    *   getParameterNames
    *   getArgNames
    *   getArgumentNames

New types:
*   StringHash
*   StringNumHash
*   StringNumberHash

Fixed date tests


----------------------------------------------------------------------------------------------------
0.25.0
======
Upgraded Typescript version to 2.3.0, from 2.2.1
Set all React packages to install from 15.x  


----------------------------------------------------------------------------------------------------
0.24.0
======
withLeftIndent has breaking changes
*   Behaves more predictably (and usefully).
    *   Defaults to indent of 0 (first-line variable thus no longer always required)
    *   Removes unpredictable addition of 4 spaces to indent (it now always indents to the expected size)
    *   No longer includes the last line in its 'initial indent' calculation.
        *   Thus avoiding issues where the last line knocks everything forward or backward based on the text alignment scheme.
*   Essentially anything relying on previous broken withLeftIndent behaviour will have errors.
