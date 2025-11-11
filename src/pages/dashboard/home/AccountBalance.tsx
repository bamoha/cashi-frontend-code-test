import { useTranslation } from 'react-i18next';
import { formatCurrency } from './utils';
import type { DashboardData } from './useDashboard';

interface AccountBalanceProps {
  accountBalance: DashboardData['accountBalance'];
}

export function AccountBalance({ accountBalance }: AccountBalanceProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 hover:-translate-y-1 h-full">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
        {t('dashboard.accountBalance')}
      </h2>
      <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        {formatCurrency(accountBalance.amount, accountBalance.currency)}
      </div>
    </section>
  );
}

