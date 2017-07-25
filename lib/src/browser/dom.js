/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("../string");
var UserAgentParser = require('ua-parser-js');
/******************************************* USER AGENT *******************************************/
/**
 * Memoized parsed browser user agent.
 */
exports.userAgent = exports.userAgent || parseUserAgent();
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
function parseUserAgent(userAgent) {
    if (userAgent === void 0) { userAgent = window.navigator.userAgent; }
    var ua = UserAgentParser(userAgent);
    ua.raw = ua.ua;
    return ua;
}
exports.parseUserAgent = parseUserAgent;
;
/**
 * Return raw (unparsed) browser user agent string. e.g.
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 * "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
exports.getUserAgentString = function () { return window.navigator.userAgent; };
/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS" or "Windows NT"
 */
exports.osName = function () { return exports.userAgent.os.name; };
/**
 * @return {string} Name of current OS, in snake_case. E.g. "mac_os" or "windows_nt"
 */
exports.osNameSnakeCase = function () { return string_1.toSnakeCase(exports.osName(), true); };
/**
* @return {string} Name of the browser. E.g. "Chrome" (using example above), or "Firefox"
 */
exports.browserName = function () { return exports.userAgent.browser.name; };
/**
* @return {string} Name of browser's rendering engine.
* @example browserEngineName(); // => "Webkit" (Chrome output. See getUserAgentString example above)
* @example browserEngineName(); // => "Gecko" (Firefox output);
*
 */
exports.browserEngineName = function () { return exports.userAgent.engine.name; };
/**
* @return {string} OS version. E.g. "17.14.2"
 */
exports.osVersion = function () { return exports.userAgent.os.version; };
/**
* @return {string} Browser version. E.g. "51.0.3272.211"
 */
exports.browserVersion = function () { return exports.userAgent.browser.version; };
/**
* @return {string} Version of the browser's rendering engine. E.g. "530.12"
 */
exports.browserEngineVersion = function () { return exports.userAgent.engine.version; };
/******************************************** HELPERS *********************************************/
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
exports.$ = function (sel) {
    // get by id
    if (sel.split('#').length > 1) {
        return document.getElementById.call(document, sel.split('#')[1]);
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
//# sourceMappingURL=dom.js.map