import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';
//import compress from 'astro-compress';

import preact from '@astrojs/preact';
import { SITE } from './src/config.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    icon(),
    /*compress({
    css: true,
    html: {
      removeAttributeQuotes: false,
    },
    img: false,
    js: true,
    svg: false,
     logger: 1,
  }),*/ preact({ compat: true }),
  ],
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
