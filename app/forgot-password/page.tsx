'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pb-32">
      {/* Top Navigation */}
      <div className="absolute top-0 right-0 p-6">
        <div className="text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="font-medium hover:opacity-80" style={{ color: '#1e90ff' }}>
            Sign in
          </a>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors"
                style={{ 
                  '--tw-border-opacity': '1'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1e90ff';
                  e.target.style.borderWidth = '1px';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgb(209 213 219)';
                  e.target.style.borderWidth = '1px';
                }}
                onMouseEnter={(e) => {
                  if (document.activeElement !== e.target) {
                    e.target.style.borderColor = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  if (document.activeElement !== e.target) {
                    e.target.style.borderColor = 'rgb(209 213 219)';
                  }
                }}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Reset Password Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: isLoading ? '#1a7ce8' : '#1e90ff',
                '&:hover': { backgroundColor: '#1a7ce8' }
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#1a7ce8';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#1e90ff';
                }
              }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending reset link...
                </div>
              ) : (
                'Reset password'
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <a 
              href="/login" 
              className="text-sm font-medium hover:opacity-80" 
              style={{ color: '#1e90ff' }}
            >
              ← Back to sign in
            </a>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
