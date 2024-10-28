import { Ratelimit } from '@unkey/ratelimit'

if (!process.env.UNKEY_API_KEY) {
  throw new Error('UNKEY_API_KEY is not set')
}

export const unkey = new Ratelimit({
  rootKey: process.env.UNKEY_API_KEY,
  namespace: 'url.shortner',
  limit: 5,
  duration: '10s',
  async: true,
})
