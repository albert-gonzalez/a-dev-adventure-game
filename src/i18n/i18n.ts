import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations.en.json";
import es from "./translations.es.json";
import ca from "./translations.ca.json";

export const init = () =>
  i18next.use(LanguageDetector).init({
    debug: true,
    fallbackLng: "ca",
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      ca: {
        translation: ca,
      },
    },
  });

export const getText = (
  key: string,
  options?: Record<string, unknown>
): string => i18next.t(key, options);
