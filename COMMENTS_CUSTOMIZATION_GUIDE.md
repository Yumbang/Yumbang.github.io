# Comments Customization Guide

## Overview

Your blog now has a fully integrated GitHub-based commenting system that supports both **Utterances** and **Giscus**. This guide explains how to customize and use the commenting system.

---

## Visual Design

### Layout

The comments section appears after the post navigation with:

- **Clear visual separation**: 2px border-top with generous spacing (96px margin-top)
- **Centered header**: "Comments" heading with descriptive subtitle
- **Professional appearance**: Matches blog's existing color palette and typography
- **Smooth animation**: Subtle fade-in-up effect (respects prefers-reduced-motion)

### Responsive Design

The comments section is fully responsive:

- **Mobile (< 768px)**: Full-width layout with reduced spacing
- **Tablet/Desktop (≥ 768px)**: Centered content with optimal padding
- **All sizes**: Comment widget scales appropriately

### Typography

- **Title**: H1 size on desktop (2rem), H2 on mobile (1.75rem)
- **Subtitle**: Larger size (1.125rem) on desktop for better readability
- **Colors**: Primary color (#2563eb) for headings, muted gray (#64748b) for subtitle

---

## Features Included

### 1. Dual Provider Support

Choose between two excellent GitHub-based commenting systems:

**Utterances**
- Lightweight (~1KB)
- GitHub Issues-based
- Simple setup
- Fast loading

**Giscus**
- GitHub Discussions-based
- More features (reactions, replies, sorting)
- Rich interaction
- Slightly larger

### 2. Conditional Loading

Comments only load when:
- Post has `comments: true` in front matter (or `comments` not set to `false`)
- A commenting provider is properly configured in `_config.yml`

### 3. Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and section structure
- **ARIA labels**: Accessible navigation to comments
- **Keyboard navigation**: Full keyboard support via embedded widgets
- **Skip link**: Optional skip-to-comments link (commented out by default)
- **NoScript fallback**: Graceful degradation with helpful message

### 4. Loading States

- **Before load**: Shows "Loading comments..." message
- **Widget loads**: Seamless replacement
- **No JavaScript**: Shows helpful noscript message

### 5. Future-Proof Dark Mode Support

CSS includes dark mode styles ready for when you implement theme switching:

```scss
[data-theme="dark"] {
  .comments-section { /* dark styles */ }
}
```

---

## Customization Options

### Color Scheme

All colors use the existing variable system from `_sass/_variables.scss`:

```scss
// Modify these in _variables.scss to change comment section colors
$color-primary: #2563eb;      // Title and links
$color-text-light: #64748b;   // Subtitle color
$color-border: #e2e8f0;       // Separator border
$color-dark: #1e293b;         // Title color
```

### Spacing

Adjust spacing by modifying these variables in `_sass/_components.scss`:

```scss
.comments-section {
  margin-top: $spacing-4xl;    // Space above (96px)
  padding-top: $spacing-3xl;   // Internal padding (64px)
  border-top: 2px solid $color-border;
}

.comments-header {
  margin-bottom: $spacing-3xl; // Space below header (64px)
}
```

### Typography

Modify text sizes in `.comments-header`:

```scss
.comments-title {
  font-size: $font-size-h2;    // Mobile: 1.75rem

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-h1;  // Desktop: 2rem
  }
}

.comments-subtitle {
  font-size: $font-size-base;  // Mobile: 16px

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-large; // Desktop: 18px
  }
}
```

### Animation

To disable or modify the fade-in animation:

```scss
// In _sass/_components.scss, modify or remove:
@media (prefers-reduced-motion: no-preference) {
  .comments-section {
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: 0.2s; // Change delay
  }
}
```

### Border Style

Change the separator appearance:

```scss
.comments-section {
  border-top: 2px solid $color-border; // Adjust width/style/color
}
```

### Header Alignment

Currently centered. To align left:

```scss
.comments-header {
  text-align: left; // Change from center

  .comments-subtitle {
    margin-left: 0;     // Remove auto centering
    margin-right: 0;
  }
}
```

---

## Widget Theme Customization

### Utterances Themes

Available themes (set in `_config.yml`):

```yaml
comments:
  utterances:
    theme: "github-light"  # Options:
    # - github-light (default)
    # - github-dark
    # - github-dark-orange
    # - icy-dark
    # - dark-blue
    # - photon-dark
    # - preferred-color-scheme (auto)
```

### Giscus Themes

Available themes (set in `_config.yml`):

```yaml
comments:
  giscus:
    theme: "preferred_color_scheme"  # Options:
    # - light
    # - dark
    # - dark_dimmed
    # - dark_high_contrast
    # - transparent_dark
    # - preferred_color_scheme (auto)
    # - custom CSS URL
```

---

## Per-Post Control

Control comments on individual posts via front matter:

```yaml
---
title: "My Post"
comments: true   # Enable comments (default if not specified)
---
```

```yaml
---
title: "My Private Post"
comments: false  # Disable comments for this post
---
```

---

## Custom Subtitle Messages

Edit `_includes/comments.html` to customize the subtitle:

```html
<p class="comments-subtitle">
  Your custom message here. <a href="#">Learn more</a>
</p>
```

Examples:
- "Share your thoughts below!"
- "Have questions? Leave a comment!"
- "Join the conversation using your GitHub account."

---

## Widget Container Customization

### Max Width

Constrain the comment widget width:

```scss
.comments-container {
  max-width: 800px;  // Add this
  margin: 0 auto;
}
```

### Background Color

Add a background to make comments stand out:

```scss
.comments-container {
  background-color: $color-background-alt;
  padding: $spacing-xl;
  border-radius: $border-radius-md;
}
```

### Shadow/Border

Add emphasis with shadows:

```scss
.comments-container {
  border: 1px solid $color-border;
  box-shadow: $shadow-md;
  border-radius: $border-radius-md;
  padding: $spacing-xl;
}
```

---

## Advanced Customization

### Add Comment Count Badge

Show number of comments (requires JavaScript):

```html
<!-- In post list or header -->
<a href="#comments" class="comment-count">
  <span class="badge">{{ post.comments_count }}</span> Comments
</a>
```

### Enable Skip-to-Comments Link

Add before post title for keyboard users:

```html
<!-- In _layouts/post.html before article -->
<a href="#comments" class="skip-to-comments">Skip to comments</a>
```

### Custom Loading Message

Modify the loading indicator in `_sass/_components.scss`:

```scss
.comments-container:empty::before {
  content: "Your custom loading message...";
  // Style as needed
}
```

---

## Theme Integration

### Matching Colors to Your Brand

1. Update `_sass/_variables.scss` primary color:
   ```scss
   $color-primary: #your-brand-color;
   ```

2. Comments will automatically inherit:
   - Title link colors
   - Border accents
   - Hover states

### Font Consistency

Comments use your existing font stack:

```scss
// From _variables.scss
$font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...
```

To use a different font for comments:

```scss
.comments-section {
  font-family: $your-custom-font;
}
```

---

## Mobile Optimization

### Touch-Friendly Spacing

Currently optimized with:
- Adequate tap target sizes (44px minimum)
- Comfortable reading distances
- Responsive padding

### Reduce Mobile Spacing

If comments feel too spacious on mobile:

```scss
.comments-section {
  margin-top: $spacing-2xl; // Reduce from 4xl

  @media (min-width: $breakpoint-md) {
    margin-top: $spacing-4xl; // Keep desktop spacing
  }
}
```

---

## Performance Considerations

### Lazy Loading

Both widgets support lazy loading. For Giscus:

```yaml
comments:
  giscus:
    loading: "lazy"  # Load when scrolled into view
```

### Async Loading

Scripts load asynchronously (non-blocking):
```html
<script src="..." async></script>
```

### Conditional Loading

Comments only load on individual post pages, not:
- Homepage
- Archive pages
- Category pages

---

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

### Fallbacks

- **No JavaScript**: Shows noscript message
- **Old browsers**: Graceful degradation
- **Reduced motion**: Animation disabled automatically

---

## Troubleshooting

### Comments Not Appearing

1. Check front matter has `comments: true`
2. Verify provider configured in `_config.yml`
3. Check repository settings (public, correct name)
4. Verify GitHub App is installed

### Styling Issues

1. Clear browser cache
2. Rebuild Jekyll: `bundle exec jekyll clean && bundle exec jekyll build`
3. Check for CSS conflicts in browser DevTools
4. Ensure Sass compiles without errors

### Wrong Theme

1. Check `theme` setting in `_config.yml`
2. Verify widget theme options (see above)
3. Test with `preferred_color_scheme` for auto-detection

---

## Examples

### Minimal Setup

```yaml
# _config.yml
comments:
  provider: utterances
  utterances:
    repo: "username/blog"
```

### Full-Featured Setup

```yaml
# _config.yml
comments:
  provider: giscus
  giscus:
    repo: "username/blog"
    repo_id: "R_xxx"
    category: "Comments"
    category_id: "DIC_xxx"
    mapping: "pathname"
    reactions_enabled: "1"
    theme: "preferred_color_scheme"
    lang: "en"
    loading: "lazy"
```

---

## Visual Preview

### Desktop Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│              ← Previous | Next →            │
│                                             │
├─────────────────────────────────────────────┤  ← 2px border
│                                             │
│                 Comments                    │  ← H1 title
│                                             │
│  Join the discussion via GitHub. Sign in   │  ← Subtitle
│       with your GitHub account...          │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │                                       │ │
│  │       [Comment Widget Loads Here]    │ │
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### Mobile Layout

```
┌──────────────────────┐
│                      │
│    ← Previous        │
│                      │
│    Next →            │
│                      │
├──────────────────────┤
│                      │
│      Comments        │
│                      │
│  Join the discussion │
│  via GitHub...       │
│                      │
│  ┌────────────────┐ │
│  │                │ │
│  │    Widget      │ │
│  │                │ │
│  └────────────────┘ │
│                      │
└──────────────────────┘
```

---

## Best Practices

1. **Keep it simple**: Don't over-customize unless needed
2. **Test responsiveness**: Check on real mobile devices
3. **Match your brand**: Use consistent colors/fonts
4. **Monitor performance**: Check page load times
5. **Maintain accessibility**: Don't remove ARIA labels
6. **Respect user preferences**: Keep reduced-motion support

---

## Support

For issues with:
- **Utterances**: https://github.com/utterance/utterances/issues
- **Giscus**: https://github.com/giscus/giscus/discussions
- **This theme**: Check your `_sass/_components.scss` and `_includes/comments.html`

---

## Summary

You now have a professional, accessible, and fully customizable commenting system that:

- Matches your blog's design
- Works on all devices
- Loads efficiently
- Provides excellent user experience
- Supports future enhancements (dark mode, etc.)

Enjoy your new commenting system!
