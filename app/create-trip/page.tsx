'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FloatingLabelInput from '../components/FloatingLabelInput';
import FloatingLabelSelect from '../components/FloatingLabelSelect';
import FloatingLabelDateInput from '../components/FloatingLabelDateInput';
import FloatingLabelTimeInput from '../components/FloatingLabelTimeInput';
import IdentityInput from '../components/IdentityInput';
import TicketInput from '../components/TicketInput';
import DocumentImageUpload from '../components/DocumentImageUpload';

export default function CreateTrip() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    // Step 1: Trip Details
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    // Step 2: Trip Preferences
    maxPackages: 5,
    maxWeight: 10,
    preferredCategories: [] as string[],
    specialInstructions: '',
    // Step 3: Pricing
    basePrice: 50,
    pricePerKg: 5,
    currency: 'CAD',
    // Step 4: Identity & Travel Documents
    identityType: 'passport',
    identityNumber: '',
    identityImage: null as File | null,
    ticketType: 'flight',
    ticketNumber: '',
    ticketImage: null as File | null,
    // Step 5: Contact & Availability
    contactMethod: 'phone',
    phone: '',
    email: '',
    availability: 'flexible'
  });

  const categories = [
    'Documents',
    'Electronics',
    'Clothing',
    'Medicines',
    'Food',
    'Books',
    'Jewelry',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category]
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit trip
      router.push('/create-trip/success');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-2">Step 1 of 5</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <FloatingLabelInput
            label="From"
            type="text"
            value={formData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
          />
          <FloatingLabelInput
            label="To"
            type="text"
            value={formData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
          />
          <FloatingLabelDateInput
            label="Departure Date"
            value={formData.departureDate}
            onChange={(value) => handleInputChange('departureDate', value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <FloatingLabelTimeInput
            label="Departure Time"
            value={formData.departureTime}
            onChange={(value) => handleInputChange('departureTime', value)}
          />
          <FloatingLabelDateInput
            label="Return Date (Optional)"
            value={formData.returnDate}
            onChange={(value) => handleInputChange('returnDate', value)}
            min={formData.departureDate || new Date().toISOString().split('T')[0]}
          />
          <FloatingLabelTimeInput
            label="Return Time (Optional)"
            value={formData.returnTime}
            onChange={(value) => handleInputChange('returnTime', value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-2">Step 2 of 5</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Preferences</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FloatingLabelInput
            id="maxPackages"
            label="Max Packages"
            type="number"
            value={formData.maxPackages}
            onChange={(e) => handleInputChange('maxPackages', parseInt(e.target.value))}
            min="1"
            max="20"
          />
          <FloatingLabelInput
            id="maxWeight"
            label="Max Weight (kg)"
            type="number"
            value={formData.maxWeight}
            onChange={(e) => handleInputChange('maxWeight', parseInt(e.target.value))}
            min="1"
            max="50"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">Preferred Package Categories</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.preferredCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                    formData.preferredCategories.includes(category)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {formData.preferredCategories.includes(category) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <FloatingLabelInput
          label="Special Instructions"
          type="textarea"
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-2">Step 3 of 5</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
        <div className="grid grid-cols-2 gap-6">
          <FloatingLabelInput
            id="basePrice"
            label="Base Price"
            type="number"
            value={formData.basePrice}
            onChange={(e) => handleInputChange('basePrice', parseFloat(e.target.value))}
            min="0"
            step="0.01"
            prefix="$"
          />
          <FloatingLabelInput
            id="pricePerKg"
            label="Price per kg"
            type="number"
            value={formData.pricePerKg}
            onChange={(e) => handleInputChange('pricePerKg', parseFloat(e.target.value))}
            min="0"
            step="0.01"
            prefix="$"
          />
          <FloatingLabelSelect
            label="Currency"
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            options={[
              { value: 'CAD', label: 'CAD ($)' },
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' }
            ]}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-2">Step 4 of 5</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity & Travel Documents</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FloatingLabelSelect
              id="identityType"
              label="Identity Document Type"
              value={formData.identityType}
              onChange={(value) => handleInputChange('identityType', value)}
              options={[
                { value: 'passport', label: 'Passport' },
                { value: 'id_card', label: 'ID Card' },
                { value: 'driver_license', label: 'Driver License' }
              ]}
            />
            <IdentityInput
              id="identityNumber"
              label="Identity Document Number"
              type={formData.identityType as 'passport' | 'id_card' | 'driver_license'}
              value={formData.identityNumber}
              onChange={(value) => handleInputChange('identityNumber', value)}
            />
          </div>
          
          <DocumentImageUpload
            id="identityImage"
            label="Identity Document Image"
            type={formData.identityType as 'passport' | 'id_card' | 'driver_license'}
            onImageChange={(file) => handleInputChange('identityImage', file)}
          />
          
          <div className="grid grid-cols-2 gap-6">
            <FloatingLabelSelect
              id="ticketType"
              label="Travel Ticket Type"
              value={formData.ticketType}
              onChange={(value) => handleInputChange('ticketType', value)}
              options={[
                { value: 'flight', label: 'Flight' },
                { value: 'train', label: 'Train' },
                { value: 'bus', label: 'Bus' }
              ]}
            />
            <TicketInput
              id="ticketNumber"
              label="Ticket Number"
              type={formData.ticketType as 'flight' | 'train' | 'bus'}
              value={formData.ticketNumber}
              onChange={(value) => handleInputChange('ticketNumber', value)}
            />
          </div>
          
          <DocumentImageUpload
            id="ticketImage"
            label="Travel Ticket Image"
            type={formData.ticketType as 'flight' | 'train' | 'bus'}
            onImageChange={(file) => handleInputChange('ticketImage', file)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-2">Step 5 of 5</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Availability</h3>
        <div className="space-y-6">
          <FloatingLabelSelect
            label="Preferred Contact Method"
            value={formData.contactMethod}
            onChange={(e) => handleInputChange('contactMethod', e.target.value)}
            options={[
              { value: 'phone', label: 'Phone' },
              { value: 'email', label: 'Email' },
              { value: 'both', label: 'Both' }
            ]}
          />
          
          <div className="grid grid-cols-2 gap-6">
            <FloatingLabelInput
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <FloatingLabelInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <FloatingLabelSelect
            label="Availability"
            value={formData.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            options={[
              { value: 'flexible', label: 'Flexible' },
              { value: 'weekends', label: 'Weekends Only' },
              { value: 'weekdays', label: 'Weekdays Only' },
              { value: 'specific', label: 'Specific Dates' }
            ]}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header with User Icon */}
      <div className="flex items-center justify-end px-6 py-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-300 transition-colors duration-200"
          >
            <span className="text-sm font-semibold">F</span>
          </button>
          
          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => router.push('/dashboard/settings')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={() => router.push('/dashboard/trips')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Trips
                </button>
                <button
                  onClick={() => router.push('/dashboard/packages')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Packages
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => router.back()}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#1e90ff' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
          >
            {currentStep === 5 ? 'Create Trip' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
