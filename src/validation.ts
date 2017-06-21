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
 *
 * @param {Condition[]} conditions - Confirm that string meets all of these conditions.
 * @param {string} testStr - String to check the conditions against
 * @param {string} confirmStr? - [OPTIONAL] String to ensure testStr is equal to
 *                                          (if match_confirmation present)
 * @param {Function} errDisplayCb? - [OPTIONAL] Function for displaying error message.
 *                                     Defaults to alert.
 *
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