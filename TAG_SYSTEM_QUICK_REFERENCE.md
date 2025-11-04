# Tag System Quick Reference

## Quick Start

### Add Tags to a Post
```yaml
---
title: "My Post"
tags: [Jekyll, Tutorial, Web Development]
---
```

### Use Tag Component in Templates
```liquid
<!-- Show all tags -->
{% include tag-list.html tags=post.tags %}

<!-- Compact with limit -->
{% include tag-list.html tags=post.tags compact=true limit=3 %}

<!-- With label -->
{% include tag-list.html tags=post.tags show_label=true %}
```

## File Locations

| Component | Path |
|-----------|------|
| Tag component | `_includes/tag-list.html` |
| Tag page layout | `_layouts/tag.html` |
| Tags index | `_pages/tags.md` |
| Tag styles | `_sass/_components.scss` (lines 59-313) |
| Navigation | `_data/navigation.yml` |

## Component Parameters

| Parameter | Type | Default | Example |
|-----------|------|---------|---------|
| `tags` | Array | (required) | `tags=post.tags` |
| `compact` | Boolean | `false` | `compact=true` |
| `limit` | Integer | none | `limit=3` |
| `show_label` | Boolean | `false` | `show_label=true` |
| `current_tag` | String | none | `current_tag=page.title` |

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.tag-list` | Container for tags |
| `.tag-list-compact` | Compact spacing |
| `.tag` | Individual tag badge |
| `.tag-active` | Highlighted tag |
| `.tag-with-count` | Tag with post count |
| `.tags-grid` | Grid layout on index |

## URL Structure

| Page | URL |
|------|-----|
| Tags index | `/tags/` |
| Individual tag | `/tags/[tag-name]/` |

## Customization Quick Tips

### Change Tag Color
```scss
// _sass/_components.scss
.tag {
  color: $color-accent;
  background-color: rgba($color-accent, 0.1);
  border-color: rgba($color-accent, 0.2);
}
```

### Remove Hashtag Icon
```scss
// _sass/_components.scss
.tag {
  &::before {
    content: ""; // Empty = no icon
  }
}
```

### Change Tag Shape
```scss
// _sass/_components.scss
.tag {
  border-radius: 999px; // Pill shape
  // or
  border-radius: 0; // Square
}
```

### Adjust Tag Limit
```liquid
<!-- _layouts/home.html -->
{% include tag-list.html tags=post.tags limit=5 %}
                                             ↑ Change number
```

## Responsive Breakpoints

| Screen | Columns | Width |
|--------|---------|-------|
| Mobile | 1 | < 576px |
| Tablet | 2-3 | 576px - 1024px |
| Desktop | 4 | > 1024px |

## Common Tasks

### Switch to Alphabetical Layout
1. Open `_pages/tags.md`
2. Comment out grid section
3. Uncomment alphabetical section
4. Rebuild site

### Switch to Tag Cloud Layout
1. Open `_pages/tags.md`
2. Comment out grid section
3. Uncomment tag cloud section
4. Rebuild site

### Add Tag to Post
```yaml
---
title: "My Post"
tags:
  - Jekyll
  - Tutorial
  - New Tag Here  ← Add here
---
```

### Build and Test
```bash
bundle exec jekyll serve
# Visit: http://localhost:4000/tags/
```

## Accessibility Checklist

- [x] Keyboard navigable (Tab key)
- [x] Focus states visible
- [x] ARIA labels present
- [x] Semantic HTML
- [x] Color contrast WCAG AA
- [x] Screen reader friendly

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tags not showing | Check post front matter has `tags:` |
| Tag pages not generating | Verify `jekyll-tagging` plugin in `_config.yml` |
| Styling broken | Check Sass compiles without errors |
| Mobile layout issues | Clear browser cache, check viewport meta tag |

## Performance Tips

- Static generation = Fast load times
- No JavaScript required
- Minimal CSS (~2KB)
- Optimized for Core Web Vitals

## Support Resources

- **Full Documentation**: `TAG_SYSTEM_DOCUMENTATION.md`
- **Visual Mockup**: `TAG_SYSTEM_VISUAL_MOCKUP.md`
- **Jekyll Docs**: https://jekyllrb.com
- **Plugin Docs**: https://github.com/pattex/jekyll-tagging

---

**Version**: 1.0
**Last Updated**: November 3, 2025
