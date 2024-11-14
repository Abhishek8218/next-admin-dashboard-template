"use client";

import { forwardRef, InputHTMLAttributes} from "react";

// Define props interface for the TextBox
interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  errormessage?: string;
  label?: string;
}

// ForwardRef TextBox component
export const SearchBox = forwardRef<HTMLInputElement, TextBoxProps>(
  ({ errormessage, label, required, ...inputProps }, ref) => {
    return (
      <div className="w-full h-[78px]">
        {label && (
          <label className="text-xs text-gray-500">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...inputProps} // Spread only valid input props
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

SearchBox.displayName = "SearchBox";
