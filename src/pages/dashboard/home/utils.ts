import { Sun, SunMedium, Moon, Sunrise } from 'lucide-react';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export type GreetingInfo = {
  text: string;
  icon: typeof Sun;
};

export function getTimeBasedGreeting(hour: number, t: (key: string) => string): GreetingInfo {
  if (hour >= 5 && hour < 12) {
    return {
      text: t('dashboard.goodMorning'),
      icon: Sunrise,
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      text: t('dashboard.goodAfternoon'),
      icon: SunMedium,
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      text: t('dashboard.goodEvening'),
      icon: Sun,
    };
  } else {
    return {
      text: t('dashboard.goodNight'),
      icon: Moon,
    };
  }
}

