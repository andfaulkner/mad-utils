/******************************************** BROWSER *********************************************/
/**
 * If given a "store" object, try to get item at given key from it. Next try to get it from browser
 * localStorage or sessionStorage. Finally, try key in 'this' binding. Return null if all fail.
 */
export declare const getFromStorage: (key: string, store?: Object) => string;
/**
 * If the user is authenticated, there will be a key in localStorage.
 * Note that this should NEVER be used to determine permissions - this
 * is about what to display in the UI, and nothing else. The server should
 * determine permissions - anything less is begging to be hacked.
 *
 * @param {string} tknKey - Key at which the auth token can be found. Defaults to 'accessToken'.
 * @return {boolean} true if token is found at given key in browser local storage
 */
export declare const isAuthenticated: (tknKey?: string) => boolean;
