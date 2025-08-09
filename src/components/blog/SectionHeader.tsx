/**
 * @file src/components/blog/SectionHeader.tsx
 * @purpose A reusable component for displaying section headers in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => {
  return (
    <h2 className="text-3xl font-bold mt-8 mb-4 border-b border-primary pb-2">
      {children}
    </h2>
  );
};

export default SectionHeader;