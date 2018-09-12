/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`validation.ts`, logMarkers.swimmers);

//*************************************** TYPE DEFINITIONS ****************************************/
export type _RegCond = 'min'
                    | 'max'
                    | 'gt'
                    | 'min_length'
                    | 'lt'
                    | 'max_length'
                    | 'match'
                    | 'no_match'
                    | 'len'
                    | 'length'
                    | 'exact_length'
                    | 'length_equals';
export type _NoMatcherCond = 'match_confirmation';

export type _Matcher = RegExp | number | string;

export type Condition = {
    type: _RegCond,
    matcher: _Matcher,
    errMsg?: string
} | {
    type: _NoMatcherCond,
    errMsg?: string
};

export type IsVStrOpt = {
    conditions: Condition[],
    testStr: string,
    confirmStr?: string,
    errDisplayCb?: (message?: any) => void,
};


/******************************************** HELPERS *********************************************/
/**
 * Check that testStr matches confirmStr (if both exist).
 * Throw error with given message otherwise.
 */
function confirmValidation(testStr: string, confirmStr?: string, noConfirmErr?: string) {
    if (testStr !== confirmStr) {
        throw new Error(noConfirmErr || `${testStr} must be equal to ${confirmStr}`);
    }
}

/**
 * Display given error message if validation fails.
 * @param {string} error - Error message to display
 */
function handleValidationError(error: Error, errDisplayCb: ((message?: any) => void) = console.log): false {
    log.error(`validation error: validate:`, error);
    errDisplayCb(error.message);
    return false;
}

/******************************************** EXPORTS *********************************************/
/**
 * Test that given string meets all of the validation conditions.
 * Condition format: {type: string, matcher?: RegExp|number|string, errMsg: string}
 *     type - accepted values:
 *         min|gt|min_length - specifies smallest allowed length
 *         max|lt|max_length - specifies longest allowed length
 *         len|length|exact_length|length_equals - specifies the exact length input must be
 *         match - string must match the given regular expression
 *         no_match - string must NOT match the given regular expression
 *         match_confirmation - If present, check that testStr matches confirmStr
 *     matcher: Comparison value. e.g. for type 'len', val of matcher = exact required input length
 *     errMsg: Content of 'errMsg' displays if the conditon is not met.
 *     @example for array item in condition { type: 'min', matcher: 4, err: 'a' } :
 *              Check that testStr is a number that's >= 4. Throw err w message 'a' if it's not.
 * @param {Condition[]} conditions - Confirm that string meets all of these conditions.
 * @param {string} testStr - String to check the conditions against
 * @param {string} confirmStr? - [OPTIONAL] String to ensure testStr is equal to
 *                                          (if match_confirmation present)
 * @param {Function} errDisplayCb? - [OPTIONAL] Function for displaying error message.
 *                                     Defaults to alert.
 * @return {boolean} true if all validation conditions are passed. False if not.
 */
export function isValidString({conditions, testStr, confirmStr, errDisplayCb}: IsVStrOpt): boolean {
    try {
        // Iterate through given conditions/constraints
        conditions.forEach((props: Condition) => { // {type, matcher?, errMsg}
            const {type, errMsg} = props;
            const matcher = (props.type !== 'match_confirmation') && props.matcher;

            /* MATCHERS */
            switch (type) {
                case "gt": case "min": case "min_length":
                    if (testStr.length >= matcher) return;
                    break;
                case "lt": case "max": case "max_length":
                    if (testStr.length <= matcher) return;
                    break;
                case "len": case "length": case "exact_length": case "length_equals":
                    if (testStr.length === matcher) return;
                    break;
                case "match":
                    if (testStr.match(matcher as RegExp)) return;
                    break;
                case "no_match":
                    if (!testStr.match(matcher as RegExp)) return;
                    break;
                case "match_confirmation":
                    return confirmValidation(testStr, confirmStr, errMsg);
                default:
                    throw new Error(`Unknown validation condition type: ${type}`);
            }

            /* ERROR FACTORY (only reached if no matches above) */

            // If error message arg given, throw error with it as the message
            if (errMsg) throw new Error(errMsg);

            // If no error message included, build & throw custom error
            if (typeof confirmStr !== 'string') {
                throw new Error(`Value: ${testStr}\n  Condition type: ${type}`);
            } else {
                throw new Error(`Value: ${testStr}\n  Confirmation value: ${confirmStr}\n  ` +
                                `Condition type: ${type}`);
            }
        });

        // Only reaches here if no conditions were violated. Ret true = string is valid.
        return true;

    } catch(error) {
        return handleValidationError(error, errDisplayCb);
    }
}

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
export const isEmailPotentiallyValid = (email: string): boolean => !!email.match(/^.+@.+\..+$/gi);
export const isEmailValidBasic = isEmailPotentiallyValid;

/******************************************** HELPERS *********************************************/

/**
 * Return true if there are no lowercase letters in the give string.
 * @param {string} str - String to check for lowercase characters.
 * @return {boolean} False if string has any lowercase characters.
 */
export const noLowercase = (str: string): boolean => !str.match(/[a-z]/);

/**
 * Return true if there are no uppercase letters in the give string.
 * @param {string} str - String to check for uppercase characters.
 * @return {boolean} False if string has any uppercase characters.
 */
export const noUppercase = (str: string): boolean => !str.match(/[A-Z]/);

/**
 * Return true if there are no numbers in the give string.
 * @return {boolean} False if string has any numbers.
 */
export const noNumber = (str: string): boolean => !str.match(/[0-9]/);

// TODO add missing special characters to noSpecialChars: , ? . { }
/**
 * Return true if there are no special chars in the given string.
 * Special chars: !@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>
 * @param  {string}  str String to check for special characters
 * @return {boolean}     True if no special chars are present in the given string
 */
export const noSpecialChars = (str: string): boolean =>
    !str.match(/[!@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>]/);

/**
 * Returns true if given string is a valid postal code e.g. M9P 8Y1. If allow3Char
 * param is set to true, also accepts the first 1/2 of a postal code e.g. M9P
 * @param  {string}  str              check if this string is a valid postal code
 * @param  {boolean} threeCharAllowed if true, also return true if only 3 letters long (but valid)
 * @return {boolean}                  true if str is a valid postal code or 1st 1/2 of postal code
 */
const validCanadaPostalCode = (str: string = ``, allow3Char = true): boolean => {
    const ucStr = str.toUpperCase();
    return allow3Char
        ? !!ucStr.match(/^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVXY] ?([0-9][ABCEGHJKLMNPRSTVXY][0-9])?$/g)
        : !!ucStr.match(/^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVXY]$/g);
};

/**
 * Match Canadian postal codes & partially inputted Canadian postal codes (including ``)
 */
export const canadaPostalCodePartialRegex = /^(([ABCEGHJKLMNPRSTVXY]?)|([ABCEGHJKLMNPRSTVXY]\d)|([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY] ?)|([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY] ?\d)|([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY] ?\d[ABCEGHJKLMNPRSTVXY]\d?))$/i;

/******************************************** REGEXES *********************************************/
/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages.
 */
export const latinLangCharRegex =
    /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! ]+$/i;

/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes
 */
export const latinLangCharWSlashesRegex =
    /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! \/\\]+$/i;

/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes, regular braces, and quotes (' and ")
 */
export const latinLangCharWSlashesQuotesBracesRegex =
    /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! \/\\'"\(\)]+$/i;
