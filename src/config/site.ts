/**
 * Central site configuration and identity placeholders.
 *
 * This file is the single source of truth for anything that would otherwise
 * require inventing personal details. Replace every `REPLACE_ME` value
 * before deploying. Nothing here is a real identity, employer, or URL.
 *
 * `astro.config.mjs` imports `siteConfig.url` directly so the canonical
 * production URL is only ever declared here. `public/robots.txt` and
 * `public/.well-known/security.txt` are plain static files and can't import
 * TypeScript, so they read the same value in generated form via
 * `src/pages/robots.txt.ts` and `src/pages/.well-known/security.txt.ts` —
 * see those files for the (documented, build-time-only) exception.
 */

export interface SocialLink {
  label: string;
  /** Set to "#" to hide this link everywhere without deleting the entry — see getVisibleSocialLinks(). */
  href: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: "github" | "linkedin" | "mail" | "rss";
}

export interface SiteConfig {
  /** Full display name shown in headings and JSON-LD. */
  name: string;
  /** Role/title shown under the name in places like the résumé header. */
  role: string;
  /** Canonical production URL (no trailing slash). Update for your deployment. */
  url: string;
  /** Default meta description used as a fallback for SEO. */
  description: string;
  /** Contact email. Replace with a real address before going live. */
  email: string;
  /** Public social/profile links. Set href to "#" to hide a link safely — see getVisibleSocialLinks(). */
  social: SocialLink[];
  /** Path to a résumé PDF in /public. Leave null until a real file is added. */
  resumePdfPath: string | null;
  /**
   * Optional contact form endpoint. MUST be a same-origin absolute path
   * (e.g. "/api/contact"), never a third-party URL — the deployed CSP sets
   * `form-action 'self'` (see public/_headers and netlify.toml), so a
   * cross-origin endpoint would be silently blocked by the browser at
   * submit time. `src/pages/contact.astro` validates this with
   * isSameOriginFormEndpoint() and refuses to render the form otherwise.
   * Leave null to hide the form and show direct-contact options only.
   */
  contactFormEndpoint: string | null;
}

export const siteConfig: SiteConfig = {
  name: "Joseph Ricci",
  role: "Cybersecurity Architect",
  url: "https://jricci0098.github.io",
  description:
    "Cybersecurity architect focused on cloud security, AI Security, DevSecOps, and building secure systems that scale — and the people who run them.",
  email: "jricci18@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/Jricci0098", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joe-ricci-557ba4216/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:jricci18@gmail.com", icon: "mail" },
  ],
  resumePdfPath: null,
  contactFormEndpoint: null,
};

/**
 * Derives nav/footer initials from siteConfig.name so they can never drift
 * out of sync with a manually-maintained `initials` field (e.g. after
 * renaming the placeholder name).
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** Filters out placeholder social links (href "#") so no dead controls render. */
export function getVisibleSocialLinks(links: SocialLink[] = siteConfig.social): SocialLink[] {
  return links.filter((link) => link.href !== "#");
}

/**
 * A contact form endpoint must be a same-origin absolute path so it satisfies
 * the deployed CSP's `form-action 'self'`. Rejects third-party URLs, protocol-
 * relative URLs, and anything that isn't an absolute path starting with "/".
 */
export function isSameOriginFormEndpoint(endpoint: string | null): endpoint is string {
  if (!endpoint) return false;
  return endpoint.startsWith("/") && !endpoint.startsWith("//");
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Life Outside Cyber", href: "/life" },
  { label: "Résumé", href: "/resume" },
] as const;

export const FOOTER_QUOTE =
  "“So whether you eat or drink, or whatever you do, do it all for the glory of God.” — 1 Corinthians 10:31";

export const CLOSING_CTA = "Let's Build Something Secure Together.";
