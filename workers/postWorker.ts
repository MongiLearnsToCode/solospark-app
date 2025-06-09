/**
 * SoloSpark Post Publishing Worker
 * 
 * This worker processes scheduled posts from the BullMQ queue and publishes them
 * to the appropriate social media platforms.
 */

// CommonJS imports
const { Worker } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const { redisConnection, QUEUE_NAMES } = require('../lib/queue/config');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Type definitions for TypeScript
 */
type PostJobData = {
  postId: string;
  caption: string;
  media?: string;
  platforms: string[];
  userId: string;
  platformSpecific?: any;
};

type PublishResult = Record<string, boolean>;

/**
 * Publish a post to Instagram
 */
async function publishToInstagram(postData: PostJobData): Promise<boolean> {
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
async function publishToTwitter(postData: PostJobData): Promise<boolean> {
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
async function publishToLinkedIn(postData: PostJobData): Promise<boolean> {
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
async function processPost(job: any): Promise<PublishResult> {
  console.log(`Processing job ${job.id}: Publishing post to ${job.data.platforms.join(', ')}`);
  
  const results: PublishResult = {};
  const { platforms } = job.data;
  
  // Process each platform in parallel
  const publishPromises = platforms.map(async (platform: string) => {
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
  postId: string, 
  platform: string, 
  success: boolean, 
  error?: any
): Promise<void> {
  try {
    // Get the current post
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      console.error(`Post ${postId} not found in database`);
      return;
    }
    
    // Get the current publishing status or initialize as empty object
    const currentStatus = (post as any).publishingStatus || {};
    
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
        } as any, // Type assertion needed for JSON field
        published: success,
        publishedAt: success ? new Date() : (post as any).publishedAt,
      } as any, // Type assertion needed until Prisma client is regenerated
    });
    
    console.log(`Updated status for post ${postId} on ${platform}: ${success ? 'Success' : 'Failed'}`);
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
// Note: Using 'any' type to avoid TypeScript errors with the Worker type
(worker as any).on('completed', (job: any, result: any) => {
  const platforms = Object.keys(result);
  const successCount = Object.values(result).filter(Boolean).length;
  
  console.log(`Job ${job?.id} completed. Published to ${successCount}/${platforms.length} platforms.`);
  
  // Log detailed results
  platforms.forEach((platform: string) => {
    console.log(`- ${platform}: ${result[platform] ? 'Success' : 'Failed'}`);
  });
});

(worker as any).on('failed', (job: any, error: any) => {
  console.error(`Job ${job?.id} failed with error:`, error);
});

(worker as any).on('error', (error: any) => {
  console.error('Worker error:', error);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM signal, closing worker...');
  await (worker as any).close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT signal, closing worker...');
  await (worker as any).close();
  process.exit(0);
});

console.log(`Post worker started. Listening for jobs on queue: ${QUEUE_NAMES.POST_SCHEDULING}`);

// Handle process termination
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing worker...');
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing worker...');
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
});
