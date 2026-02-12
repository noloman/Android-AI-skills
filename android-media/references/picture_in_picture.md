# Picture-in-Picture

## Setup
- Declare in manifest: android:supportsPictureInPicture="true" on the Activity.
- Set android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation".
- Available on API 26+ (Android 8.0 Oreo).
- Only use for video playback — not for general UI.

## Entering PiP
- Call enterPictureInPictureMode(PictureInPictureParams) from the Activity.
- Build params: PictureInPictureParams.Builder().setAspectRatio(rational).build().
- Set aspect ratio: Rational(16, 9) for landscape video, Rational(9, 16) for portrait.
- Auto PiP (API 31+): setAutoEnterEnabled(true) — enters PiP on home button press.
- Set seamless resize hint: setSeamlessResizeEnabled(true) for smooth transition.

## PiP Actions
- Add remote actions: setActions(listOf(RemoteAction(icon, title, description, pendingIntent))).
- Common actions: play/pause, skip next, skip previous, close.
- Maximum 3 actions visible in PiP window.
- Update actions dynamically: setPictureInPictureParams() to refresh.
- Handle action PendingIntents in onReceive or onStartCommand.

## Lifecycle Handling
- onPictureInPictureModeChanged(isInPiP, config) — callback when mode changes.
- In PiP: hide non-essential UI (controls, text), show only video.
- Pause non-video updates: don't animate or update text in PiP.
- Check isInPictureInPictureMode before updating UI.

## Best Practices
- Only enter PiP when the user has active video content.
- Pause playback if the user closes PiP (onStop).
- Set source rect hint for smooth animation: setSourceRectHint(videoViewBounds).
- Test PiP on different screen sizes and orientations.
- Disable PiP entry when there's no video to show.
