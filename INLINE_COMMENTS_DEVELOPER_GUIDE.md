# Inline Comments Developer Guide

This guide covers customization, architecture, and advanced usage of the inline commenting system for developers maintaining or extending the blog.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Customization Guide](#customization-guide)
- [Extending the System](#extending-the-system)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Known Limitations](#known-limitations)

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────┐
│                   Blog Post Page                     │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │         Post Content (.post-content)         │   │
│  │                                               │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  Paragraph with data-para-id="p1"   │    │   │
│  │  │  💬 [Comment Icon]                  │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                               │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  Paragraph with data-para-id="p2"   │    │   │
│  │  │  💬 [Comment Icon]                  │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────┘   │
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │      Inline Comment Popover (Hidden)         │   │
│  │  ┌────────────────────────────────────┐     │   │
│  │  │  Existing Comments List             │     │   │
│  │  ├────────────────────────────────────┤     │   │
│  │  │  New Comment Form                   │     │   │
│  │  └────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────┘   │
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │      Comments Section (Giscus iframe)        │   │
│  │  • Regular comments                           │   │
│  │  • Inline comment citations                   │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              GitHub Discussions API                  │
│  • Stores all comments (regular + inline)            │
│  • Inline comments have hidden JSON metadata         │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **Page Load**
   - Jekyll renders post with `.post-content` container
   - Inline comments JavaScript loads
   - Paragraphs are auto-assigned IDs (`p1`, `p2`, etc.)
   - Comment icons are injected

2. **User Interaction**
   - User clicks comment icon
   - Popover appears next to paragraph
   - Existing comments for that paragraph are loaded
   - User types and submits comment

3. **Comment Submission**
   - JavaScript formats comment with metadata
   - Metadata structure:
     ```json
     {
       "type": "inline",
       "paragraphId": "p5",
       "paragraphText": "First 200 chars...",
       "postUrl": "/2025/11/03/my-post/",
       "timestamp": "2025-11-03T10:30:00Z"
     }
     ```
   - Metadata wrapped in HTML comment: `<!-- inline-comment-metadata ... -->`
   - Posted to Giscus/GitHub Discussions

4. **Comment Display**
   - Giscus loads all comments
   - JavaScript parses metadata
   - Inline comments rendered with citations
   - Regular comments rendered normally

## File Structure

```
blog/
├── _includes/
│   ├── inline-comment-icon.html        # Comment icon component (optional, created by JS)
│   ├── inline-comment-popover.html     # Popover component (optional, created by JS)
│   └── comments.html                    # Modified to parse inline comments
├── _layouts/
│   └── post.html                        # Modified to load inline comments JS
├── _sass/
│   ├── _inline-comments.scss            # All inline comment styles
│   ├── _variables.scss                  # Color variables used by inline comments
│   └── _components.scss                 # May include shared button styles
├── assets/
│   ├── css/
│   │   └── main.scss                    # Imports _inline-comments.scss
│   └── js/
│       └── inline-comments.js           # Core functionality
├── _config.yml                          # Configuration
├── INLINE_COMMENTS_USER_GUIDE.md       # User documentation
└── INLINE_COMMENTS_DEVELOPER_GUIDE.md  # This file
```

## Customization Guide

### Styling

All styles are in `/Users/ybang_mac/Development/blog/_sass/_inline-comments.scss`.

#### Changing Colors

Colors use CSS custom properties from `_variables.scss`:

```scss
// In _inline-comments.scss
.commentable-paragraph.has-comments {
  border-left-color: var(--color-primary);  // Change this
  background: rgba(37, 99, 235, 0.05);      // Or this
}
```

To customize:

1. **Use existing variables** from `_variables.scss`
2. **Create new variables** in `:root` section
3. **Ensure dark mode compatibility** in `[data-theme="dark"]`

#### Changing Icon

Replace the SVG in `createCommentIcon()` function in `inline-comments.js`:

```javascript
icon.innerHTML = `
  <svg class="icon-comment" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <!-- Your custom SVG path here -->
  </svg>
  <!-- Keep the comment count span -->
`;
```

Or use an emoji:
```javascript
icon.innerHTML = `
  <span style="font-size: 16px;">💬</span>
  <span class="comment-count" data-count="0"></span>
`;
```

#### Customizing Popover

Modify styles in `_inline-comments.scss`:

```scss
.inline-comment-popover {
  width: 380px;                  // Change popover width
  border-radius: $border-radius-lg;  // Change roundness
  box-shadow: var(--shadow-lg);  // Change shadow

  // Add custom background
  background: linear-gradient(to bottom,
    var(--color-background),
    var(--color-background-alt)
  );
}
```

#### Responsive Breakpoints

Change where mobile behavior kicks in:

```scss
// Currently at 768px
@media (max-width: #{$breakpoint-md - 1px}) {
  // Mobile styles
}

// Change to 1024px
@media (max-width: #{$breakpoint-lg - 1px}) {
  // Mobile styles
}
```

### JavaScript Configuration

Edit the `CONFIG` object in `inline-comments.js`:

```javascript
const CONFIG = {
  minParagraphLength: 50,        // Min chars to show icon
  maxCitationLength: 200,        // Max chars in citation
  iconPosition: 'left',          // 'left' or 'right'
  popoverPosition: 'right',      // 'right' or 'left'
  selectors: {
    postContent: '.post-content',
    commentableElements: 'p, blockquote, li',  // What can be commented
    giscusContainer: '.comments-container',
    commentsSection: '.comments-section'
  }
};
```

### Adding More Commentable Elements

To allow comments on headings, add to `commentableElements`:

```javascript
commentableElements: 'p, blockquote, li, h2, h3',
```

Then adjust styles:

```scss
.commentable-paragraph {
  // Styles apply to h2, h3, etc.
}
```

### Custom Paragraph Filtering

Modify `assignParagraphIds()` function:

```javascript
elements.forEach((element) => {
  const textContent = element.textContent.trim();

  // Custom filtering logic
  if (textContent.length < CONFIG.minParagraphLength) return;
  if (element.closest('pre, code')) return;
  if (element.classList.contains('no-comments')) return;  // Custom class

  // ... rest of function
});
```

### Changing Comment Format

Modify metadata structure in `handleCommentSubmit()`:

```javascript
const metadata = {
  type: 'inline',
  paragraphId: paraId,
  paragraphText: paragraph.textContent.substring(0, 200).trim(),
  postUrl: window.location.pathname,
  timestamp: new Date().toISOString(),
  // Add custom fields
  postTitle: document.querySelector('.post-title').textContent,
  authorName: '{{ page.author }}'  // From Jekyll
};
```

## Extending the System

### Adding Analytics

Track comment interactions:

```javascript
// In showCommentPopover()
function showCommentPopover(paraId, iconElement) {
  // Existing code...

  // Track event
  if (window.gtag) {
    gtag('event', 'inline_comment_open', {
      paragraph_id: paraId,
      post_url: window.location.pathname
    });
  }
}

// In handleCommentSubmit()
async function handleCommentSubmit(form) {
  // After successful post
  if (window.gtag) {
    gtag('event', 'inline_comment_post', {
      paragraph_id: paraId,
      post_url: window.location.pathname
    });
  }
}
```

### Adding Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + C to open comment on current paragraph
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
    e.preventDefault();

    // Find paragraph near cursor or viewport center
    const paragraph = findNearestParagraph();
    if (paragraph) {
      const paraId = paragraph.getAttribute('data-para-id');
      const icon = paragraph.querySelector('.para-comment-icon');
      showCommentPopover(paraId, icon);
    }
  }
});
```

### Adding Comment Reactions

Extend to show reactions on inline comments:

```javascript
function populateExistingComments(popover, paraId) {
  const comments = state.comments.get(paraId) || [];

  container.innerHTML = comments.map(comment => `
    <div class="inline-comment-item">
      <!-- Existing comment HTML -->

      <!-- Add reactions -->
      <div class="comment-reactions">
        <button class="reaction-btn" data-reaction="thumbsup">
          👍 <span>${comment.reactions.thumbsup || 0}</span>
        </button>
        <button class="reaction-btn" data-reaction="heart">
          ❤️ <span>${comment.reactions.heart || 0}</span>
        </button>
      </div>
    </div>
  `).join('');
}
```

### Adding Comment Threading

Allow replies to inline comments:

```javascript
function renderInlineComment(comment) {
  return `
    <div class="inline-comment-item" data-comment-id="${comment.id}">
      <div class="comment-body">${comment.body}</div>

      <!-- Reply button -->
      <button class="btn-reply" data-parent-id="${comment.id}">
        Reply
      </button>

      <!-- Replies container -->
      <div class="comment-replies">
        ${comment.replies.map(renderInlineComment).join('')}
      </div>
    </div>
  `;
}
```

### Integrating with Search

Make inline comments searchable:

```javascript
// Index inline comments for search
function indexInlineComments() {
  const index = [];

  state.comments.forEach((comments, paraId) => {
    comments.forEach(comment => {
      index.push({
        type: 'inline-comment',
        paragraphId: paraId,
        author: comment.author.name,
        body: comment.body,
        timestamp: comment.createdAt,
        url: `${window.location.pathname}#${paraId}`
      });
    });
  });

  return index;
}
```

## API Reference

### State Object

```javascript
state = {
  paragraphs: Map<string, HTMLElement>,     // Map of paraId -> element
  comments: Map<string, Array<Comment>>,    // Map of paraId -> comments
  activePopover: HTMLElement | null,        // Currently open popover
  giscusReady: boolean,                     // Whether Giscus loaded
  giscusIframe: HTMLIFrameElement | null    // Giscus iframe reference
}
```

### Comment Object Structure

```javascript
{
  id: string,              // Comment ID from GitHub
  author: {
    name: string,
    avatarUrl: string,
    url: string
  },
  body: string,           // Comment text (without metadata)
  createdAt: string,      // ISO timestamp
  metadata: {
    type: 'inline',
    paragraphId: string,
    paragraphText: string,
    postUrl: string,
    timestamp: string
  }
}
```

### Key Functions

#### `assignParagraphIds()`
Assigns unique IDs to commentable paragraphs.
- **Parameters:** None
- **Returns:** void
- **Side effects:** Adds `data-para-id` attribute and `.commentable-paragraph` class

#### `showCommentPopover(paraId, iconElement)`
Shows the comment popover for a paragraph.
- **Parameters:**
  - `paraId` (string): Paragraph ID
  - `iconElement` (HTMLElement): The clicked icon element
- **Returns:** void
- **Side effects:** Opens popover, focuses textarea

#### `handleCommentSubmit(form)`
Handles comment form submission.
- **Parameters:**
  - `form` (HTMLFormElement): The submitted form
- **Returns:** Promise<void>
- **Side effects:** Posts to Giscus, updates UI

#### `loadExistingComments()`
Loads and parses existing comments from Giscus.
- **Parameters:** None
- **Returns:** void
- **Side effects:** Updates `state.comments` map

#### `scrollToParagraph(paraId)`
Scrolls to and highlights a paragraph.
- **Parameters:**
  - `paraId` (string): Paragraph ID
- **Returns:** void
- **Side effects:** Scrolls page, adds temporary highlight

## Testing

### Manual Testing Checklist

**Desktop:**
- [ ] Hover shows comment icons
- [ ] Click icon opens popover
- [ ] Popover positions correctly (left/right)
- [ ] Popover flips if near edge
- [ ] Can type and submit comment
- [ ] Existing comments load
- [ ] Comment count updates
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Click outside closes popover

**Mobile:**
- [ ] Icons always visible
- [ ] Tap opens full-screen modal
- [ ] Modal slides up smoothly
- [ ] Can scroll modal content
- [ ] Can close modal
- [ ] Overlay blocks background interaction

**Comments Section:**
- [ ] Inline comments have citations
- [ ] Citation shows paragraph preview
- [ ] "View in context" link works
- [ ] Scroll animation smooth
- [ ] Paragraph highlights briefly

**Accessibility:**
- [ ] Can tab to all icons
- [ ] Enter/Space opens popover
- [ ] Escape closes popover
- [ ] Screen reader announces counts
- [ ] ARIA labels present
- [ ] Focus indicators visible

### Automated Testing

Create a test file `tests/inline-comments.test.js`:

```javascript
describe('Inline Comments', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="post-content">
        <p>This is a test paragraph with enough text to be commentable.</p>
      </div>
    `;
    // Initialize system
    assignParagraphIds();
  });

  test('assigns IDs to paragraphs', () => {
    const para = document.querySelector('p');
    expect(para.getAttribute('data-para-id')).toBe('p1');
    expect(para.classList.contains('commentable-paragraph')).toBe(true);
  });

  test('creates comment icon', () => {
    const icon = document.querySelector('.para-comment-icon');
    expect(icon).not.toBeNull();
    expect(icon.getAttribute('data-target-para')).toBe('p1');
  });

  test('opens popover on click', () => {
    const icon = document.querySelector('.para-comment-icon');
    icon.click();

    const popover = document.querySelector('.inline-comment-popover');
    expect(popover).not.toBeNull();
    expect(popover.classList.contains('open')).toBe(true);
  });
});
```

### Performance Testing

Use Chrome DevTools:

1. **Lighthouse Audit**
   - Run audit on post with inline comments
   - Check Performance score
   - Review JavaScript execution time

2. **Coverage**
   - Open Coverage tab
   - Reload page
   - Check how much of inline-comments.js is used

3. **Network**
   - Check size of inline-comments.js (should be <20KB)
   - Verify no unnecessary requests

4. **Performance Monitor**
   - Check CPU usage when opening popovers
   - Monitor memory during long sessions

## Performance Optimization

### Code Splitting

Load inline comments only when needed:

```html
<!-- In _layouts/post.html -->
{% if site.inline_comments.enabled and page.inline_comments != false %}
  <script src="{{ '/assets/js/inline-comments.js' | relative_url }}" defer></script>
{% endif %}
```

### Lazy Loading

Load comments only when paragraph is visible:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const paraId = entry.target.getAttribute('data-para-id');
      loadCommentsForParagraph(paraId);
      observer.unobserve(entry.target);
    }
  });
});

