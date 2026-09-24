export interface FocusArea {
  label: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
}

export const focusAreas: FocusArea[] = [
  { label: "Security Architecture", icon: "shield" },
  { label: "Cloud Security", icon: "cloud-cog" },
  { label: "Azure", icon: "cloud" },
  { label: "AWS", icon: "server" },
  { label: "IAM", icon: "key-round" },
  { label: "DevSecOps", icon: "git-merge" },
  { label: "AppSec", icon: "bug" },
  { label: "Automation", icon: "workflow" },
  { label: "AI Security", icon: "sparkles" },
  { label: "Cybersecurity Strategy", icon: "compass" },
];

export interface AboutSection {
  title: string;
  body: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
}

export const aboutSections: AboutSection[] = [
  {
    title: "Teaching & Mentoring",
    body: "I spend a meaningful share of my time helping other engineers build real security intuition — not just pass a checklist. That means pairing on architecture reviews, walking through incidents after the fact, and making sure junior team members understand the why behind a control, not just the how.",
    icon: "graduation-cap",
  },
  {
    title: "Community & Service",
    body: "Service outside of work — through church and community involvement — keeps priorities honest. The same values that shape how I treat a production incident shape how I show up for people.",
    icon: "hand-heart",
  },
  {
    title: "Continuous Learning",
    body: "Cybersecurity doesn't hold still, so neither does my learning. That's labs, certifications, reading primary sources instead of summaries, and building things I don't already know how to build.",
    icon: "book-open",
  },
  {
    title: "Useful Technology",
    body: "I'm drawn to tools that remove toil rather than add ceremony. If a control or a script doesn't make the system measurably safer or someone's day measurably easier, it's not done yet.",
    icon: "wrench",
  },
];

export const aboutBiography = [
  "I'm a cybersecurity architect who spends most of my time at the intersection of cloud infrastructure, security governance, and automation — designing systems that are secure by default and boring to operate, in the best sense of the word.",
  "My background spans enterprise Azure and AWS environments, identity and access management, and the DevSecOps practices that let security keep pace with fast-moving engineering teams instead of trailing behind them. I care as much about the people running these systems as the systems themselves — a control nobody understands is a control that eventually gets worked around.",
  "Outside of client and employer work, I build and break things in a self-hosted home lab, write about what I learn, and stay hands-on with the tools I'd otherwise only read about.",
];
