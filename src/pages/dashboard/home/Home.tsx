import { useDashboard } from './useDashboard';
import { useUser } from '../../../hooks/useUser';
import { DashboardContent } from './DashboardContent';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardError } from './DashboardError';

export function Home() {
  const { data, isLoading, error } = useDashboard();
  const { data: userData, isLoading: isLoadingUser, error: userError } = useUser();

  return (
    <>
      {(isLoading || isLoadingUser) && <DashboardSkeleton />}
      {(error || userError) && <DashboardError />}
      {data && userData && !isLoading && !isLoadingUser && (
        <div className="animate-[fadeIn_0.5s_ease-in-out,slideUp_0.5s_ease-in-out]">
          <DashboardContent />
        </div>
      )}
    </>
  );
}

