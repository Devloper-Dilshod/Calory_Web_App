import axios from 'axios';


const isDevelopment = import.meta.env.MODE === 'development';


const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (isDevelopment
        ? 'http://localhost/Calory_Web_app/backend/api/'
        : 'https://dilshodsayfiddinov12.alwaysdata.net/calory-app/');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for standardized responses
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorData = error.response?.data || { message: 'Tarmoq xatosi yuz berdi' };
        console.error('API Error:', errorData);
        return Promise.reject(errorData);
    }
);

export const authAPI = {
    login: (username, password) => api.post('auth.php', { action: 'login', username, password }),
    register: (username, password) => api.post('auth.php', { action: 'register', username, password }),
    changePassword: (data) => api.post('auth.php', { action: 'change_password', ...data }),
    getUser: (user_id) => api.post('auth.php', { action: 'get_user', user_id }),
};

export const calcAPI = {
    calculate: (prompt, imageData, language = 'uz') =>
        api.post('calculate.php', { prompt, image_data: imageData, language }),
};

export const dataAPI = {
    saveEntry: (data) => api.post('data.php', { action: 'save_entry', ...data }),
    getHistory: (user_id) => api.post('data.php', { action: 'get_history', user_id }),
    clearHistory: (user_id) => api.post('data.php', { action: 'clear_history', user_id }),
};

export default api;
