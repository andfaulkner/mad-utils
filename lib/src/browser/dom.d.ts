/// <reference path="../../../node_modules/@types/ua-parser-js/index.d.ts" />
/// <reference path="../../../node_modules/typescript/lib/lib.dom.d.ts" />
/// <reference types="ua-parser-js" />
/**************************************** TYPE DEFINITIONS ****************************************/
export declare type ParsedUserAgent = IUAParser.IResult & {
    raw: string;
};
/******************************************* USER AGENT *******************************************/
/**
 * Memoized parsed browser user agent
 */
export declare var userAgentParsed: ParsedUserAgent;
/**
 * Parse browser's user agent & return an object with all user agent properties
 *
 * @param {string} userAgent Browser's userAgent string
 * @return {ParsedUserAgent} Data obj w parsed attributes of user agent string:
 *                           {raw:     string
 *                            ua:      string
 *                            os:      {name: string, version: string}
 *                            browser: {name: string, version: string}
 *                            engine:  {name: string, version: string}}
 */
export declare function parseUserAgent(userAgent?: any): ParsedUserAgent;
/**
 * Return raw (unparsed) browser user agent string
 * Example:
 *     "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 *     "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
export declare const getUserAgentString: (mWindow?: Window) => string;
/**
 * Get name of current computer's operating system e.g. "Mac OS", "Windows NT"
 * @return {string} Name of current computer's OS
 */
export declare const osName: () => string;
/**
 * Get name of browser, e.g. "Chrome" or "Firefox"
 * @return {string} Name of browser
 */
export declare const browserName: () => string;
/**
 * Get name of browser's rendering engine
 *
 * Example (Chrome):  browserEngineName(); // => "Webkit"
 * Example (Firefox): browserEngineName(); // => "Gecko"
 *
 * @return {string} Name of browser's rendering engine
 */
export declare const browserEngineName: () => string;
/**
 * Get machine's OS semver version number (as a string), e.g. "17.14.2"
 * @return {string} numeric OS version (in string form)
 */
export declare const osVersion: () => string;
/**
 * Get browser version number (as a string), e.g. "51.0.3272.211"
 * @return {string} Browser version number string
 */
export declare const browserVersion: () => string;
/**
 * Get version number string of the browser's rendering engine, e.g. "530.12"
 * @return {string} Browser rendering engine version number (string)
 */
export declare const browserEngineVersion: () => string;
