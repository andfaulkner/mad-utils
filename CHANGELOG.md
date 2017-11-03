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