state.paragraphs.forEach((element) => {
  observer.observe(element);
});
```

### Debouncing

Debounce popover positioning on scroll:

```javascript
let positionTimeout;
window.addEventListener('scroll', () => {
  if (state.activePopover) {
    clearTimeout(positionTimeout);
    positionTimeout = setTimeout(() => {
      positionPopover(state.activePopover, /* ... */);
    }, 100);
  }
});
```

### Minification

Minify JavaScript in production:

```bash
# Using terser
npx terser assets/js/inline-comments.js -o assets/js/inline-comments.min.js -c -m
```

Then use minified version:

```html
{% if jekyll.environment == "production" %}
  <script src="{{ '/assets/js/inline-comments.min.js' | relative_url }}"></script>
{% else %}
  <script src="{{ '/assets/js/inline-comments.js' | relative_url }}"></script>
{% endif %}
```

## Security Considerations

### XSS Prevention

Always escape user content:

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Use when rendering comments
container.innerHTML = `<div>${escapeHtml(comment.body)}</div>`;
```

### CSRF Protection

Giscus handles authentication and CSRF. Never:
- Store GitHub tokens client-side
- Implement custom authentication
- Bypass Giscus security

### Content Security Policy

Add to your site's CSP headers:

```
Content-Security-Policy:
  script-src 'self' https://giscus.app;
  frame-src https://giscus.app;
  connect-src https://giscus.app https://api.github.com;
```

