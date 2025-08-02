'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { TopicSuggestions } from './components/TopicSuggestions';
import { AnalysisResults } from './components/AnalysisResults';
import { ProblemAnalysis } from './types';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function HomePage() {
  const [analysis, setAnalysis] = useState<ProblemAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicInput, setTopicInput] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAnalyzeClick();
    }
  };

  const fetchTopicSuggestions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/suggestions`);
      if (!res.ok) return;
      const topics = await res.json();
      if (Array.isArray(topics)) {
        setSuggestedTopics(topics);
      }
    } catch (error) {
      console.error('Failed to fetch topic suggestions', error);
    }
  };

  const fetchAnalysis = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze?topic=${encodeURIComponent(topic)}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch analysis for ${topic}`);
      }
      const data: ProblemAnalysis = await res.json();
      setAnalysis(data);
      setTimeout(() => {
        document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomTopic = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/random-topic`);
      if (!res.ok) return 'Global AI Regulation'; // Fallback
      return await res.text();
    } catch (error) {
      console.error('Failed to fetch random topic', error);
      return 'Global AI Regulation'; // Fallback
    }
  };

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

  const handleRandomClick = async () => {
    const randomTopic = await fetchRandomTopic();
    setTopicInput(randomTopic);
    fetchAnalysis(randomTopic);
  };

  const handleClearClick = () => {
    setTopicInput('');
    setAnalysis(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        <SearchBar
          topic={topicInput}
          onTopicChange={setTopicInput}
          onAnalyze={handleAnalyzeClick}
          onClear={handleClearClick}
          onRandom={handleRandomClick}
          isLoading={isLoading}
          onKeyDown={handleKeyDown}
        />
        <TopicSuggestions
          topics={suggestedTopics}
          onSelect={(topic) => {
            setTopicInput(topic);
            fetchAnalysis(topic);
          }}
          isLoading={isLoading}
        />
        {isLoading && <LoadingSkeleton />}
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

const LoadingSkeleton = () => (
  <div className="space-y-8">
    {/* Loading header */}
    <div className="text-center space-y-4">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30">
        <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
        <span className="text-sm font-medium text-cyan-300">Analyzing topic...</span>
      </div>
      <div className="h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl w-3/4 mx-auto animate-pulse" />
      <div className="h-6 bg-white/5 rounded-xl w-full max-w-2xl mx-auto animate-pulse" />
    </div>

    {/* Loading content cards */}
    <div className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 animate-pulse"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-xl" />
            <div className="h-6 bg-white/10 rounded-lg w-48" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded-lg w-full" />
            <div className="h-4 bg-white/10 rounded-lg w-5/6" />
            <div className="h-4 bg-white/10 rounded-lg w-4/6" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="text-center space-y-6 py-12">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400/30">
      <AlertTriangle className="h-10 w-10 text-red-400" />
    </div>
    
    <div className="space-y-3">
      <h3 className="text-2xl font-bold text-red-300">Analysis Failed</h3>
      <p className="text-gray-300 max-w-md mx-auto leading-relaxed">{message}</p>
    </div>

    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 text-red-300 hover:from-red-500/30 hover:to-orange-500/30 hover:border-red-400/50 transition-all duration-200 hover:scale-105"
      >
        <RefreshCw className="h-4 w-4" />
        <span className="font-medium">Try Again</span>
      </button>
    )}
  </div>
);
