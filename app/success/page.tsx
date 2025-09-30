'use client';

import { useState } from 'react';

export default function Success() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Zitouna</h1>
          </div>
          <div className="text-sm text-gray-600">
            {isLoggedIn ? (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">U</span>
                </div>
              </div>
            ) : (
              <a href="/login" className="hover:text-gray-900" style={{ color: '#1e90ff' }}>
                Sign in
              </a>
            )}
          </div>
        </div>
      </div>

    <div className="max-w-4xl mx-auto px-32 sm:px-40 lg:px-48 pb-32">
      <div className="text-center animate-fade-in">
        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">Booking Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Your delivery request has been successfully submitted. We'll notify you when a traveler is assigned.
        </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="text-gray-900 font-medium">#ZT-2024-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="text-gray-900">New York, NY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="text-gray-900">London, UK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="text-gray-900">2-3 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-gray-900 font-semibold">$24.19</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">1.</span>
                <span>We'll match you with a verified traveler within 30 minutes</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">2.</span>
                <span>You'll receive a notification with traveler details</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">3.</span>
                <span>Track your package in real-time through our app</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Book Another Delivery
            </button>
            <button
              onClick={() => window.location.href = '/tracking'}
              className="px-6 py-3 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              style={{ 
                backgroundColor: '#1e90ff',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1a7ce8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e90ff';
              }}
            >
              Track Package
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Questions? Contact us at <span className="text-blue-600">support@zitouna.com</span></p>
            <p className="mt-2">We'll send you email updates about your delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
