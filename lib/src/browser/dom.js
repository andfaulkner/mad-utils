"use strict";
/// <reference path="../../node_modules/@types/ua-parser-js/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// Ensure window object exists & is accessible
// tslint:disable-next-line:no-var-keyword
var window = window || (global && global.window) || { navigator: {} };
var UserAgentParser = require('ua-parser-js');
/******************************************* USER AGENT *******************************************/
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
exports.parseUserAgent = function (userAgent) {
    if (userAgent === void 0) { userAgent = window.navigator.userAgent; }
    var ua = UserAgentParser(userAgent);
    ua.raw = ua.ua;
    return ua;
};
/**
 * Memoized parsed browser user agent
 */
var userAgentLocal;
/**
 * Return memoized parsed browser user agent
 */
exports.getUserAgentParsed = function () {
    userAgentLocal = userAgentLocal || exports.parseUserAgent();
    return userAgentLocal;
};
/**
 * Return raw (unparsed) browser user agent string
 * Example:
 *     "Mozilla/5.0 (Macintosh; Intel Mac OS X 17_14_2) AppleWebKit/530.12 " +
 *     "(KHTML, like Gecko) Chrome/51.0.3272.211 Safari/530.12"
 */
exports.getUserAgentString = function (mWindow) {
    return (mWindow || window).navigator.userAgent;
};
/**
 * Get name of current computer's operating system e.g. "Mac OS", "Windows NT"
 * @return {string} Name of current computer's OS
 */
exports.osName = function () { return exports.getUserAgentParsed().os.name; };
/**
 * Get name of browser, e.g. "Chrome" or "Firefox"
 * @return {string} Name of browser
 */
exports.browserName = function () { return exports.getUserAgentParsed().browser.name; };
/**
 * Get name of browser's rendering engine
 *
 * Example (Chrome):  browserEngineName(); // => "Webkit"
 * Example (Firefox): browserEngineName(); // => "Gecko"
 *
 * @return {string} Name of browser's rendering engine
 */
exports.browserEngineName = function () { return exports.getUserAgentParsed().engine.name; };
/**
 * Get machine's OS semver version number (as a string), e.g. "17.14.2"
 * @return {string} numeric OS version (in string form)
 */
exports.osVersion = function () { return exports.getUserAgentParsed().os.version; };
/**
 * Get browser version number (as a string), e.g. "51.0.3272.211"
 * @return {string} Browser version number string
 */
exports.browserVersion = function () { return exports.getUserAgentParsed().browser.version; };
/**
 * Get version number string of the browser's rendering engine, e.g. "530.12"
 * @return {string} Browser rendering engine version number (string)
 */
exports.browserEngineVersion = function () { return exports.getUserAgentParsed().engine.version; };
//# sourceMappingURL=dom.js.map