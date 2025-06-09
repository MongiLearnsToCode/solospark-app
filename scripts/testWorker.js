/**
 * Test script to add a job to the post scheduling queue
 */

// Import required modules
const { Queue } = require('bullmq');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

// Define Redis connection
const redisConnection = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
};

// Define queue names
const QUEUE_NAMES = {
  POST_SCHEDULING: 'post-scheduling',
};

// Create the queue
const postQueue = new Queue(QUEUE_NAMES.POST_SCHEDULING, {
  connection: redisConnection,
});

// Create a test post job
async function addTestJob() {
  const postId = uuidv4();
  
  console.log(`Adding test post with ID: ${postId}`);
  
  // Add job to queue with minimal delay (5 seconds)
  const job = await postQueue.add(
    'publish-post',
    {
      postId,
      caption: 'This is a test post from the worker test script',
      media: 'https://example.com/test-image.jpg',
      platforms: ['instagram', 'twitter', 'linkedin'],
      userId: 'test-user-id',
      platformSpecific: {
        instagram: {
          hashtags: ['test', 'solospark']
        }
      },
    },
    {
      delay: 5000, // 5 seconds delay
      jobId: postId,
    }
  );
  
  console.log(`Job added to queue with ID: ${job.id}`);
  console.log('The worker should process this job in 5 seconds');
  console.log('Check the worker console for processing logs');
  
  // Close the queue connection after adding the job
  await postQueue.close();
}

// Run the test
addTestJob()
  .catch(error => {
    console.error('Error adding test job:', error);
    process.exit(1);
  });
