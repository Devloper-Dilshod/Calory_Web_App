import { useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';

const AuthRequiredModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#181818] rounded-2xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <div className="text-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="text-green-600 dark:text-green-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Tizimga kirish talab etiladi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Natijalarni hisoblash va tarixni saqlash uchun avval tizimga kiring yoki ro'yxatdan o'ting.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300 shadow-lg shadow-green-500/30"
                    >
                        Kirish
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="w-full bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors duration-300"
                    >
                        Ro'yxatdan o'tish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredModal;
