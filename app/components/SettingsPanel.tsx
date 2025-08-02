'use client';

import React, { useState } from 'react';
import { Settings, Sun, Moon, Globe, X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, language, setLanguage } = useSettings();

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={togglePanel}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 cursor-pointer"
        aria-label="Open Settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={togglePanel}
          />
          
          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-black shadow-2xl z-50 transform transition-transform duration-300 border-l border-gray-200 dark:border-gray-800">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                <button
                  onClick={togglePanel}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Theme Setting */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>

              {/* Language Setting */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">English</span>
                  </button>
                  <button
                    onClick={() => setLanguage('ta')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
                      language === 'ta'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-sm font-bold">த</span>
                    <span className="text-sm font-medium">தமிழ்</span>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Settings are automatically saved to your browser.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};