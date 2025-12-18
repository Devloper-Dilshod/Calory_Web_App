import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Bolt, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Parol ko'rinish holati
    const [showPassword, setShowPassword] = useState(false);

    // Kirish formasini yuborish va xatolarni tekshirish
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        const result = await login(username, password);
        if (result.success) {
            setMessage({ text: result.message, type: 'success' });
            setTimeout(() => navigate('/'), 1000);
        } else {
            // Agar server error code qaytarsa, tarjimadan foydalanamiz, aks holda server xabarini chiqaramiz
            const errorMsg = result.error_code ? t(result.error_code) : result.message;
            setMessage({ text: errorMsg, type: 'error' });
        }
    };
    // Login formasi
    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10 bg-white dark:bg-[#121212] p-8 rounded-2xl shadow-modern transition-all duration-300 hover:shadow-2xl animate-fadeIn">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                        <Bolt className="text-yellow-500 animate-bounce-slow" /> {t('login')}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{t('welcome')}</p>
                </div>

                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-sm animate-pulse ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">{t('username')}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 focus:shadow-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">{t('password')}</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 focus:shadow-md"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg"
                    >
                        {t('login')}
                    </button>
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        {t('noAccount')} <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold transition-colors">{t('register')}</Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
