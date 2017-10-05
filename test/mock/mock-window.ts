/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

/**************************************************************************************************
*
*       @file ./mock_window.ts
*       
*       Mocks the bare minimum amount of the window object to run the unit tests
*
*/

import { mockBrowserStorage } from './mock-local-storage';

export const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 " +
                         "(KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36";

const location = {
    href:            "http://localhost:8080/auth/en/signup/location",
    ancestorOrigins: {},
    origin:          "http://localhost:8080",
    protocol:        "http:",
    host:            "localhost:8080",
    hostname:        "localhost",
    port:            "8080",
    pathname:        "/auth/en/signup/location",
    search:          "",
    hash:            ""
};


/********************************************* EXPORT *********************************************/
/**
 * @export
 * Pieces of window required to run tests.
 */
const window = {
    navigator: { userAgent },
    location,
    sessionStorage: mockBrowserStorage(),
    localStorage: mockBrowserStorage(),
};


/*************************** AUTOMATICALLY BIND WINDOW TO GLOBAL OBJECT ***************************/
(global as any).window = window;

export { window }
