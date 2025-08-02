'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ta';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  isRequestInProgress: boolean;
  setIsRequestInProgress: (inProgress: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('news-analyzer-theme') as Theme;
    const savedLanguage = localStorage.getItem('news-analyzer-language') as Language;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Default to light theme
      setTheme('light');
    }

    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      setLanguage(savedLanguage);
    }
    
    setIsInitialized(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isInitialized) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('news-analyzer-theme', theme);
    }
  }, [theme, isInitialized]);

  // Set initial dark theme class to prevent flash
  useEffect(() => {
    const savedTheme = localStorage.getItem('news-analyzer-theme') as Theme;
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('news-analyzer-language', language);
  }, [language]);

  const value: SettingsContextType = {
    theme,
    language,
    setTheme,
    setLanguage,
    isRequestInProgress,
    setIsRequestInProgress,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};