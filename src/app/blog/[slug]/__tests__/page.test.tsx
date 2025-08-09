/**
 * @file src/app/blog/[slug]/__tests__/page.test.tsx
 * @purpose Unit tests for the dynamic blog post page.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This file tests the dynamic blog post page. It mocks the 'fs' and 'path'
 * modules to simulate reading a single Markdown file, allowing for verification
 * of content and metadata rendering without actual filesystem access.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from '../page';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));


const fs = require('fs') as jest.Mocked<typeof import('fs')>;
const path = require('path') as jest.Mocked<typeof import('path')>;

describe('BlogPost Page', () => {
  const mockPost = {
    slug: 'open-source-ecu-tuning',
    frontmatter: {
      title: 'Unlocking Performance: A Guide to Open Source ECU Tuning',
      date: '2025-07-13',
      excerpt: 'Dive into the world of open source ECU tuning.',
    },
    content: 'This is the full content of the blog post.',
  };

  beforeEach(() => {
    path.join.mockImplementation((...args) => args.join('/'));
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(
      `---
title: ${mockPost.frontmatter.title}
date: '${mockPost.frontmatter.date}'
excerpt: ${mockPost.frontmatter.excerpt}
---
${mockPost.content}`
    );
  });

  it('should render the blog post with title, date, and content', () => {
    render(<BlogPost params={{ slug: mockPost.slug }} />);

    // Check for the main heading (title)
    expect(screen.getByRole('heading', { name: mockPost.frontmatter.title, level: 1 })).toBeInTheDocument();

    // Check for the date
    expect(screen.getByText('July 13, 2025')).toBeInTheDocument();

    // Check for the main content
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();

    // Check for the "Back to Blog" link
    const backLink = screen.getByRole('link', { name: /Back to Blog/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/blog');
  });

  it('should call notFound if the post does not exist', () => {
    const { notFound } = require('next/navigation');
    fs.existsSync.mockReturnValue(false);

    render(<BlogPost params={{ slug: 'non-existent-post' }} />);
    
    expect(notFound).toHaveBeenCalled();
  });
});