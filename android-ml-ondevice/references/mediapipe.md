# MediaPipe Tasks API

## Overview
- MediaPipe is Google's recommended framework for on-device ML tasks (replacing standalone TFLite for common use cases).
- Provides pre-built, optimized solutions for vision, text, and audio.
- Cross-platform: Android, iOS, Web, Python — same API surface.
- Actively maintained with regular model updates.

## Vision Tasks
- Object Detection: detect and locate objects with bounding boxes.
- Image Classification: categorize images into labels.
- Image Segmentation: pixel-level classification (selfie segmentation, scene parsing).
- Hand Landmark Detection: 21 hand landmarks in real-time.
- Face Landmark Detection: 468 face landmarks.
- Pose Landmark Detection: 33 body pose landmarks (replaces ML Kit Pose).
- Gesture Recognition: recognize hand gestures from landmark data.

## Text Tasks
- Text Classification: sentiment analysis, spam detection.
- Text Embedding: generate vector embeddings for similarity search.
- Language Detection: identify text language.

## Audio Tasks
- Audio Classification: identify sounds (speech, music, environmental).

## Setup
- Add MediaPipe Tasks dependency: `com.google.mediapipe:tasks-vision`, `tasks-text`, or `tasks-audio`.
- Create task with options: `ObjectDetector.createFromOptions(context, options)`.
- Process input: `detector.detect(mpImage)` — returns results with confidence scores.
- Supports live stream mode for CameraX integration.

## Best Practices
- Use GPU delegate when available for 2-5x speedup.
- Close task instances when no longer needed — they hold native resources.
- Use `RunningMode.LIVE_STREAM` for camera feeds, `IMAGE` for static images.
- MediaPipe Model Maker: fine-tune models with custom training data (replaces TFLite Model Maker).
- Test on target devices — performance varies significantly by hardware.
