'use client';

import { useState } from 'react';

interface TicketInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  type: 'flight' | 'train' | 'bus';
  className?: string;
}

export default function TicketInput({
  id,
  value,
  onChange,
  label,
  type,
  className = ''
}: TicketInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getPlaceholder = () => {
    switch (type) {
      case 'flight':
        return 'AC123';
      case 'train':
        return 'VIA123';
      case 'bus':
        return 'G123456';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'flight':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'train':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'bus':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
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
