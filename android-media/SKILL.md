
---
name: android-media
description: Android media — Media3/ExoPlayer, CameraX, image loading, audio focus, PiP.
---

# Android Media

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Media3 (androidx.media3) — ExoPlayer is now part of Media3.
- Use CameraX for camera features — not deprecated Camera or Camera2 directly.
- Use Coil (Compose-first) or Glide for image loading — not manual bitmap management.
- Request and manage audio focus before playback — respect other apps.
- Release media resources (player, camera) when the lifecycle component stops.
- Handle audio becoming noisy (headphone disconnect) — pause playback.
- Use MediaSession for background playback — required for media notification controls.
- Never decode large bitmaps on the main thread — use image loading libraries.
- Request camera/microphone permissions before accessing hardware.
- Support Picture-in-Picture only for video playback activities.

## Core Patterns
- Bind Media3 player to lifecycle with LifecycleOwner-aware setup.
- Use CameraX with lifecycle binding — CameraProvider.bindToLifecycle().
- Configure Coil with disk cache, memory cache, and crossfade for smooth UX.
- Implement MediaSessionService for background audio playback.
- Use ExoPlayer caching (SimpleCache) for streaming content.
- Handle all player states: idle, buffering, ready, ended, error.

## References
- references/media3_playback.md
- references/camerax.md
- references/image_loading.md
- references/audio_focus.md
- references/picture_in_picture.md
