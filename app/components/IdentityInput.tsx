'use client';

import { useState } from 'react';

interface IdentityInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  type: 'passport' | 'id_card' | 'driver_license';
  className?: string;
}

export default function IdentityInput({
  id,
  value,
  onChange,
  label,
  type,
  className = ''
}: IdentityInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getPlaceholder = () => {
    switch (type) {
      case 'passport':
        return 'A1234567';
      case 'id_card':
        return '123456789';
      case 'driver_license':
        return 'D123456789';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'passport':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'id_card':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        );
      case 'driver_license':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const isFloating = value || isFocused;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className={`w-full px-3 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-0 focus:border-blue-500 hover:border-black transition-colors duration-200 ${
            isFocused ? 'border-blue-500' : ''
          }`}
          style={{ borderColor: isFocused ? '#1e90ff' : undefined }}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {getIcon()}
        </div>
        <label
          className={`absolute left-10 transition-all duration-200 pointer-events-none ${
            isFloating
              ? 'top-0 text-xs text-gray-500 -translate-y-1/2 bg-white px-1'
              : 'top-2 text-xs text-gray-500'
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
