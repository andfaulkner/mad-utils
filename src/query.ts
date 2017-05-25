/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 * @example parseQueryParams('http://example.com/home?hello=everyone&gr=argh')
 *          // => { hello: 'everyone', gr: 'argh' }
 */
export const parseQueryParams = <T>(queryParamsString: string = window.location.search): T =>
   queryParamsString.replace(/^\?/, '').split('&').reduce(
        (acc, pair) => Object.assign(acc, { [pair.split('=')[0]]: pair.split('=')[1] }),
    {}) as T;

// export const getLang = () => {
//     if (typeof window !== undefined) {
//         window.location.pathname.split(/\//g).reverse()[0]
//     }
// };
