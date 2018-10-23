/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs';
const log = logFactory(`validation.ts`, Styles.swimmers);

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
export const isEmailValidBasic = (email: string): boolean => !!email.match(/^.+@.+\..+$/gi);

/**
 * Return true if there are no lowercase letters in the give string
 * @param {string} str String to check for lowercase characters
 * @return {boolean} False if string has any lowercase characters
 */
export const noLowercase = (str: string): boolean => !str.match(/[a-z]/);

/**
 * Return true if there are no uppercase letters in the give string
 * @param {string} str String to check for uppercase characters
 * @return {boolean} False if string has any uppercase characters
 */
export const noUppercase = (str: string): boolean => !str.match(/[A-Z]/);

/**
 * Return true if there are no numbers in the give string
 * @return {boolean} False if string has any numbers
 */
export const noNumber = (str: string): boolean => !str.match(/[0-9]/);

// TODO add missing special characters to noSpecialChars: , ? . { }
/**
 * Return true if there are no special chars in the given string
 * Special chars: !@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>
 * @param  {string}  str String to check for special characters
 * @return {boolean}     True if no special chars are present in the given string
 */
export const noSpecialChars = (str: string): boolean =>
    !str.match(/[!@#$%^&*()\[\];:'"~`_\-+=|'"\/\\<>]/);

/**
 * Returns true if given string is a valid Canadian postal code e.g. M9P 8Y1
 * If allow3Char param is set to true, also accepts the first 1/2 of a postal
 * code e.g. M9P
 * @param  {string}  str              check if this string is a valid postal code
 * @param  {boolean} threeCharAllowed if true, also return true if only 3 letters long (but valid)
 * @return {boolean}                  true if str is a valid postal code or 1st 1/2 of postal code
 */
export const validateCanadaPostalCode = (str: string = ``, allow3Char = true): boolean => {
    if (typeof str !== `string`) return false;
    const ucStr = str.toUpperCase();
    return allow3Char
        ? !!ucStr.match(/^[a-z][0-9][a-z] ?([0-9][a-z][0-9])?$/gi)
        : !!ucStr.match(/^[a-z][0-9][a-z] ?[0-9][a-z][0-9]$/gi);
};

export {validateCanadaPostalCode as isCanadaPostalCode};

/******************************************** REGEXES *********************************************/
/**
 * Match Canadian postal codes & partially inputted Canadian postal codes (including ``)
 * Case-insensitive
 */
export const canadaPostalCodePartialRegex = /^(([a-z]?)|([a-z]\d)|([a-z]\d[a-z] ?)|([a-z]\d[a-z] ?\d)|([a-z]\d[a-z] ?\d[a-z]\d?))$/i;

/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages
 */
export const latinLangCharRegex = /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! ]+$/i;

/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes
 */
export const latinLangCharWSlashesRegex = /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! \/\\]+$/i;

/**
 * Matches all characters found in English amd French, & almost all in other
 * European/Latin-derived languages, plus slashes, regular braces, and quotes (' and ")
 */
export const latinLangCharWSlashesQuotesBracesRegex = /^[a-zàáâäãåąćčçèéêĕëēęìíîĭïłńñòóôðöõőo̧q̧ŗśšùúûüűýÿźžżæœßÞþøẞ! \/\\'"\(\)]+$/i;
