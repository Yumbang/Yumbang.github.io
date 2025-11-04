# Comments Integration Reference

This document explains how the comment system integrates between the Theme/Design Agent (styling) and Jekyll Configuration Agent (functionality).

---

## Architecture

### Theme/Design Agent Responsibilities (Completed)

1. **Visual Design** (`_sass/_components.scss`)
   - Layout and spacing
   - Typography and colors
   - Responsive design
   - Animations and transitions
   - Dark mode styles (ready)

2. **HTML Structure** (`_includes/comments.html`)
   - Semantic markup
   - Accessibility features
   - Widget embedding code
   - Conditional logic structure
   - Fallback messages

3. **Layout Integration** (`_layouts/post.html`)
   - Placement in post template
   - Clean include statement

### Jekyll Configuration Agent Responsibilities (In Progress)

1. **Configuration Setup** (`_config.yml`)
   - Choose provider (utterances vs giscus)
   - Repository settings
   - Theme selection
   - Feature flags

2. **Repository Setup**
   - GitHub App installation
   - Repository permissions
   - Issue/Discussion labels

3. **Testing & Deployment**
   - Build verification
   - GitHub Pages deployment
   - Live testing

---

## How It Works Together

### Configuration Flow

```
_config.yml (Config Agent)
    ↓
site.comments.provider value
    ↓
_includes/comments.html (Theme Agent)
    ↓
Conditional logic chooses provider
    ↓
Renders appropriate widget HTML
    ↓
_sass/_components.scss (Theme Agent)
    ↓
Styles the rendered output
```

### Example Configurations

#### Utterances (Simple)

**Config Agent sets in `_config.yml`:**
```yaml
comments:
  provider: utterances
  utterances:
    repo: "username/blog-repo"
    issue_term: "pathname"
    theme: "github-light"
```

**Theme Agent provides in `_includes/comments.html`:**
```html
<script
  src="https://utteranc.es/client.js"
  repo="{{ site.comments.utterances.repo }}"
  issue-term="{{ site.comments.utterances.issue_term }}"
  theme="{{ site.comments.utterances.theme }}"
  crossorigin="anonymous"
  async>
</script>
```

#### Giscus (Full-Featured)

**Config Agent sets in `_config.yml`:**
```yaml
comments:
  provider: giscus
  giscus:
    repo: "username/blog-repo"
    repo_id: "R_xxxxxxxxxxxxx"
    category: "Comments"
    category_id: "DIC_xxxxxxxxxxxxx"
    mapping: "pathname"
    reactions_enabled: "1"
    theme: "preferred_color_scheme"
```

**Theme Agent provides in `_includes/comments.html`:**
```html
<script
  src="https://giscus.app/client.js"
  data-repo="{{ site.comments.giscus.repo }}"
  data-repo-id="{{ site.comments.giscus.repo_id }}"
  data-category="{{ site.comments.giscus.category }}"
  data-category-id="{{ site.comments.giscus.category_id }}"
  ...
>
</script>
```

---

## Variable Reference

### Site-Level Variables (Set by Config Agent)

| Variable | Type | Required | Purpose |
|----------|------|----------|---------|
| `site.comments.provider` | String | Yes | "utterances" or "giscus" |
| `site.comments.utterances.repo` | String | If using Utterances | "owner/repo" |
| `site.comments.utterances.issue_term` | String | No | Default: "pathname" |
| `site.comments.utterances.theme` | String | No | Default: "github-light" |
| `site.comments.utterances.label` | String | No | Default: "comment" |
| `site.comments.giscus.repo` | String | If using Giscus | "owner/repo" |
| `site.comments.giscus.repo_id` | String | If using Giscus | From giscus.app |
| `site.comments.giscus.category` | String | If using Giscus | Discussion category |
| `site.comments.giscus.category_id` | String | If using Giscus | From giscus.app |
| `site.comments.giscus.mapping` | String | No | Default: "pathname" |
| `site.comments.giscus.theme` | String | No | Default: "preferred_color_scheme" |
| `site.comments.giscus.reactions_enabled` | String | No | Default: "1" |
| `site.comments.giscus.loading` | String | No | Default: "lazy" |

### Page-Level Variables (Set by User in Front Matter)

| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| `page.comments` | Boolean | `true` | Enable/disable comments on this post |

---

## Conditional Logic

### Provider Selection

The `_includes/comments.html` uses this logic:

```liquid
{% if page.comments != false %}
  {% if site.comments.provider == "utterances" and site.comments.utterances.repo %}
    <!-- Render Utterances -->
  {% elsif site.comments.provider == "giscus" and site.comments.giscus.repo %}
    <!-- Render Giscus -->
  {% elsif page.comments == true %}
    <!-- Show "not configured" message -->
  {% endif %}
{% endif %}
```

### States Handled

1. **Comments enabled, provider configured**: Show widget
2. **Comments enabled, no provider**: Show config message
3. **Comments explicitly disabled**: Show nothing
4. **JavaScript disabled**: Show noscript message

---

## CSS Class Reference

### Main Classes (Theme Agent)

