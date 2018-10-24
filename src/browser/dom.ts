/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />

// Ensure window object exists & is accessible
// tslint:disable-next-line:no-var-keyword
var window = window || (global && (global as any).window) || {navigator: {}};

import { toSnakeCase } from '../string';

const UserAgentParser = require('ua-parser-js');

export type ParsedUserAgent = IUAParser.IResult & { raw: string };

/******************************************* USER AGENT *******************************************/
/**
 * Memoized parsed browser user agent.
 */
export var userAgent = userAgent || parseUserAgent();

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
export function parseUserAgent(userAgent = window.navigator.userAgent): ParsedUserAgent {
    const ua = UserAgentParser(userAgent) as ParsedUserAgent;
    ua.raw = ua.ua;
    return ua;
};

/**
 * Return raw (unparsed) browser user agent string. e.g.
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 * "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
export const getUserAgentString = (mWindow?: Window) => (mWindow || window).navigator.userAgent;

/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS" or "Windows NT"
 */
export const osName = () => userAgent.os.name;
/**
 * @return {string} Name of current OS, in snake_case. E.g. "mac_os" or "windows_nt"
 */
export const osNameSnakeCase = () => toSnakeCase(osName());

/**
* @return {string} Name of the browser. E.g. "Chrome" (using example above), or "Firefox"
 */
export const browserName = () => userAgent.browser.name;

/**
* @return {string} Name of browser's rendering engine.
* @example browserEngineName(); // => "Webkit" (Chrome output. See getUserAgentString example above)
* @example browserEngineName(); // => "Gecko" (Firefox output);
*
 */
export const browserEngineName = () => userAgent.engine.name;

/**
* @return {string} OS version. E.g. "17.14.2"
 */
export const osVersion = () => userAgent.os.version;

/**
* @return {string} Browser version. E.g. "51.0.3272.211"
 */
export const browserVersion = () => userAgent.browser.version;

/**
* @return {string} Version of the browser's rendering engine. E.g. "530.12"
 */
export const browserEngineVersion = () => userAgent.engine.version;

/******************************************** HELPERS *********************************************/
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
// export const $ = (sel: string): HTMLElement/* | HTMLElement[]*/ => {
//     // get by id
//     if (sel.split('#').length > 1) {
//         return document.getElementById.call(document, sel.split('#')[1]) as HTMLElement;
//     }
    // no # possible past here.
    // else if (sel[0] !== '.') {
    //     // if no classes defined
    //     if (sel.split('.').length === 1) {
    //         return document.getElementsByTagName(sel);
    //     }
    //     return document.getElementsByClassName.call(document, sel) as HTMLElement[];
    // }
// };
