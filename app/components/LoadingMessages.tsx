'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Brain, Globe, Zap, Search, MessageSquare, Lightbulb } from 'lucide-react';

const loadingMessages = [
  { icon: Brain, text: "Analyzing global news patterns..." },
  { icon: Search, text: "Gathering diverse perspectives..." },
  { icon: Globe, text: "Connecting international viewpoints..." },
  { icon: MessageSquare, text: "Processing expert opinions..." },
  { icon: Lightbulb, text: "Generating creative solutions..." },
  { icon: Zap, text: "Synthesizing complex information..." },
  { icon: Brain, text: "Consulting our AI analysts..." },
  { icon: Globe, text: "Exploring historical contexts..." },
  { icon: Search, text: "Finding balanced perspectives..." },
  { icon: MessageSquare, text: "Crafting insightful analysis..." },
];

interface LoadingMessagesProps {
  isLoading: boolean;
  useMockData?: boolean;
}

export const LoadingMessages: React.FC<LoadingMessagesProps> = ({ isLoading, useMockData = false }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const currentMessage = loadingMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="space-y-8">
      {/* Creative Loading Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-sm">
          <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
          <span className="text-cyan-300 font-medium">
            {useMockData ? 'Mock Data Analysis in Progress' : 'Deep Analysis in Progress'}
          </span>
        </div>
        
        {/* Animated Message */}
        <div 
          key={currentMessageIndex}
          className="flex items-center justify-center gap-3 text-lg font-medium text-gray-600 dark:text-gray-300 animate-fadeInUp"
        >
          <IconComponent className="h-6 w-6 text-blue-400 animate-pulse" />
          <span>{currentMessage.text}</span>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i <= (currentMessageIndex % 5) 
                ? 'bg-cyan-400 scale-125' 
                : 'bg-white/20'
            }`}
            style={{ 
              animationDelay: `${i * 100}ms`,
              animation: i <= (currentMessageIndex % 5) ? 'pulse 1s infinite' : 'none'
            }}
          />
        ))}
      </div>

      {/* Skeleton Content Cards */}
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-600 p-8 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-shimmer" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 animate-shimmer" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-shimmer" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6 animate-shimmer" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/6 animate-shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* Fun Facts Footer */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {useMockData 
            ? '💡 Using mock data for testing - no API calls are being made!'
            : '💡 Did you know? Our AI processes information from multiple global sources in seconds!'
          }
        </p>
      </div>
    </div>
  );
};