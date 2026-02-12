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

## supervisorScope vs coroutineScope
- `coroutineScope { }`: child failure cancels ALL siblings and the scope itself.
- `supervisorScope { }`: child failure does NOT cancel siblings — each child is independent.
- Use `coroutineScope` when: all operations must succeed together (transaction-like).
- Use `supervisorScope` when: operations are independent (parallel API calls where partial results are OK).

### Examples
```kotlin
// coroutineScope: if fetchUser fails, fetchPosts is also cancelled
coroutineScope {
    val user = async { fetchUser(id) }
    val posts = async { fetchPosts(id) }
    UserWithPosts(user.await(), posts.await())
}

// supervisorScope: fetchPosts failure doesn't affect fetchUser
supervisorScope {
    val user = async { fetchUser(id) }
    val posts = async {
        try { fetchPosts(id) } catch (e: Exception) { emptyList() }
    }
    UserWithPosts(user.await(), posts.await())
}
```

- Key: with `supervisorScope`, you MUST handle exceptions in each child — unhandled exceptions still propagate to CoroutineExceptionHandler.
- `async` in `supervisorScope`: exception is deferred — thrown on `.await()`.
- `launch` in `supervisorScope`: exception delivered to CoroutineExceptionHandler.
