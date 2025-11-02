# CSS Classes Reference

Quick reference for available CSS classes in the blog theme.

---

## Layout Classes

### Containers

```html
<div class="container">
  <!-- Max-width: 800px, centered, responsive padding -->
</div>

<div class="container-narrow">
  <!-- Max-width: 680px, centered, responsive padding -->
</div>
```

### Site Structure

```html
<div class="site">
  <!-- Main site wrapper with flex layout -->
</div>

<main class="site-main">
  <!-- Main content area with vertical padding -->
</main>
```

---

## Typography Classes

### Text Utilities

```html
<p class="text-center">Centered text</p>
<p class="text-muted">Muted/gray text</p>
```

### Screen Reader Only

```html
<span class="sr-only">This text is only for screen readers</span>
```

---

## Navigation Classes

### Site Header

```html
<header class="site-header">
  <div class="header-content">
    <h1 class="site-title">
      <a href="/">Site Title</a>
    </h1>
    <nav class="site-nav">
      <!-- Navigation menu -->
    </nav>
  </div>
</header>
```

### Navigation Menu

```html
<nav class="site-nav">
  <ul>
    <li><a href="/" class="active">Home</a></li>
    <li><a href="/about/">About</a></li>
  </ul>
</nav>
```

---

## Footer Classes

```html
<footer class="site-footer">
  <div class="footer-content">
    <p class="footer-text">Copyright text</p>
    <div class="footer-links">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
    </div>
  </div>
</footer>
```

---

## Post/Article Classes

### Post List

```html
<ul class="post-list">
  <li class="post-list-item">
    <article>
      <h3 class="post-title">
        <a href="#">Post Title</a>
      </h3>
      <div class="post-meta">
        <!-- Metadata -->
      </div>
      <div class="post-excerpt">
        <!-- Excerpt text -->
      </div>
      <a href="#" class="read-more">Read more</a>
    </article>
  </li>
</ul>
```

### Post Header

```html
<header class="post-header">
  <h1 class="post-title">Post Title</h1>
  <div class="post-meta">
    <span class="meta-item">Date</span>
    <span class="meta-separator">•</span>
    <span class="meta-item">Author</span>
  </div>
</header>
```

### Post Content

```html
<div class="post-content">
  <!-- Post body content -->
</div>
```

### Post Navigation

```html
<nav class="post-navigation">
  <a href="#" class="nav-link nav-prev">
    <span class="nav-label">← Previous Post</span>
    <span class="nav-title">Previous Title</span>
  </a>
  <a href="#" class="nav-link nav-next">
    <span class="nav-label">Next Post →</span>
    <span class="nav-title">Next Title</span>
  </a>
</nav>
```

### Post Metadata

```html
<div class="post-meta">
  <span class="meta-item">
    <time datetime="2025-11-02">November 2, 2025</time>
  </span>
  <span class="meta-separator">•</span>
  <span class="meta-item">Author Name</span>
  <span class="meta-separator">•</span>
  <span class="meta-item">5 min read</span>
</div>
```

---

## Page Classes

### Page Header

```html
<header class="page-header">
  <h1 class="page-title">Page Title</h1>
  <p class="page-description">Optional description</p>
</header>
```

### Page Content

```html
<div class="page-content">
  <!-- Page body content -->
</div>
```

---

## Component Classes

### Buttons

```html
<!-- Primary button -->
<a href="#" class="btn btn-primary">Primary Button</a>

<!-- Secondary button -->
<a href="#" class="btn btn-secondary">Secondary Button</a>

<!-- Small button -->
<a href="#" class="btn btn-primary btn-small">Small Button</a>

<!-- Disabled button -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Tags

```html
<div class="tag-list">
  <a href="#" class="tag">JavaScript</a>
  <a href="#" class="tag">Tutorial</a>
  <a href="#" class="tag">Web Development</a>
</div>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <p>Footer content</p>
  </div>
</div>
```

### Alerts

```html
<!-- Info alert -->
<div class="alert alert-info">
  <p>This is an informational message.</p>
</div>

<!-- Success alert -->
<div class="alert alert-success">
  <p>Operation completed successfully!</p>
</div>

<!-- Warning alert -->
<div class="alert alert-warning">
  <p>Please be careful with this action.</p>
</div>

<!-- Error alert -->
<div class="alert alert-error">
  <p>An error occurred. Please try again.</p>
</div>
```

### Breadcrumbs

```html
<nav class="breadcrumb">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li class="active">Current Page</li>
  </ul>
</nav>
```

### Badge

```html
<span class="badge">5</span>
<span class="badge">New</span>
```

### Divider

```html
<!-- Simple divider -->
<hr class="divider">

<!-- Divider with content -->
<div class="divider divider-content">
  <span>OR</span>
</div>
```

### Avatar

```html
<div class="avatar">
  <img src="avatar.jpg" alt="User Name">
</div>

<div class="avatar avatar-large">
  <img src="avatar.jpg" alt="User Name">
</div>

<div class="avatar avatar-small">
  <img src="avatar.jpg" alt="User Name">
</div>
```

### Social Icons

```html
<ul class="social-icons">
  <li>
    <a href="#" aria-label="GitHub">
      <svg><!-- GitHub icon --></svg>
    </a>
  </li>
  <li>
    <a href="#" aria-label="Twitter">
      <svg><!-- Twitter icon --></svg>
    </a>
  </li>
