import { useLanguage } from '../context/LanguageContext';
import { Activity, TrendingUp, Calendar } from 'lucide-react';

const StatsChart = ({ history }) => {
    const { t, language } = useLanguage();

    if (!history || history.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-10 w-full animate-fadeIn">{t('noStats')}</p>;
    }

    const today = new Date().toISOString().split('T')[0];

    // Bugungi statistika
    const todaysItems = history.filter(item => item.log_date === today);
    const todayStats = todaysItems.reduce((acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        fat: acc.fat + item.fat,
        carbs: acc.carbs + item.carbs
    }), { calories: 0, protein: 0, fat: 0, carbs: 0 });

    // 7 kunlik o'rtacha
    const sevenDaysStats = history.slice(0, 50).reduce((acc, item) => { // Rough approx just taking recent items
        acc.calories += item.calories;
        acc.count += 1;
        return acc;
    }, { calories: 0, count: 0 });

    const avgCalories = sevenDaysStats.count > 0 ? Math.round(sevenDaysStats.calories / sevenDaysStats.count) : 0; // Per item approx, or better per day?
    // Let's do per day properly.
    const dailyTotals = history.reduce((acc, item) => {
        const date = item.log_date;
        acc[date] = (acc[date] || 0) + item.calories;
        return acc;
    }, {});
    const daysCount = Object.keys(dailyTotals).length;
    const totalCals = Object.values(dailyTotals).reduce((a, b) => a + b, 0);
    const dailyAvg = daysCount > 0 ? Math.round(totalCals / daysCount) : 0;


    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Bugungi Xulosa */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-medium opacity-90 mb-1">{t('todaysBalance') || "Bugungi natija"}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold">{Math.round(todayStats.calories)}</span>
                        <span className="text-lg opacity-80">kcal</span>
                    </div>
                    <p className="text-sm opacity-80 mt-2">{t('keepItUp') || "Ajoyib natija, davom eting!"}</p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                    <Activity size={150} />
                </div>
            </div>

            {/* Oddiy Makronutrientlar (Progress bars) */}
            <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-100">{t('nutrients') || "Ozuqaviy qiymatlar"} (Bugun)</h3>

                <div className="space-y-6">
                    {/* Protein */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('protein')}</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{todayStats.protein.toFixed(1)}g</span>
                        </div>
                        <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-3">
                            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div> {/* Static width for visual, dynamic would need a goal */}
                        </div>
                    </div>

                    {/* Fat */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{t('fat')}</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{todayStats.fat.toFixed(1)}g</span>
                        </div>
                        <div className="w-full bg-yellow-100 dark:bg-yellow-900/30 rounded-full h-3">
                            <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                    </div>

                    {/* Carbs */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{t('carbs')}</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{todayStats.carbs.toFixed(1)}g</span>
                        </div>
                        <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-3">
                            <div className="bg-purple-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kunlik O'rtacha */}
            <div className="bg-gray-50 dark:bg-[#27272a] p-5 rounded-2xl flex items-center justify-between">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{t('avgDaily') || "Kunlik o'rtacha"}</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{dailyAvg} kcal</p>
                </div>
                <div className="p-3 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm">
                    <TrendingUp className="text-green-500" />
                </div>
            </div>
        </div>
    );
};

export default StatsChart;
