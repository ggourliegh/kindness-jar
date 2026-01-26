# KINDNESS JAR - GITHUB WORKFLOW GUIDE

**Version:** 1.0  
**Last Updated:** January 26, 2026  
**Purpose:** Version control strategy for safe feature development

---

## 🎯 OVERVIEW

This document explains how to use Git and GitHub to:
- Track all changes to the app
- Safely develop new features
- Roll back to previous versions if needed
- Collaborate with other developers
- Maintain production stability

---

## 🌳 BRANCHING STRATEGY

### Main Branches

**`main`** - Production-ready code
- Always deployable
- Only merge tested, working features
- Protected branch (no direct commits)
- This is what users see

**`develop`** - Integration branch
- Latest development changes
- Features merge here first
- Testing ground before production
- May have minor bugs

### Feature Branches

**`feature/feature-name`** - Individual features
- Create from `develop`
- One feature per branch
- Delete after merging
- Examples:
  - `feature/user-accounts`
  - `feature/dark-mode`
  - `feature/social-sharing`

### Hotfix Branches

**`hotfix/bug-name`** - Critical bug fixes
- Create from `main`
- Merge to both `main` and `develop`
- For production emergencies only

---

## 📋 WORKFLOW STEPS

### 1. Starting a New Feature

```bash
# Make sure you're on develop
git checkout develop

# Pull latest changes
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Example:
git checkout -b feature/achievement-badges
```

### 2. Making Changes

```bash
# Make your code changes in your editor
# Test thoroughly

# Check what changed
git status

# Add files to staging
git add .

# Or add specific files
git add kindness-jar-realistic-glass.html

# Commit with descriptive message
git commit -m "feat: add achievement badge system"
```

### 3. Commit Message Format

Use conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, no code change
refactor: code restructuring
test: adding tests
chore: maintenance tasks
```

**Examples:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve confetti animation bug"
git commit -m "docs: update README with deployment steps"
git commit -m "style: improve jar color palette"
```

### 4. Pushing to GitHub

```bash
# Push feature branch to GitHub
git push origin feature/your-feature-name

# First time pushing a new branch
git push -u origin feature/your-feature-name
```

### 5. Creating a Pull Request

1. Go to GitHub repository
2. Click "Pull requests" tab
3. Click "New pull request"
4. Base: `develop` ← Compare: `feature/your-feature-name`
5. Add description of changes
6. Click "Create pull request"
7. Review changes
8. Merge when ready

### 6. Merging to Develop

```bash
# After PR approved, switch to develop
git checkout develop

# Pull latest (includes your merged feature)
git pull origin develop

# Delete local feature branch
git branch -d feature/your-feature-name

# Delete remote feature branch
git push origin --delete feature/your-feature-name
```

### 7. Releasing to Production

```bash
# When develop is stable and tested
git checkout main
git pull origin main

# Merge develop into main
git merge develop

# Tag the release
git tag -a v4.1.0 -m "Release version 4.1.0 - Achievement badges"

# Push to GitHub
git push origin main
git push origin v4.1.0
```

---

## 🚨 EMERGENCY HOTFIX

### When Production Has a Critical Bug

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug-name

# Fix the bug
# Test thoroughly

# Commit
git commit -m "fix: resolve critical payment bug"

# Merge to main
git checkout main
git merge hotfix/critical-bug-name
git push origin main

# Also merge to develop
git checkout develop
git merge hotfix/critical-bug-name
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-bug-name

# Tag the hotfix
git tag -a v4.0.1 -m "Hotfix: payment bug"
git push origin v4.0.1
```

---

## 🔄 ROLLING BACK CHANGES

### Undo Last Commit (Not Pushed)

```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes completely
git reset --hard HEAD~1
```

### Revert to Previous Version

```bash
# See all versions
git log --oneline

# Revert to specific commit
git checkout <commit-hash>

# Create new branch from old version
git checkout -b feature/restore-old-version

# Or reset to old version (dangerous!)
git reset --hard <commit-hash>
```

### Restore from Tag

```bash
# List all tags
git tag

# Checkout a tagged version
git checkout v4.0.0

# Create branch from tag
git checkout -b feature/from-v4 v4.0.0
```

---

## 📊 USEFUL GIT COMMANDS

### Check Status

```bash
# See what changed
git status

