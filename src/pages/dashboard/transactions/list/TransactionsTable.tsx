import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Pagination } from "../../../../components/ui/pagination";
import { formatCurrency, formatDate } from "../../home/utils";
import type { Transaction } from "./useTransactions";
import type { TransactionsFilters } from "./useTransactions";
import { TransactionsFilters as FiltersComponent } from "./TransactionsFilters";

interface TransactionsTableProps {
  transactions: Transaction[];
  filters: TransactionsFilters;
  onFiltersChange: (filters: TransactionsFilters) => void;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
  isLoading?: boolean;
  showFilters?: boolean;
}

export function TransactionsTable({
  transactions,
  filters,
  onFiltersChange,
  pagination,
  showFilters = true,
}: TransactionsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative">
      {showFilters && (
        <FiltersComponent filters={filters} onFiltersChange={onFiltersChange} />
      )}

      <div className="overflow-x-auto">
        <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("dashboard.merchant")}
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("dashboard.date")}
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("dashboard.amount")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                  >
                    {t("transactions.noTransactions")}
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                  >
                    <TableCell className="text-sm text-gray-900 dark:text-gray-100">
                      {transaction.merchant}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell
                      className={`text-sm font-medium ${
                        transaction.amount >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(transaction.amount, "USD")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {t("transactions.showingResults")
              .replace(
                "{{start}}",
                String((pagination.page - 1) * pagination.pageSize + 1)
              )
              .replace(
                "{{end}}",
                String(
                  Math.min(
                    pagination.page * pagination.pageSize,
                    pagination.totalItems
                  )
                )
              )
              .replace("{{total}}", String(pagination.totalItems))}
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page: number) =>
              onFiltersChange({ ...filters, page })
            }
          />
        </div>
      )}
    </div>
  );
}
