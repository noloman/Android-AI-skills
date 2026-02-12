# Error Handling

## Suspend Functions
- Use try-catch inside suspend functions for recoverable errors.
- Return Result<T> or sealed class for expected failures (network, parsing).
- runCatching {} wraps in Result<T> — but catches CancellationException; re-throw it.

## Coroutine Scopes
- CoroutineExceptionHandler: install on root scope only (launch, not async).
- Child exceptions propagate to parent — handler on child is ignored.
- supervisorScope: isolates child failures — one child crash doesn't cancel siblings.
- Use supervisorScope when launching independent parallel work.

## Flows
- catch {} operator: catches upstream errors only.
- Place catch before terminal operators (collect, stateIn).
- Use onCompletion {} to detect both success and failure.
- retryWhen { cause, attempt -> } for transient failures with backoff.
- Exponential backoff: delay(minOf(2.0.pow(attempt).toLong() * 1000, 30_000)).

## Anti-patterns
- Never swallow exceptions silently — at minimum log them.
- Never catch CancellationException — breaks structured concurrency.
- Don't use CoroutineExceptionHandler as a substitute for proper error handling.
- Avoid runCatching on suspend functions without re-throwing CancellationException.
