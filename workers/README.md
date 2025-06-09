# SoloSpark Post Publishing Worker

This directory contains the worker scripts for processing scheduled posts in the SoloSpark application. The worker is responsible for publishing posts to various social media platforms at their scheduled times.

## Architecture

The post publishing system consists of the following components:

1. **BullMQ Queue** - A Redis-backed queue that stores scheduled post jobs
2. **Worker Process** - A dedicated Node.js process that consumes jobs from the queue and publishes posts
3. **API Routes** - Endpoints for scheduling, updating, and deleting posts

## Features

- **Reliable Job Processing** - Uses BullMQ for reliable job scheduling and processing
- **Platform-specific Publishing** - Handles publishing to multiple platforms (Instagram, Twitter, LinkedIn)
- **Status Tracking** - Records publishing status for each platform
- **Error Handling** - Retries failed jobs with exponential backoff
- **Concurrency Control** - Processes multiple jobs concurrently with rate limiting
- **Mock Database Support** - Falls back to an in-memory mock database for development and testing
- **Graceful Shutdown** - Properly closes connections when the worker is terminated

## Getting Started

### Prerequisites

- Node.js 16+
- Redis server (local or remote)
- Supabase account with PostgreSQL database

### Environment Variables

Make sure the following environment variables are set:

```
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
REDIS_URL="redis://..."
```

### Running the Worker

#### Development

```bash
npm run worker:dev
```

To use the mock database in development:

```bash
USE_MOCK_DB=true npm run worker:dev
```

#### Production

```bash
npm run worker
```

### Testing

A test script is provided to add test jobs to the queue:

```bash
node scripts/testWorker.js
```

This will add a test job to the queue with a 5-second delay, which will then be processed by the worker.

For production deployments, it's recommended to use a process manager like PM2:

```bash
pm2 start npm --name "solospark-worker" -- run worker
```

## How It Works

1. When a post is scheduled via the API, a job is added to the BullMQ queue with a delay until the scheduled time.
2. The worker process picks up jobs when they're due to be processed.
3. For each job, the worker attempts to publish the post to each specified platform.
4. The worker updates the post's status in the database with the results of the publishing attempts.

## Monitoring

The worker logs all activities to the console, including:
- Job processing starts
- Publishing attempts to each platform
- Successful publications
- Failed publications with error details

In a production environment, these logs should be captured and sent to a monitoring service.

## Extending

To add support for a new social media platform:

1. Create a new publishing function in `postWorker.ts`
2. Add the platform to the switch statement in the `processPost` function
3. Update the Post schema to include the new platform in the platforms array

## Troubleshooting

If jobs are not being processed:

1. Check that Redis is running and accessible
2. Verify that the worker process is running
3. Check the logs for any errors
4. Ensure the database connection is working