### Rate Limiting

Prevent comment spam:

```javascript
const RATE_LIMIT = {
  maxComments: 5,
  windowMs: 60000  // 1 minute
};

const commentTimes = [];

function checkRateLimit() {
  const now = Date.now();
  const recentComments = commentTimes.filter(time =>
    now - time < RATE_LIMIT.windowMs
  );

  if (recentComments.length >= RATE_LIMIT.maxComments) {
    throw new Error('Rate limit exceeded. Please wait before commenting again.');
  }

  commentTimes.push(now);
}
```

## Known Limitations

### 1. Giscus iframe Restrictions

**Issue:** Cannot directly access Giscus iframe content due to CORS.

**Impact:**
- Cannot programmatically style comments inside iframe
- Cannot extract comment data without GitHub API

**Workaround:**
- Use Giscus postMessage API for limited interaction
- Fetch comments via GitHub Discussions API separately
- Style citations outside the iframe

### 2. Paragraph ID Stability

**Issue:** Paragraph IDs are assigned sequentially on page load.

**Impact:**
- If post content changes, paragraph IDs may shift
- Comments may point to wrong paragraphs

**Workaround:**
- Store first 200 chars of paragraph in metadata
- Use content matching as fallback
- Consider manual paragraph IDs for critical posts

### 3. Mobile Viewport

