# Calory Web App (React + PHP Version)

This project is a calorie tracking application that uses AI to analyze food images/text and store calorie data.

## Architecture

The project is split into two parts:

### 1. Frontend (React + Vite)
- Located in the `frontend/` directory.
- Built with React, Tailwind CSS, and Axios.
- Handles UI, user authentication, and data visualization.

### 2. Backend (PHP)
- Located in the `backend/` directory.
- Simple PHP API (`api/`) using JSON files (`db/`) for storage.
- Designed to be deployed on shared hosting (like AlwaysData, XAMPP).

## Installation & Running Locally

### Prerequisites
- Node.js (for Frontend)
- PHP / XAMPP (for Backend)

### Step 1: Backend Setup
1. Ensure XAMPP is running (Apache).
2. The project should be in `c:\xampp\htdocs`.
3. The backend API is accessible at `http://localhost/Calory%20Web%20App%20-%20Copy/backend/api/`.

### Step 2: Frontend Setup
1. Open a terminal in `frontend/`:
   ```sh
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser at the URL shown (usually `http://localhost:5173`).

## Deployment

### Frontend (Vercel)
- Deploy the `frontend` folder to Vercel.
- Build command: `npm run build`
- Output directory: `dist`

### Backend (AlwaysData or similar)
- Upload the `backend` folder to your PHP hosting.
- Update `frontend/src/services/api.js` with your production API URL.

## Features
- **AI-Powered Calculation**: Text or Image based calorie estimation.
- **User System**: Register and Login.
- **Dark Mode**: Fully supported.
- **Statistics**: Charts and daily breakdown.

## Demo

https://calory-web-app.vercel.app/