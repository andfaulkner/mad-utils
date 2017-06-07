export declare type Condition = {
    type: string;
    comparison?: RegExp | number;
    error: string;
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
export declare function isValidString({conditions, testStr, confirmStr, errDisplayCb}: IsVStrOpt): boolean;
