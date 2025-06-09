import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { prisma } from '../../../lib/prisma';
import { schedulePost } from '../../../lib/queue/postQueue';

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
  
  const userId = session.user.id;

  try {
    // Get post ID from request body
    const { postId } = req.body;
    
    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }
    
    // Find the post in the database
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Verify that the post belongs to the authenticated user
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to schedule this post' });
    }
    
    // Add the post to the scheduling queue
    const job = await schedulePost(post);
    
    return res.status(200).json({
      message: 'Post scheduled successfully',
      jobId: job.id,
      scheduledAt: post.scheduledAt,
    });
  } catch (error: any) {
    console.error('Error scheduling post:', error);
    return res.status(500).json({ error: 'Failed to schedule post', details: error.message });
  }
}
