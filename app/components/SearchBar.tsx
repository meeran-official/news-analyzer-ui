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
  <div className="p-4 bg-gray-800 rounded-lg shadow space-y-4">
    <h1 className="text-2xl font-bold text-center text-cyan-400">Analyze a News Topic</h1>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter a topic"
        className="flex-1 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:bg-cyan-400 transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      <button
        onClick={onClear}
        disabled={!topic}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-500 transition-colors"
      >
        Clear
      </button>
    </div>
    <div className="text-center">
      <button
        onClick={onRandom}
        disabled={isLoading}
        className="text-sm text-gray-400 hover:text-cyan-400 disabled:text-gray-600 transition-colors"
      >
        or analyze a random topic
      </button>
    </div>
  </div>
);

export default SearchBar;
