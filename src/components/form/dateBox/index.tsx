import { forwardRef, InputHTMLAttributes,} from "react";

// Define props interface for the TextBox
interface TextBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  errormessage?: string;
  label?: string;
  value: Date | string;
  onChange: (date: Date) => void; // Change the onChange type to pass Date
}

// Helper function to format Date to YYYY-MM-DD
const formatDate = (date: Date | string) => {
  if (!date) return ""; // If date is undefined or null, return an empty string
  if (typeof date === 'string') return date; // If it's already a string, return it
  if (date instanceof Date && !isNaN(date.getTime())) { // Check if it's a valid Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return ""; // Return an empty string if the date is invalid
};

// ForwardRef DateBox component
export const DateBox = forwardRef<HTMLInputElement, TextBoxProps>(
  ({ errormessage, label, required, value, onChange, ...inputProps }, ref) => {
    // Handle date change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value ? new Date(e.target.value) : null;
      if (newDate && !isNaN(newDate.getTime())) { // Check if the new date is valid
        onChange(newDate);
      }
    };

    return (
      <div className="w-full h-[78px]">
        {label && (
          <label className="text-xs text-gray-500">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...inputProps}
          type="date" // Use input type date
          value={formatDate(value)} // Format Date object to string
          onChange={handleDateChange} // Handle date change
          className="rounded-sm focus:ring-blue-400 mt-1 flex-1 w-full justify-between ring-1 ring-gray-400 h-[30px] pl-1.5 pr-2 text-sm text-gray-950 outline-none appearance-none"
          aria-invalid={!!errormessage}
          aria-describedby={errormessage ? "error-message" : undefined}
        />
        {errormessage && (
          <p id="error-message" className="mt-1 text-xs text-red-600">
            {errormessage}
          </p>
        )}
      </div>
    );
  }
);

DateBox.displayName = "DateBox";
