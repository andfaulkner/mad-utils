/*************************************** TYPE AUGMENTATION ****************************************/
declare global {
    namespace NodeJS {
        interface Global {
            location: {
                href: string;
                pathname: string;
                search: string;
            };
        }
    }
    interface Window extends NodeJS.Global {
    }
    interface WorkerGlobalScope extends NodeJS.Global {
    }
}
import { StrOrErr } from './types-iso';
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS obj - splits on , & =
 * Return null if no query params
 * If no param is given, uses the global query params at time of initial page load
 *
 * Careful: this can be unexpected - to play it safe, explicitly pass
 * global.location.search in every time
 * @param {string} queryParamsString: source to parse for query params {Default: query in URL}
 * @return {Object} Query params as object
 * @example parseQueryParams(`http://example.com/home?hello=everyone&gr=argh`)
 *          // => {hello: `everyone`, gr: `argh`}
 */
export declare const parseQueryParams: <T>(queryParamsStr?: string) => T;
/******************************************** LANGUAGE ********************************************/
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
export declare const getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
export { getLangFromUrlPathname as langFromUrlPathname };
export { getLangFromUrlPathname as getLangFromURLPathname };
export { getLangFromUrlPathname as langFromURLPathname };
export { getLangFromUrlPathname as getLangFromUrl };
export { getLangFromUrlPathname as getLangFromURL };
export { getLangFromUrlPathname as langFromUrl };
export { getLangFromUrlPathname as langFromURL };
export declare type UrlPathsLangProps = {
    url?: string;
    curLang?: string;
    supportedLangs?: string[];
};
/**
 * Get all paths in the URL before or after the first appearance of /:curLang/
 * If getStrBeforeLang property is given and is true, get the string before the language match
 * Otherwise get the string after the language match
 *
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 * @param {boolean} getStrBeforeLang If true, return pre-match str; otherwise return post-match str
 */
export declare const getUrlPathAroundLang: (props: string | (UrlPathsLangProps & {
    getStrBeforeLang?: boolean;
})) => StrOrErr;
export { getUrlPathAroundLang as getPreOrPostLangUrlPaths };
/**
 * Get all paths in the URL following the first appearance of /:curLang/
 *
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 */
export declare const getUrlPathAfterLang: (props: string | UrlPathsLangProps) => StrOrErr;
export { getUrlPathAfterLang as postLangUrlPaths };
/**
 * Get all paths in the URL prior to the first appearance of /:curLang/
 *
 * @example urlPathsAfterLang('/asdf/en/one/two') // => '/asdf'
 *
 * @param {string} url URL to search {Default: global.location.pathname}
 * @param {string} curLang Default language, if none detected {Default: 'en'}
 * @param {Array<string>} supportedLangs Detectable languages {Default: ['en', 'fr']}
 */
export declare const getUrlPathBeforeLang: (props: string | UrlPathsLangProps) => StrOrErr;
export { getUrlPathBeforeLang as preLangUrlPaths };
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
export declare const getUrlWithLangSwapped: (newLang: string, props: string | UrlPathsLangProps) => string;
/**
 * Return copy of the given (or current) URL with the query parameters removed
 * @param {string} url URL to copy & rm query params from {Default: current URL}
 * @return {string} Copy of given (or current) URL sans query params
 */
export declare const urlMinusQueryParams: (url?: string) => string;
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
export declare const lastUrlPath: (url?: string, strict?: boolean) => string;
/**
 * Get query string from the given URL (or the global URL), excluding "?"
 */
export declare const urlGetQuery: (url?: string) => string;
export { urlGetQuery as getQueryString };
export { urlGetQuery as getQueryParamString };
export { urlGetQuery as urlGetQueryString };
export { urlGetQuery as urlGetQueryParamString };
/**
 * Return the URL with the protocol string ('http://', 'https://') removed
 *
 * @example urlWithoutProtocol('https://www.exmpl.ca/1/2?k1=v1') // => www.exmpl.ca/1/2?k1=v1
 * @param {string} url URL to remove protocol string from
 * @return {string} url with protocol string removed
 */
export declare const urlWithoutProtocol: (url?: string) => string;
export { urlWithoutProtocol as urlMinusProtocol };
/**
 * Get protocol string from the given URL - either http://, https://, or '' if none given
 * @param {string} url to get protocol string from
 * @return {string} protocol string - either: 'http://', 'https://', or (if none present) ''
 */
export declare const urlProtocolString: (url?: string) => string;
export { urlProtocolString as urlGetProtocolString };
export { urlProtocolString as getUrlProtocolString };
export { urlProtocolString as getURLProtocolString };
export { urlProtocolString as getProtocolStringFromUrl };
export { urlProtocolString as getProtocolStringFromURL };
/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from {Default: global.location.href}
 * @return {string} Given URL minus the last path, or base URL if URL has no paths
 */
export declare const urlMinusLastPath: (url?: string, excludeQuery?: boolean) => string;
export { urlMinusLastPath as getURLMinusLastPath };
export { urlMinusLastPath as getUrlMinusLastPath };
/**
 * Get URL minus the last path - e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from {Default: global.location.href}
 * @return {string} Given URL minus the last path,or base URL if URL has no paths
 */
export declare const swapLastURLPath: (newPathVal: string, url?: string) => string;
/**
 * Swap URL path matching given string, avoiding swapping base 'host' value (e.g. www.exmpl.com)
 *
 * @param {string|RegExp} pathMatcher Value to test for in each of the URL's paths
 * @param {string} newPathVal Value to swap into the URL
 * @param {string} url URL to swap path in {Default: global.location.href}
 * @return {string} URL with the matching path swapped for the given path
 */
export declare const swapMatchingURLPaths: (pathMatcher: string | RegExp, newPathVal: string, url?: string) => string;
export { swapMatchingURLPaths as swapMatchingUrlPaths };
export { swapMatchingURLPaths as swapUrlPaths };
export { swapMatchingURLPaths as swapURLPaths };
export { swapMatchingURLPaths as urlSwapPathMatches };
export { swapMatchingURLPaths as urlSwapMatchingPaths };
export { swapMatchingURLPaths as replaceMatchingURLPaths };
export { swapMatchingURLPaths as replaceMatchingUrlPaths };
export { swapMatchingURLPaths as replaceUrlPaths };
export { swapMatchingURLPaths as replaceURLPaths };
export { swapMatchingURLPaths as urlReplacePathMatches };
export { swapMatchingURLPaths as urlReplaceMatchingPaths };
/**
 * Normalize given [url] {string}, converting to this format:
 *     `/main/en/home`
 *     `/main/en/home?key=value`
 *
 * Remove leading & trailing whitespace
 * Precede with /
 * Remove trailing /
 * Replace // with /
 * Replace /? with ?
 *
 * Empty strings return ``
 *
 * @param {string} url URL to normalize
 * @return {string} Normalized URL
 */
export declare const normalizeURLPathname: (url: string) => string;
