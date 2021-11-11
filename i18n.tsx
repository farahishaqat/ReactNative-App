import i18n  from 'i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import ar from './assets/i18n/ar.json';
import en from './assets/i18n/en.json';
import {initReactI18next} from 'react-i18next';

export const changeLanguage = async(lang:string) => {
  //update lan
    //save updated language

  await AsyncStorage.setItem("@language", lang);
  i18n.changeLanguage(lang);
  
  //check on view RTL LTR

  I18nManager.forceRTL(lang === 'ar')
  //show splash screen

 // SplashSceen.show();
  //restart app
};

const setDefaultLang = async () => {
  //handle lang on start up

  const selectedLanguage = await AsyncStorage.getItem('@language');
  if (!selectedLanguage) {
    await AsyncStorage.setItem('@language', 'en');
  }
  //initialize i18n
  i18n.use(initReactI18next).init({
    resources: {
      en: {translation: en},
      ar: {translation: ar},
    },
    lng: selectedLanguage!,
    compatibilityJSON:'v3'
  });
};



setDefaultLang();
export default i18n;