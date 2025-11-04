# Tag System Documentation

## Overview

This blog now features a comprehensive tag system that allows visitors to browse posts by topic. The system includes professional styling with hashtag icons, hover effects, and full responsive design.

## Features Implemented

### 1. Tag Display on Posts
- **Location**: Post header (after metadata)
- **Styling**: Pill-shaped badges with hashtag (#) icon
- **Behavior**: Clickable tags that link to individual tag pages
- **File**: `_layouts/post.html`

### 2. Tag Display on Post Cards
- **Location**: Post cards on homepage and archive pages
- **Styling**: Compact version with tag limit
- **Behavior**: Shows up to 3 tags with "+X more" indicator
- **Files**: `_includes/post-card.html`, `_layouts/home.html`

### 3. Individual Tag Pages
- **URL**: `/tags/[tag-name]/`
- **Layout**: `_layouts/tag.html`
- **Features**:
  - Breadcrumb navigation (Home > Tags > [Tag Name])
  - Tag icon in header
  - Post count display
  - List of all posts with that tag
  - Highlighted current tag in post tag lists
  - Back button to all tags

### 4. Tags Index Page
- **URL**: `/tags/`
- **File**: `_pages/tags.md`
- **Features**:
  - Grid layout of all tags with post counts
  - Responsive grid (1-4 columns based on screen size)
  - Tag count badges
  - Alternative layouts available (alphabetical list, tag cloud)

### 5. Navigation Integration
- **File**: `_data/navigation.yml`
- **Link**: "Tags" menu item already configured

## Component Structure

### Reusable Tag List Component
**File**: `_includes/tag-list.html`

This component handles all tag display logic and can be used anywhere in your templates.

#### Usage Examples

```liquid
<!-- Basic usage - shows all tags -->
{% include tag-list.html tags=post.tags %}

<!-- Compact variant with limit -->
{% include tag-list.html tags=post.tags compact=true limit=3 %}

<!-- With label -->
{% include tag-list.html tags=post.tags show_label=true %}

<!-- Highlight current tag (on tag pages) -->
{% include tag-list.html tags=post.tags current_tag=page.title %}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `tags` | Array | (required) | Array of tag strings |
| `compact` | Boolean | `false` | Use compact styling |
| `limit` | Integer | none | Maximum tags to show |
| `show_label` | Boolean | `false` | Show "Tags:" label |
| `current_tag` | String | none | Tag to highlight as active |

## Styling

### CSS Classes

All tag styling is in `_sass/_components.scss`:

#### Main Classes

- `.tag-list` - Container for tag lists
- `.tag-list-compact` - Compact variant
- `.tag` - Individual tag badge
- `.tag-active` - Active/highlighted tag
- `.tag-small` - Small tag variant
- `.tag-large` - Large tag variant
- `.tag-with-count` - Tag with post count badge
- `.tag-cloud` - Tag cloud container
- `.tag-icon` - Hashtag icon in page headers
- `.tags-grid` - Responsive grid for tags index

#### Visual Design

**Tag Badges:**
- **Color**: Primary blue (#2563eb) with 10% opacity background
- **Border**: 1px solid with 20% opacity primary color
- **Padding**: 4px 16px
- **Border radius**: 8px (medium rounded)
- **Icon**: Hashtag (#) symbol before text
- **Hover**: Slightly lifted with shadow, darker border

**Tag with Count:**
- **Layout**: Flex container with tag name + count badge
- **Count Badge**: White text on primary color, rounded pill
- **Hover**: Elevation effect with medium shadow

**Responsive Grid:**
- Mobile: 1 column
- Small (576px+): 2 columns
- Medium (768px+): 3 columns
- Large (1024px+): 4 columns

## Configuration

### Adding Tags to Posts

Add tags to your post front matter:

```yaml
---
title: "My Post Title"
date: 2025-01-01
tags:
  - Jekyll
  - Tutorial
  - Web Development
---
```

Or inline:

```yaml
---
title: "My Post Title"
tags: [Jekyll, Tutorial, Web Development]
---
```

### Jekyll Configuration

Tags are configured in `_config.yml` via the `jekyll-tagging` plugin:

```yaml
plugins:
  - jekyll-tagging

# Tag configuration
tag_page_layout: tag
tag_page_dir: tags
tag_permalink_style: pretty
```

## Accessibility Features

### Keyboard Navigation
- All tags are keyboard accessible with Tab key
- Focus states with visible outline
- Active state clearly indicated

### Screen Readers
- Proper ARIA labels on tag lists (`role="list"`, `aria-label="Post tags"`)
- Tag counts include full text ("5 posts")
- Breadcrumb navigation with `aria-label="Breadcrumb"`
- Semantic HTML throughout

### Color Contrast
- Tag text meets WCAG AA contrast ratio (4.5:1)
- Hover states enhance visibility
- Active tags use high contrast (white on blue)

## Responsive Design

### Mobile (< 576px)
- Tags wrap naturally
- Comfortable tap targets (minimum 44x44px)
- Single column grid on tags index
- Compact spacing to save screen space

### Tablet (576px - 1024px)
- 2-3 column grid on tags index
- Comfortable spacing
- Optimized for touch

### Desktop (1024px+)
- 4 column grid on tags index
- Hover effects fully functional
- Optimal spacing for mouse interaction

## Alternative Layouts

The tags index page (`_pages/tags.md`) includes commented-out alternative layouts you can switch to:

### 1. Current Layout: Grid with Count Badges
Best for: Modern, visual appeal
```
[#Jekyll 12] [#Tutorial 8] [#CSS 15]
[#Design 5]  [#Ruby 7]     [#Git 9]
```

### 2. Alphabetical List (Commented Out)
Best for: Many tags, easy scanning
```
A
#API (3)  #Archive (5)

B
#Blog (12)  #Build (8)

C
#CSS (15)  #Code (10)
```

### 3. Tag Cloud (Commented Out)
Best for: Visual hierarchy, showing popular tags
```
#Jekyll  #CSS  #Tutorial
  #Design  #API
#Blog  #Git  #Ruby
```

To switch layouts, uncomment the desired section in `_pages/tags.md` and comment out the current grid layout.

## Customization Guide

### Change Tag Colors

Edit `_sass/_components.scss`:

```scss
.tag {
  color: $color-accent; // Change tag text color
  background-color: rgba($color-accent, 0.1); // Change background
  border: 1px solid rgba($color-accent, 0.2); // Change border
}
```

### Remove Hashtag Icon

Edit `_sass/_components.scss`:

```scss
.tag {
  // Comment out or remove this:
  // &::before {
  //   content: "#";
  //   font-weight: $font-weight-semibold;
  //   opacity: 0.7;
  // }
}
```

### Change Tag Shape

Edit `_sass/_components.scss`:

```scss
.tag {
  border-radius: $border-radius-lg; // More rounded (12px)
  // or
  border-radius: 999px; // Fully pill-shaped
  // or
  border-radius: 0; // Square corners
}
```

### Adjust Tag Limit on Homepage

Edit `_layouts/home.html`:

```liquid
{% include tag-list.html tags=post.tags compact=true limit=5 %}
                                                          ↑
                                                    Change this number
```

### Enable Tag Label

Edit layouts where you want the label:

```liquid
{% include tag-list.html tags=post.tags show_label=true %}
```

This will display "Tags: #tag1 #tag2"

## Performance Notes

### Efficient Rendering
- Tag component uses Liquid's native loops (no JavaScript required)
- CSS uses efficient selectors
- Minimal DOM elements

### Build Performance
- Jekyll generates static tag pages once
- No runtime tag processing needed
- Fast page loads

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

### Graceful Degradation
- Works without JavaScript
- CSS Grid with flexbox fallback
- Focus states for keyboard users

## Testing Checklist

Before deploying, verify:

- [ ] Tags display correctly on post pages
- [ ] Tags display correctly on homepage
- [ ] Tags display correctly in post cards
- [ ] Tags index page shows all tags
- [ ] Individual tag pages work
- [ ] Tag counts are accurate
- [ ] Navigation "Tags" link works
- [ ] Mobile responsive design works
- [ ] Tablet responsive design works
- [ ] Desktop responsive design works
- [ ] Keyboard navigation works (Tab through tags)
- [ ] Focus states are visible
- [ ] Hover effects work on desktop
- [ ] Tag links go to correct pages
- [ ] Breadcrumb navigation works
- [ ] Screen reader announces tags correctly

## Troubleshooting

### Tags Not Showing
1. Check post front matter has `tags:` defined
2. Verify tag names don't have special characters
3. Rebuild site: `bundle exec jekyll build`

### Tag Pages Not Generating
1. Check `_config.yml` has `jekyll-tagging` plugin
2. Verify `tag_page_layout: tag` setting
3. Check `_layouts/tag.html` exists
4. Rebuild with `--verbose` flag

### Styling Issues
1. Check `_sass/_components.scss` compiles without errors
2. Verify `assets/css/main.scss` imports components
3. Clear browser cache
4. Check browser console for CSS errors

### Responsive Issues
1. Test on actual devices if possible
2. Use browser DevTools responsive mode
3. Check viewport meta tag in `_includes/head.html`
4. Verify media query breakpoints

## File Reference

### Core Files
```
_includes/
  └── tag-list.html          # Reusable tag component

_layouts/
  ├── tag.html               # Individual tag page layout
  ├── post.html              # Post layout (uses tag component)
  └── home.html              # Homepage (uses tag component)

_pages/
  └── tags.md                # All tags index page

_sass/
  └── _components.scss       # Tag styling (lines 59-313)

_data/
  └── navigation.yml         # Navigation menu (includes Tags)
```

### Configuration Files
```
_config.yml                  # Jekyll tag plugin config
```

## Future Enhancements

Possible improvements you could add:

1. **Tag Search**: Add search/filter functionality to tags page
2. **Related Tags**: Show related tags based on co-occurrence
3. **Tag Descriptions**: Add descriptions to tags (requires data file)
4. **Color-Coded Tags**: Assign colors to tag categories
5. **Tag Analytics**: Track popular tags over time
6. **RSS by Tag**: Generate RSS feeds per tag
7. **Dark Mode**: Tag styling for dark theme
8. **Tag Aliases**: Map similar tags together
9. **Tag Hierarchy**: Parent/child tag relationships
10. **Suggested Tags**: Show related tags to users

## Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check Jekyll documentation: https://jekyllrb.com
4. Review plugin docs: https://github.com/pattex/jekyll-tagging

## Credits

- **Design System**: Based on professional web design patterns
- **Accessibility**: WCAG 2.1 AA compliant
- **Icons**: Simple text-based hashtag symbol
- **Typography**: System font stack for performance

---

**Last Updated**: November 3, 2025
**Version**: 1.0
**Author**: Theme and Design Agent
