/**
 * @file src/components/blog/Paragraph.tsx
 * @purpose A reusable component for displaying paragraphs in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="text-lg leading-relaxed my-4">{children}</p>;
};

export default Paragraph;