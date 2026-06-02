// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Cambiá esta URL por el dominio final de producción.
// Se usa para el sitemap, las URLs canónicas y las meta tags Open Graph.
const SITE_URL = 'https://julu.example.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Permite servir a través de túneles ngrok (para compartir).
    // Sin esto, Vite responde "Blocked request. This host is not allowed.".
    // `server` cubre `npm run dev`; `preview` cubre `npm run preview`.
    server: {
      allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
    preview: {
      allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
  },
});
