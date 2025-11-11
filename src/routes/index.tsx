import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from '../components/ProtectedRoutes';
import { LoadingFallback } from '../components/LoadingFallback';

const Login = lazy(() => import('../pages/auth/login/Login').then(module => ({ default: module.Login })));
const ForgotPassword = lazy(() => import('../pages/auth/forgot-password/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Home = lazy(() => import('../pages/dashboard/home/Home').then(module => ({ default: module.Home })));
const Transactions = lazy(() => import('../pages/dashboard/transactions/list/Transactions').then(module => ({ default: module.Transactions })));
const TransactionDetail = lazy(() => import('../pages/dashboard/transactions/details/TransactionDetail').then(module => ({ default: module.TransactionDetail })));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<TransactionDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

