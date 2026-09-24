import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

/**
 * Generated (not a static /public file) so the sitemap URL always matches
 * siteConfig.url — the single source of truth for the canonical domain.
 * Astro prerenders this to a plain robots.txt file at build time.
 */
export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap-index.xml\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
