# Navigation Testing

## TestNavHostController
- Use TestNavHostController for unit-testing navigation logic.
- Create in tests: TestNavHostController(context).apply { navigatorProvider.addNavigator(ComposeNavigator()) }.
- Set graph and verify navigation actions.

## Verify Destinations
- Assert current destination: navController.currentBackStackEntry?.destination?.route.
- Verify navigation happened after user action: assertEquals("profile/{id}", navController.currentDestination?.route).
- Test deep link resolution: navController.navigate(Uri.parse("https://example.com/profile/123")).

## Back Stack Testing
- Verify back stack depth after navigation sequences.
- Test popBackStack() returns to expected destination.
- Verify popUpTo with inclusive clears intermediate destinations.
- Test back behavior from nested navigation graphs.

## Argument Testing
- Verify navigation arguments are passed correctly.
- Test with valid, missing, and malformed arguments.
- Assert SavedStateHandle contains expected values in ViewModel.
- Test argument types: String, Int, Boolean, custom Serializable.

## Compose Navigation Testing
- Use createComposeRule with TestNavHostController injected.
- Verify correct composable renders for each route.
- Simulate user actions (click, back press) and verify destination changes.
- Test conditional navigation (auth gates, onboarding).

## Integration Testing
- Test full navigation flows end-to-end: launch → navigate → verify screen content.
- Test deep link → correct screen with correct data.
- Test process death during navigation — verify state restoration.
- Test navigation with system back button and gesture navigation.
