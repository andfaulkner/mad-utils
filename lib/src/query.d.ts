/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '='). Return null if no query params.
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
