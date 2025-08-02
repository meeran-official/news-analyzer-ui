'use client';
import { ProblemAnalysis } from '../types';
import { AnimatedSection } from './AnimatedSection';

interface AnalysisResultsProps {
  analysis: ProblemAnalysis;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => (
  <div id="analysis-section" className="space-y-8">
    <header className="text-center space-y-3">
      <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">{analysis.topic}</h2>
      <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">{analysis.summary}</p>
    </header>

    <AnimatedSection>
      <div className="bg-white/10 backdrop-blur rounded-lg border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-3">The Aggregated Problem</h3>
        <p className="text-gray-200 leading-relaxed">{analysis.aggregatedProblem}</p>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="bg-white/10 backdrop-blur rounded-lg border border-white/10 p-6 text-center">
        <h3 className="text-xl font-semibold mb-3">Proposed Solution</h3>
        <p className="text-gray-200 leading-relaxed">{analysis.solutionProposal}</p>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur rounded-lg border border-white/10 p-4">
          <h4 className="text-lg font-semibold mb-2">Proposing Viewpoint</h4>
          <p className="text-gray-200 leading-relaxed">{analysis.proposingViewpoint}</p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg border border-white/10 p-4">
          <h4 className="text-lg font-semibold mb-2">Opposing Viewpoint</h4>
          <p className="text-gray-200 leading-relaxed">{analysis.opposingViewpoint}</p>
        </div>
      </div>
    </AnimatedSection>

    <AnimatedSection>
      <div className="bg-white/10 backdrop-blur rounded-lg border border-white/10 p-4">
        <h4 className="text-lg font-semibold mb-2">Historical Perspective</h4>
        <p className="text-gray-200 leading-relaxed">{analysis.historicalPerspective}</p>
      </div>
    </AnimatedSection>

    <footer className="text-center pt-4">
      <p className="text-gray-400 italic">&quot;{analysis.motivationalProverb}&quot;</p>
    </footer>
  </div>
);

export default AnalysisResults;
