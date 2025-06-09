import { ConnectionOptions } from 'bullmq';

// Check if Redis URL is available in environment variables
if (!process.env.REDIS_URL) {
  console.warn('REDIS_URL environment variable is not set. Queue functionality will not work properly.');
}

// Redis connection configuration for BullMQ
export const redisConnection: ConnectionOptions = {
  // Use environment variable for Redis URL or fallback to localhost for development
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  // Optional: Add any additional Redis connection options here
  // For example, if your Redis instance requires TLS:
  // tls: { rejectUnauthorized: false }
};

// Queue names
export const QUEUE_NAMES = {
  POST_SCHEDULING: 'post-scheduling',
  ANALYTICS: 'analytics',
};

// Default job options
export const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
  removeOnComplete: true,
  removeOnFail: false,
};
