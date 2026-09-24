---
title: "Container Security Best Practices"
description: "Container security is mostly discipline, not tooling — a field guide to the habits that actually reduce risk, from image provenance to runtime isolation."
publishDate: 2024-05-14
category: "AppSec"
tags: ["Docker", "Containers", "AppSec", "DevSecOps"]
---

Most container security advice front-loads tool names — scan with this, sign with that — without explaining why the underlying practice matters. Tools change. The principles underneath them don't, so that's where I'd rather start.

## Minimal images aren't a nice-to-have

Every package in a container image is attack surface, whether or not the application uses it. A full OS base image bundles a shell, package managers, and utilities that make an attacker's job easier if they get code execution — and most of that tooling is never used by the application itself. Minimal or distroless base images cut that surface down substantially, at the cost of a debugging workflow that requires slightly more intention (you generally can't just `exec` in and poke around).

## Scan images, but scan them where it matters

Vulnerability scanning a container image is table stakes at this point, but where in the pipeline you scan changes what problem you're actually solving. Scanning only at deploy time means you find out about a critical CVE after the image is already running. Scanning in CI, before the image is pushed to a registry, means a vulnerable image never gets the chance to reach production in the first place. Both have value — CI scanning for prevention, periodic re-scanning of deployed images for newly disclosed CVEs in dependencies that were fine when the image was built.

## Run as non-root, by default, without exceptions

Running a container process as root doesn't automatically grant host root, but it removes a meaningful layer of defense if a container escape vulnerability is ever found. Every base image and Dockerfile should default to a non-root user, and "the application needs root" should be treated as a bug to fix, not a constraint to accept — it almost always turns out the application needed a specific capability, not full root.

## Secrets don't belong in images, ever

Baking a secret into an image layer means it's in the image's history permanently, recoverable by anyone who can pull it, even after a later layer "removes" it. Secrets belong in a secrets manager or injected at runtime through environment variables or mounted volumes scoped to the running container — never in a `Dockerfile` `ENV` or `COPY` instruction.

## Network policy is part of container security, not a separate concern

A container with unrestricted egress can exfiltrate data or reach out to a command-and-control server just as easily as a compromised VM can. Default-deny network policies, with explicit allow rules for what a given service actually needs to talk to, extend the same segmentation thinking that applies at the network level down to individual workloads.

## The common thread

Every one of these practices is really the same principle applied in a different place: minimize what's available to be abused, and make exceptions deliberate instead of default. Tooling helps enforce that discipline, but it can't substitute for it.
