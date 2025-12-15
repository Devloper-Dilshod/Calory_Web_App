import axios from 'axios';

// Change this URL to match your AlwaysData or Local PHP server URL
// For local development with XAMPP:
const API_BASE_URL = 'http://dilshodsayfiddinov12.alwaysdata.net/calory-app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        // PHP API returns { success: true, ... } or { success: false, message: ... }
        // Sometimes it just returns the data. 
        // We standardized it to return { success: true/false, ... } in our PHP updates.
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
