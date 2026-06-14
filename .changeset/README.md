# Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

## Feature PRs

When your PR includes user-facing changes to publishable packages, add a changeset:

```bash
pnpm changeset
```

Commit the generated file under `.changeset/`. Do **not** run `pnpm version` or bump `package.json` versions in the feature PR — CI handles that after merge.

## After merge to `main`

The [release workflow](../.github/workflows/release.yml) does one of two things:

1. **Pending changesets exist** — opens or updates a **Version Packages** PR (`chore: version packages`) that bumps versions, updates changelogs, and consumes changeset files.
2. **No pending changesets** (Version PR already merged) — publishes to npm via `pnpm release`.

See [PUBLISHING.md](../PUBLISHING.md) for npm org setup, secrets, and the full release loop.
