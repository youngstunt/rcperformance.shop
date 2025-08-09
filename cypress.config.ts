// Chadson v69.0.0: Cypress configuration for Guerrilla Automotive

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
});