import { useDashboard } from './useDashboard';
import { WelcomeMessage } from './WelcomeMessage';
import { AccountBalance } from './AccountBalance';
import { QuickStats } from './QuickStats';
import { RecentTransactionsTable } from './RecentTransactionsTable';

export function DashboardContent() {
  const { data } = useDashboard();

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <WelcomeMessage />
      <AccountBalance accountBalance={data.accountBalance} />
      <QuickStats quickStats={data.quickStats} />
      <RecentTransactionsTable transactions={data.mostRecentTransactions} />
    </div>
  );
}

