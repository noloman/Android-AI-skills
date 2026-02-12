# Material 2 to Material 3 Migration

## Pre-Migration Checklist
- Audit all `androidx.compose.material.*` imports — each one must be replaced.
- Identify custom theme overrides that need remapping.
- Check third-party libraries for M2 dependencies (some expose M2 composables).

## Import Replacement
- Remove all `androidx.compose.material.*` imports.
- Replace with `androidx.compose.material3.*` equivalents.
- Mixed M2/M3 imports = **BLOCKER** — never ship with both.

## API Mapping
| Material 2 | Material 3 |
|---|---|
| `MaterialTheme.colors` | `MaterialTheme.colorScheme` |
| `BottomNavigation` | `NavigationBar` |
| `BottomNavigationItem` | `NavigationBarItem` |
| `TopAppBar` (single) | `TopAppBar` / `CenterAlignedTopAppBar` |
| `Scaffold` (M2) | `Scaffold` (M3 — different params) |
| `Surface(color=)` | `Surface(color=)` (same API, M3 import) |
| `Card(elevation=)` | `Card(elevation = CardDefaults.cardElevation())` |

## Color System Changes
- M2: `primary`, `primaryVariant`, `secondary` → M3: `primary`, `primaryContainer`, `secondary`, `tertiary`.
- M3 adds tonal palette: `primaryContainer`, `onPrimaryContainer`, `secondaryContainer`, etc.
- Use Material Theme Builder (material-foundation) to generate M3 color schemes.

## Verification
- Run all `@Preview` composables to visually verify migration.
- Check dark theme separately — color mappings differ.
- Run screenshot tests before/after to catch regressions.
