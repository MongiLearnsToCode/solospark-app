# SoloSpark MVP Task List

This document provides a granular, step-by-step plan to build the SoloSpark MVP. Each task is small, testable, and focused on a single concern, allowing incremental development and testing. Tasks are designed to be completed one at a time, ensuring the project progresses smoothly toward the MVP.

---

## Prerequisites

- A Supabase project is already created, with the database connection string and anon key available.
- OpenAI API key is available for AI features.
- Upstash Redis instance is set up for background jobs.

---

## Task List

### 1. Initialize Next.js Project with TypeScript
- **Description**: Set up the Next.js project using TypeScript.
- **Steps**:
  - Run `npx create-next-app@latest solo-spark --typescript`.
  - Choose default options when prompted.
- **Test**: Verify the project runs with `npm run dev` and opens at `http://localhost:3000`.

### 2. Set Up Folder Structure
- **Description**: Create the initial folder structure based on the architecture.
- **Steps**:
  - Create the following directories:
    - `components/`
      - `common/`
      - `post/`
      - `calendar/`
      - `analytics/`
      - `ui/`
    - `hooks/`
    - `lib/`
    - `pages/api/`
    - `public/`
    - `schemas/`
    - `services/`
    - `styles/`
    - `utils/`
    - `workers/`
- **Test**: Ensure the folder structure matches the architecture.

