// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),

    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Compress files larger than 10kb
    }),

    // Gzip compression (fallback for browsers without Brotli)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),

    // Image optimization
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.9] },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: true },
        ],
      },
      webp: { quality: 75 }, // Converts images to WebP for modern browsers
    }),
  ],

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      data: path.resolve(__dirname, './src/data'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
    },
  },

  build: {
    target: 'es2015',        // Modern browser support
    minify: 'esbuild',       // Fast minification
    cssCodeSplit: true,      // Split CSS for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
