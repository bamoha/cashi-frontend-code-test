import { Skeleton } from '../../../components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-[fadeIn_0.3s_ease-in-out]">
      <section className="bg-linear-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 p-6 lg:p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <Skeleton className="h-6 w-6 lg:h-8 lg:w-8 rounded" />
          </div>
          <Skeleton className="h-6 lg:h-8 w-64" />
        </div>
      </section>

      <section className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 p-6 lg:p-8">
        <Skeleton className="h-4 w-32 mb-3" />
        <Skeleton className="h-8 lg:h-10 w-48" />
      </section>

      <section>
        <Skeleton className="h-5 lg:h-6 w-32 mb-4 lg:mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg shadow-green-200/30 dark:shadow-black/30 border border-green-100 dark:border-green-800/50 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
            <Skeleton className="h-7 lg:h-8 w-32" />
          </div>
          <div className="bg-linear-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl shadow-lg shadow-red-200/30 dark:shadow-black/30 border border-red-100 dark:border-red-800/50 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
            <Skeleton className="h-7 lg:h-8 w-32" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <Skeleton className="h-5 lg:h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-3 w-16" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-3 w-12" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-3 w-16" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

