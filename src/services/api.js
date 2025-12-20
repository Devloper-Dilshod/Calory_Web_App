import axios from 'axios';


// Server URL manzilini o'zgartirish (AlwaysData yoki mahalliy server uchun)
const API_BASE_URL = 'https://dilshodsayfiddinov12.alwaysdata.net/calory-app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        // API javoblarini qabul qilish va ularni standartlashtirish
        return response.data;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (username, password) => api.post('auth.php', { action: 'login', username, password }),
    register: (username, password) => api.post('auth.php', { action: 'register', username, password }),
    changePassword: (data) => api.post('auth.php', { action: 'change_password', ...data }),
    getUser: (user_id) => api.post('auth.php', { action: 'get_user', user_id }),
};

export const calcAPI = {
    calculate: (prompt, imageData, language = 'uz') => api.post('calculate.php', { prompt, image_data: imageData, language }),
};

export const dataAPI = {
    saveEntry: (data) => api.post('data.php', { action: 'save_entry', ...data }),
    getHistory: (user_id) => api.post('data.php', { action: 'get_history', user_id }),
    clearHistory: (user_id) => api.post('data.php', { action: 'clear_history', user_id }),
};

export default api;
