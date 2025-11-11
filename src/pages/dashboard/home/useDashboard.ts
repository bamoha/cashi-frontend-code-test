import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export interface DashboardData {
  accountBalance: {
    amount: number;
    currency: string;
  };
  quickStats: {
    income: {
      amount: number;
      currency: string;
    };
    expenses: {
      amount: number;
      currency: string;
    };
  };
  mostRecentTransactions: Array<{
    id: string;
    date: string;
    merchant: string;
    amount: number;
  }>;
}

async function fetchDashboard(): Promise<DashboardData> {
  const response = await apiClient.get<DashboardData>('/dashboard/stats');
  return response.data;
}

export function useDashboard() {
  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 30000,
  });
}

