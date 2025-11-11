import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { useTranslation } from "react-i18next"

interface DatePickerProps {
  value?: string; // ISO date string (YYYY-MM-DD)
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
  startIcon?: React.ReactNode;
}

export function DatePicker({ value, onChange, placeholder, className, startIcon }: DatePickerProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [open, setOpen] = React.useState(false);
  const date = value ? new Date(value) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onChange?.(formattedDate);
    } else {
      onChange?.(undefined);
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined);
  };

  const icon = startIcon ?? <CalendarIcon className="icon-dance h-4 w-4" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "w-full justify-start text-left font-normal text-sm",
            "data-[empty=true]:text-gray-400 dark:data-[empty=true]:text-gray-400",
            !date ? "text-gray-400 dark:text-gray-400" : "text-gray-900 dark:text-white",
            "hover:scale-100 hover:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <span className={isRTL ? "ml-2" : "mr-2"}>{icon}</span>
          {date ? format(date, "PPP") : <span>{placeholder || t('transactions.datePlaceholder')}</span>}
          {date && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "ml-auto cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
                isRTL && "mr-auto ml-0"
              )}
              aria-label="Clear date"
            >
              <X className="icon-dance h-4 w-4" />
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-0" align="start" sideOffset={5} alignOffset={-10}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="rounded-md shadow-sm"
        />
      </PopoverContent>
    </Popover>
  );
}
