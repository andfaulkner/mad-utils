"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lang_constants_1 = require("./internal/lang-constants");
/**
 * Query parameters default values
 */
var queryParamsDef = typeof window !== 'undefined' ? window.location.search : '';
var locationPath = (typeof window !== 'undefined' && typeof window.location !== 'undefined' && window != null)
    ? window.location.pathname
    : '';
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '='). Return null if no query params.
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
//# sourceMappingURL=query.js.map