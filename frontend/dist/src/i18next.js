import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../public/locales/en/default.json";
import fiTranslations from "../public/locales/fi/default.json";
const savedLanguage = localStorage.getItem('language') || 'en';
i18n
    .use(initReactI18next)
    .init({
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: enTranslations },
        fi: { translation: fiTranslations },
    },
    react: {
        useSuspense: false,
    },
});
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});
export default i18n;
