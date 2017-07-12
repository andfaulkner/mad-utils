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
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36" +
 * "(KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
 */
export declare const getUserAgentString: () => any;
/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS"
 */
export declare const osName: () => any;
/**
* @return {string} Name of the browser. E.g. "Chrome"
 */
export declare const browserName: () => any;
/**
* @return {string} Name of the browser's rendering engine. E.g. "Webkit"
 */
export declare const browserEngineName: () => any;
/**
* @return {string} OS version. E.g. "10.11.6"
 */
export declare const osVersion: () => any;
/**
* @return {string} Browser version. E.g. "59.0.3071.115"
 */
export declare const browserVersion: () => any;
/**
* @return {string} Version of the browser's rendering engine. E.g. "537.36"
 */
export declare const browserEngineVersion: () => any;
/******************************************** HELPERS *********************************************/
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
export declare const $: (sel: string) => HTMLElement;
