import { ProblemAnalysis } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiService {
  async fetchTopicSuggestions(): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/suggestions`);
      if (!res.ok) {
        throw new Error(`Failed to fetch topic suggestions: ${res.status} ${res.statusText}`);
      }
      const topics = await res.json();
      return Array.isArray(topics) ? topics : [];
    } catch (error) {
      console.error('Failed to fetch topic suggestions', error);
      throw error;
    }
  }

  async fetchRandomTopic(): Promise<string> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/random-topic`);
      if (!res.ok) {
        throw new Error(`Failed to fetch random topic: ${res.status} ${res.statusText}`);
      }
      return await res.text();
    } catch (error) {
      console.error('Failed to fetch random topic', error);
      throw error;
    }
  }

  async fetchAnalysis(topic: string, language: string): Promise<ProblemAnalysis> {
    try {
      const params = new URLSearchParams({
        topic: topic,
        language: language === 'ta' ? 'tamil' : 'english'
      });
      
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze?${params}`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Failed to fetch analysis for ${topic}`);
      }
      const data: ProblemAnalysis = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch analysis', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const apiService = new ApiService();