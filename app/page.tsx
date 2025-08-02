'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { TopicSuggestions } from './components/TopicSuggestions';
import { AnalysisResults } from './components/AnalysisResults';
import { ProblemAnalysis } from './types';

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
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-10 space-y-8">
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
        {error && <ErrorMessage message={error} />}
        {analysis && <AnalysisResults analysis={analysis} />}
      </div>
    </main>
  );
}

const LoadingSkeleton = () => (
  <div className="w-full animate-pulse space-y-4">
    <div className="h-10 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
    <div className="h-5 bg-gray-300 rounded-md w-full"></div>
    <div className="p-6 bg-white rounded shadow">
      <div className="h-8 bg-gray-300 rounded-md w-1/3 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded-md w-full"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-center">
    <p className="font-bold text-red-600">Analysis Failed</p>
    <p className="text-red-500">{message}</p>
  </div>
);
