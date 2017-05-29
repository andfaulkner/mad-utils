//
// Loosely based on https://github.com/letsrock-today/mock-local-storage
// Thanks letsrock-today!
//

/**
 * Construct a mock Storage (localStorage / sessionStorage) object. Should be
 * bound to a global, to act as a shim for browser localStorage or sessionStorage
 * in a NodeJS environment.
 *
 * @return {Storage} New 'Storage' object
 * @example window.localStorage = mockBrowserStorage();
 */
export const mockBrowserStorage = function mockBrowserStorage() {
    let store = {} as Storage;
    const noopCallback = (...args: any[]) => {};
    let _itemInsertionCallback: Function = noopCallback;

    store.setItem = (k: string, val: string) => {
        k = k + '';
        if (!store.hasOwnProperty(k)) {
            _itemInsertionCallback(store.length);
        }
        store[k] = val + '';
    };


    store.getItem = (k: string): string => {
        k = k + '';
        if (store.hasOwnProperty(k)) {
            return store[k];
        } else {
            return null;
        }
    };

    store.removeItem = (k: string): void => {
        k = k + '';
        if (store.hasOwnProperty(k)) {
            delete store[k];
        }
    };

    store.clear = (): void => {
        for (let k in store) {
            if (store.hasOwnProperty(k)) {
                delete store[k];
            }
        }
    };

    Object.defineProperty(store, 'length', {
        enumerable: true,
        value: () => {
            return Object.keys(store).length;
        },
    });

    Object.defineProperty(store, 'key', {
        enumerable: true,
        value: (k: string) => {
            let key = Object.keys(store)[k];
            return (!key) ? null : key;
        },
    });

    Object.defineProperty(store, 'itemInsertionCallback', {
        get: () => {
            return _itemInsertionCallback;
        },
        set: (val: Function) => {
            if (!val || typeof val != 'function') {
                val = noopCallback;
            }
            _itemInsertionCallback = val;
        }
    });

    return store;
};

// NOTE: this is a bit evil - instantiating just to get typings. This is due to
// a Typescript limitation, sadly.
const baseMockBrowserStorage = mockBrowserStorage();
export type BrowserStorage = typeof baseMockBrowserStorage;

// Typings to make bindBrowserStorageGlobally happy.
declare const global: NodeJS.Global & {window: { localStorage: Storage, sessionStorage: Storage }};
declare const window: Window;

/**
 * Attempt to automatically bind localStorage and sessionStorage globally.
 * @return {boolean} true if it succeeds, false if it doesn't.
 */
export const bindBrowserStorageGlobally = () => {
    if (typeof global !== 'undefined') {
        if (typeof global.window === 'undefined') {
            global.window = {
                localStorage: mockBrowserStorage(),
                sessionStorage: mockBrowserStorage(),
            };
        } else {
            global.window.localStorage = mockBrowserStorage();
            global.window.sessionStorage = mockBrowserStorage();
        }
        return true;

    } else if (typeof window !== 'undefined') {
        Object.assign(window, {
            localStorage: mockBrowserStorage(),
            sessionStorage: mockBrowserStorage(),
        });
        return true;
    }
    return false;
};
