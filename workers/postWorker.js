/**
 * SoloSpark Post Publishing Worker
 * 
 * This worker processes scheduled posts from the BullMQ queue and publishes them
 * to the appropriate social media platforms.
 */

// CommonJS imports
const { Worker } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Define queue configuration locally to avoid import issues
const redisConnection = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
};

const QUEUE_NAMES = {
  POST_SCHEDULING: 'post-scheduling',
  ANALYTICS: 'analytics',
};

// Initialize Prisma client with connection retry options
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Check if we're using a mock database
const useMockDb = process.env.USE_MOCK_DB === 'true';

// Mock database for development
const mockDb = {
  posts: new Map(),
  
  // Mock findUnique method
  findUnique: async (postId) => {
    if (mockDb.posts.has(postId)) {
      return mockDb.posts.get(postId);
    }
    
    // Create a new mock post if it doesn't exist
    const mockPost = {
      id: postId,
      published: false,
      publishedAt: null,
      publishingStatus: {},
    };
    
    mockDb.posts.set(postId, mockPost);
    return mockPost;
  },
  
  // Mock update method
  update: async (postId, data) => {
    const post = await mockDb.findUnique(postId);
    const updatedPost = { ...post, ...data };
    mockDb.posts.set(postId, updatedPost);
    return updatedPost;
  },
};

/**
 * Publish a post to Instagram
 */
async function publishToInstagram(postData) {
  // This would be replaced with actual Instagram API integration
  console.log(`[Instagram] Publishing post: ${postData.caption}`);
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log success and return true
    console.log(`[Instagram] Successfully published post ${postData.postId}`);
    return true;
  } catch (error) {
    console.error(`[Instagram] Failed to publish post ${postData.postId}:`, error);
    return false;
  }
}

/**
 * Publish a post to Twitter
 */
async function publishToTwitter(postData) {
  // This would be replaced with actual Twitter API integration
  console.log(`[Twitter] Publishing post: ${postData.caption}`);
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Log success and return true
    console.log(`[Twitter] Successfully published post ${postData.postId}`);
    return true;
  } catch (error) {
    console.error(`[Twitter] Failed to publish post ${postData.postId}:`, error);
    return false;
  }
}

/**
 * Publish a post to LinkedIn
 */
async function publishToLinkedIn(postData) {
  // This would be replaced with actual LinkedIn API integration
  console.log(`[LinkedIn] Publishing post: ${postData.caption}`);
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Log success and return true
    console.log(`[LinkedIn] Successfully published post ${postData.postId}`);
    return true;
  } catch (error) {
    console.error(`[LinkedIn] Failed to publish post ${postData.postId}:`, error);
    return false;
  }
}

/**
 * Main worker function to process posts
 * This is the function that will be called by the BullMQ worker
 */
async function processPost(job) {
  console.log(`Processing job ${job.id}: Publishing post to ${job.data.platforms.join(', ')}`);
  
  const results = {};
  const { platforms } = job.data;
  
  // Process each platform in parallel
  const publishPromises = platforms.map(async (platform) => {
    try {
      let success = false;
      
      switch (platform) {
        case 'instagram':
          success = await publishToInstagram(job.data);
          break;
        case 'twitter':
          success = await publishToTwitter(job.data);
          break;
        case 'linkedin':
          success = await publishToLinkedIn(job.data);
          break;
        default:
          console.warn(`Unknown platform: ${platform}`);
          success = false;
      }
      
      results[platform] = success;
      
      // Update the post status in the database
      await updatePostStatus(job.data.postId, platform, success);
      
    } catch (error) {
      console.error(`Error publishing to ${platform}:`, error);
      results[platform] = false;
      
      // Update the post status in the database
      await updatePostStatus(job.data.postId, platform, false, error);
    }
  });
  
  // Wait for all publishing operations to complete
  await Promise.all(publishPromises);
  
  // Return the results
  return results;
}

