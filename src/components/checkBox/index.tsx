import React from 'react'

interface CustomCheckboxProps {
  id?: string
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const  CustomCheckbox = ({ id, label, checked, onChange, disabled = false }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`
          w-6 h-6 border-2 rounded-md
          ${disabled
            ? 'border-gray-300 bg-gray-100'
            : checked
              ? 'border-blue-600 bg-blue-600'
              : 'border-gray-300 bg-white'
          }
          peer-focus:ring-2 peer-focus:ring-blue-300
          peer-checked:after:opacity-100
          after:content-[''] after:absolute after:opacity-0
          after:top-[3px] after:left-[7px] after:w-[6px] after:h-[10px]
          after:border-r-2 after:border-b-2 after:border-white after:rotate-45
          transition-all duration-200 ease-in-out
        `}
        ></div>
      </div>
{
   label &&   <label
        htmlFor={id}
        className={`ml-2 text-sm font-medium ${
          disabled ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {label}
      </label>
}

    </div>
  )
}