import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data"
import { Calendar } from "lucide-react"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: `https://brdelectronic.com/blog/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed">{post.content}</p>
        </div>
      </article>
    </div>
  )
}
