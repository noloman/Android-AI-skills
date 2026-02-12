# Media3 Playback

## Setup
- Use androidx.media3:media3-exoplayer for playback engine.
- Use androidx.media3:media3-ui for PlayerView (View) or media3-ui-compose for Compose.
- Use media3-session for MediaSession integration (background playback, media controls).
- All ExoPlayer classes are now in the media3 namespace.

## Player Creation
- ExoPlayer.Builder(context).build() for basic player.
- Set MediaItem: player.setMediaItem(MediaItem.fromUri(url)).
- Prepare and play: player.prepare(); player.play().
- Handle multiple items: player.setMediaItems(listOf(item1, item2)).
- Release player when done: player.release() — in onStop or onDestroy.

## State Handling
- Listen to Player.Listener for state changes.
- States: STATE_IDLE, STATE_BUFFERING, STATE_READY, STATE_ENDED.
- Handle errors: onPlayerError(PlaybackException) — show user-friendly message.
- Map player state to UI state: loading spinner, play/pause button, error screen.
- Save playback position for resume: player.currentPosition.

## Background Playback
- Use MediaSessionService for playback that continues in background.
- MediaSession connects player to system media controls (notification, lock screen).
- Implement MediaSession.Callback for playback commands.
- System shows media notification automatically when MediaSession is active.
- Handle audio becoming noisy: pause on headphone disconnect.

## Caching
- Use SimpleCache with CacheDataSource.Factory for stream caching.
- Set max cache size: SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(maxBytes)).
- Cache key based on URI — same content reuses cache.
- Use for: music streaming, podcast episodes, video on demand.

## Adaptive Streaming
- Support HLS and DASH: media3-exoplayer-hls, media3-exoplayer-dash.
- Player auto-selects quality based on bandwidth.
- Use TrackSelectionParameters to constrain resolution/bitrate.
- Prefer adaptive streaming for long-form content.
