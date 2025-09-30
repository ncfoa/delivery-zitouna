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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white px-8 py-6 lg:px-16 xl:px-24">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Zitouna</h1>
          <a 
            href="/new-login" 
            className="text-lg text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex px-8 lg:px-16 xl:px-24 py-12">
        {/* Left Column - Search */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-8 lg:px-12">
          <div className="max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Send your items with 
              <span className="text-blue-600 block">trusted travellers</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Connect with verified travellers going your way and get your packages delivered safely and affordably.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
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
                  className="w-full px-6 py-4 text-lg text-black border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 placeholder-gray-400 font-medium shadow-sm hover:shadow-md"
                  placeholder="Enter your dropoff address"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-6 py-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-base transition-all duration-200 hover:translate-x-2 group"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></div>
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
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                {isLoading ? 'Finding options...' : 'Continue to booking'}
              </button>
            </form>

            {/* Popular destinations */}
            <div className="mt-8">
              <p className="text-base text-gray-500 mb-4 font-medium">Popular destinations:</p>
              <div className="flex flex-wrap gap-3">
                {['New York', 'London', 'Paris', 'Tokyo'].map((city, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchValue(`${city}`)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border border-gray-200 hover:border-blue-200 transform hover:scale-105"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - How it Works */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-8 lg:px-12">
          <div className="max-w-lg">
            <h3 className="text-3xl font-black text-gray-900 mb-8">How it works</h3>
            
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">1</div>
                  <h4 className="text-xl font-bold text-gray-900">Enter destination</h4>
                </div>
                <p className="text-base text-gray-600 leading-relaxed ml-12">Tell us where you want to send your package</p>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">2</div>
                  <h4 className="text-xl font-bold text-gray-900">Find a traveller</h4>
                </div>
                <p className="text-base text-gray-600 leading-relaxed ml-12">Connect with verified travellers going your way</p>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">3</div>
                  <h4 className="text-xl font-bold text-gray-900">Track delivery</h4>
                </div>
                <p className="text-base text-gray-600 leading-relaxed ml-12">Monitor your package until it reaches its destination</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Why choose us</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-base text-gray-600 font-medium">Fast delivery</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-base text-gray-600 font-medium">Secure packages</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-base text-gray-600 font-medium">Reliable service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white px-8 py-8 lg:px-16 xl:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-base text-gray-500 text-center font-medium">© 2024 Zitouna Delivery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}