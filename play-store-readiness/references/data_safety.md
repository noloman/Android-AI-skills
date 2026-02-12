# Data Safety

## Data Types & Purposes
- Declare all data types collected: location, contacts, personal identifiers, financial, health, etc.
- Declare the purpose for each type: app functionality, analytics, advertising, personalization.
- Distinguish between collected (sent off-device) and shared (transferred to third parties).
- Declare encryption at rest and in transit where applicable.

## SDK Audit
- Audit every third-party SDK for data collection — Firebase, analytics, ad networks, crash reporting.
- Check SDK documentation and privacy policies for declared data practices.
- Update Data Safety section whenever SDKs are added, removed, or updated.
- Use Play SDK Console for pre-vetted SDK data collection information.

## Data Deletion
- Provide a data deletion mechanism (in-app or web URL).
- Declare the data deletion URL in Play Console.
- Ensure deletion request actually removes data from all backends.
- Test the deletion flow before publishing.

## Compliance
- Data Safety must match actual behavior — mismatches cause policy violations.
- Review annually or whenever data practices change.
- Coordinate with backend and analytics teams for accurate declarations.
- Document data flows internally for audit readiness.
