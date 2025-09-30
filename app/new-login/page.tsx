'use client';

import { useState, useEffect } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import FloatingLabelSelect from '../components/FloatingLabelSelect';
import PINInput from '../components/PINInput';

export default function NewLogin() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailLinked, setIsEmailLinked] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: PIN, 3: phone/name, 4: verify email, 5: complete account
  const [pinCode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  // Account completion form
  const [accountData, setAccountData] = useState({
    fullName: '',
    country: '',
    address: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: ''
  });

  // Auto-check email as user types
  useEffect(() => {
    if (email.trim() && email.includes('@')) {
      const timeoutId = setTimeout(() => {
        // Simulate API call to check if email exists
        const emailExists = Math.random() > 0.3; // 70% chance email exists
        setIsEmailLinked(emailExists);
        
        if (emailExists) {
          // Email found - show green and allow continue
        } else {
          // Email not found - show phone form
          setShowPhoneForm(true);
        }
      }, 800); // Debounce for 800ms
      
      return () => clearTimeout(timeoutId);
    } else {
      // Reset states when email is empty or invalid
      setIsEmailLinked(null);
      setShowPhoneForm(false);
    }
  }, [email]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isEmailLinked === null) return;

    if (isEmailLinked) {
      // Go to PIN step for existing users
      setCurrentStep(2);
    } else {
      // Continue with phone form for new users
      setCurrentStep(4); // Go to email verification
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode.trim()) return;

    setIsLoading(true);
    
    // Simulate PIN verification
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful PIN verification
      window.location.href = '/';
    }, 1500);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !fullName.trim()) return;

    setIsLoading(true);
    
    // Simulate phone/name submission
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4); // Go to email verification
    }, 1500);
  };

  const handleEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.some(code => !code.trim())) return;

    setIsLoading(true);
    
    // Simulate email verification
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(5); // Go to complete account
    }, 1500);
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleAccountCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account completion
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleSkipPayment = () => {
    window.location.href = '/';
  };

  // Animate phone form appearance
  useEffect(() => {
    if (currentStep === 3) {
      setTimeout(() => setShowPhoneForm(true), 300);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Step 1: Email Input */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-up">
                Welcome to Zitouna Delivery
              </h1>
              <p className="text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Log in or sign up to get started.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {isEmailLinked === true ? (
                <div className="relative">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">{email}</p>
                        <p className="text-green-600 text-xs font-medium">Verified</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEmailLinked(null);
                        setEmail('');
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <FloatingLabelInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email address"
                  required
                />
              )}

              {!showPhoneForm && (
                <button
                  type="submit"
                  disabled={isEmailLinked !== true}
                className={`w-full py-3 px-4 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  isEmailLinked === true
                    ? 'text-white hover:opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={isEmailLinked === true ? { backgroundColor: '#1e90ff' } : {}}
                >
                  Continue
                </button>
              )}
            </form>

            {/* Phone & Name Form (appears when email not found) */}
            {showPhoneForm && (
              <div className="animate-slide-up mt-4">
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className={`transition-all duration-500 ${showPhoneForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex">
                      <select 
                        className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 hover:border-black transition-all duration-200 text-gray-900 bg-gray-50 text-sm"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1e90ff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '';
                        }}
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+82">🇰🇷 +82</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+212">🇲🇦 +212</option>
                        <option value="+216">🇹🇳 +216</option>
                      </select>
                      <div className="flex-1">
                        <FloatingLabelInput
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          label="Phone number"
                          className="rounded-l-none -ml-px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`transition-all duration-500 delay-200 ${showPhoneForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <FloatingLabelInput
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      label="Full name"
                      required
                    />
                  </div>

                  <div className={`transition-all duration-500 delay-400 ${showPhoneForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <button
                      type="submit"
                      disabled={!phoneNumber.trim() || !fullName.trim() || isLoading}
                      className="w-full py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                      style={{ backgroundColor: '#1e90ff' }}
                    >
                      {isLoading ? 'Creating account...' : 'Continue'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Step 2: PIN Code (Existing User) */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 animate-slide-up">
                Welcome back!
              </h2>
              <p className="text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                We found your account. Enter your PIN to continue.
              </p>
              <div className="mt-4 p-3 bg-green-50 rounded-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-sm text-green-800 font-medium">{email}</p>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-6">
              <PINInput
                length={4}
                value={pinCode}
                onChange={setPinCode}
                label="Enter your PIN"
              />

              <button
                type="submit"
                disabled={!pinCode.trim() || isLoading}
                className="w-full py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                style={{ backgroundColor: '#1e90ff' }}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          </div>
        )}


        {/* Step 3: Email Verification */}
        {currentStep === 4 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 animate-slide-up">
                Verify your email address
              </h2>
              <p className="text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Enter the code sent to {email}
              </p>
            </div>

            <form onSubmit={handleEmailVerification} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-4">
                  Verification code
                </label>
                <div className="flex justify-center space-x-3">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`verification-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:scale-[1.05] focus:scale-[1.05] text-gray-900"
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={verificationCode.some(code => !code.trim()) || isLoading}
                className="w-full py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                style={{ backgroundColor: '#1e90ff' }}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Complete Account */}
        {currentStep === 5 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 animate-slide-up">
                Complete your account
              </h2>
              <p className="text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Add your pickup address and payment method
              </p>
            </div>

            <form onSubmit={handleAccountCompletion} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Pickup Address</h3>
                
                <FloatingLabelInput
                  id="fullName"
                  type="text"
                  value={accountData.fullName}
                  onChange={(e) => setAccountData({...accountData, fullName: e.target.value})}
                  label="Full name"
                  required
                />

                <FloatingLabelSelect
                  id="country"
                  value={accountData.country}
                  onChange={(value) => setAccountData({...accountData, country: value})}
                  label="Country"
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'UK', label: 'United Kingdom' },
                    { value: 'FR', label: 'France' },
                    { value: 'DE', label: 'Germany' },
                    { value: 'ES', label: 'Spain' },
                    { value: 'IT', label: 'Italy' },
                    { value: 'AU', label: 'Australia' },
                    { value: 'JP', label: 'Japan' },
                    { value: 'KR', label: 'South Korea' },
                    { value: 'IN', label: 'India' },
                    { value: 'BR', label: 'Brazil' },
                    { value: 'MX', label: 'Mexico' },
                    { value: 'RU', label: 'Russia' },
                    { value: 'TR', label: 'Turkey' },
                    { value: 'SA', label: 'Saudi Arabia' },
                    { value: 'AE', label: 'United Arab Emirates' },
                    { value: 'EG', label: 'Egypt' },
                    { value: 'MA', label: 'Morocco' },
                    { value: 'TN', label: 'Tunisia' },
                  ]}
                  required
                />

                <FloatingLabelInput
                  id="address"
                  type="text"
                  value={accountData.address}
                  onChange={(e) => setAccountData({...accountData, address: e.target.value})}
                  label="Address"
                  required
                />

                <FloatingLabelInput
                  id="addressLine2"
                  type="text"
                  value={accountData.addressLine2}
                  onChange={(e) => setAccountData({...accountData, addressLine2: e.target.value})}
                  label="Address line 2 (optional)"
                />

                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="city"
                    type="text"
                    value={accountData.city}
                    onChange={(e) => setAccountData({...accountData, city: e.target.value})}
                    label="City"
                    required
                  />
                  <FloatingLabelInput
                    id="province"
                    type="text"
                    value={accountData.province}
                    onChange={(e) => setAccountData({...accountData, province: e.target.value})}
                    label="Province/State"
                    required
                  />
                </div>

                <FloatingLabelInput
                  id="postalCode"
                  type="text"
                  value={accountData.postalCode}
                  onChange={(e) => setAccountData({...accountData, postalCode: e.target.value})}
                  label="Postal code"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSkipPayment}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: '#1e90ff' }}
                >
                  {isLoading ? 'Setting up...' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
