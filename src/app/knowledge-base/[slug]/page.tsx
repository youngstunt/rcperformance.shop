// Chadson v69.69: Knowledge Base Article Page
// This page renders a single, dynamic knowledge base article.

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogLayout from '@/components/blog/BlogLayout';

const postsDirectory = path.join(process.cwd(), 'src/app/knowledge-base');

// Generate static paths for all knowledge base articles at build time
export async function generateStaticParams() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter(
      (filename) =>
        filename.endsWith('.tsx') &&
        filename !== 'page.tsx' &&
        filename !== 'layout.tsx'
    )
    .map((filename) => ({
      slug: filename.replace(/\.tsx$/, ''),
    }));
}

// Dynamically get the post component and its metadata
const getPost = async (slug: string) => {
  try {
    const postModule = await import(`@/app/knowledge-base/${slug}`);
    return {
      PostComponent: postModule.default,
      metadata: postModule.metadata,
    };
  } catch (error) {
    return notFound();
  }
};

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { metadata } = await getPost(params.slug);
  return {
    title: `${metadata.title} | RC Performance Knowledge Base`,
    description: metadata.excerpt,
  };
}

export default async function KnowledgeBaseArticle({ params }: { params: { slug: string } }) {
  const { PostComponent, metadata } = await getPost(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    datePublished: metadata.date,
    author: {
      '@type': 'Person',
      name: metadata.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RC Performance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rcperformance.shop/logo.png',
      },
    },
    description: metadata.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rcperformance.shop/knowledge-base/${params.slug}`,
    },
  };

  return (
    <main className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <BlogHeader
        title={metadata.title}
        date={metadata.date}
        author={metadata.author}
      />
      <BlogLayout>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <PostComponent />
          </div>

          <div className="mt-12 text-center">
            <Link href="/knowledge-base" className="text-primary font-semibold hover:underline">
              &larr; Back to Knowledge Base
            </Link>
          </div>
        </div>
      </BlogLayout>
    </main>
  );
}