export const NEXT_APP_DIRECTUS_URL =
  process.env.NEXT_APP_DIRECTUS_URL ?? 'https://admin.eliayoussefdesigns.com' ?? 'http://admin.eliayoussefdesigns.com'
  // process.env.NEXT_APP_DIRECTUS_URL ?? 'https://admin.prestigedesign-egy.com' ?? 'http://admin.prestigedesign-egy.com'

export default function getAssetURL (id) {
  // console.log(id)
  if (!id) return null
  return `${NEXT_APP_DIRECTUS_URL}/assets/${id}`
}