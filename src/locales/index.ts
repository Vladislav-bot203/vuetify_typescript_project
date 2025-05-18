import { createI18n } from "vue-i18n";
import en from "./messages/en.json"

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  messages: {
    en: en
  },
});
