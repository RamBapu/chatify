# 💬 Chatify — Real-Time Chat Application (MERN Stack)

![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Express](https://img.shields.io/badge/Express-Backend-black?logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green?logo=node.js)
![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-black?logo=socketdotio)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Cloudinary](https://img.shields.io/badge/Image-Cloudinary-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

> A full-stack **MERN (MongoDB, Express, React, Node.js)** real-time chat application with secure authentication, live messaging, and a smooth user experience.

🔗 **Live App:** https://chatify-4z9c.onrender.com/

📦 **Repository:** https://github.com/RamBapu/chatify

🚀 **Deployed on:** Render

---

# 📌 Project Overview

**Chatify** is a modern real-time messaging application designed with performance, security, and scalability in mind.

It includes:

- 🔐 Secure authentication with JWT & cookies
- ⚡ Real-time messaging using Socket.io
- 🖼 Support for text & image messages
- 🟢 Live online user tracking
- 🤖 Bot protection & rate limiting
- 🎨 Smooth UI with skeleton loaders & sound effects

---

# 🧠 Key Features

## 🔐 Authentication & Security

- JWT-based authentication
- Cookies for secure session management
- Password hashing using bcrypt
- Protected routes via middleware
- Rate limiting & bot protection using Arcjet

## 👤 User Features

- Signup with welcome email (Resend)
- Upload profile picture via Cloudinary
- Add chat partners from contacts
- View real-time online/offline status

## 💬 Messaging

- Real-time chat using Socket.io
- Send:
  - ✉️ Text messages
  - 🖼 Image messages
- Instant updates without refresh

## ⚡ UX Enhancements

- Skeleton loaders for better UX
- Keyboard typing sound (toggle via local storage)
- Toast notifications
- Clean and responsive UI

---

# 🛠 Tech Stack

## Frontend

- React 19 (Vite)
- Tailwind CSS + DaisyUI
- Zustand (State Management)
- React Router
- Axios
- Socket.io Client
- React Hot Toast

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Arcjet
- Cloudinary
- Resend

---

# 🔍 Architecture Explanation

## 1️⃣ Frontend Layer

- Built with React + Vite
- Zustand stores:
  - `useAuthStore` → authentication state
  - `useChatStore` → chat state
- Custom hook:
  - `useKeyboardSound` for typing sound
- Handles socket connections & UI state

## 2️⃣ Backend Layer

- RESTful API structure
- Modular structure:
  - Controllers → business logic
  - Routes → endpoints
  - Middleware → auth & protection
- JWT stored in cookies for authentication

## 3️⃣ Real-Time Layer

- Socket.io enables:
  - Instant messaging
  - Online user tracking
  - Live updates

## 4️⃣ Database Layer

- MongoDB with Mongoose schemas
- Stores:
  - Users
  - Messages

---

# 📂 Project Structure

## Backend

```
backend/
│
├── src/routes        # API routes
├── src/controllers   # Business logic
├── src/models        # Database & schema
├── src/middleware    # Auth & security
├── src/lib           # Utilities
└── src/emails        # Email logic
```

## Frontend

```
frontend/
│
├── public
├── src/components   # UI components
├── src/hooks        # Custom hooks
├── src/lib          # Axios & utilities
├── src/pages        # Pages
└── src/store        # Zustand stores

```

---

# 🚀 Local Development

## 1️⃣ Clone Repository

```bash
git clone https://github.com/RamBapu/chatify.git
cd chatify
```

---

## 2️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env`:

```
PORT=3000
NODE_ENV=development

MONGODB_URI=

JWT_SECRET=

RESEND_API_KEY=
EMAIL_FROM=
EMAIL_FROM_NAME=

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

ARCJET_KEY=
ARCJET_ENV=

```

Run:

```bash
npm run dev
```

---

## 3️⃣ Setup Frontend

```
cd frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

Run:

```bash
npm run dev
```

---

# 👨‍💻 Author

**Ram Bapu**

Product Developer | Full stack Web Developer

GitHub: https://github.com/RamBapu
