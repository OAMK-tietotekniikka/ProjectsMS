import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import httpApi from "i18next-http-backend";

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
    .use(httpApi)
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: savedLanguage, // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already does escaping
        },
        backend: {
            loadPath: 'locales/{{lng}}/default.json', // path to translation files
        },
        react: {
            useSuspense: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n;
