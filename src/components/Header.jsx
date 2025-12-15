import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Moon, Sun, UserCircle, LogOut, Bolt, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleLanguage = () => {
        const langs = ['uz', 'ru', 'en'];
        const currentIndex = langs.indexOf(language);
        const nextIndex = (currentIndex + 1) % langs.length;
        setLanguage(langs[nextIndex]);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center mb-8 gap-4">
            <Link to="/" className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Bolt className="text-yellow-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="hidden xs:inline">{t('appName')}</span>
                <span className="xs:hidden">Calory</span>
            </Link>
            <div className="flex items-center gap-2 md:gap-3">
                <button
                    onClick={toggleLanguage}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1f1f1f] transition-colors flex items-center gap-1"
                    title="Change Language"
                >
                    <Globe size={20} className="md:w-6 md:h-6" />
                    <span className="text-sm font-bold uppercase">{language}</span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1f1f1f] transition-colors"
                >
                    {darkMode ? <Moon size={20} className="md:w-6 md:h-6" /> : <Sun size={20} className="md:w-6 md:h-6" />}
                </button>

                {user ? (
                    <>
                        <button
                            onClick={() => navigate('/profile')}
                            className="p-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors"
                        >
                            <UserCircle size={20} className="md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors duration-300 hidden md:inline-flex items-center gap-2"
                        >
                            <LogOut size={16} /> {t('logout')}
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors duration-300 whitespace-nowrap"
                    >
                        {t('login')}
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