</ul>
```

---

## Pagination

```html
<nav class="pagination">
  <a href="#" class="page-link">← Previous</a>
  <a href="#" class="page-link">1</a>
  <span class="page-link active">2</span>
  <a href="#" class="page-link">3</a>
  <a href="#" class="page-link">Next →</a>
</nav>
```

---

## Archive Layout

```html
<div class="archive-group">
  <h2 class="archive-year">2025</h2>
  <ul class="archive-list">
    <li class="archive-item">
      <span class="archive-date">Nov 2</span>
      <a href="#">Post Title</a>
    </li>
  </ul>
</div>
```

---

## Responsive Embeds

```html
<!-- 16:9 aspect ratio (YouTube, etc.) -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe src="..."></iframe>
</div>

<!-- 1:1 aspect ratio -->
<div class="embed-responsive embed-responsive-1by1">
  <iframe src="..."></iframe>
</div>
```

---

## Loading Spinner

```html
<span class="spinner" aria-label="Loading"></span>
```

---

## Back to Top Button

```html
<button class="back-to-top visible" aria-label="Back to top">
  <svg><!-- Arrow up icon --></svg>
</button>
```

---

## Code Blocks

### Syntax Highlighting

```html
<!-- Automatically styled by Rouge/Kramdown -->
<div class="highlight">
  <pre><code class="language-javascript">
    // Your code here
  </code></pre>
</div>
```

### Code Block Wrapper

```html
<div class="code-block">
  <div class="code-header">
    <span>JavaScript</span>
    <button>Copy</button>
  </div>
  <div class="highlight">
    <pre><code>// Code here</code></pre>
  </div>
</div>
```

---

## Tooltip

```html
<span class="tooltip">
  Hover over me
  <span class="tooltip-text">Tooltip content</span>
</span>
```

---

## Usage Examples

### Blog Post Card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">
      <a href="/post/">How to Build a Jekyll Blog</a>
    </h3>
  </div>
  <div class="card-body">
    <div class="post-meta">
      <span class="meta-item">
        <time datetime="2025-11-02">November 2, 2025</time>
      </span>
      <span class="meta-separator">•</span>
      <span class="meta-item">5 min read</span>
    </div>
    <p>Learn how to set up and customize your own Jekyll blog...</p>
    <div class="tag-list">
      <span class="tag">Jekyll</span>
      <span class="tag">Tutorial</span>
    </div>
  </div>
  <div class="card-footer">
    <a href="/post/" class="read-more">Read more</a>
  </div>
</div>
```

### Call-to-Action Section

```html
<div class="container-narrow text-center">
  <h2>Subscribe to My Newsletter</h2>
  <p class="text-muted">Get the latest posts delivered right to your inbox.</p>
  <form>
    <input type="email" placeholder="your@email.com">
    <button type="submit" class="btn btn-primary">Subscribe</button>
  </form>
</div>
```

### Feature Grid

```html
<div class="container">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
    <div class="card">
      <div class="card-body">
        <h3>Fast</h3>
        <p>Lightning-fast page loads</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h3>Secure</h3>
        <p>Built with security in mind</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h3>Accessible</h3>
        <p>WCAG 2.1 AA compliant</p>
      </div>
    </div>
  </div>
</div>
```

### Author Bio

```html
<div class="card">
  <div class="card-body" style="display: flex; gap: 1rem; align-items: center;">
    <div class="avatar avatar-large">
      <img src="/assets/images/avatar.jpg" alt="Author Name">
    </div>
    <div>
      <h4 style="margin: 0;">Author Name</h4>
      <p class="text-muted" style="margin: 0;">Software Developer & Writer</p>
      <div class="social-icons" style="margin-top: 0.5rem;">
        <!-- Social links -->
      </div>
    </div>
  </div>
</div>
```

---

## Combining Classes

Classes can be combined for more complex layouts:

```html
<!-- Centered narrow container with card -->
<div class="container-narrow">
  <div class="card">
    <div class="card-body text-center">
      <h2>Welcome!</h2>
      <p class="text-muted">Start reading my latest posts.</p>
      <a href="/archive/" class="btn btn-primary">Browse All Posts</a>
    </div>
  </div>
</div>
```

---

## Custom Styling

You can add inline styles or custom classes for one-off needs:

```html
<!-- Custom spacing -->
<div style="margin-top: 3rem; margin-bottom: 2rem;">
  <p>Content with custom spacing</p>
</div>

<!-- Custom colors (use sparingly) -->
<div style="background-color: #f8fafc; padding: 2rem; border-radius: 0.5rem;">
  <p>Content with custom background</p>
</div>
```

---

## Best Practices

1. **Use semantic HTML** - Choose the right HTML element first
2. **Prefer existing classes** - Use theme classes before adding custom styles
3. **Maintain consistency** - Follow the established design patterns
4. **Test responsively** - Check on mobile, tablet, and desktop
5. **Accessibility first** - Always include proper ARIA labels and alt text
6. **Keep it simple** - Don't over-complicate the markup

---

## Notes

- All classes are defined in `/Users/ybang_mac/Development/blog/assets/css/_sass/`
- Colors and spacing use Sass variables for consistency
- Most components are responsive by default
- Focus states are automatically applied for keyboard navigation
- All interactive elements have proper hover states

---

For more details on the design system, see `DESIGN-SYSTEM.md`.
For complete theme documentation, see `THEME-SETUP.md`.
