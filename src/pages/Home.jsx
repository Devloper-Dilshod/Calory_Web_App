import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import HistoryList from '../components/HistoryList';
import StatsChart from '../components/StatsChart';
import AuthRequiredModal from '../components/AuthRequiredModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { calcAPI, dataAPI } from '../services/api';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
// Home sahifasidagi componentlar
const Home = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();
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
            setError(t('errorInput'));
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

            const response = await calcAPI.calculate(input, imageData, language);

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
                setError(response.error || t('calcError'));
            }

        } catch (err) {
            setError(err.message || t('serverError'));
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

    // Auto-submit when image is selected
    useEffect(() => {
        if (selectedImage && imagePreview) {
            handleCalculate();
        }
    }, [imagePreview]); // Trigger when preview is ready

    // ...

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
                title={t('clearHistory')}
                message={t('clearHistoryConfirm')}
            />

            <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-modern p-6 mb-8 transition-colors duration-300">
                <div className="flex flex-col gap-6">
                    {/* Text Input Section */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                            placeholder={t('searchPlaceholder')}
                            className="flex-grow p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
                        />
                        <button
                            onClick={handleCalculate}
                            disabled={loading || !input.trim()}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Divider 'YOKI' */}
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider text-sm">{t('or')}</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                    </div>

                    {/* Image Upload Section */}
                    <label className={clsx(
                        "relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group min-h-[160px]",
                        imagePreview
                            ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                            : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:border-green-400"
                    )}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            {imagePreview ? (
                                <div className="relative">
                                    <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg shadow-md" />
                                    {loading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <ImageIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">{t('uploadText')}</span> {t('cameraText')}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{t('formats')}</p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={loading}
                        />
                    </label>
                </div>

                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                {!user && <p className="text-yellow-600 text-xs mt-2">{t('saveWarning')}</p>}
            </div>

            <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-modern p-6 transition-colors duration-300">
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
                    <button
                        onClick={() => handleTabChange('result')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap", activeTab === 'result' ? "border-green-500 text-green-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        {t('result')}
                    </button>
                    <button
                        onClick={() => handleTabChange('history')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap", activeTab === 'history' ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        {t('history')}
                    </button>
                    <button
                        onClick={() => handleTabChange('stats')}
                        className={clsx("px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap", activeTab === 'stats' ? "border-purple-500 text-purple-500" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                    >
                        {t('stats')}
                    </button>
                </div>

                <div className="min-h-[300px]">
                    {activeTab === 'result' && (
                        loading ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Loader2 className="animate-spin text-green-500 h-10 w-10 mb-4" />
                                <p>{t('calculating')}</p>
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
