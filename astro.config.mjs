// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://jeiyanet.github.io',
  base: 'tpl-houses',
  vite: {
    plugins: [tailwindcss()],  
  },
});
