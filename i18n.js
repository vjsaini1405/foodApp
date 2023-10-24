import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Importing translation files
import en from './src/i18n/resources/en.json';
import hn from './src/i18n/resources/hn.json';
import mr from './src/i18n/resources/mr.json';

//Creating object with the variables of imported translation files
export const resources = {
  en: {
    translation: en,
  },
  hn: {
    translation: hn,
  },
  mr: {
    translation: mr,
  },
};

//i18N Initialization

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: resources,
  lng: 'en', //default language
  fallbacking: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
