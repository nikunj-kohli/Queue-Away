
import React, { useState } from 'react';

function Settings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white text-center">Settings</h1>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Notifications Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {type === 'push' ? 'Push Notifications' : type === 'email' ? 'Email Notifications' : 'SMS Notifications'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {type === 'push' 
                          ? 'Receive notifications on your device' 
                          : type === 'email' 
                          ? 'Get updates via email' 
                          : 'Receive SMS updates'
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(type)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50/50 rounded-2xl">
                  <h3 className="font-medium text-gray-900 mb-3">Profile Visibility</h3>
                  <div className="space-y-2">
                    {['public', 'private'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option}
                          checked={privacy.profileVisibility === option}
                          onChange={(e) => setPrivacy(prev => ({...prev, profileVisibility: e.target.value}))}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-gray-700 capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
                  <div>
                    <h3 className="font-medium text-gray-900">Show Online Status</h3>
                    <p className="text-sm text-gray-500">Let others see when you're online</p>
                  </div>
                  <button
                    onClick={() => setPrivacy(prev => ({...prev, showOnlineStatus: !prev.showOnlineStatus}))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacy.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                  <h3 className="font-medium text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </button>
                
                <button className="w-full text-left p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                  <h3 className="font-medium text-gray-900">Export Data</h3>
                  <p className="text-sm text-gray-500">Download your account data</p>
                </button>
                
                <button className="w-full text-left p-4 bg-red-50/50 rounded-2xl hover:bg-red-100/50 transition-colors text-red-600">
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-red-500">Permanently delete your account</p>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
