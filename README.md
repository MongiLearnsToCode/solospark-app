# SoloSpark

SoloSpark is a social media management platform designed specifically for solopreneurs, helping them schedule, manage, and optimize their social media presence across multiple platforms.

## Features

- **Post Scheduling**: Schedule posts across multiple social media platforms
- **AI Caption Generation**: Get AI-powered caption suggestions
- **Visual Calendar**: View and manage your scheduled posts in a calendar view
- **Analytics**: Track the performance of your posts
- **Background Processing**: Reliable post publishing with queue-based processing

## Tech Stack

- **Frontend**: Next.js with TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Supabase Auth
- **Background Jobs**: BullMQ with Upstash Redis
- **AI Features**: OpenAI API

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- OpenAI API key
- Upstash Redis instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/solospark.git
   cd solospark
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase, OpenAI, and Redis credentials

   ```bash
   cp .env.example .env.local
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Push Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment

The application can be deployed to Netlify for the frontend and API routes, with background workers running on Railway.

## Project Structure

- `/components`: React components
- `/pages`: Next.js pages and API routes
- `/lib`: Utility functions and shared code
- `/hooks`: Custom React hooks
- `/prisma`: Database schema and migrations
- `/styles`: Global styles and Tailwind configuration
- `/schemas`: Zod validation schemas

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
