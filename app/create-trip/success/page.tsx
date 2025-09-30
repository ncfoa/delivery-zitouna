'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateTripSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/dashboard/trips');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleViewTrips = () => {
    router.push('/dashboard/trips');
  };

  const handleCreateAnother = () => {
    router.push('/create-trip');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Created Successfully!</h1>
          <p className="text-gray-600">
            Your trip has been published and is now visible to potential package senders.
          </p>
        </div>

        {/* Trip Details Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Trip Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Route:</span>
              <span className="font-medium text-gray-900">Montreal → Toronto</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium text-gray-900">Jan 25, 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Max Packages:</span>
              <span className="font-medium text-gray-900">3 items</span>
            </div>
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span className="font-medium text-gray-900">$25.00</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleViewTrips}
            className="w-full px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#1e90ff' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
          >
            View My Trips
          </button>
          
          <button
            onClick={handleCreateAnother}
            className="w-full px-6 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Create Another Trip
          </button>
        </div>

        {/* Auto-redirect notice */}
        <div className="mt-6 text-sm text-gray-500">
          Redirecting to trips page in {countdown} seconds...
        </div>
      </div>
    </div>
  );
}
