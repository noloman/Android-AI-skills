# Gemini Nano (On-Device LLM)

## Overview
- Gemini Nano is Google's on-device large language model.
- Runs via Android AI Core system service — no model bundling needed.
- Available on Pixel 8+ and select devices with sufficient hardware.
- Use for: text summarization, smart reply, content rewriting, entity extraction.
- On-device: no network required, data stays private.

## API Access
- Use GenerativeModel from Google AI client SDK.
- Check device capability before use — not all devices support Gemini Nano.
- Fall back to cloud-based Gemini API if on-device is unavailable.
- Request AI Core download if model isn't present.

## Use Cases
- Summarization: summarize long text into bullet points.
- Smart compose: suggest completions for user input.
- Classification: categorize text into predefined labels.
- Extraction: pull structured data from unstructured text.
- Rewriting: adjust tone, formalize, or simplify text.

## Multimodal Support
- Gemini Nano now supports multimodal input: text + images.
- Use for: image description, visual Q&A, document understanding.
- Pass Bitmap alongside text prompt for multimodal inference.
- Still limited compared to cloud Gemini — best for simple visual understanding.

## Prompt Engineering
- Keep prompts concise and specific — smaller model responds better to focused instructions.
- Use system instructions to set context and format expectations.
- Provide examples (few-shot) for consistent output format.
- Limit output length with explicit instructions — prevents rambling.
- Use structured output format (JSON, bullet points) for parseable results.

## Limitations
- Available on limited devices (Pixel 8+, select Samsung, select others) — always implement fallback.
- Smaller context window (~4K tokens) than cloud Gemini models.
- Slower than cloud inference for complex tasks — but no network latency.
- Model updates are system-level — app cannot control model version.
- Not suitable for: long documents, complex reasoning, code generation.
- Token limits: measure input/output tokens, truncate input if needed.

## Best Practices
- Always check availability: GenerativeModel.isAvailable().
- Implement graceful fallback to cloud API or disabled feature.
- Keep prompts concise — smaller model works better with focused instructions.
- Cache results for identical inputs — avoid redundant inference.
- Respect user privacy — clearly communicate that processing is on-device.
- Test on actual supported devices — emulator does not support AI Core.
