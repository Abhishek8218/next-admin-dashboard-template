"use client";

import { ChevronDown } from "lucide-react";

interface ISelectBox {
  errormessage?: string;
  label?: string;
  required?: boolean;
  options?: string[]; // Dynamic options prop to pass select options
  value?: string; // To manage selected value
  onChange?: (value: string) => void; // Callback to handle change
  placeholder?: string;
  disabled?:boolean // Added placeholder for default disabled option
}

export const SelectBox: React.FC<ISelectBox> = ({
  errormessage,
  label,
  required,
  options, 
  value,
  onChange,
  placeholder = "Select an option", 
  disabled
}) => {
  return (
    <div className="w-full h-[78px]">
      {/* Label */}
      {label && (
        <label className="text-xs text-gray-500">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Box */}
      <div className="relative w-full flex items-center justify-between h-fit">
        <select
          value={value} // Controlled value
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled} // Handle change
          className="rounded-sm focus:ring-blue-400 mt-1 flex-1 w-full justify-between ring-1 ring-gray-400 h-[30px] pl-1.5 pr-8 text-sm text-gray-950 outline-none appearance-none"
        >
          {/* Default disabled placeholder */}
          <option value=""  defaultChecked>
            {placeholder}
          </option>

          {/* Map options dynamically */}
          {options?.map?.((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div className="absolute right-1 pointer-events-none">
          <ChevronDown size={20} color="#262626" strokeWidth={1.75} />
        </div>
      </div>

      {/* Error Message */}
      {errormessage && (
        <p id="error-message" className="mt-1 text-xs text-red-600">
          {errormessage}
        </p>
      )}
    </div>
  );
};
