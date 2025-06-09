#!/usr/bin/env node

/**
 * SoloSpark Post Publishing Worker
 * 
 * This script starts the worker process that handles scheduled post publishing.
 * It can be run directly with Node.js or as a service using PM2 or similar tools.
 */

// Load environment variables
require('dotenv').config();

console.log('Starting SoloSpark post publishing worker...');

// Import and run the worker
require('./postWorker.js');

console.log('Worker process initialized and listening for jobs.');

// Keep the process alive
process.stdin.resume();
