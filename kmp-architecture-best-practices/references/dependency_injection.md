# Dependency Injection in KMP

## Koin (Recommended for KMP)
- Add `koin-core` to commonMain dependencies.
- Define modules in commonMain with platform-agnostic bindings.
- Platform modules provide `actual` implementations via `platformModule()`.

### Setup Pattern
```kotlin
// commonMain
val sharedModule = module {
    singleOf(::UserRepository)
    singleOf(::GetUserUseCase)
    factory { ApiClient(get()) }
}

expect fun platformModule(): Module

fun initKoin() = startKoin {
    modules(sharedModule, platformModule())
}

// androidMain
actual fun platformModule() = module {
    single<DatabaseDriver> { AndroidSqliteDriver(Database.Schema, get(), "app.db") }
    single<PlatformLogger> { AndroidLogger() }
}

// iosMain
actual fun platformModule() = module {
    single<DatabaseDriver> { NativeSqliteDriver(Database.Schema, "app.db") }
    single<PlatformLogger> { IOSLogger() }
}
```

## Manual DI (Lightweight Alternative)
- Create a `SharedDependencies` class in commonMain with lazy properties.
- Platform apps instantiate with platform-specific parameters.
- Suitable for smaller projects or when Koin overhead is unwanted.

## kotlin-inject
- Compile-time DI using KSP — type-safe, no reflection.
- Supports KMP via `kotlin-inject-ksp`.
- Better compile-time safety than Koin, but more boilerplate.

## Anti-Patterns
- Do NOT use Dagger/Hilt in commonMain — JVM-only.
- Do NOT use `object` singletons for dependencies — untestable.
- Do NOT initialize DI in platform-specific code and pass to commonMain — initialize in commonMain.
