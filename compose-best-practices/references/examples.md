# Compose Examples

## LazyColumn with Stable Keys
```kotlin
LazyColumn {
    items(items, key = { it.id }) { item ->
        ItemRow(item)
    }
}
```

## Side Effects
```kotlin
// LaunchedEffect: runs when key changes
LaunchedEffect(userId) { viewModel.load(userId) }

// DisposableEffect: cleanup on leave
DisposableEffect(lifecycle) {
    val observer = LifecycleEventObserver { _, event -> /* ... */ }
    lifecycle.addObserver(observer)
    onDispose { lifecycle.removeObserver(observer) }
}

// rememberUpdatedState: capture latest value in long-running effect
val currentOnTimeout by rememberUpdatedState(onTimeout)
LaunchedEffect(Unit) {
    delay(5000)
    currentOnTimeout()
}
```

## State Hoisting
```kotlin
// Stateless composable — state hoisted to caller
@Composable
fun SearchBar(
    query: String,
    onQueryChange: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    TextField(value = query, onValueChange = onQueryChange, modifier = modifier)
}

// Stateful wrapper (optional convenience)
@Composable
fun SearchBar(modifier: Modifier = Modifier) {
    var query by rememberSaveable { mutableStateOf("") }
    SearchBar(query = query, onQueryChange = { query = it }, modifier = modifier)
}
```

## ViewModel Integration
```kotlin
@Composable
fun UserScreen(viewModel: UserViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (val state = uiState) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Success -> UserContent(state.user)
        is UiState.Error -> ErrorMessage(state.message, onRetry = viewModel::retry)
    }
}
```

## Derived State
```kotlin
// derivedStateOf: recompute only when dependency changes
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 5 }
}

// snapshotFlow: convert Compose state to Flow
LaunchedEffect(listState) {
    snapshotFlow { listState.firstVisibleItemIndex }
        .distinctUntilChanged()
        .collect { index -> analytics.logScroll(index) }
}
```
