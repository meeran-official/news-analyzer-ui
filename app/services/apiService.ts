import { ProblemAnalysis } from '../types';
import { 
  mockTopicSuggestions, 
  mockRandomTopics, 
  mockAnalysisData, 
  generateMockAnalysis, 
  simulateApiDelay 
} from '../data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiService {
  private useMockData: boolean;

  constructor(useMockData: boolean = false) {
    this.useMockData = useMockData;
  }

  setUseMockData(useMockData: boolean) {
    this.useMockData = useMockData;
  }

  async fetchTopicSuggestions(): Promise<string[]> {
    if (this.useMockData) {
      await simulateApiDelay(300, 800);
      return mockTopicSuggestions;
    }

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
    if (this.useMockData) {
      await simulateApiDelay(200, 500);
      const randomIndex = Math.floor(Math.random() * mockRandomTopics.length);
      return mockRandomTopics[randomIndex];
    }

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
    if (this.useMockData) {
      await simulateApiDelay(1000, 3000);
      
      // Check if we have predefined mock data for this topic
      if (mockAnalysisData[topic]) {
        return mockAnalysisData[topic];
      }
      
      // Generate mock data for new topics
      return generateMockAnalysis(topic);
    }

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

// Helper function to check if mock data is enabled
export const isMockDataEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Only allow mock data if it's enabled via environment variable
  if (!isMockDataEnabled()) {
    return false;
  }
  
  // Check for localStorage setting
  const mockDataSetting = localStorage.getItem('news-analyzer-use-mock-data');
  return mockDataSetting === 'true';
};

// Initialize the service with the correct setting
if (typeof window !== 'undefined') {
  apiService.setUseMockData(shouldUseMockData());
} 