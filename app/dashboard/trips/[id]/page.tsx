'use client';

import { useRouter } from 'next/navigation';
import { useState, use } from 'react';

export default function TripDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isActive, setIsActive] = useState(true);
  const [currentStatus, setCurrentStatus] = useState('Ready to start');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Mock trip data - in real app, fetch by ID
  const tripData = {
    id: id,
    from: 'Montreal, QC',
    to: 'Toronto, ON',
    date: '2024-01-20',
    time: '14:30',
    status: 'Active',
    earnings: '$45.00',
    distance: '540 km',
    duration: '5h 30m',
    pickupLocation: '123 Main St, Montreal, QC',
    dropoffLocation: '456 King St, Toronto, ON',
    customerName: 'John Smith',
    customerPhone: '+1 (514) 123-4567',
    packageCount: 2,
    totalWeight: '3.2 kg'
  };

  const packages = [
    {
      id: '1',
      name: 'Documents Package',
      weight: '0.5 kg',
      description: 'Important business documents',
      status: 'Ready for pickup',
      customer: 'John Smith'
    },
    {
      id: '2',
      name: 'Electronics Package',
      weight: '2.7 kg',
      description: 'Laptop and accessories',
      status: 'Ready for pickup',
      customer: 'Sarah Johnson'
    }
  ];

  const statusOptions = [
    'Ready to start',
    'On the way to pickup',
    'At pickup location',
    'Picked up packages',
    'On the way to airport',
    'At airport - Montreal',
    'In the plane',
    'Landed - Tunis',
    'At airport - Tunis',
    'On the way to delivery',
    'At delivery location',
    'Delivered packages',
    'Trip completed'
  ];

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setShowStatusModal(false);
  };

      const handlePackageStatusUpdate = (packageId: string, newStatus: string) => {
        // In real app, update package status
        console.log(`Package ${packageId} status updated to: ${newStatus}`);
        setShowPackageModal(false);
        setSelectedPackage(null);
      };

      const handlePackageClick = (packageId: string) => {
        router.push(`/dashboard/trips/${id}/packages/${packageId}`);
      };

  const handleStartTrip = () => {
    setIsActive(true);
    // In real app, update trip status to active
  };

  const handleCompleteTrip = () => {
    setIsActive(false);
    // In real app, mark trip as completed
  };

  const handleContactCustomer = () => {
    // In real app, open phone dialer or messaging
    console.log('Contacting customer:', tripData.customerPhone);
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
        <h1 className="text-2xl font-semibold text-gray-900">Trip Details</h1>
      </div>

      {/* Trip Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{tripData.from} → {tripData.to}</h2>
            <p className="text-gray-600 mb-1">{tripData.date} at {tripData.time}</p>
            <p className="text-sm text-gray-500">Trip ID: {tripData.id}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tripData.status)}`}>
              {tripData.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <span className="text-gray-700 font-medium">Distance:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.distance}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Duration:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.duration}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Earnings:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.earnings}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Packages:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.packageCount} items</span>
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Current Status:</span>
              <span className="ml-2 font-medium text-gray-900">{currentStatus}</span>
            </div>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {isActive ? (
            <button
              onClick={handleCompleteTrip}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: '#1e90ff' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
            >
              Complete Trip
            </button>
          ) : (
            <button
              onClick={handleStartTrip}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: '#1e90ff' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
            >
              Start Trip
            </button>
          )}
          <button
            onClick={handleContactCustomer}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Contact Customer
          </button>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-700 font-medium">Name:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.customerName}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Phone:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.customerPhone}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Pickup:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.pickupLocation}</span>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Dropoff:</span>
            <span className="ml-2 text-gray-900 font-semibold">{tripData.dropoffLocation}</span>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Packages to Deliver</h3>
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors duration-200" onClick={() => handlePackageClick(pkg.id)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{pkg.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
                  <p className="text-sm text-gray-500 mb-1">Weight: {pkg.weight}</p>
                  <p className="text-sm text-gray-500">Customer: {pkg.customer}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {pkg.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage(pkg);
                      setShowPackageModal(true);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Trip Status</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    currentStatus === status
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Status Update Modal */}
      {showPackageModal && selectedPackage && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Package Status</h3>
            <p className="text-sm text-gray-600 mb-4">Package: {selectedPackage.name}</p>
            <div className="space-y-2">
              {['Ready for pickup', 'Picked up', 'In transit', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => handlePackageStatusUpdate(selectedPackage.id, status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    selectedPackage.status === status
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPackageModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
