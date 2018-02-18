export function once(fn: Function): Function {
    let ran = false;
    let res = null;

    return function(...args: any[]) {
        if (!ran) {
            ran = true;
            res = fn(...args);
        }
        return res;
    }
}
