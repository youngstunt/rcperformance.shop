/**
 * @file src/app/blog/page.tsx
 * @purpose The main index page for the blog.
 * @version 3.0.0
 * @date 2025-07-14
 *
 * @description
 * This page fetches all blog post components from the `src/app/blog/posts` directory,
 * imports their metadata, and displays them in a two-column grid of cards,
 * sorted by publication date.
 *
 * @dependencies
 * - fs: For reading the list of post files.
 * - path: For constructing file paths.
 * - next/link: For client-side navigation to individual blog posts.
 * - @/components/ui/card: For the card layout.
 */

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface Post {
  slug: string;
  metadata: {
    [key: string]: any;
    title: string;
    date: string;
    excerpt: string;
  };
}

const getPosts = async (): Promise<Post[]> => {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.tsx$/, '');
      const { metadata } = await import(`@/app/blog/posts/${slug}`);
      
      return {
        slug,
        metadata,
      };
    })
  );

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto p-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Tuning Insights & News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block hover:scale-105 transition-transform duration-200">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{post.metadata.title}</CardTitle>
                <CardDescription>
                  {new Date(post.metadata.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{post.metadata.excerpt}</p>
              </CardContent>
              <CardFooter>
                <span className="text-primary font-semibold">Read More &rarr;</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}