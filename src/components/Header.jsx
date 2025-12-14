import { useAuth } from '../context/AuthContext';
import { Moon, Sun, UserCircle, LogOut, Bolt } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center mb-8">
            <Link to="/" className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Bolt className="text-yellow-500 w-8 h-8" /> Calory Web App
            </Link>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1f1f1f] transition-colors"
                >
                    {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                </button>

                {user ? (
                    <>
                        <button
                            onClick={() => navigate('/profile')}
                            className="p-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors"
                        >
                            <UserCircle size={24} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300 hidden md:inline-flex items-center gap-2"
                        >
                            <LogOut size={16} /> Chiqish
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        Kirish
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
