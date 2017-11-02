"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Attach empty location object to global in Node (or anywhere global.location isn't present).
var isNode = require('detect-node');
if (isNode)
    global.location = global.location || { href: '', pathname: '', search: '' };
/**************************************** PROJECT MODULES *****************************************/
var lang_constants_1 = require("./internal/lang-constants");
var array_1 = require("./array");
var string_1 = require("./string");
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS obj (based on splitting on , and =). Return null if no query params. If
 * no param is given, uses the global query params at time of initial page load are used. Careful:
 * this can be unexpected. To play it safe, explicitly pass global.location.search in every time.
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 * @example parseQueryParams('http://example.com/home?hello=everyone&gr=argh')
 *          // => { hello: 'everyone', gr: 'argh' }
 */
exports.parseQueryParams = function (queryParamsStr) {
    var queryParamsString = queryParamsStr || global.location.search;
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
 * Get current language from URL. Assumes lang stored in own path & that 2-letter (/en/) form used.
 * @param {string} urlPath URL to search. Uses global.location.pathname if not provided {OPT}
 * @param {Array<string>} supportedLangs Detectable languages. Default: ['en', 'fr'] {OPT}
 * @param {string} defaultLang Default language, if none detected. Default: 'en' {OPT}
 * @return {string} current language, in 2-letter form. Often either 'en' or 'fr'.
 */
exports.getLangFromUrlPathname = function (urlPath, supportedLangs, defaultLang) {
    if (supportedLangs === void 0) { supportedLangs = lang_constants_1.defaultSupportedLangs; }
    if (defaultLang === void 0) { defaultLang = 'en'; }
    var cleanUrlPath = typeof urlPath === 'string' ? urlPath : global.location.pathname;
    var getLangMatch = function (lang) {
        return !!cleanUrlPath.match(new RegExp("/(" + lang + "[^a-zA-Z0-9])|(/" + lang + "$)", 'g'));
    };
    return supportedLangs.find(getLangMatch) || defaultLang;
};
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathname
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
exports.langFromUrlPathname = exports.getLangFromUrlPathname;
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathname
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
exports.getLangFromURLPathname = exports.getLangFromUrlPathname;
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathname
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
exports.langFromURLPathname = exports.getLangFromUrlPathname;
/**
 * Get all paths in the URL before or after the first appearance of /:curLang/
 * If getStrBeforeLang property is given and is true, get the string before the language match.
 * Otherwise get the string after the language match.
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathname
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {boolean} getStrBeforeLang [OPTIONAL] If true, ret pre-match str; else ret post-match str.
 */
exports.getUrlPathAroundLang = function (props) {
    var getStrBeforeLang = (typeof props === 'object') ? props.getStrBeforeLang : false;
    var url = (typeof props === 'string')
        ? props
        : (props && props.url) || global.location.pathname;
    var supportedLangs = (typeof props === 'object' && props.supportedLangs)
        ? props.supportedLangs
        : lang_constants_1.defaultSupportedLangs;
    var curLang = (typeof props === 'object' && props.curLang)
        ? props.curLang
        : exports.getLangFromUrlPathname(url, supportedLangs);
    var urlSplitOnLangPath = url.split("/" + curLang + "/");
    if (urlSplitOnLangPath.length < 1) {
        return new Error('No language abbreviation found in the URL path');
    }
    return getStrBeforeLang ? urlSplitOnLangPath[0] // get values before
        : urlSplitOnLangPath[1]; // get values after
};
exports.getPreOrPostLangUrlPaths = exports.getUrlPathAroundLang;
/**
 * Get all paths in the URL following the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathname
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
exports.getUrlPathAfterLang = function (props) {
    var propsObj = typeof props === 'object' ? props : {};
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return exports.getUrlPathAroundLang(Object.assign(propsObj, { getStrBeforeLang: false }));
};
exports.postLangUrlPaths = exports.getUrlPathAfterLang;
/**
 * Get all paths in the URL prior to the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => '/asdf'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathname
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
exports.getUrlPathBeforeLang = function (props) {
    var propsObj = typeof props === 'object' ? props : {};
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return exports.getUrlPathAroundLang(Object.assign(propsObj, { getStrBeforeLang: true }));
};
exports.preLangUrlPaths = exports.getUrlPathBeforeLang;
/**
 * Swaps language code in the given URL to the provided value.
 * @param {string} newLang New language code to swap to. e.g. 'en' OR 'fr'
 * @param {Object|string} props
 *        - @param {string} url {OPT} URL to swap language code in.
 *        - @param {string} curLang {OPT} current lang. If provided, will only swap matching path.
 *        - @param {string[]} supportedLangs {OPT} Allowed languages codes. If given, will only
 *                                                 swap path matching an item in the array
 * @return {string} New URL with language swapped.
 */
exports.getUrlWithLangSwapped = function (newLang, props) {
    return "" + exports.getUrlPathBeforeLang(props) + newLang + exports.getUrlPathAfterLang(props);
};
/**
 * Return copy of the given (or current) URL with the query parameters removed.
 * @param {string} url - [OPTIONAL] url to copy & rm query params from. Defaults to current URL.
 * @return {string} Copy of given (or current) URL sans query params.
 */
exports.urlMinusQueryParams = function (url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    return array_1.first(cleanUrl.split('?'));
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
    if (strict === void 0) { strict = true; }
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    var hrefMinusProtocol = string_1.removeMatchingText(cleanUrl, /^https?:\/\//g);
    if (!hrefMinusProtocol.includes('/'))
        return '';
    var hrefMinusQueryParams = exports.urlMinusQueryParams(hrefMinusProtocol);
    var finalHref = !strict ? string_1.chomp(hrefMinusQueryParams, '/') : hrefMinusQueryParams;
    return array_1.last(finalHref.split('/'));
};
/**
 * Get query string from the given URL (or the global URL). Excludes "?".
 */
exports.urlGetQuery = function (url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    return array_1.without.first(cleanUrl.split('?')).join('');
};
exports.getQueryString = exports.urlGetQuery;
exports.getQueryParamString = exports.urlGetQuery;
exports.urlGetQueryString = exports.urlGetQuery;
exports.urlGetQueryParamString = exports.urlGetQuery;
/**
 * Return the URL with the protocol string ('http://', 'https://') removed.
 * @param {string} url - to remove protocol string from
 * @return {string} url with protocol string removed
 * @example urlWithoutProtocol('https://www.exmpl.ca/1/2?k1=v1') // => www.exmpl.ca/1/2?k1=v1
 */
exports.urlWithoutProtocol = function (url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    return string_1.removeMatchingText(cleanUrl, /^https?:\/\//);
};
exports.urlMinusProtocol = exports.urlWithoutProtocol;
/**
 * Get protocol string from the given URL - either http://, https://, or '' if none given.
 * @param {string} url - to get protocol string from
 * @return {string} protocol string - either: 'http://', 'https://', or (if none present) ''
 */
exports.urlProtocolString = function (url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    var matches = cleanUrl.match(/^https?:\/\//g);
    return (matches && matches[0]) || '';
};
exports.urlGetProtocolString = exports.urlProtocolString;
exports.getUrlProtocolString = exports.urlProtocolString;
exports.getURLProtocolString = exports.urlProtocolString;
exports.getProtocolStringFromUrl = exports.urlProtocolString;
exports.getProtocolStringFromURL = exports.urlProtocolString;
/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from. {DEF: global.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
exports.urlMinusLastPath = function (url, excludeQuery) {
    if (excludeQuery === void 0) { excludeQuery = true; }
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    var httpStr = exports.urlProtocolString(cleanUrl);
    var queryStr = exports.urlGetQuery(cleanUrl);
    // If there are no paths, set to the URL base; otherwise lop off the last item after a '/'
    var urlParts = exports.urlWithoutProtocol(exports.urlMinusQueryParams(cleanUrl)).split('/');
    var urlNoQueryLastPathHttp = (urlParts.length === 1) ? urlParts[0]
        : array_1.without.last(urlParts).join('/');
    // Re-include protocol string; and if excludeQuery == false, also re-include query string.
    return httpStr + (excludeQuery ? urlNoQueryLastPathHttp
        : urlNoQueryLastPathHttp + "?" + queryStr);
};
exports.getURLMinusLastPath = exports.urlMinusLastPath;
exports.getUrlMinusLastPath = exports.urlMinusLastPath;
/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from. {DEF: global.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
exports.swapLastURLPath = function (newPathVal, url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    var queryStr = exports.urlGetQuery(cleanUrl);
    return exports.urlMinusLastPath(cleanUrl) + "/" + newPathVal + (queryStr ? ('?' + queryStr) : '');
};
/**
 * Swap URL path matching given string. Avoids swapping base 'host' value (e.g. www.exmpl.com).
 * @param {string|RegExp} pathMatcher - Value to test for in each of the URL's paths
 * @param {string} newPathVal - Value to swap into the URL
 * @param {string} url - URL to swap path in {DEF: global.location.href} {OPT}
 * @return {string} URL with the matching path swapped for the given path
 */
exports.swapMatchingURLPaths = function (pathMatcher, newPathVal, url) {
    var cleanUrl = typeof url === 'string' ? url : global.location.href;
    var httpStr = exports.urlProtocolString(cleanUrl);
    var queryStr = exports.urlGetQuery(cleanUrl);
    var urlParts = exports.urlWithoutProtocol(exports.urlMinusQueryParams(cleanUrl)).split('/');
    var urlPartsSwapped = urlParts.map(function (urlPt, idx) {
        var urlPtStrMatches = urlPt.match(pathMatcher);
        return ((idx !== 0) && (((urlPtStrMatches && urlPtStrMatches[0]) || '') === urlPt))
            ? newPathVal
            : urlPt;
    });
    return "" + httpStr + urlPartsSwapped.join('/') + "?" + queryStr;
};
exports.swapMatchingUrlPaths = exports.swapMatchingURLPaths;
exports.swapUrlPaths = exports.swapMatchingURLPaths;
exports.swapURLPaths = exports.swapMatchingURLPaths;
exports.urlSwapPathMatches = exports.swapMatchingURLPaths;
exports.urlSwapMatchingPaths = exports.swapMatchingURLPaths;
exports.replaceMatchingURLPaths = exports.swapMatchingURLPaths;
exports.replaceMatchingUrlPaths = exports.swapMatchingURLPaths;
exports.replaceUrlPaths = exports.swapMatchingURLPaths;
exports.replaceURLPaths = exports.swapMatchingURLPaths;
exports.urlReplacePathMatches = exports.swapMatchingURLPaths;
exports.urlReplaceMatchingPaths = exports.swapMatchingURLPaths;
//# sourceMappingURL=url.js.map