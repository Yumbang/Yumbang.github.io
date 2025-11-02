# Deployment Guide

Complete guide for deploying your Jekyll blog to GitHub Pages using GitHub Actions.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [GitHub Repository Setup](#github-repository-setup)
3. [GitHub Pages Configuration](#github-pages-configuration)
4. [First Deployment](#first-deployment)
5. [Monitoring Deployments](#monitoring-deployments)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)
8. [Advanced Configuration](#advanced-configuration)

---

## Initial Setup

### Prerequisites

Before deploying, ensure you have:

- [x] Git repository initialized (already done)
- [x] Initial commit created (already done)
- [x] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [x] All documentation files committed
- [ ] GitHub account created
- [ ] GitHub repository created (next step)

### Local Testing

**IMPORTANT**: Always test your site locally before pushing to GitHub:

```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve --livereload

# Open http://localhost:4000 in your browser
```

**Note about Ruby versions:**
- Your local machine uses Ruby 2.6.10
- GitHub Actions uses Ruby 3.2
- If you encounter local Ruby compatibility issues, the deployment will still work on GitHub Actions
- Consider using [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/) to manage Ruby versions

---

## GitHub Repository Setup

### Step 1: Create GitHub Repository

There are two options for repository naming:

#### Option A: User/Organization Site (Recommended for main blog)
- **Repository name**: `yourusername.github.io`
- **URL**: `https://yourusername.github.io`
- **Baseurl**: Leave empty in `_config.yml`

#### Option B: Project Site
- **Repository name**: Any name (e.g., `blog`, `my-blog`)
- **URL**: `https://yourusername.github.io/blog`
- **Baseurl**: Set to `/blog` in `_config.yml`

### Step 2: Create the Repository

1. Go to [GitHub](https://github.com)
2. Click the `+` icon in the top-right corner
3. Select "New repository"
4. Enter repository name (see above)
5. **IMPORTANT**: Do NOT initialize with README, .gitignore, or license (we already have these)
6. Keep repository public (required for free GitHub Pages)
7. Click "Create repository"

### Step 3: Update _config.yml

Update your `_config.yml` with correct values:

```yaml
title: "Your Blog Title"
description: "Your blog description"
author: "Your Name"
email: your.email@example.com
url: "https://yourusername.github.io"
baseurl: ""  # Or "/blog" if using project site
```

### Step 4: Connect Local Repository to GitHub

GitHub will show you commands after creating the repository. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Verify the remote was added
git remote -v

# Push your code
git push -u origin main
```

**Alternative (SSH):**
```bash
git remote add origin git@github.com:yourusername/yourusername.github.io.git
git push -u origin main
```

---

## GitHub Pages Configuration

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (This replaces the old "Deploy from a branch" method)

### Step 2: Verify Permissions

GitHub Actions needs proper permissions to deploy:

1. In your repository, go to "Settings" > "Actions" > "General"
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"

### Step 3: Configure Custom Domain (Optional)

If you want to use a custom domain (e.g., `yourblog.com`):

1. In repository settings, go to "Pages"
2. Under "Custom domain", enter your domain
3. Click "Save"
4. Add a `CNAME` file to your repository root:
   ```bash
   echo "yourblog.com" > CNAME
   git add CNAME
   git commit -m "config: add custom domain"
   git push
   ```
5. Configure DNS records with your domain provider:
   - For apex domain (`yourblog.com`):
     ```
     A     185.199.108.153
     A     185.199.109.153
     A     185.199.110.153
     A     185.199.111.153
     ```
   - For subdomain (`www.yourblog.com`):
     ```
     CNAME     yourusername.github.io
     ```

---

## First Deployment

### Automatic Deployment

Your first deployment should trigger automatically when you push to the `main` branch.

### Monitor the Deployment

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You should see a workflow run in progress
4. Click on the workflow to see detailed logs

### Expected Build Time

- **First build**: 2-4 minutes (installing dependencies)
- **Subsequent builds**: 1-2 minutes (using cached gems)

### Verify Deployment

After the workflow completes successfully:

1. Wait 1-2 minutes for GitHub Pages to serve the site
2. Visit your site URL:
   - User site: `https://yourusername.github.io`
   - Project site: `https://yourusername.github.io/blog`
3. Verify all pages load correctly
4. Check that math rendering works (visit the math examples post)
5. Test navigation and links
6. Check mobile responsiveness

### Deployment Checklist

After first deployment, verify:

- [ ] Site is accessible at correct URL
- [ ] Homepage loads correctly
- [ ] All blog posts are visible
- [ ] Navigation works
- [ ] Math equations render properly
- [ ] CSS styles are applied
- [ ] Images load correctly
- [ ] Footer displays correctly
- [ ] About page is accessible
- [ ] RSS feed works (`/feed.xml`)
- [ ] Sitemap is generated (`/sitemap.xml`)

---

## Monitoring Deployments

### GitHub Actions Dashboard

Monitor all deployments from the Actions tab:

1. **Green checkmark**: Deployment succeeded
2. **Red X**: Deployment failed
3. **Yellow circle**: Deployment in progress
4. **Gray circle**: Deployment skipped or cancelled

### Email Notifications

GitHub automatically sends email notifications for:
- Failed workflow runs
- First successful run after failures

To customize notifications:
1. Go to GitHub Settings (your profile)
2. Navigate to "Notifications"
3. Configure Actions notification preferences

### Viewing Build Logs

To view detailed logs:

1. Go to "Actions" tab
2. Click on a workflow run
3. Click on a job (e.g., "build" or "deploy")
4. Expand steps to see detailed output

### Deployment Status Badge

Add a status badge to your README:

```markdown
![Deploy Status](https://github.com/yourusername/yourusername.github.io/workflows/Deploy%20Jekyll%20Blog%20to%20GitHub%20Pages/badge.svg)
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails: "Could not find gem"

**Problem**: Missing gem dependencies

**Solution**:
```bash
# Update Gemfile.lock locally
bundle install
git add Gemfile.lock
git commit -m "chore: update gem dependencies"
git push
```

#### 2. Build Fails: "Liquid syntax error"

**Problem**: Syntax error in templates or posts

**Solution**:
1. Check the build log for the specific file
2. Review the line number mentioned in the error
3. Common issues:
   - Unclosed Liquid tags: `{% if ... %}` without `{% endif %}`
   - Invalid Liquid syntax: `{{ post.invalid_attribute }}`
   - Curly braces in math: Use `\{` instead of `{` in LaTeX

**Fix**:
```bash
# Edit the problematic file
# Test locally first
bundle exec jekyll build --verbose
# Push the fix
git add <file>
git commit -m "fix: correct Liquid syntax error in <file>"
git push
```

#### 3. Build Fails: "Conversion error"

**Problem**: Jekyll cannot process a file

**Solution**:
1. Check if file encoding is UTF-8
2. Verify front matter is valid YAML
3. Test locally with verbose output:
   ```bash
   bundle exec jekyll build --verbose --trace
   ```

#### 4. Deploy Succeeds but Site is Broken

**Problem**: Site builds but displays incorrectly

**Common causes**:

**A. Incorrect baseurl**
```yaml
# In _config.yml
# For user site:
baseurl: ""

# For project site:
baseurl: "/blog"  # Must match repository name
```

**B. Missing assets**
- Check browser console for 404 errors
- Verify asset paths in templates use `{{ site.baseurl }}`

**C. Math not rendering**
- Verify post has `math: true` in front matter
- Check browser console for JavaScript errors
- Verify MathJax CDN is accessible

#### 5. GitHub Actions Permission Denied

**Problem**: Workflow fails with permission error

**Solution**:
1. Go to repository Settings > Actions > General
2. Under "Workflow permissions", select "Read and write permissions"
3. Click "Save"
4. Re-run the workflow

#### 6. "No url found for GitHub Pages"

**Problem**: GitHub Pages not configured correctly

**Solution**:
1. Go to repository Settings > Pages
2. Ensure "Source" is set to "GitHub Actions"
3. Wait a few minutes and try again

#### 7. Custom Domain Not Working

**Problem**: Custom domain shows 404 or SSL errors

**Solution**:
1. Verify DNS records are correct (allow 24-48 hours for propagation)
2. Check CNAME file exists in repository
3. In Settings > Pages, remove and re-add custom domain
4. Enable "Enforce HTTPS" after DNS propagates

### Debugging Workflow

When troubleshooting deployment issues:

1. **Check the Actions log**
   - Identify which step failed
   - Read the complete error message

2. **Reproduce locally**
   ```bash
   bundle exec jekyll build --verbose
   ```

3. **Check configuration**
   ```bash
   bundle exec jekyll doctor
   ```

4. **Validate YAML**
   - Use [YAML Lint](http://www.yamllint.com/) for front matter
   - Verify workflow YAML syntax

5. **Test in isolation**
   - Comment out problematic content
   - Add it back incrementally

### Getting Help

If you're still stuck:

1. **Check GitHub Status**: [githubstatus.com](https://www.githubstatus.com/)
2. **Jekyll Documentation**: [jekyllrb.com/docs](https://jekyllrb.com/docs/)
3. **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/en/pages)
4. **Jekyll Forum**: [talk.jekyllrb.com](https://talk.jekyllrb.com/)
5. **Stack Overflow**: Tag questions with `jekyll` and `github-pages`

---

## Rollback Procedures

### Rollback to Previous Version

If a deployment introduces issues:

#### Method 1: Revert the Commit (Recommended)

```bash
# Find the commit hash you want to revert
git log --oneline

# Revert the problematic commit (creates a new commit)
git revert <commit-hash>

# Push the revert
git push origin main
```

This is safest because it preserves history.

#### Method 2: Reset to Previous Commit

**WARNING**: Only use this if you haven't shared the commits with others.

```bash
# Reset to a previous commit
git reset --hard <good-commit-hash>

# Force push (dangerous!)
git push --force origin main
```

#### Method 3: Manual Rollback

```bash
# Create a new branch from the good commit
git checkout -b rollback <good-commit-hash>

# Push the rollback branch
git push origin rollback

# Create a pull request to merge rollback into main
```

### Emergency: Disable GitHub Actions

If deployments are continuously failing:

1. Go to repository Settings
2. Click "Actions" in the left sidebar
3. Click "Disable Actions"
4. Fix the issue locally
5. Re-enable Actions when ready

---

## Advanced Configuration

### Environment Variables

Add secrets or configuration in GitHub:

1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add secret (e.g., `GOOGLE_ANALYTICS_ID`)

Use in workflow:
```yaml
- name: Build with Jekyll
  run: bundle exec jekyll build
  env:
    GOOGLE_ANALYTICS_ID: ${{ secrets.GOOGLE_ANALYTICS_ID }}
```

### Build Matrix (Testing Multiple Ruby Versions)

```yaml
strategy:
  matrix:
    ruby-version: ['3.0', '3.1', '3.2']

steps:
  - name: Set up Ruby ${{ matrix.ruby-version }}
    uses: ruby/setup-ruby@v1
    with:
      ruby-version: ${{ matrix.ruby-version }}
```

### Caching Strategy

Our workflow already caches gems with `bundler-cache: true`. To verify caching works:

1. Check workflow logs
2. Look for "Cache restored" message
3. Build time should decrease significantly after first run

### Deploy Only on Tag

To deploy only when you create a release tag:

```yaml
on:
  push:
    tags:
      - 'v*'
```

Then deploy with:
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Scheduled Deployments

Rebuild site daily (useful for date-based content):

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Every day at midnight UTC
```

### Deploy to Multiple Environments

Create separate workflows for staging and production:

`.github/workflows/deploy-staging.yml`:
```yaml
on:
  push:
    branches:
      - develop
```

`.github/workflows/deploy-production.yml`:
```yaml
on:
  push:
    branches:
      - main
```

### Performance Optimization

**Enable incremental builds** (faster local development):

```yaml
# In _config.yml
incremental: true
```

**Note**: GitHub Actions always does full builds for consistency.

**Optimize images**:
```bash
# Install ImageOptim or similar
# Compress images before committing
```

---

## Daily Workflow

### Making Changes

```bash
# 1. Create a new branch (optional but recommended)
git checkout -b feature/new-post

# 2. Make your changes
# - Add new post to _posts/
# - Edit existing files
# - Update configuration

# 3. Test locally
bundle exec jekyll serve

# 4. Commit changes
git add .
git commit -m "feat: add new blog post about topic"

# 5. Push to GitHub
git push origin feature/new-post

# 6. Create pull request (optional) OR merge to main
git checkout main
git merge feature/new-post
git push origin main
```

### Simple Workflow (Solo Developer)

```bash
# 1. Make changes
# 2. Test locally
bundle exec jekyll serve

# 3. Commit and push directly to main
git add .
git commit -m "feat: add new post"
git push origin main

# 4. Monitor deployment in GitHub Actions
```

### Pre-Push Checklist

Before pushing to main:

- [ ] Tested locally with `bundle exec jekyll serve`
- [ ] All pages load without errors
- [ ] Math renders correctly (if applicable)
- [ ] No broken links
- [ ] Images display correctly
- [ ] Responsive design works
- [ ] Commit message is clear and descriptive

---

## Security Best Practices

1. **Keep dependencies updated**
   ```bash
   bundle update
   git add Gemfile.lock
   git commit -m "chore: update dependencies"
   git push
   ```

2. **Never commit secrets**
   - API keys
   - Passwords
   - Access tokens
   - Use GitHub secrets instead

3. **Use HTTPS for custom domains**
   - Enable "Enforce HTTPS" in GitHub Pages settings

4. **Review GitHub Actions logs**
   - Don't expose sensitive information in logs
   - Use secrets for sensitive data

5. **Enable Dependabot**
   - Go to repository Settings > Security
   - Enable Dependabot alerts and security updates

---

## Performance Monitoring

### Build Time

Monitor build times in Actions logs:
- **Normal**: 1-3 minutes
- **Slow**: 3-5 minutes (investigate)
- **Very slow**: 5+ minutes (needs optimization)

### Optimization Tips

1. **Reduce post count on homepage**
   ```yaml
   # In _config.yml
   paginate: 5  # Instead of 10
   ```

2. **Lazy load images**
   ```html
   <img loading="lazy" src="...">
   ```

3. **Minimize plugins**
   - Remove unused plugins from Gemfile

4. **Optimize images**
   - Compress before committing
   - Use appropriate formats (WebP when possible)

---

## Maintenance Schedule

### Weekly
- [ ] Check GitHub Actions status
- [ ] Review any failed deployments
- [ ] Monitor site performance

### Monthly
- [ ] Run `bundle outdated`
- [ ] Review security advisories
- [ ] Update dependencies if needed
- [ ] Check site analytics

### Quarterly
- [ ] Major dependency updates
- [ ] Review and optimize build times
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Backup repository

---

## Quick Reference

### Useful Commands

```bash
# Test build locally
bundle exec jekyll build

# Serve with live reload
bundle exec jekyll serve --livereload

# Serve with drafts
bundle exec jekyll serve --drafts

# Clean build artifacts
bundle exec jekyll clean

# Check configuration
bundle exec jekyll doctor

# Update dependencies
bundle update

# Check for outdated gems
bundle outdated

# Verbose build
bundle exec jekyll build --verbose

# Production build
JEKYLL_ENV=production bundle exec jekyll build
```

### Important Files

- `.github/workflows/deploy.yml` - Deployment workflow
- `_config.yml` - Jekyll configuration
- `Gemfile` - Ruby dependencies
- `.gitignore` - Files to ignore in git

### Important URLs

- Repository: `https://github.com/yourusername/repo-name`
- Actions: `https://github.com/yourusername/repo-name/actions`
- Settings: `https://github.com/yourusername/repo-name/settings`
- GitHub Pages: `https://github.com/yourusername/repo-name/settings/pages`
- Live Site: `https://yourusername.github.io`

---

## Conclusion

Your Jekyll blog is now configured for automatic deployment via GitHub Actions. Every push to the `main` branch will:

1. Trigger the GitHub Actions workflow
2. Build your Jekyll site with Ruby 3.2
3. Run basic tests on the build output
4. Deploy to GitHub Pages
5. Make your site available at your GitHub Pages URL

**Key Points to Remember:**

- Always test locally before pushing
- Monitor the Actions tab after pushing
- Use meaningful commit messages
- Don't commit secrets or sensitive data
- Keep dependencies updated
- Follow the pre-push checklist

**Need Help?**

- Check the [Troubleshooting](#troubleshooting) section
- Review GitHub Actions logs
- Consult Jekyll documentation
- Refer to GIT_WORKFLOW.md for git best practices

Happy blogging!
