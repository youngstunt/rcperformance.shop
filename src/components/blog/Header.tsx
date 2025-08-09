/**
 * @file src/components/blog/Header.tsx
 * @purpose A reusable component for displaying the main header of a blog post.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-muted border-b border-border py-12 mb-12">
      <div className="container mx-auto px-4 text-center">
        {children}
      </div>
    </header>
  );
};

export default Header;