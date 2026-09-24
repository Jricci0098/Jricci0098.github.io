---
title: "Building Useful AI Tools"
description: "The interesting engineering problem in applied AI isn't the model — it's the pipeline around it. Notes from building a self-hosted meeting assistant on local LLMs."
publishDate: 2024-09-03
category: "AI"
tags: ["AI", "LLM", "Automation", "Privacy"]
---

Building a practical AI tool on local models — instead of calling out to the largest commercial API available — forces a set of engineering decisions that get glossed over when the model is powerful enough to paper over sloppy prompting and thin validation. That constraint turned out to be the most useful part of the project.

## The model is not the pipeline

It's easy to conflate "which model" with "does the tool work." In practice, the transcription quality feeding into the model, the chunking strategy for long inputs, and the validation logic on the output mattered more to whether the final tool was actually useful than which specific local LLM was doing the summarization. A mediocre model with a well-designed pipeline around it beats a great model with no structure around its inputs and outputs.

## Local models need more scaffolding, not less

Smaller, locally-hosted models are noticeably less reliable at structured output than the largest commercial models — they'll occasionally merge two distinct items into one, or return prose when the prompt asked for a list. The naive approach of trusting the first response doesn't hold up. What worked was treating the model's output as untrusted input to a validation step: check it against an expected schema, and retry with a clarifying prompt if it doesn't match, rather than assuming success.

## Separate "what happened" from "what to do"

Early prompt versions asked for a single combined summary, and the output was accurate but not actionable — decisions and open action items blurred together in a way that meant someone still had to re-read the whole thing to extract next steps. Explicitly separating "decisions made" from "action items outstanding" in the prompt structure was a small change that meaningfully improved how usable the output actually was. The lesson generalizes: prompt structure should mirror how the output will actually be consumed, not just what information needs to be present.

## Privacy constraints are good design constraints

Keeping all data — audio, transcript, and summary — inside the local network wasn't just a privacy requirement, it shaped the tool for the better. It forced realistic hardware planning instead of assuming infinite cloud compute, and it meant every pipeline stage had to be genuinely self-contained rather than quietly depending on an external service. Constraints that feel limiting at the start often produce more honest engineering than an unconstrained design would.

## AI tooling is pipeline engineering wearing a new hat

None of these lessons are specific to language models. They're the same lessons that apply to any system processing untrusted or unreliable input: validate before you trust, structure your interfaces around actual consumption patterns, and let real constraints — privacy, hardware, latency — drive the design instead of fighting them.
