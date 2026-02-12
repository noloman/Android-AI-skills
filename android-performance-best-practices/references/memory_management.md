# Memory Management

## Leak Prevention
- Never hold static references to Activity, Fragment, View, or Context.
- Use ApplicationContext for singletons, dependency injection, and long-lived objects.
- Unregister listeners, callbacks, and observers in matching lifecycle methods.
- Cancel coroutines and dispose Rx subscriptions in onCleared() / onDestroy().
- Use WeakReference only as a last resort — prefer lifecycle-aware patterns.

## Common Leak Sources
- Inner classes holding implicit references to the outer Activity.
- Handler/Runnable posted with delayed messages surviving Activity destruction.
- Static Bitmap or Drawable caches holding Context references.
- Unregistered BroadcastReceivers or ContentObservers.
- Anonymous listeners in singleton objects.

## Detection
- Use LeakCanary in debug builds — auto-detects Activity, Fragment, ViewModel, and View leaks.
- Monitor with Android Profiler memory timeline.
- Use dumpsys meminfo for process-level memory breakdown.
- Track memory in CI with Macrobenchmark MemoryUsageMetric.

## Lifecycle-Aware Cleanup
- ViewModel.onCleared(): cancel scopes, close resources.
- Lifecycle.Event.ON_DESTROY: unregister observers.
- onTrimMemory(TRIM_MEMORY_UI_HIDDEN): release UI caches.
- onTrimMemory(TRIM_MEMORY_RUNNING_LOW): reduce non-critical caches.
