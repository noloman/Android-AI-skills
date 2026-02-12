# Coroutine Anti-Patterns

## Scope & Lifecycle
- GlobalScope: leaks coroutines — no structured cancellation. Use scoped coroutines.
- launch without a scope: fire-and-forget with no lifecycle management.
- Ignoring the Job returned by launch: cannot cancel or track completion.

## Cancellation
- Catching CancellationException: breaks cancellation propagation. If catching Exception, rethrow CancellationException.
- Infinite while(true) without isActive check: coroutine never cooperatively cancels.
- runBlocking in production Android code: blocks the calling thread, risk of ANR on Main.

## Threading
- Blocking calls on Dispatchers.Main: Thread.sleep, synchronous I/O, heavy computation — causes ANR.
- Hardcoded Dispatchers.Main in commonMain (KMP): Main is Android-specific, crashes on other platforms.

## Flows
- Collecting flows in composable body (outside LaunchedEffect): triggers new collection on every recomposition.
- SharingStarted.Eagerly without justification: wastes resources when no collectors are active.
- withContext inside flow {} builder: use flowOn instead.

## Error Handling
- Swallowing exceptions silently: catch {} with no logging or propagation hides bugs.
- CoroutineExceptionHandler on child coroutine: ignored — install on root scope only.
- runCatching on suspend functions without rethrowing CancellationException.

## Over-engineering
- Mutex when limitedParallelism(1) suffices.
- Raw Channel when SharedFlow or callbackFlow fits.
- Custom CoroutineScope when viewModelScope/lifecycleScope already matches lifecycle.

## Additional Anti-Patterns
- **`onEach { delay() }` as rate limiter**: delays every emission, including the first. Use `debounce` or `sample` instead.
- **Context leaking via lambda capture**: capturing `Activity` context in coroutine lambda → memory leak. Use `applicationContext` or `WeakReference`.
- **`runCatching` on suspend functions**: catches `CancellationException` silently. Use explicit try/catch and rethrow `CancellationException`:
```kotlin
// BAD
val result = runCatching { suspendFunction() }

// GOOD
val result = try {
    Result.success(suspendFunction())
} catch (e: CancellationException) {
    throw e
} catch (e: Exception) {
    Result.failure(e)
}
```
- **SharedFlow with replay in ViewModel**: replay(1) + onStart emit = duplicate first event. Use StateFlow for state, SharedFlow(replay=0) for events.