### 3. Set Up Environment Variables
- **Description**: Create `.env.local` with necessary environment variables.
- **Steps**:
  - Create `.env.local` in the root directory.
  - Add placeholders for:
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`
    - `DATABASE_URL` (Supabase connection string)
    - `OPENAI_API_KEY`
    - `REDIS_URL` (Upstash Redis connection)
  - Add `.env.local` to `.gitignore`.
- **Test**: Confirm `.env.local` is created and ignored by Git.

### 4. Install Supabase Client
- **Description**: Install the Supabase JavaScript client.
- **Steps**:
  - Run `npm install @supabase/supabase-js`.
- **Test**: Verify the package is listed in `package.json`.

### 5. Create Supabase Client
- **Description**: Set up the Supabase client singleton.
- **Steps**:
  - Create `lib/supabase.ts`.
  - Import `createClient` from `@supabase/supabase-js`.
  - Export a singleton instance using `process.env.SUPABASE_URL` and `process.env.SUPABASE_ANON_KEY`.
- **Test**: Import and log the client in a test file to ensure it's initialized.

### 6. Create Authentication Pages
- **Description**: Set up placeholder pages for login, signup, and dashboard.
- **Steps**:
  - Create `pages/auth/login.tsx` with a simple "Login Page" text.
  - Create `pages/auth/signup.tsx` with a simple "Sign Up Page" text.
  - Create `pages/dashboard.tsx` with a simple "Dashboard" text.
- **Test**: Navigate to `/auth/login`, `/auth/signup`, and `/dashboard` to see the placeholders.

### 7. Implement Login Logic
- **Description**: Add login functionality using Supabase Auth.
- **Steps**:
  - In `pages/auth/login.tsx`, create a form with email and password inputs.
  - On submit, use `supabase.auth.signInWithPassword` to log in.
- **Test**: Attempt to log in with a test user (create one in Supabase dashboard).

### 8. Implement Signup Logic
- **Description**: Add signup functionality using Supabase Auth.
- **Steps**:
  - In `pages/auth/signup.tsx`, create a form with email and password inputs.
  - On submit, use `supabase.auth.signUp` to create a new user.
- **Test**: Sign up with a new email and verify the user is created in Supabase.

### 9. Implement Client-Side Auth Guard
- **Description**: Protect the dashboard page with authentication.
- **Steps**:
  - Create `hooks/useAuth.ts` to check the current session using `supabase.auth.getSession`.
  - In `pages/dashboard.tsx`, use `useAuth` to redirect to `/auth/login` if not authenticated.
- **Test**: Access `/dashboard` without logging in (should redirect), then log in and access again.

### 10. Install Prisma
- **Description**: Set up Prisma for database interactions.
- **Steps**:
  - Run `npm install prisma --save-dev`.
  - Run `npx prisma init` to create `prisma/schema.prisma`.
- **Test**: Confirm `schema.prisma` is created.

### 11. Configure Prisma for Supabase
- **Description**: Connect Prisma to the Supabase database.
- **Steps**:
  - In `schema.prisma`, set the datasource to PostgreSQL with `url = env("DATABASE_URL")`.
- **Test**: Ensure `DATABASE_URL` is set in `.env.local`.

### 12. Define Post Model
- **Description**: Create the Post model in Prisma schema.
- **Steps**:
  - In `schema.prisma`, define the Post model with fields: `id`, `caption`, `media`, `platforms`, `scheduledAt`, `userId`.
- **Test**: Validate the schema syntax.

### 13. Generate Prisma Client
- **Description**: Generate the Prisma client for type-safe queries.
- **Steps**:
  - Run `npx prisma generate`.
- **Test**: Check that the client is generated in `node_modules/@prisma/client`.

### 14. Create Prisma Client Instance
- **Description**: Set up the Prisma client in the project.
- **Steps**:
  - Create `lib/prisma.ts` with `import { PrismaClient } from '@prisma/client'; export const prisma = new PrismaClient();`.
- **Test**: Import and use `prisma` in a test script to ensure connection.

### 15. Update Post Model with userId
- **Description**: Ensure the Post model includes the userId field.
- **Steps**:
  - Verify that `userId: String` is included in the Post model in `schema.prisma`.
- **Test**: Confirm the field is present.

### 16. Implement POST /api/posts
- **Description**: Create an API route to handle post creation.
- **Steps**:
  - Create `pages/api/posts/index.ts`.
  - Handle POST requests: check session, extract post data, use Prisma to create a post with `userId` from the session.
- **Test**: Use a tool like Postman to send a POST request and verify the post is created in the database.

### 17. Implement GET /api/posts
- **Description**: Create an API route to fetch posts for the authenticated user.
- **Steps**:
  - In `pages/api/posts/index.ts`, handle GET requests: check session, use Prisma to fetch posts where `userId` matches.
- **Test**: Send a GET request and verify the correct posts are returned.

### 18. Install React Hook Form and Zod
- **Description**: Set up form handling and validation.
- **Steps**:
  - Run `npm install react-hook-form zod @hookform/resolvers`.
- **Test**: Confirm packages are installed.

### 19. Create postSchema
- **Description**: Define the validation schema for posts.
- **Steps**:
  - Create `schemas/postSchema.ts` with a Zod schema for post fields (e.g., caption, media, platforms, scheduledAt).
- **Test**: Write a test script to validate sample data against the schema.

### 20. Create PostEditor Component
- **Description**: Build the PostEditor component for creating posts.
- **Steps**:
  - Create `components/post/PostEditor.tsx`.
  - Use React Hook Form with `zodResolver` for validation.
  - Include fields: caption (textarea), media (URL input), platforms (checkboxes), scheduledAt (date input).
  - On submit, send data to `/api/posts` via POST.
- **Test**: Render the component and submit a form to create a post.

### 21. Install react-datepicker
- **Description**: Add a date picker for scheduling posts.
- **Steps**:
  - Run `npm install react-datepicker`.
- **Test**: Confirm the package is installed.

### 22. Update PostEditor to Use URL for Media
- **Description**: Simplify media input to a URL field.
- **Steps**:
  - In `PostEditor.tsx`, change the media field to a text input for URLs.
- **Test**: Ensure the form accepts and submits a URL for media.

### 23. Apply Prisma Schema to Supabase
- **Description**: Sync the Prisma schema with the Supabase database.
- **Steps**:
  - Run `npx prisma db push`.
- **Test**: Check the Supabase dashboard to confirm the `Post` table is created.

### 24. Install React Query
- **Description**: Set up React Query for data fetching.
- **Steps**:
  - Run `npm install @tanstack/react-query`.
- **Test**: Confirm the package is installed.

### 25. Set Up React Query in _app.tsx
- **Description**: Integrate React Query into the Next.js app.
- **Steps**:
  - In `pages/_app.tsx`, import `QueryClientProvider` and wrap the app.
- **Test**: Ensure the app runs without errors.

### 26. Display Posts in Dashboard
- **Description**: Fetch and display posts on the dashboard.
- **Steps**:
  - In `pages/dashboard.tsx`, use `useQuery` to fetch posts from `/api/posts`.
  - Render a list of posts.
- **Test**: Log in and check if posts are displayed correctly.

### 27. Install react-big-calendar
- **Description**: Add a calendar library for the visual calendar.
- **Steps**:
  - Run `npm install react-big-calendar`.
- **Test**: Confirm the package is installed.

### 28. Create CalendarView Component
- **Description**: Set up the calendar component to display scheduled posts.
- **Steps**:
  - Create `components/calendar/CalendarView.tsx`.
  - Use `react-big-calendar` with drag-and-drop enabled.
  - Fetch scheduled posts with React Query and map them to calendar events.
- **Test**: Render the calendar and check if posts are displayed as events.

### 29. Implement API Route for Updating Posts
- **Description**: Create an API route to update post details, including scheduledAt.
- **Steps**:
  - Create `pages/api/posts/[id].ts` with a PUT method.
  - Handle updating the post, including the `scheduledAt` field.
- **Test**: Send a PUT request to update a post and verify the changes in the database.

### 30. Handle Drag-and-Drop in CalendarView
- **Description**: Enable rescheduling posts via drag-and-drop on the calendar.
- **Steps**:
  - In `CalendarView.tsx`, handle the drop event to update the post's `scheduledAt` via the API.
- **Test**: Drag a post to a new date and check if the scheduled time is updated.

### 31. Install OpenAI Package
- **Description**: Set up the OpenAI API for AI features.
- **Steps**:
  - Run `npm install openai`.
- **Test**: Confirm the package is installed.

### 32. Set Up OpenAI API Client
- **Description**: Create a client for OpenAI API calls.
- **Steps**:
  - Create `lib/aiClient.ts` and initialize the OpenAI client with `process.env.OPENAI_API_KEY`.
- **Test**: Write a test script to make a sample API call.

### 33. Implement AI Caption Suggestion in PostEditor
- **Description**: Add AI-powered caption suggestions to the PostEditor.
- **Steps**:
  - In `PostEditor.tsx`, add a "Suggest Caption" button.
  - On click, call the OpenAI API to generate caption suggestions.
  - Display the suggestions to the user.
- **Test**: Click the button and verify that suggestions are generated and displayed.

### 34. Add Topic Input in PostEditor
- **Description**: Allow users to input a topic for better AI suggestions.
- **Steps**:
  - Add a "Topic" input field in `PostEditor.tsx`.
  - Include the topic in the OpenAI prompt for caption generation.
- **Test**: Enter a topic and check if the AI suggestions are relevant.

### 35. Install BullMQ
- **Description**: Set up BullMQ for background job processing.
- **Steps**:
  - Run `npm install bullmq`.
- **Test**: Confirm the package is installed.

### 36. Set Up Redis with Upstash
- **Description**: Configure Redis for BullMQ.
- **Steps**:
  - Ensure `REDIS_URL` is set in `.env.local` with the Upstash connection string.
- **Test**: Verify the connection in a test script.

### 37. Create BullMQ Queue
- **Description**: Set up the BullMQ queue for scheduling jobs.
- **Steps**:
  - Create `lib/bullMQClient.ts` and configure the queue with `REDIS_URL`.
- **Test**: Add a test job to the queue and check if it's processed.

### 38. Implement Job Addition in API Route
- **Description**: Add jobs to BullMQ when scheduling posts.
- **Steps**:
  - In `pages/api/posts/index.ts`, when creating a post with `scheduledAt`, add a delayed job to BullMQ.
- **Test**: Create a scheduled post and verify the job is added to the queue.

### 39. Create Worker Script
- **Description**: Set up the BullMQ worker to process scheduled jobs.
- **Steps**:
  - Create `workers/worker.ts` to process jobs (e.g., log "Posting to [platform]").
- **Test**: Run the worker and check if it processes the job at the scheduled time.

---

## Notes

- **Styling**: Use Tailwind CSS and Shadcn UI components throughout the project for consistency.
- **Testing**: After each task, manually test the functionality to ensure it works as expected.
- **Deployment**: Tasks for deploying to Netlify and Railway can be added later once the core features are implemented.

This task list provides a clear, incremental path to building the SoloSpark MVP, ensuring each step is small, focused, and testable.