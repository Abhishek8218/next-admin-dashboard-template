import React, { useState, useEffect } from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: string
  className?: string
  containerClassName?: string
  labelClassName?: string
  required?: boolean
  maxLength?: number
  minLength?: number
  showCharCount?: boolean
  placeholder?: string
}

export default function TextArea({
  label,
  error,
  success,
  className = '',
  containerClassName = '',
 
  required,
  maxLength,
  minLength,
  showCharCount = false,
  placeholder,
  ...props
}: TextAreaProps) {
  const [charCount, setCharCount] = useState(0)
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    if (props.value) {
      setCharCount(props.value.toString().length)
    }
  }, [props.value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setCharCount(value.length)

    if (minLength && value.length < minLength) {
      setValidationMessage(`Minimum ${minLength} characters required`)
    } else if (maxLength && value.length > maxLength) {
      setValidationMessage(`Maximum ${maxLength} characters allowed`)
    } else {
      setValidationMessage('')
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const baseTextareaClasses = `mt-1 block w-full h-[100px] px-3 py-2 bg-white ring-1 ring-gray-400 rounded-sm text-sm shadow-sm placeholder-gray-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none`

  const errorClasses = error ? 'border-red-500 text-red-600' : ''
  const successClasses = success ? 'border-green-500 text-green-600' : ''

  return (
    <div className={`mb-4 w-full  ${containerClassName}`}>
       {label && (
        <label className="text-xs text-gray-500 ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        {...props}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${baseTextareaClasses} ${errorClasses} ${successClasses} ${className}`}
      />
      {showCharCount && (
        <div className="mt-1 text-sm text-gray-500">
          {charCount} / {maxLength || 'unlimited'} characters
        </div>
      )}
      {validationMessage && (
        <p className="mt-1 text-sm text-red-600">{validationMessage}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-1 text-sm text-green-600">{success}</p>}
    </div>
  )
}
