'use client';

import { useState, useEffect } from 'react';

export default function Travelers() {
  const [selectedTraveler, setSelectedTraveler] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showTraveler, setShowTraveler] = useState(false);
  const [travelerAccepted, setTravelerAccepted] = useState(false);

  const travelers = [
    {
      id: 'traveler1',
      name: 'Sarah Johnson',
      rating: 4.9,
      reviews: 127,
      price: 25.99,
      estimatedTime: '2-3 hours',
      tripCount: 342,
      description: 'Experienced courier specializing in electronics and fragile items',
      avatar: 'SJ'
    },
    {
      id: 'traveler2',
      name: 'Mike Chen',
      rating: 4.8,
      reviews: 89,
      price: 22.99,
      estimatedTime: '1-2 hours',
      tripCount: 198,
      description: 'Reliable delivery professional with expertise in medical supplies',
      avatar: 'MC'
    },
    {
      id: 'traveler3',
      name: 'Emma Rodriguez',
      rating: 4.7,
      reviews: 156,
      price: 28.99,
      estimatedTime: '3-4 hours',
      tripCount: 267,
      description: 'Trusted courier for high-value gadgets and luxury items',
      avatar: 'ER'
    },
    {
      id: 'traveler4',
      name: 'David Kim',
      rating: 4.9,
      reviews: 203,
      price: 24.99,
      estimatedTime: '2-3 hours',
      tripCount: 445,
      description: 'Versatile delivery expert handling all types of packages',
      avatar: 'DK'
    }
  ];

  // Simulate searching for best matches
  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 100) {
            setIsSearching(false);
            // Auto-select the best traveler
            const bestTraveler = travelers.reduce((best, current) => 
              current.rating > best.rating ? current : best
            );
            setSelectedTraveler(bestTraveler.id);
            
            // Show traveler details first
            setTimeout(() => {
              setShowTraveler(true);
            }, 500);
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  // Simulate traveler receiving and accepting the request
  useEffect(() => {
    if (showTraveler && !travelerAccepted) {
      // Random delay between 3-8 seconds to simulate traveler response time
      const delay = Math.random() * 5000 + 3000; // 3-8 seconds
      
      const timer = setTimeout(() => {
        setTravelerAccepted(true);
        
        // Proceed to success page after traveler accepts
        setTimeout(() => {
          window.location.href = '/success';
        }, 2000);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [showTraveler, travelerAccepted]);

  const handleSelectTraveler = () => {
    if (selectedTraveler) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        console.log('Traveler selected:', selectedTraveler);
        // Navigate to success page
        window.location.href = '/success';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Zitouna</h1>
          </div>
          <div className="text-sm text-gray-600">
            <a href="/booking" className="hover:text-gray-900">← Back to booking</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-32 sm:px-40 lg:px-48 pb-32">
        <div>
          {isSearching ? (
            /* Searching State */
            <div className="text-center py-16 animate-fade-in">
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-4 animate-bounce-in">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500"></div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 animate-slide-up">Finding Best Matches</h2>
                <p className="text-gray-600 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>We're searching for the most suitable travelers for your delivery...</p>
                
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${searchProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{searchProgress}% complete</p>
                </div>
              </div>
            </div>
          ) : showTraveler ? (
            /* Traveler Found State */
            <div className="text-center py-16 animate-fade-in">
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center animate-bounce-in">
                  <span className="text-gray-700 font-medium text-lg">
                    {travelers.find(t => t.id === selectedTraveler)?.avatar}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 animate-slide-up">Traveler Found</h2>
                <p className="text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  {travelers.find(t => t.id === selectedTraveler)?.name} will handle your delivery
                </p>
                
                <div className="max-w-sm mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-left">
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${travelers.find(t => t.id === selectedTraveler)?.price}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-500">Time</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {travelers.find(t => t.id === selectedTraveler)?.estimatedTime}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-500">Rating</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {travelers.find(t => t.id === selectedTraveler)?.rating} ★
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    {!travelerAccepted ? (
                      <>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mr-2"></div>
                        Connecting to traveler...
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Traveler accepted! Redirecting...
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
