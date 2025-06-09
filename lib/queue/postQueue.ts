import { Queue, Worker, Job } from 'bullmq';
import { redisConnection, QUEUE_NAMES, defaultJobOptions } from './config';
import { Post } from '@prisma/client';

// Define the job data interface
export interface PostJobData {
  postId: string;
  caption: string;
  media?: string | null;
  platforms: string[];
  userId: string;
  platformSpecific?: any;
}

// Create the post scheduling queue
export const postQueue = new Queue<PostJobData>(QUEUE_NAMES.POST_SCHEDULING, {
  connection: redisConnection,
  defaultJobOptions,
});

// Function to add a post to the queue
export async function schedulePost(post: Post): Promise<Job<PostJobData>> {
  const { id, caption, media, platforms, userId, platformSpecific, scheduledAt } = post;
  
  // Calculate delay until scheduled time
  const now = new Date();
  const scheduledTime = new Date(scheduledAt);
  const delay = Math.max(0, scheduledTime.getTime() - now.getTime());
  
  // Add job to queue with delay
  return postQueue.add(
    'publish-post',
    {
      postId: id,
      caption,
      media,
      platforms,
      userId,
      platformSpecific,
    },
    {
      delay,
      jobId: id, // Use post ID as job ID for deduplication
    }
  );
}

// Worker code has been moved to a dedicated worker script in /workers/postWorker.ts
// This allows for better separation of concerns and more reliable processing

// To start the worker:
// - In development: npm run worker:dev
// - In production: npm run worker
