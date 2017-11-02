/*************************************** TYPE AUGMENTATION ****************************************/
declare global  {
    namespace NodeJS {
        interface Global {
            location: {
                href: string;
                pathName: string;
                search: string;
            };
        }
    }
    interface Window extends NodeJS.Global {
    }
    interface WorkerGlobalScope extends NodeJS.Global {
    }
}
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
export declare const parseQueryParams: <T>(queryParamsStr?: string) => T;
/******************************************** LANGUAGE ********************************************/
/**
 * Get current language from URL. Assumes lang stored in own path & that 2-letter (/en/) form used.
 * @param {string} urlPath URL to search. Uses global.location.pathName if not provided {OPT}
 * @param {Array<string>} supportedLangs Detectable languages. Default: ['en', 'fr'] {OPT}
 * @param {string} defaultLang Default language, if none detected. Default: 'en' {OPT}
 * @return {string} current language, in 2-letter form. Often either 'en' or 'fr'.
 */
export declare const getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export declare const langFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export declare const getLangFromURLPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {string} [OPTIONAL] urlPath URL to search. If not provided, uses global.location.pathName
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {string} [OPTIONAL] defaultLang Default language, if none detected. Default: 'en'
 */
export declare const langFromURLPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
export declare type StrOrErr = String | Error;
export declare type UrlPathsLangProps = {
    url?: string;
    curLang?: string;
    supportedLangs?: string[];
};
/**
 * Get all paths in the URL before or after the first appearance of /:curLang/
 * If getStrBeforeLang property is given and is true, get the string before the language match.
 * Otherwise get the string after the language match.
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 * @param {boolean} getStrBeforeLang [OPTIONAL] If true, ret pre-match str; else ret post-match str.
 */
export declare const getUrlPathAroundLang: (props: string | (UrlPathsLangProps & {
    getStrBeforeLang?: boolean;
})) => StrOrErr;
export { getUrlPathAroundLang as getPreOrPostLangUrlPaths };
/**
 * Get all paths in the URL following the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => 'one/two'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
export declare const getUrlPathAfterLang: (props: string | UrlPathsLangProps) => StrOrErr;
export { getUrlPathAfterLang as postLangUrlPaths };
/**
 * Get all paths in the URL prior to the first appearance of /:curLang/
 * @example urlPathsAfterLang('/asdf/en/one/two') // => '/asdf'
 * @param {string} [OPTIONAL] url URL to search. If not provided, uses global.location.pathName
 * @param {string} [OPTIONAL] curLang Default language, if none detected. Default: 'en'
 * @param {Array<string>} [OPTIONAL] supportedLangs Detectable languages. Default: ['en', 'fr']
 */
export declare const getUrlPathBeforeLang: (props: string | UrlPathsLangProps) => StrOrErr;
export { getUrlPathBeforeLang as preLangUrlPaths };
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
export declare const getUrlWithLangSwapped: (newLang: string, props: string | UrlPathsLangProps) => string;
/**
 * Return copy of the given (or current) URL with the query parameters removed.
 * @param {string} url - [OPTIONAL] url to copy & rm query params from. Defaults to current URL.
 * @return {string} Copy of given (or current) URL sans query params.
 */
export declare const urlMinusQueryParams: (url?: string) => string;
/**
 * Get the last path in the given URL, with query params excluded. No / is prepended to the return
 * val. Returns '' if no paths in url. Sets 'strict mode' to true by default, meaning trailing
 * slashes are not ignored, and if one is present, return value becomes ''.
 * @param {string} href - [OPTIONAL] URL to examine.
 * @param {boolean} strict - [OPTIONAL] If false, ignore trailing slashes. DEFAULT: true.
 * @return {string} last path. No query params. Not prepended by /. '' if trailing / & strict==true
 */
export declare const lastUrlPath: (url?: string, strict?: boolean) => string;
/**
 * Get query string from the given URL (or the global URL). Excludes "?".
 */
export declare const urlGetQuery: (url?: string) => string;
export { urlGetQuery as getQueryString };
export { urlGetQuery as getQueryParamString };
export { urlGetQuery as urlGetQueryString };
export { urlGetQuery as urlGetQueryParamString };
/**
 * Return the URL with the protocol string ('http://', 'https://') removed.
 * @param {string} url - to remove protocol string from
 * @return {string} url with protocol string removed
 * @example urlWithoutProtocol('https://www.exmpl.ca/1/2?k1=v1') // => www.exmpl.ca/1/2?k1=v1
 */
export declare const urlWithoutProtocol: (url?: string) => string;
export { urlWithoutProtocol as urlMinusProtocol };
/**
 * Get protocol string from the given URL - either http://, https://, or '' if none given.
 * @param {string} url - to get protocol string from
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
 * @param {string} url URL to extract from. {DEF: global.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
export declare const urlMinusLastPath: (url?: string, excludeQuery?: boolean) => string;
export { urlMinusLastPath as getURLMinusLastPath };
export { urlMinusLastPath as getUrlMinusLastPath };
/**
 * Get URL minus the last path. e.g. https://localhost:80/a/b => https://localhost:80/a
 * @param {string} url URL to extract from. {DEF: global.location.href} {OPT}
 * @return {string} Given URL minus the last path. If URL had no paths, return base URL.
 */
export declare const swapLastURLPath: (newPathVal: string, url?: string) => string;
/**
 * Swap URL path matching given string. Avoids swapping base 'host' value (e.g. www.exmpl.com).
 * @param {string|RegExp} pathMatcher - Value to test for in each of the URL's paths
 * @param {string} newPathVal - Value to swap into the URL
 * @param {string} url - URL to swap path in {DEF: global.location.href} {OPT}
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
export {};
