---
title: "AI Meeting Assistant"
description: "A self-hosted meeting summarization and action-item extraction tool built on a local LLM, designed so sensitive meeting content never leaves the network."
date: 2024-08-20
status: completed
featured: true
visual: ai-assistant
tags: ["AI", "Automation", "Privacy", "Python"]
technologies: ["Python", "Local LLMs", "Whisper", "Docker"]
order: 3
---

## Overview

Commercial AI meeting assistants are useful, but nearly all of them require routing audio and transcripts through a third-party cloud service. For meetings that touch sensitive architecture discussions or internal planning, that trade-off isn't acceptable. This project is a self-hosted alternative: local transcription plus a locally-hosted LLM that summarizes meetings and extracts action items, with no data leaving the network boundary.

## Problem

Meeting notes are consistently the first thing to fall through the cracks — action items get agreed on verbally and forgotten by the next standup. The commercial tools that solve this well require sending recordings to a vendor's cloud, which wasn't an option for the kind of internal security and architecture discussions I wanted this to cover.

## Objectives

- Transcribe meeting audio locally, with no dependency on a cloud speech-to-text API.
- Summarize transcripts and extract action items using a locally hosted LLM.
- Keep the entire pipeline — audio, transcript, and summary — inside the local network.
- Make output structured enough to drop directly into existing note-taking workflows.
- Keep hardware requirements realistic for a homelab-scale GPU, not a data center.

## Architecture

1. Meeting audio is recorded and saved to a local, access-controlled storage location.
2. A transcription service processes the audio file locally, producing a timestamped transcript.
3. The transcript is chunked and passed to a locally hosted LLM with a structured prompt requesting a summary and a discrete action-item list.
4. Output is validated against an expected schema (summary, decisions, action items with owners where mentioned) before being written to storage.
5. The final structured note is delivered to a personal note-taking system for follow-up.

_All examples and screenshots use synthetic, illustrative meeting content — not real conversations._

## Technology Stack

- **Python** — orchestration of the transcription-to-summarization pipeline.
- **Whisper (local)** — speech-to-text transcription running on local hardware.
- **Local LLMs** — summarization and action-item extraction without an external API call.
- **Docker** — containerized, reproducible deployment of each pipeline stage.

## Implementation

The pipeline is intentionally modular: the transcription stage and the summarization stage communicate through a plain-text intermediate format, which made it easy to swap the underlying transcription or LLM model without touching the rest of the pipeline. Prompt design went through several rounds — early versions produced summaries that were accurate but not actionable; the working version explicitly separates "decisions made" from "open action items" in the prompt structure, which meaningfully improved output usability.

Action items are extracted with a lightweight structured-output format so they can be parsed programmatically rather than requiring a human to re-read the summary to find them.

## Security Considerations

- No audio, transcript, or summary data is sent to a third-party API at any pipeline stage — everything runs on local compute.
- Storage for recordings and transcripts is access-controlled and retained only as long as needed for follow-up, then purged on a schedule.
- The local LLM runs in an isolated container with no outbound network access, limiting exposure even if the model or a dependency were compromised.

## Challenges

Local LLMs, especially at a size that runs comfortably on homelab-scale hardware, are meaningfully less reliable at structured output than the largest commercial models. Getting consistent, parseable action-item lists required more explicit prompt scaffolding and post-processing validation than I expected going in — the model would occasionally merge two action items into one or return free text instead of the requested structure, so the pipeline includes a validation-and-retry step rather than trusting the first response.

## Results

- Cut the time spent writing up meeting notes from roughly fifteen minutes to under two minutes of review.
- Action items that used to only exist in someone's memory now show up in a structured list automatically.
- Demonstrated that a genuinely useful AI tool doesn't require sending sensitive data to a third party.

## What I Learned

Working with local LLMs taught me to design prompts and validation logic defensively — smaller local models need more structural scaffolding than their commercial counterparts to produce reliably usable output. It also reinforced how much of "AI tooling" is really pipeline engineering: transcription quality, chunking strategy, and output validation mattered more to the end result than which specific model was doing the summarization.

## Future Improvements

- Add speaker diarization so action items can be attributed to specific participants automatically.
- Support incremental summarization for long meetings instead of processing the full transcript at once.
- Explore a small fine-tuned model specifically for the action-item extraction task to reduce reliance on prompt engineering.

## Source Code

Source available on request.
