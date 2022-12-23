/*-------------------------------------- TYPE AUGMENTATION ---------------------------------------*/
// Set globals to always have access to location obj w/ proper shape (even if empty e.g. in Node)
declare global {
    // Augment Node.js `global`
    namespace NodeJS {
        interface Global {
            location: {href: string; pathname: string; search: string};
        }
    }
    interface Window extends NodeJS.Global {} // Augment Browser `window`
    interface WorkerGlobalScope extends NodeJS.Global {} // Augment Web Worker `self`
}

// Attach empty location object to global in Node (or anywhere global.location isn't present)
import isNode from 'detect-node';
if (isNode) global.location = global.location || ({href: '', pathname: '', search: ''} as any);

/*--------------------------------------- PROJECT MODULES ----------------------------------------*/
import {defaultSupportedLangs} from './internal/lang-constants';
import {last, first, without} from './array';
import {removeMatchingText, chomp} from './string';
import {StrOrErr} from './types-iso';

/*------------------------------------------ NORMALIZE -------------------------------------------*/
/**
 * Normalize given [url] {string}, converting to this format:
 *     `/main/en/home`
 *     `/main/en/home?key=value`
 *
 * Remove leading & trailing whitespace
 * Ensures a single / at beginning
 * Remove trailing /
 * Replace // with /
 * Replace /? with ?
 *
 * Empty strings return ``
 *
 * @param {string} url URL to normalize
 * @return {string} Normalized URL
 */
export const normalizeURLPathname = (url: string): string => {
    if (!url) return ``;
    if (url.match(/^( +)?\/+( +)?$/g)) return `/`;

    // Remove preceding & trailing spaces
    const noSpaceURL = url.replace(/^ +/g, ``).replace(/ +$/g, ``);

    // Insert / before start
    return (
        `/${noSpaceURL}`
            // Remove double slashes
            .replace(/\/\/+/g, `/`)
            // Remove trailing slash
            .replace(/\/$/g, ``)
            // Remove slash before query param start character
            .replace(/\/\?/, `?`)
    );
};

/*----------------------------------------- QUERY PARAMS -----------------------------------------*/
/**
 * Turn query params into JS obj - splits on , & =
 * Return null if no query params
 * If no param is given, uses the global query params at time of initial page load
 *
 * Careful: this can be unexpected - to play it safe, explicitly pass
 * global.location.search in every time
 *
 * Example: parseQueryParams(`http://example.com/home?hello=everyone&gr=argh`);
 *          // => {hello: `everyone`, gr: `argh`}
 *
 * @param {string} queryParamsString: source to parse for query params {Default: query in URL}
 * @return {Object} Query params as object
 */
export const parseQueryParams = <T>(queryParamsStr?: string): T => {
    const queryParamsString = queryParamsStr || global.location.search;
    // Ensure there are actually query parameters present; return null otherwise
    // Various types of query param strings that actually signify no query params
    if (queryParamsString.match(/((\?)|(\?\=)|(\?\&)|(\?\=\&)|(\?\&\=))$/)) return null;

    // If no query param symbols are present in a string, it cannot be a query param string
    if (
        queryParamsString.split('=').length === 1 &&
        queryParamsString.split('?').length === 1 &&
        queryParamsString.split('&').length === 1
    ) {
        return null;
    }

    // Parse the query params if they exist
    return queryParamsString
        .replace(/^\?/, '')
        .split('&')
        .reduce(
            (acc, pair) => Object.assign(acc, {[pair.split('=')[0]]: pair.split('=')[1]}),
            {}
        ) as T;
};

/*------------------------------------------- LANGUAGE -------------------------------------------*/
/**
 * Get current language from URL
 * Assumes language stored in its own path, and that 2-letter form used - e.g. `/en/`, `/fr/`
 *
 * @param {string} urlPath URL to search {Default: global.location.pathname if not provided}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 * @param {string} defaultLang Default language, if none detected {Default: 'en'}
 *
 * @return {string} current language, in 2-letter form (Often either 'en' or 'fr')
 */
export const getLangFromURLPathname = (
    urlPath?: string,
    supportedLangs: Array<string> = defaultSupportedLangs,
    defaultLang: string = 'en'
): string => {
    const cleanUrlPath: string = typeof urlPath === 'string' ? urlPath : global.location.pathname;
    const getLangMatch = (lang: string) =>
        !!cleanUrlPath.match(new RegExp(`/(${lang}[^a-zA-Z0-9])|(/${lang}$)`, 'g'));
    return supportedLangs.find(getLangMatch) || defaultLang;
};

