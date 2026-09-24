export interface Metric {
  label: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
}

export const metrics: Metric[] = [
  { label: "10+ Years Experience", icon: "calendar-clock" },
  { label: "CISSP Certified", icon: "badge-check" },
  { label: "Azure / AWS Cloud Focus", icon: "cloud" },
  { label: "50+ Projects & Scripts", icon: "folder-git-2" },
  { label: "Community Church & Service", icon: "hand-heart" },
  { label: "Always Learning", icon: "graduation-cap" },
];

export interface ExpertiseBadge {
  label: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
}

export const expertiseBadges: ExpertiseBadge[] = [
  { label: "Cloud Security", icon: "cloud-cog" },
  { label: "Security Architecture", icon: "shield" },
  { label: "DevSecOps", icon: "git-merge" },
  { label: "Leadership", icon: "users" },
  { label: "Continuous Learning", icon: "graduation-cap" },
];
