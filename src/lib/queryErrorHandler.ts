import { QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage, isAxiosError } from './errorHandler';

export const queryCache = new QueryCache({
  onError: (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      return;
    }
    const message = getErrorMessage(error);
    if (message) {
      toast.error(message);
    }
  },
});

export const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      return;
    }
    const message = getErrorMessage(error);
    if (message) {
      toast.error(message);
    }
  },
});

