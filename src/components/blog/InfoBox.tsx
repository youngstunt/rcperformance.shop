/**
 * @file src/components/blog/InfoBox.tsx
 * @purpose A reusable component for displaying highlighted information in blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InfoBoxProps {
  children: React.ReactNode;
}

const InfoBox = ({ children }: InfoBoxProps) => {
  return (
    <div className="bg-muted border-l-4 border-primary p-4 rounded-r-lg my-6 flex items-start">
      <Lightbulb className="text-primary h-6 w-6 mr-4 mt-1 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
};

export default InfoBox;