/**
 * @file src/app/blog/__tests__/page.test.tsx
 * @purpose Unit tests for the blog index page.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This file tests the blog index page's data fetching and rendering logic.
 * It uses Jest to mock the 'fs' and 'path' modules to provide a controlled
 * test environment, isolating the component from the actual filesystem.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogIndex from '../page';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');

const fs = require('fs') as jest.Mocked<typeof import('fs')>;
const path = require('path') as jest.Mocked<typeof import('path')>;

describe('BlogIndex Page', () => {
  beforeEach(() => {
    // Provide mock implementations for fs and path
    path.join.mockImplementation((...args) => args.join('/'));
    
    const mockPosts = {
      'open-source-ecu-tuning.md': `---
title: "Unlocking Performance: A Guide to Open Source ECU Tuning"
date: "2025-07-13"
excerpt: "Dive into the world of open source ECU tuning."
---
`,
      'common-diesel-deletes.md': `---
title: "Understanding Diesel Deletes: More Power, More Efficiency"
date: "2025-07-14"
excerpt: "A deep dive into common diesel deletes."
---
`,
    };

    fs.readdirSync.mockReturnValue(Object.keys(mockPosts) as any);
    fs.readFileSync.mockImplementation((filePath) => {
      const fileName = (filePath as string).split('/').pop() as keyof typeof mockPosts;
      return mockPosts[fileName] as any;
    });
  });

  it('should render a list of blog posts with titles, dates, and excerpts', () => {
    render(<BlogIndex />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /Tuning Insights & News/i })).toBeInTheDocument();

    // Check that the posts are rendered and sorted correctly (newest first)
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    // Check the first post (newest)
    expect(articles[0]).toHaveTextContent('Understanding Diesel Deletes: More Power, More Efficiency');
    expect(articles[0]).toHaveTextContent('July 14, 2025');
    expect(articles[0]).toHaveTextContent(expect.stringContaining('A deep dive into common diesel deletes.'));
    expect(screen.getByRole('link', { name: /Understanding Diesel Deletes/i })).toHaveAttribute('href', '/blog/common-diesel-deletes');

    // Check the second post
    expect(articles[1]).toHaveTextContent('Unlocking Performance: A Guide to Open Source ECU Tuning');
    expect(articles[1]).toHaveTextContent('July 13, 2025');
    expect(articles[1]).toHaveTextContent('Dive into the world of open source ECU tuning.');
    expect(screen.getByRole('link', { name: /Unlocking Performance/i })).toHaveAttribute('href', '/blog/open-source-ecu-tuning');
  });
});