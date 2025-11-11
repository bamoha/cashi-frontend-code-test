import { AxiosError } from 'axios';
import i18n from '../i18n/config';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string; error?: string } | undefined;

      if (data?.message) {
        return data.message;
      }
      if (data?.error) {
        return data.error;
      }

      switch (status) {
        case 400:
          return i18n.t('errors.badRequest');
        case 401:
          return i18n.t('errors.unauthorized');
        case 403:
          return i18n.t('errors.forbidden');
        case 404:
          return i18n.t('errors.notFound');
        case 500:
          return i18n.t('errors.serverError');
        default:
          return i18n.t('errors.requestFailed', { status });
      }
    } else if (error.request) {
      return i18n.t('errors.networkError');
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return i18n.t('errors.unexpectedError');
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as { isAxiosError?: boolean }).isAxiosError === true
  );
}

