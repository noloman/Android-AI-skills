# Firestore

## Data Model
- Documents: JSON-like objects, max 1 MB.
- Collections: groups of documents, can contain subcollections.
- Document IDs: auto-generated or custom — use meaningful IDs when possible.
- Denormalize for read performance — duplicate data across collections if needed.
- Avoid deeply nested subcollections — prefer flat structure for flexibility.

## Queries
- Use where(), orderBy(), limit() for filtered queries.
- Compound queries require composite indexes — Firestore logs index creation URLs.
- Paginate with startAfter(lastDocument) — not offset-based.
- Use snapshots (addSnapshotListener) for real-time updates.
- Use get() for one-time reads when real-time isn't needed.

## Offline Support
- Firestore enables offline persistence by default on Android.
- Reads return cached data when offline — writes queue and sync when online.
- Set cache size: FirebaseFirestoreSettings.Builder().setCacheSizeBytes().
- Use source parameter: Source.CACHE, Source.SERVER, Source.DEFAULT.
- Handle pending writes indicator: metadata.hasPendingWrites().

## Security Rules
- Default deny — no access without explicit rules.
- Match paths: match /users/{userId} { allow read, write: if request.auth.uid == userId; }
- Validate data in rules: request.resource.data.field is string.
- Test rules with Firebase Emulator before deploying.
- Never use allow read, write: if true in production.

## Performance
- Batch writes: writeBatch() for atomic multi-document updates (max 500 operations).
- Use transactions for read-then-write operations.
- Avoid reading entire collections — always filter and limit.
- Use field masks (get with FieldPath) to read only needed fields.
- Monitor Firestore usage in Firebase Console — watch for unexpected reads.

## Aggregation Queries
- Count queries: `collection.count()` — returns document count without reading all documents.
- Sum queries: `collection.aggregate(AggregateField.sum("field"))` — server-side sum.
- Average queries: `collection.aggregate(AggregateField.average("field"))` — server-side average.
- Aggregations are billed at 1 read per query — much cheaper than reading all documents.
- Use for dashboards, analytics, and counters instead of client-side aggregation.

## Firestore Bundles
- Pre-package query results as static bundles for CDN distribution.
- Bundles load into local cache — instant reads without network round-trip.
- Use for: common queries, onboarding data, rarely-changing reference data.
- Generate bundles server-side with Firebase Admin SDK.
- Load with `loadBundle(bundleStream)` on the client.
