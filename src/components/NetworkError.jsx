import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

const NetworkError = ({ onRetry }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#ececec] dark:bg-[#191820] text-center p-6 transition-colors duration-300">
            <div className="bg-white dark:bg-[#23222e] p-8 rounded-3xl shadow-modern max-w-md w-full animate-fadeIn border border-gray-100 dark:border-gray-700">
                <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                    <WifiOff className="w-10 h-10 text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    Internet yo'q
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Server bilan bog'lanib bo'lmadi. Iltimos, internet aloqasini tekshiring va qayta urinib ko'ring.
                </p>
                <button
                    onClick={onRetry}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <RefreshCw className="w-5 h-5" />
                    Sahifani yangilash
                </button>
            </div>
        </div>
    );
};

export default NetworkError;
