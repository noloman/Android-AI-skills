# Audio Focus

## Requesting Focus
- Use AudioManager.requestAudioFocus(focusRequest) before playback.
- Build AudioFocusRequest with AudioAttributes and focus gain type.
- AUDIOFOCUS_GAIN: long-term playback (music, podcast).
- AUDIOFOCUS_GAIN_TRANSIENT: short playback (notification sound).
- AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK: short playback, others can duck (navigation).

## Handling Focus Changes
- Implement AudioManager.OnAudioFocusChangeListener.
- AUDIOFOCUS_LOSS: another app took focus permanently — stop and release.
- AUDIOFOCUS_LOSS_TRANSIENT: temporary loss — pause, resume when focus returns.
- AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK: reduce volume (duck), restore when focus returns.
- AUDIOFOCUS_GAIN: focus restored — resume playback or restore volume.

## Audio Becoming Noisy
- Register BroadcastReceiver for ACTION_AUDIO_BECOMING_NOISY.
- Triggered when headphones are disconnected.
- Pause playback to avoid unexpected speaker output.
- Only register while actively playing — unregister when paused/stopped.

## AudioAttributes
- Set usage: USAGE_MEDIA, USAGE_GAME, USAGE_NOTIFICATION, USAGE_VOICE_COMMUNICATION.
- Set content type: CONTENT_TYPE_MUSIC, CONTENT_TYPE_SPEECH, CONTENT_TYPE_MOVIE.
- AudioAttributes determine how the system treats your audio (volume, focus behavior).
- Pass same AudioAttributes to ExoPlayer/Media3 player and focus request.

## Best Practices
- Always request focus before playing — respect other apps.
- Always abandon focus when playback stops: abandonAudioFocusRequest().
- Duck volume (reduce by ~50%) for TRANSIENT_CAN_DUCK — don't pause.
- Test with multiple audio apps running simultaneously.
- Use MediaSession — it handles audio focus automatically for Media3.
