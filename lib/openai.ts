import OpenAI from 'openai';
import mockOpenAI from './mockOpenAI';

// Check if OpenAI API key is available in environment variables
const hasApiKey = !!process.env.OPENAI_API_KEY;
const useMockOpenAI = process.env.USE_MOCK_OPENAI === 'true' || !hasApiKey;

if (!hasApiKey) {
  console.warn('OPENAI_API_KEY environment variable is not set. Using mock OpenAI client.');
}

// Create OpenAI client instance or use mock
let openai;

if (useMockOpenAI) {
  console.info('Using mock OpenAI client for development');
  openai = mockOpenAI;
} else {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export default openai;
