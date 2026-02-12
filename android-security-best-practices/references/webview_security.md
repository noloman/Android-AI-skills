# WebView Security

## File Access
- Call setAllowFileAccess(false) — prevents file:// URI loading.
- Call setAllowFileAccessFromFileURLs(false) (default false on API 30+).
- Call setAllowUniversalAccessFromFileURLs(false) (default false on API 30+).
- Call setAllowContentAccess(false) unless content:// URIs are needed.

## JavaScript
- Disable JavaScript unless required: settings.javaScriptEnabled = false.
- If JavaScript is required, minimize exposed @JavascriptInterface methods.
- Annotate only the exact methods needed — never expose internal APIs.
- Remove @JavascriptInterface on API < 17 (reflection-based attack surface).

## Navigation Control
- Override shouldOverrideUrlLoading() to validate navigation URLs.
- Block intent:// and file:// URIs in shouldOverrideUrlLoading().
- Whitelist allowed domains — reject navigation to unexpected hosts.
- Use WebViewClient.onReceivedSslError() to reject, not proceed, on SSL errors.

## Content Loading
- Prefer loadUrl() with HTTPS URLs over loadData()/loadDataWithBaseURL().
- If loading local HTML, use WebViewAssetLoader for safe asset serving.
- Set mixed content mode to MIXED_CONTENT_NEVER_ALLOW.
