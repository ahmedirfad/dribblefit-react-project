<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Bebas+Neue&size=72&pause=1000&color=22C55E&center=true&vCenter=true&width=600&height=100&lines=DRIBBLEFIT" alt="DribbleFit" />

### ⚽ The Ultimate Football Jersey E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-dribblefit.vercel.app-22C55E?style=for-the-badge&logoColor=white)](https://dribblefit.vercel.app)
[![Backend](https://img.shields.io/badge/🚀_API-Render-0F172A?style=for-the-badge)](https://dribblefit-project.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

<br/>

> *Browse. Customize. Checkout. Own the pitch.*

</div>

---

## 📸 Overview

**DribbleFit** is a full-stack e-commerce platform for football jerseys and merchandise — built with a modern tech stack, real payment integration, jersey customization, and a fully dynamic admin panel. Every section of the homepage, every product, every order — all managed in real time.

---

## ✨ Features

### 🛍️ Customer Experience
| Feature | Description |
|---|---|
| 🔍 **Browse & Search** | Filter by category, search by name/team with debounced queries |
| 🎨 **Jersey Customization** | Add player name, number (1–99), and patches in real time |
| 🛒 **Smart Cart** | Persists across sessions, syncs on login |
| 💳 **Dual Payments** | Cash on Delivery + Razorpay (signature-verified) |
| 📦 **Order Tracking** | Full status lifecycle — Pending → Delivered |
| ❤️ **Wishlist** | Save jerseys for later, persisted across sessions |
| 🔐 **OTP Auth** | Email-based OTP verification for secure signup |

### 🛠️ Admin Panel
| Feature | Description |
|---|---|
| 📊 **Dashboard** | Analytics overview of orders, users, and products |
| 🖼️ **Homepage Editor** | Toggle, edit, and upload images for 7 dynamic sections |
| 📦 **Order Management** | View all orders, update statuses, trigger email notifications |
| 👥 **User Management** | View all users and their roles |
| 🏷️ **Product Management** | Add, edit, and remove jersey listings |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────┐
│          USER BROWSER                   │
│    https://dribblefit.vercel.app        │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│        FRONTEND  (React + Vite)         │
│  Pages · Components · Contexts · Axios  │
└──────────────────┬──────────────────────┘
                   │  REST API
                   ▼
┌─────────────────────────────────────────┐
│       BACKEND  (Node.js + Express)      │
│  Controllers · Routes · Middleware      │
└────────┬──────────────┬────────────────-┘
         │              │              │
         ▼              ▼              ▼
   ┌──────────┐  ┌──────────┐  ┌──────────────┐
   │ MongoDB  │  │  Redis   │  │  Cloudinary  │
   │  Atlas   │  │  (OTPs)  │  │   (Images)   │
   └──────────┘  └──────────┘  └──────────────┘
```

---

## 🔐 Auth Flow

```
Register → Generate OTP → Store in Redis (10 min TTL) → Send via Email
    ↓
Verify OTP → Mark isVerified: true → Login
    ↓
JWT Token (30-day expiry) → Stored in localStorage → Sent as Bearer Token
```

**Role-based access:** `isAdmin` flag on the user document gates all admin routes via middleware.

---

## 💳 Payment Flow (Razorpay)

```
User clicks "Pay Now"
    → Backend creates Razorpay order
    → Razorpay checkout opens
    → User pays
    → Backend verifies signature (HMAC SHA256)
    → ✅ Order saved to DB only after verified
    → User redirected to success page
```

---

## 🗂️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, Context API |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Cache / OTP** | Redis (Upstash) |
| **Auth** | JWT |
| **Payments** | Razorpay |
| **Email** | Nodemailer (SMTP) |
| **Images** | Cloudinary CDN |
| **Deployment** | Vercel (FE) + Render (BE) |

---

## 🎨 Dynamic Homepage

The homepage has **7 fully editable sections**, all manageable from the admin panel — no code changes needed:

| # | Section | Editable Content |
|---|---|---|
| 1 | 🏷️ Sale Banner | Countdown, coupon code, message |
| 2 | 🖼️ Hero Banner | Heading, subheading, CTA, image |
| 3 | 🌍 International Kits | Promo text + image |
| 4 | 🔥 Best Sellers | Top 3 products auto-fetched |
| 5 | 💚 Passion Section | Motivational text + background |
| 6 | 📂 Promo Categories | 3 cards × 3 hover-cycling images |
| 7 | 🎥 Mexico De Oro | Video section with poster image |

> Each section has an **active/inactive toggle** — disable without deleting.

---

## 📁 Project Structure

```
dribblefit/
├── frontend/
│   ├── src/
│   │   ├── pages/         # Home, Cart, Checkout, Profile, Admin
│   │   ├── components/    # Navbar, ProductCard, etc.
│   │   ├── context/       # AuthContext, CartContext, WishlistContext
│   │   └── api/           # Axios API calls
│   └── vite.config.js
│
└── backend/
    ├── controllers/       # Business logic
    ├── routes/            # API endpoints
    ├── middleware/         # auth, admin, validation
    ├── models/            # Mongoose schemas
    └── utils/             # Email, JWT, Redis helpers
```

---

## ⚙️ Environment Variables

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=https://dribblefit-project.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_xxx
```

### Backend (`/backend/.env`)
```env
MONGODB_URI=mongodb+srv://...
REDIS_URL=rediss://...
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=rzp_xxx
RAZORPAY_KEY_SECRET=xxx
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
EMAIL_USER=xxx@gmail.com
EMAIL_PASSWORD=xxx
ADMIN_EMAIL=admin@example.com
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/dribblefit.git
cd dribblefit

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Start backend
cd ../backend && npm run dev

# Start frontend
cd ../frontend && npm run dev
```

> Make sure to configure your `.env` files before starting.

---

## 🔒 Security Highlights

- 🔑 Passwords hashed with **bcrypt** (10 rounds)
- 🛡️ JWT with **30-day expiry**
- ⏱️ OTPs expire in **10 minutes** (Redis TTL)
- ✅ **Razorpay signature verification** before order creation
- 🌐 **CORS** restricted to known origins
- 🚫 Sensitive keys **never committed** to Git

---

## 📊 Performance

- ⚡ **Vite** build with code splitting
- 🔍 **Debounced search** (500ms) to reduce API calls
- 🖼️ **Cloudinary CDN** for fast, optimized images (auto WebP)
- 📄 **Pagination** — 8 products per page
- 🎬 **Lazy video loading** via Intersection Observer
- 🔤 Google Fonts with `font-display: swap`

---

## 🚢 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [dribblefit.vercel.app](https://dribblefit.vercel.app) |
| Backend | Render | [dribblefit-project.onrender.com](https://dribblefit-project.onrender.com) |
| Database | MongoDB Atlas | Cloud cluster |
| Redis | Upstash | Cloud Redis |
| Images | Cloudinary | CDN-hosted |

Auto-deploy on every push to `main` via GitHub integration on both Vercel and Render.

---

## 📬 Email Notifications

| Trigger | Recipient |
|---|---|
| New registration | OTP sent to user |
| OTP verified | Welcome email |
| Order placed | Order confirmation with details |
| Admin updates status | Status update notification |

---

<div align="center">

**Built with ⚽ and ☕ — DribbleFit**

*The pitch is yours.*

</div>
