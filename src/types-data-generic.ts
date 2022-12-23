/*--------------------------------------- PROJECT MODULES ----------------------------------------*/
import {deepFreeze} from './object';

/*---------------------------------------- PROVINCE TYPES ----------------------------------------*/
export type CANProvince =
    | 'Ontario'
    | 'Quebec'
    | 'New Brunswick'
    | 'Nova Scotia'
    | 'Newfoundland and Labrador'
    | 'Prince Edward Island'
    | 'Manitoba'
    | 'Saskatchewan'
    | 'British Columbia'
    | 'Northwest Territories'
    | 'Nunavut'
    | 'Yukon Territory'
    | 'Alberta';

export type CANProvinceOrNone = CANProvince | 'none';

// Aliases
export {CANProvince as CanadianProvince};
export {CANProvinceOrNone as CanadianProvinceOrNone};

/*----------------------------------- EXPORT PROVINCE OBJECTS ------------------------------------*/
export type ProvinceOrNoneObject = {[key: string]: CANProvinceOrNone};

/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
export const CANProvinces = deepFreeze({
    on: 'Ontario' as 'Ontario',
    qc: 'Quebec' as 'Quebec',
    nb: 'New Brunswick' as 'New Brunswick',
    ns: 'Nova Scotia' as 'Nova Scotia',
    pe: 'Prince Edward Island' as 'Prince Edward Island',
    mb: 'Manitoba' as 'Manitoba',
    sk: 'Saskatchewan' as 'Saskatchewan',
    bc: 'British Columbia' as 'British Columbia',
    nt: 'Northwest Territories' as 'Northwest Territories',
    nu: 'Nunavut' as 'Nunavut',
    yt: 'Yukon Territory' as 'Yukon Territory',
    ab: 'Alberta' as 'Alberta',
    nl: 'Newfoundland and Labrador' as 'Newfoundland and Labrador',
});

/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
export const CANProvincesOrNone = deepFreeze(
    Object.assign({}, CANProvinces, {
        none: 'none' as 'none',
    })
);

// Aliases
export {CANProvinces as canadianProvinces};
export {CANProvincesOrNone as canadianProvincesOrNone};
