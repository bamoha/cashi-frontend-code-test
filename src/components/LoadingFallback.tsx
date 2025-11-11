import { Loader2 } from 'lucide-react';

export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
}

