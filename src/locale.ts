/***************************************** ALL LANGUAGES ******************************************/
/**
 * Object mapping the most common languages to their abbreviations
 */
// prettier-ignore
export const commonLangsObj = {
    af: `Afrikaans`,        sq: `Albanian`,          ar: `Arabic`,     hy: `Armenian`,
    as: `Assamese`,         be: `Belarusian`,        bn: `Bengali`,    bs: `Bosnian`,
    bg: `Bulgarian`,        ca: `Catalan`,           chr: `Cherokee`,  cgg: `Chiga`,
    zh: `Chinese`,          hr: `Croatian`,          da: `Danish`,     nl: `Dutch`,
    en: `English`,          eo: `Esperanto`,         et: `Estonian`,   fil: `Filipino`,
    fi: `Finnish`,          fr: `French`,            ff: `Fulah`,      ka: `Georgian`,
    de: `German`,           el: `Greek`,             hi: `Hindi`,      hu: `Hungarian`,
    is: `Icelandic`,        ig: `Igbo`,              id: `Indonesian`, ga: `Irish`,
    it: `Italian`,          ja: `Japanese`,          ko: `Korean`,     lv: `Latvian`,
    lt: `Lithuanian`,       luo: `Luo`,              mk: `Macedonian`, mg: `Malagasy`,
    ms: `Malay`,            ml: `Malayalam`,         mt: `Maltese`,    ne: `Nepali`,
    nb: `Norwegian Bokmål`, nn: `Norwegian Nynorsk`, nyn: `Nyankole`,  or: `Oriya`,
    fa: `Persian`,          pl: `Polish`,            pt: `Portuguese`, pa: `Punjabi`,
    ro: `Romanian`,         ru: `Russian`,           sr: `Serbian`,    sk: `Slovak`,
    sl: `Slovenian`,        so: `Somali`,            es: `Spanish`,    sw: `Swahili`,
    sv: `Swedish`,          gsw: `Swiss German`,     ta: `Tamil`,      th: `Thai`,
    tr: `Turkish`,          uk: `Ukrainian` ,        ur: `Urdu `,      vi: `Vietnamese`,
    cy: `Welsh`,            zu: `Zulu`,
};

/**
 * Array of the common abbreviations for the most common languages
 */
export const commonLangAbbrevs = Object.keys(commonLangsObj);

/**
 * Array of the names of the most common languages
 */
export const commonLangNames = Object.keys(commonLangsObj).map(abbr => commonLangsObj[abbr]);

/*************************************** CANADIAN LANGUAGES ***************************************/
/**
 * Object mapping Canada's official languages to their abbreviations
 */
export const canadaLangsObj = {en: `English`, fr: `French`};

/**
 * Array of the abbreviations of Canada's official languages
 */
export const canadaLangAbbrevs = Object.keys(commonLangsObj);
export {canadaLangAbbrevs as canadaLangCodes};

/**
 * Array of the names of Canada's official languages
 */
export const canadaLangNames = Object.keys(canadaLangsObj).map(abbr => canadaLangsObj[abbr]);

export {englishVariants, frenchVariants} from './internal/lang-constants';
