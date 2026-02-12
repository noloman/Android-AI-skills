# Predictive Back Gesture

## Overview
- Predictive back shows a preview animation before completing the back navigation.
- Mandatory to support on API 34+ — opt in via `android:enableOnBackInvokedCallback="true"` in manifest.
- System provides default animations: back-to-home, cross-activity, cross-task.

## OnBackPressedCallback
- Register callbacks with `OnBackPressedDispatcher` — do NOT override `onBackPressed()`.
- Callbacks receive `handleOnBackStarted()`, `handleOnBackProgressed()`, `handleOnBackCancelled()`, `handleOnBackPressed()`.
- Use `handleOnBackProgressed(backEvent)` for custom predictive animations.
- Enable/disable callback dynamically based on state (e.g., only intercept when form is dirty).

## AndroidX Activity 1.8+
- `ComponentActivity` provides `onBackPressedDispatcher` — use this for back handling.
- `rememberUpdatedState` in Compose to safely capture current state in callbacks.
- Fragment: use `requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner, callback)`.

## Navigation Compose Integration
- Navigation Compose handles back automatically — do NOT add custom back handling for simple pop.
- Custom back handling only for: unsaved changes dialogs, multi-step wizards, bottom sheet dismissal.
- Material3 `BackHandler` composable wraps `OnBackPressedCallback` for Compose.

## Testing
- Enable predictive back in Developer Options > "Predictive back animations" on API 33+ devices.
- Test all back navigation paths: hardware back, gesture back, predictive back animation.
- Verify custom animations respond to back progress (0.0 to 1.0).

## Migration
- Replace `Activity.onBackPressed()` override → `OnBackPressedCallback`.
- Replace `Fragment.onBackPressed()` workarounds → callback on dispatcher.
- Replace `KeyEvent.KEYCODE_BACK` handling → `OnBackPressedCallback`.