export {getLangFromURLPathname as langFromUrlPathname};
export {getLangFromURLPathname as getLangFromUrlPathname};
export {getLangFromURLPathname as langFromURLPathname};
export {getLangFromURLPathname as getLangFromUrl};
export {getLangFromURLPathname as getLangFromURL};
export {getLangFromURLPathname as langFromUrl};
export {getLangFromURLPathname as langFromURL};

export type UrlPathsLangProps = {
    url?: string;
    curLang?: string;
    supportedLangs?: string[];
};

/**
 * Get all paths in the URL before or after the first appearance of /:curLang/
 * If getStrBeforeLang property is given and is true, get the string before the language match
 * Otherwise get the string after the language match
 *
 * Example: urlPathsAfterLang('/asdf/en/one/two');
 *          // => 'one/two'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 * @param {boolean} getStrBeforeLang If true, return pre-match str; otherwise return post-match str
 */
export const getUrlPathAroundLang = (
    props: (UrlPathsLangProps & {getStrBeforeLang?: boolean}) | string | null
): StrOrErr => {
    const getStrBeforeLang = typeof props === 'object' ? props.getStrBeforeLang : false;

    const url: string =
        typeof props === 'string' ? props : (props && props.url) || global.location.pathname;

    const supportedLangs =
        typeof props === 'object' && props.supportedLangs
            ? props.supportedLangs
            : defaultSupportedLangs;

    const curLang =
        typeof props === 'object' && props.curLang
            ? props.curLang
            : getLangFromURLPathname(url, supportedLangs);

    const urlSplitOnLangPath = url.split(`/${curLang}/`);
    if (urlSplitOnLangPath.length < 1) {
        return new Error('No language abbreviation found in the URL path');
    }

    return getStrBeforeLang
        ? urlSplitOnLangPath[0] // get values before
        : urlSplitOnLangPath[1]; // get values after
};

export {getUrlPathAroundLang as getPreOrPostLangUrlPaths};

/**
 * Get all paths in the URL following the first appearance of /:curLang/
 *
 * Example: urlPathsAfterLang('/asdf/en/one/two');
 *          // => 'one/two'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 */
export const getUrlPathAfterLang = (props: UrlPathsLangProps | string | null): StrOrErr => {
    const propsObj = typeof props === 'object' ? props : {};
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return getUrlPathAroundLang(Object.assign(propsObj, {getStrBeforeLang: false}));
};

export {getUrlPathAfterLang as postLangUrlPaths};

/**
 * Get all paths in the URL prior to the first appearance of /:curLang/
 *
 * Example: urlPathsAfterLang('/asdf/en/one/two');
 *          // => '/asdf'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 */
export const getUrlPathBeforeLang = (props: UrlPathsLangProps | string | null): StrOrErr => {
    const propsObj = typeof props === 'object' ? props : {};
    if (typeof props === 'string') {
        propsObj.url = props;
    }
    return getUrlPathAroundLang(Object.assign(propsObj, {getStrBeforeLang: true}));
};

export {getUrlPathBeforeLang as preLangUrlPaths};

/**
 * Swaps language code in the given URL to the provided value
 *
 * @param {string} newLang New language code to swap to. e.g. 'en' OR 'fr'
 * @param {Object|string} props
 *        - @param {string} url URL to swap language code in
 *        - @param {string} curLang current lang; if provided, will only swap matching path
 *        - @param {string[]} supportedLangs Allowed language codes (if given, will only
 *                                           swap path matching an item in the array)
 * @return {string} New URL with language swapped.
 */
export const getUrlWithLangSwapped = (
    newLang: string,
    props: UrlPathsLangProps | string | null
): string => `${getUrlPathBeforeLang(props)}${newLang}${getUrlPathAfterLang(props)}`;

/**
 * Return copy of the given (or current) URL with the query parameters removed
 * @param {string} url URL to copy & rm query params from {Default: current URL}
 * @return {string} Copy of given (or current) URL sans query params
 */
export const urlMinusQueryParams = (url?: string): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    return first(cleanUrl.split('?'));
};

/**
 * Get the last path in the given URL with query params excluded
 * No '/' is prepended to the return val
 * Returns '' if there are no paths in the URL
 * By default ("strict mode") trailing slashes are not ignored (if present, return becomes '')
 *
 * @param {string} href URL to examine
 * @param {boolean} strict If false, ignore trailing slashes {Default: true}
 * @return {string} last path with no query params, and not prepended by '/'
 *                  Returns '' if strict is true and there's a trailing '/' in the URL
 */
export const lastUrlPath = (url?: string, strict: boolean = true): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    const hrefMinusProtocol = removeMatchingText(cleanUrl, /^https?:\/\//g);
    if (!hrefMinusProtocol.includes('/')) return '';

    const hrefMinusQueryParams = urlMinusQueryParams(hrefMinusProtocol);
    const finalHref = strict ? hrefMinusQueryParams : chomp(hrefMinusQueryParams, '/');
    return last(finalHref.split('/'));
};

