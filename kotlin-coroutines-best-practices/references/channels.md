# Channels

- Hot communication primitive — elements are consumed once (not broadcast).
- Prefer Flow for most use cases — channels are lower-level.

## Channel Types
- Channel.UNLIMITED: unlimited buffer, sender never suspends.
- Channel.BUFFERED: default buffer size (64), sender suspends when full.
- Channel.RENDEZVOUS: zero buffer, sender suspends until receiver is ready.
- Channel.CONFLATED: buffer of 1, new values overwrite unread value.

## Patterns
- produce {} builder: returns ReceiveChannel, auto-closes on completion.
- Fan-out: multiple coroutines receiving from one channel (load balancing).
- Fan-in: multiple coroutines sending to one channel (aggregation).
- close() when done — signals no more elements.
- consumeEach {} for safe consumption with automatic cancellation.

## When to Use
- Prefer callbackFlow over raw Channel for bridging callback APIs.
- Use Channel for worker pool / fan-out patterns.
- Use Channel for single-consumer event queues when SharedFlow doesn't fit.
- Avoid Channel for state — use StateFlow instead.
