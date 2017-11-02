import { defaultSupportedLangs } from './internal/lang-constants';
import { last, first, matchAny, without } from './array';
import { removeMatchingText, chomp, matchFirst } from './string';

var window = window || {}; // tslint:disable-line:no-var-keyword
window.location = window.location || {};
window.location.href = window.location.href || '';
window.location.pathName = window.location.pathName || ''

/**
 * Query parameters default values.
 */
const queryParamsDef = window.location.search   || '';

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
export function parseQueryParams<T>(queryParamsString: string = queryParamsDef): T {
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
 * Get current language from URL. Assumes lang stored in own path & that 2-letter (/en/) form used.
 * @param {string?} urlPath URL to search. Uses window.location.pathName if not provided [OPTIONAL]
 * @param {Array<string>?} supportedLangs Detectable languages. Default: ['en', 'fr'] [OPTIONAL]
 * @param {string?} defaultLang Default language, if none detected. Default: 'en' [OPTIONAL]
 * @return {string} current language, in 2-letter form. Often either 'en' or 'fr'.
 */
export function getLangFromUrlPathname(
    urlPath?: string,
    supportedLangs = defaultSupportedLangs,
    defaultLang: string = 'en'
): string {
    const cleanUrlPath: string = typeof urlPath === 'string' ? urlPath : window.location.pathName;
    const getLangMatch = (lang: string) =>
        !!cleanUrlPath.match(new RegExp(`/(${lang}[^a-zA-Z0-9])|(/${lang}$)`, 'g'));
    return supportedLangs.find(getLangMatch) || defaultLang;
}

/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses window.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export const langFromUrlPathname = getLangFromUrlPathname;

/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses window.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export const getLangFromURLPathname = getLangFromUrlPathname;

/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses window.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export const langFromURLPathname = getLangFromUrlPathname;


export type StrOrErr = String | Error;

export type UrlPathsLangProps = {
    url?:            string,
    curLang?:        string,
    supportedLangs?: string[],
}

/**
 * Get all paths in the URL before or after the first appearance of /:curLang/
 * If getStrBeforeLang property is given and is true, get the string before the language match.
 * Otherwise get the string after the language match.
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses window.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {boolean} getStrBeforeLang [OPTIONAL] If true, ret pre-match str; else ret post-match str.
 */
export function getUrlPathAroundLang(
    props: (UrlPathsLangProps & { getStrBeforeLang?: boolean }) | string | null
): StrOrErr {
    const getStrBeforeLang = (typeof props === 'object') ? props.getStrBeforeLang : false;

    const url: string = (typeof props === 'string')
        ? props
        : (props && props.url) || window.location.pathName;

    const supportedLangs = (typeof props === 'object' && props.supportedLangs)
        ? props.supportedLangs
        : defaultSupportedLangs;

    const curLang = (typeof props === 'object' && props.curLang)
        ? props.curLang
        : getLangFromUrlPathname(url, supportedLangs);

    const urlSplitOnLangPath = url.split(`/${curLang}/`);
    if (urlSplitOnLangPath.length < 1) {
        return new Error('No language abbreviation found in the URL path');
    }

    return getStrBeforeLang ? urlSplitOnLangPath[0]  // get values before
                            : urlSplitOnLangPath[1]; // get values after
};

export { getUrlPathAroundLang as getPreOrPostLangUrlPaths }

/**
 * Get all paths in the URL following the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses window.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
export function getUrlPathAfterLang(props: UrlPathsLangProps | string | null): StrOrErr {
    const propsObj = typeof props === 'object' ? props : {}
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return getUrlPathAroundLang(Object.assign(propsObj, { getStrBeforeLang: false }));
}

export { getUrlPathAfterLang as postLangUrlPaths }


/**
 * Get all paths in the URL prior to the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => '/asdf'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses window.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
export function getUrlPathBeforeLang(props: UrlPathsLangProps | string | null): StrOrErr {
    const propsObj = typeof props === 'object' ? props : {}
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return getUrlPathAroundLang(Object.assign(propsObj, { getStrBeforeLang: true }));
}

export { getUrlPathBeforeLang as preLangUrlPaths }


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
export function getUrlWithLangSwapped(
    newLang: string,
    props: UrlPathsLangProps | string | null
): string {
    return `${getUrlPathBeforeLang(props)}${newLang}${getUrlPathAfterLang(props)}`;
}

/**
 * Return copy of the given (or current) URL with the query parameters removed.
 * @param {string} url - [OPTIONAL] url to copy & rm query params from. Defaults to current URL.
 * @return {string} Copy of given (or current) URL sans query params.
 */
export function urlMinusQueryParams(url?: string): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    return first(cleanUrl.split('?'));
}

