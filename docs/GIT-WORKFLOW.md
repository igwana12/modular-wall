# mosAIc Git Workflow

**Repository**: [igwana12/modular-wall](https://github.com/igwana12/modular-wall)

---

## Branch Strategy

### Protected Branches

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code | Require PR + 1 review, no force push |
| `develop` | Integration branch | Require PR, CI must pass |

### Working Branches

| Pattern | Purpose | Example |
|---------|---------|---------|
| `feature/<ticket>-<slug>` | New features | `feature/SACA-96-wall-controller-setup` |
| `fix/<ticket>-<slug>` | Bug fixes | `fix/SACA-112-module-reconnect` |
| `chore/<slug>` | Tooling / config / docs | `chore/update-dependencies` |
| `docs/<slug>` | Documentation only | `docs/api-spec-update` |

---

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]

[optional footer: Co-Authored-By, Closes, etc.]
```

### Types

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Build, tooling, dependencies |
| `refactor` | Code change with no behavior change |
| `test` | Add or update tests |
| `perf` | Performance improvement |

### Examples

```bash
feat(wall-controller): add health endpoint with uptime tracking

fix(modules): handle module reconnect after timeout

docs(api): update WALL-CONTROLLER-API.md with WebSocket spec

chore(deps): bump fastapi to 0.115.0
```

### AI Agent Commits

When an AI agent makes a commit, it MUST include the co-author trailer:

```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```

---

## Pull Request Process

1. **Branch from `develop`** (or `main` for hotfixes)
2. **Link the ticket** — include `Closes SACA-XX` in the PR description
3. **Write a clear description** — what changed and why
4. **Pass CI** — tests must be green before review
5. **Request review** — minimum 1 approval required for `main`
6. **Squash merge** into `develop`; rebase merge into `main`

### PR Template

```markdown
## Summary
Brief description of what this PR does.

## Ticket
Closes SACA-XX

## Changes
- List of key changes

## Test Plan
- [ ] Tests added/updated
- [ ] Tested locally
- [ ] No breaking changes (or migration notes provided)
```

---

## Branch Protection Rules (GitHub)

Configure on GitHub → Settings → Branches:

### `main`
- Require a pull request before merging
- Require 1 approving review
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass (CI)
- Require branches to be up to date before merging
- Do not allow force pushes
- Do not allow deletions

### `develop`
- Require a pull request before merging
- Require status checks to pass (CI)
- Do not allow force pushes

---

## Release Workflow

1. Merge `develop` → `main` via PR
2. Tag the release: `git tag v0.1.0 -m "Wall Controller v0.1.0"`
3. Push tag: `git push origin v0.1.0`
4. GitHub Actions publishes release notes automatically (future)

---

## Quick Reference

```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/SACA-XX-my-feature

# Work, commit, push
git add <files>
git commit -m "feat(scope): description"
git push -u origin feature/SACA-XX-my-feature

# Open a PR on GitHub targeting develop
```

---

*Updated: 2026-04-08*
