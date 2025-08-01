'use client'; // This directive turns the page into a Client Component

import { AnimatedSection } from './components/AnimatedSection';
import { useState, useEffect } from 'react';

// const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// The ProblemAnalysis interface remains the same
interface ProblemAnalysis {
  topic: string;
  summary: string;
  aggregatedProblem: string;
  solutionProposal: string;
  proposingViewpoint: string;
  opposingViewpoint: string;
  historicalPerspective: string;
  motivationalProverb: string;
}

export default function HomePage() {
  const [analysis, setAnalysis] = useState<ProblemAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [showAllTopics, setShowAllTopics] = useState(false);

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
      console.error("Failed to fetch topic suggestions", error);
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
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomTopic = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/random-topic`);
      if (!res.ok) return "Global AI Regulation"; // Fallback
      return await res.text();
    } catch (error) {
      console.error("Failed to fetch random topic", error);
      return "Global AI Regulation"; // Fallback
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      // First, get a random topic for the initial load
      const initialTopic = await fetchRandomTopic();
      setTopicInput(initialTopic);
      // Then, fetch the analysis for that topic
      fetchAnalysis(initialTopic);
      // Also fetch the topic suggestions for the tags
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
    setTopicInput("");
    setAnalysis(null);
    setError(null);
  };

  

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-900 text-white">
      <div className="w-full max-w-5xl font-sans">

        {/* --- INTERACTION HEADER --- */}
        <div className="p-4 mb-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-cyan-400 mb-4">Analyze a News Topic</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a topic (e.g., 'Global supply chain')"
              className="flex-grow p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button onClick={handleAnalyzeClick} disabled={isLoading} className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700 disabled:bg-gray-500 transition-colors">
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
            <button
              onClick={handleClearClick}
              disabled={!topicInput}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 disabled:bg-gray-500 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400 mb-3">Or select a trending topic:</p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {suggestedTopics.length > 0 ? (
                (showAllTopics ? suggestedTopics : suggestedTopics.slice(0, 4)).map(topic => (
                  <button
                    key={topic}
                    onClick={() => { setTopicInput(topic); fetchAnalysis(topic); }}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-700 text-sm rounded-full hover:bg-cyan-700 disabled:bg-gray-600 transition-colors"
                  >
                    {topic}
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-500">Loading topics...</p>
              )}
              {/* --- "Show More" Button Logic --- */}
              {!showAllTopics && suggestedTopics.length > 4 && (
                  <button onClick={() => setShowAllTopics(true)} className="px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300">
                      Show More...
                  </button>
              )}
              {showAllTopics && suggestedTopics.length > 4 && (
                  <button onClick={() => setShowAllTopics(false)} className="px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300">
                      Show Less
                  </button>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <button onClick={handleRandomClick} disabled={isLoading || suggestedTopics.length === 0} className="text-sm text-gray-400 hover:text-cyan-400 disabled:text-gray-600 transition-colors">
              or analyze a random topic
            </button>
          </div>
        </div>

        {/* --- DYNAMIC CONTENT DISPLAY --- */}
        <div className="mt-8">
          {isLoading && <LoadingSkeleton />}
          {error && <ErrorMessage message={error} />}
          {analysis && (
            <div className="animate-fade-in">
              <header className="mb-12 border-b border-gray-700 pb-4 text-center">
                <h2 className="text-4xl font-bold text-cyan-400">{analysis.topic}</h2>
                <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">{analysis.summary}</p>
              </header>

              <AnimatedSection>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-200 mb-3">The Aggregated Problem</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{analysis.aggregatedProblem}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-semibold text-gray-200 mb-3 text-center">Proposed Solution</h2>
                <p className="text-lg text-center text-cyan-300 leading-relaxed max-w-3xl mx-auto">{analysis.solutionProposal}</p>
              </AnimatedSection>

              <AnimatedSection>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <section className="p-4 border border-gray-700 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Proposing Viewpoint</h3>
                    <p className="text-gray-400 leading-relaxed">{analysis.proposingViewpoint}</p>
                  </section>
                  <section className="p-4 border border-gray-700 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Opposing Viewpoint</h3>
                    <p className="text-gray-400 leading-relaxed">{analysis.opposingViewpoint}</p>
                  </section>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Historical Perspective</h3>
                <p className="text-gray-400 leading-relaxed">{analysis.historicalPerspective}</p>
              </AnimatedSection>

              <footer className="mt-12 pt-6 border-t border-gray-700 text-center">
                <p className="text-md text-gray-500 italic">&quot;{analysis.motivationalProverb}&quot;</p>
              </footer>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const LoadingSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Simplified version of your previous loading skeleton */}
    <div className="h-10 bg-gray-700 rounded-md w-3/4 mx-auto mb-4"></div>
    <div className="mt-4 h-5 bg-gray-700 rounded-md w-full"></div>
    <div className="mt-8 p-6 bg-gray-800 rounded-lg">
      <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-4"></div>
      <div className="h-6 bg-gray-700 rounded-md w-full"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
    <p className="font-bold text-red-400">Analysis Failed</p>
    <p className="text-red-300">{message}</p>
  </div>
);
