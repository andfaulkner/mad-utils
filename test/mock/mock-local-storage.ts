// Mock localStorage
export const mockLocalStorage = function mockLocalStorage() {
    let s = {} as Storage;
    const noopCallback = (...args: any[]) => {};
    let _itemInsertionCallback = noopCallback;

    s.setItem = (k: string, v: string) => {
        k = k + '';
        if (!s.hasOwnProperty(k)) {
            _itemInsertionCallback(s.length);
        }
        s[k] = v + '';
    };


    s.getItem = (k: string): string => {
        k = k + '';
        if (s.hasOwnProperty(k)) {
            return s[k];
        } else {
            return null;
        }
    };

    s.removeItem = (k): void => {
        k = k + '';
        if (s.hasOwnProperty(k)) {
            delete s[k];
        }
    };

    s.clear = (): void => {
        for (let k in s) {
            if (s.hasOwnProperty(k)) {
                delete s[k];
            }
        }
    };

    Object.defineProperty(s, 'length', {
        enumerable: true,
        value: () => {
            return Object.keys(s).length;
        },
    });

    Object.defineProperty(s, 'key', {
        enumerable: true,
        value: (k: string) => {
            let key = Object.keys(s)[k];
            return (!key) ? null : key;
        },
    });

    Object.defineProperty(s, 'itemInsertionCallback', {
        get: () => {
            return _itemInsertionCallback;
        },
        set: v => {
            if (!v || typeof v != 'function') {
                v = noopCallback;
            }
            _itemInsertionCallback = v;
        }
    });
    return s;
}

/***************************** ATTEMPT TO AUTOMATICALLY BIND GLOBALLY *****************************/
declare const global: NodeJS.Global & {window: { localStorage: Storage, sessionStorage: Storage }};
declare const window: Window;

if (typeof global !== 'undefined') {
    if (typeof global.window === 'undefined') {
        global.window = {
            localStorage: mockLocalStorage(),
            sessionStorage: mockLocalStorage(),
        };
    } else {
        global.window.localStorage = mockLocalStorage();
        global.window.sessionStorage = mockLocalStorage();
    }

} else if (typeof window !== 'undefined') {
    Object.assign(window, {
        localStorage: mockLocalStorage(),
        sessionStorage: mockLocalStorage(),
    });
}
