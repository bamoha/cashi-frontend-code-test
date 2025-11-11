import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";
import { useTransactions, type TransactionsFilters } from "./useTransactions";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsSkeleton } from "./TransactionsSkeleton";
import { TransactionsFilters as FiltersComponent } from "./TransactionsFilters";

export function Transactions() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<TransactionsFilters>({
    page: 1,
  });

  const { data, isLoading, isFetching, error } = useTransactions(filters);

  const showSkeleton = isLoading && !data;
  const showTableLoading = isFetching && !!data;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {t("transactions.title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t("transactions.subtitle")}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <FiltersComponent filters={filters} onFiltersChange={setFilters} />

        {showSkeleton && <TransactionsSkeleton />}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 m-4 flex items-center gap-3">
            <AlertCircle className="icon-dance h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400">
              {t("transactions.error")}
            </p>
          </div>
        )}

        {data && !showSkeleton && (
          <TransactionsTable
            transactions={data.items}
            filters={filters}
            onFiltersChange={setFilters}
            pagination={data.pagination}
            isLoading={showTableLoading}
            showFilters={false}
          />
        )}
      </div>
    </>
  );
}

