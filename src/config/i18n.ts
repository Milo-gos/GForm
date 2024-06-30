import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { en, vi } from '../locales';
import { LANGUAGE } from '../constants';

const resources = {
    en,
    vi,
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: LANGUAGE.VI,
        fallbackLng: LANGUAGE.EN,
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
    });

export default i18n;
