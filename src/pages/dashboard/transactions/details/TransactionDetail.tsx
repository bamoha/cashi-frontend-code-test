import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { useTransaction } from './useTransaction';
import { TransactionDetailSkeleton } from './TransactionDetailSkeleton';
import { formatCurrency, formatDate } from '../../home/utils';

export function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: transaction, isLoading, error } = useTransaction(id || '');

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4 gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="icon-dance h-3 w-3" />
            {t('transactions.goBack')}
          </Button>
        </div>
        <TransactionDetailSkeleton />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div>
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4 gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="icon-dance h-3 w-3" />
            {t('transactions.goBack')}
          </Button>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="icon-dance h-5 w-5 text-red-600 dark:text-red-400" />
          <p className="text-red-600 dark:text-red-400">
            {t('transactions.detailError')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="icon-dance h-3 w-3" />
          {t('transactions.goBack')}
        </Button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {t('transactions.detailTitle')}
        </h1>
      </div>

      <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out,slideUp_0.5s_ease-in-out]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
              {transaction.merchant}
            </h2>
            <div
              className={`text-2xl lg:text-3xl font-bold ${
                transaction.amount >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatCurrency(transaction.amount, 'USD')}
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(transaction.date)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('transactions.detailInformation')}
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('transactions.detailDate')}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {formatDate(transaction.date)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('transactions.detailMerchant')}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {transaction.merchant}
              </span>
            </div>
            {transaction.description && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('transactions.detailDescription')}
                </span>
                <span className="text-sm text-gray-900 dark:text-white text-right">
                  {transaction.description}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('transactions.detailAmount')}
              </span>
              <span
                className={`text-sm font-semibold ${
                  transaction.amount >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {formatCurrency(transaction.amount, 'USD')}
              </span>
            </div>
            {'account' in transaction && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('transactions.detailAccount')}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {transaction.account}
                </span>
              </div>
            )}
            {'status' in transaction && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('transactions.detailStatus')}
                </span>
                <span className="text-sm text-gray-900 dark:text-white capitalize">
                  {transaction.status}
                </span>
              </div>
            )}
            {'paymentMethod' in transaction && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('transactions.detailPaymentMethod')}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {transaction.paymentMethod}
                </span>
              </div>
            )}
            {'referenceNumber' in transaction && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('transactions.detailReference')}
                </span>
                <span className="text-sm text-gray-900 dark:text-white font-mono">
                  {transaction.referenceNumber}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

