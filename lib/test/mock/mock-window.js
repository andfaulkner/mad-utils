"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************************************************************************
*
*       @file ./mock_window.ts
*
*       Mocks the bare minimum amount of the window object to run the unit tests
*
*/
var mock_local_storage_1 = require("./mock-local-storage");
exports.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36";
var location = {
    href: "http://localhost:8080/auth/en/signup/location",
    ancestorOrigins: {},
    origin: "http://localhost:8080",
    protocol: "http:",
    host: "localhost:8080",
    hostname: "localhost",
    port: "8080",
    pathname: "/auth/en/signup/location",
    search: "",
    hash: ""
};
/********************************************* EXPORT *********************************************/
/**
 * @export
 * Pieces of window required to run tests.
 */
var window = {
    navigator: { userAgent: exports.userAgent },
    location: location,
    sessionStorage: mock_local_storage_1.mockBrowserStorage(),
    localStorage: mock_local_storage_1.mockBrowserStorage(),
};
exports.window = window;
/*************************** AUTOMATICALLY BIND WINDOW TO GLOBAL OBJECT ***************************/
global.window = window;
//# sourceMappingURL=mock-window.js.map