/**
 * Get query string from the given URL (or the global URL), excluding "?"
 */
export const urlQuery = (url?: string): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    return without.first(cleanUrl.split('?')).join('');
};

export {urlQuery as urlGetQuery};
export {urlQuery as getQueryString};
export {urlQuery as getQueryParamString};
export {urlQuery as urlQueryString};
export {urlQuery as urlGetQueryString};
export {urlQuery as urlGetQueryParamString};

/**
 * Extract URL pathname and query from given URL string (or current URL)
 *
 * Preserves preceding slash & normalizes outputted string
 *
 * Example: urlPathnameWithQuery(`http://example.com/a/b/c?key=val`);
 *          // => `/a/b/c?key=val`
 *
 * @param {string} url Optional URL string to extract from
 * @return {string} Pathname and query from given URL (or current URL)
 */
export const urlPathnameWithQuery = (url?: string) => {
    const cleanUrl = url || global.location.href;
    if (!url) return ``;
    return normalizeURLPathname(urlWithoutProtocol(cleanUrl).replace(/^[^\/]+(?=\/)/, ``));
};

/**
 * Extract URL pathname from given URL string (or current URL)
 *
 * Preserves preceding slash & normalizes outputted string
 *
 * Example: urlPathname(`http://example.com/a/b/c?key=val`);
 *          // => `/a/b/c`
 *
 * @param {string} url Optional URL string to extract from
 * @return {string} Pathname and query from given URL (or current URL)
 */
export const urlPathname = (url?: string) => {
    const cleanUrl = url || global.location.href;
    if (!url) return ``;
    return normalizeURLPathname(
        urlWithoutProtocol(cleanUrl)
            .replace(/^[^\/]+(?=\/)/, ``)
            .replace(/\?.+$/, ``)
    );
};

/**
 * Return the URL with the protocol string ('http://', 'https://') removed
 *
 * Example: urlWithoutProtocol('https://www.exmpl.ca/1/2?k1=v1');
 *          // => www.exmpl.ca/1/2?k1=v1
 *
 * @param {string} url URL to remove protocol string from
 * @return {string} url with protocol string removed
 */
export const urlWithoutProtocol = (url?: string): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    return removeMatchingText(cleanUrl, /^https?:\/\//);
};

export {urlWithoutProtocol as urlMinusProtocol};

/**
 * Get protocol string from the given URL - either http://, https://, or '' if none given
 * @param {string} url to get protocol string from
 * @return {string} protocol string - either: 'http://', 'https://', or (if none present) ''
 */
export const urlProtocolString = (url?: string): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    const matches = cleanUrl.match(/^https?:\/\//g);
    return (matches && matches[0]) || '';
};

export {urlProtocolString as urlGetProtocolString};
export {urlProtocolString as getUrlProtocolString};
export {urlProtocolString as getURLProtocolString};
export {urlProtocolString as getProtocolStringFromUrl};
export {urlProtocolString as getProtocolStringFromURL};

/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from {Default: global.location.href}
 * @return {string} Given URL minus the last path, or base URL if URL has no paths
 */
export const urlMinusLastPath = (url?: string, excludeQuery = true): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    const httpStr = urlProtocolString(cleanUrl);
    const queryStr = urlQuery(cleanUrl);

    // If there are no paths, set to the URL base; otherwise lop off the last item after a '/'
    const urlParts = urlWithoutProtocol(urlMinusQueryParams(cleanUrl)).split('/');
    const urlNoQueryLastPathHttp =
        urlParts.length === 1 ? urlParts[0] : without.last(urlParts).join('/');

    // Re-include protocol string; and if excludeQuery == false, also re-include query string
    return (
        httpStr + (excludeQuery ? urlNoQueryLastPathHttp : `${urlNoQueryLastPathHttp}?${queryStr}`)
    );
};

export {urlMinusLastPath as getURLMinusLastPath};
export {urlMinusLastPath as getUrlMinusLastPath};

/**
 * Get URL minus the last path - e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from {Default: global.location.href}
 * @return {string} Given URL minus the last path,or base URL if URL has no paths
 */
export const swapLastURLPath = (newPathVal: string, url?: string): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;
    const queryStr = urlQuery(cleanUrl);
    return `${urlMinusLastPath(cleanUrl)}/${newPathVal}${queryStr ? '?' + queryStr : ''}`;
};

/**
 * Swap URL path matching given string, avoiding swapping base 'host' value (e.g. www.exmpl.com)
 *
 * @param {string|RegExp} pathMatcher Value to test for in each of the URL's paths
 * @param {string} newPathVal Value to swap into the URL
 * @param {string} url URL to swap path in {Default: global.location.href}
 * @return {string} URL with the matching path swapped for the given path
 */
