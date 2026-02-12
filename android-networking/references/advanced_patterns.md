# Advanced Networking Patterns

## WebSocket (OkHttp)
- Create WebSocket: `client.newWebSocket(request, listener)`.
- Implement `WebSocketListener`: `onOpen`, `onMessage`, `onClosing`, `onFailure`.
- Send messages: `webSocket.send(text)` or `webSocket.send(bytes)`.
- Handle reconnection: implement exponential backoff on `onFailure`.
- Close cleanly: `webSocket.close(1000, "Normal closure")`.

## WebSocket (Ktor)
- Use `client.webSocket(urlString)` coroutine-based API.
- Send: `send(Frame.Text(message))` inside the session.
- Receive: `for (frame in incoming) { /* process */ }` — suspending loop.
- Session scope: WebSocket connection lives for the duration of the lambda.

## Server-Sent Events (SSE)
- Use for server-push with HTTP: streaming LLM responses, live feeds, notifications.
- OkHttp: manual SSE parsing with streaming response body.
- Ktor: use `client.prepareGet(url).execute { response -> response.bodyAsChannel() }`.
- Parse `data:`, `event:`, `id:`, `retry:` fields per SSE spec.
- Reconnect with `Last-Event-ID` header for resumption.

## Request Deduplication
- Multiple UI components may request the same data simultaneously.
- Use `MutableStateFlow<Map<Key, Deferred<Result>>>` to deduplicate in-flight requests.
- Check for existing in-flight request before launching new one.
- Clean up completed entries to prevent memory leaks.

## Offline Queue with WorkManager
- Queue failed network requests for retry when connectivity returns.
- Store request data (URL, method, body) in Room or DataStore.
- Use `WorkManager` with `NetworkType.CONNECTED` constraint.
- Process queue in order — maintain request sequencing.
- Handle conflicts: last-write-wins or merge strategy based on domain logic.

## Retry with Exponential Backoff
- Base delay: 1 second, multiplied by 2 on each retry.
- Add jitter: `delay * (1 + random(0.0, 0.3))` to prevent thundering herd.
- Max retries: 3-5 for user-facing requests.
- Only retry on: 5xx errors, network failures, timeouts. Never retry: 4xx errors.
