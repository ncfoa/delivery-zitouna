'use client';

import { useState } from 'react';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import FloatingLabelSelect from '../../components/FloatingLabelSelect';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      tripUpdates: true,
      paymentUpdates: true,
      ratingReminders: true
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: true,
      allowContact: true
    },
    preferences: {
      language: 'en',
      currency: 'CAD',
      timezone: 'America/Toronto',
      theme: 'light'
    }
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'security', label: 'Security' }
  ];

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-4xl">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <FloatingLabelInput
                  id="firstName"
                  label="First Name"
                  type="text"
                  value="Firas"
                  onChange={() => {}}
                />
                <FloatingLabelInput
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value="Harbaoui"
                  onChange={() => {}}
                />
                <FloatingLabelInput
                  id="email"
                  label="Email"
                  type="email"
                  value="firas.harbaoui@ensi-uma.tn"
                  onChange={() => {}}
                />
                <FloatingLabelInput
                  id="phone"
                  label="Phone"
                  type="tel"
                  value="+1 (514) 123-4567"
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-600">FH</span>
                </div>
                <div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'push' && 'Receive push notifications on your device'}
                        {key === 'sms' && 'Receive SMS notifications'}
                        {key === 'tripUpdates' && 'Get updates about your trips'}
                        {key === 'paymentUpdates' && 'Get notified about payments'}
                        {key === 'ratingReminders' && 'Reminders to rate completed trips'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <FloatingLabelSelect
                  id="profileVisibility"
                  label="Profile Visibility"
                  value={settings.privacy.profileVisibility}
                  onChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                    { value: 'travelers', label: 'Travelers Only' }
                  ]}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Show Earnings</h4>
                    <p className="text-xs text-gray-500">Display your earnings on your profile</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showEarnings}
                      onChange={(e) => handlePrivacyChange('showEarnings', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Allow Contact</h4>
                    <p className="text-xs text-gray-500">Let customers contact you directly</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.allowContact}
                      onChange={(e) => handlePrivacyChange('allowContact', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preferences</h3>
              <div className="grid grid-cols-2 gap-6">
                <FloatingLabelSelect
                  id="language"
                  label="Language"
                  value={settings.preferences.language}
                  onChange={(value) => handlePreferenceChange('language', value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'Français' },
                    { value: 'ar', label: 'العربية' }
                  ]}
                />
                <FloatingLabelSelect
                  id="currency"
                  label="Currency"
                  value={settings.preferences.currency}
                  onChange={(value) => handlePreferenceChange('currency', value)}
                  options={[
                    { value: 'CAD', label: 'CAD ($)' },
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (€)' }
                  ]}
                />
                <FloatingLabelSelect
                  id="timezone"
                  label="Timezone"
                  value={settings.preferences.timezone}
                  onChange={(value) => handlePreferenceChange('timezone', value)}
                  options={[
                    { value: 'America/Toronto', label: 'Eastern Time (ET)' },
                    { value: 'America/Vancouver', label: 'Pacific Time (PT)' },
                    { value: 'Europe/London', label: 'GMT' }
                  ]}
                />
                <FloatingLabelSelect
                  id="theme"
                  label="Theme"
                  value={settings.preferences.theme}
                  onChange={(value) => handlePreferenceChange('theme', value)}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'auto', label: 'Auto' }
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Travel Tab */}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                    <p className="text-xs text-gray-500">Update your account password</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Login Activity</h4>
                    <p className="text-xs text-gray-500">View recent login attempts</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#1e90ff' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a7ce8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
