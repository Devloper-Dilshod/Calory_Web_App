import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';

const ResultCard = ({ result }) => {
    const { t } = useLanguage();

    if (!result) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <i className="fas fa-utensils text-4xl mb-3 text-green-500"></i>
                <p className="font-semibold">{t('startPrompt')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{result.food_name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{result.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-100 dark:bg-green-800/30 rounded-lg text-center">
                    <p className="text-3xl font-extrabold text-green-700 dark:text-green-400">{Math.round(result.calories)}</p>
                    <p className="text-sm text-green-600 dark:text-green-500 font-semibold">{t('calories')}</p>
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-800/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{(result.protein || 0).toFixed(1)}g</p>
                    <p className="text-sm text-blue-600 dark:text-blue-500">{t('protein')}</p>
                </div>
                <div className="p-4 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{(result.fat || 0).toFixed(1)}g</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">{t('fat')}</p>
                </div>
                <div className="p-4 bg-purple-100 dark:bg-purple-800/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{(result.carbs || 0).toFixed(1)}g</p>
                    <p className="text-sm text-purple-600 dark:text-purple-500">{t('carbs')}</p>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
