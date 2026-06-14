# Changesets

This monorepo uses [@changesets/cli](https://github.com/changesets/changesets) to manage versions and changelogs.

## Adding a changeset

Always generate changeset files with the CLI — do not write them by hand:

```bash
pnpm changeset
```

The CLI will prompt you to:

1. **Select a package** — pick `@arvia-ui/react` or `@arvia-ui/core-styles` (either is fine; both are in a `fixed` group and bump together)
2. **Select a bump type** — `major`, `minor`, or `patch`
3. **Write a summary** — becomes the changelog entry

It writes a new file under `.changeset/`. Commit that file with your PR.

Do **not** run `pnpm version` or edit `package.json` versions in feature PRs — CI opens a Version Packages PR after merge.

## After merge to `main`

The [release workflow](../.github/workflows/release.yml) either opens a **Version Packages** PR (`chore: version packages`) or publishes to npm.

See [PUBLISHING.md](../PUBLISHING.md) for the full release loop.
