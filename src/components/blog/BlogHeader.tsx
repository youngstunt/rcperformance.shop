/**
 * @file src/components/blog/BlogHeader.tsx
 * @purpose A reusable component for displaying the main header of a blog post.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface BlogHeaderProps {
  title: string;
  date?: string;
  author: string;
}

const BlogHeader = ({ title, date, author }: BlogHeaderProps) => {
  return (
    <header className="bg-muted border-b border-border py-12 mb-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">{title}</h1>
        <p className="text-muted-foreground text-lg">
          {date ? (
            <>
              Published on {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} by {author}
            </>
          ) : (
            <>By {author}</>
          )}
        </p>
      </div>
    </header>
  );
};

export default BlogHeader;