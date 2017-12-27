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
    *   Reason: with the previous generic signature, it wasn't possible to define an output type without an input type

Object#define*Prop - minor type fixes (generic can now more easily specify the new property value)
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
