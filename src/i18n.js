import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esCO from "./assets/i18n/es-CO.json";

const resources = {
  es: {
    translation: {
      ...esCO,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
