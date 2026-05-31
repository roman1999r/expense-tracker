# 💸 Couple Budget Tracker

Modern real-time budget management application for couples.

Track personal and shared finances together with automatic calculations, category analytics, and cloud synchronization powered by Firebase.

---

## ✨ Features

### 👤 Personal Budgets

Each partner has their own balance:

- Your Budget
- Partner Budget

### 👥 Shared Budget

Common balance for:

- Groceries
- Rent
- Utilities
- Travel
- Family expenses

### 💳 Expense Management

- Add expenses
- Delete expenses
- Automatic balance updates
- Automatic refund after expense deletion

### 📊 Analytics

- Category totals
- Total expenses
- Total available funds
- Real-time calculations

### ☁️ Real-Time Sync

Powered by Firebase Firestore:

- Instant updates
- Shared data
- Multi-device support
- No backend required

### 📱 Responsive Design

Works on:

- Desktop
- Tablet
- Mobile

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|----------|
| React | Frontend |
| Vite | Build Tool |
| Firebase Firestore | Database |
| CSS3 | Styling |
| GitHub Pages | Hosting |

---

## 📂 Project Structure

```text
src/
│
├── firebase/
│   └── firebase.js
│
├── styles/
│   └── global.css
│
├── App.jsx
├── main.jsx
│
public/
│
package.json
```

---

## 🧠 Budget Logic

### Add Money

Money can be added to:

- Personal Budget
- Partner Budget
- Shared Budget

### Create Expense

Choose:

- Expense title
- Amount
- Category
- Budget source

Money is automatically deducted.

### Delete Expense

When an expense is removed:

✔ Expense deleted

✔ Money returned to original budget

✔ Totals recalculated

✔ Synced for all users

---

## 📁 Firestore Collections

### balances/main

```json
{
  "me": 1000,
  "her": 800,
  "shared": 500
}
```

### expenses

```json
{
  "title": "Groceries",
  "amount": 50,
  "category": "Food",
  "budget": "shared",
  "createdAt": 1710000000000
}
```

---

## 🔥 Firebase Setup

### Create Firebase Project

Open:

https://console.firebase.google.com

Create a new project.

---

### Enable Firestore

Firebase → Firestore Database → Create Database

Choose:

```text
Test Mode
```

---

### Firestore Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if true;
    }
  }
}

```

⚠️ Use only during development.

---

### Create Initial Balance Document

Collection:

```text
balances
```

Document:

```text
main
```

Fields:

```text
me      Number 0
her     Number 0
shared  Number 0
```

---

## 🚀 Installation

Clone repository:

```bash
git clone https://github.com/your-username/couple-budget-tracker.git
```

Open project:

```bash
cd couple-budget-tracker
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

---

## 🌐 Deployment

Build production version:

```bash
npm run build
```

Deploy:

- GitHub Pages
- Firebase Hosting
- Netlify
- Vercel

---

## 📈 Planned Features

- Google Authentication
- User Accounts
- Budget Groups
- Invite Partner
- Charts & Analytics
- Monthly Reports
- Savings Goals
- Debt Tracking
- PWA Support
- Mobile Application

---

## 📄 License

MIT License

---

## ❤️ Made for couples who want to manage money together