/**
 * @file src/components/blog/Subheading.tsx
 * @purpose A reusable component for displaying subheadings in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface SubheadingProps {
  children: React.ReactNode;
}

const Subheading = ({ children }: SubheadingProps) => {
  return (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-primary">
      {children}
    </h3>
  );
};

export default Subheading;