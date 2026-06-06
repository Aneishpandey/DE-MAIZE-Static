import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'
import { getSiteContent } from '@/lib/content'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const content = await getSiteContent()
    return content.blogPosts.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getSiteContent()
  const post = content.blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | DE-MAIZE Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getSiteContent()
  const post = content.blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const currentIndex = content.blogPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? content.blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < content.blogPosts.length - 1 ? content.blogPosts[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <BackButton fallbackHref="/#blog" label="Back to Blog" />

        <header className="mb-12">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-primary tracking-wide">{post.category.toUpperCase()}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className={`aspect-video rounded-2xl mb-12 bg-gradient-to-br ${post.gradient}`} />

        <div className="prose prose-invert prose-lg max-w-none mb-12">
          {post.content.split('\n\n').map((block, index) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {block.replace('## ', '')}
                </h2>
              )
            }
            return (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {block}
              </p>
            )
          })}
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/60 to-accent/40 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-foreground">{post.author}</h3>
              <p className="text-sm text-primary mb-2">{post.authorRole}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-6">Let&apos;s discuss how DE-MAIZE can help you achieve your digital goals.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <nav className="flex items-center justify-between pt-8 border-t border-border">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="flex flex-col items-start max-w-[45%]">
              <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <ArrowLeft className="w-3 h-3" />
                Previous
              </span>
              <span className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="flex flex-col items-end max-w-[45%] text-right">
              <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                Next
                <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </main>
  )
}
