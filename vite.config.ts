import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load cleanly on both local dev and GitHub Pages under /teachy-platform/
  server: {
    port: 5173,
    host: true,
  },
});
