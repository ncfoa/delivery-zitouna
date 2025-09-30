'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Trips() {
  const router = useRouter();
  
  const [trips] = useState([
    {
      id: '1',
      from: 'Montreal, QC',
      to: 'Toronto, ON',
      date: '2024-01-20',
      time: '14:30',
      status: 'Active',
      earnings: '$45.00',
      distance: '540 km',
      duration: '5h 30m'
    },
    {
      id: '2',
      from: 'Toronto, ON',
      to: 'Vancouver, BC',
      date: '2024-01-15',
      time: '09:15',
      status: 'Completed',
      earnings: '$120.00',
      distance: '4,200 km',
      duration: '2 days'
    },
    {
      id: '3',
      from: 'Vancouver, BC',
      to: 'Calgary, AB',
      date: '2024-01-10',
      time: '16:45',
      status: 'Completed',
      earnings: '$85.00',
      distance: '680 km',
      duration: '8h 15m'
    }
  ]);

  const handleTripClick = (id: string) => {
    router.push(`/dashboard/trips/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Trips</h1>
      </div>

      <div className="space-y-3 max-w-lg">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip.id)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-medium text-gray-900">{trip.from} → {trip.to}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-0.5">{trip.date} at {trip.time}</p>
                <p className="text-sm text-gray-600">
                  {trip.distance} • {trip.duration} • {trip.earnings}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
