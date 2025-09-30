'use client';

import { useState, useRef, useEffect } from 'react';

interface PINInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function PINInput({
  length = 4,
  value,
  onChange,
  label = 'PIN Code',
  disabled = false,
  className = '',
}: PINInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) return; // Only allow single digit
    
    const newDigits = [...digits];
    newDigits[index] = newValue;
    const newValueString = newDigits.join('');
    onChange(newValueString);

    // Auto-focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    // Focus the last filled input or the first empty one
    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex justify-center space-x-3">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digits[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            disabled={disabled}
            className={`w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
              focusedIndex === index ? 'border-blue-500' : 'hover:border-black'
            }`}
            style={{
              borderColor: focusedIndex === index ? '#1e90ff' : undefined
            }}
          />
        ))}
      </div>
    </div>
  );
}
