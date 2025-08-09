/**
 * @file src/components/blog/Title.tsx
 * @purpose A reusable component for displaying the main title of a blog post.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
      {children}
    </h1>
  );
};

export default Title;