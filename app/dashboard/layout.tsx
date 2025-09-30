'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'activity', label: 'Activity', path: '/dashboard/activity' },
    { id: 'trips', label: 'Trips', path: '/dashboard/trips' },
    { id: 'addresses', label: 'Addresses', path: '/dashboard/addresses' },
    { id: 'packages', label: 'Packages', path: '/dashboard/packages' },
    { id: 'settings', label: 'Settings', path: '/dashboard/settings' }
  ];

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Vertical Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6 flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Zaytouna</h1>
            </div>
            
            {/* User Info */}
            <div className="flex flex-col items-center space-y-4 mb-20 mt-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative">
                <span className="text-xl font-semibold text-gray-600">FH</span>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">Firas Harbaoui</p>
                <p className="text-base text-gray-500">firas.harbaoui@ensi-uma.tn</p>
              </div>
            </div>


            {/* Navigation */}
            <nav className="space-y-1 flex flex-col items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.path)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(tab.path)
                      ? 'shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                  style={isActive(tab.path) ? {
                    backgroundColor: '#f0f8ff',
                    color: '#1e90ff',
                    borderColor: '#1e90ff',
                    borderWidth: '1px'
                  } : {}}
                >
                  {tab.id === 'activity' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {tab.id === 'trips' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                  {tab.id === 'addresses' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {tab.id === 'packages' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                  {tab.id === 'settings' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="flex flex-col items-center space-y-4">
                {/* Help Link with Badge */}
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span>Help</span>
                </a>
                
                {/* Other Links */}
                <div className="flex flex-wrap justify-center gap-4 text-center">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-32 relative">
          {/* Action Buttons - Top Right */}
          <div className="absolute top-6 right-6 z-10 flex space-x-3">
            <button
              onClick={() => router.push('/booking')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ backgroundColor: '#1e90ff' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Send Package</span>
              </div>
            </button>
            <button
              onClick={() => router.push('/create-trip')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Trip</span>
              </div>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
