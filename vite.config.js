// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  base: "/", // "/" for root, "/subfolder/" if hosted in a subpath
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      data: path.resolve(__dirname, './src/data'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
    },
  },
});
