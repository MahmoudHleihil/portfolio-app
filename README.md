# Personal Portfolio Project

## Developer

**Name:** Mahmoud Hleihil  
**GitHub Repo:** [portfolio-app](https://github.com/MahmoudHleihil/portfolio-app.git)

---

## Overview

This is a fullstack personal portfolio project that showcases selected projects, includes a contact form, and features a fully functional admin dashboard for managing content. The project was developed using:

- **Frontend:** React + Bootstrap + Framer Motion
- **Backend:** Node.js + Express.js API

---

## Technologies Used

### Frontend

- React
- Bootstrap (UI framework)
- Framer Motion (animations)
- Axios (API calls)

### Backend

- Node.js
- Express.js
- CORS
- dotenv (for environment variables)

---

## Live Deployment

- **Client URL:** (http://localhost:3000/)
- **Server URL:** (http://localhost:5000)

---

## 🧪 Features & Functionality

- **Project CRUD (Create, Read, Update, Delete)**
- **Animated project cards** using Framer Motion
- **Contact form** with input validation
- **Environment variable support** (`REACT_APP_API_BASE`)

---

## 🧠 Challenges & Solutions

- ❌ **Issue:** Environment variable wasn't working on Render  
  ✅ **Solution:** Set `REACT_APP_API_BASE` in both frontend and backend Render environments

- ❌ **Issue:** Animation not rendering smoothly on first load  
  ✅ **Solution:** Wrapped project list items with Framer Motion’s `motion.div` with fade effect

---
# Portfolio Backend with MySQL

## Setup

1. Install dependencies:
```bash
npm install express cors mysql2 dotenv
