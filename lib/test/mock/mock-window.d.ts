/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/node/index.d.ts" />
export declare const userAgent: string;
/********************************************* EXPORT *********************************************/
/**
 * @export
 * Pieces of window required to run tests.
 */
declare const window: {
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
export { window };
