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
        console.warn('Failed to fetch topic suggestions, falling back to mock data');
        return mockTopicSuggestions;
      }
      const topics = await res.json();
      return Array.isArray(topics) ? topics : mockTopicSuggestions;
    } catch (error) {
      console.error('Failed to fetch topic suggestions', error);
      return mockTopicSuggestions;
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
        console.warn('Failed to fetch random topic, falling back to mock data');
        const randomIndex = Math.floor(Math.random() * mockRandomTopics.length);
        return mockRandomTopics[randomIndex];
      }
      return await res.text();
    } catch (error) {
      console.error('Failed to fetch random topic', error);
      const randomIndex = Math.floor(Math.random() * mockRandomTopics.length);
      return mockRandomTopics[randomIndex];
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
      console.error('Failed to fetch analysis, falling back to mock data', error);
      // Fallback to mock data on error
      return generateMockAnalysis(topic);
    }
  }
}

// Create a singleton instance
export const apiService = new ApiService();

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for environment variable
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return true;
  }
  
  // Check for localStorage setting
  const mockDataSetting = localStorage.getItem('news-analyzer-use-mock-data');
  return mockDataSetting === 'true';
};

// Initialize the service with the correct setting
if (typeof window !== 'undefined') {
  apiService.setUseMockData(shouldUseMockData());
} 