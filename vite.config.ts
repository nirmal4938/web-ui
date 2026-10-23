import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true, // Allows listening across your local domains
    allowedHosts: ['.syncware.local'], // ✅ Fixes the "Blocked request" error for dev mode
  },
  build: {
    outDir: 'dist', // Render serves from here
  },
  preview: {
    allowedHosts: ['web-ui-d5g8.onrender.com', 'syncware.fun', '.syncware.local'], // Allow your Render domain in preview mode
    port: 4173,
  },
});
