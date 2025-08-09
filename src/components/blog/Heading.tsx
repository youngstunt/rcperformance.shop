/**
 * @file src/components/blog/Heading.tsx
 * @purpose A reusable component for displaying section headings in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
}

const Heading = ({ children }: HeadingProps) => {
  return (
    <h2 className="text-3xl font-bold mt-8 mb-4 border-b border-primary pb-2">
      {children}
    </h2>
  );
};

export default Heading;