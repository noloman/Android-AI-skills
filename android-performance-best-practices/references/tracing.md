# Performance Tracing

## Perfetto
- Perfetto is Android's system-level performance tracing tool.
- Captures: CPU scheduling, GPU rendering, memory allocation, I/O, app trace events.
- Start trace: `adb shell perfetto` or from Android Studio Profiler.
- View traces: https://ui.perfetto.dev/ (web-based trace viewer).
- Record from Studio: Profiler > CPU > System Trace.

## System Tracing
- System trace captures OS-level events: thread scheduling, binder calls, rendering pipeline.
- Identify: main thread jank, blocking I/O, lock contention, GC pauses.
- Enable in Developer Options > System Tracing for on-device recording.
- Trace duration: keep short (5-15 seconds) focused on specific interaction.

## Custom Trace Events
```kotlin
// Add custom trace sections to your code
import android.os.Trace

Trace.beginSection("parseJsonResponse")
val result = parseResponse(json)
Trace.endSection()

// Async trace for operations spanning threads
Trace.beginAsyncSection("networkRequest", requestId)
// ... async work ...
Trace.endAsyncSection("networkRequest", requestId)
```

## Macrobenchmark Tracing
- Macrobenchmark captures traces automatically during benchmark runs.
- Analyze: startup traces, scroll performance, animation frame times.
- `TraceSectionMetric("parseJsonResponse")` measures custom trace sections.
- Output includes: P50, P90, P99 frame times, TTID, TTFD.

## Compose-Specific Tracing
- Compose adds trace sections automatically: `Compose:recompose`, `Compose:layout`, `Compose:draw`.
- Identify recomposition bottlenecks in Perfetto trace.
- Look for: long `recompose` sections, many `layout` passes, expensive `draw` operations.
- Use `Modifier.graphicsLayer` to reduce `draw` overhead for animations.

## Best Practices
- Trace specific user journeys, not random app usage.
- Compare traces before and after optimization — quantify improvements.
- Use `Trace.beginSection`/`endSection` for custom events — zero overhead when tracing is off.
- Include trace analysis in PR reviews for performance-sensitive code.
- CI: run Macrobenchmark with tracing for automated regression detection.
