import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm underline mb-8 block">&larr; Back to Blog</Link>
      <p className="text-xs text-gray-500 mb-2">{post.date}</p>
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div className="prose">{post.content}</div>
    </div>
  );
}