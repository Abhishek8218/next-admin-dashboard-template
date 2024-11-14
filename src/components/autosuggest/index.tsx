'use client'

import { Search, X } from 'lucide-react'
import React, { forwardRef, useState, useImperativeHandle, ChangeEvent, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'

export type MemberSuggestion = {
  id: string
  name: string
  image?: string
  mobileNumber?: string // Add mobileNumber number here
  node?: ReactNode
}

type SearchBarProps = {
  label?: string
  suggestions: MemberSuggestion[]
  defaultSuggestions?: MemberSuggestion[] // Add default suggestions prop
  onSelect?: (value: MemberSuggestion) => void
  placeholder?: string
  emptySearchBar?: boolean
  displayQuery?: 'id' | 'name'
  onSearchBarFocus?: () => void
  onChange?: (value: string) => void
  disabled?: boolean
}

type SearchBarHandle = {
  focus: () => void
}

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
  ({ suggestions, defaultSuggestions, onSelect, placeholder, label, emptySearchBar, displayQuery, onSearchBarFocus, onChange,disabled }, ref) => {
    const [query, setQuery] = useState('')
    const [filteredSuggestions, setFilteredSuggestions] = useState<MemberSuggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [debouncedQuery, setDebouncedQuery] = useState(query)
    const [justSelected, setJustSelected] = useState(false)

    const searchBarRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        const input = document.getElementById('search-input') as HTMLInputElement
        input?.focus()
      }
    }))

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query)
      }, 300)

      return () => {
        clearTimeout(handler)
      }
    }, [query])

    useEffect(() => {
      if (debouncedQuery && !justSelected) {
        setFilteredSuggestions(
          suggestions.filter((suggestion) =>
            suggestion.name.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        )
        setTimeout(() => {
          setShowSuggestions(debouncedQuery.length > 0)
        }, 100)
      } else {
        setFilteredSuggestions([])
        setShowSuggestions(false)
      }
    }, [debouncedQuery, suggestions, justSelected])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
      if (justSelected) {
        setJustSelected(false)
        return
      }
      setQuery(e.target.value)
    }

    const handleFocus = () => {
      if (onSearchBarFocus) {
        onSearchBarFocus();
      }
      if (!query) {
        if (defaultSuggestions) {
          setFilteredSuggestions(defaultSuggestions); // Show default suggestions
        }
        setShowSuggestions(true)
      }
    }

    const handleBlur = () => {
      setShowSuggestions(false)
    }

    const handleSelect = (value: MemberSuggestion) => {
      if (emptySearchBar) setQuery('')
      else setQuery(displayQuery === 'id' ? value.id : value.name)

      setFilteredSuggestions([])
      setShowSuggestions(false)
      setJustSelected(true)
      console.log('value', value)

      if (onSelect) {
        onSelect(value);
      }

      const input = document.getElementById('search-input') as HTMLInputElement
      if (input) {
        input.blur()
        setTimeout(() => {
          input.focus()
        }, 100)
      }
    }

    return (
      <div ref={searchBarRef} className="relative w-full">
        <div className="relative">
          {label && (
            <label className="text-xs text-gray-500">
              {label}
            </label>
          )}
          <input
            id="search-input"
            type="text"
            value={query}
            disabled={disabled}
            onChange={handleChange}
            onClick={handleFocus} // Handle focus
            onBlur={handleBlur} // Handle blur
            className="rounded-sm focus:ring-blue-400 mt-1 flex-1 w-full justify-between ring-1 ring-gray-400 h-[30px] pl-1.5 pr-2 text-sm text-gray-950 outline-none appearance-none"
            placeholder={placeholder || 'Search...'}
          />
          <div className="absolute right-2 top-11 transform -translate-y-1/2 flex items-center">
            <Search size={18} className="text-gray-400" />
          </div>
          {query && (
            <div className="absolute right-2 top-11 transform -translate-y-1/2 flex items-center">
              <button
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X size={18} />
              </button>
              <span className="mx-1 mt-[-5px] text-gray-300">|</span>
              <Search size={18} className="text-gray-400" />
            </div>
          )}
        </div>

        {showSuggestions && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-md max-h-96 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  onMouseDown={() => {
                    console.log('suggestion', suggestion)
                    console.log("clicked")
                    handleSelect(suggestion)}}
                >
                  <div className="flex items-center space-x-3"  onClick={() => {
                    console.log('suggestion', suggestion)
                    console.log("clicked")
                    handleSelect(suggestion)}}>
                    <div className="relative">
                      {suggestion.image && (
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-medium text-gray-800">
                        <HighlightedText text={suggestion.name} query={query} />
                      </p>
                      {suggestion.mobileNumber && (
                        <p className="text-xs text-gray-500">
                          {`xxxxxx${suggestion.mobileNumber.slice(-4)}`} {/* Show masked mobileNumber number */}
                        </p>
                      )}
                    </div>
                    {suggestion.node}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">No suggestions</li>
            )}
          </ul>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

type HighlightedTextProps = {
  text: string
  query: string
}

const HighlightedText = ({ text, query }: HighlightedTextProps) => {
  if (!query) return <>{text}</>

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  )
}

export default SearchBar
