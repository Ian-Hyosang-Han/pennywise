## PennyWise
A simple personal expense management web application built with React, TypeScript, Vite, Tailwind CSS, and Redux Toolkit, backed by a JSON server (hosted on Glitch) for development and deployed on Vercel for easy testing.

## 🚀 Features

- User Authentication: Sign up, log in, and maintain session via mock JSON server and localStorage.
- Monthly & Yearly Aggregation: View expense totals by selected month and for the current year.
- Interactive Graph: Animated category-wise expense distribution charts.
- Expense Management: Create, read, update, and delete (CRUD) your expense records.
- Responsive Layout: Desktop sidebar navigation and mobile-friendly header with toggle menu.
- Daily Quote: Displays a random motivational quote of the day.

<img alt="crud" src="/public/crud-image.png" width="800">

## 📦 Tech Stack

Frontend
<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
State Management
<img alt="Redux Toolkit" src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" />
<img alt="React Query" src="https://img.shields.io/badge/-React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" />
Routing
<img alt="React Router" src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" />
Mock Backend
<img alt="JSON Server" src="https://img.shields.io/badge/-JSON--Server-000000?style=flat-square&logo=json&logoColor=white" />
<img alt="Glitch" src="https://img.shields.io/badge/-Glitch-EC1066?style=flat-square&logo=glitch&logoColor=white" />
Deployment
<img alt="Vercel" src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />

## 🗂 Project Structure

├── public/                   # Static assets & manifest
├── src/
│   ├── api/                  # Axios instances & API functions
│   ├── app/                  # Redux slices & store
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route-level pages
│   ├── utilities/            # Helpers (date formatting, quotes)
│   ├── AppRouter.tsx         # Routing setup
│   └── main.tsx              # Entrypoint
├── db.json                   # Mock database for JSON Server
├── server.js                 # Express + JSON Server + CORS (Glitch)
└── vite.config.ts            # Vite config / Tailwind CSS config

## 📖 Usage

- Sign Up: Create an account (stored in JSON server). On success, a confirmation modal appears.
- Log In: Authenticate against JSON server; success stores a mock token & user in localStorage.
- Dashboard: Browse today’s date & quote, pick a month, and review graphs.
- Manage Expenses: Add new expenses, edit existing ones, or delete records.
- Logout: Clears session and returns to login page.

## 🌐 Deployment
<img alt="Vercel" src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
<img alt="Glitch" src="https://img.shields.io/badge/-Glitch-EC1066?style=flat-square&logo=glitch&logoColor=white" />

## 🔗 Live Site
[pennywise-eight.vercel.app](https://pennywise-eight.vercel.app/)

## 🛠️ Installation
Clone Repository
```bash
git clone https://github.com/<your-username>/pennywise.git
cd pennywise
```

Install Dependencies
```bash
pnpm install
```

Environment Variables
Create a .env in the project root:
```bash
VITE_API_BASE_URL=https://<your-glitch-subdomain>.glitch.me
VITE_LOGIN_API_BASE_URL=https://<your-glitch-subdomain>.glitch.me
```

Run in Development
```bash
pnpm run dev
```