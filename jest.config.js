// Chadson v69.0.0: Standard Jest configuration for Next.js 13+
// This configuration uses the next/jest preset to handle most of the setup automatically.

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    // Mock react-markdown to prevent ESM errors
    '^react-markdown$': '<rootDir>/__mocks__/react-markdown.tsx',
    // Mock react-leaflet and leaflet to prevent ESM errors
    '^react-leaflet$': '<rootDir>/__mocks__/react-leaflet.tsx',
    '^leaflet$': '<rootDir>/__mocks__/leaflet.ts',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)