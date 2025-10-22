import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';

// Get device locale
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

// Configure i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: deviceLanguage === 'fr' ? 'fr' : 'en', // Default to English if not French
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    compatibilityJSON: 'v4', 
  });

export default i18n;