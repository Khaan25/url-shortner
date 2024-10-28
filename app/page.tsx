'use client'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Input, Button } from '@/components/ui'

export default function Home() {
  const [apiKey, setApiKey] = useState('')
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setShortUrl('')
    setError('')

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to shorten URL')
      }

      const data = await response.json()
      setShortUrl(data.shortUrl)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Enter API Key" className="mb-4" required />
            <Input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL to shorten" className="mb-4" required />
            <Button type="submit" className="w-full">
              Shorten URL
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {shortUrl && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Shortened URL:</h2>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {shortUrl}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
