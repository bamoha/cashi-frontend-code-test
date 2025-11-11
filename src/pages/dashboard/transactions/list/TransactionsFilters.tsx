import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { DatePicker } from '../../../../components/ui/datepicker';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../../../hooks/useDebounce';
import type { TransactionsFilters } from './useTransactions';

interface TransactionsFiltersProps {
  filters: TransactionsFilters;
  onFiltersChange: (filters: TransactionsFilters) => void;
}

export function TransactionsFilters({ filters, onFiltersChange }: TransactionsFiltersProps) {
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ar';
  const [merchantInput, setMerchantInput] = useState<string>(filters.merchant || '');
  const debouncedMerchant = useDebounce(merchantInput, 500);

  useEffect(() => {
    if (debouncedMerchant !== (filters.merchant || '')) {
      onFiltersChange({
        ...filters,
        merchant: debouncedMerchant || undefined,
        page: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMerchant]);

  useEffect(() => {
    if (!filters.merchant) {
      setMerchantInput('');
    }
  }, [filters.merchant]);

  const handleMerchantInputChange = (value: string) => {
    setMerchantInput(value);
  };

  const handleClearSearch = () => {
    setMerchantInput('');
  };

  const handleDateChange = (date: string | undefined) => {
    onFiltersChange({
      ...filters,
      date: date || undefined,
      page: 1,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      page: 1,
    });
  };

  const hasActiveFilters = Boolean(filters.merchant || filters.date);

  return (
    <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-gray-200 dark:border-gray-700 lg:justify-end">
      <div className="flex-1 lg:flex-none lg:w-64">
        <div className="relative">
          <Search className={`icon-dance absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            type="text"
            placeholder={t('transactions.merchantPlaceholder')}
            value={merchantInput}
            onInput={(e) => handleMerchantInputChange(e.currentTarget.value)}
            className={`${isRTL ? 'pr-10' : 'pl-10'} ${merchantInput ? (isRTL ? 'pl-10' : 'pr-10') : ''} dark:bg-gray-700 dark:text-white dark:border-gray-600`}
          />
          {merchantInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className={`cursor-pointer absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none ${isRTL ? 'left-3' : 'right-3'}`}
              aria-label="Clear search"
            >
              <X className="icon-dance h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 lg:flex-none lg:w-64">
        <DatePicker
          value={filters.date}
          onChange={handleDateChange}
          placeholder={t('transactions.datePlaceholder')}
        />
      </div>
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="gap-2 text-xs text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-3 w-3" />
          {t('transactions.clearFilters')}
        </Button>
      )}
    </div>
  );
}

