import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Growmerce MVP Vertical Slice V1 — Sprint 1 skeleton.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
