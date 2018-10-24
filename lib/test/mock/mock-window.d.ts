/***************************************************************************************************
 *
 *       @file ./mock_window.ts
 *
 *       Mocks the bare minimum amount of the window object to run unit tests
 *       on 'browser' modules
 *
 */
/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/node/index.d.ts" />
export declare const userAgent: string;
/********************************************* EXPORT *********************************************/
/**
 * Pieces of window required to run tests
 */
export declare const window: {
    navigator: {
        userAgent: string;
    };
    location: {
        href: string;
        ancestorOrigins: {};
        origin: string;
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        hash: string;
    };
    sessionStorage: Storage;
    localStorage: Storage;
};
