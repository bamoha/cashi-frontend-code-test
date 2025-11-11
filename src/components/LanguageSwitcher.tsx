import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

type LanguageCode = 'en' | 'ar';

interface Language {
  code: LanguageCode;
  label: string;
  flag: string;
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir: 'rtl' | 'ltr' = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lang: LanguageCode): void => {
    i18n.changeLanguage(lang);
  };

  const languages = useMemo<readonly Language[]>(
    () => [
      { code: 'en' as const, label: 'English', flag: '🇬🇧' },
      { code: 'ar' as const, label: 'العربية', flag: '🇸🇩' },
    ],
    []
  );

  const currentLanguage = useMemo<Language>(() => {
    return languages.find((lang) => lang.code === i18n.language) ?? languages[0];
  }, [i18n.language, languages]);

  const isRTL: boolean = i18n.language === 'ar';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 lg:gap-2 text-gray-700 dark:text-gray-300 text-xs lg:text-sm">
          <Languages className="icon-dance h-3 w-3 lg:h-4 lg:w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden md:inline">{currentLanguage.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={i18n.language === lang.code ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}
          >
            <span className={isRTL ? 'ml-2' : 'mr-2'}>{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

