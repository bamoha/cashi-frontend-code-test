import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../../lib/axios';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: string;
  category: string;
  description?: string;
  account?: string;
  status?: string;
  paymentMethod?: string;
  referenceNumber?: string;
}

export interface TransactionsResponse {
  items: Transaction[];
  pagination: {
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}

export interface TransactionsFilters {
  merchant?: string;
  date?: string;
  page?: number;
}

async function fetchTransactions(filters: TransactionsFilters): Promise<TransactionsResponse> {
  const params = new URLSearchParams();
  if (filters.merchant) {
    params.append('merchant', filters.merchant);
  }
  if (filters.date) {
    params.append('date', filters.date);
  }
  if (filters.page) {
    params.append('page', filters.page.toString());
  }

  const response = await apiClient.get<TransactionsResponse>(`/transactions?${params.toString()}`);
  return response.data;
}

export function useTransactions(filters: TransactionsFilters) {
  return useQuery<TransactionsResponse, Error>({
    queryKey: ['transactions', filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: 30000,
    // placeholderData: (previousData) => previousData,
  });
}