export const swapMatchingURLPaths = (
    pathMatcher: string | RegExp,
    newPathVal: string,
    url?: string
): string => {
    const cleanUrl: string = typeof url === 'string' ? url : global.location.href;

    const httpStr = urlProtocolString(cleanUrl);
    const queryStr = urlQuery(cleanUrl);
    const urlParts = urlWithoutProtocol(urlMinusQueryParams(cleanUrl)).split('/');

    const urlPartsSwapped = urlParts.map((urlPt: string, idx: number) => {
        const urlPtStrMatches = urlPt.match(pathMatcher);
        return idx !== 0 && ((urlPtStrMatches && urlPtStrMatches[0]) || '') === urlPt
            ? newPathVal
            : urlPt;
    });

    return `${httpStr}${urlPartsSwapped.join('/')}?${queryStr}`;
};

export {swapMatchingURLPaths as swapMatchingUrlPaths};
export {swapMatchingURLPaths as swapUrlPaths};
export {swapMatchingURLPaths as swapURLPaths};
export {swapMatchingURLPaths as urlSwapPathMatches};
export {swapMatchingURLPaths as urlSwapMatchingPaths};

export {swapMatchingURLPaths as replaceMatchingURLPaths};
export {swapMatchingURLPaths as replaceMatchingUrlPaths};
export {swapMatchingURLPaths as replaceUrlPaths};
export {swapMatchingURLPaths as replaceURLPaths};
export {swapMatchingURLPaths as urlReplacePathMatches};
export {swapMatchingURLPaths as urlReplaceMatchingPaths};

/*--------------------------------- URL DATA EXTRACTION HELPERS ----------------------------------*/
type URLParts = 'protocol' | 'hostname' | 'host' | 'port' | 'pathname' | 'path' | 'query';

// TODO test extractFromUrl
// TODO Better docs for extractFromUrl
/**
 * Extract given part or parts [urlParts] from given URL [url] (or current URL)
 * and return as a conglomerate string
 *
 * URL parts:
 *   protocol - e.g. `https://`
 *   hostname - e.g. `www.example.ca`
 *   port     - e.g. `:8080`
 *   pathname - e.g. `/asdf/qwerty/ok`
 *   path     - e.g. `/asdf/qwerty/ok`  [alias of pathname]
 *   query    - e.g. `?key=val&b=2`
 *   host     - e.g. `www.example.ca:8080`
 *
 * WARNING: don't include non-consecutive URL parts in urlParts array
 *
 * Example: extractFromUrl([`hostname`, `port`], `http://www.exmpl.ca:8080/a/b/c?k=v`)
 *          // => `www.exmpl.ca:8080`
 *
 * Example: extractFromUrl(`query`, `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)
 *          // => `?key=val&b=2`
 */
export const extractFromUrl = (
    urlParts: URLParts[] | URLParts,
    url: string = global.location.href
) => {
    let outUrl = ``;

    const noProtocolUrl = urlWithoutProtocol(url);
    const host = noProtocolUrl.split(`/`)[0];
    const port = (host.match(/:[0-9]+/g) || [``])[0];

    const cleanParts = typeof urlParts === `string` ? [urlParts] : urlParts;

    if (cleanParts.some(part => part === `protocol`)) {
        outUrl += urlProtocolString(url);
    }

    if (cleanParts.some(part => part === `host`)) {
        outUrl += host;
    } else {
        if (cleanParts.some(part => part === `hostname`)) {
            const hostname = host.replace(port, ``);
            outUrl += hostname;
        }
        if (cleanParts.some(part => part === `port`)) {
            outUrl += port;
        }
    }

    if (cleanParts.some(part => part === `pathname` || part === `path`)) {
        outUrl += urlPathname(noProtocolUrl);
    }

    if (cleanParts.some(part => part === `query`)) {
        let query = urlQuery(url);
        outUrl += query ? `?` + query : ``;
    }

    return outUrl;
};

/**
 * Return true if given [url] is absolute (i.e. URL starts with the protocol)
 * It must also have more than just the protocol
 *
 * Example: mailto:// fails, but mailto://a succeeds
 *
 * Can handle null (returns false)
 *
 * Requires // for http and https, but can be omitted for all others
 */
export const isAbsoluteURL = (url: string): boolean =>
    !!(
        url &&
        (url.match(/^https?:\/\/[a-zA-Z0-9_]+/i) ||
            (!url.match(/^http/gi) && url.match(/^[a-z][a-z0-9+.-]*:(\/\/)?[a-zA-Z0-9_]+/i)))
    );
