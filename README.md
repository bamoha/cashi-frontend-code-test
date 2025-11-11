# Personal Finance App

A modern, feature-rich personal finance management application built with React, TypeScript, and cutting-edge web technologies. This application provides a complete solution for viewing financial transactions, account balances, and transaction details with an emphasis on user experience, performance, and code quality.

## 🎯 Project Overview

This project successfully delivers a fully functional 4-page Personal Finance App with comprehensive features and enhancements. The application has been built using **React 19**, **Vite**, **Tailwind CSS**, **shadcn/ui**, and **TanStack Query**, providing a robust foundation for modern web application development.

### ✅ Completed Features

- **Login Screen** with password visibility toggle
- **Dashboard** with welcome message, account balance, quick stats, and recent transactions
- **Transactions Page** with pagination and filtering capabilities
- **Transaction Detail Page** with complete transaction information
- **Protected Routes** ensuring secure access to authenticated pages
- **Responsive Design** with mobile-first approach
- **Loading & Error States** handled gracefully throughout the application

---

## 🚀 Core Implementation Features

### 1. Routing & Authentication

**Protected Routes Implementation**
- Unauthenticated users are automatically redirected to the login page
- Session management through HTTP-only cookies
- Seamless authentication flow with proper state management
- Route guards implemented using React Router v7

```typescript
// Protected routes ensure only authenticated users can access dashboard
<ProtectedRoutes>
  <Dashboard />
</ProtectedRoutes>
```

### 2. Data Management with TanStack Query

**Complete Query & Mutation Implementation**
- All API requests handled through TanStack Query (React Query)
- Automatic caching, background refetching, and stale data management
- Optimistic updates for better user experience
- Centralized error handling for all API calls
- Query invalidation strategies for data consistency

**Key Features:**
- Dashboard stats and recent transactions fetched via `/api/dashboard/stats`
- Transaction list with pagination via `/api/transactions`
- Individual transaction details via `/api/transactions/:id`
- User session management via `/api/auth/me`

### 3. Complete Screen Implementations

#### Login Screen
- Email and password authentication
- **Password visibility toggle** for enhanced UX
- Form validation with real-time feedback
- Error handling for invalid credentials
- Responsive design for all screen sizes

#### Dashboard
- **Personalized welcome message** with user's name
- **Account balance** display with clear visual hierarchy
- **Quick stats** showing income, expenses, and net balance
- **Recent transactions table** displaying the 5 most recent transactions
- Summary information: date, merchant, and amount for each transaction

#### Transactions Page
- **Pagination** for efficient data browsing
- **Advanced filtering** by:
  - Merchant name (with debounced search)
  - Date selection (via date picker)
- Real-time filter updates
- Clear filters functionality
- Responsive table design
- Empty state handling

#### Transaction Detail Page
- Complete transaction information display
- All transaction fields: date, merchant, amount, description, account, status, payment method, reference number
- Loading states during data fetch
- Error handling for invalid transaction IDs
- Navigation back to transactions list

### 4. Password Visibility Toggle

The login screen includes a password visibility toggle that allows users to show/hide their password input, improving usability and security awareness.

### 5. Responsive, Mobile-First Design

- **Mobile-first approach** ensuring optimal experience on all devices
- Breakpoint-based responsive layouts
- Touch-friendly interactive elements
- Adaptive navigation (mobile menu for smaller screens)
- Optimized table layouts for mobile viewing

### 6. Loading & Error States

**Comprehensive State Management:**
- Skeleton loaders for initial page loads
- Spinner overlays for subsequent data fetches
- Error boundaries for graceful error handling
- User-friendly error messages
- Retry mechanisms for failed requests

**Loading States:**
- First load: Full skeleton loader
- Subsequent loads: Spinner overlay maintaining visible content
- Optimistic UI updates where applicable

---

## ✨ Enhancements and Technical Deep Dive

### 1. Robust Form Handling

**Zod Schema Validation + React Hook Form**

