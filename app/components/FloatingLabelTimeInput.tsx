'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingLabelTimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FloatingLabelTimeInput({
  label,
  value,
  onChange,
  className = ''
}: FloatingLabelTimeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timePickerRef = useRef<HTMLDivElement>(null);

  const formatTime = (hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeString: string) => {
    if (!timeString) return { hours: 12, minutes: 0 };
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours: hours || 12, minutes: minutes || 0 };
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    const formattedTime = formatTime(hours, minutes);
    onChange(formattedTime);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay closing to allow time picker clicks
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Close time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderTimePicker = () => {
    const { hours, minutes } = parseTime(value);
    
    const hoursList = Array.from({ length: 24 }, (_, i) => i);
    const minutesList = Array.from({ length: 60 }, (_, i) => i);
    
    return (
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-2 text-center">Hours</div>
          <div className="max-h-32 overflow-y-auto border border-gray-200 rounded">
            {hoursList.map((hour) => (
              <button
                key={hour}
                onClick={() => handleTimeSelect(hour, minutes)}
                className={`w-full px-3 py-1 text-sm text-left hover:bg-gray-100 transition-colors duration-200 ${
                  hour === hours ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                }`}
              >
                {hour.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-2 text-center">Minutes</div>
          <div className="max-h-32 overflow-y-auto border border-gray-200 rounded">
            {minutesList.map((minute) => (
              <button
                key={minute}
                onClick={() => handleTimeSelect(hours, minute)}
                className={`w-full px-3 py-1 text-sm text-left hover:bg-gray-100 transition-colors duration-200 ${
                  minute === minutes ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                }`}
              >
                {minute.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-0 focus:border-blue-500 hover:border-black transition-colors duration-200 ${
            isFocused ? 'border-blue-500' : ''
          }`}
          style={{ borderColor: isFocused ? '#1e90ff' : undefined }}
        />
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            isFocused || value
              ? 'top-0 text-xs text-gray-500 -translate-y-1/2 bg-white px-1'
              : 'top-2 text-xs text-gray-500'
          }`}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div
          ref={timePickerRef}
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-64"
        >
          <div className="text-sm font-medium text-gray-900 mb-3 text-center">Select Time</div>
          {renderTimePicker()}
        </div>
      )}
    </div>
  );
}
