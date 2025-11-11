import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, LogOut, X, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const location = useLocation();
  const isRTL: boolean = i18n.language === 'ar';
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  const handleLogout = (): void => {
    logout();
    setShowLogoutDialog(false);
  };

  const navItems = [
    {
      path: '/',
      label: t('dashboard.title'),
      icon: LayoutDashboard,
    },
    {
      path: '/transactions',
      label: t('transactions.title'),
      icon: CreditCard,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={cn(
        "w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed z-50 transition-transform duration-300 ease-in-out",
        "h-screen top-0 lg:top-16 lg:h-[calc(100vh-4rem)]",
        isRTL ? "right-0" : "left-0",
        isOpen ? "translate-x-0" : isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end lg:hidden">
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Close sidebar"
          >
            <X className="icon-dance h-6 w-6" />
          </button>
        </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="sidebar-icon h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="sidebar-item cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-98"
        >
          <LogOut className="sidebar-icon h-5 w-5" />
          <span>{t('common.signOut')}</span>
        </button>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent onClose={() => setShowLogoutDialog(false)}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.logoutTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.logoutMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              {t('common.proceed')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
    </>
  );
}

