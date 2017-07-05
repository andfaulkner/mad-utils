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
export declare const parseQueryParams: <T>(queryParamsString?: string) => T;
/******************************************** LANGUAGE ********************************************/
/**
 * Get current language from the url. Assumes language is stored in a path, and that a 2-letter
 * format is used.
 * @param {Array<string>} supportedLangs - Detectable languages. Default: ['en', 'fr']
 * @param {string} defaultLang - Default language, if none detected. Default: 'en'
 */
export declare const getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string;
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
