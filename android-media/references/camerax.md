# CameraX

## Setup
- Use androidx.camera:camera-camera2 (implementation) + camera-lifecycle + camera-view.
- CameraX is lifecycle-aware — binds to LifecycleOwner.
- Requires camera permission: Manifest.permission.CAMERA.
- Request permission before binding camera use cases.

## Use Cases
- Preview: live camera feed on screen (PreviewView or Compose).
- ImageCapture: take photos (takePicture with OutputFileOptions).
- ImageAnalysis: real-time frame analysis (ML Kit integration).
- VideoCapture: record video (Recorder + Recording).
- Bind up to 3 use cases simultaneously (Preview + ImageCapture + ImageAnalysis).

## Lifecycle Binding
- Get ProcessCameraProvider: ProcessCameraProvider.getInstance(context).
- Select camera: CameraSelector.DEFAULT_BACK_CAMERA or FRONT_CAMERA.
- Bind to lifecycle: cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview, imageCapture).
- Unbind automatically on lifecycle stop — no manual cleanup needed.

## Configuration
- Preview: set target resolution or aspect ratio.
- ImageCapture: set capture mode (MINIMIZE_LATENCY vs MAXIMIZE_QUALITY).
- ImageAnalysis: set backpressure strategy (KEEP_ONLY_LATEST for real-time ML).
- Use ResolutionSelector for fine-grained resolution control.

## ML Kit Integration
- Use ImageAnalysis use case with ML Kit detectors.
- Convert ImageProxy to InputImage: InputImage.fromMediaImage(image, rotationDegrees).
- Process frame → draw results on overlay → close ImageProxy.
- Always close ImageProxy in the analysis callback — blocks next frame otherwise.
- Use KEEP_ONLY_LATEST strategy to avoid frame queue buildup.

## Best Practices
- Always check camera availability with hasSystemFeature(FEATURE_CAMERA_ANY).
- Handle camera permission denial — show explanation and degrade gracefully.
- Test on multiple devices — camera behavior varies significantly.
- Use PreviewView.ImplementationMode.PERFORMANCE for most use cases.
- Handle camera switching (front/back) by rebinding use cases.
