'use client';

import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { TopicSuggestions } from './components/TopicSuggestions';
import { AnalysisResults } from './components/AnalysisResults';
import { LoadingMessages } from './components/LoadingMessages';
import { SettingsPanel } from './components/SettingsPanel';
import { ProblemAnalysis } from './types';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useSettings } from './contexts/SettingsContext';
import { apiService } from './services/apiService';

export default function HomePage() {
  const { language, isRequestInProgress, setIsRequestInProgress, isThemeLoaded } = useSettings();
  const [analysis, setAnalysis] = useState<ProblemAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicInput, setTopicInput] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAnalyzeClick();
    }
  };

  const fetchTopicSuggestions = async () => {
    try {
      const topics = await apiService.fetchTopicSuggestions();
      setSuggestedTopics(topics);
    } catch (error) {
      console.error('Failed to fetch topic suggestions', error);
    }
  };

  const fetchAnalysis = useCallback(async (topic: string) => {
    if (isRequestInProgress) return; // Prevent multiple parallel requests
    
    setIsRequestInProgress(true);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const data = await apiService.fetchAnalysis(topic, language);
      setAnalysis(data);
      setTimeout(() => {
        document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRequestInProgress(false);
    }
  }, [language, isRequestInProgress, setIsRequestInProgress]);

  const fetchRandomTopic = useCallback(async () => {
    try {
      return await apiService.fetchRandomTopic();
    } catch (error) {
      console.error('Failed to fetch random topic', error);
      return 'Global AI Regulation'; // Fallback
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      const initialTopic = await fetchRandomTopic();
      setTopicInput(initialTopic);
      fetchAnalysis(initialTopic);
      fetchTopicSuggestions();
    };

    loadInitialData();
  }, []);

  const handleAnalyzeClick = () => {
    if (topicInput.trim()) {
      fetchAnalysis(topicInput);
    }
  };

  const handleRandomClick = useCallback(async () => {
    if (isRequestInProgress) return; // Prevent multiple requests
    
    // Clear any existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Debounce the request
    const timeout = setTimeout(async () => {
    const randomTopic = await fetchRandomTopic();
    setTopicInput(randomTopic);
    fetchAnalysis(randomTopic);
    }, 300);
    
    setDebounceTimeout(timeout);
  }, [isRequestInProgress, debounceTimeout, fetchRandomTopic, fetchAnalysis]);

  const handleClearClick = () => {
    setTopicInput('');
    setAnalysis(null);
    setError(null);
  };

  // Show loading screen until theme is loaded to prevent flash
  if (!isThemeLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-300">
      {/* Settings Panel */}
      <SettingsPanel />
      
      {/* Background decoration with responsive adjustments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/5 md:bg-cyan-500/10 md:dark:bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-500/5 md:bg-blue-500/10 md:dark:bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/3 md:bg-purple-500/5 md:dark:bg-purple-500/2 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        <SearchBar
          topic={topicInput}
          onTopicChange={setTopicInput}
          onAnalyze={handleAnalyzeClick}
          onClear={handleClearClick}
          onRandom={handleRandomClick}
          isLoading={isLoading || isRequestInProgress}
          onKeyDown={handleKeyDown}
        />
        <TopicSuggestions
          topics={suggestedTopics}
          onSelect={(topic) => {
            setTopicInput(topic);
            fetchAnalysis(topic);
          }}
          isLoading={isLoading || isRequestInProgress}
        />
        
        {/* Use new LoadingMessages component */}
        <LoadingMessages isLoading={isLoading} />
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={() => {
              if (topicInput.trim()) {
                fetchAnalysis(topicInput);
              }
            }} 
          />
        )}
        {analysis && <AnalysisResults analysis={analysis} />}
      </div>
    </main>
  );
}

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="text-center space-y-6 py-12">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 dark:bg-red-500/30 border-2 border-red-400/30 dark:border-red-400/50">
      <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
    </div>
    
    <div className="space-y-3">
      <h3 className="text-2xl font-bold text-red-600 dark:text-red-300">Analysis Failed</h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">{message}</p>
    </div>

    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 text-red-600 dark:text-red-300 hover:from-red-500/30 hover:to-orange-500/30 hover:border-red-400/50 transition-all duration-200 hover:scale-105"
      >
        <RefreshCw className="h-4 w-4" />
        <span className="font-medium">Try Again</span>
      </button>
    )}
  </div>
);