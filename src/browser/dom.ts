/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />

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
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36" +
 * "(KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
 */
export const getUserAgentString =   () => window.navigator.userAgent;

/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS"
 */
export const osName =               () => userAgent.os.name;

/**
* @return {string} Name of the browser. E.g. "Chrome"
 */
export const browserName =          () => userAgent.browser.name;

/**
* @return {string} Name of the browser's rendering engine. E.g. "Webkit"
 */
export const browserEngineName =    () => userAgent.engine.name;

/**
* @return {string} OS version. E.g. "10.11.6"
 */
export const osVersion =            () => userAgent.os.version;

/**
* @return {string} Browser version. E.g. "59.0.3071.115"
 */
export const browserVersion =       () => userAgent.browser.version;

/**
* @return {string} Version of the browser's rendering engine. E.g. "537.36"
 */
export const browserEngineVersion = () => userAgent.engine.version;

/******************************************** HELPERS *********************************************/
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
export const $ = (sel: string): HTMLElement/* | HTMLElement[]*/ => {
    // get by id
    if (sel.split('#').length > 1) {
        return document.getElementById.call(document, sel.split('#')[1]) as HTMLElement;
    }
    // no # possible past here.
    // else if (sel[0] !== '.') {
    //     // if no classes defined
    //     if (sel.split('.').length === 1) {
    //         return document.getElementsByTagName(sel);
    //     }
    //     return document.getElementsByClassName.call(document, sel) as HTMLElement[];
    // }
};
