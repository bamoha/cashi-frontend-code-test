import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '../../../hooks/useAuth';
import { apiClient } from '../../../lib/axios';

export type LoginFormData = {
  email: string;
  password: string;
};

async function loginUser(credentials: LoginFormData): Promise<void> {
  await apiClient.post('/auth/login', credentials);
}

export function useLogin() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      login();
      navigate('/');
      toast.success(t('login.success') || 'Login successful!');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('login.error') || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData): void => {
    mutation.mutate(data);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
