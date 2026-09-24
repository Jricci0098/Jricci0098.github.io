export interface LifeCategory {
  title: string;
  description: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
  /** Visual treatment key — see LifeCard.astro for the abstract art variants. */
  visual:
    "faith" | "family" | "fitness" | "hiking" | "guitar" | "gardening" | "travel" | "home-projects";
}

export const lifeCategories: LifeCategory[] = [
  {
    title: "Faith",
    description:
      "Faith is the foundation everything else sits on — it shapes how I lead, how I treat people, and how I define a life well spent.",
    icon: "hand-heart",
    visual: "faith",
  },
  {
    title: "Family",
    description:
      "The people I come home to are the reason the work matters in the first place. Time with family is protected, not squeezed in.",
    icon: "home",
    visual: "family",
  },
  {
    title: "Fitness & MMA",
    description:
      "Training keeps me sharp — mentally and physically. There's a discipline in mat time that translates directly to how I approach hard problems.",
    icon: "dumbbell",
    visual: "fitness",
  },
  {
    title: "Hiking",
    description:
      "Trail time is where I do my best unstructured thinking, usually far from a screen and often the origin of a project idea.",
    icon: "mountain",
    visual: "hiking",
  },
  {
    title: "Guitar",
    description:
      "A slow-built, ongoing practice — proof that expertise is earned in small repeated sessions, not shortcuts.",
    icon: "music",
    visual: "guitar",
  },
  {
    title: "Gardening",
    description:
      "Tending something that grows on its own timeline is a good counterweight to a career built around uptime and immediacy.",
    icon: "sprout",
    visual: "gardening",
  },
  {
    title: "Travel",
    description:
      "New places reset perspective and remind me how many different ways there are to solve the same human problems.",
    icon: "plane",
    visual: "travel",
  },
  {
    title: "Home Projects",
    description:
      "Hands-on building — woodworking, repairs, the occasional over-engineered home network closet. The same craftsmanship mindset, different medium.",
    icon: "hammer",
    visual: "home-projects",
  },
];
