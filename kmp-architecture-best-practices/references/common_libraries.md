# Common KMP Libraries

## Official Kotlin Libraries
- `kotlinx-coroutines` — async/concurrency, Flow, StateFlow, SharedFlow
- `kotlinx-serialization` — JSON/Protobuf/CBOR, `@Serializable` data classes
- `kotlinx-datetime` — replaces `java.time` in commonMain, `Instant`, `LocalDate`, `Clock`
- `kotlinx-io` — multiplatform I/O (replaces `java.io` usage)

## Networking
- **Ktor 3.x** — HTTP client with pluggable engines (OkHttp/Android, Darwin/iOS, CIO/JVM)
  - Use `ContentNegotiation` plugin with `kotlinx-serialization`
  - Configure per-platform engine in `expect`/`actual` or Koin
  - Ktor 3.x breaking changes: new plugin API, `HttpClientConfig` changes

## Database
- **SQLDelight** — type-safe SQL, generates Kotlin from `.sq` files, multiplatform drivers
- **Room** — KMP support added in Room 2.7+ (experimental), Android-first but expanding

## Key-Value Storage
- **Multiplatform Settings** (`russhwolf/multiplatform-settings`) — wraps SharedPreferences/NSUserDefaults
- **DataStore** — KMP support experimental, prefer Multiplatform Settings for now

## Image Loading
- **Coil 3.x** — Compose Multiplatform support (Android, iOS, Desktop, WASM)

## Dependency Injection
- **Koin** — native KMP support, `koin-core` in commonMain
- **kotlin-inject** — compile-time DI with KSP, KMP support via `kotlin-inject-ksp`

## Avoid in commonMain
- Any library that only publishes JVM artifacts
- Retrofit (use Ktor instead)
- Gson (use kotlinx-serialization)
- Dagger/Hilt (use Koin or kotlin-inject)
