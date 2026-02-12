# Contributing

Thanks for contributing!

## Development

- Node >= 18
- Install: `npm install`
- Test: `npm test`

## Release process (maintainers)

This repo uses **semantic-release** on merges to `main`.

1. Ensure `NPM_TOKEN` secret is set in GitHub repo settings.
2. Use Conventional Commits:
   - feat: ...
   - fix: ...
   - chore: ...
   - docs: ...
3. Merge to main → GitHub Action publishes to npm and updates CHANGELOG.

## Adding a new skill

1. Create `<skill-name>/SKILL.md`
2. Add supporting docs under `<skill-name>/references/`
3. Update README skill matrix
