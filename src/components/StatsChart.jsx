import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BarChart3, PieChart, Activity, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const StatsChart = ({ history }) => {
    const { t, language } = useLanguage();

    if (!history || history.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-10 w-full animate-fadeIn">{t('noStats')}</p>;
    }

    // --- Data Processing ---
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // 1. Last 7 Days Calories (Bar Chart)
    const dailyTotals = history.reduce((acc, item) => {
        const date = item.log_date;
        acc[date] = (acc[date] || 0) + item.calories;
        return acc;
    }, {});

    const last7DaysLabels = [];
    const last7DaysData = [];

    const locale = language === 'ru' ? 'ru-RU' : (language === 'en' ? 'en-US' : 'uz-UZ');

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const displayDate = d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });

        last7DaysLabels.push(displayDate);
        last7DaysData.push(dailyTotals[dateStr] || 0);
    }

    const barData = {
        labels: last7DaysLabels,
        datasets: [
            {
                label: t('calories'),
                data: last7DaysData,
                backgroundColor: 'rgba(34, 197, 94, 0.8)', // green-500
                hoverBackgroundColor: 'rgba(34, 197, 94, 1)',
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => context.raw + ' ' + t('unitKcal')
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(200, 200, 200, 0.1)' },
                ticks: { color: '#9ca3af' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#9ca3af' }
            }
        },
        maintainAspectRatio: false,
        animation: { duration: 2000, easing: 'easeOutQuart' }
    };

    // 2. Today's Macros (Doughnut Chart)
    const todaysItems = history.filter(item => item.log_date === todayStr);
    const todayMacros = todaysItems.reduce((acc, item) => ({
        protein: acc.protein + item.protein,
        fat: acc.fat + item.fat,
        carbs: acc.carbs + item.carbs,
        calories: acc.calories + item.calories
    }), { protein: 0, fat: 0, carbs: 0, calories: 0 });

    const showDoughnut = todayMacros.calories > 0;

    const doughnutData = {
        labels: [t('protein'), t('fat'), t('carbs')],
        datasets: [
            {
                data: [todayMacros.protein, todayMacros.fat, todayMacros.carbs],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // blue
                    'rgba(234, 179, 8, 0.8)',  // yellow
                    'rgba(168, 85, 247, 0.8)', // purple
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(168, 85, 247, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#9ca3af' } },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.raw.toFixed(1)}g`
                }
            }
        },
        cutout: '70%',
        maintainAspectRatio: false,
        animation: { animateScale: true, animateRotate: true }
    };

    // 3. Averages (30 Days) calculation remains similar
    const thirtyDaysHistory = history.filter(item => {
        const itemDate = new Date(item.log_date);
        const diffTime = Math.abs(today - itemDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    });

    let avgStats = { protein: 0, fat: 0, carbs: 0 };
    if (thirtyDaysHistory.length > 0) {
        const uniqueDays = new Set(thirtyDaysHistory.map(item => item.log_date)).size;
        ['protein', 'fat', 'carbs'].forEach(key => {
            const total = thirtyDaysHistory.reduce((sum, item) => sum + item[key], 0);
            avgStats[key] = uniqueDays ? (total / uniqueDays).toFixed(1) : 0;
        });
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Row: Today's Overview & Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual 1: Doughnut Chart (Today) */}
                <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2 w-full">
                        <PieChart size={20} className="text-purple-500" /> {t('todaysBalance')}
                    </h3>
                    <div className="h-64 w-full relative flex items-center justify-center">
                        {showDoughnut ? (
                            <>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{Math.round(todayMacros.calories)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('unitKcal')}</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400 text-sm text-center">{t('noDataToday')}</p>
                        )}
                    </div>
                </div>

                {/* Visual 2: Weekly Bar Chart */}
                <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <BarChart3 size={20} className="text-green-500" /> {t('sevenDaysDynamics')}
                    </h3>
                    <div className="h-64 w-full">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>

            {/* Bottom Row: 30-Day Averages Cards */}
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-500" /> {t('avgDaily')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('protein')}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{avgStats.protein}g</p>
                        </div>
                        <Activity size={24} className="text-blue-100 dark:text-blue-900" />
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('fat')}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{avgStats.fat}g</p>
                        </div>
                        <Activity size={24} className="text-yellow-100 dark:text-yellow-900" />
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm border-l-4 border-purple-500 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('carbs')}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{avgStats.carbs}g</p>
                        </div>
                        <Activity size={24} className="text-purple-100 dark:text-purple-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsChart;
