'use client';
import { useState } from 'react';

interface TopicSuggestionsProps {
  topics: string[];
  onSelect: (topic: string) => void;
  isLoading: boolean;
}

export const TopicSuggestions = ({ topics, onSelect, isLoading }: TopicSuggestionsProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleTopics = showAll ? topics : topics.slice(0, 4);

  return (
    <div className="pt-4 border-t border-gray-700">
      <p className="text-center text-sm text-gray-400 mb-3">Or select a trending topic:</p>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {topics.length > 0 ? (
          <>
            {visibleTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => onSelect(topic)}
                disabled={isLoading}
                className="px-3 py-1 bg-gray-700 text-sm rounded-full hover:bg-cyan-700 disabled:bg-gray-600 transition-colors"
              >
                {topic}
              </button>
            ))}
            {topics.length > 4 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Show More...
              </button>
            )}
            {topics.length > 4 && showAll && (
              <button
                onClick={() => setShowAll(false)}
                className="px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Show Less
              </button>
            )}
          </>
        ) : (
          <p className="text-xs text-gray-500">Loading topics...</p>
        )}
      </div>
    </div>
  );
};

export default TopicSuggestions;