The application implements enterprise-grade form handling using:
- **Zod** for type-safe schema validation
- **React Hook Form** for efficient, controlled form state management
- Real-time validation feedback
- Optimized re-renders through uncontrolled components

**Benefits:**
- Type-safe form validation at compile time
- Reduced bundle size through minimal re-renders
- Better performance with large forms
- Consistent validation logic across all forms

```typescript
// Example: Login form with Zod validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

### 2. Internationalization (i18n)

**Full Arabic & English Language Support**

Complete internationalization implementation with:
- **i18next** and **react-i18next** for translation management
- Language detection from browser settings
- Seamless language switching via UI component
- RTL (Right-to-Left) support for Arabic
- Localized date and currency formatting

**Features:**
- Language switcher in navigation
- Persistent language preference
- RTL layout adjustments for Arabic
- All UI text fully translatable

### 3. Quality Assurance & Testing

**Comprehensive Unit Test Suite**

The project includes a complete testing infrastructure:
- **Vitest** as the test runner (modern, fast, and Vite-native)
- **React Testing Library (RTL)** for component testing
- **@testing-library/user-event** for user interaction simulation
- Test utilities with proper provider setup (React Query, i18n, Router)

**Test Coverage:**
- ✅ Utility functions (formatting, class name utilities)
- ✅ Custom hooks (useDebounce, useAuth)
- ✅ UI components (Button, DatePicker)
- ✅ Page components (Transactions, Filters, Table)
- ✅ Form validation logic
- ✅ User interactions and edge cases

**Test Organization:**
- Tests organized in `__test__` folders within each module
- Clear separation of concerns
- Mocked API calls for isolated testing
- Integration tests for component interactions

**Running Tests:**
```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
npm run test:ui   # Run tests with UI
```

### 4. Modern Styling with Tailwind CSS

**Latest Tailwind CSS v4 Implementation**

- **Tailwind CSS v4** with Vite plugin for optimal performance
- Utility-first approach for maintainable styles
- Custom design system with consistent spacing, colors, and typography
- Dark mode support throughout the application
- Responsive utilities for all breakpoints
- Custom animations and transitions

**Design System:**
- Consistent color palette
- Typography scale
- Spacing system
- Component variants using class-variance-authority

### 5. Accessibility (A11y)

**Enhanced Accessibility Features**

- **ARIA labels** on all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Proper heading hierarchy
- Alt text for icons and images

**Accessibility Highlights:**
- Form inputs with proper labels
- Button elements with descriptive text
- Navigation landmarks
- Skip links for keyboard users
- Color contrast compliance

### 6. Authentication Flow Enhancement

**Forgot Password Page**

Additional authentication feature:
- Dedicated forgot password page
- Form validation and error handling
- Integration with authentication system
- User-friendly messaging

### 7. Networking Layer

**Consistent API Communication with Axios**

- Centralized Axios instance configuration
- Request/response interceptors
- Automatic credential handling
- Consistent error handling
- Base URL configuration
- Request timeout management

```typescript
// Centralized API client
export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 8. Dynamic User Experience

#### Personalized Greeting

The dashboard features a **time-based greeting** that dynamically adjusts:
- **Good Morning** (5:00 AM - 11:59 AM)
- **Good Afternoon** (12:00 PM - 4:59 PM)
- **Good Evening** (5:00 PM - 8:59 PM)
- **Good Night** (9:00 PM - 4:59 AM)

Each greeting includes an appropriate icon for visual enhancement.

#### Skeleton Loading States

**Smart Loading Strategy:**
- **First load**: Full skeleton loader for perceived performance
- **Subsequent loads**: Spinner overlay maintaining visible content
- Smooth transitions between loading and loaded states
- Context-aware loading indicators

#### Simulated Backend Reality

- API call delays implemented to showcase real-world loading states
- Production-like error scenarios
- Network timeout handling
- Retry mechanisms

### 9. Performance Optimization

#### Debounced Search/Filtering

**Intelligent Input Handling:**
- Debouncing implemented on search inputs (500ms delay)
- Prevents excessive API requests while typing
- Improved server performance
- Better user experience with reduced network traffic

