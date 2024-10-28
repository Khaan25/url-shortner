# Next.js 15 URL Shortener with App Router and Shadcn UI

This project showcases a URL shortener service built with Next.js 15, leveraging the new App Router and the shadcn/ui component library. Additionally, it integrates with Unkey.com for managing API keys, enforcing rate limits, and providing tiered access.

## Key Features

- Next.js 15 with the new App Router
- URL shortening with variable short URL lengths based on user tier
- Rate limiting based on Unkey configurations
- Tiered access (basic and premium users)
- UI components from the shadcn/ui library

## Setup and Configuration

1. Install project dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   Create a `.env.local` file in the project root with the following content:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   UNKEY_API_KEY=unkey_some_token
   REDIS_URL=https://some-redis-url.upstash.io
   REDIS_TOKEN=some-redis-token
   ```

3. Set up Unkey:
   - Register at [unkey.com](https://unkey.com)
   - Create a new API with two tiers: 'basic' and 'premium'
   - Generate API keys for your users, assigning them to either the basic or premium tier
   - Configure rate limiting for your API keys in the Unkey dashboard

4. Launch the development server:
   ```
   npm run dev
   ```

## Using the URL Shortener

- Utilize the web interface at `http://localhost:3000` to shorten URLs
- Send POST requests to `http://localhost:3000/api/shorten` with the `Authorization` header set to a valid Unkey API key and a JSON body containing the `url` to shorten
- Access shortened URLs via `http://localhost:3000/api/{shortCode}`

## Tiered Access and Rate Limiting

- Basic users receive 8-character short codes
- Premium users receive 5-character short codes

Rate limiting can be configured differently for each tier in the Unkey dashboard.
