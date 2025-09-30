'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Packages() {
  const router = useRouter();
  
  const [packages] = useState([
    {
      id: '1',
      name: 'Documents Package',
      description: 'Important documents and papers',
      weight: '0.5kg',
      status: 'In Transit',
      trackingNumber: 'ZT123456789',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Electronics Package',
      description: 'Laptop and accessories',
      weight: '2.1kg',
      status: 'Delivered',
      trackingNumber: 'ZT987654321',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Clothing Package',
      description: 'Winter clothes and accessories',
      weight: '1.8kg',
      status: 'Processing',
      trackingNumber: 'ZT456789123',
      date: '2024-01-20'
    }
  ]);

  const handlePackageClick = (id: string) => {
    router.push(`/dashboard/packages/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Packages</h1>
      </div>

      <div className="space-y-3 max-w-lg">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => handlePackageClick(pkg.id)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-medium text-gray-900">{pkg.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-0.5">{pkg.description}</p>
                <p className="text-sm text-gray-600">
                  {pkg.weight} • {pkg.trackingNumber}
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
