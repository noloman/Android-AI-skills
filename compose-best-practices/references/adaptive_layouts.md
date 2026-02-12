# Material3 Adaptive Layouts

## Overview
- Material3 Adaptive library provides responsive layouts for phones, tablets, foldables, and desktop.
- Automatically adapts UI based on window size classes: Compact, Medium, Expanded.
- Use `androidx.compose.material3.adaptive` dependencies.

## NavigationSuiteScaffold
- Automatically switches between: bottom navigation (compact), navigation rail (medium), navigation drawer (expanded).
- Replace manual navigation component switching with single `NavigationSuiteScaffold`.
- Handles window size class detection automatically.
```kotlin
NavigationSuiteScaffold(
    navigationSuiteItems = {
        items.forEach { item ->
            item(selected = currentRoute == item.route, onClick = { navigate(item.route) },
                 icon = { Icon(item.icon, null) }, label = { Text(item.label) })
        }
    }
) { content() }
```

## ListDetailPaneScaffold
- Two-pane layout: list on one side, detail on the other (tablets/foldables).
- Falls back to single-pane navigation on compact screens.
- Handles back navigation between panes automatically.
- Use `rememberListDetailPaneScaffoldNavigator()` for pane state management.

## Window Size Classes
- `WindowWidthSizeClass.Compact`: < 600dp (phones portrait).
- `WindowWidthSizeClass.Medium`: 600dp-840dp (tablets portrait, foldables).
- `WindowWidthSizeClass.Expanded`: > 840dp (tablets landscape, desktop).
- Compute: `calculateWindowSizeClass(activity)`.

## Best Practices
- Design for Compact first, then enhance for larger screens.
- Test on foldables — fold state changes window size class dynamically.
- Use `WindowInsets` for edge-to-edge support across form factors.
- Do NOT use fixed breakpoints — use window size classes.
- Test both portrait and landscape on tablets.
