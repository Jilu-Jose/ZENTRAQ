# ZENTRAQ – Personal Finance Tracker

## About

Live: https://zentraq-ten.vercel.app/ 

ZENTRAQ is a modern frontend fintech dashboard built using React and Firebase.  
It allows users to securely manage their income and expenses in an intuitive and responsive interface.

The application provides real-time financial tracking, authentication, transaction management, and a clean dashboard layout designed for a seamless user experience.

This project was developed as part of a React Frontend Assignment – Personal Finance Tracker :contentReference[oaicite:0]{index=0}.

---

## Project Overview

ZENTRAQ is a frontend-only finance tracking application where users can:

- Register and login securely using Firebase Authentication  
- Add income and expense transactions  
- Edit or delete existing records  
- View total balance, income, and expenses  
- Filter and search transactions  
- Visualize financial data using charts  

The goal of this project is to demonstrate strong UI design, proper React structure, Firebase integration, and clean code architecture.

---

## Features

### 1. Authentication
- Secure login and signup
- Firebase authentication integration

### 2. Dashboard
- Summary cards displaying:
  - Total Balance
  - Total Income
  - Total Expense
- Clean and responsive layout

### 3. Transactions Management
- Add new transactions
- Edit existing transactions
- Delete transactions
- Filter and search functionality

### 4. Analytics
- Chart visualization (Pie / Bar)
- Spending pattern analysis

### 5. Modern UI
- Clean spacing and layout
- Component-based architecture
- Optional dark/light theme support

---

## Wireframe Layout

```
-----------------------------------------------------------
| Navbar (Logo | Dashboard | Add Transaction | Profile) |
-----------------------------------------------------------
| Summary Cards: Balance | Income | Expense |
-----------------------------------------------------------
| Filters/Search Bar |
-----------------------------------------------------------
| Transactions List/Table |
| - Title - Amount - Category - Date |
| - Edit / Delete buttons |
-----------------------------------------------------------
| Floating Add Button / Modal Form |
-----------------------------------------------------------
```

---

## Folder Structure

```
zentraq/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Charts/
│   │   ├── UI/
│   │   ├── Analytics.jsx
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   └── Transactions.jsx
│   │
│   ├── lib/
│   │   ├── constants.js
│   │   └── firebase.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Technologies Used

- React (Vite)
- Firebase Authentication
- Firebase Firestore
- React Hooks (useState, useEffect)
- Modern CSS Styling

---

## Evaluation Criteria Covered

This project fulfills the following criteria:

- Clean UI design and responsiveness  
- Proper React component separation  
- Effective use of hooks  
- Correct Firebase integration  
- Smooth user navigation  
- High code readability and structure  
- Deployment ready  

---

## How to Run Locally

```bash
npm install
npm run dev
```

---

## Deployment

The project is deployed using Vercel.  
Any push to the main branch automatically triggers redeployment.

---

## Future Improvements

- Budget planning feature
- Monthly analytics reports
- Download transaction history (CSV)
- Advanced financial insights
- Dark/Light mode toggle enhancement

---

## Author

Developed by Jilu P. Jose  
React Frontend – Personal Finance Tracker Project
