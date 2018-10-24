/// <reference path="../../../node_modules/typescript/lib/lib.dom.d.ts" />
/**
 * Construct a mock Storage (localStorage / sessionStorage) object
 * Should be bound to a global, to act as a shim for browser localStorage or
 * sessionStorage in a NodeJS environment
 *
 * Example: window.localStorage = mockBrowserStorage();
 *
 * @return {Storage} New 'Storage' object
 */
export declare const mockBrowserStorage: () => Storage;
/**
 * Try to automatically bind localStorage & sessionStorage globally
 * @return {boolean} true if it succeeds, false if it doesn't
 */
export declare const bindBrowserStorageGlobally: () => boolean;
