
# 🌐 SecJaf — Language Exchange Tutor Booking Platform

**SecJaf** is a modern, user-friendly platform that connects users with tutors for various languages in a friendly learning environment. The project allows users to browse, review, and book language tutors online.

🔗 **Live Site**: [SecJaf Live](https://language-exchange-app-dde7b.web.app/)   

---

## 📖 Project Description

SecJaf enables users to:
- 🔐 Register/login via email or Google
- 🔒 Access private routes with JWT-protected authentication
- 🌍 Explore tutor categories and filter by language
- 🧑‍🏫 Add, update, or delete tutorials
- 📘 Book tutors and leave reviews
- 🌗 Switch between dark and light themes
- 📱 Enjoy full responsiveness on all devices

---

## 🚀 Features

- ✅ Firebase Authentication with Google Login
- 🔒 JWT-secured private routes
- 💬 Review system with MongoDB `$inc` operator
- ✍️ Tutorial management (add, update, delete)
- 📚 Dynamic filtering by language categories
- 🎯 Protected routes with token verification
- 🌈 Dark/Light theme toggle
- 📊 Statistics dashboard with dynamic data
- 📦 Deployment: Client (Netlify), Server (Vercel/Render)

---

## 🧰 Technologies & Packages

### 💻 Client Side (React + Vite)

| 📦 Package | 🔍 Purpose |
|-----------|------------|
| ⚛️ `react`, `react-dom` | Core React libraries |
| 🧭 `react-router` | Routing functionality |
| 🔐 `firebase` | Auth, storage, and hosting |
| 🔔 `react-hot-toast` | Toast notification system |
| 🌀 `framer-motion` | Animation and transitions |
| 🧠 `react-helmet-async` | Dynamic document head |
| 🎡 `react-slick`, `slick-carousel` | Carousel for banner |
| 🪄 `lucide-react` | Modern SVG icons |
| 🎨 `tailwindcss` | Utility-first CSS framework |
| 🌸 `daisyui` | Styled components built on Tailwind |

---

### 🛠️ Client Dev Dependencies

| 📦 Package | 🔍 Purpose |
|-----------|------------|
| 🚀 `vite` | Build tool and dev server |
| 🛠️ `@vitejs/plugin-react` | React plugin for Vite |
| 🧹 `eslint`, `@eslint/js` | Linting support |
| 🔁 `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | Hook and HMR lint rules |
| 🌐 `globals` | Global variables for linting |
| 📚 `@types/react`, `@types/react-dom` | TypeScript definitions (optional) |

---

### 🧪 Backend (Node.js + Express)

| 📦 Package | 🔍 Purpose |
|-----------|------------|
| 🧱 `express` | Web server framework |
| 🌍 `cors` | Cross-origin resource sharing |
| 🔐 `dotenv` | Load `.env` configs |
| 🔒 `jsonwebtoken` | JWT token creation & verification |
| 🧮 `mongodb` | Database connection & operations |
| 🔥 `firebase-admin` | Server-side Firebase token validation |

---

## 🛡️ Security & Environment

- 🔑 Firebase and MongoDB credentials are secured using `.env` files
- 🧾 JWT is used to protect API routes and authenticate users
- 🧪 Tokens are stored client-side and verified on protected endpoints

---

## 📊 Key UI Pages

- 🏠 **Home** – Banner, Stats, Categories, and custom sections  
- 🔍 **Find Tutors** – Filterable list of all tutors  
- 🧑‍🏫 **Tutor Details** – Book tutors (private route)  
- ✏️ **Add Tutorials** – Add new tutor services (private route)  
- 📚 **My Tutorials** – View, update, delete personal tutorials  
- 📖 **My Booked Tutors** – View all booked sessions and review  
- 🔑 **Login/Register** – Auth via email/password or Google  
- ❌ **Error Page** – Friendly 404/500 handling  
- 🌗 **Theme Toggle** – Dark/Light mode switcher in navbar  

---



## 📝 Author & License

**Author:** [Shammi Akther Sumi](https://github.com/Shammi-Akhter)  
📄 Licensed under ISC License

---
