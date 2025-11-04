# Inline Comments User Guide

Welcome to the inline commenting system for your Jekyll blog! This feature allows readers to comment on specific paragraphs in your blog posts, making discussions more contextual and organized.

## Table of Contents

- [What Are Inline Comments?](#what-are-inline-comments)
- [How It Works](#how-it-works)
- [Using Inline Comments as a Reader](#using-inline-comments-as-a-reader)
- [Using Inline Comments as a Blog Author](#using-inline-comments-as-a-blog-author)
- [Configuration](#configuration)
- [Disabling Inline Comments](#disabling-inline-comments)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)

## What Are Inline Comments?

Inline comments allow readers to comment on specific paragraphs in your blog posts, rather than just leaving general comments at the bottom. This creates more focused discussions and makes it easier to reference specific parts of your content.

**Key Features:**

- Comment on individual paragraphs
- See all comments for a specific paragraph in context
- Navigate from comments section to the referenced paragraph
- Works seamlessly with existing Giscus/GitHub Discussions
- Fully responsive (desktop and mobile)
- Accessible and keyboard-friendly

## How It Works

### For Readers (Desktop)

1. **Hover over any paragraph** in a blog post
2. A **comment icon (💬)** appears in the left margin
3. **Click the icon** to open a popover dialog
4. **Type your comment** in the text field
5. **Click "Comment"** to post (requires GitHub login)
6. Your comment appears both in the paragraph popover and in the main comments section

### For Readers (Mobile)

1. **Comment icons are always visible** next to paragraphs
2. **Tap an icon** to open a full-screen modal
3. **Type and submit** your comment
4. Comments sync with the desktop experience

### Comment Storage

- All comments are stored in **GitHub Discussions** via Giscus
- Comments include hidden metadata about which paragraph they reference
- Inline comments and regular comments coexist in the same discussion thread
- No separate database or storage required

## Using Inline Comments as a Reader

### Posting an Inline Comment

1. **Find the paragraph** you want to comment on
2. **Click the comment icon** (💬) that appears on hover (desktop) or is always visible (mobile)
3. **Sign in with GitHub** if you haven't already (handled by Giscus)
4. **Type your comment** in the text field
5. **Click "Comment"** to post

Your comment will:
- Appear in the inline popover for that paragraph
- Show up in the main comments section with a citation showing which paragraph you commented on
- Include a "View in context" link that scrolls to the paragraph

### Viewing Existing Comments

**In-context viewing:**
- Paragraphs with comments have a blue left border and subtle background highlight
- Click the comment icon to see all comments on that paragraph
- Comment count badge shows number of comments

**In the comments section:**
- Inline comments appear with a special citation block
- Citation shows the first 200 characters of the paragraph
- "View in context" link scrolls to the paragraph and opens the popover

### Navigating to Paragraphs

Click the **"View in context ↗"** link in any inline comment citation:
1. Page smoothly scrolls to the referenced paragraph
2. Paragraph briefly flashes with a highlight animation
3. Comment popover automatically opens

## Using Inline Comments as a Blog Author

### Enabling for All Posts

Inline comments are enabled by default for all posts if configured in `_config.yml`:

```yaml
inline_comments:
  enabled: true
```

### Disabling for Specific Posts

To disable inline comments on a specific post, add this to the post's front matter:

```yaml
---
title: "My Post Title"
inline_comments: false
---
```

### Monitoring Inline Comments

Inline comments appear in your GitHub Discussions just like regular comments. To identify them:

1. Go to your blog's GitHub Discussions
2. Find the discussion for the post
3. Inline comments contain hidden metadata (invisible in the UI)
4. They appear mixed with regular comments

### Responding to Inline Comments

You can respond to inline comments directly in GitHub Discussions or in the inline popover on your blog.

## Configuration

The inline commenting system can be customized in `_config.yml`:

```yaml
inline_comments:
  enabled: true                   # Enable/disable globally
  provider: "giscus"              # Must match comments.provider
  min_paragraph_length: 50        # Minimum characters to make paragraph commentable
  max_citation_length: 200        # Maximum characters in citation preview
  icon_position: "left"           # Icon position: "left" or "right"
  popover_position: "right"       # Desktop popover: "right" or "left"
```

### Configuration Options Explained

**`enabled`** (boolean, default: `true`)
- Set to `false` to disable inline comments site-wide
- Individual posts can override with `inline_comments: false` in front matter

**`provider`** (string, default: `"giscus"`)
- Must match your `comments.provider` setting
- Currently only Giscus is supported
- Future support for other providers may be added

**`min_paragraph_length`** (integer, default: `50`)
- Minimum characters a paragraph must have to be commentable
- Prevents comment icons on very short paragraphs
- Recommended: 40-100

**`max_citation_length`** (integer, default: `200`)
- Maximum characters shown in paragraph citation in comments section
- Longer paragraphs are truncated with "..."
- Recommended: 150-300

**`icon_position`** (string, default: `"left"`)
- Where to show comment icon in paragraph margin
- Options: `"left"` or `"right"`
- Left is recommended for left-to-right languages

**`popover_position`** (string, default: `"right"`)
- Where to show popover on desktop relative to paragraph
- Options: `"right"` or `"left"`
- Automatically flips if it would go off-screen

## Disabling Inline Comments

### Site-Wide

In `_config.yml`:

```yaml
inline_comments:
  enabled: false
```

### For Specific Post

In post front matter:

```yaml
---
title: "My Post Title"
inline_comments: false
---
```

### Temporarily

To temporarily disable without changing configuration:
1. Remove or comment out the inline comments script tag in `_layouts/post.html`
2. Rebuild your site

## FAQ

### Do readers need a GitHub account to comment?

Yes. Inline comments use the same authentication as your existing Giscus setup, which requires GitHub login.

### Can I style the comment icons and popovers?

Yes! All styles are in `_sass/_inline-comments.scss`. You can customize colors, sizes, animations, and more.

### Will inline comments work with Utterances or Disqus?

Currently, inline comments only work with Giscus. Support for other providers may be added in the future.

### Do inline comments affect page load performance?

Minimal impact. The JavaScript is loaded only on post pages and is lightweight (~15KB). Styles are compiled into your main CSS bundle.

### Can I comment on headings or code blocks?

By default, only paragraphs (`<p>`), blockquotes, and list items are commentable. You can customize this in the JavaScript configuration.

### What if I delete a paragraph that has comments?

The comments remain in GitHub Discussions with the citation text preserved. They won't link back to the paragraph anymore, but the content is not lost.

### Are inline comments accessible?

Yes! The system includes:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Sufficient color contrast
- Focus indicators

### Can I export inline comments?

Yes. All comments are stored in GitHub Discussions and can be exported using GitHub's API or export features.

## Troubleshooting

### Comment icons don't appear

**Check:**
1. Is `inline_comments.enabled: true` in `_config.yml`?
2. Is the post's `inline_comments` not set to `false`?
3. Are paragraphs long enough (>50 characters by default)?
4. Did you rebuild the Jekyll site after configuration changes?
5. Check browser console for JavaScript errors

**Solution:**
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

### Comments don't post

**Check:**
1. Is Giscus properly configured in `_config.yml`?
2. Are you signed in to GitHub?
3. Do you have permission to comment in the GitHub Discussion?
4. Check browser console for errors

**Solution:**
- Test posting a regular comment first to verify Giscus works
- Check GitHub repository discussion settings
- Verify Giscus repository and category IDs are correct

### Popover appears in wrong position

**Issue:** Popover is cut off or positioned incorrectly

**Solution:**
1. The popover should auto-adjust if it would go off-screen
2. If not, try changing `popover_position` in config from `"right"` to `"left"`
3. On mobile, popover is always full-width at bottom (by design)

### Comments count doesn't update

**Issue:** Comment count badge doesn't show correct number

**Solution:**
- Refresh the page to reload comments from Giscus
- Check browser console for errors loading Giscus
- Verify Giscus configuration is correct

### Styles don't apply

**Check:**
1. Is `@import "inline-comments";` in `assets/css/main.scss`?
2. Did you rebuild Jekyll after adding styles?
3. Check browser inspector for CSS errors

**Solution:**
```bash
bundle exec jekyll clean
bundle exec jekyll serve --livereload
```

### Dark mode doesn't work

**Check:**
1. Are you using CSS custom properties correctly?
2. Is `[data-theme="dark"]` selector working on your site?

**Solution:**
- All colors should use `var(--color-*)` custom properties
- Check `_sass/_variables.scss` for dark theme definitions
- Test by manually setting `data-theme="dark"` on `<html>` element

### Mobile modal doesn't close

**Issue:** On mobile, tapping outside modal doesn't close it

**Solution:**
- Tap the X button in header
- Tap the Cancel button
- Press the Escape key (if using keyboard)
- Refresh page if modal is stuck

### JavaScript errors in console

**Common errors and fixes:**

**"Cannot read property of null"**
- Check that all required HTML elements exist
- Verify Giscus is loading correctly
- Check that post-content class exists

**"Giscus not ready"**
- This is normal during page load
- If persists, check Giscus configuration
- Verify Giscus script loads (check Network tab)

**"Failed to post comment"**
- Check GitHub authentication
- Verify repository permissions
- Check Giscus repository settings

---

## Getting Help

If you encounter issues not covered here:

1. **Check browser console** for error messages
2. **Review GitHub Discussions** for similar issues
3. **Test with minimal configuration** to isolate the problem
4. **Verify Giscus works** without inline comments first
5. **Check Jekyll build output** for warnings

For bugs or feature requests, open an issue in your blog's repository with:
- Browser and version
- Steps to reproduce
- Console error messages
- Your configuration (without sensitive data)

---

**Enjoy more contextual and organized discussions with inline comments!**
