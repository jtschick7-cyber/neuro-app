/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Cache names carry the content version, so shipping new content always starts a fresh cache and drops the old one.
const { contentVersion } = JSON.parse(readFileSync('./generated/about.json', 'utf8')) as { contentVersion: string };

// Short git commit of this build, shown in About and the footer so a phone can be compared with the latest commit on GitHub.
function gitShortSha(): string {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || 'dev';
  } catch {
    return 'dev';
  }
}

export default defineConfig({
  define: { __BUILD_ID__: JSON.stringify(gitShortSha()) },
  // GitHub Pages serves the site from /neuro-app/
  base: '/neuro-app/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      workbox: {
        cacheId: `neurohosp-${contentVersion}`,
        cleanupOutdatedCaches: true,
        // Precache everything (JS, CSS, HTML, JSON registries are bundled into JS) for offline use.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
        navigateFallback: 'index.html',
      },
      manifest: {
        name: 'NeuroHospitalist Pocket Companion',
        short_name: 'NeuroHosp',
        description: 'Offline neurohospitalist dosing calculators and reference registries.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
  },
});
