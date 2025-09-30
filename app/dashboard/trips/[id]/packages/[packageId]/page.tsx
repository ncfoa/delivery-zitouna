'use client';

import { useRouter } from 'next/navigation';
import { useState, use } from 'react';

export default function PackageDetail({ params }: { params: Promise<{ id: string; packageId: string }> }) {
  const router = useRouter();
  const { id, packageId } = use(params);
  const [isLoading, setIsLoading] = useState(false);

  // Mock package data - in real app, fetch by ID
  const packageData = {
    id: packageId,
    tripId: id,
    name: 'Electronics Package',
    description: 'Laptop and accessories',
    weight: '2.1 kg',
    status: 'In Transit',
    currentLocation: 'Montreal, QC',
    destination: 'Toronto, ON',
    estimatedDelivery: '2024-01-20',
    customerName: 'John Smith',
    customerPhone: '+1 (514) 123-4567',
    customerEmail: 'john.smith@email.com',
    pickupAddress: '123 Maple St, Montreal, QC H1X 1X1',
    deliveryAddress: '789 Oak Ave, Toronto, ON M1M 1M1',
    specialInstructions: 'Handle with care - fragile electronics',
    trackingNumber: 'ZT987654321',
    history: [
      { id: '1', status: 'Package Delivered', location: 'Toronto, ON', timestamp: '2024-01-18 14:30' },
      { id: '2', status: 'Out for Delivery', location: 'Toronto, ON', timestamp: '2024-01-18 08:15' },
      { id: '3', status: 'In Transit', location: 'Montreal, QC', timestamp: '2024-01-17 16:45' },
      { id: '4', status: 'Package Received', location: 'Montreal, QC', timestamp: '2024-01-15 10:20' },
    ]
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
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Tracking information refreshed!');
    }, 1500);
  };

  const handleContactCustomer = () => {
    alert(`Contacting customer: ${packageData.customerName} at ${packageData.customerPhone}`);
  };

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 mr-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Package Details ({packageData.trackingNumber})</h1>
      </div>

      {/* Package Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{packageData.name}</h2>
            <p className="text-sm text-gray-600">{packageData.description}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(packageData.status)}`}>
            {packageData.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
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

      {/* Customer Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-700 font-medium">Name:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.customerName}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Phone:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.customerPhone}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-700 font-medium">Email:</span>
            <span className="ml-2 text-gray-900 font-semibold">{packageData.customerEmail}</span>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
        <div className="space-y-4">
          <div>
            <span className="text-gray-700 font-medium">Pickup Address:</span>
            <p className="text-gray-900 font-semibold mt-1">{packageData.pickupAddress}</p>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Delivery Address:</span>
            <p className="text-gray-900 font-semibold mt-1">{packageData.deliveryAddress}</p>
          </div>
          {packageData.specialInstructions && (
            <div>
              <span className="text-gray-700 font-medium">Special Instructions:</span>
              <p className="text-gray-900 font-semibold mt-1">{packageData.specialInstructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={handleContactCustomer}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200"
          style={{ backgroundColor: '#1e90ff' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
        >
          Contact Customer
        </button>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>

      {/* Tracking History */}
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
        <div className="relative pl-4">
          {packageData.history.map((event, index) => (
            <div key={event.id} className="mb-8 last:mb-0">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-400'} absolute left-0 -translate-x-1/2`}></div>
                <div className={`absolute left-0 top-0 h-full w-0.5 ${index < packageData.history.length - 1 ? 'bg-gray-200' : 'bg-transparent'} -z-10`}></div>
                <h4 className="font-medium text-gray-900 ml-4">{event.status}</h4>
              </div>
              <p className="text-sm text-gray-600 ml-4">{event.location} - {event.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
