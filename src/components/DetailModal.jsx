import { X } from 'lucide-react';

const DetailModal = ({ isOpen, onClose, item }) => {
    if (!isOpen || !item) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#121212] rounded-xl shadow-2xl p-6 w-full max-w-md transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{item.food_name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between border-b dark:border-gray-700 pb-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Sana:</span>
                        <span className="font-bold text-green-500 dark:text-green-400">{formatDate(item.log_date)}</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-gray-700 pb-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Kaloriyalar:</span>
                        <span className="font-bold text-green-500 dark:text-green-400">{item.calories.toFixed(0)} Kkal</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-gray-700 pb-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Protein:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{item.protein.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-gray-700 pb-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Yogʻ:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{item.fat.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between border-b dark:border-gray-700 pb-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Uglevod:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{item.carbs.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Kletchatka:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{(item.fiber || 0).toFixed(1)}g</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
