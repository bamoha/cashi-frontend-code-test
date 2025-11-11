import { LanguageSwitcher } from "./LanguageSwitcher";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 animate-[fadeIn_0.5s_ease-in-out,slideDown_0.5s_ease-in-out]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
            {t("common.appName")}
          </h1>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
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
      </div>
    </nav>
  );
}
