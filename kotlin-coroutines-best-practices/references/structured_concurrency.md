# Structured Concurrency

- Every coroutine must have a parent scope — no orphan launches.
- CoroutineScope ties coroutine lifetime to a component (ViewModel, Activity, Service).
- Parent cancellation cascades to all children automatically.
- Child failure cancels siblings and parent (default Job behavior).
- SupervisorJob: child failure does NOT cancel siblings or parent.
- coroutineScope {} — creates child scope, waits for all children, propagates failure.
- supervisorScope {} — creates child scope, waits for all children, isolates failures.
- viewModelScope: auto-cancelled on ViewModel.onCleared().
- lifecycleScope: auto-cancelled on Lifecycle.DESTROYED.
- Custom scopes: create with CoroutineScope(SupervisorJob() + dispatcher), cancel explicitly.

## Cooperative Cancellation
- Check isActive in CPU-bound loops.
- Use ensureActive() for an automatic check + throw.
- yield() checks cancellation and yields to other coroutines.
- Never catch CancellationException — breaks cancellation propagation.
- If you must catch Exception, rethrow CancellationException.
