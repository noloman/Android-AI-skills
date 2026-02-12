# Ktor for KMP

## Setup
- Use ktor-client-core in commonMain.
- Platform engines: ktor-client-okhttp (Android), ktor-client-darwin (iOS).
- Content negotiation: ktor-client-content-negotiation + ktor-serialization-kotlinx-json.
- Configure engine per platform with expect/actual or DI.

## Client Configuration
- Create HttpClient with engine and plugins in commonMain.
- Install ContentNegotiation plugin with Json serializer.
- Install Logging plugin for debug builds.
- Install Auth plugin for Bearer token handling.
- Set default request headers: defaultRequest { header("Accept", "application/json") }.

## Request Patterns
- Use suspend functions: client.get("https://api.example.com/users").body<List<User>>().
- Path parameters: client.get("users/$id").
- Query parameters: client.get("users") { parameter("page", 1) }.
- Request body: client.post("users") { contentType(ContentType.Application.Json); setBody(user) }.
- Form data: client.submitForm(parameters = Parameters.build { append("key", "value") }).

## Error Handling
- Catch ResponseException for non-2xx responses.
- Catch IOException for network failures.
- Use HttpResponseValidator in client config for global error handling.
- expectSuccess = true (default) throws on non-2xx — set false for manual handling.

## Testing
- Use ktor-client-mock for unit testing HTTP interactions.
- Configure MockEngine with expected responses.
- Test error scenarios: network failure, server errors, malformed responses.
- MockEngine runs on JVM — fast, no network required.
