---
title: "Lessons From Building a DevSecOps Pipeline"
description: "Wiring up SAST, dependency scanning, and secret detection is the easy part. The hard part is getting developers to trust the gate instead of routing around it."
publishDate: 2024-11-18
category: "DevSecOps"
tags: ["DevSecOps", "CI/CD", "AppSec", "Open Source"]
---

Standing up a CI/CD pipeline with real security gates — SAST, dependency scanning, container scanning, secret detection — using entirely free and open-source tooling took about a week of focused work. Getting developers to actually trust and keep those gates enabled took much longer, and taught me more.

## A noisy gate is worse than no gate

The first version of the pipeline ran default rule sets out of the box, and within a week developers had started routing around it — force-pushing past failed checks, or quietly disabling the pipeline stage on their branch. A gate that produces enough false positives to erode trust doesn't just fail to add security value; it actively teaches people that findings from this system can be ignored, which undermines the next genuinely important finding too.

Fixing this took real tuning work: disabling noisy default rules, writing custom rules for the patterns that actually mattered in this codebase, and setting severity thresholds that blocked on real risk instead of blocking on everything. Signal-to-noise ratio turned out to matter more than rule coverage.

## Fast feedback is a security requirement, not a nice-to-have

Below roughly five minutes, developers reported the security gate felt "free" — invisible enough that it didn't change their workflow. Above that, it started to feel like a tax, and tax-feeling gates get resented and eventually bypassed. That number is going to be different for every team, but the underlying point holds generally: pipeline runtime is a security property, because a slow gate is a gate people will find a way around.

## Give feedback where the work already happens

Posting findings as inline merge request comments, tied to the specific line that triggered them, made a bigger difference to adoption than any amount of rule tuning. Developers didn't have to leave their existing review workflow or learn a new dashboard to understand and act on a finding. If a security tool requires a context switch to act on its output, that's friction working against you before the finding is even evaluated on its merits.

## Incremental adoption beats a hard cutover

Rolling every project straight into hard-enforcement mode produced immediate pushback, because existing projects had a backlog of findings that predated the pipeline. Running new and low-risk projects in report-only mode first, and reserving hard blocking for projects that had already been through a remediation pass, let the practice earn trust before it started saying no to people.

## The tooling was never really the bottleneck

Every one of these lessons is about the human side of the system, not the technical side. Semgrep, Trivy, and Gitleaks all did what they claimed to do from day one. What determined whether the pipeline actually improved security posture was whether developers trusted it enough to keep it turned on — and that trust had to be earned through tuning, speed, and feedback design, not assumed because the tools were correctly configured.
