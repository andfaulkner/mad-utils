/// <reference path="../../../node_modules/@types/ua-parser-js/index.d.ts" />
/// <reference types="ua-parser-js" />
export declare type ParsedUserAgent = IUAParser.IResult & {
    raw: string;
};
/******************************************* USER AGENT *******************************************/
/**
 * Memoized parsed browser user agent.
 */
export declare var userAgent: any;
/**
 * Parse the browser's user agent and return an object containing all user agent properties.
 * @param {string} userAgent - Browser's userAgent string
 * @return {ParsedUserAgent} Data object containing all parsed attributes of user agent string.
 *        { raw:     string
 *          ua:      string
 *          os:      { name: string, version: string }
 *          browser: { name: string, version: string }
 *          engine:  { name: string, version: string }}
 */
export declare function parseUserAgent(userAgent?: string): ParsedUserAgent;
/**
 * Return raw (unparsed) browser user agent string. e.g.
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 * "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
export declare const getUserAgentString: () => string;
/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS" or "Windows NT"
 */
export declare const osName: () => any;
/**
 * @return {string} Name of current OS, in snake_case. E.g. "mac_os" or "windows_nt"
 */
export declare const osNameSnakeCase: () => string;
/**
* @return {string} Name of the browser. E.g. "Chrome" (using example above), or "Firefox"
 */
export declare const browserName: () => any;
/**
* @return {string} Name of browser's rendering engine.
* @example browserEngineName(); // => "Webkit" (Chrome output. See getUserAgentString example above)
* @example browserEngineName(); // => "Gecko" (Firefox output);
*
 */
export declare const browserEngineName: () => any;
/**
* @return {string} OS version. E.g. "17.14.2"
 */
export declare const osVersion: () => any;
/**
* @return {string} Browser version. E.g. "51.0.3272.211"
 */
export declare const browserVersion: () => any;
/**
* @return {string} Version of the browser's rendering engine. E.g. "530.12"
 */
export declare const browserEngineVersion: () => any;
/******************************************** HELPERS *********************************************/
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
export declare const $: (sel: string) => HTMLElement;
