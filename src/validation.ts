/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`validation.ts`, logMarkers.swimmers);

//*************************************** TYPE DEFINITIONS ****************************************/
export type Condition = {
    type: string,
    comparison?: RegExp | number,
    error: string
}


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
function handleValidationError(error: Error, errDisplayCb: ((message?: any) => void) = alert): false {
    log.error(`validation error: validate:`, error);
    errDisplayCb(error.message);
    return false;
}

export type IsVStrOpt = {
    conditions: Condition[],
    testStr: string,
    confirmStr?: string,
    errDisplayCb?: (message?: any) => void,
};

/******************************************** EXPORTS *********************************************/
/**
 * Test that given string meets all of the validation conditions.
 * Condition format: { type: string, comparison?: RegExp|number, error: string }
 *     type - accepted values:
 *         min - specifies smallest allowed length
 *         max - specifies longest allowed length
 *         match - string must match the given regular expression
 *         no_match - string must NOT match the given regular expression
 *         match_confirmation - If present, check that testStr matches confirmStr
 *     comparison: Value to run testStr against. e.g. for { type: 'min', comparison: 4, err: 'a' },
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
export function isValidString({conditions, testStr, confirmStr, errDisplayCb}: IsVStrOpt): boolean {
    try {
        conditions.forEach(cond => {
            switch (cond.type) {
                case "gt": case "min": case "greaterthan": case "greater_than":
                    if (testStr.length >= cond.comparison) return;
                    break;
                case "lt": case "max": case "lessthan": case "less_than":
                    if (testStr.length <= cond.comparison) return;
                    break;
                case "match":
                    if (testStr.match(cond.comparison as RegExp)) return;
                    break;
                case "nomatch": case "no_match":
                    if (!testStr.match(cond.comparison as RegExp)) return;
                    break;
                case "match_confirmation":
                    return confirmValidation(testStr, confirmStr, cond.error);
                default:
                    throw new Error(`Unknown validation condition type: ${cond.type}`);
            }
            throw new Error(cond.error);
        });
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
 * Returns true if given string is a valid postal code e.g. M9P 8Y1. If threeCharAllowed
 * param is set to true, also accepts the first 1/2 of a postal code e.g. M9P
 * @param  {string}  str              check if this string is a valid postal code
 * @param  {boolean} threeCharAllowed if true, also return true if only 3 letters long (but valid)
 * @return {boolean}                  true if str is a valid postal code or 1st 1/2 of postal code
 */
const validPostalCode = (str: string, threeCharAllowed = true): boolean =>
    threeCharAllowed
        ? !!str.match(/^[A-Za-z][0-9][A-Za-z]\s?([0-9][A-Za-z][0-9])?$/g)
        : !!str.match(/^[A-Za-z][0-9][A-Za-z]$/g);


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
