"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
exports.CANProvinces = {
    on: 'Ontario',
    qc: 'Quebec',
    nb: 'New Brunswick',
    ns: 'Nova Scotia',
    pe: 'Prince Edward Island',
    mb: 'Manitoba',
    sk: 'Saskatchewan',
    bc: 'British Columbia',
    nt: 'Northwest Territories',
    nu: 'Nunavut',
    yt: 'Yukon Territory',
    ab: 'Alberta',
    nl: 'Newfoundland and Labrador',
};
exports.canadianProvinces = exports.CANProvinces;
/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
exports.CANProvincesOrNone = Object.assign({}, exports.CANProvinces, { none: 'none' });
exports.canadianProvincesOrNone = exports.CANProvincesOrNone;
//# sourceMappingURL=types-data-generic.js.map