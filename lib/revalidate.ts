import { revalidatePath, revalidateTag } from 'next/cache'

export const CONTENT_CACHE_TAG = 'site-content'

export function revalidateSiteContent() {
  revalidateTag(CONTENT_CACHE_TAG)
  revalidatePath('/', 'layout')
  revalidatePath('/services/[slug]', 'page')
  revalidatePath('/portfolio/[slug]', 'page')
  revalidatePath('/blog/[slug]', 'page')
}
