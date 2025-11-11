import { Skeleton } from '../../../../components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';

export function TransactionsSkeleton() {
  return (
    <div className="overflow-x-auto animate-[fadeIn_0.3s_ease-in-out]">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-700">
            <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <Skeleton className="h-4 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

