export interface LabStat {
  label: string;
  value: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
}

/** Configurable — update these counts as the lab environment changes. No real IPs/hostnames. */
export const labStats: LabStat[] = [
  { label: "Virtual Machines", value: "12+", icon: "server" },
  { label: "Containers", value: "20+", icon: "container" },
  { label: "Running Services", value: "18+", icon: "layers" },
  { label: "Monitoring Tools", value: "4", icon: "activity" },
];

export interface LabTechnology {
  name: string;
  /** Lucide icon name, see src/components/Icon.astro */
  icon: string;
  description: string;
  category: "Infrastructure" | "Networking & Security" | "Monitoring" | "DevSecOps" | "Data" | "AI";
}

export const labTechnologies: LabTechnology[] = [
  {
    name: "Proxmox",
    icon: "layers",
    description:
      "Type-1 hypervisor hosting the lab's VMs and LXC containers with snapshot-based recovery.",
    category: "Infrastructure",
  },
  {
    name: "Docker",
    icon: "container",
    description:
      "Containerized services for lab tooling, kept isolated per workload on a segmented internal network.",
    category: "Infrastructure",
  },
  {
    name: "Linux",
    icon: "square-terminal",
    description:
      "Debian/Ubuntu-based hosts for the majority of lab services, hardened against CIS-style baselines.",
    category: "Infrastructure",
  },
  {
    name: "Raspberry Pi",
    icon: "cpu",
    description:
      "Low-power nodes for DNS filtering, sensors, and always-on utilities outside the main hypervisor.",
    category: "Infrastructure",
  },
  {
    name: "pfSense",
    icon: "shield",
    description:
      "Perimeter firewall and routing, with segmented VLANs isolating lab, IoT, and management traffic.",
    category: "Networking & Security",
  },
  {
    name: "Suricata",
    icon: "radar",
    description:
      "Network IDS/IPS monitoring inter-VLAN traffic for signature and anomaly-based detections.",
    category: "Networking & Security",
  },
  {
    name: "Grafana",
    icon: "line-chart",
    description:
      "Dashboards for infrastructure health, service uptime, and detection metrics pulled from lab telemetry.",
    category: "Monitoring",
  },
  {
    name: "GitLab",
    icon: "git-branch",
    description:
      "Self-hosted source control and CI/CD runner for pipeline experiments and internal tooling.",
    category: "DevSecOps",
  },
  {
    name: "PostgreSQL",
    icon: "database",
    description: "Primary relational store for lab applications and reporting data.",
    category: "Data",
  },
  {
    name: "Redis",
    icon: "database-zap",
    description:
      "In-memory cache and queue backing for lab automation and lightweight service state.",
    category: "Data",
  },
  {
    name: "Local LLMs",
    icon: "sparkles",
    description:
      "Self-hosted language models for experimenting with assistant workflows without sending data off-box.",
    category: "AI",
  },
];

export interface LabSection {
  title: string;
  body: string;
}

export const labSections: LabSection[] = [
  {
    title: "Overview",
    body: "The home lab is a self-hosted environment for testing security tooling, infrastructure patterns, and automation ideas before they ever touch production. It's rebuilt often — the goal is hands-on fluency, not a museum piece.",
  },
  {
    title: "Infrastructure",
    body: "A Proxmox cluster hosts a mix of full VMs and lightweight LXC containers, giving room to test hypervisor-level features like snapshots, backups, and resource isolation alongside container workloads.",
  },
  {
    title: "Networking",
    body: "pfSense handles routing and firewalling across segmented VLANs — management, lab workloads, and IoT devices are kept on separate broadcast domains with explicit inter-VLAN rules, mirroring enterprise segmentation practices at a small scale.",
  },
  {
    title: "Security Monitoring",
    body: "Suricata inspects inter-VLAN traffic for known-bad signatures and anomalous patterns, feeding into a SIEM-style pipeline. Grafana dashboards surface health and detection trends without needing to tail logs manually.",
  },
  {
    title: "DevSecOps",
    body: "A self-hosted GitLab instance runs CI/CD pipelines for lab tooling, exercising the same SAST/dependency-scanning gates used in the FOSS DevSecOps Pipeline project before anything is promoted.",
  },
  {
    title: "AI Infrastructure",
    body: "Locally hosted LLMs support experiments in assistant tooling and automation without routing sensitive lab data through third-party APIs — a deliberate constraint that mirrors real data-handling concerns.",
  },
  {
    title: "Services",
    body: "PostgreSQL and Redis back the lab's internal applications, giving a realistic target for testing backup strategies, access controls, and query-level security.",
  },
];
