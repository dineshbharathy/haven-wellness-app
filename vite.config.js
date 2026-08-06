import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        therapist: resolve(__dirname, 'therapist.html'),
        peers: resolve(__dirname, 'peers.html'),
        emotionStudio: resolve(__dirname, 'emotion-studio.html'),
        lanterns3d: resolve(__dirname, 'lanterns-3d.html'),
        breathing: resolve(__dirname, 'breathing.html'),
        soundscapes: resolve(__dirname, 'soundscapes.html'),
        vault: resolve(__dirname, 'vault.html'),
        journal: resolve(__dirname, 'journal.html')
      }
    }
  }
});
