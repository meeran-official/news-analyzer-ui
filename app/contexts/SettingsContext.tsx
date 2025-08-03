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
  isThemeLoaded: boolean;
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

// Function to get responsive theme based on screen size
const getResponsiveTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const isMobile = window.innerWidth < 768; // md breakpoint
  return isMobile ? 'dark' : 'light';
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Initialize theme and other settings
  useEffect(() => {
    const initializeSettings = () => {
      const savedLanguage = typeof window !== 'undefined'
        ? (localStorage.getItem('news-analyzer-language') as Language)
        : null;

      const initialTheme = getResponsiveTheme();

      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(initialTheme);
      }

      setTheme(initialTheme);

      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
        setLanguage(savedLanguage);
      }

      setIsThemeLoaded(true);
    };

    initializeSettings();
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (isThemeLoaded && typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme, isThemeLoaded]);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('news-analyzer-language', language);
    }
  }, [language]);

  const value: SettingsContextType = {
    theme,
    language,
    setTheme,
    setLanguage,
    isRequestInProgress,
    setIsRequestInProgress,
    isThemeLoaded,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};