```typescript
// Custom debounce hook
const debouncedMerchant = useDebounce(merchantInput, 500);
```

**Benefits:**
- Reduced server load
- Faster perceived performance
- Better battery life on mobile devices
- Smoother user experience

### 10. Visual Appeal & Animations

**Smooth User Experience**

- **Page transitions** with fade and slide animations
- **Component reveals** with staggered animations
- **Hover effects** on interactive elements
- **Loading animations** for better perceived performance
- **Micro-interactions** for enhanced feedback

**Animation Features:**
- CSS transitions for smooth state changes
- Fade-in animations for content loading
- Scale effects on button interactions
- Smooth scrolling behavior

---

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool
- **React Router 7.9.5** - Declarative routing

### State Management & Data Fetching
- **TanStack Query 5.90.7** - Powerful data synchronization
- **React Context API** - Global state management (Auth, Theme)

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Form Handling & Validation
- **React Hook Form 7.66.0** - Performant form library
- **Zod 4.1.12** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration

### Internationalization
- **i18next 25.6.2** - Internationalization framework
- **react-i18next 16.2.4** - React bindings for i18next
- **i18next-browser-languagedetector** - Automatic language detection

### Testing
- **Vitest 4.0.8** - Fast unit test framework
- **React Testing Library 16.3.0** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for testing

### Utilities
- **Axios 1.13.2** - HTTP client
- **date-fns 4.1.0** - Date manipulation library
- **clsx & tailwind-merge** - Conditional class utilities

---

## 📁 Project Structure

```
src/
├── api.ts                    # API endpoint definitions
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles
│
├── components/               # Reusable components
│   ├── ProtectedRoutes.tsx  # Route protection wrapper
│   ├── Navbar.tsx           # Navigation bar
│   ├── Sidebar.tsx          # Dashboard sidebar
│   ├── LanguageSwitcher.tsx # Language toggle component
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── datepicker.tsx
│       ├── table.tsx
│       └── __test__/        # Component tests
│
├── pages/                   # Page components
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── forgot-password/ # Forgot password page
│   └── dashboard/
│       ├── Dashboard.tsx    # Dashboard layout
│       ├── home/           # Dashboard home
│       └── transactions/
│           ├── list/       # Transactions list
│           └── details/    # Transaction detail
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── useDebounce.ts      # Debounce hook
│   └── __test__/          # Hook tests
│
├── contexts/               # React contexts
│   ├── AuthContext.tsx    # Authentication context
│   └── ThemeContext.tsx   # Theme context
│
├── lib/                    # Utility libraries
│   ├── axios.ts           # Axios configuration
│   ├── utils.ts           # Utility functions
│   └── __test__/         # Utility tests
│
├── i18n/                   # Internationalization
│   ├── config.ts          # i18n configuration
│   └── locales/           # Translation files
│       ├── en.json
│       └── ar.json
│
├── routes/                 # Route configuration
│   └── index.tsx
│
└── test/                   # Test utilities
    ├── setup.ts           # Test setup
    └── test-utils.tsx     # Testing utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cashi-frontend-code-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
```

---

## 🔐 Authentication

### Pre-defined User Credentials

Use the following credentials to sign in:

```json
{
  "email": "user@test.com",
  "password": "password"
}
```

### Authentication Flow

1. User enters credentials on login page
2. Form validation ensures proper format
3. API call to `/api/auth/login` with credentials
4. HTTP-only cookie set for session management
5. Redirect to dashboard upon successful authentication
6. Protected routes check authentication status
7. Unauthenticated users redirected to login

---

## 📡 API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/login` | POST | Logs user in and sets HTTP-only cookie | No |
| `/api/auth/me` | GET | Fetches current user session | Yes |
| `/api/dashboard/stats` | GET | Returns total income/spent and recent transactions | Yes |
| `/api/transactions?page=1&merchant=<name>&date=<date>` | GET | Returns paginated list of transactions | Yes |
| `/api/transactions/:id` | GET | Returns details for a specific transaction | Yes |

