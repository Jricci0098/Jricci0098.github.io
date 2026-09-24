---
title: "Security Homelab"
description: "A self-hosted Proxmox environment with segmented networking, IDS/IPS monitoring, and a DevSecOps pipeline — a live testbed for enterprise patterns at homelab scale."
date: 2022-06-01
status: in-progress
featured: true
visual: homelab
tags: ["Infrastructure", "Networking", "Security Monitoring"]
technologies: ["Proxmox", "pfSense", "Suricata", "Grafana", "GitLab"]
order: 4
---

## Overview

The home lab is a continuously evolving, self-hosted environment for testing security tooling and infrastructure patterns hands-on before applying them professionally. It's built around a Proxmox virtualization cluster, segmented networking with pfSense and VLANs, Suricata-based network monitoring, and a self-hosted GitLab instance running the [FOSS DevSecOps Pipeline](/projects/foss-devsecops-pipeline). See the [Lab](/lab) page for the current live breakdown of what's running.

## Problem

Reading about security architecture and operating it are different skills, and the gap between them only closes with hands-on practice. Without a lab environment, testing a new detection rule, a segmentation change, or a pipeline security gate means either risking a production environment or not testing it at all. Neither is acceptable.

## Objectives

- Build a virtualization platform that supports rapid iteration — spin environments up and tear them down without fear of breaking something important.
- Implement real network segmentation, not a flat network, to practice enterprise-style isolation patterns.
- Stand up network-based security monitoring to practice detection engineering against real (if lower-volume) traffic.
- Run a self-hosted CI/CD platform to test DevSecOps patterns before recommending them elsewhere.
- Keep the whole environment documented and rebuildable, not a fragile snowflake.

## Architecture

1. **Compute:** a Proxmox cluster hosts a mix of full VMs and lightweight LXC containers, chosen per workload based on isolation needs versus resource overhead.
2. **Networking:** pfSense handles routing and firewalling across segmented VLANs — management, lab workloads, and IoT devices are isolated from each other with explicit inter-VLAN rules.
3. **Monitoring:** Suricata inspects inter-VLAN traffic for signature and anomaly-based detections, with results feeding a Grafana-based dashboard layer.
4. **DevSecOps:** a self-hosted GitLab instance runs CI/CD pipelines for lab tooling using the same security gates documented in the FOSS DevSecOps Pipeline project.
5. **Data services:** PostgreSQL and Redis back internal lab applications, giving a realistic target for testing backup and access-control strategies.
6. **Edge compute:** Raspberry Pi nodes handle always-on, low-power utilities like DNS filtering that don't need full VM overhead.

_Network diagrams are illustrative and use sanitized example addressing — no real IPs, hostnames, or credentials are shown or reused anywhere in this lab._

## Technology Stack

- **Proxmox** — type-1 hypervisor for VM and container hosting.
- **pfSense** — perimeter firewall and VLAN routing.
- **Suricata** — network intrusion detection/prevention.
- **Grafana** — infrastructure and detection telemetry dashboards.
- **GitLab** — self-hosted source control and CI/CD.

## Implementation

The lab is built to be rebuilt. Infrastructure-as-code and configuration snapshots are kept for the core services so a host failure is a recovery exercise measured in an evening, not a multi-day project. VLAN segmentation was designed around blast-radius containment first: if a lab workload VM is compromised, it should not have a path to management interfaces or to the home network's IoT segment.

Suricata rules are a mix of community rule sets and custom rules written against the lab's own traffic patterns, which turned out to be a much better way to learn detection engineering than reading about it — false positives here have real, immediate feedback.

## Security Considerations

- VLAN segmentation enforces least-access by default between management, lab, and IoT network segments.
- All lab services requiring authentication use unique, managed credentials — nothing shared with production or personal accounts.
- Suricata and firewall logs are retained and reviewed, giving practical experience with log volume and signal-to-noise tradeoffs at a smaller, more tractable scale.
- No real personal or sensitive data is processed in the lab; it is treated as an untrusted testing environment by design.

## Challenges

Segmentation is easy to get conceptually right and easy to get practically wrong — the first VLAN design technically isolated traffic but broke enough legitimate cross-segment functionality (like centralized logging) that it had to be redesigned around explicit, narrowly-scoped allow rules instead of broad segment-level policies. That redesign is what the current architecture reflects.

Keeping the lab from becoming an unmaintained pile of ad hoc VMs has been an ongoing discipline problem — the fix was treating lab services the same way I'd treat production: documented, version-controlled configuration, and a standing "why does this exist" review every time something new gets added.

## Results

- A working, segmented network that mirrors enterprise patterns at a scale that's safe to break intentionally.
- Real detection engineering practice against real traffic, not just documentation.
- A live target environment for testing the DevSecOps pipeline before recommending its patterns anywhere else.

## What I Learned

The biggest lesson has been operational, not technical: the difference between a lab that teaches you something and a lab that's just a collection of running services is the discipline of documenting, monitoring, and periodically tearing down and rebuilding what's there. The segmentation redesign in particular taught me to think about network policy in terms of explicit allow-lists from day one rather than trying to retrofit least-privilege onto a permissive default.

## Future Improvements

- Expand Suricata rule tuning with a feedback loop from Grafana dashboards to catch alert fatigue before it happens.
- Add automated, tested backup/restore drills for the core services on a recurring schedule.
- Integrate the local LLM infrastructure from the [AI Meeting Assistant](/projects/ai-meeting-assistant) project more tightly with lab monitoring for anomaly summarization.

## Source Code

Source available on request.
