import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          approach: path.resolve(__dirname, 'approach.html'),
          expertise: path.resolve(__dirname, 'expertise.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          clients: path.resolve(__dirname, 'clients.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          insights: path.resolve(__dirname, 'insights.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
