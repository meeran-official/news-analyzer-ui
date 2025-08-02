'use client';
import React from 'react';

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
  <div className="p-6 bg-white/10 backdrop-blur rounded-xl shadow-lg space-y-6">
    <h1 className="text-3xl font-bold text-center text-cyan-400">Analyze a News Topic</h1>
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter a topic"
        className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:from-cyan-700 disabled:to-blue-700 transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      <button
        onClick={onClear}
        disabled={!topic}
        className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-40 transition-colors"
      >
        Clear
      </button>
    </div>
    <div className="text-center">
      <button
        onClick={onRandom}
        disabled={isLoading}
        className="text-sm text-gray-300 hover:text-cyan-400 disabled:text-gray-500 transition-colors"
      >
        or analyze a random topic
      </button>
    </div>
  </div>
);

export default SearchBar;
