# Personal Cybersecurity Portfolio — Implementation Specification

Build a production-quality, data-driven personal portfolio for a senior cybersecurity architect and hands-on builder.

## Stack and quality bar
- Astro, strict TypeScript, Tailwind CSS, Astro content collections using Markdown/MDX where appropriate, Lucide icons, minimal client JavaScript.
- Static deployment compatible with Cloudflare Pages, GitHub Pages, and Netlify.
- Dark navy/charcoal default theme with cyan/electric-blue and restrained teal accents; light theme too.
- Large confident typography, subtle borders/glows, generous spacing, information dense but uncluttered. Professional architecture aesthetic; no hacker clichés.
- Responsive at 1440, 1024, 768, and 390px. WCAG 2.2 AA practices, keyboard support, visible focus, semantic HTML, reduced motion, image alt text.
- Performance target: Lighthouse 90+ performance and 95+ accessibility/best-practices/SEO.

## Global shell
Sticky translucent nav with configurable initials/logo and routes: Home, Projects, Lab, Writing, About, Life Outside Cyber, Résumé. Right side theme toggle and Contact CTA. Accessible mobile hamburger. Footer repeats brand/navigation/social links and subtle 1 Corinthians 10:31 quote. Closing CTA: “Let's Build Something Secure Together.”

## Home
1. Cinematic hero with abstract cloud/network artwork (local SVG/CSS, no remote stock dependency), eyebrow “CYBERSECURITY ARCHITECT,” headline “Secure Systems. Stronger People.” and supplied supporting copy. CTAs View My Projects and Download Résumé. Expertise badges: Cloud Security, Security Architecture, DevSecOps, Leadership, Continuous Learning.
2. Data-driven metrics: 10+ Years Experience; CISSP Certified; Azure / AWS Cloud Focus; 50+ Projects & Scripts; Community Church & Service; Always Learning.
3. Featured project cards for Azure Policy Compliance Reporting, FOSS DevSecOps Pipeline, AI Meeting Assistant, Security Homelab; each links to a generated case-study route.
4. “Tech I Work With” preview/filterable grid. Five-segment proficiency meter, never percentages.
5. Certification cards: CISSP, Microsoft AZ-900, AWS Cloud Practitioner / Foundations, CEH; future credential placeholders should be easy to add.
6. Writing preview and Life Outside Cyber preview.
7. Closing contact CTA.

## Project content and pages
Use `src/content/projects/*.md` and a type-safe collection. Adding a file automatically populates `/projects`. Each project supports title, description, date/status, featured, visual treatment, tags/technologies, source/demo URLs if available, and structured case-study body. Create the four initial projects. Dedicated page uses documentation-style layout with desktop sticky left TOC and sections: Overview, Problem, Objectives, Architecture, Technology Stack, Implementation, Security Considerations, Challenges, Results, What I Learned, Future Improvements, Source Code. Architecture diagrams can be full width and must use sanitized/example networks. Never invent live source URLs; display “Source available on request” or omit link if unknown.

## Technologies
Data file supports name, slug, category, level, description, icon, yearsExperience?, featured, relatedProjects. Level union: Expert=5, Advanced=4, Proficient=3, Working Knowledge=2, Learning=1. Public UI only displays labels and five elegant segments. Filters: All, Cloud, Security, DevOps, Development, Infrastructure, AI, Automation. Initial data:
Azure Expert; PowerShell Expert; Security Architecture Expert; IAM Advanced; CrowdStrike Advanced; Windows Advanced; Active Directory Advanced; AWS Advanced; GitLab Advanced; Linux Advanced; AppSec Advanced; DevSecOps Advanced; SIEM Advanced; Proxmox Advanced; Python Proficient; Docker Proficient; Terraform Proficient; Raspberry Pi Proficient; AI / LLM Engineering Proficient; GCP Working Knowledge.
Each entry needs specific usage copy. Hover/focus/click should reveal or emphasize details without hiding essential content from touch/keyboard users.

## Other routes
- `/lab`: Cyber Lab headline/subtitle; overview, infrastructure, networking, security monitoring, DevSecOps, AI infrastructure, services, architecture diagram. Technology cards for Proxmox, Docker, Linux, Suricata, pfSense, Grafana, GitLab, PostgreSQL, Redis, LLMs, Raspberry Pi. Configurable stats for VMs/containers/services/monitoring tools. No real IPs/hostnames/secrets.
- `/writing`: Content collection with initial articles/cards: Building a Home Lab for Real-World Security Testing; Azure Policy Compliance at Scale; Container Security Best Practices; Building Useful AI Tools; Lessons From Building a DevSecOps Pipeline. Each card has title, description, publish date, calculated/declared reading time, category, tags. Dedicated article pages with Article JSON-LD.
- `/life`: Photography-style cards with local abstract/editorial artwork and dark overlays for Faith, Family, Fitness & MMA, Hiking, Guitar, Gardening, Travel, Home Projects. Supplied respectful descriptions; no identifiable photos.
- `/about`: “Security. Cloud. Automation. Real Impact.” biography and focus areas (Security Architecture, Cloud Security, Azure, AWS, IAM, DevSecOps, AppSec, Automation, AI Security, Cybersecurity Strategy), plus teaching, mentoring, community service, continuous learning, and useful technology. Config-driven social/contact links.
- `/contact`: direct contact options with no insecure client-side form unless a safe configurable endpoint exists.
- `/resume`: polished web résumé and download behavior that gracefully indicates a PDF is not configured yet; identity details centralized and marked for replacement.
- custom 404.

## SEO, security, and operations
- Reusable SEO metadata: title, description, canonical, OG, Twitter. Person JSON-LD globally and Article JSON-LD for writing.
- sitemap integration, robots.txt, `.well-known/security.txt`.
- Strict practical CSP and secure headers examples/configs for Cloudflare Pages (`public/_headers`) and Netlify (`netlify.toml`); no inline third-party scripts or trackers, no keys/secrets.
- Pin dependencies with lockfile. GitHub Actions on push/PR: install, lint, Astro check/typecheck, tests if present, build, npm audit, Trivy filesystem scan, Semgrep (non-blocking only if rules/download instability would otherwise break clean builds), secret scanning. Provide GitHub Pages deployment workflow or clearly isolated deploy job.
- Professional README: purpose, architecture, stack, local dev/build, deployment options, content management, adding projects/writing, changing proficiency, identity customization, security.

## Motion and visual posture
Subtle reveal, hover lift, active border glow, segment illumination, smooth nav transitions, gentle gradients, tiny icon movement. Respect `prefers-reduced-motion`. Avoid parallax, particles, constant animation, excessive blur/glass, matrix/terminal/skull/gaming motifs.

## Content integrity
Do not invent personal identity, employers, dates, public URLs, or accomplishments beyond supplied example values. Put all unknown name, initials, email, GitHub, LinkedIn, canonical URL, and résumé asset settings in one site config with obvious placeholders and document them.
