/********************************************** SEX ***********************************************/
export declare type BiologicalSex = 'male' | 'female';
/***************************************** PROVINCE TYPES *****************************************/
export declare type CANProvince = 'Ontario' | 'Quebec' | "New Brunswick" | "Nova Scotia" | "Newfoundland and Labrador" | "Prince Edward Island" | "Manitoba" | "Saskatchewan" | "British Columbia" | "Northwest Territories" | "Nunavut" | "Yukon Territory" | "Alberta";
export declare type CANProvinceOrNone = CANProvince | 'none';
export { CANProvince as CanadianProvince };
export { CANProvinceOrNone as CanadianProvinceOrNone };
/************************************ EXPORT PROVINCE OBJECTS *************************************/
export declare type ProvinceObject = {
    [key: string]: CANProvince;
};
export declare type ProvinceOrNoneObject = {
    [key: string]: CANProvinceOrNone;
};
/**
 * Canadian provinces and territories list. Maps abbreviation to name.
 */
export declare const CANProvinces: ProvinceObject;
/**
 * Canadian provinces & territories list, including none as an option. Maps abbreviation to name.
 */
export declare const CANProvincesOrNone: ProvinceOrNoneObject;
export { CANProvinces as canadianProvinces };
export { CANProvincesOrNone as canadianProvincesOrNone };
