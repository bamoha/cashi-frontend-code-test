import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { formatCurrency, formatDate } from "./utils";
import type { DashboardData } from "./useDashboard";

interface RecentTransactionsTableProps {
  transactions: DashboardData["mostRecentTransactions"];
}

export function RecentTransactionsTable({
  transactions,
}: RecentTransactionsTableProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <section>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300">
          {t("dashboard.recentTransactions")}
        </h2>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-medium"
        >
          <span>{t("dashboard.viewAll")}</span>
          <ArrowRight className={`icon-dance h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40">
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
            {transactions.map((transaction) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
