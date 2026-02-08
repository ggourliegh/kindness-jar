# GitHub Backup Guide

## Overview
This guide provides instructions for backing up your GitHub repository and ensuring your code is safely stored.

---

## Regular Backup Workflow

### 1. Local Backup
Create a local backup of your repository:

```bash
# Navigate to your project directory
cd /path/to/Be-Kind

# Create a backup using git bundle
git bundle create ../be-kind-backup-$(date +%Y%m%d).bundle --all

# Or create a simple copy
cp -r . ../be-kind-backup-$(date +%Y%m%d)
```

### 2. Verify Backup
Verify your backup is complete:

```bash
# For git bundle
git bundle verify ../be-kind-backup-YYYYMMDD.bundle

# For directory copy
cd ../be-kind-backup-YYYYMMDD
git status
git log --oneline -10
```

---

## Cloud Backup Options

### Option 1: GitHub (Primary)
Your code is already backed up on GitHub when you push:

```bash
# Ensure all changes are committed
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

### Option 2: Additional Remote
Add a secondary remote for redundancy:

```bash
# Add a second remote (e.g., GitLab, Bitbucket)
git remote add backup https://gitlab.com/username/be-kind.git

# Push to backup remote
git push backup main
```

### Option 3: Cloud Storage
Backup to cloud storage services:

```bash
# Create a bundle
git bundle create be-kind-backup.bundle --all

# Upload to cloud storage
# - Google Drive
# - Dropbox
# - OneDrive
# - AWS S3
```

---

## Automated Backup Script

Create a backup script `backup.sh`:

```bash
#!/bin/bash

# Configuration
REPO_PATH="$HOME/OneDrive/Documents/Anti gravity workspaces/Be Kind"
BACKUP_PATH="$HOME/Backups/be-kind"
DATE=$(date +%Y%m%d-%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_PATH"

# Navigate to repository
cd "$REPO_PATH" || exit 1

# Create git bundle
echo "Creating backup bundle..."
git bundle create "$BACKUP_PATH/be-kind-$DATE.bundle" --all

# Verify bundle
echo "Verifying backup..."
git bundle verify "$BACKUP_PATH/be-kind-$DATE.bundle"

# Optional: Remove old backups (keep last 7)
echo "Cleaning old backups..."
ls -t "$BACKUP_PATH"/be-kind-*.bundle | tail -n +8 | xargs rm -f

echo "Backup completed: be-kind-$DATE.bundle"
```

Make it executable:
```bash
chmod +x backup.sh
```

Schedule it (cron on Linux/Mac):
```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## What to Backup

### Essential Items
- ✅ Source code (all branches)
- ✅ Git history
- ✅ Configuration files
- ✅ Documentation
- ✅ README and guides

### Optional Items
- Environment variables (`.env` files) - **Store securely, not in git**
- Dependencies (`node_modules`) - Can be reinstalled
- Build artifacts - Can be regenerated
- Cache files - Not needed

### Never Backup (In Git)
- ❌ API keys and secrets
- ❌ Database credentials
- ❌ Stripe private keys
- ❌ Personal access tokens
- ❌ User data

---

## Restoring from Backup

### From Git Bundle
```bash
# Clone from bundle
git clone be-kind-backup.bundle be-kind-restored

# Or add as remote to existing repo
git remote add backup /path/to/be-kind-backup.bundle
git fetch backup
```

### From Directory Copy
```bash
# Simply copy back
cp -r be-kind-backup-YYYYMMDD be-kind-restored
cd be-kind-restored
git remote -v  # Verify remotes
```

### From GitHub
```bash
# Clone fresh copy
git clone https://github.com/username/be-kind.git
```

---

## Backup Verification Checklist

- [ ] All commits are present (`git log`)
- [ ] All branches are backed up (`git branch -a`)
- [ ] All files are included (`git status`)
- [ ] Remote URLs are correct (`git remote -v`)
- [ ] Tags are preserved (`git tag`)
- [ ] Submodules included (if any)

---

## Emergency Recovery

### If Local Repository is Corrupted
```bash
# Re-clone from GitHub
git clone https://github.com/username/be-kind.git be-kind-recovery
```

### If GitHub Repository is Deleted
```bash
# Restore from latest bundle
git clone be-kind-backup-latest.bundle be-kind
cd be-kind

# Re-create GitHub repository and push
git remote add origin https://github.com/username/be-kind.git
git push -u origin main
```

---

## Best Practices

1. **Regular Commits**: Commit frequently to capture work
2. **Push Often**: Push to GitHub at least daily
3. **Multiple Remotes**: Consider a secondary remote
4. **Local Backups**: Weekly bundle backups
5. **Cloud Storage**: Monthly archives to cloud storage
6. **Test Restores**: Periodically test restore process
7. **Document Changes**: Use meaningful commit messages
8. **Branch Strategy**: Use branches for features
9. **Tag Releases**: Tag important milestones
10. **Secure Secrets**: Never commit sensitive data

---

## Backup Schedule Recommendation

- **Hourly**: Automatic commits (if working)
- **Daily**: Push to GitHub
- **Weekly**: Create local bundle backup
- **Monthly**: Archive to cloud storage
- **Before Major Changes**: Manual backup

---

## Related Documentation
- [Git Rollback Guide](git_rollback_guide.md)
- [Implementation Plan](../planning/implementation_plan.md)

---

Last Updated: 2026-02-08
