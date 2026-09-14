import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPosts } from "@/lib/data"
import { Calendar } from "lucide-react"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "RF Connector Industry Blog & Insights | Baierde Electronic",
  description:
    "Expert insights on RF connectors, 5G technology, industry standards, and connectivity solutions. Technical articles and application guides.",
  alternates: {
    canonical: "https://www.brdelectronic.com/blog",
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Technical articles, industry insights, and application guides for RF connectivity solutions.
        </p>
      </div>

      {posts.length === 0 && <p>No articles have been published yet.</p>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${encodeURIComponent(post.slug)}`} className="h-full">
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-1 flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto pt-6 font-medium">Read article →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
