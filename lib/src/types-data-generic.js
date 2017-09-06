"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("./object");
/***************************************** SEX AND GENDER *****************************************/
//
// SEX
//
exports.biologicalSexes = object_1.deepFreeze({
    male: 'male',
    female: 'female'
});
exports.commonBiologicalSexes = exports.biologicalSexes;
exports.sexes = exports.biologicalSexes;
exports.commonSexes = exports.biologicalSexes;
exports.biologicalSexesWithOther = object_1.deepFreeze(Object.assign({}, exports.biologicalSexes, {
    other: 'other'
}));
exports.sexesWithOther = exports.biologicalSexesWithOther;
exports.commonSexesWithOther = exports.biologicalSexesWithOther;
exports.commonBiologicalSexesWithOther = exports.biologicalSexesWithOther;
exports.gender = exports.biologicalSexesWithOther;
exports.genderCommon = exports.biologicalSexesWithOther;
/**
 * Extended gender list.
 */
exports.genderFull = object_1.deepFreeze(Object.assign({}, exports.biologicalSexesWithOther, {
    transMale: 'trans male',
    transFemale: 'trans female',
    genderqueer: 'genderqueer',
    genderfluid: 'genderfluid',
    intersex: 'intersex',
    agender: 'agender',
    bigender: 'bigender',
    nonBinary: 'nonBinary',
    none: 'none',
}));
/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
exports.CANProvinces = object_1.deepFreeze({
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
});
exports.canadianProvinces = exports.CANProvinces;
/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
exports.CANProvincesOrNone = object_1.deepFreeze(Object.assign({}, exports.CANProvinces, {
    none: 'none',
}));
exports.canadianProvincesOrNone = exports.CANProvincesOrNone;
//# sourceMappingURL=types-data-generic.js.map