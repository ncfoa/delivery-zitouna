'use client';

import { useState } from 'react';

export default function Login() {
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
      <div className="absolute top-0 right-0 p-6 animate-fade-in">
        <div className="text-sm text-gray-600">
          Not a member yet?{' '}
          <a href="#" className="font-medium hover:opacity-80 transition-opacity duration-200" style={{ color: '#1e90ff' }}>
            Join
          </a>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 animate-slide-up">
        {/* Welcome Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
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
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
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
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-2 border-gray-300 rounded"
                  style={{ 
                    accentColor: '#1e90ff',
                    '&:focus': { ringColor: '#1e90ff' }
                  }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium hover:opacity-80" style={{ color: '#1e90ff' }}>
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
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
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Login with Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
              </svg>
              <span className="ml-2">Login with Microsoft</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
              <span className="ml-2">Login with Facebook</span>
            </button>
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
