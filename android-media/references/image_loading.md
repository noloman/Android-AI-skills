# Image Loading

## Coil (Compose-First)
- Coil is the recommended image loading library for Compose.
- AsyncImage(model = url, contentDescription = "desc") for basic loading.
- SubcomposeAsyncImage for custom loading/error composables.
- Coil uses OkHttp under the hood — shares cache and interceptors.
- Configure ImageLoader singleton for custom caching, headers, transformations.

## Glide (View-Based)
- Glide is mature and battle-tested — preferred for View-based UI.
- Glide.with(context).load(url).into(imageView) — basic loading.
- Use RequestOptions for placeholders, error images, transformations.
- Glide auto-cancels requests when lifecycle stops.
- Use @GlideModule for custom configuration.

## Caching
- Memory cache: LRU, fast, lost on process death.
- Disk cache: persistent across app restarts.
- Coil: configure with memoryCachePolicy and diskCachePolicy.
- Set disk cache size: diskCache { maxSizePercent(0.02) } (2% of available space).
- Preload images for known upcoming screens: imageLoader.enqueue(request).

## Transformations
- Circle crop: CircleCropTransformation (Coil) / circleCrop() (Glide).
- Rounded corners: RoundedCornersTransformation.
- Blur: BlurTransformation (use sparingly — expensive).
- Custom: implement Transformation interface.
- Chain multiple transformations in order.

## Best Practices
- Always set contentDescription for accessibility.
- Use placeholder and error images for better UX.
- Set crossfade for smooth image appearance.
- Use appropriate image sizes — don't load 4000px images for 100dp thumbnails.
- Use ContentScale.Crop or ContentScale.Fit appropriately.
- Cancel unnecessary requests — both libraries handle lifecycle automatically.

## Coil 3.x Changes
- Coil 3.x supports Compose Multiplatform (Android, iOS, Desktop, WASM).
- `ImageLoader` configuration simplified — `ImageLoaderFactory` interface on Application.
- `AsyncImage` API unchanged — but internal engine rewritten for performance.
- Disk cache moved to `coil3.disk.DiskCache` — configure in `ImageLoader.Builder`.
- KMP setup: `coil3-compose` for shared, `coil3-network-okhttp` for Android, `coil3-network-ktor` for KMP.

## Photo Picker (Android 13+)
- Use `ActivityResultContracts.PickVisualMedia()` — no READ_MEDIA_IMAGES permission needed.
- `PickVisualMedia.ImageOnly`, `PickVisualMedia.VideoOnly`, `PickVisualMedia.ImageAndVideo`.
- `PickMultipleVisualMedia(maxItems)` for multi-select.
- Falls back to document picker on older devices.
- Preferred over `READ_MEDIA_IMAGES` permission for most image selection use cases.

## Modern Image Formats
- **AVIF**: superior compression to WebP/JPEG, supported on API 34+.
- **HEIF/HEIC**: Apple-originated format, supported on API 26+ for decode.
- **WebP**: widely supported (API 14+ decode, API 30+ encode), good compression.
- Coil and Glide handle format detection automatically — serve optimal format from CDN.
- For user-generated content: accept HEIF, transcode to JPEG/WebP for upload if needed.
