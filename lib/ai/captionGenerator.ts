import openai from '../openai';

interface CaptionOptions {
  topic?: string;
  tone?: 'professional' | 'casual' | 'humorous' | 'inspirational';
  platform?: 'instagram' | 'twitter' | 'linkedin';
  keywords?: string[];
  length?: 'short' | 'medium' | 'long';
}

/**
 * Generates AI-powered caption suggestions based on provided options
 */
export async function generateCaptionSuggestions(
  options: CaptionOptions = {}
): Promise<string[]> {
  try {
    const {
      topic = '',
      tone = 'professional',
      platform = 'instagram',
      keywords = [],
      length = 'medium',
    } = options;

    // Determine character count based on length and platform
    let characterCount = 150; // Default medium length
    if (length === 'short') characterCount = 80;
    if (length === 'long') characterCount = 250;
    
    // Adjust for platform specifics
    if (platform === 'twitter') characterCount = Math.min(characterCount, 280);
    if (platform === 'linkedin' && length === 'long') characterCount = 300;

    // Build the prompt for OpenAI
    const prompt = `Generate 3 engaging social media captions for ${platform} with the following characteristics:
- Topic: ${topic || 'general business/entrepreneurship'}
- Tone: ${tone}
- Keywords to include: ${keywords.join(', ') || 'none specified'}
- Maximum length: approximately ${characterCount} characters
- Include appropriate hashtags
- Make it engaging and likely to drive engagement
- Format each caption as a separate paragraph
- Do not number the captions`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a social media expert who creates engaging captions for solopreneurs and small businesses.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract and clean up the generated captions
    const content = response.choices[0]?.message?.content || '';
    
    // Split by double newlines to separate captions
    const captions = content
      .split('\n\n')
      .map(caption => caption.trim())
      .filter(caption => caption.length > 0);

    return captions.length > 0 ? captions : ['No captions generated. Please try again.'];
  } catch (error: any) {
    console.error('Error generating captions:', error);
    return ['Failed to generate captions. Please try again later.'];
  }
}
