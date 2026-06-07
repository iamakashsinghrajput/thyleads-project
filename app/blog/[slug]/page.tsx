import type { Metadata } from 'next';
import { getBlogBySlug } from '@/data/blogs';
import { blogSeo, buildMetadata } from '@/lib/seo';
import BlogDetailClient from './BlogDetailClient';

// Server-rendered metadata for dynamic blog routes. Titles/descriptions come
// from the centralized SEO config; posts not present there fall back to the
// post's own title + excerpt so every blog still ships a unique title/description.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const seo = blogSeo[slug];
  if (seo) {
    return buildMetadata(seo, `/blog/${slug}`);
  }

  const post = getBlogBySlug(slug);
  if (post) {
    return buildMetadata(
      { title: `${post.title} | Thyleads`, description: post.excerpt },
      `/blog/${slug}`,
    );
  }

  return { title: 'Blog Post Not Found | Thyleads' };
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
