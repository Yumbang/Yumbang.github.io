# Git Workflow Best Practices

Best practices and workflow guidelines for managing this Jekyll blog with Git and GitHub.

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Branch Strategy](#branch-strategy)
3. [Commit Message Guidelines](#commit-message-guidelines)
4. [Daily Workflow](#daily-workflow)
5. [Working with Posts](#working-with-posts)
6. [Code Review Process](#code-review-process)
7. [Git Commands Reference](#git-commands-reference)
8. [Common Scenarios](#common-scenarios)
9. [Troubleshooting Git Issues](#troubleshooting-git-issues)
10. [Git Configuration](#git-configuration)

---

## Workflow Overview

### Philosophy

- **Main branch is always deployable** - Never push broken code to main
- **Test before committing** - Always run `bundle exec jekyll serve` locally first
- **Commit often** - Small, focused commits are better than large ones
- **Write clear commit messages** - Follow conventional commit format
- **Keep history clean** - Use meaningful commits, avoid "fix typo" chains

### Basic Flow

```
Edit files → Test locally → Commit → Push → Auto-deploy
```

---

## Branch Strategy

### Solo Developer (Simple Strategy)

For a single-person blog, work directly on `main`:

```bash
# Make changes
git add <files>
git commit -m "feat: add new post"
git push origin main
# Deployment happens automatically
```

**When to use:**
- Personal blog
- Solo developer
- Simple content updates
- Quick fixes

### Feature Branch Strategy (Recommended for Complex Changes)

For larger features or experimental changes:

```bash
# Create feature branch
git checkout -b feature/dark-mode

# Make changes and commit
git add <files>
git commit -m "feat: implement dark mode toggle"

# Push feature branch
git push origin feature/dark-mode

# Merge when ready
git checkout main
git merge feature/dark-mode
git push origin main

# Delete feature branch
git branch -d feature/dark-mode
git push origin --delete feature/dark-mode
```

**When to use:**
- Major design changes
- New features
- Experimental content
- Changes that might break the site
- When you want feedback before deploying

### Branch Naming Conventions

Use descriptive branch names with prefixes:

```bash
feature/dark-mode          # New feature
fix/broken-navigation      # Bug fix
content/new-post           # New blog post
design/header-redesign     # Design changes
refactor/css-cleanup       # Code refactoring
chore/update-dependencies  # Maintenance
docs/update-readme         # Documentation
```

---

## Commit Message Guidelines

### Conventional Commits Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>

[optional body]

[optional footer]
```

### Commit Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat: add dark mode toggle` |
| `fix` | Bug fix | `fix: correct math rendering on mobile` |
| `content` | New content | `content: add blog post about Jekyll` |
| `style` | Style/design changes | `style: improve post card spacing` |
| `refactor` | Code refactoring | `refactor: simplify navigation logic` |
| `perf` | Performance improvement | `perf: lazy load math rendering` |
| `docs` | Documentation | `docs: update deployment guide` |
| `chore` | Maintenance | `chore: update dependencies` |
| `config` | Configuration changes | `config: enable pagination` |
| `test` | Add/update tests | `test: add build validation` |

### Good Commit Messages

```bash
# Good - Clear, specific, uses conventional format
git commit -m "feat: add search functionality to blog"
git commit -m "fix: resolve broken RSS feed URL"
git commit -m "content: publish article on GitHub Actions"
git commit -m "style: improve mobile navigation UX"
git commit -m "perf: optimize image loading with lazy loading"

# With body for complex changes
git commit -m "refactor: restructure CSS architecture

- Migrate to BEM naming convention
- Split monolithic CSS into component files
- Remove unused styles
- Improve specificity hierarchy"
```

### Bad Commit Messages

```bash
# Bad - Too vague
git commit -m "update"
git commit -m "fix"
git commit -m "changes"

# Bad - Not descriptive
git commit -m "fix stuff"
git commit -m "working on site"

# Bad - Multiple unrelated changes
git commit -m "add post, fix CSS, update config"
```

### Commit Message Template

Create a commit message template:

```bash
# Create template file
cat > ~/.gitmessage << 'EOF'
# <type>: <subject>
#
# <body>
#
# <footer>
#
# Types: feat, fix, content, style, refactor, perf, docs, chore, config, test
# Subject: imperative mood, lowercase, no period, max 50 chars
# Body: explain what and why (not how), wrap at 72 chars
# Footer: reference issues, breaking changes
EOF

# Configure git to use template
git config --global commit.template ~/.gitmessage
```

Now `git commit` opens the template in your editor.

---

## Daily Workflow

### Starting Work

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes (important if collaborating)
git pull origin main

# Check status
git status
```

### Making Changes

```bash
# Create feature branch (optional but recommended for big changes)
git checkout -b content/new-post

# Make your changes
# - Edit files
# - Create new post
# - Update configuration

# Check what changed
git status
git diff

# Test locally
bundle exec jekyll serve

# Open http://localhost:4000 and verify everything works
```

### Committing Changes

```bash
# Stage specific files
git add _posts/2025-11-02-new-post.md
git add assets/images/new-image.png

# Or stage all changes
git add .

# Review what will be committed
git status

# Commit with meaningful message
git commit -m "content: add blog post about deployment strategies"

# Push to GitHub
git push origin main
# Or if on feature branch:
# git push origin content/new-post
```

### Finishing Work

```bash
# If using feature branch
git checkout main
git merge content/new-post
git push origin main

# Delete feature branch
git branch -d content/new-post

# Monitor deployment
# Go to GitHub Actions tab and watch the build
```

---

## Working with Posts

### Creating a New Post

```bash
# Create post file with correct naming
# Format: YYYY-MM-DD-title.md
touch _posts/2025-11-02-my-new-post.md

# Add front matter and content
# (Use your editor)

# Test locally
bundle exec jekyll serve --drafts

# Commit when ready
git add _posts/2025-11-02-my-new-post.md
git commit -m "content: publish post about Git workflows"
git push origin main
```

### Working with Drafts

```bash
# Create draft
touch _drafts/upcoming-post.md

# Test drafts locally
bundle exec jekyll serve --drafts

# When ready to publish, move to _posts with date
mv _drafts/upcoming-post.md _posts/2025-11-02-upcoming-post.md

# Commit
git add _posts/2025-11-02-upcoming-post.md
git commit -m "content: publish upcoming post"
git push origin main
```

### Updating Existing Post

```bash
# Edit the post
# Test changes locally
bundle exec jekyll serve

# Commit update
git add _posts/2025-11-01-old-post.md
git commit -m "content: update old post with new information"
git push origin main
```

### Unpublishing a Post

```bash
# Move to drafts
git mv _posts/2025-11-01-post.md _drafts/post.md

# Or delete entirely
git rm _posts/2025-11-01-post.md

# Commit
git commit -m "content: unpublish post about topic"
git push origin main
```

---

## Code Review Process

### Self-Review Checklist

Before committing, review your own changes:

```bash
# View all changes
git diff

# View staged changes
git diff --staged

# Review changes file by file
git diff _config.yml
git diff _posts/2025-11-02-new-post.md
```

**Checklist:**
- [ ] Code builds successfully locally
- [ ] No broken links
- [ ] Math renders correctly (if applicable)
- [ ] Images display properly
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Commit message is clear
- [ ] Only related changes in commit

### Pull Request Workflow (Optional)

For collaborative work or self-review:

```bash
# Create feature branch
git checkout -b feature/new-design

# Make changes and commit
git add .
git commit -m "design: redesign homepage layout"

# Push to GitHub
git push origin feature/new-design

# On GitHub:
# 1. Go to repository
# 2. Click "Pull requests"
# 3. Click "New pull request"
# 4. Select feature/new-design
# 5. Click "Create pull request"
# 6. Review changes in GitHub UI
# 7. Merge when satisfied
```

---

## Git Commands Reference

### Basic Commands

```bash
# Check status
git status

# View changes
git diff
git diff --staged
git diff <file>

# Stage changes
git add <file>
git add .
git add -A
git add -p  # Interactive staging

# Commit
git commit -m "message"
git commit -am "message"  # Stage all tracked files and commit
git commit --amend  # Amend last commit

# Push
git push origin main
git push origin <branch-name>
git push -u origin <branch-name>  # Set upstream

# Pull
git pull origin main
git pull --rebase origin main  # Rebase instead of merge
```

### Branch Management

```bash
# List branches
git branch
git branch -a  # Include remote branches
git branch -v  # Show last commit

# Create branch
git branch <branch-name>
git checkout -b <branch-name>  # Create and switch

# Switch branches
git checkout <branch-name>
git switch <branch-name>  # Modern alternative

# Merge branch
git checkout main
git merge <branch-name>

# Delete branch
git branch -d <branch-name>  # Safe delete
git branch -D <branch-name>  # Force delete
git push origin --delete <branch-name>  # Delete remote branch
```

### History and Logs

```bash
# View commit history
git log
git log --oneline
git log --graph --oneline --all
git log -5  # Last 5 commits
git log --author="Your Name"
git log --since="2 weeks ago"
git log --grep="feat"  # Search commit messages

# View specific commit
git show <commit-hash>

# View file history
git log --follow <file>
git log -p <file>  # Include changes
```

### Undoing Changes

```bash
# Discard unstaged changes
git checkout -- <file>
git restore <file>  # Modern alternative

# Unstage file
git reset HEAD <file>
git restore --staged <file>  # Modern alternative

# Discard all local changes
git reset --hard HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>
```

### Stashing

```bash
# Stash current changes
git stash
git stash save "description"

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{1}

# Apply and remove stash
git stash pop

# Drop stash
git stash drop
git stash drop stash@{1}

# Clear all stashes
git stash clear
```

### Remote Management

```bash
# View remotes
git remote -v

# Add remote
git remote add origin <url>

# Change remote URL
git remote set-url origin <new-url>

# Remove remote
git remote remove origin

# Fetch from remote
git fetch origin

# Prune deleted remote branches
git fetch --prune
git remote prune origin
```

---

## Common Scenarios

### Scenario 1: Made Changes to Wrong Branch

```bash
# You're on main but wanted to be on feature branch

# Stash changes
git stash

# Switch to correct branch
git checkout feature/new-post

# Apply stashed changes
git stash pop

# Continue working
```

### Scenario 2: Need to Undo Last Commit

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Edit files if needed
git add <files>

# Create new commit
git commit -m "correct message"
```

### Scenario 3: Accidentally Committed to Main

```bash
# Move commit to new branch

# Create branch from current position
git branch feature/my-changes

# Reset main to before the commit
git reset --hard HEAD~1

# Switch to feature branch
git checkout feature/my-changes

# Push feature branch
git push origin feature/my-changes
```

### Scenario 4: Merge Conflict

```bash
# When pulling or merging
git pull origin main
# CONFLICT (content): Merge conflict in _config.yml

# View conflicted files
git status

# Open conflicted file and resolve
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>>

# After resolving
git add <resolved-files>
git commit -m "fix: resolve merge conflict in config"
git push origin main
```

### Scenario 5: Forgot to Include File in Commit

```bash
# Add the forgotten file
git add forgotten-file.md

# Amend previous commit
git commit --amend --no-edit

# Force push if already pushed (be careful!)
git push --force origin main
```

### Scenario 6: Need to Update .gitignore After Files Committed

```bash
# Update .gitignore
echo "_site/" >> .gitignore

# Remove cached files from git
git rm -r --cached _site/

# Commit changes
git add .gitignore
git commit -m "config: update gitignore to exclude _site"
git push origin main
```

### Scenario 7: Want to See Changes Between Branches

```bash
# Compare branches
git diff main..feature/new-design

# List changed files
git diff --name-only main..feature/new-design

# Show commits in feature branch not in main
git log main..feature/new-design
```

---

## Troubleshooting Git Issues

### Issue: Detached HEAD State

**Symptoms:**
```
You are in 'detached HEAD' state
```

**Solution:**
```bash
# Create a branch from current position
git checkout -b temp-branch

# Or return to main
git checkout main
```

### Issue: Push Rejected (Non-Fast-Forward)

**Symptoms:**
```
! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs
```

**Solution:**
```bash
# Pull first, then push
git pull origin main
git push origin main

# Or rebase
git pull --rebase origin main
git push origin main

# Last resort: force push (dangerous!)
git push --force origin main
```

### Issue: Large File Won't Commit

**Symptoms:**
```
remote: error: File too large
```

**Solution:**
```bash
# Remove from staging
git rm --cached large-file.bin

# Add to .gitignore
echo "large-file.bin" >> .gitignore

# Use Git LFS for large files (if needed)
git lfs track "*.bin"
```

### Issue: Wrong Author on Commit

**Solution:**
```bash
# Fix last commit author
git commit --amend --author="Your Name <your.email@example.com>"

# Fix multiple commits (advanced)
git rebase -i HEAD~5  # Last 5 commits
# In editor, change 'pick' to 'edit' for commits to fix
# For each commit:
git commit --amend --author="Your Name <your.email@example.com>"
git rebase --continue
```

### Issue: Accidentally Deleted Branch

**Solution:**
```bash
# Find commit hash of deleted branch
git reflog

# Recreate branch from that commit
git branch recovered-branch <commit-hash>
```

### Issue: Want to Revert Pushed Commit

**Solution:**
```bash
# Create inverse commit (safe)
git revert <commit-hash>
git push origin main

# Or reset and force push (dangerous!)
git reset --hard <good-commit-hash>
git push --force origin main
```

---

## Git Configuration

### Essential Configuration

```bash
# Set user name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "nano"         # Nano
git config --global core.editor "vim"          # Vim

# Enable color output
git config --global color.ui auto

# Set default pull strategy
git config --global pull.rebase false  # Merge (default)
# or
git config --global pull.rebase true   # Rebase
```

### Useful Aliases

```bash
# Add convenient aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm "commit -m"
git config --global alias.last "log -1 HEAD"
git config --global alias.unstage "reset HEAD --"
git config --global alias.visual "log --graph --oneline --all"

# Use aliases
git st        # Instead of git status
git co main   # Instead of git checkout main
git cm "message"  # Instead of git commit -m "message"
git visual    # Pretty log graph
```

### Project-Specific Configuration

For this blog repository:

```bash
# Set local config (in blog directory)
git config --local user.name "Your Blog Name"
git config --local user.email "blog@example.com"

# Disable line ending conversion (consistent across platforms)
git config --local core.autocrlf false

# View local config
git config --local --list
```

### Git Ignore Global

Create global gitignore for system files:

```bash
# Create global gitignore
cat > ~/.gitignore_global << 'EOF'
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# Linux
*~

# Editors
.vscode/
.idea/
*.swp
*.swo
EOF

# Configure git to use it
git config --global core.excludesfile ~/.gitignore_global
```

---

## Best Practices Summary

### Do's

1. **Test locally before pushing**
   ```bash
   bundle exec jekyll serve
   ```

2. **Write descriptive commit messages**
   ```bash
   git commit -m "feat: add search functionality"
   ```

3. **Commit frequently with small changes**
   ```bash
   # Good: Multiple focused commits
   git commit -m "style: update header colors"
   git commit -m "fix: correct navigation link"
   ```

4. **Pull before pushing** (if collaborating)
   ```bash
   git pull origin main
   git push origin main
   ```

5. **Use branches for experiments**
   ```bash
   git checkout -b experiment/new-feature
   ```

6. **Review changes before committing**
   ```bash
   git diff
   git status
   ```

### Don'ts

1. **Don't commit directly to main without testing**
2. **Don't use vague commit messages** ("update", "fix")
3. **Don't commit generated files** (use .gitignore)
4. **Don't commit secrets** (API keys, passwords)
5. **Don't force push to main** (unless emergency)
6. **Don't commit multiple unrelated changes** together
7. **Don't commit broken code** to main branch

---

## Quick Reference Card

```bash
# Daily workflow
git pull origin main              # Get latest changes
git checkout -b feature/name      # Create feature branch
# ... make changes ...
bundle exec jekyll serve          # Test locally
git add .                         # Stage changes
git commit -m "type: description" # Commit
git push origin feature/name      # Push branch
git checkout main                 # Switch to main
git merge feature/name            # Merge
git push origin main              # Deploy

# Quick fixes
git add .
git commit -m "fix: description"
git push origin main

# View history
git log --oneline --graph         # Visual history
git status                        # Current state
git diff                          # Changes

# Undo
git restore <file>                # Discard changes
git reset --soft HEAD~1           # Undo commit
git revert <commit>               # Revert commit

# Branches
git branch                        # List branches
git checkout -b <name>            # Create branch
git branch -d <name>              # Delete branch
```

---

## Conclusion

Following these Git workflow best practices will help you:

- Maintain a clean and understandable history
- Deploy with confidence
- Quickly identify and fix issues
- Collaborate effectively (if needed in future)
- Recover from mistakes easily

**Key Takeaways:**

1. Always test locally before pushing
2. Write clear, conventional commit messages
3. Commit small, focused changes
4. Use branches for complex work
5. Monitor deployments after pushing
6. Keep your Git knowledge up to date

**Remember:**

- Main branch = Production
- Test first, commit second
- Clear commits = Clear history
- When in doubt, use a branch

For deployment-specific workflows, see [DEPLOYMENT.md](DEPLOYMENT.md).

Happy coding!
