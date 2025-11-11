import { Skeleton } from '../../../../components/ui/skeleton';

export function TransactionDetailSkeleton() {
  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

