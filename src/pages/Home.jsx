import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import HistoryList from '../components/HistoryList';
import StatsChart from '../components/StatsChart';
import AuthRequiredModal from '../components/AuthRequiredModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { calcAPI, dataAPI } from '../services/api';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('result');
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Modals
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // Load history when tab changes or user logs in
    useEffect(() => {
        if (activeTab !== 'result' && user) {
            loadHistory();
        }
    }, [activeTab, user]);

    const loadHistory = async () => {
        if (!user) return;
        setLoadingHistory(true);
        try {
            const data = await dataAPI.getHistory(user.id);
            if (data.success) {
                setHistory(data.history || []);
            }
        } catch (err) {
            console.error("History load error", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCalculate = async () => {
        if (!user) {
            setAuthModalOpen(true);
            return;
        }
        if (!input.trim() && !selectedImage) {
            setError("Iltimos, taom nomini kiriting yoki rasm yuklang.");
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Prepare image data if any
            let imageData = null;
            if (selectedImage && imagePreview) {
                imageData = imagePreview; // sending base64
            }

            const response = await calcAPI.calculate(input, imageData);

            if (response.success && response.text) {
                const parsedResult = JSON.parse(response.text);
                setResult(parsedResult);

                // Save if logged in (user is guaranteed here by check above)
                if (user) {
                    await dataAPI.saveEntry({
                        user_id: user.id,
                        food_name: parsedResult.food_name,
                        calories: parsedResult.calories,
                        protein: parsedResult.protein,
                        fat: parsedResult.fat,
                        carbs: parsedResult.carbs,
                        fiber: parsedResult.fiber || 0
                    });
                    // Refresh history in background
                    loadHistory();
                }

                setInput('');
                setSelectedImage(null);
                setImagePreview(null);
            } else {
                setError(response.error || "Hisoblashda xatolik.");
            }

        } catch (err) {
            setError(err.message || "Server xatosi.");
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        if (tab !== 'result' && !user) {
            setAuthModalOpen(true);
            return;
        }
        setActiveTab(tab);
    };

    const handleClearHistoryClick = () => {
        setDeleteModalOpen(true);
    };

    const confirmClearHistory = async () => {
        setDeleteModalOpen(false);
        try {
            await dataAPI.clearHistory(user.id);
            setHistory([]);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Layout>
            <AuthRequiredModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
            />

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmClearHistory}
                title="Tarixni tozalash"
                message="Haqiqatan ham barcha tarixiy ma'lumotlarni o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
            />

            <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-modern p-6 mb-8 transition-colors duration-300">
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Taom nomini yozing (masalan, 100g osh)"
                        className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-green-500 focus:border-green-500"
                    />

                    <label className={clsx(
                        "flex-shrink-0 flex items-center justify-center w-full md:w-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 min-h-[50px]",
                        imagePreview ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                    )}>
                        <div className="text-center p-2 relative overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-8 w-8 object-cover mx-auto rounded-full" />
                            ) : (
                                <ImageIcon className="text-xl text-green-500 mx-auto mb-1" />
                            )}
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                                {selectedImage ? 'Rasm tanlandi' : 'Rasm yuklang'}
                            </p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>

                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center min-w-[120px]"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2" />}
                        Hisoblash
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                {!user && <p className="text-yellow-600 text-xs mt-2">Natijalarni saqlash uchun tizimga kiring.</p>}
            </div>

            <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-modern p-6 transition-colors duration-300">
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                        onClick={() => handleTabChange('result')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2", activeTab === 'result' ? "border-green-500 text-green-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        Natija
                    </button>
                    <button
                        onClick={() => handleTabChange('history')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2", activeTab === 'history' ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        Tarix
                    </button>
                    <button
                        onClick={() => handleTabChange('stats')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2", activeTab === 'stats' ? "border-purple-500 text-purple-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        Statistika
                    </button>
                </div>

                <div className="min-h-[300px]">
                    {activeTab === 'result' && (
                        loading ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Loader2 className="animate-spin text-green-500 h-10 w-10 mb-4" />
                                <p>Hisoblanmoqda...</p>
                            </div>
                        ) : (
                            <ResultCard result={result} />
                        )
                    )}

                    {activeTab === 'history' && (
                        loadingHistory ? (
                            <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
                        ) : (
                            <HistoryList history={history} onClear={handleClearHistoryClick} />
                        )
                    )}

                    {activeTab === 'stats' && (
                        loadingHistory ? (
                            <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
                        ) : (
                            <StatsChart history={history} />
                        )
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
