import { defaultSupportedLangs } from './internal/lang-constants';
import { last, first, matchAny, without } from './array';
import { removeMatchingText, chomp } from './string';

/**
 * Query parameters default values.
 */
const queryParamsDef = typeof window !== 'undefined' ? window.location.search : '';
const hrefDef = typeof window !== 'undefined' ? window.location.href : '';
const locationPath =
    (typeof window !== 'undefined' && typeof window.location !== 'undefined' && window != null)
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
export const parseQueryParams = <T>(queryParamsString: string = queryParamsDef): T => {
    // Ensure there are actually query parameters present. Return null otherwise.
    // Various types of query param strings that actually signify no query params.
    if (queryParamsString.match(/((\?)|(\?\=)|(\?\&)|(\?\=\&)|(\?\&\=))$/)) return null;
    // If no query param symbols are present in a string, it cannot be a query param string.
    if ((queryParamsString.split('=').length === 1
            && (queryParamsString.split('?').length === 1)
            && queryParamsString.split('&').length === 1)) {
        return null;
    }
    // Parse the query params if they exist.
    return queryParamsString.replace(/^\?/, '').split('&').reduce(
        (acc, pair) => Object.assign(acc, { [pair.split('=')[0]]: pair.split('=')[1] }),
    {}) as T;
};

/******************************************** LANGUAGE ********************************************/
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {Array<string>} supportedLangs - Detectable languages. Default: ['en', 'fr']
 * @param {string} defaultLang - Default language, if none detected. Default: 'en'
 */
export const getLangFromUrlPathname =
    (urlPath = locationPath, supportedLangs = defaultSupportedLangs, defaultLang: string = 'en') =>
        supportedLangs.find((lang: string) =>
            !!urlPath.match(new RegExp(`/(${lang}[^a-zA-Z0-9])|(/${lang}$)`, 'g')))
        || defaultLang;

/**
 * Return copy of the given (or current) URL with the query parameters removed.
 * @param {string} url - [OPTIONAL] url to copy & rm query params from. Defaults to current URL.
 * @return {string} Copy of given (or current) URL sans query params.
 */
export const urlMinusQueryParams = (url: string = hrefDef): string => first(url.split('?'));

/**
 * Get the last path in the given URL, with query params excluded. No / is prepended to the return
 * val. Returns '' if no paths in url. Sets 'strict mode' to true by default, meaning trailing
 * slashes are not ignored, and if one is present, return value becomes ''.
 * @param {string} href - [OPTIONAL] URL to examine.
 * @param {boolean} strict - [OPTIONAL] If false, ignore trailing slashes. DEFAULT: true.
 * @return {string} last path. No query params. Not prepended by /. '' if trailing / & strict==true
 */
export const lastUrlPath = (url: string = hrefDef, strict: boolean = true): string => {
    const cleanHref = url || hrefDef;
    const hrefMinusProtocol = removeMatchingText(cleanHref, /^https?:\/\//g);
    if (!hrefMinusProtocol.includes('/')) return '';

    const hrefMinusQueryParams = urlMinusQueryParams(hrefMinusProtocol);
    const finalHref = !strict ? chomp(hrefMinusQueryParams, '/') : hrefMinusQueryParams;
    return last(finalHref.split('/'))
};
