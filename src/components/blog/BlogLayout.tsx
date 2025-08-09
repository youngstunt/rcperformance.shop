"use client";

/**
 * @file src/components/blog/BlogLayout.tsx
 * @purpose A client-side component to provide a consistent layout and animations for blog posts.
 * @version 1.0.0
 * @date 2025-07-14
 */
import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return <SectionWrapper>{children}</SectionWrapper>;
};

export default BlogLayout;