**Issue:** Popover must be full-screen on mobile.

**Impact:**
- Cannot see paragraph while commenting
- Different UX than desktop

**Workaround:**
- Show paragraph preview in popover header
- Add "View paragraph" button to scroll back

### 4. Browser Compatibility

**Issue:** Requires modern JavaScript features.

**Requirements:**
- ES6+ support
- IntersectionObserver (optional, for lazy loading)
- CSS custom properties
- Flexbox and Grid

**Support:**
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

**Workaround:**
- Add polyfills for older browsers
- Provide fallback to regular comments

### 5. Performance with Many Comments

**Issue:** Loading hundreds of inline comments can be slow.

**Impact:**
- Initial page load time increases
- Memory usage for large comment maps

**Workaround:**
- Lazy load comments per paragraph
- Paginate comments in popover
- Cache parsed comments in localStorage

---

## Contributing

When modifying the inline commenting system:

1. **Test thoroughly** across browsers and devices
2. **Maintain accessibility** (ARIA, keyboard nav)
3. **Follow existing code style** (see `.editorconfig`)
4. **Update documentation** (both user and developer guides)
5. **Consider performance** impact
6. **Check security** implications

## Version History

- **v1.0.0** (2025-11-03): Initial release
  - Basic inline commenting functionality
  - Giscus integration
  - Desktop and mobile support
  - Accessibility features

---

For questions or issues, consult:
- [User Guide](INLINE_COMMENTS_USER_GUIDE.md) for end-user documentation
- [Giscus Documentation](https://giscus.app) for comment system details
- [Jekyll Documentation](https://jekyllrb.com/docs/) for site generation

**Happy coding!**
