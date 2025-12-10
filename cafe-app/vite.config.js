import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite configuration with React and TailwindCSS support.
// The Tailwind CSS plugin is added as recommended in the official documentation【341936035242171†L305-L347】.
export default defineConfig({
  plugins: [
    react(),
    // Register the Tailwind CSS plugin so that your Tailwind classes are
    // processed at build time. Without this plugin the Tailwind directives
    // (e.g. @tailwind base; @tailwind components; @tailwind utilities;) would
    // not be transformed into CSS.
    tailwindcss()
  ],
  server: {
    port: 5173,
  }
});