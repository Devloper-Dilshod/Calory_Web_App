import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const ResultCard = ({ result, imagePreview, onRegisterClick }) => {
    const { t } = useLanguage();
    const { user } = useAuth(); // Userni statusini tekshirish

    if (!result) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <i className="fas fa-utensils text-4xl mb-3 text-green-500"></i>
                <p className="font-semibold">{t('startPrompt')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col items-center text-center">
                {/* Rasmni ko'rish */}
                {imagePreview && (
                    <div className="w-full max-w-sm mb-4 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                        <img src={imagePreview} alt="Food" className="w-full h-48 object-cover" />
                    </div>
                )}

                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{result.food_name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-lg">{result.description}</p>
                {result.weight_g && (
                    <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                        {t('estimatedWeight') || "Tahminiy og'irligi"}: {result.weight_g}g
                    </span>
                )}
            </div>

            {/* Kaloriyalar - Har doim ko'rinadi */}
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center border border-green-100 dark:border-green-800/50">
                <p className="text-sm text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-1">{t('calories')}</p>
                <p className="text-5xl font-extrabold text-green-600 dark:text-green-400">{Math.round(result.calories)}</p>
                <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-1">kcal</p>
            </div>

            {/* Macros Grid - Strongly Obfuscated for Guests */}
            <div className={clsx("relative rounded-2xl", !user ? "min-h-[320px]" : "")}>
                {/* Content behind overlay - almost invisible (for guests only) */}
                {!user && (
                    <div className={clsx("grid grid-cols-3 gap-4", "filter blur-2xl opacity-10 pointer-events-none select-none grayscale absolute inset-0 w-full h-full")}>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                            <p className="text-2xl font-bold text-blue-600">{(result.protein || 0).toFixed(1)}g</p>
                            <p className="text-xs text-blue-500">{t('protein')}</p>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-center">
                            <p className="text-2xl font-bold text-yellow-600">{(result.fat || 0).toFixed(1)}g</p>
                            <p className="text-xs text-yellow-500">{t('fat')}</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                            <p className="text-2xl font-bold text-purple-600">{(result.carbs || 0).toFixed(1)}g</p>
                            <p className="text-xs text-purple-500">{t('carbs')}</p>
                        </div>
                    </div>
                )}

                {/* Show normal grid if user is logged in */}
                {user && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center border border-blue-100 dark:border-blue-800/50">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{(result.protein || 0).toFixed(1)}g</p>
                            <p className="text-xs text-blue-500 dark:text-blue-500 font-bold">{t('protein')}</p>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-center border border-yellow-100 dark:border-yellow-800/50">
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{(result.fat || 0).toFixed(1)}g</p>
                            <p className="text-xs text-yellow-500 dark:text-yellow-500 font-bold">{t('fat')}</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center border border-purple-100 dark:border-purple-800/50">
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{(result.carbs || 0).toFixed(1)}g</p>
                            <p className="text-xs text-purple-500 dark:text-purple-500 font-bold">{t('carbs')}</p>
                        </div>
                    </div>
                )}

                {/* Heavy Overlay for Guests with "Bijir-Bijir" Noise Effect */}
                {!user && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
                        {/* Noise/Pattern Background */}
                        <div className="absolute inset-0 bg-white/60 dark:bg-[#191820]/80 backdrop-blur-xl"
                            style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%)' }}>
                        </div>

                        {/* Interactive Card */}
                        <div className="relative z-20 bg-white dark:bg-[#23222e] p-6 rounded-2xl shadow-2xl text-center border border-gray-100 dark:border-gray-700 w-full max-w-[280px] transform transition-transform hover:scale-105 duration-300">
                            <div className="mb-4 text-green-500 flex justify-center drop-shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-bold mb-6 leading-relaxed">
                                {t('viewFullDetails') || "To'liq ma'lumotni ko'rish uchun tizimdan o'ting"}
                            </p>
                            <button
                                onClick={onRegisterClick}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wide"
                            >
                                {t('register') || "Ro'yxatdan o'tish"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultCard;
