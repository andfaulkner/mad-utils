0.94.1
======
-   Recompile
-   Allow publish script to run without global replace-in-file package
-   Fix typo in publish script


----------------------------------------------------------------------------------------------------
0.94.0
======
-   Add removeIndent string function, for removing indents from tag templates.
-   Add oneLine string function, for converting multiline strings into single-line strings.


----------------------------------------------------------------------------------------------------
0.93.1
======
-   Upgrade reflect-metadata to 0.1.13 (potential breaking change)



----------------------------------------------------------------------------------------------------
0.92.2
======
-   Add new peekMulti method to CharInputStream
-   New CharInputStream alias CharStream


----------------------------------------------------------------------------------------------------
0.92.1
======
-   Add new len4 & len16 functions to uuid namespace that generates a 4 and 16-character UUIDs (respectively).
-   Fix doc for len8 method.


----------------------------------------------------------------------------------------------------
0.92.0
======
For boolStringToBool:
-   Better docs.
-   Strict mode now off by default.
-   Tests for correct strict mode default state.


----------------------------------------------------------------------------------------------------
0.91.2
======
Fix typings and docs in stream module.

0.91.1
======
Apply all SCSS utils dependent on flex to work with inline-flex.

Minor documentation fixes.

0.91.0
======
Add new debounce function:
    Arguments:
        cb: (...fnArgs: A[]) => any,
        wait: number,
        immediate: boolean = false

    Returns:
        type of cb, but with return type replaced with void


----------------------------------------------------------------------------------------------------
0.90.2
======
Add new colour: slightDarkPink: #f9adba
Includes CSS classes:
-   slight-dark-pink
-   bg-slight-dark-pink
-   bg-slight-dark-pink-hover
-   bg-slight-dark-pink-active
-   border-slight-dark-pink-active
produce<T extends ProduceConditions, U extends { [key in keyof T]: any }>(conditions: T, input: any): Promise<U> | U

0.90.1
======
Add more specificiity to opacity, visibility, and z-index SCSS utilities
i.e. `.opa-7` became `* * *.opa-7`

0.90.0 [BREAKING CHANGES]
=========================
Upgrade Typescript to v3.3.3
Upgrade Node to v10.15.0

Add getType function to types-iso, to get the "extended" type (in string form).
    - Adds types 'null', 'nan', 'regexp', 'array'; detects 'symbol' & 'bigint' in all environments.

Add DataTypesExpanded type to types-iso, containing extended list of types emitted by new getType function.

Breaking change: Swap 1st & 2nd generic in `omit` function, to work with Typescript 3.3+.


----------------------------------------------------------------------------------------------------
0.89.6
======
Add isObject function to types-iso

0.89.5
======
Remove postinstall - it causes install fail in receiving project

0.89.4
======
Add .overflow-word-break scss utils, including aliases:
    .ov-wrap-break-word, .break-word, .word-break-wrap, .wrap-word
    .ov-word-break, .wrap-break-word, .wrap-word-break

Add postinstall to ensure typings install always works with npm (as opposed to only yarn).

Minor typing fix.

0.89.3
======
arrayRemove function can now take predicate that removes elements that return true. New signature:
    arrayRemove(haystack, needle: (NonFunction | (item) => boolean), returnRemovals? = false)

0.89.2
======
Add 3rd param to arrayRemove function, to return the removed elements from the array.
- ...instead of the new value of the array, as displayed if true not passed as 3rd arg.
- New signature: arrayRemove(haystack, needle, returnRemovals? = false).

0.89.1
======
Add number handling to get function

0.89.0
======
Fix toCamelCase to work correctly when given snake_case strings.
- Previously it didn't capitalize the character after each `_`.


----------------------------------------------------------------------------------------------------
0.88.1
======
-   Add `fuzzySearch` function - does a fuzzy search for string `needle` in string `haystack`.

0.88.0 [BREAKING CHANGES]
=========================
-   Remove from `dom.ts`:
    -   Export `parseUserAgent`
    -   Export `getUserAgentParsed`

-   Remove module `event.ts`, including:
    -   `mouseEventFactory` function
    -   `removeClickEventFromId` function
    -   `addClickEventToId` function
    -   `EventFunction` type

-   Remove module `local-store.ts`, including:
    -   `getFromStorage` function
    -   `isAuthenticated` function

