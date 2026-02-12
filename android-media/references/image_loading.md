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
