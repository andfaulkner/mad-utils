"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***************************************** ALL LANGUAGES ******************************************/
/**
 * Object mapping the most common languages to their abbreviations.
 */
exports.commonLangsObj = {
    af: 'Afrikaans', sq: 'Albanian', ar: 'Arabic', hy: 'Armenian',
    as: 'Assamese', be: 'Belarusian', bn: 'Bengali', bs: 'Bosnian',
    bg: 'Bulgarian', ca: 'Catalan', chr: 'Cherokee', cgg: 'Chiga',
    zh: 'Chinese', hr: 'Croatian', da: 'Danish', nl: 'Dutch',
    en: 'English', eo: 'Esperanto', et: 'Estonian', fil: 'Filipino',
    fi: 'Finnish', fr: 'French', ff: 'Fulah', ka: 'Georgian',
    de: 'German', el: 'Greek', hi: 'Hindi', hu: 'Hungarian',
    is: 'Icelandic', ig: 'Igbo', id: 'Indonesian', ga: 'Irish',
    it: 'Italian', ja: 'Japanese', ko: 'Korean', lv: 'Latvian',
    lt: 'Lithuanian', luo: 'Luo', mk: 'Macedonian', mg: 'Malagasy',
    ms: 'Malay', ml: 'Malayalam', mt: 'Maltese', ne: 'Nepali',
    nb: 'Norwegian Bokmål', nn: 'Norwegian Nynorsk', nyn: 'Nyankole', or: 'Oriya',
    fa: 'Persian', pl: 'Polish', pt: 'Portuguese', pa: 'Punjabi',
    ro: 'Romanian', ru: 'Russian', sr: 'Serbian', sk: 'Slovak',
    sl: 'Slovenian', so: 'Somali', es: 'Spanish', sw: 'Swahili',
    sv: 'Swedish', gsw: 'Swiss German', ta: 'Tamil', th: 'Thai',
    tr: 'Turkish', uk: 'Ukrainian', ur: 'Urdu ', vi: 'Vietnamese',
    cy: 'Welsh', zu: 'Zulu',
};
/**
 * Array of the common abbreviations for the most common languages.
 */
exports.commonLangAbbrevs = Object.keys(exports.commonLangsObj);
/**
 * Array of the names of the most common languages.
 */
exports.commonLangNames = Object.keys(exports.commonLangsObj).map(function (abbr) { return exports.commonLangsObj[abbr]; });
/*************************************** CANADIAN LANGUAGES ***************************************/
/**
 * Object mapping Canada's official languages to their abbreviations.
 */
exports.canadaLangsObj = { en: 'English', fr: 'French' };
/**
 * Array of the abbreviations of Canada's official languages
 */
exports.canadaLangAbbrevs = Object.keys(exports.commonLangsObj);
/**
 * Array of the names of Canada's official languages.
 */
exports.canadaLangNames = Object.keys(exports.canadaLangsObj).map(function (abbr) { return exports.canadaLangsObj[abbr]; });
//# sourceMappingURL=locale.js.map