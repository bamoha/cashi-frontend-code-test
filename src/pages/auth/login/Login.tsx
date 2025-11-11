import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogin } from './useLogin';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Navbar } from '../../../components/Navbar';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, onSubmit, formState: { errors }, isLoading } = useLogin();
  const isRTL: boolean = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-in-out,slideUp_0.5s_ease-in-out]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-1">{t('login.title')}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('login.subtitle')}</p>
            </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('common.email')}
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t('login.emailPlaceholder')}
                {...register('email')}
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('common.password')}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder={t('login.passwordPlaceholder')}
                  {...register('password')}
                  className={`w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 ${isRTL ? 'pl-10 pr-3' : 'pr-10'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none ${isRTL ? 'left-3' : 'right-3'}`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t('common.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600 rounded-md"
            >
              {t('common.signIn')}
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

