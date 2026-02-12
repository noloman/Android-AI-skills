# ML Kit

## Deployment Options
- Google Play Services-based: model downloaded via Play Services — no APK size impact.
- Bundled: model included in APK — works offline, increases APK size.
- Prefer Play Services-based for most use cases — smaller app, auto-updates.
- Bundled for: offline-first apps, instant availability requirements.

## Vision APIs
- Text recognition: TextRecognition.getClient() — supports Latin, Chinese, Japanese, Korean, Devanagari.
- Barcode scanning: BarcodeScanning.getClient() — QR codes, barcodes, all standard formats.
- Face detection: FaceDetection.getClient() — landmarks, contours, classification (smiling, eyes open).
- Pose detection: PoseDetection.getClient() — 33 body landmarks in real-time.
- Object detection: ObjectDetection.getClient() — object tracking with custom models.

## Natural Language APIs
- Language identification: LanguageIdentification.getClient().
- Smart Reply: SmartReply.getClient() — generates contextual reply suggestions.
- Entity extraction: EntityExtraction.getClient() — extracts dates, addresses, phone numbers.
- Translation: Translation.getClient(options) — on-device translation between 50+ languages.

## Additional Vision APIs
- Document Scanner: `GmsDocumentScanning.getClient()` — automatic document detection, cropping, perspective correction.
- Subject Segmentation: separate foreground subjects from background — selfie mode, background blur.
- Digital Ink Recognition: `DigitalInkRecognition.getClient()` — handwriting recognition for stylus/touch input.
- Selfie Segmentation: `SelfieSegmentation.getClient()` — real-time person segmentation.

## CameraX Integration
- Use ImageAnalysis use case with ML Kit.
- Convert ImageProxy to InputImage: InputImage.fromMediaImage(mediaImage, rotation).
- Process in analyzer callback: detector.process(inputImage).addOnSuccessListener { }.
- Always close ImageProxy after processing — blocks next frame otherwise.
- Use STRATEGY_KEEP_ONLY_LATEST for real-time processing.

## Best Practices
- Check model availability before use: isOperational or download check.
- Handle model download failures gracefully — feature should degrade, not crash.
- Process frames off main thread — ML Kit handles this internally but verify.
- Dispose detectors when no longer needed: detector.close().
- Test on low-end devices — ML Kit performance varies significantly.
