/**
 * @file src/components/blog/Article.tsx
 * @purpose A reusable component for structuring the main content of a blog post.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface ArticleProps {
  children: React.ReactNode;
}

const Article = ({ children }: ArticleProps) => {
  return (
    <article className="prose dark:prose-invert max-w-none">
      {children}
    </article>
  );
};

export default Article;