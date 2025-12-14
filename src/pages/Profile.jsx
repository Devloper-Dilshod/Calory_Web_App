import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { UserCircle, LogOut, Key, X, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, updatePassword } = useAuth();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    
    // Parol ko'rinish holatlari
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    if (!user) {
        navigate('/login');
        return null;
    }

    // Tizimdan chiqish va login sahifasiga o'tish
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Parolni o'zgartirish formasini yuborish
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (newPassword.length < 6) {
            setMessage({ text: 'Yangi parol kamida 6 belgidan iborat bo\'lishi kerak.', type: 'error' });
            return;
        }

        setLoading(true);
        const result = await updatePassword(currentPassword, newPassword);
        setLoading(false);

        if (result.success) {
            setMessage({ text: result.message, type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10 bg-white dark:bg-[#121212] p-8 rounded-2xl shadow-modern transition-all duration-300 hover:shadow-2xl relative animate-fadeIn">
                {/* Orqaga qaytish (yopish) tugmasi */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    title="Orqaga"
                >
                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <UserCircle className="text-green-500" /> Profil
                    </h2>
                </div>

                <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1f1f1f] rounded-xl transform transition hover:scale-[1.02] duration-200">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Foydalanuvchi: <span className="font-bold text-green-500">{user.username}</span>
                    </p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <Key size={18} /> Parolni almashtirish
                    </h4>

                    {message.text && (
                        <div className={`p-3 rounded-lg text-sm animate-pulse ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Joriy parol"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 focus:shadow-md"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Yangi parol (min 6 belgi)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-[#1f1f1f] dark:text-gray-200 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 focus:shadow-md"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg"
                    >
                        {loading ? 'Yangilanmoqda...' : 'Parolni Yangilash'}
                    </button>
                </form>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <LogOut size={20} /> Chiqish
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
