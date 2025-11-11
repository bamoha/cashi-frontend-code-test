import { useTranslation } from 'react-i18next';
import { useUser } from '../../../hooks/useUser';
import { getTimeBasedGreeting } from './utils';

export function WelcomeMessage() {
  const { t } = useTranslation();
  const { data: userData } = useUser();

  if (!userData) {
    return null;
  }

  const hour = new Date().getHours();
  const greeting = getTimeBasedGreeting(hour, t);
  const Icon = greeting.icon;
  const message = `${greeting.text}, ${userData.firstName}!`;

  return (
    <section className="bg-linear-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <Icon className="icon-dance h-6 w-6 lg:h-8 lg:w-8 text-gray-700 dark:text-gray-300" />
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          {message}
        </h1>
      </div>
    </section>
  );
}

