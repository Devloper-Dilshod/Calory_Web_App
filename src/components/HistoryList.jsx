import { useState } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import DetailModal from './DetailModal';
import { useLanguage } from '../context/LanguageContext';

const HistoryList = ({ history, onClear }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const { t, language } = useLanguage();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (dateString === today.toISOString().split('T')[0]) {
            return t('today');
        } else if (dateString === yesterday.toISOString().split('T')[0]) {
            return t('yesterday');
        } else {
            const locale = language === 'ru' ? 'ru-RU' : (language === 'en' ? 'en-US' : 'uz-UZ');
            return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
        }
    };

    if (!history || history.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('noHistory')}</p>;
    }

    const groupedHistory = history.reduce((acc, item) => {
        const date = item.log_date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    return (
        <div className="space-y-3">
            {Object.keys(groupedHistory).map((date) => (
                <div key={date}>
                    <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 mt-4 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
                        {formatDate(date)}
                    </h4>
                    {groupedHistory[date].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="flex justify-between items-center p-3 mb-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors"
                        >
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{item.food_name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.calories.toFixed(0)} Kkal</p>
                            </div>
                            <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-500 text-sm font-medium flex items-center">
                                {t('details')} <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ))}

            <div className="text-center mt-6">
                <button
                    onClick={onClear}
                    className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors flex items-center justify-center w-full gap-2"
                >
                    <Trash2 size={16} /> {t('clearHistory')}
                </button>
            </div>

            <DetailModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />
        </div>
    );
};

export default HistoryList;
