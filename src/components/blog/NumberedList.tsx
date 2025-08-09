/**
 * @file src/components/blog/NumberedList.tsx
 * @purpose A reusable component for displaying numbered lists in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface NumberedListProps {
  items: React.ReactNode[];
}

const NumberedList = ({ items }: NumberedListProps) => {
  return (
    <ol className="list-decimal list-inside space-y-2 my-4">
      {items.map((item, index) => (
        <li key={index} className="text-lg">{item}</li>
      ))}
    </ol>
  );
};

export default NumberedList;