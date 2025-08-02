'use client';
import { ProblemAnalysis } from '../types';
import { AnimatedSection } from './AnimatedSection';
import { Lightbulb, Target, Users, History, Quote, Sparkles } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: ProblemAnalysis;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => (
  <div id="analysis-section" className="space-y-10">
    {/* Enhanced Header */}
    <AnimatedSection delay={0}>
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-500/60 dark:border-cyan-400/30">
          <Sparkles className="h-5 w-5 text-white dark:text-cyan-400" />
          <span className="text-sm font-medium text-white dark:text-cyan-300">Analysis Complete</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-cyan-700 to-blue-700 dark:from-white dark:via-cyan-200 dark:to-blue-300 bg-clip-text text-transparent leading-tight">
          {analysis.topic}
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
          {analysis.summary}
        </p>
      </div>
    </AnimatedSection>

    {/* Problem Analysis */}
    <AnimatedSection delay={0.1}>
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 backdrop-blur-xl rounded-2xl border border-red-200 dark:border-red-800/50 p-8 hover:border-red-300 dark:hover:border-red-700/70 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-400/30">
            <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-red-700 dark:text-red-300">The Core Problem</h3>
        </div>
        <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-light">{analysis.aggregatedProblem}</p>
      </div>
    </AnimatedSection>

    {/* Solution Proposal */}
    <AnimatedSection delay={0.2}>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-xl rounded-2xl border border-green-200 dark:border-green-800/50 p-8 hover:border-green-300 dark:hover:border-green-700/70 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30">
            <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Proposed Solution</h3>
        </div>
        <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-light">{analysis.solutionProposal}</p>
      </div>
    </AnimatedSection>

    {/* Viewpoints Grid */}
    <AnimatedSection delay={0.3}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 backdrop-blur-xl rounded-2xl border border-blue-200 dark:border-blue-800/50 p-8 hover:border-blue-300 dark:hover:border-blue-700/70 transition-all duration-300 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300">Supporting View</h4>
          </div>
          <p className="text-gray-800 dark:text-gray-100 leading-relaxed font-light">{analysis.proposingViewpoint}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-xl rounded-2xl border border-purple-200 dark:border-purple-800/50 p-8 hover:border-purple-300 dark:hover:border-purple-700/70 transition-all duration-300 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 scale-x-[-1]" />
            </div>
            <h4 className="text-xl font-bold text-purple-700 dark:text-purple-300">Opposing View</h4>
          </div>
          <p className="text-gray-800 dark:text-gray-100 leading-relaxed font-light">{analysis.opposingViewpoint}</p>
        </div>
      </div>
    </AnimatedSection>

    {/* Historical Context */}
    <AnimatedSection delay={0.4}>
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 backdrop-blur-xl rounded-2xl border border-amber-200 dark:border-amber-800/50 p-8 hover:border-amber-300 dark:hover:border-amber-700/70 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/30">
            <History className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h4 className="text-2xl font-bold text-amber-700 dark:text-amber-300">Historical Context</h4>
        </div>
        <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-light">{analysis.historicalPerspective}</p>
      </div>
    </AnimatedSection>

    {/* Motivational Quote */}
    <AnimatedSection delay={0.5}>
      <div className="text-center py-8">
                  <div className="inline-flex items-center gap-4 px-8 py-6 rounded-2xl bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-700 backdrop-blur-xl max-w-4xl">
          <Quote className="h-8 w-8 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
          <blockquote className="text-xl sm:text-2xl font-light text-gray-800 dark:text-gray-100 italic leading-relaxed">
            {analysis.motivationalProverb}
          </blockquote>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

export default AnalysisResults;
