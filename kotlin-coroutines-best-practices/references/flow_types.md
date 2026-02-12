# Flow Types

## Cold Flow
- flow {} builder: executes on each collector independently.
- Emissions are sequential within a single flow.
- Completes when the builder block finishes.
- Use for one-shot or on-demand data streams.

## StateFlow
- Hot flow — always has a current value (.value).
- Conflated: collectors always get the latest value, may skip intermediate.
- Requires initial value at creation.
- MutableStateFlow(initialValue) for read-write, expose as StateFlow for read-only.
- Equality-based deduplication: same value emitted twice is ignored.
- Use for UI state in ViewModels.

## SharedFlow
- Hot flow — event stream, no initial value required.
- Configurable replay (number of past values for new collectors) and extraBufferCapacity.
- MutableSharedFlow for read-write, expose as SharedFlow.
- replay = 0: new collectors miss past events (use for one-off events).
- Use for navigation events, snackbar triggers, analytics.

## Conversions
- stateIn(scope, started, initialValue): cold flow -> StateFlow.
- shareIn(scope, started, replay): cold flow -> SharedFlow.
- SharingStarted.WhileSubscribed(5_000): stops upstream 5s after last collector leaves — balance between freshness and resource savings.
- SharingStarted.Eagerly: starts immediately, never stops — use sparingly.
- SharingStarted.Lazily: starts on first collector, never stops.

## Special Builders
- callbackFlow {}: bridge callback APIs to Flow — use awaitClose {} for cleanup.
- channelFlow {}: concurrent emissions from multiple coroutines.
