export interface Certification {
  name: string;
  abbreviation: string;
  issuer: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
  /** Set to true for placeholder "future credential" cards so they render distinctly. */
  placeholder?: boolean;
}

export const certifications: Certification[] = [
  {
    name: "Certified Information Systems Security Professional",
    abbreviation: "CISSP",
    issuer: "ISC2",
    icon: "badge-check",
  },
  {
    name: "Microsoft Azure Fundamentals",
    abbreviation: "AZ-900",
    issuer: "Microsoft",
    icon: "cloud",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    abbreviation: "AWS CCP",
    issuer: "Amazon Web Services",
    icon: "cloud-cog",
  },
  {
    name: "Certified Ethical Hacker",
    abbreviation: "CEH",
    issuer: "EC-Council",
    icon: "shield-alert",
  },
  {
    name: "Future credential slot",
    abbreviation: "TBD",
    issuer: "Add your next certification here",
    icon: "plus-circle",
    placeholder: true,
  },
];