### Example Transaction Object

```json
{
  "id": "ef3e724a-fab1-4c75-9063-c12e9af2b4d4",
  "date": "2025-10-20T14:32:00Z",
  "merchant": "Whole Foods Market",
  "description": "Grocery shopping",
  "amount": -87.43,
  "account": "Checking ****1234",
  "status": "completed",
  "paymentMethod": "Debit Card",
  "referenceNumber": "REF-2025-10-20-001"
}
```

---

## 🎨 Design Decisions & Trade-offs

### Design Philosophy

- **Mobile-first**: All designs start with mobile experience
- **Progressive enhancement**: Features work on all devices
- **Accessibility first**: WCAG compliance prioritized
- **Performance**: Optimized for fast load times and smooth interactions

### Key Decisions

1. **TanStack Query over Redux**: Chosen for better data fetching, caching, and synchronization
2. **React Hook Form + Zod**: Optimal combination for type-safe, performant forms
3. **Vitest over Jest**: Faster, Vite-native, better ESM support
4. **shadcn/ui components**: Copy-paste approach for maximum customization
5. **i18next**: Industry-standard for internationalization
6. **Axios**: Consistent API client with interceptors

### Performance Optimizations

- Code splitting with React.lazy()
- Debounced search inputs
- Optimized re-renders with React Hook Form
- Efficient caching with TanStack Query
- Skeleton loaders for perceived performance

---

## 🧪 Testing Strategy

### Test Organization

Tests are organized in `__test__` folders within each module, following best practices for maintainability and discoverability.

### Test Coverage

- **Unit Tests**: Utility functions, hooks, and pure functions
- **Component Tests**: UI components with user interactions
- **Integration Tests**: Page components and data flow
- **Accessibility Tests**: ARIA labels and keyboard navigation

### Running Tests

```bash
# Watch mode (recommended during development)
npm test

# Single run (for CI/CD)
npm run test:run

# UI mode (visual test runner)
npm run test:ui
```

---

## 🌍 Internationalization

### Supported Languages

- **English (en)** - Default language
- **Arabic (ar)** - Full RTL support

### Language Switching

Users can switch languages using the language switcher in the navigation bar. The preference is persisted across sessions.

### RTL Support

Arabic language includes:
- Right-to-left text direction
- Mirrored layouts
- RTL-aware spacing and positioning
- Proper date and number formatting

---

## 🎯 Future Enhancements

Potential areas for future development:

- [ ] Export transactions to CSV/PDF
- [ ] Transaction categories and tags
- [ ] Budget tracking and alerts
- [ ] Recurring transaction management
- [ ] Advanced analytics and charts
- [ ] Multi-account support
- [ ] Transaction search with full-text
- [ ] Dark mode toggle (currently system-based)

---

## 📝 Notes

### Completed Features

All originally requested features have been fully implemented and tested:
- ✅ Login screen with password toggle
- ✅ Dashboard with all required components
- ✅ Transactions page with pagination and filtering
- ✅ Transaction detail page
- ✅ Protected routes
- ✅ TanStack Query integration
- ✅ Responsive design
- ✅ Loading and error states

### Additional Enhancements

Beyond the original requirements, the following enhancements have been added:
- ✅ Internationalization (i18n)
- ✅ Comprehensive test suite
- ✅ Forgot password page
- ✅ Advanced form validation
- ✅ Performance optimizations
- ✅ Enhanced accessibility
- ✅ Modern animations and transitions

---

## 👥 Contributing

This is a take-home project. For production use, consider:
- Adding E2E tests with Playwright or Cypress
- Implementing proper error logging (e.g., Sentry)
- Adding analytics tracking
- Setting up CI/CD pipeline
- Performance monitoring
- Security audit

---

## 📄 License

This project is part of a coding assessment.

---

## 🙏 Acknowledgments

Built with modern web technologies and best practices, focusing on:
- Code quality and maintainability
- User experience and accessibility
- Performance and scalability
- Type safety and developer experience

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
