'use client';

import { useState } from 'react';

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system
  const [selectedProductType, setSelectedProductType] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSendCode = () => {
    if (phoneNumber.trim()) {
      setIsCodeSent(true);
      // Simulate sending verification code
      setTimeout(() => {
        console.log('Verification code sent to:', phoneNumber);
      }, 1000);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.trim()) {
      setIsPhoneVerified(true);
      // Simulate code verification
      console.log('Code verified:', verificationCode);
    }
  };

  const handlePaymentValidation = () => {
    // Simulate payment validation
    if (cardNumber.trim() && expiryDate.trim() && cvc.trim() && cardholderName.trim()) {
      setIsPaymentValid(true);
      // Simulate API call for payment validation
      setTimeout(() => {
        console.log('Payment validated successfully');
        // Navigate to traveler selection page
        window.location.href = '/travelers';
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const addressSuggestions = [
    'New York, NY, USA',
    'London, UK',
    'Paris, France',
    'Tokyo, Japan',
    'Dubai, UAE',
    'Los Angeles, CA, USA',
    'Berlin, Germany',
    'Sydney, Australia'
  ];

  const productTypes = [
    { id: 'documents', name: 'Documents', description: 'Important papers, contracts, certificates' },
    { id: 'medicine', name: 'Medicine', description: 'Prescription drugs, medical supplies' },
    { id: 'clothes', name: 'Clothes', description: 'Fashion items, garments, accessories' },
    { id: 'gadgets', name: 'Gadgets', description: 'Electronics, devices, tech items' },
    { id: 'beauty', name: 'Beauty', description: 'Cosmetics, skincare, personal care' },
    { id: 'perfumes', name: 'Perfumes', description: 'Fragrances, colognes, scented products' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Zitouna</h1>
          </div>
          <div className="text-sm text-gray-600">
            {isLoggedIn ? (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">U</span>
                </div>
              </div>
            ) : (
              <a href="/login" className="hover:text-gray-900" style={{ color: '#1e90ff' }}>
                Sign in
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="max-w-4xl mx-auto px-32 sm:px-40 lg:px-48 py-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {currentStep} of 5
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-32 sm:px-40 lg:px-48 pb-32">
        {/* Step 1: Address Selection */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 animate-slide-up">Select Addresses</h2>
            
            <div className="space-y-8">
              {/* Pickup Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pickup Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => {
                      setPickupAddress(e.target.value);
                      setShowPickupSuggestions(true);
                    }}
                    onFocus={(e) => {
                      setShowPickupSuggestions(true);
                      e.target.style.borderColor = '#1e90ff';
                      e.target.style.borderWidth = '1px';
                    }}
                    onBlur={(e) => {
                      setTimeout(() => setShowPickupSuggestions(false), 200);
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.borderWidth = '1px';
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'black';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                      }
                    }}
                    placeholder="Enter pickup address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                  />
                  {showPickupSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                      {addressSuggestions
                        .filter(addr => addr.toLowerCase().includes(pickupAddress.toLowerCase()))
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setPickupAddress(suggestion);
                              setShowPickupSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-gray-900"
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Drop-off Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Drop-off Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropoffAddress}
                    onChange={(e) => {
                      setDropoffAddress(e.target.value);
                      setShowDropoffSuggestions(true);
                    }}
                    onFocus={(e) => {
                      setShowDropoffSuggestions(true);
                      e.target.style.borderColor = '#1e90ff';
                      e.target.style.borderWidth = '1px';
                    }}
                    onBlur={(e) => {
                      setTimeout(() => setShowDropoffSuggestions(false), 200);
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.borderWidth = '1px';
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'black';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                      }
                    }}
                    placeholder="Enter drop-off address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                  />
                  {showDropoffSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                      {addressSuggestions
                        .filter(addr => addr.toLowerCase().includes(dropoffAddress.toLowerCase()))
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setDropoffAddress(suggestion);
                              setShowDropoffSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-gray-900"
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={true}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!pickupAddress.trim() || !dropoffAddress.trim()}
                className="px-6 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#1e90ff',
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1a7ce8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1e90ff';
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Product Type Selection */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Select Product Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productTypes.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedProductType === product.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedProductType(product.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="productType"
                      value={product.id}
                      checked={selectedProductType === product.id}
                      onChange={() => setSelectedProductType(product.id)}
                      className="mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedProductType}
                className="px-6 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#1e90ff',
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1a7ce8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1e90ff';
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Item Description */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Item Description</h2>
            
            <div className="space-y-6">
              {/* Item Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Describe your item
                </label>
                <textarea
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1e90ff';
                    e.target.style.borderWidth = '1px';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209 213 219)';
                    e.target.style.borderWidth = '1px';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = 'black';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                    }
                  }}
                  placeholder="Describe what you're sending (e.g., 'iPhone 14 Pro Max in original box')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Weight and Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={itemWeight}
                    onChange={(e) => setItemWeight(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e90ff';
                      e.target.style.borderWidth = '1px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.borderWidth = '1px';
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'black';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                      }
                    }}
                    placeholder="2.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    value={itemValue}
                    onChange={(e) => setItemValue(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e90ff';
                      e.target.style.borderWidth = '1px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.borderWidth = '1px';
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'black';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.target) {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                      }
                    }}
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1e90ff';
                    e.target.style.borderWidth = '1px';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209 213 219)';
                    e.target.style.borderWidth = '1px';
                  }}
                  onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = 'black';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                    }
                  }}
                  placeholder="Any special handling instructions (e.g., 'Fragile', 'Keep upright', 'Handle with care')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500 resize-none"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!itemDescription.trim() || !itemWeight.trim() || !itemValue.trim()}
                className="px-6 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#1e90ff',
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1a7ce8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1e90ff';
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Personal Information */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Personal Information</h2>
            
            <div className="space-y-6">
              {/* Phone Verification Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Phone Verification</h3>
                
                {!isPhoneVerified ? (
                  <div className="space-y-4">
                    {/* Phone Number Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Phone Number
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1e90ff';
                            e.target.style.borderWidth = '1px';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgb(209 213 219)';
                            e.target.style.borderWidth = '1px';
                          }}
                          onMouseEnter={(e) => {
                            if (document.activeElement !== e.target) {
                              e.target.style.borderColor = 'black';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (document.activeElement !== e.target) {
                              e.target.style.borderColor = 'rgb(209 213 219)';
                            }
                          }}
                          placeholder="+1 (555) 123-4567"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                        />
                        <button
                          onClick={handleSendCode}
                          disabled={!phoneNumber.trim() || isCodeSent}
                          className="px-4 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ 
                            backgroundColor: '#1e90ff',
                          }}
                          onMouseEnter={(e) => {
                            if (!e.target.disabled) {
                              e.target.style.backgroundColor = '#1a7ce8';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!e.target.disabled) {
                              e.target.style.backgroundColor = '#1e90ff';
                            }
                          }}
                        >
                          {isCodeSent ? 'Code Sent' : 'Send Code'}
                        </button>
                      </div>
                    </div>

                    {/* Verification Code Input */}
                    {isCodeSent && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Verification Code
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                              if (value.length <= 4) {
                                setVerificationCode(value);
                              }
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#1e90ff';
                              e.target.style.borderWidth = '1px';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgb(209 213 219)';
                              e.target.style.borderWidth = '1px';
                            }}
                            onMouseEnter={(e) => {
                              if (document.activeElement !== e.target) {
                                e.target.style.borderColor = 'black';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (document.activeElement !== e.target) {
                                e.target.style.borderColor = 'rgb(209 213 219)';
                              }
                            }}
                            placeholder="Enter 4-digit code"
                            maxLength={4}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                          />
                          <button
                            onClick={handleVerifyCode}
                            disabled={!verificationCode.trim()}
                            className="px-4 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ 
                              backgroundColor: '#1e90ff',
                            }}
                            onMouseEnter={(e) => {
                              if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#1a7ce8';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#1e90ff';
                              }
                            }}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-medium">✓ Phone number verified</span>
                  </div>
                )}
              </div>

              {/* Personal Details - Only shown after phone verification */}
              {isPhoneVerified && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Personal Details</h3>
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1e90ff';
                          e.target.style.borderWidth = '1px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                          e.target.style.borderWidth = '1px';
                        }}
                        onMouseEnter={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'black';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'rgb(209 213 219)';
                          }
                        }}
                        placeholder="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1e90ff';
                          e.target.style.borderWidth = '1px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                          e.target.style.borderWidth = '1px';
                        }}
                        onMouseEnter={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'black';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'rgb(209 213 219)';
                          }
                        }}
                        placeholder="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1e90ff';
                        e.target.style.borderWidth = '1px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                        e.target.style.borderWidth = '1px';
                      }}
                      onMouseEnter={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'black';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                        }
                      }}
                      placeholder="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!isPhoneVerified || !firstName.trim() || !lastName.trim() || !email.trim()}
                className="px-6 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#1e90ff',
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1a7ce8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1e90ff';
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Payment Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Order Summary */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Route:</span>
                    <span className="text-gray-900 text-sm">{pickupAddress} → {dropoffAddress}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Item:</span>
                    <span className="text-gray-900">{productTypes.find(p => p.id === selectedProductType)?.name} ({itemWeight}kg)</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="text-gray-900 font-semibold">$24.19</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Card Information */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Card Details</h3>
                
                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1e90ff';
                        e.target.style.borderWidth = '1px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                        e.target.style.borderWidth = '1px';
                      }}
                      onMouseEnter={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'black';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1e90ff';
                        e.target.style.borderWidth = '1px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgb(209 213 219)';
                        e.target.style.borderWidth = '1px';
                      }}
                      onMouseEnter={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'black';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                        }
                      }}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          setExpiryDate(value);
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1e90ff';
                          e.target.style.borderWidth = '1px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                          e.target.style.borderWidth = '1px';
                        }}
                        onMouseEnter={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'black';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'rgb(209 213 219)';
                          }
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1e90ff';
                          e.target.style.borderWidth = '1px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(209 213 219)';
                          e.target.style.borderWidth = '1px';
                        }}
                        onMouseEnter={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'black';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = 'rgb(209 213 219)';
                          }
                        }}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:border-black focus:border-2 focus:z-10 sm:text-sm transition-colors text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handlePaymentValidation}
                disabled={!cardNumber.trim() || !expiryDate.trim() || !cvc.trim() || !cardholderName.trim() || isPaymentValid}
                className="px-6 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#1e90ff',
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1a7ce8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1e90ff';
                  }
                }}
              >
                {isPaymentValid ? 'Processing...' : 'Start'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
