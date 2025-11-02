# Quick Start Guide

Get your Jekyll blog deployed to GitHub Pages in 10 minutes.

## Current Status

- **Git repository**: Initialized and ready
- **Branch**: `main`
- **Commits**: 2 commits ready to push
- **GitHub Actions**: Configured and ready
- **Documentation**: Complete

## Next Steps to Deploy

### 1. Update Configuration (2 minutes)

Edit `_config.yml` with your information:

```bash
# Open in your editor
code _config.yml  # Or use nano, vim, etc.
```

Update these fields:
```yaml
title: "Your Blog Title"
description: "Your blog description"
author: "Your Name"
email: your.email@example.com
url: "https://yourusername.github.io"
baseurl: ""  # Or "/blog" if using project repository
```

Commit your changes:
```bash
git add _config.yml
git commit -m "config: personalize blog information"
```

### 2. Create GitHub Repository (2 minutes)

Choose your repository type:

**Option A: User Site (recommended)**
- Repository name: `yourusername.github.io`
- URL will be: `https://yourusername.github.io`
- Use `baseurl: ""` in config

**Option B: Project Site**
- Repository name: `blog` (or any name)
- URL will be: `https://yourusername.github.io/blog`
- Use `baseurl: "/blog"` in config

Steps:
1. Go to [github.com/new](https://github.com/new)
2. Enter repository name
3. Keep it **public** (required for free GitHub Pages)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### 3. Push Your Code (1 minute)

GitHub will show you these commands after creating the repository:

```bash
# Add remote (replace with your username and repo name)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

### 4. Configure GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in left sidebar
4. Under "Build and deployment":
   - Set **Source** to "GitHub Actions"
5. Go to "Settings" > "Actions" > "General"
6. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Click "Save"

### 5. Monitor Deployment (2 minutes)

1. Go to "Actions" tab in your repository
2. You should see "Deploy Jekyll Blog to GitHub Pages" running
3. Click on the workflow to see progress
4. Wait for it to complete (2-4 minutes)

### 6. Visit Your Site (1 minute)

After the workflow completes:

1. Wait 1-2 minutes for GitHub Pages to update
2. Visit your site:
   - User site: `https://yourusername.github.io`
   - Project site: `https://yourusername.github.io/blog`
3. Your blog should be live!

## Verification Checklist

After deployment, verify:

- [ ] Site loads at correct URL
- [ ] Homepage displays
- [ ] Sample blog posts are visible
- [ ] Navigation works
- [ ] Math rendering works (check math examples post)
- [ ] CSS styles are applied
- [ ] About page loads
- [ ] Mobile view works

## What You Have

### File Structure
```
blog/
├── .github/workflows/deploy.yml    # GitHub Actions deployment
├── .gitignore                      # Git ignore rules
├── _config.yml                     # Jekyll configuration
├── Gemfile                         # Ruby dependencies
├── _layouts/                       # Page templates
├── _includes/                      # Reusable components
├── _posts/                         # Blog posts
├── assets/css/                     # Styles
├── DEPLOYMENT.md                   # Detailed deployment guide
├── GIT_WORKFLOW.md                # Git best practices
└── QUICK_START.md                 # This file
```

### Features Configured

1. **Jekyll 4.3** with modern features
2. **Responsive design** - Mobile-first approach
3. **MathJax 3** - For mathematical equations
4. **GitHub Actions** - Automated deployment
5. **SEO optimized** - Meta tags and sitemap
6. **RSS feed** - Automatic feed generation
7. **Syntax highlighting** - Code blocks with Rouge
8. **GitHub Pages plugins** - SEO, feed, sitemap

### Documentation Available

- `DEPLOYMENT.md` - Complete deployment guide with troubleshooting
- `GIT_WORKFLOW.md` - Git best practices and workflows
- `THEME-SETUP.md` - Theme customization guide
- `MATH_RENDERING_GUIDE.md` - Math rendering instructions
- `TESTING_CHECKLIST.md` - Quality assurance procedures
- `CLAUDE.md` - Project instructions for maintainers

## Common Issues

### Build Fails

**Check:**
1. GitHub Actions logs for specific error
2. DEPLOYMENT.md troubleshooting section
3. Verify all files are committed

### Site Shows 404

**Check:**
1. GitHub Pages is configured (Settings > Pages > Source: GitHub Actions)
2. Workflow completed successfully
3. Wait 1-2 more minutes for propagation
4. Verify baseurl in _config.yml matches repository type

### Math Not Rendering

**Check:**
1. Post has `math: true` in front matter
2. Browser console for errors
3. Check MATH_RENDERING_GUIDE.md

## Daily Usage

### Writing a New Post

```bash
# Create new post file
touch _posts/2025-11-02-my-new-post.md

# Add front matter and content
cat > _posts/2025-11-02-my-new-post.md << 'EOF'
---
layout: post
title: "My New Post"
date: 2025-11-02
categories: [blog]
---

Your content here...
EOF

# Test locally
bundle exec jekyll serve

# Open http://localhost:4000

# Commit and push
git add _posts/2025-11-02-my-new-post.md
git commit -m "content: add new blog post"
git push origin main

# Deployment happens automatically!
```

### Making Design Changes

```bash
# Edit CSS files in assets/css/
# Test locally first
bundle exec jekyll serve

# Commit when satisfied
git add assets/css/
git commit -m "style: improve header design"
git push origin main
```

## Local Development

### First Time Setup

```bash
# Install dependencies
bundle install

# Serve site
bundle exec jekyll serve --livereload

# Open http://localhost:4000
```

### Ruby Version Note

- **Local machine**: Ruby 2.6.10
- **GitHub Actions**: Ruby 3.2
- If you have local Ruby issues, the site will still deploy correctly on GitHub Actions
- Consider upgrading Ruby locally: [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/)

## Git Workflow

### Simple Workflow (Recommended for Solo Developer)

```bash
# Make changes
# Test locally: bundle exec jekyll serve

# Commit and push
git add .
git commit -m "type: description"
git push origin main

# Deployment automatic!
```

### Feature Branch Workflow (For Big Changes)

```bash
# Create feature branch
git checkout -b feature/new-design

# Make changes and test

# Commit
git add .
git commit -m "design: new homepage layout"

# Push feature branch
git push origin feature/new-design

# Merge when ready
git checkout main
git merge feature/new-design
git push origin main
```

See `GIT_WORKFLOW.md` for detailed Git practices.

## Resources

### Documentation
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Markdown Guide](https://www.markdownguide.org/)

### This Repository
- **DEPLOYMENT.md** - Detailed deployment guide
- **GIT_WORKFLOW.md** - Git best practices
- **THEME-SETUP.md** - Design customization
- **MATH_RENDERING_GUIDE.md** - Math equations

### Useful Commands

```bash
# Local development
bundle exec jekyll serve           # Start server
bundle exec jekyll serve --drafts  # Include drafts
bundle exec jekyll clean           # Clean build
bundle exec jekyll doctor          # Check config

# Git
git status                         # Check status
git log --oneline                  # View history
git diff                          # View changes

# Dependencies
bundle install                     # Install gems
bundle update                      # Update gems
bundle outdated                    # Check outdated
```

## Getting Help

1. **Deployment issues** → See DEPLOYMENT.md troubleshooting section
2. **Git questions** → See GIT_WORKFLOW.md
3. **Design changes** → See THEME-SETUP.md
4. **Math rendering** → See MATH_RENDERING_GUIDE.md
5. **Build errors** → Check GitHub Actions logs

## Next Steps After Deployment

1. **Customize design**
   - Edit colors in `assets/css/_sass/_variables.scss`
   - Update layouts in `_layouts/`
   - Modify header/footer in `_includes/`

2. **Write content**
   - Create posts in `_posts/`
   - Update about page in `_pages/about.md`
   - Add new pages as needed

3. **Optimize**
   - Add Google Analytics (optional)
   - Configure comments (optional)
   - Set up custom domain (optional)
   - Enable Dependabot for security updates

4. **Maintain**
   - Monitor GitHub Actions for failed builds
   - Keep dependencies updated monthly
   - Backup repository regularly

## Success!

Once you complete these steps, you'll have:

- A fully functional Jekyll blog
- Automated deployment with GitHub Actions
- Professional theme with responsive design
- Math rendering capabilities
- SEO optimization
- Clean Git workflow
- Comprehensive documentation

**Start deploying now by following Step 1 above!**

For detailed information, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **GIT_WORKFLOW.md** - Git workflows and best practices

Happy blogging!
