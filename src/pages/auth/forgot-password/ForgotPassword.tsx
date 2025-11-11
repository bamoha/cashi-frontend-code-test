import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForgotPassword } from './useForgotPassword';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Navbar } from '../../../components/Navbar';
import { ArrowLeft } from 'lucide-react';

export function ForgotPassword() {
  const { t, i18n } = useTranslation();
  const { register, onSubmit, formState: { errors }, isLoading, isSubmitted } = useForgotPassword();
  const isRTL: boolean = i18n.language === 'ar';

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-2">
                  {t('forgotPassword.successTitle')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {t('forgotPassword.successMessage')}
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                  {t('forgotPassword.backToLogin')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <Link
                to="/login"
                className={`inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t('forgotPassword.backToLogin')}
              </Link>
              <h2 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-1">
                {t('forgotPassword.title')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t('forgotPassword.subtitle')}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('common.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  {...register('email')}
                  className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600 rounded-md"
              >
                {t('forgotPassword.submitButton')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

