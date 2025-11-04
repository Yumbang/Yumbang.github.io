# Giscus Comments - Quick Start Guide

## 5-Minute Setup

### Step 1: Enable GitHub Discussions (1 min)

1. Go to your repository on GitHub
2. Settings → Features → Check "Discussions"
3. Click "Set up discussions"

### Step 2: Create Comments Category (1 min)

1. Go to Discussions tab
2. Click pencil icon next to Categories
3. New category:
   - Name: `Comments`
   - Format: `Announcement`
4. Create

### Step 3: Install Giscus App (1 min)

1. Visit: https://github.com/apps/giscus
2. Install
3. Select your blog repository
4. Authorize

### Step 4: Get Configuration (2 min)

1. Visit: https://giscus.app
2. Enter your repository: `username/repository`
3. Select the `Comments` category
4. Choose:
   - Mapping: `pathname`
   - Theme: `preferred_color_scheme`
   - Loading: `lazy`
5. Copy these values:
   - `data-repo-id`
   - `data-category-id`

### Step 5: Update _config.yml (1 min)

Open `_config.yml` and update (around line 133):

```yaml
comments:
  provider: giscus

  giscus:
    repo: "your-username/your-repo"     # ← Update this
    repo_id: "R_kgDOxxxxxxxxx"          # ← Paste from giscus.app
    category: "Comments"                # ← Match your category name
    category_id: "DIC_kwDOxxxxxxxx"    # ← Paste from giscus.app
    # Rest of the settings are already configured
```

### Step 6: Deploy and Test

```bash
# Commit changes
git add _config.yml
git commit -m "config: add Giscus comments"
git push

# Wait for GitHub Pages to deploy (2-3 minutes)
# Visit your blog and scroll to comments on any post
```

---

## Control Comments Per Post

### Disable comments on specific post:

```yaml
---
title: "My Post Without Comments"
comments: false
---
```

### Enable comments (default):

```yaml
---
title: "My Post With Comments"
comments: true
---
```

Or simply omit `comments:` - it's enabled by default.

---

## Troubleshooting

**Comments not showing?**
1. Check repository is **public**
2. Verify Discussions are **enabled**
3. Confirm category name **matches exactly** (case-sensitive)
4. Check browser console for errors (F12)

**"Category not found" error?**
1. Go back to https://giscus.app
2. Re-select your repository
3. Copy the `category-id` again
4. Update `_config.yml`

**Need help?**
See full guide: `COMMENTS_SETUP_GUIDE.md`

---

## Quick Reference

**Config location:** `_config.yml` (line ~125)

**Comments component:** `_includes/comments.html`

**Post layout:** `_layouts/post.html`

**Documentation:** https://giscus.app

**GitHub App:** https://github.com/apps/giscus

---

## Example Values

Your config should look like this when filled in:

```yaml
comments:
  provider: giscus

  giscus:
    repo: "johndoe/blog"
    repo_id: "R_kgDOH1234567"
    category: "Comments"
    category_id: "DIC_kwDOH1234567890"
    mapping: "pathname"
    strict: "0"
    reactions_enabled: "1"
    emit_metadata: "0"
    input_position: "bottom"
    theme: "preferred_color_scheme"
    lang: "en"
    loading: "lazy"
    crossorigin: "anonymous"
```

The only values you need to change are:
- `repo`
- `repo_id`
- `category` (if you named it something other than "Comments")
- `category_id`

Everything else is already configured optimally.
