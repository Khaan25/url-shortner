export async function GET(request, { params }) {
  const { shortCode } = params

  if (urlDatabase.has(shortCode)) {
    const originalUrl = urlDatabase.get(shortCode)
    return NextResponse.redirect(originalUrl, 301)
  } else {
    return new Response(JSON.stringify({ error: 'Short URL not found' }), { status: 404 })
  }
}
