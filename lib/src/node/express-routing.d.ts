/// <reference types="express" />
import { Request } from 'express';
import { getUrlPathBeforeLang, getUrlPathAfterLang } from '../query';
/************************** BARREL EXPORTS FROM OTHER mad-utils MODULES ***************************/
export { getUrlPathBeforeLang, getUrlPathAfterLang };
/**************************************** FUNCTION EXPORTS ****************************************/
/**
 * Extract full URL from request, and ensure no trailing slash at end.
 * @param {Request} req - Express request object.
 */
export declare const getNoTrailingSlashUrl: (req: Request) => string;
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
 * Get the first path in the given URL.
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
export declare const isJsAsset: (req: Request) => boolean;
export { isJsAsset as isJSAsset };
/**
 * True if given request is for a CSS asset.
 * @param {Request} req - Express request object.
 */
export declare const isCssAsset: (req: Request) => boolean;
export { isCssAsset as isCSSAsset };
/**
 * Use request object to determine URL to request JS or CSS asset from.
 * @param {Request} req - Express request object.
 */
export declare const getCodeAssetUrl: (req: Request) => string;
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
