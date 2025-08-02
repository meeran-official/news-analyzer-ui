'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ta';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  useMockData: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setUseMockData: (useMockData: boolean) => void;
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

// Function to get system preference
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Function to get responsive theme based on screen size
const getResponsiveTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const isMobile = window.innerWidth < 768; // md breakpoint
  const systemTheme = getSystemTheme();
  
  // Default to system preference, but you can customize this logic
  // For now, let's respect system preference on all devices
  return systemTheme;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [useMockData, setUseMockData] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = typeof window !== 'undefined' 
        ? localStorage.getItem('news-analyzer-theme') as Theme 
        : null;
      
      const savedLanguage = typeof window !== 'undefined'
        ? localStorage.getItem('news-analyzer-language') as Language
        : null;
      
      const savedMockData = typeof window !== 'undefined'
        ? localStorage.getItem('news-analyzer-use-mock-data') === 'true'
        : false;
      
      let initialTheme: Theme;
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        initialTheme = savedTheme;
      } else {
        // Use responsive theme logic
        initialTheme = getResponsiveTheme();
      }
      
      // Apply theme immediately to prevent flash
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(initialTheme);
      }
      
      setTheme(initialTheme);
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
        setLanguage(savedLanguage);
      }
      
      setUseMockData(savedMockData);
      
      setIsThemeLoaded(true);
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('news-analyzer-theme');
      // Only update if user hasn't explicitly set a theme
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (isThemeLoaded && typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('news-analyzer-theme', theme);
    }
  }, [theme, isThemeLoaded]);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('news-analyzer-language', language);
    }
  }, [language]);

  // Save mock data preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('news-analyzer-use-mock-data', useMockData.toString());
    }
  }, [useMockData]);

  const value: SettingsContextType = {
    theme,
    language,
    useMockData,
    setTheme,
    setLanguage,
    setUseMockData,
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