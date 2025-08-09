/**
 * @file src/components/blog/BulletedList.tsx
 * @purpose A reusable component for displaying bulleted lists in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface BulletedListProps {
  items: React.ReactNode[];
}

const BulletedList = ({ items }: BulletedListProps) => {
  return (
    <ul className="list-disc list-inside space-y-2 my-4">
      {items.map((item, index) => (
        <li key={index} className="text-lg">{item}</li>
      ))}
    </ul>
  );
};

export default BulletedList;