/**
 * Get the last path in the given URL, with query params excluded. No / is prepended to the return
 * val. Returns '' if no paths in url. Sets 'strict mode' to true by default, meaning trailing
 * slashes are not ignored, and if one is present, return value becomes ''.
 * @param {string} href - [OPTIONAL] URL to examine.
 * @param {boolean} strict - [OPTIONAL] If false, ignore trailing slashes. DEFAULT: true.
 * @return {string} last path. No query params. Not prepended by /. '' if trailing / & strict==true
 */
export function lastUrlPath(url?: string, strict: boolean = true): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    const hrefMinusProtocol = removeMatchingText(cleanUrl, /^https?:\/\//g);
    if (!hrefMinusProtocol.includes('/')) return '';

    const hrefMinusQueryParams = urlMinusQueryParams(hrefMinusProtocol);
    const finalHref = !strict ? chomp(hrefMinusQueryParams, '/') : hrefMinusQueryParams;
    return last(finalHref.split('/'))
};

/**
 * Get query string from the given URL (or the window URL). Excludes "?".
 */
export function urlGetQuery(url?: string): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    return without.first(cleanUrl.split('?')).join('');
}

export { urlGetQuery as getQueryString }
export { urlGetQuery as getQueryParamString }
export { urlGetQuery as urlGetQueryString }
export { urlGetQuery as urlGetQueryParamString }

/**
 * Return the URL with the protocol string ('http://', 'https://') removed.
 * @param {string} url - to remove protocol string from
 * @return {string} url with protocol string removed
 * @example urlWithoutProtocol('https://www.exmpl.ca/1/2?k1=v1') // => www.exmpl.ca/1/2?k1=v1
 */
export function urlWithoutProtocol(url?: string): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    return removeMatchingText(cleanUrl, /^https?:\/\//);
}

/**
 * Get protocol string from the given URL - either http://, https://, or '' if none given.
 * @param {string} url - to get protocol string from
 * @return {string} protocol string - either: 'http://', 'https://', or (if none present) ''
 */
export function urlProtocolString(url?: string): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    return matchFirst(cleanUrl, /^https?:\/\//g);
}

export { urlProtocolString as urlGetProtocolString }
export { urlProtocolString as getUrlProtocolString }
export { urlProtocolString as getURLProtocolString }
export { urlProtocolString as getProtocolStringFromUrl }
export { urlProtocolString as getProtocolStringFromURL }

/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from. {DEF: window.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
export function urlMinusLastPath(url?: string, excludeQuery = true): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    const httpStr = urlProtocolString(cleanUrl);
    const queryStr = urlGetQuery(cleanUrl);

    // If there are no paths, set to the URL base; otherwise lop off the last item after a '/'
    const urlParts = urlWithoutProtocol(urlMinusQueryParams(cleanUrl)).split('/');
    const urlNoQueryLastPathHttp = (urlParts.length === 1) ? urlParts[0]
                                                           : without.last(urlParts).join('/');

    // Re-include protocol string; and if excludeQuery == false, also re-include query string.
    return httpStr + (excludeQuery ? urlNoQueryLastPathHttp
                                   : `${urlNoQueryLastPathHttp}?${queryStr}`);
}

export { urlMinusLastPath as getURLMinusLastPath }
export { urlMinusLastPath as getUrlMinusLastPath }


/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from. {DEF: window.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
export function swapLastURLPath(newPathVal: string, url?: string): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    const queryStr = urlGetQuery(cleanUrl);
    const urlSansLastPath = urlMinusLastPath(cleanUrl);
    
    return `${ urlMinusLastPath(cleanUrl) }/${ newPathVal }${ queryStr ? ('?' + queryStr) : '' }`
}

/**
 * Swap URL path matching given string. Avoids swapping base 'host' value (e.g. www.exmpl.com).
 * @param {string|RegExp} pathMatcher - Value to test for in each of the URL's paths
 * @param {string} newPathVal - Value to swap into the URL
 * @param {string} url - URL to swap path in {DEF: window.location.href} {OPT}
 * @return {string} URL with the matching path swapped for the given path
 */
export function swapMatchingURLPath(
    pathMatcher: string | RegExp,
    newPathVal: string,
    url?: string
): string {
    const cleanUrl: string = typeof url === 'string' ? url : window.location.href;
    
    const httpStr = urlProtocolString(cleanUrl);
    const queryStr = urlGetQuery(cleanUrl);
    const urlParts = urlWithoutProtocol(urlMinusQueryParams(cleanUrl)).split('/');

    const urlPartsSwapped = urlParts.map(
        (urlPt: string, idx: number) =>
            ((idx !== 0) && matchFirst(urlPt, pathMatcher) === urlPt)
                ? newPathVal
                : urlPt
    );

    return `${httpStr}${urlPartsSwapped.join('/')}?${queryStr}`;
}

export { swapLastURLPath as swapLastUrlPath }
