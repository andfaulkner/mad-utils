/***************************************** SEX AND GENDER *****************************************/
export declare const biologicalSexes: Readonly<{
    male: "male";
    female: "female";
}>;
export { biologicalSexes as commonBiologicalSexes };
export { biologicalSexes as sexes };
export { biologicalSexes as commonSexes };
export declare const biologicalSexesWithBoth: Readonly<Readonly<{
    male: "male";
    female: "female";
}> & {
    both: "both";
}>;
export { biologicalSexesWithBoth as commonBiologicalSexesWithBoth };
export { biologicalSexesWithBoth as sexesWithBoth };
export { biologicalSexesWithBoth as commonSexesWithBoth };
export { biologicalSexesWithBoth as sexWithBoth };
export declare const biologicalSexesWithOther: Readonly<Readonly<{
    male: "male";
    female: "female";
}> & {
    other: "other";
}>;
export { biologicalSexesWithOther as sexesWithOther };
export { biologicalSexesWithOther as commonSexesWithOther };
export { biologicalSexesWithOther as commonBiologicalSexesWithOther };
export declare type BiologicalSex = keyof typeof biologicalSexes;
export { BiologicalSex as Sex };
export { BiologicalSex as CommonSex };
export { BiologicalSex as BinarySex };
export declare type BiologicalSexWithOther = keyof typeof biologicalSexesWithOther;
export { BiologicalSexWithOther as SexWithOther };
export { BiologicalSexWithOther as CommonSexWithOther };
export declare type BiologicalSexWithBoth = keyof typeof biologicalSexesWithBoth;
export { BiologicalSexWithBoth as SexWithBoth };
export { BiologicalSexWithBoth as CommonSexWithBoth };
export { BiologicalSexWithBoth as VaccineSex };
export { BiologicalSexWithBoth as VaccineSexes };
export { BiologicalSexWithOther as Gender };
export { BiologicalSexWithOther as GenderCommon };
export { BiologicalSexWithBoth as GenderWithBoth };
export { BiologicalSexWithBoth as GenderCommonWithBoth };
export { biologicalSexesWithOther as gender };
export { biologicalSexesWithOther as genderCommon };
export { biologicalSexesWithBoth as genderWithBoth };
export { biologicalSexesWithBoth as genderCommonWithBoth };
/**
 * Extended gender list.
 */
export declare const genderFull: Readonly<Readonly<Readonly<{
    male: "male";
    female: "female";
}> & {
    other: "other";
}> & {
    transMale: "trans male";
    transFemale: "trans female";
    genderqueer: "genderqueer";
    genderfluid: "genderfluid";
    intersex: "intersex";
    agender: "agender";
    bigender: "bigender";
    nonBinary: "nonBinary";
    none: "none";
}>;
export declare type GenderFull = keyof typeof genderFull;
export { GenderFull as GenderExtensive };
export { GenderFull as GenderExtended };
/***************************************** PROVINCE TYPES *****************************************/
export declare type CANProvince = 'Ontario' | 'Quebec' | "New Brunswick" | "Nova Scotia" | "Newfoundland and Labrador" | "Prince Edward Island" | "Manitoba" | "Saskatchewan" | "British Columbia" | "Northwest Territories" | "Nunavut" | "Yukon Territory" | "Alberta";
export declare type CANProvinceOrNone = CANProvince | 'none';
export { CANProvince as CanadianProvince };
export { CANProvinceOrNone as CanadianProvinceOrNone };
/************************************ EXPORT PROVINCE OBJECTS *************************************/
export declare type ProvinceOrNoneObject = {
    [key: string]: CANProvinceOrNone;
};
/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
export declare const CANProvinces: Readonly<{
    on: "Ontario";
    qc: "Quebec";
    nb: "New Brunswick";
    ns: "Nova Scotia";
    pe: "Prince Edward Island";
    mb: "Manitoba";
    sk: "Saskatchewan";
    bc: "British Columbia";
    nt: "Northwest Territories";
    nu: "Nunavut";
    yt: "Yukon Territory";
    ab: "Alberta";
    nl: "Newfoundland and Labrador";
}>;
/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
export declare const CANProvincesOrNone: Readonly<Readonly<{
    on: "Ontario";
    qc: "Quebec";
    nb: "New Brunswick";
    ns: "Nova Scotia";
    pe: "Prince Edward Island";
    mb: "Manitoba";
    sk: "Saskatchewan";
    bc: "British Columbia";
    nt: "Northwest Territories";
    nu: "Nunavut";
    yt: "Yukon Territory";
    ab: "Alberta";
    nl: "Newfoundland and Labrador";
}> & {
    none: "none";
}>;
export { CANProvinces as canadianProvinces };
export { CANProvincesOrNone as canadianProvincesOrNone };
