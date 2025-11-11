import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from './utils';
import type { DashboardData } from './useDashboard';

interface QuickStatsProps {
  quickStats: DashboardData['quickStats'];
}

export function QuickStats({ quickStats }: QuickStatsProps) {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 lg:mb-6">
        {t('dashboard.quickStats')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg shadow-green-200/30 dark:shadow-black/30 border border-green-100 dark:border-green-800/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-green-300/40 dark:hover:shadow-black/40 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {t('dashboard.income')}
            </h3>
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(quickStats.income.amount, quickStats.income.currency)}
          </div>
        </div>
        <div className="bg-linear-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl shadow-lg shadow-red-200/30 dark:shadow-black/30 border border-red-100 dark:border-red-800/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-red-300/40 dark:hover:shadow-black/40 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {t('dashboard.expenses')}
            </h3>
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(quickStats.expenses.amount, quickStats.expenses.currency)}
          </div>
        </div>
      </div>
    </section>
  );
}

