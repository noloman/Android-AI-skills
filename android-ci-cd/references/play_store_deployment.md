# Play Store Deployment

## Gradle Play Publisher
- Plugin: com.github.triplet.play — automates Play Store uploads.
- Configure: play { track.set("internal"); defaultToAppBundles.set(true) }.
- Tasks: publishBundle (upload AAB), publishListing (update metadata), promoteArtifact (promote track).
- Authenticate with service account JSON key from Google Cloud.
- Store service account key as CI secret — never commit.

## Service Account Setup
- Create service account in Google Cloud Console.
- Grant "Service Account User" role.
- In Play Console: invite service account email with "Release manager" permissions.
- Download JSON key — store as CI secret.
- Key has no expiry — rotate periodically for security.

## Deployment Strategy
- Internal track: every merge to main — continuous delivery.
- Closed testing: weekly or on-demand for QA team.
- Production: manual trigger or tag-based release.
- Staged rollout: start at 5-10%, monitor, expand to 100%.
- Use GitHub Releases or tags to trigger production deployment.

## Metadata Management
- Store release notes in fastlane/metadata/android/ or play/ directory.
- Per-locale directories: en-US/, es-ES/, etc.
- Files: title.txt, short_description.txt, full_description.txt, changelogs/*.txt.
- Automate metadata upload with publishListing task.
- Version changelog in changelogs/{versionCode}.txt.

## Rollback
- Play Console: halt rollout to stop distribution of current version.
- Re-promote previous version to resume old version distribution.
- Alternatively: upload a hotfix with incremented versionCode.
- Monitor Android Vitals during rollout — halt on crash rate regression.
- Have a documented rollback procedure before every release.
