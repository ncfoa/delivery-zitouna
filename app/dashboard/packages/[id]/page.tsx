'use client';

import { useRouter } from 'next/navigation';
import { useState, use } from 'react';

export default function PackageTracking({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock package data - in real app, fetch by ID
  const packageData = {
    id: id,
    name: 'Documents Package',
    description: 'Important documents and papers',
    weight: '0.5kg',
    status: 'In Transit',
    trackingNumber: 'ZT123456789',
    date: '2024-01-15',
    estimatedDelivery: '2024-01-18',
    currentLocation: 'Montreal, QC',
    destination: 'Toronto, ON'
  };

  const trackingHistory = [
    {
      id: '1',
      status: 'Package Delivered',
      location: 'Toronto, ON',
      timestamp: '2024-01-18 14:30',
      description: 'Package has been successfully delivered to the recipient.'
    },
    {
      id: '2',
      status: 'Out for Delivery',
      location: 'Toronto, ON',
      timestamp: '2024-01-18 08:15',
      description: 'Package is out for delivery and will arrive today.'
    },
    {
      id: '3',
      status: 'In Transit',
      location: 'Montreal, QC',
      timestamp: '2024-01-17 16:45',
      description: 'Package is in transit to destination.'
    },
    {
      id: '4',
      status: 'Package Received',
      location: 'Montreal, QC',
      timestamp: '2024-01-15 10:20',
      description: 'Package has been received and is being processed.'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Package Delivered':
        return 'bg-green-100 text-green-800';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Package Received':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Package Tracking</h1>
      </div>

      {/* Package Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{packageData.name}</h2>
            <p className="text-gray-600 mb-1">{packageData.description}</p>
            <p className="text-sm text-gray-500">Tracking: {packageData.trackingNumber}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(packageData.status)}`}>
              {packageData.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-700 font-medium">Weight:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.weight}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Current Location:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.currentLocation}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Destination:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.destination}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Estimated Delivery:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Tracking History */}
      <div className="max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Tracking History</h3>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            <svg 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {trackingHistory.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-green-500' : 
                  index === 1 ? 'bg-blue-500' : 
                  'bg-gray-300'
                }`}></div>
                {index < trackingHistory.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{event.status}</h4>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                <p className="text-xs text-gray-500">{event.location} • {event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
