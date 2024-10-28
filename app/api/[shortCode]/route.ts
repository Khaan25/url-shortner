import { getOriginalUrl } from '@/utils/db'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
  const { shortCode } = await params

  const originalUrl = await getOriginalUrl(shortCode)

  if (originalUrl) {
    return NextResponse.redirect(originalUrl, 301)
  } else {
    return new Response(JSON.stringify({ error: 'Short URL not found' }), { status: 404 })
  }
}