| Class | Purpose | Location |
|-------|---------|----------|
| `.comments-section` | Main container | `_sass/_components.scss` |
| `.comments-header` | Header container | `_sass/_components.scss` |
| `.comments-title` | "Comments" heading | `_sass/_components.scss` |
| `.comments-subtitle` | Descriptive text | `_sass/_components.scss` |
| `.comments-container` | Widget wrapper | `_sass/_components.scss` |
| `.comments-noscript` | NoScript fallback | `_sass/_components.scss` |
| `.skip-to-comments` | Accessibility link | `_sass/_components.scss` |

### Utility Classes Used

From existing `_sass/_components.scss`:

| Class | Purpose |
|-------|---------|
| `.alert` | Alert messages |
| `.alert-info` | Info-style alert |

---

## File Responsibility Matrix

| File | Owner | Purpose |
|------|-------|---------|
| `_config.yml` | Config Agent | Provider selection & settings |
| `_includes/comments.html` | Theme Agent | HTML structure & conditionals |
| `_layouts/post.html` | Theme Agent | Include placement |
| `_sass/_variables.scss` | Theme Agent | Color/spacing/font variables |
| `_sass/_components.scss` | Theme Agent | Comment styling |

---

## Data Flow Diagram

```
User writes post with front matter
    ↓
page.comments = true (default)
    ↓
Jekyll builds site
    ↓
Reads _config.yml
    ↓
site.comments.provider = "utterances"
    ↓
Processes _layouts/post.html
    ↓
Includes _includes/comments.html
    ↓
Evaluates conditionals
    ↓
Renders Utterances script tag
    ↓
Applies CSS from _sass/_components.scss
    ↓
Outputs final HTML
    ↓
User loads page
    ↓
Script loads widget asynchronously
    ↓
Widget renders in .comments-container
    ↓
CSS styles make it beautiful
```

---

## Testing Integration

### What Theme Agent Tests

- ✓ CSS compiles without errors
- ✓ Layout renders correctly
- ✓ Responsive design works
- ✓ Accessibility features present
- ✓ Visual consistency with theme

### What Config Agent Tests

- Build succeeds with config
- Provider scripts load
- GitHub connection works
- Comments appear on posts
- Configuration edge cases

---

## Extending the System

### Adding a Third Provider (e.g., Disqus)

**Config Agent adds to `_config.yml`:**
```yaml
comments:
  provider: disqus
  disqus:
    shortname: "your-shortname"
```

**Theme Agent adds to `_includes/comments.html`:**
```liquid
{% elsif site.comments.provider == "disqus" and site.comments.disqus.shortname %}
  <div class="comments-section" id="comments">
    <div class="comments-header">
      <h2 class="comments-title">Comments</h2>
    </div>
    <div class="comments-container">
      <!-- Disqus embed code -->
    </div>
  </div>
{% endif %}
```

**Theme Agent styles in `_sass/_components.scss`:**
```scss
// Disqus-specific adjustments if needed
.comments-container #disqus_thread {
  max-width: 100%;
}
```

### Adding Comment Count

**Theme Agent adds to `_layouts/post.html`:**
```html
<a href="#comments" class="comment-count">
  <span id="comment-count">0</span> Comments
</a>
```

**Config Agent provides JavaScript** (or Theme Agent if purely visual):
```javascript
// Fetch count from provider API
// Update #comment-count element
```

---

## Best Practices

### For Config Agent

1. **Validate settings**: Ensure repo exists and is public
2. **Test both providers**: Verify each works independently
3. **Document setup**: Clear instructions in README
4. **Handle errors**: Check for missing required fields

### For Theme Agent

1. **Keep HTML semantic**: Use proper elements
2. **Maintain consistency**: Match existing design system
3. **Stay responsive**: Test all breakpoints
4. **Preserve accessibility**: ARIA labels, keyboard nav
5. **Document customization**: Clear comments in CSS

---

## Common Integration Issues

### Issue: Widget Not Appearing

**Check (Config Agent):**
- Provider set correctly in `_config.yml`
- Repository name matches exactly
- Repository is public

**Check (Theme Agent):**
- `{% include comments.html %}` present in layout
- No CSS hiding the container
- JavaScript enabled in browser

### Issue: Wrong Styling

**Check (Theme Agent):**
- Sass compiles without errors
- Variables defined in `_variables.scss`
- No conflicting CSS rules
- Browser cache cleared

**Check (Config Agent):**
- Theme setting matches provider theme options
- Build completes successfully

### Issue: Comments on Wrong Pages

**Check (Theme Agent):**
- Include only in `post.html`, not other layouts
- Conditional logic correct in include

**Check (Config Agent):**
- Front matter `comments: false` where needed
- Default behavior documented

---

## Maintenance

### Theme Agent Updates

When updating design:
1. Modify `_sass/_components.scss`
2. Test responsive behavior
3. Verify accessibility
4. Update customization guide
5. Document changes

### Config Agent Updates

When changing configuration:
1. Update `_config.yml`
2. Test build
3. Verify deployment
4. Update documentation
5. Test live site

---

## Summary

The comment system is a perfect example of separation of concerns:

- **Theme Agent**: Makes it look good and work on all devices
- **Config Agent**: Makes it function and connect to GitHub

Both agents work together seamlessly through:
- Liquid templating variables
- Conditional logic
- Sass preprocessing
- Clear file organization

This architecture allows:
- Independent updates
- Easy customization
- Clear maintenance
- Scalable extensions
