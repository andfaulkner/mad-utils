/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />

// Ensure window object exists & is accessible
// tslint:disable-next-line:no-var-keyword
var window = window || (global && (global as any).window) || {navigator: {}};

/******************************************** IMPORTS *********************************************/
import {toSnakeCase} from '../string';
const UserAgentParser = require('ua-parser-js');

/**************************************** TYPE DEFINITIONS ****************************************/
export type ParsedUserAgent = IUAParser.IResult & {raw: string};

/******************************************* USER AGENT *******************************************/
/**
 * Memoized parsed browser user agent
 */
export var userAgent: ParsedUserAgent = userAgent || parseUserAgent();

/**
 * Parse browser's user agent & return an object with all user agent properties
 *
 * @param {string} userAgent Browser's userAgent string
 * @return {ParsedUserAgent} Data obj w all parsed attributes of user agent string:
 *                           {
 *                               raw:     string
 *                               ua:      string
 *                               os:      {name: string, version: string}
 *                               browser: {name: string, version: string}
 *                               engine:  {name: string, version: string}
 *                           }
 */
export function parseUserAgent(userAgent = window.navigator.userAgent): ParsedUserAgent {
    const ua = UserAgentParser(userAgent) as ParsedUserAgent;
    ua.raw = ua.ua;
    return ua;
}

/**
 * Return raw (unparsed) browser user agent string
 * Example:
 *     "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 *     "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
export const getUserAgentString = (mWindow?: Window): string =>
    (mWindow || window).navigator.userAgent;

/**
 * Get name of current computer's operating system e.g. "Mac OS", "Windows NT"
 * @return {string} Name of current computer's OS
 */
export const osName = (): string => userAgent.os.name;

/**
 * Get name of browser, e.g. "Chrome" or "Firefox"
 * @return {string} Name of browser
 */
export const browserName = (): string => userAgent.browser.name;

/**
 * @return {string} Name of browser's rendering engine.
 * @example browserEngineName(); // => "Webkit" (Chrome output. See getUserAgentString example above)
 * @example browserEngineName(); // => "Gecko" (Firefox output);
 *
 */
export const browserEngineName = (): string => userAgent.engine.name;

/**
 * @return {string} OS version. E.g. "17.14.2"
 */
export const osVersion = (): string => userAgent.os.version;

/**
 * @return {string} Browser version. E.g. "51.0.3272.211"
 */
export const browserVersion = (): string => userAgent.browser.version;

/**
 * @return {string} Version of the browser's rendering engine. E.g. "530.12"
 */
export const browserEngineVersion = (): string => userAgent.engine.version;

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
