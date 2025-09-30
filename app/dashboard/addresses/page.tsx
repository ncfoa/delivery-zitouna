'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Addresses() {
  const router = useRouter();
  
  const [addresses] = useState([
    {
      id: '1',
      name: 'Firas Harbaoui',
      address: '5200 rue de la savane',
      city: 'Montreal',
      province: 'QC',
      postalCode: 'H1X 1X1',
      isDefault: true
    },
    {
      id: '2',
      name: 'Firas Harbaoui',
      address: '123 Main Street',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M1M 1M1',
      isDefault: false
    },
    {
      id: '3',
      name: 'Firas Harbaoui',
      address: '456 Oak Avenue',
      city: 'Vancouver',
      province: 'BC',
      postalCode: 'V1V 1V1',
      isDefault: false
    }
  ]);

  const handleAddressClick = (id: string) => {
    router.push(`/dashboard/addresses/${id}`);
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Addresses</h1>
      </div>

      <div className="space-y-3 max-w-lg mb-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleAddressClick(address.id)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-medium text-gray-900">{address.name}</h3>
                  {address.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-0.5">{address.address}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.province} {address.postalCode}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-lg">
        <button 
          className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors duration-200"
          style={{ backgroundColor: '#1e90ff' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
        >
          Add Address
        </button>
      </div>
    </div>
  );
}
