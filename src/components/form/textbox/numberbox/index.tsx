"use client";

import React, { useState } from 'react';

interface NumberBoxProps {
  value?: number | string;
  onChange?: (value: number) => void;
  maxLength?: number;
  minLength?: number;
  label?: string;
  placeholder?: string;
  errormessage?: string;
  required?: boolean;
  disabled?: boolean;
  allowFloat?: boolean; // New prop to allow float values
}

export const NumberBox: React.FC<NumberBoxProps> = ({
  value = '', // Default value is an empty string
  onChange,
  maxLength,
  minLength, // Added minLength handling
  placeholder,
  label,
  errormessage,
  required,
  disabled,
  allowFloat = false // Default to false if not provided
}) => {
  const [error, setError] = useState<string | null>(null); // Local state for error message

  // Handle the input change to allow numbers or floats
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Regex: Allow only positive integers or floats based on allowFloat prop
    const numberRegex = allowFloat ? /^[0-9]*\.?[0-9]*$/ : /^\d*$/;

    if (numberRegex.test(inputValue)) {
      if (!maxLength || inputValue.length <= maxLength) {
        onChange?.(Number(inputValue)); // Convert input value to number
        setError(null); // Clear error during typing
      }
    }
  };

  // Validate minLength onBlur event
  const handleBlur = () => {
    if (minLength && value && String(value).length < minLength) {
      setError(`Minimum length is ${minLength} digits.`);
    } else {
      setError(null); // Clear error if valid
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
        type="number"
        value={value === 0 ? '' : value} 
        disabled={disabled}
        onChange={handleInputChange}
        onBlur={handleBlur} // Validate on blur
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        className="rounded-sm focus:ring-blue-400 mt-1 flex-1 w-full justify-between ring-1 ring-gray-400 h-[30px] pl-1.5 pr-2 text-sm text-gray-950 outline-none appearance-none"
      />
      {error && (
        <p id="error-message" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
      {errormessage && !error && (
        <p id="error-message" className="mt-1 text-xs text-red-600">
          {errormessage}
        </p>
      )}
    </div>
  );
};
