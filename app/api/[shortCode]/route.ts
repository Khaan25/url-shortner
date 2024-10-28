import { getOriginalUrl } from '@/utils/db'

import { NextResponse } from 'next/server'

type Params = Promise<{ shortCode: string }>

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const shortCode = params.shortCode

  const originalUrl = await getOriginalUrl(shortCode)

  if (originalUrl) {
    return NextResponse.redirect(originalUrl, 301)
  } else {
    return new Response(JSON.stringify({ error: 'Short URL not found' }), { status: 404 })
  }
}
