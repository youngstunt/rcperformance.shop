/**
 * @file src/components/blog/List.tsx
 * @purpose A reusable component for displaying lists in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';

interface ListProps {
  items: React.ReactNode[];
  ordered?: boolean;
}

const List = ({ items, ordered = false }: ListProps) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'list-decimal' : 'list-disc';

  return (
    <ListComponent className={`${listStyle} list-inside space-y-2 my-4`}>
      {items.map((item, index) => (
        <li key={index} className="text-lg">{item}</li>
      ))}
    </ListComponent>
  );
};

export default List;