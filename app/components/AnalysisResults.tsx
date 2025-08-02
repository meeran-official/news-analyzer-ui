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
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">Analysis Complete</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight">
          {analysis.topic}
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
          {analysis.summary}
        </p>
      </div>
    </AnimatedSection>

    {/* Problem Analysis */}
    <AnimatedSection delay={0.1}>
      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl border border-red-400/20 p-8 hover:border-red-400/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-400/30">
            <Target className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-red-300">The Core Problem</h3>
        </div>
        <p className="text-gray-200 leading-relaxed text-lg font-light">{analysis.aggregatedProblem}</p>
      </div>
    </AnimatedSection>

    {/* Solution Proposal */}
    <AnimatedSection delay={0.2}>
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl border border-green-400/20 p-8 hover:border-green-400/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30">
            <Lightbulb className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-300">Proposed Solution</h3>
        </div>
        <p className="text-gray-200 leading-relaxed text-lg font-light">{analysis.solutionProposal}</p>
      </div>
    </AnimatedSection>

    {/* Viewpoints Grid */}
    <AnimatedSection delay={0.3}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-8 hover:border-blue-400/30 transition-all duration-300 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-bold text-blue-300">Supporting View</h4>
          </div>
          <p className="text-gray-200 leading-relaxed font-light">{analysis.proposingViewpoint}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-8 hover:border-purple-400/30 transition-all duration-300 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
              <Users className="h-6 w-6 text-purple-400 scale-x-[-1]" />
            </div>
            <h4 className="text-xl font-bold text-purple-300">Opposing View</h4>
          </div>
          <p className="text-gray-200 leading-relaxed font-light">{analysis.opposingViewpoint}</p>
        </div>
      </div>
    </AnimatedSection>

    {/* Historical Context */}
    <AnimatedSection delay={0.4}>
      <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-8 hover:border-amber-400/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/30">
            <History className="h-6 w-6 text-amber-400" />
          </div>
          <h4 className="text-2xl font-bold text-amber-300">Historical Context</h4>
        </div>
        <p className="text-gray-200 leading-relaxed text-lg font-light">{analysis.historicalPerspective}</p>
      </div>
    </AnimatedSection>

    {/* Motivational Quote */}
    <AnimatedSection delay={0.5}>
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 backdrop-blur-xl max-w-4xl">
          <Quote className="h-8 w-8 text-cyan-400 flex-shrink-0" />
          <blockquote className="text-xl sm:text-2xl font-light text-gray-200 italic leading-relaxed">
            {analysis.motivationalProverb}
          </blockquote>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

export default AnalysisResults;
