# Next.js 14 URL Shortener with App Router and Shadcn UI

This project demonstrates a URL shortener service using Next.js 14 with the new App Router and the shadcn/ui component library. It also integrates with Unkey.com for API key management, rate limiting, and tiered access.

## Features

- Next.js 14 with the new App Router
- URL shortening with different short URL lengths based on user tier
- API key authentication using Unkey
- Rate limiting based on Unkey configurations
- Tiered access (basic and premium users)
- UI components from the shadcn/ui library

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Set up Unkey:
   - Create an account at [unkey.com](https://unkey.com)
   - Create a new API with two tiers: 'basic' and 'premium'
   - Generate API keys for your users, assigning them to either the basic or premium tier
   - Implement rate limiting for your API keys in the Unkey dashboard

4. Run the development server:
   ```
   npm run dev
   ```

## Usage

- Use the web interface at `http://localhost:3000` to shorten URLs
- Send POST requests to `http://localhost:3000/api/shorten` with the `Authorization` header set to a valid Unkey API key and a JSON body containing the `url` to shorten
- Access shortened URLs via `http://localhost:3000/api/{shortCode}`

## Tiered Access

- Basic users receive 8-character short codes
- Premium users receive 5-character short codes

Rate limiting can be configured differently for each tier in the Unkey dashboard.
