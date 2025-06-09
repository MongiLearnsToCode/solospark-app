/**
 * Mock database for development purposes
 * This allows testing the application without a real database connection
 */

import { Post } from '@prisma/client';

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    caption: 'Excited to announce our new product launch! #innovation #startup',
    media: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop',
    platforms: ['instagram', 'twitter'],
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    userId: 'user123',
    platformSpecific: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    caption: 'Check out our latest blog post on productivity tips for solopreneurs! Link in bio. #productivity #solopreneur',
    media: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
    platforms: ['instagram', 'linkedin'],
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    userId: 'user123',
    platformSpecific: {
      instagram: {
        hashtags: ['productivity', 'solopreneur', 'entrepreneurship']
      }
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    caption: 'Just hit a major milestone! Thanks to all our supporters. 🎉',
    media: null,
    platforms: ['twitter'],
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    userId: 'user123',
    platformSpecific: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock database operations
export const mockDb = {
  post: {
    findMany: async (params: any = {}) => {
      // Filter by userId if provided
      if (params.where?.userId) {
        return mockPosts.filter(post => post.userId === params.where.userId);
      }
      return mockPosts;
    },
    findUnique: async (params: any) => {
      return mockPosts.find(post => post.id === params.where.id) || null;
    },
    create: async (params: any) => {
      const newPost = {
        ...params.data,
        id: `mock-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPosts.push(newPost as Post);
      return newPost;
    },
    update: async (params: any) => {
      const index = mockPosts.findIndex(post => post.id === params.where.id);
      if (index === -1) return null;
      
      const updatedPost = {
        ...mockPosts[index],
        ...params.data,
        updatedAt: new Date(),
      };
      mockPosts[index] = updatedPost;
      return updatedPost;
    },
    delete: async (params: any) => {
      const index = mockPosts.findIndex(post => post.id === params.where.id);
      if (index === -1) return null;
      
      const deletedPost = mockPosts[index];
      mockPosts.splice(index, 1);
      return deletedPost;
    },
  },
};
