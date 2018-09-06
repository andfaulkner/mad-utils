/*
 * ACTUAL OMIT IMPLEMENTATION
 */
export function omit<O extends object = Object, T = any>(
    obj: Object,
    props: string | string[] | OmitPred<T>,
    fn?: OmitPred<T>
) {
    if (!isObject(obj)) return {};
    if (!props || props.length < 1) return obj;

    if (typeof props === 'function') {
        fn = props;
        props = [];
    }

    if (typeof props === 'string') props = [props];

    // Get all of own and inherited keys
    let objKeys = [];
    for (let key in props) {
        if (
            !(
                key === 'constructor' &&
                ((typeof obj[key] === 'function' && obj[key].prototype) ||
                    Object.prototype.hasOwnProperty.call(obj, key))
            )
        ) {
            objKeys.push(key);
        }
    }

    return objKeys.reduce(
        (acc, k) =>
            !props ||
            ((props as any[]).indexOf(k) === -1 && (!isFunction(fn) || fn(obj[k], k, obj)))
                ? assign(acc, {[k]: obj[k]})
                : acc,
        {}
    );
}
