import {LANGUAGES, settingsStorage} from './storage.js';

import en from '../languages/en.json';
import ee from '../languages/ee.json';

const translations = {
    [LANGUAGES.EN]: en,
    [LANGUAGES.EE]: ee,
    [LANGUAGES.RU]: ru,
};

let dictionary = {};

export const initI18n = () => {
    const lang = settingsStorage.getLanguage();

    dictionary = translations[lang] || translations[LANGUAGES.EN];

    document.documentElement.setAttribute('lang', lang);
};

export const t = (key) => {

    const keys = key.split('.');
    let value = dictionary;

    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }

    return value;
};