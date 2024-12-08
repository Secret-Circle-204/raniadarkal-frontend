export const NEXT_APP_DIRECTUS_URL =
  process.env.NEXT_APP_DIRECTUS_URL || 'http://91.108.120.198' || 'http://91.108.120.198'
  
  import { createDirectus, rest } from '@directus/sdk'
 
const directus = createDirectus(NEXT_APP_DIRECTUS_URL).with(
  rest({
    onRequest: (options) => ({ ...options, next: { revalidate: 60000 } }),

  })
);

export default directus
