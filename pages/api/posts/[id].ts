import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { prisma } from '../../../lib/prisma';
import { postSchema } from '../../../schemas/postSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the post ID from the URL
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  // Check if user is authenticated
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = session.user.id;

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getPost(req, res, id, userId);
    case 'PUT':
      return updatePost(req, res, id, userId);
    case 'DELETE':
      return deletePost(req, res, id, userId);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// Get a specific post
async function getPost(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: string,
  userId: string
) {
  try {
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
      return res.status(403).json({ error: 'Forbidden: You do not have permission to access this post' });
    }
    
    return res.status(200).json(post);
  } catch (error: any) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
}

// Update a post
async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: string,
  userId: string
) {
  try {
    // Find the post to verify ownership
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Verify that the post belongs to the authenticated user
    if (existingPost.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to update this post' });
    }
    
    // Validate the request body against the schema
    const result = postSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: 'Invalid post data', 
        details: result.error.format() 
      });
    }
    
    // Update the post in the database
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        caption: req.body.caption,
        media: req.body.media,
        platforms: req.body.platforms,
        scheduledAt: new Date(req.body.scheduledAt),
        platformSpecific: req.body.platformSpecific || {},
        updatedAt: new Date(),
      },
    });
    
    return res.status(200).json(updatedPost);
  } catch (error: any) {
    console.error('Error updating post:', error);
    return res.status(500).json({ error: 'Failed to update post', details: error.message });
  }
}

// Delete a post
async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: string,
  userId: string
) {
  try {
    // Find the post to verify ownership
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Verify that the post belongs to the authenticated user
    if (existingPost.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this post' });
    }
    
    // Delete the post from the database
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: 'Failed to delete post', details: error.message });
  }
}
