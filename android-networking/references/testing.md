# Testing Networking

## MockWebServer (OkHttp/Retrofit)
- Add `com.squareup.okhttp3:mockwebserver` as test dependency.
- Start server in `@Before`, shut down in `@After`.
- Enqueue responses: `server.enqueue(MockResponse().setBody(json).setResponseCode(200))`.
- Point Retrofit base URL to `server.url("/")`.
- Assert requests: `server.takeRequest()` — verify path, headers, body.

## Ktor MockEngine
- Use `ktor-client-mock` for testing Ktor HTTP interactions.
- Configure `MockEngine` with expected request/response pairs.
- Runs on JVM — fast, no network required.
```kotlin
val mockEngine = MockEngine { request ->
    respond(content = """{"name":"test"}""", headers = headersOf("Content-Type", "application/json"))
}
val client = HttpClient(mockEngine) { install(ContentNegotiation) { json() } }
```

## Testing Error Scenarios
- Test HTTP errors: 400 (bad request), 401 (unauthorized), 403 (forbidden), 404, 500.
- Test network failures: `MockResponse().setSocketPolicy(SocketPolicy.DISCONNECT_AT_START)`.
- Test timeouts: `MockResponse().setBodyDelay(10, TimeUnit.SECONDS)` with short client timeout.
- Test malformed responses: invalid JSON, empty body, wrong content type.

## Flow Testing with Turbine
- Test Flow-based API responses with Turbine: `flow.test { assertEquals(expected, awaitItem()) }`.
- Test loading → success sequences: `awaitItem()` for Loading, `awaitItem()` for Success.
- Test error propagation: `awaitError()` for Flow that throws.
- Use `runTest` from `kotlinx-coroutines-test` for coroutine-based tests.

## Best Practices
- Test repository layer, not raw HTTP client — repository transforms responses.
- Use test fixtures for JSON responses — avoid inline strings in tests.
- Test token refresh: enqueue 401 → enqueue new token → enqueue retry success.
- Test concurrent requests: verify thread safety in OkHttpClient/HttpClient singleton.
