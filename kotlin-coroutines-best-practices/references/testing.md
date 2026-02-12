# Testing Coroutines

## Core Setup
- Use runTest {} (replaces deprecated runBlockingTest).
- runTest auto-advances virtual time for delay-based code.
- Inject TestDispatcher into classes under test.

## Test Dispatchers
- StandardTestDispatcher: does not auto-dispatch — control time with advanceTimeBy(), advanceUntilIdle().
- UnconfinedTestDispatcher: eager dispatch — coroutines run immediately.
- Use StandardTestDispatcher for precise timing tests.
- Use UnconfinedTestDispatcher when timing doesn't matter.

## Testing StateFlow
- Assert against .value directly after triggering actions.
- Use advanceUntilIdle() to flush pending coroutines.
- Set Dispatchers.Main via Dispatchers.setMain(testDispatcher) in @Before.
- Reset via Dispatchers.resetMain() in @After.

## Testing SharedFlow / Events
- Use Turbine library: flow.test { awaitItem(), expectNoEvents(), cancelAndIgnoreRemainingEvents() }.
- Turbine provides timeout-based assertions — no manual job juggling.
- awaitItem() suspends until next emission.
- expectNoEvents() asserts no emissions within timeout.

## Testing Cancellation
- Launch in a separate job, cancel it, verify cleanup ran.
- Use advanceTimeBy() to simulate timeout-based cancellation.
