# Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

When your PR includes user-facing changes to publishable packages, add a changeset:

```bash
pnpm changeset
```

Commit the generated file under `.changeset/`. After merge to `main`, the release workflow opens a version PR (or publishes if versions were already bumped).
