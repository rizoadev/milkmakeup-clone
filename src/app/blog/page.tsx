import Link from "next/link";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-12">Stories from the Milk team.</p>
      
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block border-b pb-8">
            <p className="text-xs text-gray-500 mb-2">{post.date}</p>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}