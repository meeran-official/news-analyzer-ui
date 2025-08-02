'use client';
import { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface TopicSuggestionsProps {
  topics: string[];
  onSelect: (topic: string) => void;
  isLoading: boolean;
}

export const TopicSuggestions = ({ topics, onSelect, isLoading }: TopicSuggestionsProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleTopics = showAll ? topics : topics.slice(0, 6);

  if (topics.length === 0) {
    return (
      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <TrendingUp className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">Loading trending topics...</span>
          </div>
          <div className="flex justify-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
          <TrendingUp className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Trending Topics</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Click any topic to analyze it instantly</p>
      </div>

      {/* Topic chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {visibleTopics.map((topic, index) => (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            disabled={isLoading}
            className="group relative px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:border-cyan-400/50 hover:text-cyan-700 dark:hover:text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            <span className="relative z-10 font-medium text-sm">{topic}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Show more/less button */}
      {topics.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:scale-105"
          >
            <span>{showAll ? 'Show Less' : `Show ${topics.length - 6} More`}</span>
            {showAll ? (
              <ChevronUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicSuggestions;
