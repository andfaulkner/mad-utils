"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************** QUERY PARAMS ******************************************/
/**
 * Turn query params into JS object (based on splitting on ',' & '=').
 * @param {string} queryParamsString: source to parse for query params. Default: query (?) in URL.
 * @return {Object} Query params as object.
 * @example parseQueryParams('http://example.com/home?hello=everyone&gr=argh')
 *          // => { hello: 'everyone', gr: 'argh' }
 */
exports.parseQueryParams = function (queryParamsString) {
    if (queryParamsString === void 0) { queryParamsString = window.location.search; }
    return queryParamsString.replace(/^\?/, '').split('&').reduce(function (acc, pair) {
        return Object.assign(acc, (_a = {}, _a[pair.split('=')[0]] = pair.split('=')[1], _a));
        var _a;
    }, {});
};
// export const getLang = () => {
//     if (typeof window !== undefined) {
//         window.location.pathname.split(/\//g).reverse()[0]
//     }
// };
//# sourceMappingURL=query.js.map