# Testing Background Work

## WorkManagerTestInitHelper
- Use `WorkManagerTestInitHelper` for testing WorkManager in instrumented tests.
- Initialize: `WorkManagerTestInitHelper.initializeTestWorkManager(context)`.
- Must be called before any WorkManager usage in tests.
- Provides synchronous execution for deterministic testing.

## TestListenableWorkerBuilder
- Unit test workers without WorkManager infrastructure.
- `TestListenableWorkerBuilder<MyWorker>(context).setInputData(data).build()`.
- Call `worker.doWork()` directly — returns `Result`.
- Test all result types: `Result.success()`, `Result.retry()`, `Result.failure()`.

## TestWorkerBuilder
- For testing `Worker` subclasses (not `CoroutineWorker`).
- Similar API to `TestListenableWorkerBuilder`.
- Runs synchronously — no need for coroutine test utilities.

## Testing Patterns
```kotlin
@Test
fun worker_withValidInput_succeeds() = runTest {
    val worker = TestListenableWorkerBuilder<SyncWorker>(context)
        .setInputData(workDataOf("userId" to "123"))
        .build()
    val result = worker.doWork()
    assertThat(result).isEqualTo(ListenableWorker.Result.success())
}
```

## Testing Constraints
- Use `TestDriver` to simulate constraint satisfaction.
- `testDriver.setAllConstraintsMet(workId)` — triggers constrained work.
- `testDriver.setPeriodDelayMet(workId)` — triggers periodic work.
- `testDriver.setInitialDelayMet(workId)` — triggers delayed work.

## Best Practices
- Test worker logic separately from WorkManager scheduling.
- Mock dependencies (repositories, APIs) injected into workers.
- Test failure and retry scenarios — verify backoff behavior.
- Test work chains: verify output data flows between workers.
- Use `WorkInfo.State` assertions for integration tests.
