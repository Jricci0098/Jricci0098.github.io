export type TechCategory =
  "Cloud" | "Security" | "DevOps" | "Development" | "Infrastructure" | "AI" | "Automation";

export type TechLevel = "Expert" | "Advanced" | "Proficient" | "Working Knowledge" | "Learning";

/** Maps proficiency labels to a 1-5 segment count. Never shown to users as a percentage. */
export const LEVEL_SEGMENTS: Record<TechLevel, number> = {
  Expert: 5,
  Advanced: 4,
  Proficient: 3,
  "Working Knowledge": 2,
  Learning: 1,
};

export interface Technology {
  name: string;
  slug: string;
  category: TechCategory;
  level: TechLevel;
  description: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
  yearsExperience?: number;
  featured: boolean;
  relatedProjects: string[];
}

export const technologies: Technology[] = [
  {
    name: "Azure",
    slug: "azure",
    category: "Cloud",
    level: "Expert",
    description:
      "Primary cloud platform for landing zones, policy-driven governance, identity, and workload security across production environments.",
    icon: "cloud",
    yearsExperience: 8,
    featured: true,
    relatedProjects: ["azure-policy-compliance-reporting"],
  },
  {
    name: "PowerShell",
    slug: "powershell",
    category: "Automation",
    level: "Expert",
    description:
      "Daily automation language for Azure governance tooling, reporting pipelines, and Windows/AD operations at scale.",
    icon: "terminal",
    yearsExperience: 10,
    featured: true,
    relatedProjects: ["azure-policy-compliance-reporting"],
  },
  {
    name: "Security Architecture",
    slug: "security-architecture",
    category: "Security",
    level: "Expert",
    description:
      "Designing defense-in-depth systems, threat models, and control frameworks that hold up under real-world constraints.",
    icon: "shield",
    yearsExperience: 10,
    featured: true,
    relatedProjects: [
      "azure-policy-compliance-reporting",
      "foss-devsecops-pipeline",
      "security-homelab",
    ],
  },
  {
    name: "IAM",
    slug: "iam",
    category: "Security",
    level: "Advanced",
    description:
      "Identity governance, least-privilege access design, conditional access, and privileged access workflows in hybrid environments.",
    icon: "key-round",
    yearsExperience: 7,
    featured: false,
    relatedProjects: ["azure-policy-compliance-reporting"],
  },
  {
    name: "CrowdStrike",
    slug: "crowdstrike",
    category: "Security",
    level: "Advanced",
    description:
      "Endpoint detection and response operations, detection tuning, and incident triage in enterprise environments.",
    icon: "radar",
    yearsExperience: 5,
    featured: false,
    relatedProjects: [],
  },
  {
    name: "Windows",
    slug: "windows",
    category: "Infrastructure",
    level: "Advanced",
    description:
      "Enterprise Windows Server administration, hardening baselines, and Group Policy management.",
    icon: "server",
    yearsExperience: 10,
    featured: false,
    relatedProjects: [],
  },
  {
    name: "Active Directory",
    slug: "active-directory",
    category: "Infrastructure",
    level: "Advanced",
    description:
      "Hybrid identity, domain design, and security hardening for directory services supporting enterprise IAM.",
    icon: "network",
    yearsExperience: 9,
    featured: false,
    relatedProjects: [],
  },
  {
    name: "AWS",
    slug: "aws",
    category: "Cloud",
    level: "Advanced",
    description:
      "Secondary cloud platform experience covering IAM, core compute/storage services, and cross-cloud security patterns.",
    icon: "cloud-cog",
    yearsExperience: 4,
    featured: true,
    relatedProjects: [],
  },
  {
    name: "GitLab",
    slug: "gitlab",
    category: "DevOps",
    level: "Advanced",
    description:
      "CI/CD pipeline design, self-hosted GitLab administration, and pipeline security gating.",
    icon: "git-branch",
    yearsExperience: 5,
    featured: true,
    relatedProjects: ["foss-devsecops-pipeline"],
  },
  {
    name: "Linux",
    slug: "linux",
    category: "Infrastructure",
    level: "Advanced",
    description:
      "Day-to-day administration of Linux servers and containers across homelab and pipeline tooling.",
    icon: "square-terminal",
    yearsExperience: 8,
    featured: false,
    relatedProjects: ["foss-devsecops-pipeline", "security-homelab"],
  },
  {
    name: "AppSec",
    slug: "appsec",
    category: "Security",
    level: "Advanced",
    description:
      "SAST/DAST/SCA tool integration, secure SDLC practices, and vulnerability triage for engineering teams.",
    icon: "bug",
    yearsExperience: 5,
    featured: false,
    relatedProjects: ["foss-devsecops-pipeline"],
  },
  {
    name: "DevSecOps",
    slug: "devsecops",
    category: "DevOps",
    level: "Advanced",
    description:
      "Embedding automated security gates into CI/CD so findings surface before merge, not after deployment.",
    icon: "shield-check",
    yearsExperience: 5,
    featured: true,
    relatedProjects: ["foss-devsecops-pipeline"],
  },
  {
    name: "SIEM",
    slug: "siem",
    category: "Security",
    level: "Advanced",
    description:
      "Log pipeline design, detection engineering, and alert tuning across enterprise and homelab SIEM stacks.",
    icon: "activity",
    yearsExperience: 6,
    featured: false,
    relatedProjects: ["security-homelab"],
  },
  {
    name: "Proxmox",
    slug: "proxmox",
    category: "Infrastructure",
    level: "Advanced",
    description:
      "Self-hosted virtualization platform powering the home lab's compute and networking experiments.",
    icon: "layers",
    yearsExperience: 4,
    featured: true,
    relatedProjects: ["security-homelab"],
  },
  {
    name: "Python",
    slug: "python",
    category: "Development",
    level: "Proficient",
    description:
      "Scripting for automation, data processing, and integrations that PowerShell doesn't cover as cleanly.",
    icon: "code",
    yearsExperience: 5,
    featured: false,
    relatedProjects: ["ai-meeting-assistant"],
  },
  {
    name: "Docker",
    slug: "docker",
    category: "DevOps",
    level: "Proficient",
    description:
      "Containerizing internal tools and lab services with an emphasis on minimal, hardened images.",
    icon: "container",
    yearsExperience: 4,
    featured: false,
    relatedProjects: ["foss-devsecops-pipeline", "security-homelab"],
  },
  {
    name: "Terraform",
    slug: "terraform",
    category: "Infrastructure",
    level: "Proficient",
    description: "Infrastructure as code for repeatable cloud and lab environment provisioning.",
    icon: "boxes",
    yearsExperience: 3,
    featured: false,
    relatedProjects: [],
  },
  {
    name: "Raspberry Pi",
    slug: "raspberry-pi",
    category: "Infrastructure",
    level: "Proficient",
    description:
      "Low-power edge devices for lab sensors, network utilities, and hands-on hardware experimentation.",
    icon: "cpu",
    yearsExperience: 4,
    featured: false,
    relatedProjects: ["security-homelab"],
  },
  {
    name: "AI / LLM Engineering",
    slug: "ai-llm-engineering",
    category: "AI",
    level: "Proficient",
    description:
      "Applying LLMs to practical internal tooling — retrieval, summarization, and assistant workflows with security in mind.",
    icon: "sparkles",
    yearsExperience: 2,
    featured: true,
    relatedProjects: ["ai-meeting-assistant"],
  },
  {
    name: "GCP",
    slug: "gcp",
    category: "Cloud",
    level: "Working Knowledge",
    description:
      "Working familiarity with core GCP services for cross-cloud architecture comparisons.",
    icon: "cloud-lightning",
    yearsExperience: 1,
    featured: false,
    relatedProjects: [],
  },
];

export const TECH_FILTERS = [
  "All",
  "Cloud",
  "Security",
  "DevOps",
  "Development",
  "Infrastructure",
  "AI",
  "Automation",
] as const;
