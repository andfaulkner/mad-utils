/**************************************** TYPE DEFINITIONS ****************************************/
export declare type _RegCond = 'min' | 'max' | 'gt' | 'min_length' | 'lt' | 'max_length' | 'match' | 'no_match' | 'len' | 'length' | 'exact_length' | 'length_equals';
export declare type _NoMatcherCond = 'match_confirmation';
export declare type _Matcher = RegExp | number | string;
export declare type ValidationCondition = {
    type: _RegCond;
    matcher: _Matcher;
    errMsg?: string;
} | {
    type: _NoMatcherCond;
    errMsg?: string;
};
export declare type IsVStrOpt = {
    conditions: ValidationCondition[];
    testStr: string;
    confirmStr?: string;
    errDisplayCb?: (message?: any) => void;
};
/******************************************** EXPORTS *********************************************/
/**
 * Returns true if email address is probably (but not definitely) correctly formatted
 *
 * This checker is thus deliberately simple and maximally permissive, and
 * intended only to block the most obvious errors
 * Reason: it's not possible to 100% validate an email address just by analyzing
 * it - the only way is to send it an email & see if you get a response
 *
 * Use-case: client-side validation to help prevent users from accidentally
 * submitting invalid email addresses
 * Intended for improving UX, not for determining the data's actual validity
 *
 * @param {string} email Email address to check for validity
 * @return {boolean} true if email is probably valid
 */
export declare const isEmailPotentiallyValid: (email: string) => boolean;
export declare const isEmailValidBasic: (email: string) => boolean;
/******************************************** HELPERS *********************************************/
/**
 * Return true if there are no lowercase letters in the give string
 * @param {string} str - String to check for lowercase characters
 * @return {boolean} False if string has any lowercase characters
 */
export declare const noLowercase: (str: string) => boolean;
/**
 * Return true if there are no uppercase letters in the give string
 * @param {string} str - String to check for uppercase characters
 * @return {boolean} False if string has any uppercase characters
 */
export declare const noUppercase: (str: string) => boolean;
/**
 * Return true if there are no numbers in the give string
 * @return {boolean} False if string has any numbers
 */
export declare const noNumber: (str: string) => boolean;
/**
 * Return true if there are no special chars in the given string
 * Special chars: !@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>
 * @param  {string}  str String to check for special characters
 * @return {boolean}     True if no special chars are present in the given string
 */
export declare const noSpecialChars: (str: string) => boolean;
/**
 * Returns true if given string is a valid Canadian postal code e.g. M9P 8Y1
 * If allow3Char param is set to true, also accepts the first 1/2 of a postal
 * code e.g. M9P
 * @param  {string}  str              check if this string is a valid postal code
 * @param  {boolean} threeCharAllowed if true, also return true if only 3 letters long (but valid)
 * @return {boolean}                  true if str is a valid postal code or 1st 1/2 of postal code
 */
export declare const validateCanadaPostalCode: (str?: string, allow3Char?: boolean) => boolean;
/******************************************** REGEXES *********************************************/
/**
 * Match Canadian postal codes & partially inputted Canadian postal codes (including ``)
 * Case-insensitive
 */
export declare const canadaPostalCodePartialRegex: RegExp;
/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages
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
