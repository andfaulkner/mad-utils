
/**
 * Get element by ID. TODO: allow getting by class, tag, etc.
 */
export const $ = (sel: string): HTMLElement/* | HTMLElement[]*/ => {
    // get by id
    if (sel.split('#').length > 1) {
        return document.getElementById.call(document, sel.split('#')[1]) as HTMLElement;
    }
    // no # possible past here.
    // else if (sel[0] !== '.') {
    //     // if no classes defined
    //     if (sel.split('.').length === 1) {
    //         return document.getElementsByTagName(sel);
    //     }
    //     return document.getElementsByClassName.call(document, sel) as HTMLElement[];
    // }
};
