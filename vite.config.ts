import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { comlink } from 'vite-plugin-comlink';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    server: {
        port: 3000,
    },
    plugins: [
        react(),
        comlink(),
    ],
    worker: {
        plugins: [
            comlink(),
        ]
    }
});
