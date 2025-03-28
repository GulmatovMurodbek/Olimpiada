import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    supportedLngs: ["tj", "ru","en"], 
    fallbackLng: "tj", 
    debug: true, 
    detection: {
      order: ["localStorage", "cookie", "navigator"], 
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", 
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