# See commit history
git log --oneline --graph --all

# See changes in files
git diff
```

### Branch Management

```bash
# List all branches
git branch -a

# Switch branches
git checkout branch-name

# Create and switch
git checkout -b new-branch-name

# Delete branch
git branch -d branch-name

# Rename current branch
git branch -m new-name
```

### Sync with Remote

```bash
# Download changes (don't merge)
git fetch origin

# Download and merge
git pull origin branch-name

# Push changes
git push origin branch-name

# Push all branches
git push --all origin

# Push all tags
git push --tags
```

### Stash Changes

```bash
# Save work in progress
git stash

# List stashes
git stash list

# Apply last stash
git stash apply

# Apply and remove stash
git stash pop

# Clear all stashes
git stash clear
```

---

## 🎯 BEST PRACTICES

### ✅ DO

- Commit often with clear messages
- Test before committing
- Pull before starting new work
- Use feature branches for all changes
- Keep commits focused (one feature/fix per commit)
- Write descriptive commit messages
- Tag releases with version numbers
- Delete merged feature branches

### ❌ DON'T

- Commit directly to `main`
- Push untested code
- Make huge commits with many changes
- Use vague commit messages ("fix stuff", "updates")
- Leave old feature branches around
- Force push to shared branches (`git push -f`)
- Commit sensitive data (API keys, passwords)

---

## 🏷️ VERSION NUMBERING

### Semantic Versioning: MAJOR.MINOR.PATCH

**MAJOR** (v5.0.0)
- Breaking changes
- Complete redesign
- Major feature overhaul

**MINOR** (v4.1.0)
- New features
- Backward compatible
- Enhancements

**PATCH** (v4.0.1)
- Bug fixes
- Small tweaks
- No new features

**Examples:**
- v4.0.0 → v4.0.1 (bug fix)
- v4.0.1 → v4.1.0 (new feature: badges)
- v4.1.0 → v5.0.0 (complete redesign)

---

## 📝 EXAMPLE WORKFLOW

### Scenario: Adding Dark Mode

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/dark-mode

# 3. Make changes to HTML file
# Add dark mode CSS and toggle button

# 4. Test thoroughly
# Open in browser, test all features

# 5. Commit changes
git add kindness-jar-realistic-glass.html
git commit -m "feat: add dark mode toggle with localStorage persistence"

# 6. Push to GitHub
git push -u origin feature/dark-mode

# 7. Create Pull Request on GitHub
# Review changes, test deployed preview

# 8. Merge PR to develop
# (Done via GitHub interface)

# 9. Test on develop branch
git checkout develop
git pull origin develop

# 10. If stable, merge to main
git checkout main
git pull origin main
git merge develop
git tag -a v4.1.0 -m "Release v4.1.0 - Dark mode feature"
git push origin main
git push origin v4.1.0

# 11. Clean up
git branch -d feature/dark-mode
git push origin --delete feature/dark-mode
```

---

## 🆘 TROUBLESHOOTING

### Merge Conflicts

```bash
# When merge conflict occurs
git status  # See conflicting files

# Open files, look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# Edit to resolve, then:
git add resolved-file.html
git commit -m "fix: resolve merge conflict"
```

### Accidentally Committed to Wrong Branch

```bash
# Move last commit to new branch
git branch feature/new-branch
git reset --hard HEAD~1
git checkout feature/new-branch
```

### Pushed Sensitive Data

```bash
# Remove from history (use carefully!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (dangerous!)
git push origin --force --all
```

---

## 📚 RESOURCES

### Learn Git
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

### Tools
- [GitHub Desktop](https://desktop.github.com/) - GUI for Git
- [GitKraken](https://www.gitkraken.com/) - Visual Git client
- [VS Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)

---

## ✅ QUICK REFERENCE

```bash
# Daily workflow
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: description"
git push -u origin feature/my-feature
# ... create PR on GitHub ...
# ... after merge ...
git checkout develop
git pull origin develop
git branch -d feature/my-feature

# Release to production
git checkout main
git merge develop
git tag -a v4.x.0 -m "Release notes"
git push origin main --tags
```

---

**Remember:** Git is your safety net. Commit often, branch freely, and never fear breaking things!

---

*Document Version: 1.0*  
*Last Updated: January 26, 2026*  
*For: Kindness Jar Project*