-   Remove `decorator.ts` module, including:
    -   `notForWebUse` and `methodNotForWebUse` decorators
    -   `getDecoratorType` function
    -   Secondary export of `singleton` decorator (still present in types-iso.ts)


----------------------------------------------------------------------------------------------------
0.87.1
======
### Allow symbols and numbers in:
-   defineProp
-   defineMethod
-   defineImmutableProp
-   defineMutableProp
-   defineDeletableProp
-   defineGetterProp

0.87.0
======
### Remove layout SCSS utils:
-   display-col
-   display-inline
-   display-block
-   display-inline-block
-   display-flex
-   display-table
-   display-col
-   display-td
-   display-table-col
-   display-table-column
-   display-row
-   display-tr
-   display-table-row
-   display-cell
-   display-table-cell
-   inflex & inlineflex (inline-flex instead)

### Remove unneeded justify-content SCSS util aliases:
-   All with prefixes:
    -   "jc-" e.g. ".jc-start"
    -   "flex-justifycontent-" e.g. ".flex-justifycontent-start"
    -   "justify-content-" e.g. ".justify-content-start"
-   flex-start, flex-center, flex-end
-   flex-middle, middle, mid
-   flex-sa, flex-spacearound, flex-space-around, sa, spacearound  [Use .space-around only]
-   flex-sb, flex-spacebetween, flex-space-between, sb, spacebetween [Use .space-between only]

### Remove unneeded align-items SCSS util aliases:
-   All with prefixes:
    -   flex-ai-
    -   flex-alignitems-
    -   flex-align-items-
    -   alignitems-
-   ai-mid, ai-middle, align-items-mid, align-items-middle
-   ai-fs, ai-fe, ai-flexstart, ai-flexend
-   align-items-fs, align-items-fe, align-items-flexstart, align-items-flexend
-   align-items-fstart
-   align-items-fend

### Remove unneeded align-self SCSS util aliases:
-   All with prefixes:
    -   flex-align-self-
    -   flex-alignself-
    -   alignself-
    -   flex-as-
    -   as-
-   align-self-mid, align-self-middle
-   align-self-fs, align-self-fe, align-self-flexstart, align-self-flexend
-   align-self-fstart
-   align-self-fend

### Remove unneeded align-self SCSS util aliases:
-   flex-dir-*
-   flex-direction-*

### Remove "overflow-" prefixed SCSS util aliases (use `.ovx-*` and `.ovy-*` utils instead)


----------------------------------------------------------------------------------------------------
0.86.1
======
Replace use of specific elements (`div`, `span`, etc) to increase selectivity in SCSS utils with use of `*`s.
-   Done in all remaining SCSS util files.

0.86.0
======
Rename ReactChildString & ChildString types.
*   Reason: They're useless. It's easier to just write {children?: string}.

In margin.scss, padding.scss, size.scss, position.scss:
*   Replace use of `div`s to increase selectivity in SCSS utils with use of `*`s.
*   Remove redundant selectors.

----------------------------------------------------------------------------------------------------
0.85.2
======
Add missing uuid module
*   Large issue - this caused mad-utils to break in projects that didn't install uuid module separately

0.85.1
======
Add colour darkerRed to SCSS, including utils:
*   dark-red, bg-dark-red, bg-dark-red-hover, bg-dark-red-active, border-dark-red

0.85.0
======
Migrate to use esModuleInterop=true in TS config 


----------------------------------------------------------------------------------------------------
0.84.0
======
Renamed `condSwitch` to `switchExpr`
*   Deprecated `condSwitch`


