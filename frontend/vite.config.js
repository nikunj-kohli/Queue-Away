import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // 👇 Explicitly allow Replit's host
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '7bdff605-1c93-4d41-8b23-28262fff2fb0-00-s529qn8rp2iv.pike.replit.dev'
    ],
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
