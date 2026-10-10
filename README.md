# Community Library Management System

React + Vite app. Data is saved in the browser's localStorage.

## Run

```powershell
npm install
npm run dev
```

## Demo logins

| Role      | Membership ID | Password |
|-----------|---------------|----------|
| Admin     | retha1234     | 123456   |
| Librarian | LIB001        | lib123   |

## Features

- Books: add, update, delete (ISBN checked for duplicates)
- Stock: add stock / deduct stock when borrowed, with a transaction history
- Dashboard: availability table, low-stock (fewer than 2 copies) highlighted
- Users (Admin only): add, update, delete; login form with protected routes

## Structure

- `src/context/LibraryContext.jsx` - shared state + all actions
- `src/hooks/useLocalStorage.js` - custom hook that syncs state to localStorage
- `src/components/` - reusable pieces (forms, tables, layout)
- `src/pages/` - one component per route

## Deploy to GitHub Pages

```powershell
npm run deploy
```
