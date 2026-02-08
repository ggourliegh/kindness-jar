# Git Rollback & Version Control Guide

## Overview
This guide covers how to safely rollback changes, undo commits, and manage version control in the Be Kind project.

---

## Understanding Git States

### Working Directory
- Uncommitted changes
- Files you're currently editing

### Staging Area (Index)
- Changes marked for next commit
- `git add` places files here

### Repository (HEAD)
- Committed changes
- Local history

### Remote (origin)
- Pushed commits
- Shared with team/backup

---

## Undoing Changes

### 1. Discard Uncommitted Changes

**Discard changes to a specific file:**
```bash
git checkout -- filename.js
```

**Discard all uncommitted changes:**
```bash
git checkout -- .
```

**Or using restore (Git 2.23+):**
```bash
git restore filename.js        # Single file
git restore .                  # All files
```

**⚠️ Warning**: This permanently deletes uncommitted changes!

---

### 2. Unstage Files

**Remove file from staging (keep changes):**
```bash
git reset HEAD filename.js
```

**Or using restore:**
```bash
git restore --staged filename.js
```

**Unstage all files:**
```bash
git reset HEAD
```

---

### 3. Undo Last Commit (Keep Changes)

**Keep changes in working directory:**
```bash
git reset --soft HEAD~1
```

**Keep changes but unstaged:**
```bash
git reset HEAD~1
# or
git reset --mixed HEAD~1
```

---

### 4. Undo Last Commit (Discard Changes)

**⚠️ Danger**: Permanently deletes the commit and changes:
```bash
git reset --hard HEAD~1
```

**Safer alternative - Create reverse commit:**
```bash
git revert HEAD
```

---

## Rolling Back to Specific Commit

### View Commit History
```bash
# See commit history
git log --oneline -10

# See detailed history
git log --graph --all --decorate
```

### Rollback Options

**Option 1: Reset to Specific Commit (Local Only)**
```bash
# Find the commit hash
git log --oneline

# Reset to that commit (keeps changes)
git reset abc1234

# Reset to that commit (discards changes)
git reset --hard abc1234
```

**⚠️ Never use `--hard` if commit was pushed!**

**Option 2: Revert Specific Commit (Safe for Pushed Commits)**
```bash
# Creates new commit that undoes changes
git revert abc1234

# Revert multiple commits
git revert abc1234..def5678
```

---

## Recovering from Mistakes

### Recover Deleted Commits (Reflog)

```bash
# View reflog (local history)
git reflog

# Find the commit you want to restore
# Restore it
git reset --hard HEAD@{2}
```

**Reflog is your safety net!** It keeps 90 days of history.

---

### Recover Deleted Files

**File deleted but not committed:**
```bash
git checkout -- filename.js
```

**File deleted and committed:**
```bash
# Find commit before deletion
git log -- filename.js

# Restore from that commit
git checkout abc1234 -- filename.js
```

---

## Branch Management

### Create and Switch Branches

```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch (shortcut)
git checkout -b feature-name

# Or using switch (Git 2.23+)
git switch -c feature-name
```

### Rollback Branch to Match Remote

```bash
# Discard all local changes and match remote
git fetch origin
git reset --hard origin/main
```

---

## Dangerous Operations (Use with Caution)

### Force Push
**⚠️ Only use on your own branches!**

```bash
# After local reset, force push
git push --force origin feature-branch
```

**Never force push to main/master!**

**Safer alternative:**
```bash
git push --force-with-lease origin feature-branch
```

---

### Clean Working Directory

```bash
# See what would be deleted
git clean -n

# Delete untracked files
git clean -f

# Delete untracked files and directories
git clean -fd
```

---

## Common Scenarios

### Scenario 1: Wrong Commit Message

```bash
# Amend last commit message
git commit --amend -m "New message"

# If already pushed (creates new commit)
git revert HEAD
git commit -m "Correct message"
```

---

### Scenario 2: Committed to Wrong Branch

```bash
# On wrong-branch
git log --oneline -1  # Note the commit hash

# Switch to correct branch
git checkout correct-branch

# Cherry-pick the commit
git cherry-pick abc1234

# Go back and remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

---

### Scenario 3: Need to Undo Multiple Commits

```bash
# Reset to commit before the mistakes
git reset --hard abc1234

# Or revert them one by one
git revert --no-commit def5678
git revert --no-commit abc1234
git commit -m "Reverted multiple commits"
```

---

### Scenario 4: Accidentally Deleted Branch

```bash
# Find the commit
git reflog

# Recreate branch
git branch recovered-branch abc1234
```

---

### Scenario 5: Merge Conflict During Rollback

```bash
# Abort the revert
git revert --abort

# Or abort the merge
git merge --abort

# Start fresh
git status
```

---

## Best Practices

### DO's ✅
- **Commit frequently** with meaningful messages
- **Pull before push** to avoid conflicts
- **Use branches** for features/experiments
- **Test before merge** to main branch
- **Review changes** before committing (`git diff`)
- **Use revert** for published commits
- **Create backups** before risky operations

### DON'Ts ❌
- **Don't force push** to main/master
- **Don't reset** published commits
- **Don't amend** pushed commits
- **Don't commit secrets** (API keys, passwords)
- **Don't work directly** on main branch
- **Don't panic** - reflog can save you!

---

## Safety Checklist

Before any destructive operation:

- [ ] Is the commit pushed? (Use revert instead of reset)
- [ ] Do I have a backup? (See [Backup Guide](github_backup_guide.md))
- [ ] Have I checked the reflog?
- [ ] Am I on the correct branch?
- [ ] Do I understand what this command does?
- [ ] Have I tried a safer alternative?

---

## Quick Reference

| Task | Command |
|------|---------|
| Discard file changes | `git checkout -- file.js` |
| Unstage file | `git restore --staged file.js` |
| Undo last commit (keep changes) | `git reset HEAD~1` |
| Undo last commit (discard) | `git reset --hard HEAD~1` |
| Revert commit safely | `git revert abc1234` |
| View history | `git log --oneline` |
| View reflog | `git reflog` |
| Recover deleted commit | `git reset --hard HEAD@{2}` |
| Match remote exactly | `git reset --hard origin/main` |

---

## Getting Help

```bash
# Get help for any command
git help reset
git help revert
git help reflog

# Or use --help flag
git reset --help
```

---

## Related Documentation
- [GitHub Backup Guide](github_backup_guide.md)
- [Implementation Plan](../planning/implementation_plan.md)
- [Issues Log](../planning/issues_log.md)

---

**Remember**: When in doubt, create a backup first!

---

Last Updated: 2026-02-08
