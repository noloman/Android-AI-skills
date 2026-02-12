# Flow Operators

## Transform
- map { } — transform each element.
- filter { } — keep elements matching predicate.
- mapNotNull { } — map + filter nulls in one step.
- transform { } — emit zero or more values per upstream element.

## Flattening
- flatMapLatest { } — cancel previous inner flow when new value arrives (use for search-as-you-type).
- flatMapConcat { } — process inner flows sequentially.
- flatMapMerge { } — process inner flows concurrently (configurable concurrency).

## Combining
- combine(flow1, flow2) { a, b -> } — emit on any change, using latest from each.
- zip(flow1, flow2) { a, b -> } — 1:1 pairing, completes when either flow completes.
- merge(flow1, flow2) — interleave emissions from multiple flows.

## Rate Limiting
- debounce(timeoutMillis) — emit after silence period (search input).
- sample(periodMillis) — emit latest value at fixed intervals.
- distinctUntilChanged() — skip consecutive duplicates.

## Buffering
- buffer() — run collector and emitter concurrently (back-pressure relief).
- conflate() — skip intermediate values when collector is slow.
- buffer(Channel.CONFLATED) — equivalent to conflate().

## Error Handling
- catch { } — catch upstream exceptions, can emit fallback values.
- retryWhen { cause, attempt -> } — retry upstream on transient failures.
- onCompletion { cause -> } — runs after flow completes (success or failure).

## Side Effects
- onEach { } — perform action on each element without transforming.
- onStart { } — runs before first element is emitted.
- onCompletion { } — runs after terminal event.

## Context
- flowOn(dispatcher) — change upstream dispatcher. Does NOT affect downstream.
- Never use withContext inside flow {} builder — use flowOn instead.

## Timeout
- `withTimeout(timeMillis) { }` — throws `TimeoutCancellationException` if block exceeds time.
- `withTimeoutOrNull(timeMillis) { }` — returns null instead of throwing on timeout.
- Use in Flow: `flow.timeout(duration)` (kotlinx-coroutines 1.7+) — cancels flow if no emission within duration.
- Common use: API call timeouts, user interaction deadlines, polling with expiry.
- `withTimeoutOrNull` is preferred when timeout is an expected case, not an error.
