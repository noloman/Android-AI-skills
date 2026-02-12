# TensorFlow Lite

## Setup
- Add org.tensorflow:tensorflow-lite dependency.
- Add tensorflow-lite-gpu for GPU acceleration.
- Add tensorflow-lite-support for helper utilities (TensorImage, TensorBuffer).
- Place .tflite model file in assets/ directory.

## Interpreter
- Create Interpreter from model file or ByteBuffer.
- Load from assets: Interpreter(loadModelFile(assetManager, "model.tflite")).
- Configure with Interpreter.Options: setNumThreads, addDelegate.
- Run inference: interpreter.run(inputBuffer, outputBuffer).
- Close interpreter when done: interpreter.close().

## Delegates (Hardware Acceleration)
- GPU delegate: GpuDelegate() — faster for models with many ops.
- NNAPI delegate: NnApiDelegate() — uses Android Neural Networks API.
- Not all ops are supported by every delegate — falls back to CPU.
- Test with and without delegates — some models are faster on CPU.
- Check delegate compatibility with interpreter.run() error handling.

## Input/Output
- Prepare input: resize, normalize, convert to ByteBuffer or TensorBuffer.
- Image input: resize to model's expected dimensions (e.g., 224x224).
- Normalize pixel values: typically [0, 1] or [-1, 1].
- Output: parse TensorBuffer — softmax for classification, coordinates for detection.
- Use TensorImage and TensorProcessor from support library for convenience.

## Quantization
- INT8 quantization: 4x smaller model, faster inference, slight accuracy loss.
- Float16 quantization: 2x smaller, minimal accuracy loss, GPU-friendly.
- Dynamic range quantization: applied post-training, easiest to implement.
- Full integer quantization: best size/speed but requires representative dataset.
- Always test quantized models against float models for accuracy regression.

## Best Practices
- Run inference on Dispatchers.Default — not main thread.
- Reuse Interpreter instance — creation is expensive.
- Use model metadata for input/output specification.
- Profile inference time: measure on target devices, not just emulator.
- Consider TFLite Model Maker for custom model training with small datasets.

## LiteRT Rebranding
- TensorFlow Lite is being rebranded as LiteRT (Lite Runtime) under Google AI Edge.
- Package migration: `org.tensorflow:tensorflow-lite` → LiteRT artifacts (in transition).
- API surface remains the same — `Interpreter`, delegates, `TensorBuffer`.
- New code should reference LiteRT branding; existing code continues to work.

## NNAPI Deprecation
- Android NNAPI is deprecated starting Android 15 (API 35).
- Migrate from `NnApiDelegate` to GPU delegate or MediaPipe acceleration.
- NNAPI delegate will continue to work on older API levels.
- For new projects, prefer MediaPipe Tasks API over raw TFLite/LiteRT.

## MediaPipe Model Maker
- Replaces TFLite Model Maker for custom model training.
- Supports: object detection, image classification, text classification, gesture recognition.
- Transfer learning with pre-trained models — train with small datasets.
- Exports MediaPipe Task bundles (`.task` files) or TFLite models.
