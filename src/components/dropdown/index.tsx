"use client";

import { useState, useEffect, useRef } from "react";

// Define the types of props for the component
interface DropDownProps {
  data: string[]; // Array of items to display in the dropdown
  onSelectValue?: (value: string) => void;
}

export const DropDown = ({ data, onSelectValue }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggles the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selection of a value
  const handleSelect = (value: string) => {
    onSelectValue?.(value);
    setIsOpen(false); // Close the dropdown after selecting
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>

      {isOpen && (
        <div className="dropdown-content">
          {/* Map over the dynamic data to create dropdown items */}
          {data.map((item, index) => (
            <p key={index} onClick={() => handleSelect(item)}>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