/**
 * Update post status in the database
 */
async function updatePostStatus(
  postId, 
  platform, 
  success, 
  error
) {
  try {
    let post;
    let currentStatus;
    
    if (useMockDb) {
      // Use mock database in development
      post = await mockDb.findUnique(postId);
      currentStatus = post.publishingStatus || {};
      
      // Update the mock post
      const updatedStatus = {
        ...currentStatus,
        [platform]: {
          published: success,
          publishedAt: success ? new Date() : null,
          error: success ? null : String(error || 'Unknown error'),
        },
      };
      
      await mockDb.update(postId, {
        publishingStatus: updatedStatus,
        published: success,
        publishedAt: success ? new Date() : post.publishedAt,
      });
      
      console.log(`[MOCK DB] Updated status for post ${postId} on ${platform}: ${success ? 'Success' : 'Failed'}`);
    } else {
      // Use real Prisma client in production
      try {
        // Get the current post
        post = await prisma.post.findUnique({
          where: { id: postId },
        });
        
        if (!post) {
          console.error(`Post ${postId} not found in database`);
          return;
        }
        
        // Get the current publishing status or initialize as empty object
        currentStatus = post.publishingStatus || {};
        
        // Update the post with publishing status
        await prisma.post.update({
          where: { id: postId },
          data: {
            publishingStatus: {
              ...currentStatus,
              [platform]: {
                published: success,
                publishedAt: success ? new Date() : null,
                error: success ? null : String(error || 'Unknown error'),
              },
            },
            published: success,
            publishedAt: success ? new Date() : post.publishedAt,
          },
        });
        
        console.log(`Updated status for post ${postId} on ${platform}: ${success ? 'Success' : 'Failed'}`);
      } catch (prismaError) {
        console.error(`Prisma error updating post status:`, prismaError);
        
        // Fallback to mock DB if Prisma fails
        console.log(`Falling back to mock DB due to Prisma error`);
        
        post = await mockDb.findUnique(postId);
        currentStatus = post.publishingStatus || {};
        
        // Update the mock post
        const updatedStatus = {
          ...currentStatus,
          [platform]: {
            published: success,
            publishedAt: success ? new Date() : null,
            error: success ? null : String(error || 'Unknown error'),
          },
        };
        
        await mockDb.update(postId, {
          publishingStatus: updatedStatus,
          published: success,
          publishedAt: success ? new Date() : post.publishedAt,
        });
        
        console.log(`[FALLBACK MOCK DB] Updated status for post ${postId} on ${platform}: ${success ? 'Success' : 'Failed'}`);
      }
    }
  } catch (dbError) {
    console.error(`Failed to update post status in database:`, dbError);
  }
}

// Create the worker
const worker = new Worker(
  QUEUE_NAMES.POST_SCHEDULING,
  processPost,
  { 
    connection: redisConnection,
    concurrency: 5, // Process up to 5 jobs concurrently
    limiter: {
      max: 10, // Maximum number of jobs processed in duration
      duration: 1000, // Duration in ms for rate limiting (1 second)
    },
  }
);

// Add event handlers to worker
worker.on('completed', (job, result) => {
  const platforms = Object.keys(result);
  const successCount = Object.values(result).filter(Boolean).length;
  
  console.log(`Job ${job?.id} completed. Published to ${successCount}/${platforms.length} platforms.`);
  
  // Log detailed results
  platforms.forEach(platform => {
    console.log(`- ${platform}: ${result[platform] ? 'Success' : 'Failed'}`);
  });
});

worker.on('failed', (job, error) => {
  console.error(`Job ${job?.id} failed with error:`, error);
});

worker.on('error', (error) => {
  console.error('Worker error:', error);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM signal, closing worker...');
  await worker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT signal, closing worker...');
  await worker.close();
  process.exit(0);
});

console.log(`Post worker started. Listening for jobs on queue: ${QUEUE_NAMES.POST_SCHEDULING}`);
