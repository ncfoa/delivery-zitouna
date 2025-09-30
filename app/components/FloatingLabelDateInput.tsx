'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingLabelDateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  className?: string;
}

export default function FloatingLabelDateInput({
  label,
  value,
  onChange,
  min,
  max,
  className = ''
}: FloatingLabelDateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getCurrentDate = () => {
    return new Date();
  };

  const getDateFromValue = (value: string) => {
    return value ? new Date(value) : getCurrentDate();
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    onChange(formattedDate);
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
    // Delay closing to allow calendar clicks
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCalendar = () => {
    const currentDate = getDateFromValue(value);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = getCurrentDate();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = formatDate(date) === formatDate(today);
      const isSelected = formatDate(date) === value;
      const isDisabled = (min && formatDate(date) < min) || (max && formatDate(date) > max);
      
      days.push(
        <button
          key={i}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600 font-medium'
              : isCurrentMonth
              ? 'text-gray-900 hover:bg-gray-100'
              : 'text-gray-400'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {date.getDate()}
        </button>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = getDateFromValue(value);
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-80"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">
              {monthName} {year}
            </h3>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-xs text-gray-500 text-center py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
}
