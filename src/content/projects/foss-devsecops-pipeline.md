---
title: "FOSS DevSecOps Pipeline"
description: "A fully open-source CI/CD pipeline that gates merges on SAST, dependency scanning, and secret detection — built to prove security doesn't require an enterprise budget."
date: 2024-03-15
status: completed
featured: true
visual: devsecops-pipeline
tags: ["DevSecOps", "CI/CD", "AppSec", "Open Source"]
technologies: ["GitLab CI", "Docker", "Semgrep", "Trivy", "Gitleaks"]
order: 2
---

## Overview

Most DevSecOps tooling demos assume an enterprise security budget. This project is the opposite bet: a complete, self-hosted CI/CD pipeline built entirely from free and open-source tooling that still enforces real security gates — static analysis, dependency vulnerability scanning, container image scanning, and secret detection — before code reaches a protected branch.

## Problem

Small teams and homelab-scale projects rarely have security gates in their pipelines, not because the practice isn't valuable but because the common tooling is priced and marketed at enterprises. The result is a false choice between "no security automation" and "an expensive platform." I wanted to prove that a genuinely useful DevSecOps pipeline is achievable with FOSS tooling alone.

## Objectives

- Block merges when static analysis finds high-confidence, high-severity findings.
- Scan dependencies and container images for known vulnerabilities before deployment.
- Catch committed secrets before they leave a developer's machine, and again in CI as a backstop.
- Keep the pipeline fast enough that developers don't route around it.
- Document the setup so it's reproducible on a self-hosted GitLab instance without commercial licenses.

## Architecture

The pipeline runs as a series of GitLab CI stages, each running in an isolated, ephemeral container:

1. **Pre-commit stage (local):** a git hook runs Gitleaks against staged changes before a commit is even created.
2. **Static analysis stage:** Semgrep runs against the diff using a curated open-source rule set tuned to the languages in use, failing the pipeline on high-severity findings.
3. **Dependency scanning stage:** a software composition analysis step checks manifests against known-vulnerability databases.
4. **Container scanning stage:** Trivy scans built images for OS and application-layer vulnerabilities before they're pushed to the registry.
5. **Secret scanning stage:** a second Gitleaks pass covers the full pipeline context as a backstop to the pre-commit hook.
6. **Gate:** merge requests can't be approved while any blocking stage is failing; results are posted as inline merge request comments.

_Pipeline and network diagrams use sanitized, example project names — not any real client or employer environment._

## Technology Stack

- **GitLab CI** — self-hosted pipeline orchestration.
- **Docker** — isolated, reproducible stage execution.
- **Semgrep** — static application security testing (SAST).
- **Trivy** — container and filesystem vulnerability scanning.
- **Gitleaks** — secret detection, both pre-commit and in CI.

## Implementation

Each scanning tool runs in its own pinned container image so pipeline behavior doesn't drift when an upstream tool updates. Findings from every stage are normalized into a common SARIF-like format and posted back to the merge request as inline comments, so a developer sees exactly which line triggered a finding without leaving their editor's mental model.

Severity thresholds are configurable per project: a new or experimental project can run in report-only mode while a production-facing project enforces hard gates. This made incremental adoption realistic instead of forcing an all-or-nothing rollout.

## Security Considerations

- Scanner containers run with no network egress beyond what's needed to fetch vulnerability databases, reducing the blast radius if a scanning tool itself were compromised.
- Pipeline credentials are scoped per-stage using short-lived CI job tokens rather than a single broad service account.
- False-positive tuning is version-controlled alongside the rule configuration, so suppressions are reviewable in the same merge request workflow as code changes.
- The pipeline itself is a defined asset in the DevSecOps homelab's [Security Homelab](/projects/security-homelab), so its own image and dependencies go through the same gates it enforces on other projects.

## Challenges

The hardest part wasn't wiring up the tools — it was tuning them. Semgrep's default rule sets produced enough noise in the first week that developers started ignoring findings entirely, which is worse than not having the gate at all. Getting to a rule set with a low enough false-positive rate to keep trust took several iterations of disabling noisy rules, writing custom rules for patterns the defaults missed, and setting realistic severity thresholds instead of blocking on everything.

## Results

- Caught real, exploitable findings — including a hardcoded credential and an outdated dependency with a known CVE — before either reached a production branch.
- Kept pipeline runtime under five minutes for typical merge requests, which was the threshold below which developers reported the gate felt "free."
- Proved the core thesis: a small team can run meaningful AppSec automation without a commercial platform.

## What I Learned

Tooling is the easy part of DevSecOps; adoption is the hard part. A perfectly configured scanner that developers route around by force-pushing past it delivers zero security value. The work that actually moved the needle was tuning signal-to-noise and giving developers fast, specific feedback — not adding more scanners.

## Future Improvements

- Add a policy-as-code layer (e.g., OPA/Conftest) for infrastructure-as-code linting alongside application code.
- Introduce a security champions review step for findings that are suppressed rather than fixed.
- Publish the pipeline templates as a reusable GitLab CI component for other self-hosted projects.

## Source Code

Source available on request.
