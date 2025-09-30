'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions] = useState([
    '123 Main Street, Tunis, Tunisia',
    '456 Avenue Habib Bourguiba, Sfax, Tunisia',
    '789 Rue de la République, Sousse, Tunisia',
    '321 Boulevard 7 Novembre, Bizerte, Tunisia',
    '654 Avenue Taher Haddad, Monastir, Tunisia'
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [searchValue, suggestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to booking page
      window.location.href = '/booking';
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-3 mx-24">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-900">Zitouna</h1>
          <a 
            href="/new-login" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex mx-24">
        {/* Left Column - Search */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-8">
          <div className="max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Send your items with trusted travellers
            </h2>
            <p className="text-xs text-gray-600 mb-6">
              Connect with verified travellers going your way and get your packages delivered safely and affordably.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your dropoff address"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm transition-all duration-200 hover:translate-x-1 group"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          <span className="text-gray-800 group-hover:text-blue-700 font-medium transition-colors duration-200">{suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !searchValue.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Finding options...' : 'Continue to booking'}
              </button>
            </form>

            {/* Popular destinations */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Popular destinations:</p>
              <div className="flex flex-wrap gap-1">
                {['New York', 'London', 'Paris', 'Tokyo'].map((city, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchValue(`${city}`)}
                    className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - How it Works */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">How it works</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">1. Enter destination</h4>
                <p className="text-xs text-gray-600">Tell us where you want to send your package</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">2. Find a traveller</h4>
                <p className="text-xs text-gray-600">Connect with verified travellers going your way</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">3. Track delivery</h4>
                <p className="text-xs text-gray-600">Monitor your package until it reaches its destination</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h4 className="text-xs font-medium text-gray-900 mb-3">Why choose us</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-600">• Fast delivery</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600">• Secure packages</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600">• Reliable service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white px-6 py-2">
        <p className="text-xs text-gray-500 text-center">© 2024 Zitouna Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
}