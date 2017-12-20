"use strict";
/**************************************************************************************************
*
*       @file ./express-routing.ts
*
*       TODO FINISH SETTING express-routing MODULE UP IN MAD-UTILS
*
*/
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/************************************ OTHER MAD-UTILS MODULES *************************************/
var locale_1 = require("../locale");
var array_1 = require("../array");
var url_1 = require("../url");
exports.getUrlPathBeforeLang = url_1.getUrlPathBeforeLang;
exports.getUrlPathAfterLang = url_1.getUrlPathAfterLang;
/*********************************** BASIC WEB FILE EXTENSIONS ************************************/
var baseWebImgAssetExtensions = ['ico', 'png', 'svg', 'bmp', 'gif', 'tiff'];
var baseWebCodeAssetExtensions = ['js', 'css'];
var baseWebFontAssetExtensions = ['ttf', 'eot', 'woff', 'woff2', 'ttc'];
var baseWebAssetExts = [].concat(baseWebImgAssetExtensions)
    .concat(baseWebCodeAssetExtensions);
/**************************************** FUNCTION EXPORTS ****************************************/
/**
 * Extract full URL from request, and ensure no trailing slash at end.
 * @param {Request} req - Express request object.
 */
exports.getNoTrailingSlashUrl = function (req) { return _.trimEnd(req.originalUrl, '/'); };
/**
 * Return the given url with the last path removed.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => https://www.example.com
 * @param {string} url - URL to remove last path from.
 * @return {string} URL with last path removed.
 */
exports.urlWithoutLastPath = function (url) { return array_1.withoutLast(url.split('/')).join('/'); };
/**
 * Get the last path in the given URL.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => login
 * @param {string} url - URL to get last path from.
 * @return {string} last path in given URL.
 */
exports.getLastUrlPath = function (urlOrReq) {
    if (typeof urlOrReq === 'string')
        return array_1.last(urlOrReq.split('/'));
    return array_1.last(urlOrReq.originalUrl.split('/'));
};
/**
 * @export Get the first path in the given URL.
 *
 * Caveat: must be either a full URL, or only show URL data starting at or around the first path
 * (preceded by '/' is OK)s. It will return the URL otherwise. Reason: it can't read minds. There's
 * no way to tell if it's the host or 1st path just by looking at it, if it doesn't start with the
 * protocol or '/'. A section of text starting w/ something else could be either the 1st path or
 * the domain name. Note that it assumes it's the 1st path in this ambiguous case.
 *
 * @example getFirstUrlPath('https://www.example.com/auth/login') // => login
 * @param {string} url - URL to get first path from.
 * @return {string} first path in given URL.
 */
exports.getFirstUrlPath = function (urlOrReq) {
    var cleanURL = (typeof urlOrReq === 'string') ? urlOrReq : urlOrReq.originalUrl;
    var getFunc = (cleanURL.match(/https?:\/\//) || cleanURL.match(/localhost/)) ? array_1.second : array_1.first;
    return getFunc(cleanURL.replace(/^\/(?=[a-zA-Z_0-9])/g, '')
        .replace(/https?:\/\//g, '')
        .split('/'));
};
/**
 * Get an asset file's extension.
 * Warning: may crash if passed a non-extension.
 * @param {Request} req - Express request object.
 * @return {string} File extension string (e.g. 'js')
 */
exports.getExt = function (req) { return exports.getLastUrlPath(req.originalUrl).split('.')[1]; };
/**
 * True if given request is for an asset.
 * @param {Request} req - Express request object.
 */
exports.isRequestForAsset = function (req, assetExts) {
    if (assetExts === void 0) { assetExts = baseWebAssetExts; }
    return assetExts.some(function (ext) { return req.originalUrl.endsWith("." + ext); });
};
exports.isReqForAsset = exports.isRequestForAsset;
/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
exports.isImageAsset = function (req, imgAssetExts) {
    if (imgAssetExts === void 0) { imgAssetExts = baseWebImgAssetExtensions; }
    return imgAssetExts.some(function (ext) { return req.originalUrl.endsWith("." + ext); });
};
exports.isImgAsset = exports.isImageAsset;
/**
 * True if given request is for a font asset (note: not triggered by svg)
 * @param {Request} req - Express request object.
 */
exports.isFontAsset = function (req, fontAssetExts) {
    if (fontAssetExts === void 0) { fontAssetExts = baseWebFontAssetExtensions; }
    return fontAssetExts.some(function (ext) { return req.originalUrl.endsWith("." + ext); });
};
/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
exports.isCodeAsset = function (req, codeAssetExts) {
    if (codeAssetExts === void 0) { codeAssetExts = baseWebCodeAssetExtensions; }
    return codeAssetExts.some(function (ext) { return req.originalUrl.endsWith("." + ext); });
};
/**
 * True if given request is for a JS asset.
 * @param {Request} req - Express request object.
 */
exports.isJsAsset = function (req) { return req.originalUrl.endsWith(".js"); };
exports.isJSAsset = exports.isJsAsset;
/**
 * True if given request is for a CSS asset.
 * @param {Request} req - Express request object.
 */
exports.isCssAsset = function (req) { return req.originalUrl.endsWith(".css"); };
exports.isCSSAsset = exports.isCssAsset;
/**
 * Returns true if give string is a supported language.
 * @param {string} str Check if this string is in the supported languages list.
 * @return {boolean} true if the given string is a supported language.
 */
exports.isSupportedLang = function (matchString, supportedLangs) {
    if (supportedLangs === void 0) { supportedLangs = locale_1.canadaLangCodes; }
    return supportedLangs.some(function (curLang) { return curLang === matchString; });
};
/**
 * Get the MIME type of the intended response based on the given type and (if type is not
 * js or css) the initial request URL.
 * @param {string} type - either js, css, or img
 * @param {Request} req - Express request object.
 * @return {string} MIME type string
 */
exports.getMimeType = function (type, req) {
    if (type === 'js')
        return 'application/javascript';
    if (type === 'css')
        return 'text/css';
    if (!req) {
        throw new Error('getMimeType: Not enough data - need request obj to detect MIME type');
    }
    var ext = exports.getExt(req);
    if (ext === 'html')
        return 'text/html';
    if (ext === 'svg')
        return 'image/svg+xml';
    if (ext === 'jpg')
        return 'image/jpeg';
    return "image/" + ext;
};
//# sourceMappingURL=express-routing.js.map