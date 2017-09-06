import { deepFreeze } from './object';

/***************************************** SEX AND GENDER *****************************************/
//
// SEX
//

export const biologicalSexes = deepFreeze({
    male:   'male'   as 'male',
    female: 'female' as 'female'
});
export { biologicalSexes as commonBiologicalSexes };
export { biologicalSexes as sexes };
export { biologicalSexes as commonSexes };

export const biologicalSexesWithOther = deepFreeze(Object.assign({}, biologicalSexes, {
    other: 'other' as 'other'
}));
export { biologicalSexesWithOther as sexesWithOther };
export { biologicalSexesWithOther as commonSexesWithOther };
export { biologicalSexesWithOther as commonBiologicalSexesWithOther };

// Sex types
export type BiologicalSex = keyof typeof biologicalSexes;
export { BiologicalSex as Sex       }
export { BiologicalSex as CommonSex }
export { BiologicalSex as BinarySex }

export type BiologicalSexWithOther = keyof typeof biologicalSexesWithOther;
export { BiologicalSexWithOther as SexWithOther }
export { BiologicalSexWithOther as CommonSexWithOther }


//
// GENDER
//

// Types, carried over from sex.
export { BiologicalSexWithOther as Gender       }
export { BiologicalSexWithOther as GenderCommon }

// Objects, carried over form sex.
export { biologicalSexesWithOther as gender       }
export { biologicalSexesWithOther as genderCommon }

/**
 * Extended gender list.
 */
export const genderFull = deepFreeze(Object.assign({}, biologicalSexesWithOther, {
    transMale:   'trans male'   as 'trans male',
    transFemale: 'trans female' as 'trans female',
    genderqueer: 'genderqueer'  as 'genderqueer',
    genderfluid: 'genderfluid'  as 'genderfluid',
    intersex:    'intersex'     as 'intersex',
    agender:     'agender'      as 'agender',
    bigender:    'bigender'     as 'bigender',
    nonBinary:   'nonBinary'    as 'nonBinary',
    none:        'none'         as 'none',
}));

export type GenderFull = keyof typeof genderFull;
export { GenderFull as GenderExtensive }
export { GenderFull as GenderExtended }


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
export type ProvinceOrNoneObject = { [key: string]: CANProvinceOrNone };

/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
export const CANProvinces = deepFreeze({
    on: 'Ontario'                   as 'Ontario',
    qc: 'Quebec'                    as 'Quebec',
    nb: 'New Brunswick'             as 'New Brunswick',
    ns: 'Nova Scotia'               as 'Nova Scotia',
    pe: 'Prince Edward Island'      as 'Prince Edward Island',
    mb: 'Manitoba'                  as 'Manitoba',
    sk: 'Saskatchewan'              as 'Saskatchewan',
    bc: 'British Columbia'          as 'British Columbia',
    nt: 'Northwest Territories'     as 'Northwest Territories',
    nu: 'Nunavut'                   as 'Nunavut',
    yt: 'Yukon Territory'           as 'Yukon Territory',
    ab: 'Alberta'                   as 'Alberta',
    nl: 'Newfoundland and Labrador' as 'Newfoundland and Labrador',
});

/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
export const CANProvincesOrNone = deepFreeze(Object.assign({}, CANProvinces, {
    none: 'none' as 'none',
}));

// Aliases
export { CANProvinces as canadianProvinces }
export { CANProvincesOrNone as canadianProvincesOrNone }
