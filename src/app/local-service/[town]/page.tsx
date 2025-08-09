// Chadson v69.69: Local Service Area Page
// This page renders a dynamic, SEO-optimized landing page for a specific town.

import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import React from 'react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHeader from '@/components/blog/BlogHeader';

const townsDirectory = path.join(process.cwd(), 'src/app/local-service');

// Generate static paths for all local service pages at build time
export async function generateStaticParams() {
  const filenames = fs.readdirSync(townsDirectory);
  return filenames
    .filter((filename) => filename.endsWith('.tsx'))
    .map((filename) => ({
      town: filename.replace(/\.tsx$/, ''),
    }));
}

// Dynamically get the town-specific component and its metadata
const getTownPage = async (town: string) => {
  try {
    const townModule = await import(`@/app/local-service/${town}`);
    return {
      PageContent: townModule.default,
      metadata: townModule.metadata,
    };
  } catch (error) {
    return notFound();
  }
};

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { town: string } }) {
  const { metadata } = await getTownPage(params.town);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function LocalServicePage({ params }: { params: { town: string } }) {
  const { PageContent, metadata } = await getTownPage(params.town);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobile Mechanic',
    provider: {
      '@type': 'Organization',
      name: 'RC Performance',
      url: 'https://rcperformance.shop',
      logo: 'https://rcperformance.shop/logo.png',
    },
    areaServed: {
      '@type': 'Place',
      name: metadata.townName,
    },
    description: metadata.description,
    mainEntityOfPage: `https://rcperformance.shop/local-service/${params.town}`,
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
        author="RC Performance"
      />
      <BlogLayout>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <PageContent />
          </div>
        </div>
      </BlogLayout>
    </main>
  );
}