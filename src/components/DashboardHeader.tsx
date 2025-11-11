import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { MobileMenuButton } from './MobileMenuButton';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ar';

  return (
    <header className={`h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6 fixed top-0 z-30 w-full ${isRTL ? 'right-0' : 'left-0'}`}>
      <div className="flex items-center gap-2 lg:gap-4">
        <MobileMenuButton onClick={onMenuClick} />
        <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
          {t("common.appName")}
        </h1>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            toggleTheme();
          }}
          className="gap-1 lg:gap-2 text-gray-700 dark:text-gray-300 text-xs lg:text-sm"
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon className="icon-dance h-3 w-3 lg:h-4 lg:w-4" />
          ) : (
            <Sun className="icon-dance h-3 w-3 lg:h-4 lg:w-4" />
          )}
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

