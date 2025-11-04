# GitHub Comments Setup Guide

This guide will help you set up GitHub-based comments (Giscus) for your Jekyll blog.

## Table of Contents

1. [Overview](#overview)
2. [Why Giscus?](#why-giscus)
3. [Prerequisites](#prerequisites)
4. [Setup Steps](#setup-steps)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Security & Privacy](#security--privacy)

---

## Overview

Your blog now supports GitHub-based commenting using **Giscus**, which allows visitors to:
- Sign in with their GitHub account
- Leave comments on blog posts
- Reply to other comments (threaded discussions)
- React to comments with emoji reactions
- Edit or delete their own comments

All comments are stored in your GitHub repository's Discussions section.

---

## Why Giscus?

**Advantages:**
- Uses GitHub Discussions (cleaner than Issues for comments)
- Threaded replies for better conversations
- Emoji reactions (👍 ❤️ 🎉 🚀 etc.)
- Free and open-source
- No ads or tracking
- Excellent moderation tools via GitHub
- Fast loading with lazy loading support
- Multiple themes including auto dark mode

**Comparison with alternatives:**
- **vs Utterances**: More features (reactions, threads), uses Discussions instead of Issues
- **vs Disqus**: No ads, no tracking, no third-party data collection, free forever
- **vs Native solution**: No backend server needed, leverages GitHub's infrastructure

---

## Prerequisites

Before setting up comments, ensure:

1. **Public GitHub Repository**
   - Your blog's repository must be public
   - You must have admin access to the repository

2. **GitHub Discussions Enabled**
   - Discussions must be enabled on your repository

3. **Giscus App Installed**
   - The Giscus GitHub App must be installed

---

## Setup Steps

### Step 1: Enable GitHub Discussions

1. Go to your blog's GitHub repository
2. Click on **Settings** (repository settings, not account settings)
3. Scroll down to **Features** section
4. Check the box next to **Discussions**
5. Click **Set up discussions** if prompted

### Step 2: Create a Discussion Category for Comments

1. Go to the **Discussions** tab in your repository
2. Click on the pencil icon next to **Categories** (on the right sidebar)
3. Click **New category**
4. Configure:
   - **Category name**: `Comments` (or your preferred name)
   - **Description**: `Comments from blog posts`
   - **Discussion format**: Choose `Announcement` format
     - This is recommended as it allows only repository owners to create discussions
     - Blog posts will auto-create discussions
     - Visitors can still comment and reply
5. Click **Create**

### Step 3: Install Giscus App

1. Visit https://github.com/apps/giscus
2. Click **Install**
3. Choose your blog repository
4. Grant the necessary permissions
5. Complete the installation

### Step 4: Get Your Configuration Values

1. Visit https://giscus.app
2. Fill in the configuration form:

   **Repository:**
   - Enter your repository in format: `username/repository-name`
   - Example: `johndoe/blog`
   - Giscus will verify the repository is eligible

   **Page ↔️ Discussions Mapping:**
   - Choose **pathname** (recommended)
   - This maps each blog post URL path to a unique discussion

   **Discussion Category:**
   - Select the `Comments` category you created earlier
   - Use the dropdown to select it

   **Features:**
   - Enable reactions: ✓ (recommended)
   - Place the comment box above/below comments: Choose your preference
   - Load comments lazily: ✓ (recommended for performance)

   **Theme:**
   - Choose `preferred_color_scheme` (recommended - respects user's system theme)
   - Alternatives: `light`, `dark`, `dark_dimmed`, etc.

3. **Copy the configuration values** shown in the "Enable giscus" section:
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

### Step 5: Update Your _config.yml

1. Open `/Users/ybang_mac/Development/blog/_config.yml`

2. Find the `comments:` section (around line 127)

3. Update the Giscus configuration values:

```yaml
comments:
  provider: giscus

  giscus:
    repo: "username/blog"              # Replace with your repo
    repo_id: "R_kgDOxxxxxxxxx"         # Copy from giscus.app
    category: "Comments"               # Your category name
    category_id: "DIC_kwDOxxxxxxxx"   # Copy from giscus.app
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

4. Save the file

---

## Configuration

### Configuration Options Explained

| Option | Description | Recommended Value |
|--------|-------------|-------------------|
| `repo` | Your GitHub repository (owner/repo format) | Your actual repo |
| `repo_id` | Repository ID from giscus.app | From giscus.app |
| `category` | Discussion category name | `Comments` |
| `category_id` | Category ID from giscus.app | From giscus.app |
| `mapping` | How URLs map to discussions | `pathname` |
| `strict` | Use strict title matching | `0` (disabled) |
| `reactions_enabled` | Allow emoji reactions | `1` (enabled) |
| `emit_metadata` | Send metadata to parent | `0` (disabled) |
| `input_position` | Comment box placement | `bottom` or `top` |
| `theme` | Visual theme | `preferred_color_scheme` |
| `lang` | Interface language | `en` |
| `loading` | Loading strategy | `lazy` |
| `crossorigin` | CORS policy | `anonymous` |

### Alternative Mapping Options

You can change `mapping` to:
- `pathname` (recommended) - Uses URL path
- `url` - Uses full URL
- `title` - Uses post title
- `og:title` - Uses OpenGraph title

**Recommendation:** Use `pathname` for stability. If you change post titles or URLs in the future, pathname is most reliable.

---

## Usage

### Enable Comments on All Posts (Default)

Comments are enabled by default for all posts (configured in `_config.yml` defaults).

### Disable Comments on Specific Posts

Add to post front matter:

```yaml
---
title: "My Post Title"
date: 2025-11-02
comments: false
---
```

### Enable Comments on Specific Posts Only

1. Change the default in `_config.yml`:

```yaml
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      comments: false  # Disable by default
```

2. Then enable per post:

```yaml
---
title: "My Post Title"
date: 2025-11-02
comments: true
---
```

### Change Comment Provider

To switch to Utterances (alternative):

```yaml
comments:
  provider: utterances  # Change from giscus to utterances

  utterances:
    repo: "username/blog"
    issue_term: "pathname"
    theme: "github-light"
    label: "comment"
```

To disable all comments:

```yaml
comments:
  provider: false  # Disable comments site-wide
```

---

## Testing

### Local Testing

1. **Build the site:**
   ```bash
   cd /Users/ybang_mac/Development/blog
   bundle exec jekyll build
   ```

2. **Serve locally:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

3. **Open browser:**
   - Go to http://localhost:4000
   - Navigate to a blog post
   - Scroll to comments section
   - Verify the Giscus widget loads

**Note:** Comments won't be fully functional locally because:
- The repository mapping uses the production URL
- You can see the widget but can't post comments until deployed

### Production Testing

After deploying to GitHub Pages:

1. **Visit your blog post** on the live site
2. **Scroll to comments section**
3. **Click "Sign in with GitHub"**
4. **Authorize the Giscus app** (first time only)
5. **Write a test comment**
6. **Verify:**
   - Comment appears immediately
   - A new discussion is created in your repository's Discussions
   - Reactions work
   - Replies work

### Verify GitHub Discussions

1. Go to your repository on GitHub
2. Click **Discussions** tab
3. Click on **Comments** category
4. You should see a discussion for each post with comments

---

## Troubleshooting

### Comments Widget Not Showing

**Problem:** Comments section is empty or shows an error.

**Solutions:**

1. **Check _config.yml configuration:**
   ```bash
   cd /Users/ybang_mac/Development/blog
   cat _config.yml | grep -A 20 "comments:"
   ```
   - Verify `provider: giscus` is set
   - Verify all required fields are filled
   - Verify no extra quotes around values

2. **Verify repository is public:**
   - Giscus only works with public repositories
   - Go to repository Settings → General → Danger Zone
   - Ensure visibility is "Public"

3. **Verify Discussions are enabled:**
   - Go to repository Settings → Features
   - Ensure "Discussions" is checked

4. **Check browser console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for Giscus-related errors

### "Discussion category not found" Error

**Problem:** Giscus shows an error about missing category.

**Solutions:**

1. **Verify category exists:**
   - Go to repository Discussions
   - Check if the category matches `_config.yml`
   - Category names are case-sensitive

2. **Verify category_id is correct:**
   - Go back to https://giscus.app
   - Re-enter your repository
   - Copy the category_id again
   - Update `_config.yml`

### Comments Not Appearing After Posting

**Problem:** You posted a comment but it doesn't show up.

**Solutions:**

1. **Refresh the page** - Giscus should update in real-time, but try refreshing

2. **Check GitHub Discussions:**
   - Go to repository → Discussions → Comments
   - Verify the discussion was created
   - Verify your comment is there

3. **Check repository permissions:**
   - Ensure Giscus app has proper access
   - Visit https://github.com/apps/giscus
   - Click Configure
   - Verify your repository is selected

### Slow Loading or Performance Issues

**Problem:** Comments take too long to load.

**Solutions:**

1. **Enable lazy loading** (already configured):
   ```yaml
   loading: "lazy"
   ```

2. **Check internet connection** - Giscus loads from external CDN

3. **Verify no ad blockers** - Some ad blockers may interfere

4. **Check giscus.app status:**
   - Visit https://www.githubstatus.com
   - Check if GitHub APIs are operational

### Comments Showing on Wrong Posts

**Problem:** Comments from one post appear on another post.

**Solutions:**

1. **Verify mapping is set correctly:**
   ```yaml
   mapping: "pathname"
   ```

2. **Check post permalinks:**
   - Ensure posts have unique permalinks
   - Check `_config.yml` permalink setting

3. **Manually map discussions** (advanced):
   - You can use `og:title` or `title` mapping
   - Or manually create discussions for each post

---

## Security & Privacy

### What Data is Collected?

**By Giscus:**
- GitHub username (when signed in)
- Comment content
- Timestamp of comments
- Reactions and interactions

**By GitHub:**
- Standard GitHub authentication data
- Discussion participation

**NOT collected:**
- Analytics or tracking cookies
- User behavior outside of comments
- Personal data beyond GitHub profile

### Who Can See Comments?

- **Anyone** can read comments (they're in public GitHub Discussions)
- **Only signed-in GitHub users** can post comments
- **Repository owners** can moderate all comments

### Moderation

**As the repository owner, you can:**

1. **Delete any comment:**
   - Go to Discussions → Comments
   - Find the discussion
   - Click "..." on any comment → Delete

2. **Lock discussions:**
   - Prevent further comments on specific posts
   - Click "Lock conversation" in the discussion

3. **Hide comments:**
   - Mark comments as spam or off-topic
   - GitHub will hide them from view

4. **Block users:**
   - Go to repository Settings → Moderation
   - Block users who violate guidelines

5. **Pin comments:**
   - Highlight important comments
   - Click "Pin" on any comment

### Security Considerations

**Safe:**
- Giscus is open-source and auditable
- Uses GitHub's OAuth (secure authentication)
- No third-party tracking or ads
- Comments stored in your own repository

**Best Practices:**
1. **Monitor comments regularly** - Check Discussions weekly
2. **Create a Code of Conduct** - Add `CODE_OF_CONDUCT.md` to your repo
3. **Enable moderation tools** - Use GitHub's built-in moderation
4. **Report abuse** - Use GitHub's reporting features for serious issues

### Privacy for Commenters

**What visitors should know:**
- Signing in requires a GitHub account
- Comments are public and permanent (unless deleted)
- GitHub username and profile will be visible
- Reactions and replies are public

**Add a privacy notice** (optional):

Create `/Users/ybang_mac/Development/blog/_includes/comments-notice.html`:

```html
<div class="comments-privacy-notice">
  <p><small>
    By commenting, you agree to the <a href="{{ site.baseurl }}/code-of-conduct">Code of Conduct</a>.
    Comments are public and stored via <a href="https://github.com/{{ site.comments.giscus.repo }}/discussions" target="_blank">GitHub Discussions</a>.
  </small></p>
</div>
```

Then add it to `_includes/comments.html` above the Giscus script.

---

## Advanced Configuration

### Custom Themes

Create a custom theme by specifying a theme URL:

```yaml
theme: "https://example.com/custom-giscus-theme.css"
```

### Multiple Languages

Change the interface language:

```yaml
lang: "es"  # Spanish
lang: "fr"  # French
lang: "zh-CN"  # Simplified Chinese
```

See full list: https://github.com/giscus/giscus/tree/main/locales

### Automatic Theme Switching

To match your site's theme:

1. Use `preferred_color_scheme` in config (already set)
2. Or add JavaScript to switch themes dynamically:

```javascript
// Add to your site's JavaScript
function setGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }
}

// Call when your theme changes
document.getElementById('theme-toggle').addEventListener('click', () => {
  const newTheme = getCurrentTheme(); // Your theme detection
  setGiscusTheme(newTheme);
});
```

---

## Migrating from Other Systems

### From Disqus

1. **Export Disqus comments:**
   - Go to Disqus admin panel
   - Export comments as XML

2. **Import to GitHub Discussions:**
   - Currently no automated tool
   - Manual migration required
   - Or keep both systems temporarily

3. **Update config:**
   - Change `provider: disqus` to `provider: giscus`
   - Configure Giscus settings

### From Utterances

1. **Update config only:**
   - Change `provider: utterances` to `provider: giscus`
   - Add Giscus configuration

2. **Existing comments:**
   - Utterances comments are in GitHub Issues
   - Giscus uses GitHub Discussions
   - Comments won't automatically transfer
   - Keep Utterances for old posts, Giscus for new posts

---

## FAQ

**Q: Do visitors need a GitHub account to read comments?**
A: No, anyone can read comments. GitHub account is only needed to post.

**Q: Can I use Giscus on a private repository?**
A: No, Giscus requires a public repository. For private repos, consider alternatives like Staticman or a custom backend.

**Q: Will comments slow down my site?**
A: No, Giscus uses lazy loading and loads asynchronously. It won't block page rendering.

**Q: Can I customize the appearance?**
A: Yes, you can use custom CSS to style the container, and Giscus supports multiple themes.

**Q: What happens if Giscus shuts down?**
A: Your comments are safe in GitHub Discussions. You can always export them or use a different widget to display them.

**Q: Can I disable comments on specific posts?**
A: Yes, add `comments: false` to the post's front matter.

**Q: How do I moderate spam?**
A: Delete or hide comments directly in GitHub Discussions. You can also block users.

**Q: Can I import existing comments?**
A: There's no built-in import tool. Comments must be manually recreated in Discussions or left in the old system.

---

## Support

**Giscus Issues:**
- GitHub: https://github.com/giscus/giscus/issues
- Documentation: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md

**Jekyll Issues:**
- Documentation: https://jekyllrb.com/docs/
- Forum: https://talk.jekyllrb.com/

**GitHub Pages Issues:**
- Documentation: https://docs.github.com/pages
- Support: https://support.github.com/

---

## Quick Reference

### Essential Commands

```bash
# Build site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Check for errors
bundle exec jekyll doctor

# View configuration
bundle exec jekyll build --verbose
```

### Key Files

- **Configuration:** `/Users/ybang_mac/Development/blog/_config.yml`
- **Comments component:** `/Users/ybang_mac/Development/blog/_includes/comments.html`
- **Post layout:** `/Users/ybang_mac/Development/blog/_layouts/post.html`
- **This guide:** `/Users/ybang_mac/Development/blog/COMMENTS_SETUP_GUIDE.md`

### Quick Config Check

```bash
# Check if provider is set
grep "provider:" /Users/ybang_mac/Development/blog/_config.yml

# Check Giscus configuration
grep -A 15 "giscus:" /Users/ybang_mac/Development/blog/_config.yml
```

---

**You're all set!** Follow the setup steps above, and your blog will have GitHub-based comments powered by Giscus. If you encounter any issues, refer to the Troubleshooting section or reach out for support.
