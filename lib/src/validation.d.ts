export declare type _RegCond = 'min' | 'max' | 'gt' | 'min_length' | 'lt' | 'max_length' | 'match' | 'no_match' | 'length' | 'exact_length' | 'length_equals';
export declare type _NoMatcherCond = 'match_confirmation';
export declare type _Matcher = RegExp | number | string;
export declare type Condition = {
    type: _RegCond;
    matcher: _Matcher;
    errMsg?: string;
} | {
    type: _NoMatcherCond;
    errMsg?: string;
};
export declare type IsVStrOpt = {
    conditions: Condition[];
    testStr: string;
    confirmStr?: string;
    errDisplayCb?: (message?: any) => void;
};
/******************************************** EXPORTS *********************************************/
/**
 * Test that given string meets all of the validation conditions.
 * Condition format: { type: string, matcher?: RegExp|number, error: string }
 *     type - accepted values:
 *         min - specifies smallest allowed length
 *         max - specifies longest allowed length
 *         match - string must match the given regular expression
 *         no_match - string must NOT match the given regular expression
 *         match_confirmation - If present, check that testStr matches confirmStr
 *     matcher: Value to run testStr against. e.g. for { type: 'min', matcher: 4, err: 'a' },
 *                 check that testStr is a number greater than or equal to 4.
 *     error: Content of 'error' displays if the conditon is not met.
 * @param {Condition[]} conditions - Confirm that string meets all of these conditions.
 * @param {string} testStr - String to check the conditions against
 * @param {string} confirmStr? - [OPTIONAL] String to ensure testStr is equal to
 *                                          (if match_confirmation present)
 * @param {Function} errDisplayCb? - [OPTIONAL] Function for displaying error message.
 *                                     Defaults to alert.
 * @return {boolean} true if all validation conditions are passed. False if not.
 */
export declare function isValidString({conditions, testStr, confirmStr, errDisplayCb}: IsVStrOpt): boolean;
/**
 * Returns true if email address is probably (but not necessarily) correctly formatted.
 *
 * Remember that it's not actually possible to 100% validate an email address by examining or
 * analyzing it. The only way to truly prove an address is valid is to send it an email and
 * see if you get a response. This checker is thus kept deliberately simple, and intended only
 * to block the most obvious errors. It's also been kept maximally permissive.
 *
 * Use-case: client-side validation to help prevent users from accidentally submitting invalid
 * email addresses. Intended for improving UX, not for determining the data's actual validity.
 *
 * @param {string} email - email address to check for validity.
 * @return {boolean} true if email is probably valid.
 */
export declare const isEmailPotentiallyValid: (email: string) => boolean;
export declare const isEmailValidBasic: (email: string) => boolean;
/******************************************** HELPERS *********************************************/
/**
 * Return true if there are no lowercase letters in the give string.
 * @param {string} str - String to check for lowercase characters.
 * @return {boolean} False if string has any lowercase characters.
 */
export declare const noLowercase: (str: string) => boolean;
/**
 * Return true if there are no uppercase letters in the give string.
 * @param {string} str - String to check for uppercase characters.
 * @return {boolean} False if string has any uppercase characters.
 */
export declare const noUppercase: (str: string) => boolean;
/**
 * Return true if there are no numbers in the give string.
 * @return {boolean} False if string has any numbers.
 */
export declare const noNumber: (str: string) => boolean;
/**
 * Return true if there are no special chars in the given string.
 * Special chars: !@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>
 * @param  {string}  str String to check for special characters
 * @return {boolean}     True if no special chars are present in the given string
 */
export declare const noSpecialChars: (str: string) => boolean;
/******************************************** REGEXES *********************************************/
/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages.
 */
export declare const latinLangCharRegex: RegExp;
/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes
 */
export declare const latinLangCharWSlashesRegex: RegExp;
/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes, regular braces, and quotes (' and ")
 */
export declare const latinLangCharWSlashesQuotesBracesRegex: RegExp;
