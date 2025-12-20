import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    // Fetch fresh data from server
                    try {
                        const data = await authAPI.getUser(parsedUser.id);
                        if (data.success) {
                            setUser(data.user);
                            localStorage.setItem('user', JSON.stringify(data.user));
                        }
                    } catch (serverError) {
                        console.error("Failed to fetch fresh user data", serverError);
                        // If 404, maybe logout? For now, keep local data but maybe mark as unverified?
                        // Let's safe fail and keep using local data.
                    }

                } catch (e) {
                    console.error("Failed to parse user from local storage", e);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const data = await authAPI.login(username, password);
            if (data.success) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message, error_code: data.error_code };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed',
                error_code: error.error_code
            };
        }
    };

    const register = async (username, password) => {
        try {
            const data = await authAPI.register(username, password);
            if (data.success) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message, error_code: data.error_code };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Registration failed',
                error_code: error.error_code
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updatePassword = async (currentPassword, newPassword) => {
        if (!user) return { success: false, message: "Not logged in" };
        try {
            const data = await authAPI.changePassword({
                user_id: user.id,
                current_password: currentPassword,
                new_password: newPassword
            });
            return data;
        } catch (error) {
            return {
                success: false,
                message: error.message,
                error_code: error.error_code
            };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updatePassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
