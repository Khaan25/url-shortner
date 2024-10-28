import { unkey } from '@/lib/unkey'
import { createShortUrl } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

const unkeyApiKey = process.env.UNKEY_API_KEY

if (!unkeyApiKey) {
  throw new Error('UNKEY_API_KEY is not set')
}

const getClientIp = (req: NextRequest): string => {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
}

export async function POST(request: NextRequest) {
  // Get the client's IP address
  const ip = getClientIp(request)

  // Check the rate limit
  const rateLimitResponse = await unkey.limit(ip, { cost: 2 })

  // If the rate limit is exceeded, respond with an error
  if (!rateLimitResponse.success) {
    return NextResponse.json({ message: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  const requestBody = await request.json()

  // Check if the request body contains the required fields
  if (!requestBody || typeof requestBody !== 'object' || requestBody === null) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 })
  }

  const { url, tier } = requestBody

  // Check if URL is provided and is a string
  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'URL is required and must be a string' }), { status: 400 })
  }

  // Check if tier is provided and is a string
  if (!tier || typeof tier !== 'string') {
    return new Response(JSON.stringify({ error: 'Tier is required and must be a string' }), { status: 400 })
  }

  // Generate short URL based on the user's tier
  let shortCode

  if (tier === 'premium') {
    shortCode = await createShortUrl(url, 5) // Shorter URLs for premium users
  } else if (tier === 'basic') {
    shortCode = await createShortUrl(url, 8) // Longer URLs for basic users
  } else {
    return new Response(JSON.stringify({ error: 'Invalid tier. Only "premium" and "basic" are accepted.' }), { status: 400 })
  }

  return new Response(JSON.stringify({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/${shortCode}` }), { status: 200 })
}
