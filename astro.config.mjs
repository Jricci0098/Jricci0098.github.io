import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/site.ts";

// siteConfig.url (src/config/site.ts) is the single source of truth for the
// canonical production URL — imported here instead of duplicated so `site`,
// the sitemap, and every canonical/OG tag can never drift out of sync.

export default defineConfig({
  site: siteConfig.url,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
