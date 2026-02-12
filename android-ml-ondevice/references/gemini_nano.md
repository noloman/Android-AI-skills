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

## Limitations
- Available on limited devices — always implement fallback.
- Smaller context window than cloud Gemini models.
- Slower than cloud inference for complex tasks.
- No image/multimodal support in initial on-device version.
- Model updates are system-level — app cannot control model version.

## Best Practices
- Always check availability: GenerativeModel.isAvailable().
- Implement graceful fallback to cloud API or disabled feature.
- Keep prompts concise — smaller model works better with focused instructions.
- Cache results for identical inputs — avoid redundant inference.
- Respect user privacy — clearly communicate that processing is on-device.
- Test on actual supported devices — emulator does not support AI Core.
