-- Add publishing status fields to Post model
ALTER TABLE "Post" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Post" ADD COLUMN "publishedAt" TIMESTAMP;
ALTER TABLE "Post" ADD COLUMN "publishingStatus" JSONB;
