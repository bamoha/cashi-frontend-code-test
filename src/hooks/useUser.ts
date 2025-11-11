import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/axios';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUser(): Promise<UserData> {
  const response = await apiClient.get<UserData>('/auth/me');
  return response.data;
}

export function useUser() {
  return useQuery<UserData, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

