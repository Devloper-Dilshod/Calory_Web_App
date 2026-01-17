# 🍎 Calory Web App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Calory Web App** is an AI-powered nutrition tracking platform that allows users to calculate calories and macronutrients from food images or text descriptions. Built with a focus on speed, simplicity, and cross-platform accessibility.

---

## ✨ Features

- **🤖 AI Food Analysis**: Instant calorie and nutrient estimation from photos or text.
- **🔐 Secure Auth**: User registration and login with hashed passwords.
- **📊 Detailed Statistics**: Visual charts and graphs for daily nutritional intake.
- **📜 History Tracking**: Keep a log of everything you eat.
- **🌐 Multi-language**: Full support for **Uzbek**, **Russian**, and **English**.
- **🌙 Dark Mode**: Premium dark UI for better nighttime usage.
- **⚡ Responsive**: Optimized for both mobile and desktop screens.

---

## 🏗️ Architecture

The app follows a modern client-server architecture:

- **Frontend**: React application built with Vite, utilizing Tailwind CSS for styling and Framer Motion for smooth animations.
- **Backend**: Lightweight PHP REST API serving as a bridge between the frontend and AI services.
- **Database**: NoSQL-style JSON storage (`backend/db/`) for high portability and zero-config deployment.
- **AI Engine**: OpenRouter (Nova 2 Lite) for high-accuracy food recognition.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **PHP** (v7.4+) or **XAMPP/WAMP/MAMP**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Calory_Web_app.git
   cd Calory_Web_app
   ```

2. **Backend Setup**:
   - Move the project folder to your web server root (e.g., `C:\xampp\htdocs\`).
   - Ensure `backend/db/` is writable by the server.
   - Configure `backend/api/config.php` with your OpenRouter API key.

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Configuration**:
   - Update `frontend/src/services/api.js` with your backend URL.

---

## 📂 Project Structure

```text
├── backend/
│   ├── api/          # PHP API Endpoints (Auth, Calculate, Data)
│   └── db/           # JSON Storage (users.json, history.json)
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Main application views
│   │   ├── services/   # Axios API service
│   │   └── utils/      # Translations & Helpers
│   └── public/       # Static assets
└── architecture.txt  # Detailed architecture documentation
```

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Chart.js, Axios.
- **Backend**: PHP, JSON.
- **AI**: OpenRouter (amazon/nova-2-lite-v1).

---

## 📄 License
This project is open-source and available under the MIT License.

---
*Developed with ❤️ by [Your Name/Team]*
