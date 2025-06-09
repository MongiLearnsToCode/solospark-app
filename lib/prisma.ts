import { PrismaClient } from '@prisma/client';
import { mockDb } from './mockDb';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if we should use mock database
const useMockDb = process.env.USE_MOCK_DB === 'true' || 
  (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL);

// Create Prisma client or use mock
let prismaClient: any;

if (useMockDb) {
  console.warn('Using mock database. Set DATABASE_URL in .env.local for a real database connection.');
  prismaClient = mockDb;
} else {
  try {
    prismaClient = globalForPrisma.prisma || 
      new PrismaClient({
        log: ['query'],
      });
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClient;
    }
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    console.warn('Falling back to mock database');
    prismaClient = mockDb;
  }
}

export const prisma = prismaClient;
