/******************************************** ARRAYS **********************************************/
/**
 * Return last item in an array.
 */
export declare const last: <T>(arr: T[]) => T;
/**
 * Return second last item in an array.
 */
export declare const secondLast: <T>(arr: T[]) => T;
/**
 * Return third last item in an array.
 */
export declare const thirdLast: <T>(arr: T[]) => T;
/********************************************* DATE ***********************************************/
/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI.
 *
 * @param {string} timestampFormat - [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                                   See https://momentjs.com/docs/#/parsing/string-format/
 * @return {string} Current date and time, formatted for use in a timestamp
 *
 * @example Return current date + time as default-formatted timestamp:
 *              now(); // => 2017/02/28 : 12:53:57
 *
 * @example Return current date + time as timestamp without day or second:
 *              now(`YYYY/MM hh:mm`); // => 2017/02 12:53
 */
export declare const now: (timestampFormat?: string) => string;
/***************************************** DATA UTILITIES *****************************************/
/**
 * Return true if argument is a multilanguage string object
 */
export declare const isMultilangTextObj: (val: any) => boolean;
