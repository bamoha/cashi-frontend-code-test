import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../../lib/axios';
import type { Transaction } from '../list/useTransactions';

async function fetchTransaction(id: string): Promise<Transaction> {
  const response = await apiClient.get<Transaction>(`/transactions/${id}`);
  return response.data;
}

export function useTransaction(id: string) {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id),
    enabled: !!id,
    staleTime: 30000,
  });
}

