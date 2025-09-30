'use client';

import { useRouter } from 'next/navigation';
import { useState, use } from 'react';

export default function AddressDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(true);
  const { id } = use(params);

  // Mock address data - in real app, fetch by ID
  const address = {
    id: id,
    name: 'Firas Harbaoui',
    address: '5200 rue de la savane',
    city: 'Montreal',
    province: 'QC',
    postalCode: 'H1X 1X1',
    isDefault: true
  };

  const handleSetDefault = () => {
    setIsDefault(!isDefault);
    // In real app, make API call to update default status
  };

  const handleUpdate = () => {
    // In real app, navigate to edit form
    console.log('Update address');
  };

  const handleRemove = () => {
    // In real app, show confirmation dialog and delete
    if (confirm('Are you sure you want to remove this address?')) {
      console.log('Remove address');
      router.push('/dashboard/addresses');
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
        <h1 className="text-2xl font-semibold text-gray-900">Address Details</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{address.name}</h2>
          <div className="space-y-2">
            <p className="text-gray-600">{address.address}</p>
            <p className="text-gray-600">
              {address.city}, {address.province} {address.postalCode}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <input
            type="checkbox"
            id="default"
            checked={isDefault}
            onChange={handleSetDefault}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="default" className="text-sm font-medium text-gray-700">
            Set as default address
          </label>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleUpdate}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
            style={{ backgroundColor: '#1e90ff', color: 'white' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
          >
            Update Address
          </button>
          <button
            onClick={handleRemove}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Remove Address
          </button>
        </div>
      </div>
    </div>
  );
}
