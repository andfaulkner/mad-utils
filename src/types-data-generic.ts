/********************************************** SEX ***********************************************/
export type BiologicalSex = 'male' | 'female';

/***************************************** PROVINCE TYPES *****************************************/
export type CANProvince = 'Ontario'
                       | 'Quebec'
                       | "New Brunswick"
                       | "Nova Scotia"
                       | "Newfoundland and Labrador"
                       | "Prince Edward Island"
                       | "Manitoba"
                       | "Saskatchewan"
                       | "British Columbia"
                       | "Northwest Territories"
                       | "Nunavut"
                       | "Yukon Territory"
                       | "Alberta";


export type CANProvinceOrNone = CANProvince | 'none';

// Aliases
export { CANProvince as CanadianProvince }
export { CANProvinceOrNone as CanadianProvinceOrNone }

/************************************ EXPORT PROVINCE OBJECTS *************************************/
export type ProvinceObject = { [key: string]: CANProvince };
export type ProvinceOrNoneObject = { [key: string]: CANProvinceOrNone };

/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
export const CANProvinces: ProvinceObject = {
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

/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
export const CANProvincesOrNone: ProvinceOrNoneObject =
    Object.assign({}, CANProvinces, { none: 'none' });

// Aliases
export { CANProvinces as canadianProvinces }
export { CANProvincesOrNone as canadianProvincesOrNone }
