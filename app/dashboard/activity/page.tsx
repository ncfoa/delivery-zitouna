'use client';

import { useState } from 'react';

export default function Activity() {
  const [displayCount, setDisplayCount] = useState(5);
  
  const allActivities = [
    {
      id: '1',
      type: 'trip_completed',
      title: 'Trip Completed',
      description: 'Successfully delivered packages from Montreal to Toronto',
      timestamp: '2 hours ago',
      status: 'completed',
      earnings: '$45.00'
    },
    {
      id: '2',
      type: 'package_received',
      title: 'Package Received',
      description: 'New package from John Smith - Electronics Package',
      timestamp: '1 day ago',
      status: 'processing'
    },
    {
      id: '3',
      type: 'payment_received',
      title: 'Payment Received',
      description: 'Earnings from trip #TR-001 deposited to your account',
      timestamp: '2 days ago',
      status: 'completed',
      amount: '$45.00'
    },
    {
      id: '4',
      type: 'trip_started',
      title: 'Trip Started',
      description: 'Started journey from Montreal to Vancouver',
      timestamp: '3 days ago',
      status: 'active'
    },
    {
      id: '5',
      type: 'package_delivered',
      title: 'Package Delivered',
      description: 'Delivered Documents Package to Sarah Johnson in Toronto',
      timestamp: '4 days ago',
      status: 'completed'
    },
    {
      id: '6',
      type: 'trip_cancelled',
      title: 'Trip Cancelled',
      description: 'Trip from Toronto to Montreal was cancelled by customer',
      timestamp: '1 week ago',
      status: 'cancelled'
    },
    {
      id: '7',
      type: 'rating_received',
      title: 'Rating Received',
      description: 'Received 5-star rating from customer for excellent service',
      timestamp: '1 week ago',
      status: 'completed',
      rating: '5.0'
    },
    {
      id: '8',
      type: 'profile_updated',
      title: 'Profile Updated',
      description: 'Updated your travel preferences and availability',
      timestamp: '2 weeks ago',
      status: 'completed'
    }
  ];

  const activities = allActivities.slice(0, displayCount);
  const hasMore = displayCount < allActivities.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 5, allActivities.length));
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Activity</h1>
        <p className="text-gray-600 mt-2">Your recent activity and updates</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
            <div className="flex items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-medium text-gray-900">{activity.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  {activity.earnings && (
                    <span className="text-sm font-medium text-green-600">+{activity.earnings}</span>
                  )}
                  {activity.amount && (
                    <span className="text-sm font-medium text-green-600">+{activity.amount}</span>
                  )}
                  {activity.rating && (
                    <span className="text-sm font-medium text-yellow-600">⭐ {activity.rating}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 max-w-2xl">
          <button 
            onClick={handleLoadMore}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Load More Activity
          </button>
        </div>
      )}
    </div>
  );
}
