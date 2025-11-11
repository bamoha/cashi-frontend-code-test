import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

export function DashboardError() {
  const { t } = useTranslation();

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      <p className="text-red-600 dark:text-red-400">
        {t('dashboard.error')}
      </p>
    </div>
  );
}

