// Chadson v69.0.0: Jest Setup File
// Purpose: To extend Jest's expect with custom matchers from @testing-library/jest-dom.
// This file is run automatically by Jest before each test file, ensuring that
// matchers like .toBeInTheDocument() are available globally in all tests.

// Polyfill fetch for Node.js environment
import 'whatwg-fetch';

import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock IntersectionObserver for framer-motion
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;