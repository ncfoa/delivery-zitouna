'use client';

import { useState } from 'react';

interface FloatingLabelInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function FloatingLabelInput({
  id,
  type = 'text',
  value,
  onChange,
  label,
  placeholder = ' ',
  required = false,
  className = '',
  disabled = false,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = value || isFocused;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.target.style.borderColor = '#1e90ff';
          setIsFocused(true);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '';
          setIsFocused(false);
        }}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 hover:border-black transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{
          ...(type === 'number' && {
            MozAppearance: 'textfield',
            WebkitAppearance: 'none',
          })
        }}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-2 text-sm transition-all duration-200 pointer-events-none ${
          isFloating
            ? 'text-gray-500 text-xs -translate-y-4 bg-white px-1 -translate-x-1'
            : 'text-gray-500'
        }`}
      >
        {label}
      </label>
    </div>
  );
}
