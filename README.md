## <img alt="logo" src="/public/pennywise-logo.png" width="50">PennyWise

A simple personal expense management demo application built with React, TypeScript, Vite, Tailwind CSS, and Redux Toolkit. The deployed version uses a GitHub-hosted mock JSON Server API for sample data and is published on Vercel for easy testing.

## Demo Account

Use the credentials below to explore the deployed app:

```text
Username: testuser
Password: 1111aaaa
```

Note: This is a demo deployment backed by a mock API. Sign up, create, edit, and delete actions may return successful responses for testing, but new data is not permanently saved on the hosted GitHub JSON Server.

## 🚀 Features

- Demo Authentication: Log in with the provided demo account and maintain session via localStorage.
- Monthly & Yearly Aggregation: View expense totals by selected month and for the current year.
- Interactive Graph: Animated category-wise expense distribution charts.
- Expense Management: Explore create, read, update, and delete (CRUD) UI flows with mock API responses.
- Responsive Layout: Desktop sidebar navigation and mobile-friendly header with toggle menu.
- Daily Quote: Displays a random motivational quote of the day.

<img alt="crud" src="/public/crud-image.png" width="500">

## 📦 Tech Stack

Frontend <br/>
<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /><br/>

State Management<br/>
<img alt="Redux Toolkit" src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" />
<img alt="React Query" src="https://img.shields.io/badge/-React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" /><br/>

Routing<br/>
<img alt="React Router" src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" /><br/>

Mock Backend<br/>
<img alt="JSON Server" src="https://img.shields.io/badge/-JSON--Server-000000?style=flat-square&logo=json&logoColor=white" />
<img alt="GitHub JSON Server" src="https://img.shields.io/badge/-GitHub_JSON_Server-181717?style=flat-square&logo=github&logoColor=white" /><br/>

Deployment<br/>
<img alt="Vercel" src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />

## 🗂 Project Structure

<img alt="structure" src="/public/structure-img.png" width="500">

## 📖 Usage

- Log In: Enter the demo credentials to authenticate and view sample expense data.
- Dashboard: Browse today’s date & quote, pick a month, and review expense graphs.
- Manage Expenses: Add new expenses, edit existing ones, or delete records in the UI.
- Logout: Clears session and returns to the login page.

## Mock API Notice

The live site uses My JSON Server from a GitHub repository:

[GitHub JSON Server](https://github.com/Ian-Hyosang-Han/expenses-json-server)

The hosted mock API supports REST-style requests, but changes are not persisted between requests. For that reason, the live site is intended as a demo experience with the provided account rather than a production authentication system.

## 🌐 Deployment

<img alt="Vercel" src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />

## 🔗 Live Site

[pennywise-eight.vercel.app](https://pennywise-eight.vercel.app/)

## 🛠️ Installation

- Clone Repository

```bash
git clone https://github.com/<your-username>/pennywise.git
cd pennywise
```

- Install Dependencies

```bash
pnpm install
```

- Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3001
VITE_LOGIN_API_BASE_URL=http://localhost:3001
```

For the deployed demo, the API can point to:

```bash
VITE_API_BASE_URL=https://my-json-server.typicode.com/Ian-Hyosang-Han/expenses-json-server
VITE_LOGIN_API_BASE_URL=https://my-json-server.typicode.com/Ian-Hyosang-Han/expenses-json-server
```

- Run in Development

```bash
pnpm run dev
```
