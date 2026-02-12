
---
name: android-ml-ondevice
description: On-device ML — ML Kit, TensorFlow Lite, Gemini Nano, model management.
user-invocable: true
---

# Android On-Device ML

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Prefer ML Kit for common tasks (text recognition, barcode, face, pose) — pre-trained, optimized.
- Run inference off the main thread — use coroutines with Dispatchers.Default.
- Use Google Play Services-based ML Kit models to reduce APK size.
- Bundle TFLite models in assets/ or download dynamically via Play Asset Delivery.
- Validate model input/output shapes — mismatches cause silent failures or crashes.
- Handle model loading failures gracefully — provide fallback or skip ML feature.
- Do not ship unnecessarily large models — quantize (INT8) to reduce size and latency.
- Respect user privacy — process data on-device, do not upload without consent.
- Request camera/microphone permissions before ML features that use them.
- Test ML features on low-end devices — not just flagships.

## Core Patterns
- ML Kit auto-downloads models via Google Play Services (no APK size impact).
- Use InputImage.fromMediaImage() for CameraX integration with ML Kit.
- TFLite Interpreter with GPU delegate for acceleration on supported devices.
- Use Gemini Nano (on-device LLM) via AI Core API for generative tasks.
- Implement progressive enhancement — ML features enhance but are not required.
- Cache inference results when input hasn't changed.

## References
- references/ml_kit.md
- references/tensorflow_lite.md
- references/gemini_nano.md
- references/model_management.md
