import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { generateCaptionSuggestions } from '../../../lib/ai/captionGenerator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Check if user is authenticated
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { topic, tone, platform, keywords, length } = req.body;
    
    // Generate captions using OpenAI
    const captions = await generateCaptionSuggestions({
      topic,
      tone,
      platform,
      keywords: Array.isArray(keywords) ? keywords : keywords?.split(',').map((k: string) => k.trim()),
      length,
    });
    
    return res.status(200).json({ captions });
  } catch (error: any) {
    console.error('Error generating captions:', error);
    return res.status(500).json({ error: 'Failed to generate captions', details: error.message });
  }
}
