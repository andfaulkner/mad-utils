/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 */
export const parseQueryParams = <T>(queryParamsString: string = window.location.search): T => {
   return queryParamsString.replace(/^\?/, '').split('&').reduce(
        (acc, pair) => {
            return Object.assign(acc, {
                [pair.split('=')[0]]: pair.split('=')[1]
            })
        },
    {}) as T;
};
