'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to activity page by default
    router.push('/dashboard/activity');
  }, [router]);

  const tabs = [
    { id: 'activity', label: 'Activity', path: '/dashboard/activity' },
    { id: 'trips', label: 'Trips', path: '/dashboard/trips' },
    { id: 'addresses', label: 'Addresses', path: '/dashboard/addresses' },
    { id: 'settings', label: 'Settings', path: '/dashboard/settings' }
  ];

  const handleTabClick = (path: string) => {
    router.push(path);
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Vertical Sidebar */}
        <div className="w-80 bg-white border-r-2 border-gray-100 min-h-screen shadow-lg">
          <div className="p-8 flex flex-col h-full">
            {/* Logo */}
            <div className="mb-12">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Zitouna</h1>
            </div>
            
            {/* User Info */}
            <div className="flex flex-col items-center space-y-6 mb-20 mt-16">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center relative transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-blue-600">FH</span>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">Firas Harbaoui</p>
                <p className="text-base text-gray-500 font-medium">firas.harbaoui@ensi-uma.tn</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-3 flex flex-col items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.path)}
                  className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg transition-all duration-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-bold transform hover:scale-105 hover:shadow-md"
                >
                  {tab.id === 'activity' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {tab.id === 'trips' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                  {tab.id === 'addresses' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {tab.id === 'settings' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Footer Links */}
            <div className="mt-auto pt-8">
              <div className="flex flex-col items-center space-y-6">
                {/* Help Link with Badge */}
                <a href="#" className="text-base text-gray-500 hover:text-blue-600 transition-all duration-300 flex items-center space-x-3 bg-gray-100 hover:bg-blue-50 px-4 py-3 rounded-2xl font-medium transform hover:scale-105">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span>Help</span>
                </a>
                
                {/* Other Links */}
                <div className="flex flex-wrap justify-center gap-6 text-center">
                  <a href="#" className="text-base text-gray-500 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-2 py-1 rounded-lg hover:bg-blue-50">
                    Terms
                  </a>
                  <a href="#" className="text-base text-gray-500 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-2 py-1 rounded-lg hover:bg-blue-50">
                    Privacy
                  </a>
                  <a href="#" className="text-base text-gray-500 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-2 py-1 rounded-lg hover:bg-blue-50">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
