---
title: "Azure Policy Compliance Reporting"
description: "A PowerShell-driven reporting pipeline that turns raw Azure Policy compliance data into actionable, audience-specific reports for engineering and leadership."
date: 2023-11-01
status: completed
featured: true
visual: azure-policy
tags: ["Azure", "Governance", "Automation", "PowerShell"]
technologies: ["Azure", "Azure Policy", "PowerShell", "Microsoft Graph API", "Power BI"]
order: 1
---

## Overview

Azure Policy is powerful, but the built-in compliance views are built for administrators, not for the engineering teams and leadership who need to act on the findings. This project is a PowerShell-based reporting pipeline that pulls policy compliance state across a multi-subscription Azure environment and reshapes it into reports tailored to different audiences — a technical drill-down for engineers and a rollup summary for leadership.

## Problem

Governance without visibility doesn't change behavior. Before this pipeline existed, policy compliance data lived in the Azure Portal, scattered across subscriptions and management groups, in a format that required someone to already know what they were looking for. Non-compliant resources went unaddressed for weeks because nobody outside the cloud team was looking, and the cloud team didn't have time to manually audit dozens of subscriptions on a recurring basis.

## Objectives

- Aggregate Azure Policy compliance state across every subscription in the tenant on a scheduled basis.
- Produce a technical report engineers can use to find and fix specific non-compliant resources.
- Produce a leadership-facing summary that tracks compliance trends over time without requiring Azure familiarity.
- Make the pipeline reusable — add a subscription or a new policy initiative without rewriting logic.
- Avoid introducing a new platform dependency; run entirely on tooling the team already operates.

## Architecture

The pipeline runs on a schedule from an automation host with a system-assigned managed identity scoped to read policy state across the tenant's management group hierarchy. At a high level:

1. A scheduled trigger invokes a PowerShell orchestration script.
2. The script authenticates using a managed identity — no stored credentials or secrets.
3. Compliance state is pulled via the Azure Resource Graph and Policy Insights APIs across all in-scope subscriptions.
4. Raw results are normalized into a common schema (resource, policy, initiative, compliance state, subscription, resource group).
5. Two output paths are generated from the same normalized dataset: a detailed CSV/HTML export for engineers, and an aggregated summary pushed to a reporting dashboard for leadership.
6. Reports are delivered to their respective audiences through existing notification channels.

_Architecture diagrams shown are illustrative, using sanitized example subscription and resource names — not real tenant data._

## Technology Stack

- **Azure Policy & Policy Insights API** — source of compliance state.
- **Azure Resource Graph** — fast, cross-subscription resource queries.
- **PowerShell 7** — orchestration, transformation, and report generation.
- **Managed Identity** — credential-free authentication to Azure APIs.
- **Power BI** — leadership-facing trend dashboard.

## Implementation

The core of the pipeline is a set of PowerShell modules split by responsibility: authentication, data collection, transformation, and report generation. Keeping these separate made it straightforward to add a new report format later (the Power BI feed) without touching the collection logic. Compliance data is paged and throttled to stay within Resource Graph query limits, and results are cached locally between runs so a transient API failure doesn't force a full re-pull.

Report generation uses parameterized templates so a new policy initiative — like a tagging standard or an encryption baseline — can be added to the technical report by registering its policy definition ID, without changing any code.

## Security Considerations

- Authentication uses a managed identity with **read-only** Reader and Policy Insights roles at the management group level — no write access, and no long-lived credentials to rotate or leak.
- Reports are distributed only to pre-approved internal channels; no compliance data is written to public or externally accessible storage.
- Resource identifiers in reports are scoped to what's needed for remediation — the pipeline avoids surfacing unrelated metadata.
- All API calls are logged for auditability, consistent with the environment's existing activity log retention.

## Challenges

Resource Graph's throttling limits meant a naive "pull everything every run" approach didn't scale past a handful of subscriptions. Solving this required incremental collection — tracking the last successful compliance timestamp per policy assignment and only pulling deltas, falling back to a full pull on a longer interval to catch anything the delta approach might miss.

Getting the leadership report right took more iteration than the technical one. The first few versions were still too detailed to be useful at a glance; the working version now leads with a single trend line and a short list of the initiatives furthest from target.

## Results

- Reduced the time to identify a newly non-compliant resource from days (manual portal review) to hours (next scheduled run).
- Gave leadership a recurring, self-serve view into compliance trends without needing to ask the cloud team for a status update.
- Became the template for how new governance initiatives get rolled out — a new policy is incomplete until it has a corresponding report entry.

## What I Learned

Good governance tooling is as much about audience design as it is about data pipelines. The technical report and the leadership report needed genuinely different information architectures, not just the same data with different formatting. I also came away with a much sharper sense of how to work around Azure API throttling without over-engineering a queueing system for a problem that incremental collection solved more simply.

## Future Improvements

- Add Teams/Slack-native alerting for high-severity non-compliance instead of relying on the scheduled report cadence.
- Extend the schema to support AWS Config compliance data for a unified cross-cloud view.
- Add auto-remediation hooks for a well-understood subset of low-risk policy violations.

## Source Code

Source available on request.