----------------------------------------------------------------------------------------------------
0.83.0
======
Remove getBaseFilenameFromPath function (it's already in Node as path.basename)

Fix SCSS error in text.scss causing newer SCSS build tools (Webpack plugins) to crash

----------------------------------------------------------------------------------------------------

0.82.1
======
Remove StrOrVoid type (it's causing build errors)

0.82.0 [BREAKING CHANGES]
=========================
Remove numerous SCSS position utils (top-*, bottom-*, left-*, right-* e.g. `top-450`):
*   55p                                          (e.g. `top-55p`)
*   n6, n7, n8, n9, n11, n12, n13, n14           (e.g. `bottom-n14`)
*   11, 12, 13, 14, 55, 65, 85, 95               (e.g. `left-11`)
*   225, 275, 325, 350, 375, 425, 450, 475, 525  (e.g. `right-225`)
*   550, 575, 600, 650, 700, 800, 850, 900, 950  (e.g. `top-550`)


----------------------------------------------------------------------------------------------------
0.81.0 [BREAKING CHANGES]
=========================
Add SCSS utils:
*   `fw-400`, `fw-600`, & `fw-700` - font-weights 400, 600, 700
*   `fs-9` - font-size 9

Remove SCSS utils:
*   `no-bold` (it's confusing)
*   `fw-bold` (redundant - covered by `bold` util)
*   `fs-31`, `fs-32`, `fs-33`, `fs-34`, `fs-36`, `fs-38`, `fs-45`
    -   That level of precision unneeded at those sizes
*   all text-indent SCSS utils - `ti-*`
*   -   e.g. `ti-1`
*   Remove `whitespace-*` prefixed aliases for white-space SCSS utils
    -   e.g. `ws-no-wrap`
    -   Leaves `ws-` prefixed forms in place
*   `p*-55`, `p*-57`, `p*-60`, `p*-65`, `p*-70`
    -   e.g. `pt-55`, `p-55`
    -   That level of precision unneeded
*   `ov-*`
    -   e.g. `ov-hidden`, `ov-auto`
*   `m*-32`, 34, 45, 57, 90, 125, 150, 175, 225, 275, 300, 400, 600, 700, 750, 800, 900, 1000
    -   e.g. `m-32`, `mb-n34p`, `mt-57`, `mt-n57`, `mr-n1000`
*   `float-r`, `f-right`, `float-l`, `f-left`
    -   Unneeded, use `float-right`, `float-left`
*   `w-mincont`, `w-mincontent`, `w-maxcont`, `w-maxcontent`, `w-maxc`, `w-max-c`, `w-minc`, `w-min-c`
*   `h-mincont`, `h-mincontent`, `h-maxcont`, `h-maxcontent`, `h-maxc`, `h-max-c`, `h-minc`, `h-min-c`

Clean specificity for all SCSS utils in:
*   margin.scss (e.g. `margin-auto` / `m-auto`)
*   padding.scss
*   size.scss
*   text.scss


----------------------------------------------------------------------------------------------------
0.80.0
======
Fixed bug in throttle where values from prototype weren't propagating to returned function

Remove exported React types:
*   AnyComponent
*   NamedSFC
*   ReactSFC

Allow displayName in Newable React types

0.79.2
======
Remove append function
Remove osNameSnakeCase function (just use osName, and run a snake_case function on it)

Rename userAgent to getUserAgentParsed, make it an exported function
*   Purposes:
    *   Make it clearer that it returns parsed userAgent *object*, not a string
    *   Ensure memoization and calculation doesn't occur until function is called, rather than
        having it happen greedily when the module is loaded (for performance and safety)

Add return types to DOM module

Major improvements to README

Simplify logger higher-order-component


----------------------------------------------------------------------------------------------------
0.78.2
======
Upgrade mad-logs to isomorphic variant

Fix docs in hocs module

0.78.1
======
toSnakeCase and toDashCase now:
*   Replace most special characters with _ (or -)
*   Replace quotes with _ (or -)
    *   Previously they were just eliminated
*   Handle accented characters (e.g. é)
*   Surround Þ þ ø µ and ß with _ (or -)
    *   e.g. `toDashCase('someµOf') // => some-µ-of`
*   Handle spaces correctly

0.78.0
======
Saner toSnakeCase behaviour:
*   Consistently handles consecutive caps correctly e.g.:
        goToHomeURLPath -> go_to_home_url_path
        goToHomeURL!Path -> go_to_home_url_path
        goToHOME URL!Path -> go_to_home_url_path
        etc...
*   Defaults to having special consecutive cap handling on
    *   Remove option to shut it off
*   Punctuation treated the same as a word break
*   Handles null & empty strings

New toDashCase function


----------------------------------------------------------------------------------------------------
0.77.0
======
Remove ".wrap-wrap" SCSS util

Add flex.as-* SCSS util collection
*   e.g. .flex.as-mid, .flex.as-start
*   Shorthands for .flex-as-* series

Add SCSS utils: .table-cell, .table-row, .table-col, .table-column
*   Aliases for .display-table-cell, .display-table-row, etc


----------------------------------------------------------------------------------------------------
0.76.3
======
isAbsoluteURL now handles missing // for all protocols but http & https

0.76.2
======
Make isAbsoluteURL handle null & undefined without crashing (it returns false)

0.76.1
======
Fix typings in `locale` module

Add isAbsoluteURL function
*   returns true if given string is an absolute URL (e.g. https://example.com)

0.76.0 [MAJOR REFACTOR] [BREAKING CHANGES]
==========================================
Include all shared namespaces in browser module export

Namespaces export changes:
*   Shared module export:
    *   Add `err` namespace alias (for `error` namespace)
    *   Add `stream` namespace
*   Browser module export:
    *   Add `srch` and `find` namespace aliases (for `search` namespace)
    *   Add `numeric` & `num` namespace aliases (for `number` namespace)
    *   Remove browser `types` namespace export
*   Node module export:
    *   Add `srch` and `find` namespace aliases (for `search` namespace)
    *   Add `numeric` & `num` namespace aliases (for `number` namespace)
    *   Remove Node `errorShared` namespace export

Remove `common` namespace exports:
*   Remove `common`, `commonIso` & `commonShared` exports from `./mad-utils/lib/shared`
*   Remove `common` export from `./mad-utils/lib/browser` & `./mad-utils/lib/node`

Node type changes:
*   Remove `Colors` type export from types-node (Node export)
*   More restrictive `ApplyMiddlewareFn` type: only allow `Object` & `Function` values


----------------------------------------------------------------------------------------------------
0.75.2
======
Fill in max-/min-width & max-/min-height SCSS utils for 27px, 28px, 27%, 28%
- They existed for width & height, so the oversight is confusing

0.75.1
======
Fix & expand docs for extractFromUrl
Fully unit test extractFromUrl

0.75.0
======
Add new functions to url submodule:
    *   `extractFromUrl`
    *   `normalizeURLPathname`
    *   `urlPathnameWithQuery`
    *   `urlPathname`

Add `urlGetQuery` alias `urlQuery` in URL module

Add new function `arrayRemove` to array submodule

Add mad-utils REPL for experiments


----------------------------------------------------------------------------------------------------
0.74.2
======
Add normalizeURLPathname function
*   Perform cleanups on a given pathname string:
    *   Remove preceding & trailing whitespace, and trailing /
    *   Replace `//` with `/`, `///` with `/`, etc.
    *   Replace `?/` with `?`
    *   Ensure a single `/` at beginning

Large changes to README
IDE-friendlier docs in url module

0.74.1
======
Fix Canadian postal code validation
- no longer rejects some valid postal codes
- doesn't crash when given null
- handles 3 character case correctly

Add `isCanadaPostalCode` alias for `validateCanadaPostalCode`

0.74.0 [BREAKING CHANGE]
========================
Remove `castToNum` function
*   Reason: its behaviour is weird & confusing, and it provides little benefit
    over `parseInt`, in exchange for a large mental load

Remove `convertDayOfWeekNumToString` function
*   Reasons:
    *   it's not internationalization-friendly (it only handles English)
    *   it's confusing

Fix `uuidRegex` to correctly detect UUIDs

Add new `isUUID` function for detecting if a value is a v4 UUID


----------------------------------------------------------------------------------------------------
0.73.1 [BREAKING CHANGE]
========================
Saner behaviour from `countOccurrences` function:
*   It now only returns a number, never a map
*   'Value to search for' (needle) argument goes 1st & is no longer optional
*   'Collection to search' (haystack) argument now goes 2nd
*   New example usage:
    ```
    countOccurrences(`a`, [`a`, `z`, `a`]) // => 2
    ```

Add `smoosh` alias for flatten 😈

More IDE-friendly & extensive docs in array module

Logs no longer include trailing ' ;' after the file tag (e.g. "🍀🍀🍀[filename.ts]🍀🍀🍀 ;")


----------------------------------------------------------------------------------------------------
0.72.1
======
Add diacritic handling to `isAlphabeticChar`
Add `isUndefined` function

0.72.0
======
New `validateCanadaPostalCode` function
*   Remove invalid characters from Canadian postal code validations

Add `canadaPostalCodePartialRegex`
*   Case-insensitive regular expression for matching full & partial Canadian postal codes

Remove `isValidString` function

Remove (validation-related) types:
*   `ValidationCondition`
*   `_RegCond`
*   `_NoMatcherCond`
*   `_Matcher`
*   `ValidationCondition`
*   `IsVStrOpt`

Remove `isEmailPotentiallyValid` alias for `isEmailValidBasic`


----------------------------------------------------------------------------------------------------
0.71.1
======
Remove BoolOrError convenience type aliases:
    - BoolOrErr
    - ErrOrBool
    - ErrorOrBool
    - ErrorOrBoolean
    - BooleanOrError

Improve various comment docs to make more friendly to Typescript tooling (cross-IDE)

0.71.0
======
Remove isMultilangTextObj function (it's confusing and bad practice)
Object module improvements:
    - Reduced size (should be more performant)
    - Eliminated unneeded imports
    - Expanded and cleaned docs


----------------------------------------------------------------------------------------------------
0.70.1
======
Add isNullOrUndefined function
Remove more spaces from SCSS files (shrink file size slightly)

0.70.0 [BREAKING]
=================
Removed TitleCased SCSS util class aliases/names:
* `.HelveticaNeue`
* `.HelveticaNeue-serif`

Removed all SCSS util class aliases/names preceded by `ff-` (uses util classes with raw font names instead):
* `.ff-better-helvetica`
    - instead use `.better-helvetica`
* `.ff-helvetica-neue-medium`
    - instead use `.helvetica-neue-medium`
* `.ff-helvetica-neue`
    - instead use `.helvetica-neue`
* `.ff-helvetica-neue-serif`
    - instead use `.helvetica-neue-serif`
* `.ff-helvetica-neue-light`
    - instead use `.helvetica-neue-light`
* `.ff-helvetica-neue-light-serif`
    - instead use `.helvetica-neue-light-serif`

Add new `.helvetica-neue-medium` font-family SCSS util class


----------------------------------------------------------------------------------------------------
0.69.1
======
Add more sizes for min-width, min-height, max-width, and max-height SCSS utils
Reduce filesize of pasition.scss & size.scss util modules (remove spaces before & after block braces)

0.69.0 [BREAKING]
=================
Add new `deindent` function in string module, for removing spaces before template strings

Remove `withLeftIndent` function (string module)

Remove entire webpack module
- Eliminates function `handlebarsPluginFactory`


----------------------------------------------------------------------------------------------------
0.68.0
======
Working catch statement for modify class name in singleton function
- Should get transpiled singleton function working in Safari 9

[BREAKING CHANGE] More robust isIntegerLike function
- Removes edge case allowing '.0', which can't be parsed
- Shorter, cleaner implementation
- More unit tests

Downgrade ts-node -> v6.1.* (needed to run tests)


----------------------------------------------------------------------------------------------------
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

Gets singleton method (from types-iso) to work in most environments where both:
- running Object.defineProperty on a read-only value throws
- all classes are read-only

Makes isDateLike more robust:
- Includes moment.isMoment check
- Returns false immediately on receiving undefined, null, or false


----------------------------------------------------------------------------------------------------
0.66.3 [BREAKING]
=================
Upgrade env-var-helpers to v5.0.0 (a semi-breaking change)
Upgrade errorsmith to v0.4.1 (semi-breaking)
Upgrade mad-logs to v10.3.3 (semi-breaking)

Remove errorsmith


----------------------------------------------------------------------------------------------------
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


----------------------------------------------------------------------------------------------------
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


----------------------------------------------------------------------------------------------------
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


----------------------------------------------------------------------------------------------------
0.61.0
======
Add isStringOrNumber aliases isStringOrNum & isStrOrNum

More TS-usable docs in function module

Remove 'location' module - moved to storage in wip/old/browser--geocode.ts
*   Reason: too specific, too brittle, too tied to Google
*   Eliminates "getCurrentCity" function

Remove unwanted log in node/test.ts module
*   Previously, expectEmptyObject would log typeof testValue


----------------------------------------------------------------------------------------------------
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


----------------------------------------------------------------------------------------------------
0.59.0 [BREAKING CHANGES]
=========================
New function 'runAll' - runs all functions in the given array & return results of each

Remove functions:
    - delegateAll - it's too dangerous & erratic to use safely
    - merge - it's pointless and confusing. Use ES7 object spread syntax instead
              e.g. {key: val, ...something}

nyc working (test-coverage)
File cleanups (prettier, docs more consistent)


----------------------------------------------------------------------------------------------------
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
