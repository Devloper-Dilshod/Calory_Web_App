import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LoadingModal = ({ isOpen }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-[#23222e] rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-bounce-subtle border border-gray-100 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6 relative">
                    <Loader2 className="w-10 h-10 text-green-600 dark:text-green-400 animate-spin" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-green-500 animate-spin"></div>
                </div>
                <h3 className="text-xl font-poppins font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {t('calculating')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base font-poppins font-medium animate-pulse">
                    {t('ai_analyzing')}
                </p>
            </div>
        </div>
    );
};

export default LoadingModal;
