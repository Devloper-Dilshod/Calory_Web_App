# 🍎 Calory Web App — AI Ozuqa Nazorati

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Calory Web App** — bu sun'iy intellekt (AI) yordamida taomlar kaloriyasini va ozuqaviy qiymatini hisoblovchi zamonaviy platforma. Foydalanuvchilar taom rasmini yuklash yoki matnli tavsif kiritish orqali bir necha soniya ichida oqsillar, yog'lar va uglevodlar haqida to'liq ma'lumot olishlari mumkin.

---

## ✨ Imkoniyatlar

- **🤖 AI Tahlil**: Rasm yoki matn orqali taom tarkibini aniqlash.
- **🔐 Xavfsiz tizim**: Foydalanuvchi bo'lib ro'yxatdan o'tish va parollarni xavfsiz saqlash.
- **📊 Statistika**: Kunlik iste'mol qilingan kaloriyalarni diagrammalar yordamida kuzatish.
- **📜 Tarix**: Barcha yozuvlarni shaxsiy arxivda saqlash.
- **🌐 Ko'p tillilik**: O'zbek, Rus va Ingliz tillarini to'liq qo'llab-quvvatlaydi.
- **🌙 Tungi rejim (Dark Mode)**: Ko'zga qulay qorong'u interfeys.
- **📱 Responsiv dizayn**: Mobil qurilmalar va kompyuterlar uchun moslashgan.

---

## 🏗️ Arxitektura (To'liq ma'lumot)

Loyiha modulli va kengaytiriladigan "Mijoz-Server" modelida qurilgan:

### 1. Frontend (Mijoz qismi)
React va Vite yordamida yig'ilgan bo'lib, yuqori tezlikni ta'minlaydi. 
- **Stillashtirish**: Tailwind CSS orqali zamonaviy dizayn.
- **Animatsiyalar**: Framer Motion yordamida silliq o'tishlar.
- **API Aloqa**: Axios orqali Backend bilan bog'lanish.

### 2. Backend (Server qismi)
Yengil va tezkor PHP API yordamida ishlaydi.
- **Markazlashgan konfiguratsiya**: `api/config.php` orqali barcha sozlamalar boshqariladi.
- **Xavfsiz CORS**: Faqat ruxsat etilgan so'rovlarni qabul qiladi.

### 3. Ma'lumotlar bazasi (Storage)
Loyiha ko'chuvchanligini ta'minlash uchun **JSON NoSQL** tizimidan foydalanilgan.
- `/backend/db/users.json` — Foydalanuvchilar bazasi.
- `/backend/db/history.json` — Ovqatlanish kundaligi.

### 4. Sun'iy Intellekt
**OpenRouter (Nova 2 Lite)** modeli orqali taomlarni tahlil qiladi. Yuqori aniqlik va tezkor javob berish imkoniyatiga ega.

---

## 📂 Loyiha tuzilishi

```text
├── backend/
│   ├── api/          # PHP API (Auth, Calculate, Data)
│   ├── db/           # JSON bazalar (users.json, history.json)
│   └── .htaccess     # Xavfsizlik sozlamalari
├── frontend/
│   ├── src/
│   │   ├── components/ # Foydalanuvchi interfeysi elementlari
│   │   ├── pages/      # Asosiy sahifalar (Home, Profile, Login)
│   │   ├── services/   # API bilan ishlash (Axios instance)
│   │   └── utils/      # Tarjimalar va yordamchi funksiyalar
│   └── public/       # Statik fayllar va rasmlar
└── architecture.txt  # Loyihaning to'liq texnik tavsifi
```

---

## 🚀 Ishga tushirish (Installation)

### Kerakli texnologiyalar:
- **Node.js** (v16 yoki undan yuqori)
- **PHP** (v7.4 yoki undan yuqori) yoki **XAMPP/WAMP**

### 1. Loyihani yuklab olish
```bash
git clone https://github.com/Devloper-Dilshod/Calory_Web_App.git
cd Calory_Web_app
```

### 2. Backendni sozlash
- Loyihani PHP serveringizga (masalan, `C:\xampp\htdocs\`) joylashtiring.
- `backend/api/config.php` faylida o'z OpenRouter API kalitingizni kiriting.
- `backend/db/` papkasiga yozish (write) huquqi borligini tekshiring.

### 3. Frontendni sozlash
```bash
cd frontend
npm install   # Kerakli kutubxonalarni o'rnatish
npm run dev   # Loyihani ishga tushirish
```

### 4. API manzili
- `frontend/src/services/api.js` faylini oching va `API_BASE_URL` qismida o'zingizning backend manzilingizni tekshiring.

---

## 🛠️ Texnologiyalar to'plami

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Chart.js.
- **Backend**: PHP 7.4+ core API.
- **AI Integration**: OpenRouter API.

---


---
* Dilshod Sayfiddinov tomonidan  yaratilgan*
