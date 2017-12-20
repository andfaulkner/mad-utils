/**************************************************************************************************
*
*       @file ./express-routing.ts
*
*       TODO FINISH SETTING express-routing MODULE UP IN MAD-UTILS
*
*/

/*************************************** THIRD-PARTY MODULES **************************************/
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { path as rootPath } from 'app-root-path';
import { Request, Response } from 'express';
import { isDevelopment } from 'env-var-helpers';
import * as Polyglot from 'node-polyglot';

/************************************ OTHER MAD-UTILS MODULES *************************************/
import { canadaLangCodes } from '../locale';
import { withoutLast, last, first, second } from '../array';
import { cap1LowerRest } from '../string';
import { getUrlPathBeforeLang, getUrlPathAfterLang } from '../url';


/************************** BARREL EXPORTS FROM OTHER mad-utils MODULES ***************************/
export { getUrlPathBeforeLang, getUrlPathAfterLang }

/**************************************** TYPE DEFINITIONS ****************************************/
type AssetFileResolver = (req: Request) => string;
type AssetTypes = 'js' | 'css' | 'img';


/*********************************** BASIC WEB FILE EXTENSIONS ************************************/
const baseWebImgAssetExtensions = ['ico', 'png', 'svg', 'bmp', 'gif', 'tiff']
const baseWebCodeAssetExtensions = ['js', 'css'];
const baseWebFontAssetExtensions = ['ttf', 'eot', 'woff', 'woff2', 'ttc'];

const baseWebAssetExts = [].concat(baseWebImgAssetExtensions)
                           .concat(baseWebCodeAssetExtensions);


/**************************************** FUNCTION EXPORTS ****************************************/
/**
 * Extract full URL from request, and ensure no trailing slash at end.
 * @param {Request} req - Express request object.
 */
export const getNoTrailingSlashUrl = (req: Request): string => _.trimEnd(req.originalUrl, '/');

/**
 * Return the given url with the last path removed.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => https://www.example.com
 * @param {string} url - URL to remove last path from.
 * @return {string} URL with last path removed.
 */
export const urlWithoutLastPath = (url: string): string => withoutLast(url.split('/')).join('/');

/**
 * Get the last path in the given URL.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => login
 * @param {string} url - URL to get last path from.
 * @return {string} last path in given URL.
 */
export const getLastUrlPath = (urlOrReq: string | Request): string => {
    if (typeof urlOrReq === 'string') return last(urlOrReq.split('/'));
    return last(urlOrReq.originalUrl.split('/'));
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
export const getFirstUrlPath = (urlOrReq: string | Request): string => {
    const cleanURL = (typeof urlOrReq === 'string') ? urlOrReq : urlOrReq.originalUrl;
    const getFunc = (cleanURL.match(/https?:\/\//) || cleanURL.match(/localhost/)) ? second : first;
    return getFunc(cleanURL.replace(/^\/(?=[a-zA-Z_0-9])/g, '')
                           .replace(/https?:\/\//g, '')
                           .split('/')
    );
};

/**
 * Get an asset file's extension.
 * Warning: may crash if passed a non-extension.
 * @param {Request} req - Express request object.
 * @return {string} File extension string (e.g. 'js')
 */
export const getExt = (req: Request): string => getLastUrlPath(req.originalUrl).split('.')[1];

/**
 * True if given request is for an asset.
 * @param {Request} req - Express request object.
 */
export const isRequestForAsset = (req: Request, assetExts = baseWebAssetExts): boolean =>
    assetExts.some(ext => req.originalUrl.endsWith(`.${ext}`));
export { isRequestForAsset as isReqForAsset }

/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
export const isImageAsset = (req: Request, imgAssetExts = baseWebImgAssetExtensions): boolean =>
    imgAssetExts.some(ext => req.originalUrl.endsWith(`.${ext}`));
export { isImageAsset as isImgAsset }

/**
 * True if given request is for a font asset (note: not triggered by svg)
 * @param {Request} req - Express request object.
 */
export const isFontAsset = (req: Request, fontAssetExts = baseWebFontAssetExtensions): boolean =>
    fontAssetExts.some(ext => req.originalUrl.endsWith(`.${ext}`));

/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
export const isCodeAsset = (req: Request, codeAssetExts = baseWebCodeAssetExtensions): boolean =>
    codeAssetExts.some(ext => req.originalUrl.endsWith(`.${ext}`));

/**
 * True if given request is for a JS asset.
 * @param {Request} req - Express request object.
 */
export const isJsAsset = (req: Request): boolean => req.originalUrl.endsWith(`.js`);
export { isJsAsset as isJSAsset }

/**
 * True if given request is for a CSS asset.
 * @param {Request} req - Express request object.
 */
export const isCssAsset = (req: Request): boolean => req.originalUrl.endsWith(`.css`);
export { isCssAsset as isCSSAsset }

/**
 * Returns true if give string is a supported language.
 * @param {string} str Check if this string is in the supported languages list.
 * @return {boolean} true if the given string is a supported language.
 */
export const isSupportedLang = (matchString: string, supportedLangs = canadaLangCodes): boolean =>
    supportedLangs.some(curLang => curLang === matchString);

/**
 * Get the MIME type of the intended response based on the given type and (if type is not
 * js or css) the initial request URL.
 * @param {string} type - either js, css, or img
 * @param {Request} req - Express request object.
 * @return {string} MIME type string
 */
export const getMimeType = (type: 'js' | 'css' | 'img', req?: Request): string => {
    if (type === 'js') return 'application/javascript';
    if (type === 'css') return 'text/css';
    if (!req) {
        throw new Error('getMimeType: Not enough data - need request obj to detect MIME type');
    }
    const ext = getExt(req);
    if (ext === 'html') return 'text/html';
    if (ext === 'svg') return 'image/svg+xml';
    if (ext === 'jpg') return 'image/jpeg';
    return `image/${ext}`;
};
