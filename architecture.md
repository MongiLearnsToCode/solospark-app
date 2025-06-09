# SoloSpark Architecture

SoloSpark is a social media management platform tailored for solopreneurs, built with a modular, scalable, and maintainable architecture. This document outlines the full architecture, including the file and folder structure, the role of each component, and details on state management and service connections. The stack leverages **Next.js** for the frontend and backend, **Supabase** for both the database and authentication, and **Shadcn UI** for a consistent, reusable UI, delivering an efficient and delightful user experience.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [File and Folder Structure](#file-and-folder-structure)
4. [Components and Their Roles](#components-and-their-roles)
5. [State Management](#state-management)
6. [Services and Connections](#services-and-connections)
7. [Deployment](#deployment)

## Overview

SoloSpark’s architecture is feature-based and modular, ensuring clarity and ease of maintenance. **Next.js** powers both the frontend (pages) and backend (API routes), while **Supabase** provides a managed PostgreSQL database and authentication services. **Shadcn UI** ensures a cohesive, customizable user interface. The system supports core features like post scheduling, a visual calendar, and AI-powered caption suggestions, with background jobs managed via **BullMQ** and **Upstash Redis**.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Supabase Auth
- **Background Jobs**: BullMQ with Upstash Redis
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **State Management**: React Query, Context API
- **Deployment**: Netlify (frontend + API), Railway (workers)

## File and Folder Structure

The project follows a clear, feature-based structure:

```plaintext
solo-spark/
├── components/             # Reusable React components
│   ├── common/             # General-purpose components (e.g., Button, Modal)
│   ├── post/               # Post feature components (e.g., PostEditor)
│   ├── calendar/           # Calendar feature components (e.g., CalendarView)
│   ├── analytics/          # Analytics feature components (e.g., AnalyticsDashboard)
│   └── ui/                 # Shadcn UI components (e.g., button, input)
├── hooks/                  # Custom React hooks (e.g., useAuth, usePostData)
├── lib/                    # Utilities, API wrappers, and business logic
│   ├── prisma.ts           # Prisma client for Supabase DB interactions
│   ├── bullMQClient.ts     # BullMQ client for background jobs
│   ├── aiClient.ts         # OpenAI API wrapper for AI features
│   └── auth.ts             # Supabase Auth utilities
├── pages/                  # Next.js pages and API routes
│   ├── api/                # API routes
│   │   ├── posts/          # Post CRUD routes (index.ts, [id].ts)
│   │   └── schedule.ts     # Trigger background jobs
│   ├── _app.tsx            # Custom App component for global setup
│   ├── _document.tsx       # Custom Document component
│   ├── index.tsx           # Landing page
│   ├── dashboard.tsx       # Main dashboard
│   └── auth/               # Auth pages (login, signup)
├── public/                 # Static assets (e.g., images, favicon)
├── schemas/                # Zod schemas for validation (e.g., postSchema.ts)
├── services/               # Business logic services (e.g., postService.ts)
├── styles/                 # Global styles (e.g., globals.css)
├── utils/                  # General utilities (e.g., dateFormat.ts)
├── workers/                # BullMQ worker scripts (deployed separately)
│   └── worker.ts           # Processes background jobs
├── .env.local              # Local environment variables
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma       # Database schema
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Components and Their Roles

### `components/`
Reusable React components, organized by feature:
- **`common/`**: General-purpose components (e.g., `Button.tsx`, `Modal.tsx`) used across the app, built with Shadcn UI for consistency.
- **`post/`**: Components for post creation and management (e.g., `PostEditor.tsx` for the "Post Once, Tweak Everywhere" workflow).
- **`calendar/`**: Components for the visual calendar (e.g., `CalendarView.tsx` with drag-and-drop via Framer Motion).
- **`analytics/`**: Components for displaying metrics (e.g., `AnalyticsDashboard.tsx` with Shadcn UI charts).
- **`ui/`**: Shadcn UI components (e.g., `button.tsx`, `input.tsx`), providing a cohesive design system.

### `hooks/`
Custom React hooks for reusable logic:
- `useAuth.ts`: Manages Supabase Auth state (e.g., user session, login status).
- `usePostData.ts`: Fetches and caches post data with React Query.

### `lib/`
Utilities and wrappers for external services:
- **`prisma.ts`**: Initializes the Prisma client for Supabase database queries.
- **`bullMQClient.ts`**: Configures BullMQ for scheduling background jobs with Upstash Redis.
- **`aiClient.ts`**: Wraps the OpenAI API for AI features like caption suggestions.
- **`auth.ts`**: Supabase Auth utilities for session management and user authentication.

### `pages/`
Next.js pages and API routes:
- **`index.tsx`**: Landing page with a sign-up CTA.
- **`dashboard.tsx`**: Main app interface for logged-in users, displaying posts and analytics.
- **`auth/`**: Login and signup pages using Supabase Auth UI components or custom forms.
- **`api/posts/`**: CRUD endpoints for posts (e.g., `index.ts` for GET/POST, `[id].ts` for PUT/DELETE).
- **`api/schedule.ts`**: Triggers BullMQ jobs for post scheduling.

### `public/`
Static assets like images and the favicon.

### `schemas/`
Zod schemas for input validation (e.g., `postSchema.ts` for post data validation).

### `services/`
Business logic services:
- `postService.ts`: Encapsulates post-related operations (e.g., create, update, publish).

### `styles/`
Global CSS (e.g., `globals.css`) with Tailwind directives for consistent styling.

### `utils/`
General-purpose utilities (e.g., `dateFormat.ts` for formatting dates).

### `workers/`
BullMQ worker scripts (e.g., `worker.ts`), deployed on Railway to process scheduled posts.

## State Management

State is managed efficiently to ensure a smooth user experience:

- **Local Component State**:
  - Managed with React’s `useState` or `useReducer`.
  - Example: Form state in `PostEditor.tsx` using React Hook Form for the post creation form.

- **Global State**:
  - **React Query**: Handles asynchronous data fetching and caching (e.g., fetching scheduled posts from Supabase).
    - Location: Queries defined in hooks like `usePostData.ts`.
    - Usage: `const { data: posts } = useQuery('posts', fetchPosts);`.
  - **Context API**: Manages lightweight global state (e.g., user preferences, theme).
    - Location: Defined in `contexts/` (e.g., `UserContext.tsx`) if needed, though minimal for the MVP.
    - Usage: `<UserContext.Provider value={userData}>`.

- **Form State**:
  - Managed by **React Hook Form** with **Zod** for validation.
  - Example: `PostEditor.tsx` uses `useForm` with `zodResolver(postSchema)` to validate post inputs.

- **Authentication State**:
  - Managed by **Supabase Auth** via the Supabase client.
  - Location: `lib/auth.ts` provides utilities to check session status.
  - Usage: `useAuth.ts` hook retrieves the current user with `supabase.auth.getUser()`.

## Services and Connections

Services connect the frontend, backend, and external systems seamlessly:

- **Database**:
  - **Supabase**: Managed PostgreSQL database for storing posts, user data, and analytics.
  - **Prisma**: ORM for type-safe queries, defined in `prisma/schema.prisma`.
    - Models: `Post` (fields: `id`, `caption`, `media`, `platforms`, `scheduledAt`, `platformSpecific`).
    - Connection: `lib/prisma.ts` initializes the Prisma client with Supabase connection details.
    - Usage: `prisma.post.create({ data: { caption: 'Hello' } })`.

- **Authentication**:
  - **Supabase Auth**: Handles user authentication (email, social login) and session management.
    - Connection: Integrated via `lib/auth.ts` using Supabase’s JavaScript client (`@supabase/supabase-js`).
    - Protected Routes: API routes check user sessions with `supabase.auth.getSession()` (e.g., `api/ping.ts`).
    - Frontend: Custom or Supabase-provided auth forms in `pages/auth/` for login/signup flows.

- **Background Jobs**:
  - **BullMQ**: Manages scheduled tasks (e.g., posting to social media platforms).
    - Connection: `lib/bullMQClient.ts` configures the queue with Upstash Redis.
    - Workflow: `api/schedule.ts` adds jobs to the queue; `workers/worker.ts` processes them.
    - Deployment: Workers run on Railway for persistent processing.

- **AI Services**:
  - **OpenAI GPT-4o-mini**: Powers caption suggestions and hashtag optimization.
    - Connection: `lib/aiClient.ts` wraps the OpenAI API with rate limiting via Upstash Redis.
    - Usage: Called from `PostEditor.tsx` via a service like `aiService.ts` for AI suggestions.

- **External APIs**:
  - Instagram and X APIs for post publishing (LinkedIn stubbed due to API approval delays).
  - Connection: Handled in `services/postService.ts` with platform-specific logic.

- **API Routes**:
  - Next.js API routes in `pages/api/` serve as the backend.
  - Example: `api/posts/index.ts` handles GET (list posts) and POST (create post) requests, secured with Supabase Auth.

## Deployment

- **Netlify**:
  - Hosts the Next.js app (frontend pages and API routes).
  - Build Settings:
    - Base directory: `.`
    - Build command: `npm run build`
    - Publish directory: `.next`
  - Environment Variables: Configured in Netlify dashboard (e.g., `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `REDIS_URL`).

- **Railway**:
  - Hosts BullMQ workers for background job processing.
  - Deploys `workers/worker.ts` with Redis connection via `REDIS_URL`.

This architecture ensures SoloSpark is simple, scalable, and performant. **Next.js** unifies the frontend and backend, **Supabase** provides reliable database and authentication services, and **Shadcn UI** delivers a consistent, user-friendly interface. State is managed efficiently with **React Query** and **Context API**, while services connect seamlessly to external systems like Supabase and OpenAI, empowering solopreneurs to manage their social media with ease.