# 🍎 Calory Web App

Sun'iy intellekt yordamida taomlar kaloriyasini va ozuqaviy qiymatini hisoblovchi zamonaviy veb-ilova.

## 📸 Skrinshotlar

<div align="center">
  <img src="public/screenshots/home.png" width="400" alt="Bosh sahifa">
  <img src="public/screenshots/calculate.png" width="400" alt="Hisoblash">
  <br>
  <img src="public/screenshots/stats.png" width="400" alt="Statistika">
  <img src="public/screenshots/history.png" width="400" alt="Tarix">
</div>

---

## ✨ Imkoniyatlar

- **🤖 AI Tahlil**: Rasm yoki matn orqali taom tarkibini (kaloriya, oqsil, yog', uglevod) aniqlash.
- **🔐 Shaxsiy Kabinet**: Ro'yxatdan o'tish va ma'lumotlarni xavfsiz saqlash.
- **📊 Kunlik Statistika**: Iste'mol qilingan ozuqalarni diagrammalar orqali kuzatish.
- **🌐 Ko'p tillilik**: O'zbek, Rus va Ingliz tillarini to'liq qo'llab-quvvatlaydi.
- **🌙 Tungi Rejim**: Qorong'u muhitda foydalanish uchun qulay interfeys.

---

## 🏗️ Arxitektura

Loyiha quyidagi texnologiyalar asosida qurilgan:

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axi
os.
- **Backend**: PHP 7.4+ (REST API).
- **Ma'lumotlar bazasi**: JSON (NoSQL formatida).
- **AI**: OpenRouter (Nova 2 Lite modeli).

Batafsil ma'lumot: [architecture.txt](public/architecture.txt)

---

## 🚀 O'rnatish va Ishga tushirish

### 1. Backend (PHP)
- Loyihani PHP serverga (masalan, `C:\xampp\htdocs\`) joylashtiring.
- `backend/api/config.php` fayliga OpenRouter API kalitini kiriting.
- `backend/db/` papkasiga yozish huquqini bering.

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 3. API Sozlamasi
- `frontend/src/services/api.js` faylida `API_BASE_URL` serveringizga mosligini tekshiring.

---

## 📂 Loyiha Tuzilishi

```text
├── backend/
│   ├── api/          # API endpointlari
│   └── db/           # JSON ma'lumotlar bazasi
├── frontend/
│   ├── src/          # React manba kodi
│   └── public/       # Statik fayllar va rasmlar
└── README.md
```

---
*Dilshod Sayfiddinov tomonidan yaratilgan*
  
