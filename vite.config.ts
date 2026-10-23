import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true, // Allows listening across your local domains
    allowedHosts: ['.syncware.local'], // Fixes the "Blocked request" error for local development mode
  },
  build: {
    outDir: 'dist', // Render serves standard production files from here
  },
  preview: {
    allowedHosts: [
      'web-ui-d5g8.onrender.com',
      'syncware.fun',
      '.syncware.fun', // ✅ Whitelists all production subdomains like mela2026.syncware.fun
      '.syncware.local',
    ],
    port: 4173,
  },
});
