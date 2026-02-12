# Model Management

## Bundling
- Place .tflite or .onnx models in assets/ directory.
- Models increase APK size — use AAB for per-device delivery.
- Compress models: quantize (INT8) to reduce size 4x.
- Consider: is the model needed on first launch? If not, download dynamically.

## Dynamic Delivery
- Use Play Asset Delivery for on-demand model downloads.
- install-time: downloaded with APK (same as assets/).
- fast-follow: downloaded shortly after install.
- on-demand: downloaded when feature is first accessed.
- Check download status: AssetPackManager.getPackStates().

## Firebase ML Model Management
- Host custom models on Firebase ML.
- Download models dynamically: FirebaseModelDownloader.getInstance().getModel().
- Set download conditions: WiFi only, charging, etc.
- Models update automatically — no app update needed.
- Fall back to bundled model if download fails.

## Versioning
- Version models with metadata (version field in model file or companion JSON).
- Check model version before inference — migrate if format changed.
- Keep previous model version as fallback during transition.
- Test new models against regression test suite before deployment.
- A/B test model versions using Firebase Remote Config.

## Performance Monitoring
- Measure inference latency: time from input preparation to output parsing.
- Track on different device tiers (low-end, mid-range, flagship).
- Set latency budgets: < 100ms for real-time, < 1s for async.
- Monitor model accuracy in production — drift detection.
- Log model version and device info with inference metrics.

## Privacy
- On-device inference keeps data private — no server round-trip.
- Do not send model inputs or outputs to analytics without consent.
- Communicate on-device processing to users for trust.
- If using cloud fallback, obtain explicit consent for data transmission.
