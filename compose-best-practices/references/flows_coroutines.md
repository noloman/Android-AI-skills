# Flows & Coroutines (Android Compose)

- UI state: StateFlow<UiState>
- Events: SharedFlow<UiEvent>
- Prefer stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), initial)
- Avoid SharingStarted.Eagerly
- Collect state lifecycle-aware (collectAsStateWithLifecycle when available)
- Collect events in LaunchedEffect(Unit)
- Never collect flows in composable body
- Keys must be stable primitives
