'use client';
import React from 'react';
import { Search, Shuffle, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  topic: string;
  onTopicChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onRandom: () => void;
  isLoading: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  topic,
  onTopicChange,
  onAnalyze,
  onClear,
  onRandom,
  isLoading,
  onKeyDown,
}: SearchBarProps) => (
  <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 space-y-8">
    {/* Header with improved typography */}
    <div className="text-center space-y-3">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        News Analyzer
      </h1>
      <p className="text-gray-300 text-lg font-medium">AI-Powered Topic Analysis</p>
    </div>

    {/* Search input with enhanced styling */}
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter any news topic to analyze..."
        className="w-full pl-12 pr-4 py-4 text-lg rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200"
      />
    </div>

    {/* Action buttons with improved layout */}
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onAnalyze}
        disabled={isLoading || !topic.trim()}
        className="flex-1 group relative px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Analyze Topic</span>
            </>
          )}
        </div>
      </button>
      
      <button
        onClick={onClear}
        disabled={!topic}
        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center justify-center gap-2">
          <X className="h-4 w-4" />
          <span>Clear</span>
        </div>
      </button>
    </div>

    {/* Random topic button with enhanced styling */}
    <div className="text-center pt-2">
      <button
        onClick={onRandom}
        disabled={isLoading}
        className="group inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 disabled:text-gray-500 transition-all duration-200 hover:scale-105"
      >
        <Shuffle className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
        <span className="font-medium">Try a random topic</span>
      </button>
    </div>
  </div>
);

export default SearchBar;
