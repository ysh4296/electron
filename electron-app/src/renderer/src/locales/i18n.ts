import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ko from './ko.json';
import ja from './ja.json';
import zh from './zh.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';
import ru from './ru.json';
import pt from './pt.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ko: { translation: ko },
            ja: { translation: ja },
            zh: { translation: zh },
            es: { translation: es },
            fr: { translation: fr },
            de: { translation: de },
            it: { translation: it },
            ru: { translation: ru },
            pt: { translation: pt }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

// ✅ 언어 변경 콜백
i18n.on('languageChanged', (lang) => {
    window.customAPI?.save({ language: lang });
});

export default i18n;
