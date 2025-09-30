'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingLabelSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function FloatingLabelSelect({
  id,
  value,
  onChange,
  label,
  options,
  required = false,
  className = '',
  disabled = false,
}: FloatingLabelSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const isFloating = value || isFocused || isOpen;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 hover:border-black transition-all duration-200 text-gray-900 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
          isOpen ? 'border-gray-400' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={disabled ? -1 : 0}
        style={{
          borderColor: isFocused ? '#1e90ff' : undefined
        }}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : ' '}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          isFloating
            ? 'top-0 text-xs text-gray-500 -translate-y-1/2 bg-white px-1'
            : 'top-2 text-xs text-gray-500'
        }`}
      >
        {label}
      </label>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
