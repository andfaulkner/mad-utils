/// <reference types="express" />
import { Request } from 'express';
import { getUrlPathBeforeLang, getUrlPathAfterLang } from '../url';
/************************** BARREL EXPORTS FROM OTHER mad-utils MODULES ***************************/
export { getUrlPathBeforeLang, getUrlPathAfterLang };
/**************************************** FUNCTION EXPORTS ****************************************/
/**
 * Extract "full URL" (the request path/req.originalUrl e.g. '/auth') from
 * request. If '/' is the entire value, return '/'
 * @param {boolean} keepTrailingSlash If false, ensure no trailing slash at end {DEF: false}
 * @param {Request} req Express request object
 * @return {string} Processed "path" from Express request object e.g. '/home/main'
 */
export declare const getUrlPathFromReq: (req: Request, keepTrailingSlash?: boolean) => string;
/**
 * Return the given url with the last path removed.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => https://www.example.com
 * @param {string} url - URL to remove last path from.
 * @return {string} URL with last path removed.
 */
export declare const urlWithoutLastPath: (url: string) => string;
/**
 * Get the last path in the given URL.
 * @example getLastUrlPath('https://www.example.com/auth/login') // => login
 * @param {string} url - URL to get last path from.
 * @return {string} last path in given URL.
 */
export declare const getLastUrlPath: (urlOrReq: string | Request) => string;
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
export declare const getFirstUrlPath: (urlOrReq: string | Request) => string;
/**
 * Get an asset file's extension.
 * Warning: may crash if passed a non-extension.
 * @param {Request} req - Express request object.
 * @return {string} File extension string (e.g. 'js')
 */
export declare const getExt: (req: Request) => string;
/**
 * True if given request is for an asset.
 * @param {Request} req - Express request object.
 */
export declare const isRequestForAsset: (req: Request, assetExts?: any[]) => boolean;
export { isRequestForAsset as isReqForAsset };
/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
export declare const isImageAsset: (req: Request, imgAssetExts?: string[]) => boolean;
export { isImageAsset as isImgAsset };
/**
 * True if given request is for a font asset (note: not triggered by svg)
 * @param {Request} req - Express request object.
 */
export declare const isFontAsset: (req: Request, fontAssetExts?: string[]) => boolean;
/**
 * True if given request is for an image asset.
 * @param {Request} req - Express request object.
 */
export declare const isCodeAsset: (req: Request, codeAssetExts?: string[]) => boolean;
/**
 * True if given request is for a JS asset.
 * @param {Request} req - Express request object.
 */
export declare const isJsAssetRequest: (req: Request) => boolean;
export { isJsAssetRequest as isRequestForJsAsset };
/**
 * True if given request is for a CSS asset.
 * @param {Request} req - Express request object.
 */
export declare const isCssAssetRequest: (req: Request) => boolean;
export { isCssAssetRequest as isRequestForCssAsset };
/**
 * Returns true if give string is a supported language.
 * @param {string} str Check if this string is in the supported languages list.
 * @return {boolean} true if the given string is a supported language.
 */
export declare const isSupportedLang: (matchString: string, supportedLangs?: string[]) => boolean;
/**
 * Get the MIME type of the intended response based on the given type and (if type is not
 * js or css) the initial request URL.
 * @param {string} type - either js, css, or img
 * @param {Request} req - Express request object.
 * @return {string} MIME type string
 */
export declare const getMimeType: (type: "js" | "css" | "img", req?: Request) => string;
