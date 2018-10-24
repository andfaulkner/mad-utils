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
// tslint:disable-next-line:no-var-keyword
/**
 * Memoized parsed browser user agent
 */
var userAgent: ParsedUserAgent = userAgent || parseUserAgent();

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
 * Get name of browser's rendering engine
 *
 * Example (Chrome):  browserEngineName(); // => "Webkit"
 * Example (Firefox): browserEngineName(); // => "Gecko"
 *
 * @return {string} Name of browser's rendering engine
 */
export const browserEngineName = (): string => userAgent.engine.name;

/**
 * Get machine's OS semver version number (as a string), e.g. "17.14.2"
 * @return {string} numeric OS version (in string form)
 */
export const osVersion = (): string => userAgent.os.version;

/**
 * Get browser version number (as a string), e.g. "51.0.3272.211"
 * @return {string} Browser version number string
 */
export const browserVersion = (): string => userAgent.browser.version;

/**
 * Get version number string of the browser's rendering engine, e.g. "530.12"
 * @return {string} Browser rendering engine version number (string)
 */
export const browserEngineVersion = (): string => userAgent.engine.version;
