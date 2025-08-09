/**
 * @file src/components/blog/Quote.tsx
 * @purpose A reusable component for displaying blockquotes in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface QuoteProps {
  children: React.ReactNode;
}

const Quote = ({ children }: QuoteProps) => {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4">
      {children}
    </blockquote>
  );
};

export default Quote;