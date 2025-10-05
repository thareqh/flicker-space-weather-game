import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/flicker-space-weather-game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
