"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lang_constants_1 = require("./internal/lang-constants");
var array_1 = require("./array");
var string_1 = require("./string");
/**
 * Query parameters default values.
 */
var queryParamsDef = typeof window !== 'undefined' ? window.location.search : '';
var hrefDef = typeof window !== 'undefined' ? window.location.href : '';
var locationPath = (typeof window !== 'undefined' && typeof window.location !== 'undefined' && window != null)
    ? window.location.pathname
    : '';
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS obj (based on splitting on , and =). Return null if no query params. If
 * no param is given, uses the window query params at time of initial page load are used. Careful:
 * this can be unexpected. To play it safe, explicitly pass window.location.search in every time.
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 * @example parseQueryParams('http://example.com/home?hello=everyone&gr=argh')
 *          // => { hello: 'everyone', gr: 'argh' }
 */
exports.parseQueryParams = function (queryParamsString) {
    if (queryParamsString === void 0) { queryParamsString = queryParamsDef; }
    // Ensure there are actually query parameters present. Return null otherwise.
    // Various types of query param strings that actually signify no query params.
    if (queryParamsString.match(/((\?)|(\?\=)|(\?\&)|(\?\=\&)|(\?\&\=))$/))
        return null;
    // If no query param symbols are present in a string, it cannot be a query param string.
    if ((queryParamsString.split('=').length === 1
        && (queryParamsString.split('?').length === 1)
        && queryParamsString.split('&').length === 1)) {
        return null;
    }
    // Parse the query params if they exist.
    return queryParamsString.replace(/^\?/, '').split('&').reduce(function (acc, pair) {
        return Object.assign(acc, (_a = {}, _a[pair.split('=')[0]] = pair.split('=')[1], _a));
        var _a;
    }, {});
};
/******************************************** LANGUAGE ********************************************/
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {Array<string>} supportedLangs - Detectable languages. Default: ['en', 'fr']
 * @param {string} defaultLang - Default language, if none detected. Default: 'en'
 */
exports.getLangFromUrlPathname = function (urlPath, supportedLangs, defaultLang) {
    if (urlPath === void 0) { urlPath = locationPath; }
    if (supportedLangs === void 0) { supportedLangs = lang_constants_1.defaultSupportedLangs; }
    if (defaultLang === void 0) { defaultLang = 'en'; }
    return supportedLangs.find(function (lang) {
        return !!urlPath.match(new RegExp("/(" + lang + "[^a-zA-Z0-9])|(/" + lang + "$)", 'g'));
    })
        || defaultLang;
};
/**
 * Return copy of the given (or current) URL with the query parameters removed.
 * @param {string} url - [OPTIONAL] url to copy & rm query params from. Defaults to current URL.
 * @return {string} Copy of given (or current) URL sans query params.
 */
exports.urlMinusQueryParams = function (url) {
    if (url === void 0) { url = hrefDef; }
    return array_1.first(url.split('?'));
};
/**
 * Get the last path in the given URL, with query params excluded. No / is prepended to the return
 * val. Returns '' if no paths in url. Sets 'strict mode' to true by default, meaning trailing
 * slashes are not ignored, and if one is present, return value becomes ''.
 * @param {string} href - [OPTIONAL] URL to examine.
 * @param {boolean} strict - [OPTIONAL] If false, ignore trailing slashes. DEFAULT: true.
 * @return {string} last path. No query params. Not prepended by /. '' if trailing / & strict==true
 */
exports.lastUrlPath = function (url, strict) {
    if (url === void 0) { url = hrefDef; }
    if (strict === void 0) { strict = true; }
    var cleanHref = url || hrefDef;
    var hrefMinusProtocol = string_1.removeMatchingText(cleanHref, /^https?:\/\//g);
    if (!hrefMinusProtocol.includes('/'))
        return '';
    var hrefMinusQueryParams = exports.urlMinusQueryParams(hrefMinusProtocol);
    var finalHref = !strict ? string_1.chomp(hrefMinusQueryParams, '/') : hrefMinusQueryParams;
    return array_1.last(finalHref.split('/'));
};
//# sourceMappingURL=query.js.map