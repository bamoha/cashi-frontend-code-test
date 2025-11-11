# Personal Finance App

A modern personal finance management application built with React, TypeScript, Tailwind, shadcn/ui, and TanStack Query. It allows users to view balances, browse transactions with filtering and pagination, and inspect detailed transaction information, with a strong focus on user experience, performance, and code quality.

---

## 🌐 Live Deployment

**[https://ubiquitous-queijadas-6e296d.netlify.app](https://ubiquitous-queijadas-6e296d.netlify.app)**

---

## 🚀 Getting Started

### Requirements

* Node.js 18+
* npm

### Installation

```bash
git clone <repository-url>
cd cashi-frontend-code-test
npm install
```

### Run Development Server

```bash
npm run dev
```

Open: `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧪 Testing

```bash
npm test          # watch mode
npm run test:run  # run once
npm run test:ui   # UI mode
```

---

## 📁 Project Structure

```
src/
├── api.ts
├── App.tsx
├── main.tsx
├── index.css
│
├── components/
│   ├── ProtectedRoutes.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── LanguageSwitcher.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── datepicker.tsx
│       ├── table.tsx
│       └── __test__/
│
├── pages/
│   ├── auth/
│   │   ├── login/
│   │   └── forgot-password/
│   └── dashboard/
│       ├── Dashboard.tsx
│       ├── home/
│       └── transactions/
│           ├── list/
│           └── details/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── __test__/
│
├── contexts/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── lib/
│   ├── axios.ts
│   ├── utils.ts
│   └── __test__/
│
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       └── ar.json
│
└── routes/
    └── index.tsx
```

---

## ✅ Requested Requirements and Completion Status

| Requirement              | Status      | What Was Done                                                           |
| ------------------------ | ----------- | ----------------------------------------------------------------------- |
| Login Screen             | ✅ Completed | Includes password toggle, validation, and error feedback                |
| Dashboard Page           | ✅ Completed | Displays welcome message, balance, quick stats, and recent transactions |
| Transactions Page        | ✅ Completed | Includes pagination, merchant filtering, and date filtering             |
| Transaction Detail Page  | ✅ Completed | Full transaction metadata display with loading and error states         |
| Protected Routes         | ✅ Completed | Gate access based on authentication state                               |
| Responsive Layout        | ✅ Completed | Mobile-first with flexible table layouts                                |
| Loading and Error States | ✅ Completed | Skeleton loaders, spinners, and user messaging                          |

All core take-home requirements are fully implemented and working.

---

## ✨ Additional Enhancements Beyond Requirements

| Enhancement                               | Description                                                       |
| ----------------------------------------- | ----------------------------------------------------------------- |
| Internationalization (English + Arabic)   | Real-time language switching with RTL support                     |
| Forgot Password Page                      | Extended user authentication flow                                 |
| React Hook Form + Zod                     | Type-safe validation with minimal re-renders                      |
| Debounced Search                          | Reduced network load and smoother filtering                       |
| Tailwind + shadcn/ui Design System        | Consistent styling and reusable components                        |
| Custom Axios API Layer                    | Shared error handling and request configuration                   |
| Skeleton + Spinner Loading Strategy       | Improved perceived performance                                    |
| Full Test Suite with Vitest + RTL         | Unit and integration tests across hooks, utils, and UI components |
| Accessibility Enhancements                | ARIA labeling, keyboard navigation, and semantic structure        |
| Smooth Transitions and Micro-interactions | Visual polish and improved UX feedback                            |

These additions were implemented to make the app feel closer to a real production system.

---

## 🎯 Core Implementation Details

### Routing and Authentication

* Protected routes using React Router v7
* Session state handled in context and validated via API `/auth/me`

### Data Fetching with TanStack Query

* Caching, refetching, and query invalidation strategies
* API calls for dashboard data and transaction lists

### Form Handling

* React Hook Form with Zod schemas for validation

### Styling and Layout

* Tailwind utility styling
* shadcn/ui component patterns
* Adaptive layouts for mobile and desktop

### Internationalization

* i18next and react-i18next
* RTL support for Arabic
* Localized date and currency formatting

---

## 📡 API Endpoints

| Endpoint                | Method | Description                     |
| ----------------------- | ------ | ------------------------------- |
| `/api/auth/login`       | POST   | Login user                      |
| `/api/auth/me`          | GET    | Validate session                |
| `/api/dashboard/stats`  | GET    | Summary and recent transactions |
| `/api/transactions`     | GET    | Paginated transaction list      |
| `/api/transactions/:id` | GET    | Transaction detail              |

**Test Credentials**

```json
{ "email": "user@test.com", "password": "password" }
```

---

📄 Notes

This project prioritizes performance, clarity, accessibility, and maintainability.

<img width="520" height="175" alt="image" src="https://github.com/user-attachments/assets/b9ee6164-6575-460e-b471-ce2974a9fc4f" />

