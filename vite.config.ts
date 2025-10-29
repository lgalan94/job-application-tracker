import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import tailwindcss from '@tailwindcss/vite';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const buildDate = new Date().toISOString();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(commitHash),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
});
