import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Dufuat til uzbek tiligini o'rnatamiz
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('language') || 'uz';
    });
// Tilni o'zgartirish funksiyasi
    const setLanguage = (lang) => {
        if (translations[lang]) {
            setLanguageState(lang);
            localStorage.setItem('language', lang);
        }
    };
// Til o'zgarishini kuzatib boramiz
    const t = (key) => {
        return translations[language][key] || key;
    };
    // Til o'zgarganda localStorage yangilanadi
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
