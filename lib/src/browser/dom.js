/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36" +
 * "(KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
 */
exports.getUserAgentString = function () { return exports.userAgent.raw; };
/**
 * @return {string} Name of the current computer's operating system. E.g. "Mac OS"
 */
exports.osName = function () { return exports.userAgent.os.name; };
/**
* @return {string} Name of the browser. E.g. "Chrome"
 */
exports.browserName = function () { return exports.userAgent.browser.name; };
/**
* @return {string} Name of the browser's rendering engine. E.g. "Webkit"
 */
exports.browserEngineName = function () { return exports.userAgent.engine.name; };
/**
* @return {string} OS version. E.g. "10.11.6"
 */
exports.osVersion = function () { return exports.userAgent.os.version; };
/**
* @return {string} Browser version. E.g. "59.0.3071.115"
 */
exports.browserVersion = function () { return exports.userAgent.browser.version; };
/**
* @return {string} Version of the browser's rendering engine. E.g. "537.36"
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