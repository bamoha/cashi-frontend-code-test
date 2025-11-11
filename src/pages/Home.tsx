import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4">{t('common.welcome')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('common.authenticated')}</p>
          <Button onClick={handleLogout} className="w-full">
            {t('common.signOut')}
          </Button>
        </div>
      </div>
    </div>
  );
}

