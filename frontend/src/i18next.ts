import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import httpApi from "i18next-http-backend";


i18n
    .use(httpApi)
    .use(initReactI18next)
        .init({
            lng: 'en', // default language
            fallbackLng: 'en',
            backend: {
                loadPath: 'locales/{{lng}}/default.json', // path to translation files
            },
            react: {
                useSuspense: false,
            },
        });

    export default i18n;
