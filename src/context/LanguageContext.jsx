import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Read from localStorage or default to 'uz'
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('language') || 'uz';
    });

    const setLanguage = (lang) => {
        if (translations[lang]) {
            setLanguageState(lang);
            localStorage.setItem('language', lang);
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
