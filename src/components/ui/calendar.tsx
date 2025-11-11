import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react'
import * as React from 'react'
import { DayFlag, DayPicker, SelectionState, UI } from 'react-day-picker'

import { cn } from '../../lib/utils'

import { buttonVariants } from './button-variants'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        [UI.Months]: 'relative',
        [UI.Month]: 'space-y-4 ml-0',
        [UI.MonthCaption]: 'flex justify-between items-center h-7 relative px-1',
        [UI.CaptionLabel]: 'text-sm font-medium flex-1 text-center pointer-events-none',
        [UI.MonthGrid]: 'w-full border-collapse space-y-1',
        [UI.Weekdays]: 'flex',
        [UI.Weekday]:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        [UI.Week]: 'flex w-full mt-2',
        [UI.Day]:
          'h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        [UI.DayButton]: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary hover:text-primary-foreground'
        ),
        [SelectionState.range_end]: 'day-range-end',
        [SelectionState.selected]:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        [SelectionState.range_middle]:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        [DayFlag.today]: 'bg-accent text-accent-foreground',
        [DayFlag.outside]:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        [DayFlag.disabled]: 'text-muted-foreground opacity-50',
        [DayFlag.hidden]: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => <Chevron {...props} />,
        PreviousMonthButton: ({ ...props }) => (
          <button
            {...props}
            type="button"
            className={cn(
              'h-7 w-7 p-0',
              'flex items-center justify-center',
              'text-gray-600 dark:text-gray-400',
              'hover:text-gray-900 dark:hover:text-gray-100',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'rounded-md transition-colors',
              'shrink-0',
              'relative z-10',
              'cursor-pointer'
            )}
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="h-4 w-4 pointer-events-none" />
          </button>
        ),
        NextMonthButton: ({ ...props }) => (
          <button
            {...props}
            type="button"
            className={cn(
              'h-7 w-7 p-0',
              'flex items-center justify-center',
              'text-gray-600 dark:text-gray-400',
              'hover:text-gray-900 dark:hover:text-gray-100',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'rounded-md transition-colors',
              'shrink-0',
              'relative z-10',
              'cursor-pointer'
            )}
            aria-label="Next month"
          >
            <ChevronRightIcon className="h-4 w-4 pointer-events-none" />
          </button>
        ),
      }}
      {...props}
    />
  )
}

const Chevron = ({ orientation = 'left' }) => {
  switch (orientation) {
    case 'left':
      return <ChevronLeftIcon className="icon-dance h-4 w-4" />
    case 'right':
      return <ChevronRightIcon className="icon-dance h-4 w-4" />
    case 'up':
      return <ChevronUpIcon className="icon-dance h-4 w-4" />
    case 'down':
      return <ChevronDownIcon className="icon-dance h-4 w-4" />
    default:
      return null
  }
}