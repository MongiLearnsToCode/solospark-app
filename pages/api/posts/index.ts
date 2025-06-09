import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is authenticated
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = session.user.id;

  // Handle POST request (create post)
  if (req.method === 'POST') {
    try {
      const { caption, media, platforms, scheduledAt, platformSpecific } = req.body;
      
      // Validate required fields
      if (!caption || !platforms || !scheduledAt) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Create post in database
      const post = await prisma.post.create({
        data: {
          caption,
          media,
          platforms,
          scheduledAt: new Date(scheduledAt),
          userId,
          platformSpecific: platformSpecific || {},
        },
      });
      
      return res.status(201).json(post);
    } catch (error: any) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
  }
  
  // Handle GET request (fetch posts)
  else if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        orderBy: {
          scheduledAt: 'asc',
        },
      });
      
      return res.status(200).json(posts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
  }
  
  // Handle unsupported methods
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
