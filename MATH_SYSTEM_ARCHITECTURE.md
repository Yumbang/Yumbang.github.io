# Math Rendering System Architecture

Visual documentation of how the math rendering system works.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER WRITES POST                        │
│                                                                   │
│  ---                                                             │
│  layout: post                                                    │
│  title: "My Math Post"                                          │
│  math: true              ← ENABLES MATH RENDERING               │
│  ---                                                             │
│                                                                   │
│  The equation $E = mc^2$ is famous.                             │
│                                                                   │
│  $$                                                              │
│  \int_a^b f(x)\,dx = F(b) - F(a)                               │
│  $$                                                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Jekyll Build Process
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      KRAMDOWN PROCESSOR                          │
│                                                                   │
│  • Reads markdown content                                       │
│  • Converts to HTML                                             │
│  • Preserves $...$ and $$...$$ (math_engine: mathjax)          │
│  • Applies syntax highlighting                                  │
│  • Generates page structure                                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Generated HTML
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LAYOUT: default.html                         │
│                                                                   │
│  <!DOCTYPE html>                                                │
│  <html>                                                         │
│    {% include head.html %}                                      │
│    <body>                                                       │
│      {% include header.html %}                                  │
│      <main>{{ content }}</main>                                 │
│      {% include footer.html %}                                  │
│                                                                   │
│      {% include math.html %}    ← MATH RENDERING INCLUDED       │
│    </body>                                                      │
│  </html>                                                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Conditional Check: if page.math
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    _includes/math.html                           │
│                                                                   │
│  {% if page.math %}                                             │
│    <script>                                                     │
│      window.MathJax = {                                         │
│        tex: {                                                   │
│          inlineMath: [['$', '$']],                             │
│          displayMath: [['$$', '$$']],                          │
│          macros: { ... }                                        │
│        },                                                       │
│        svg: { ... },                                            │
│        options: { accessibility: true }                         │
│      };                                                         │
│    </script>                                                    │
│                                                                   │
│    <script src="https://cdn.jsdelivr.net/.../tex-svg.js">     │
│    </script>                                                    │
│                                                                   │
│    <style> /* Math-specific CSS */ </style>                    │
│  {% endif %}                                                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ If math: true → Load MathJax
                            │ If math: false → Skip (fast page load)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BROWSER RENDERING                           │
│                                                                   │
│  1. HTML renders                                                │
│  2. MathJax script loads asynchronously (if math: true)        │
│  3. MathJax finds $...$ and $$...$$ in page                    │
│  4. Converts LaTeX to SVG                                       │
│  5. Inserts rendered equations                                  │
│  6. Adds accessibility markup (hidden MathML)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Interaction Diagram

```
┌──────────────┐
│  User Post   │ (markdown file)
└──────┬───────┘
       │ has front matter: math: true
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│               Jekyll Configuration (_config.yml)         │
│                                                           │
│  kramdown:                                               │
│    math_engine: mathjax                                  │
│    math_engine_opts:                                     │
│      preview: true                                       │
└──────────────────────────┬───────────────────────────────┘
                           │ Tells Kramdown to preserve $$
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                   Kramdown Markdown Processor             │
│                                                           │
│  Input:   The equation $E = mc^2$ is...                 │
│                                                           │
│  Output:  <p>The equation $E = mc^2$ is...</p>          │
│           (preserves $ delimiters)                       │
└──────────────────────────┬───────────────────────────────┘
                           │ HTML with preserved math
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              Layout System (default.html)                 │
│                                                           │
│  Wraps content in site structure                         │
│  Includes header, footer, navigation                     │
│  Includes math.html (conditional rendering)              │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │
          ┌────────────────┴────────────────┐
          │                                  │
    page.math = true              page.math = false/unset
          │                                  │
          ▼                                  ▼
┌─────────────────────┐           ┌──────────────────┐
│  Math Rendering ON  │           │  Math Skipped    │
│                     │           │                  │
│  Loads:             │           │  • No MathJax    │
│  • MathJax config   │           │  • Faster load   │
│  • MathJax CDN      │           │  • $ literal     │
│  • Custom styles    │           └──────────────────┘
│  • Fallback CDN     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│                    MathJax 3 Engine                      │
│                                                          │
│  Process:                                               │
│  1. Wait for DOM ready                                  │
│  2. Scan page for $...$ and $$...$$ patterns           │
│  3. Parse LaTeX syntax                                  │
│  4. Convert to internal format                          │
│  5. Render as SVG                                       │
│  6. Insert into DOM                                     │
│  7. Add assistive MathML (hidden)                       │
│  8. Enable copy-paste menu                              │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Final Rendered Page                    │
│                                                          │
│  <p>The equation                                        │
│    <mjx-container>                                      │
│      <svg>...</svg>  ← Beautiful equation              │
│      <mjx-assistive-mml>                               │
│        <math>...</math>  ← Screen reader content       │
│      </mjx-assistive-mml>                              │
│    </mjx-container>                                     │
│  is famous.</p>                                         │
└─────────────────────────────────────────────────────────┘
```

---

## CDN Loading Strategy

```
Browser requests page
        │
        ▼
┌───────────────────────┐
│  Page HTML loads      │
│  (MathJax not yet)    │
└───────┬───────────────┘
        │
        │ Async script tag
        │
        ▼
┌────────────────────────────────────────────┐
│  Primary CDN: cdn.jsdelivr.net             │
│  • Attempt to load MathJax                 │
│  • Verify SRI hash                         │
│  • Timeout: 5 seconds                      │
└────────┬────────────────────┬──────────────┘
         │                    │
    Success ✓            Failure ✗
         │                    │
         │                    ▼
         │          ┌──────────────────────────┐
         │          │  Fallback CDN:           │
         │          │  cdnjs.cloudflare.com    │
         │          │  • Load from backup      │
         │          │  • Verify SRI hash       │
         │          │  • Ensure availability   │
         │          └──────┬───────────────────┘
         │                 │
         └─────────┬───────┘
                   │
                   ▼
         ┌─────────────────────┐
         │  MathJax Loaded     │
         │  • Execute config   │
         │  • Initialize       │
         │  • Process math     │
         └─────────────────────┘
```

---

## Data Flow: From LaTeX to SVG

```
USER WRITES:
  $E = mc^2$

     │
     │ Markdown file saved
     ▼

KRAMDOWN PRESERVES:
  <p>$E = mc^2$</p>

     │
     │ HTML generated
     ▼

BROWSER RECEIVES:
  <p>$E = mc^2$</p>

     │
     │ MathJax scans page
     ▼

MATHJAX PARSES LaTeX:
  E = mc^2
  └─ E: identifier
  └─ =: relation
  └─ m: identifier
  └─ c: identifier
  └─ ^2: superscript
     └─ 2: number

     │
     │ Convert to math tree
     ▼

MATHJAX LAYOUTS:
  • Calculate positions
  • Determine sizes
  • Apply spacing rules
  • Handle font metrics

     │
     │ Generate SVG
     ▼

MATHJAX RENDERS SVG:
  <mjx-container>
    <svg viewBox="..." style="...">
      <g transform="...">
        <text>E</text>
        <text>=</text>
        <text>m</text>
        <text>c</text>
        <text style="font-size:0.7em">2</text>
      </g>
    </svg>
  </mjx-container>

     │
     │ Insert into DOM
     ▼

USER SEES:
  Beautiful rendered equation: E = mc²
```

---

## Configuration Flow

```
┌────────────────────────────────────────────────────────────┐
│                   window.MathJax = { ... }                 │
│                                                             │
│  This configuration MUST be set BEFORE loading the script  │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  tex: {                                                     │
│    inlineMath: [['$', '$'], ['\\(', '\\)']],              │
│    displayMath: [['$$', '$$'], ['\\[', '\\]']],           │
│                                                             │
│    Defines what MathJax looks for in HTML                  │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  svg: {                                                     │
│    fontCache: 'global',    ← Fonts cached across pages     │
│    scale: 1,               ← Default size                  │
│    displayAlign: 'center', ← Center display equations      │
│  }                                                          │
│                                                             │
│  Controls SVG output format                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  options: {                                                 │
│    enableMenu: true,        ← Right-click menu             │
│    menuOptions: {                                           │
│      settings: {                                            │
│        assistiveMml: true,  ← Screen reader support        │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                             │
│  Accessibility and user interaction settings                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  macros: {                                                  │
│    RR: "\\mathbb{R}",    ← \RR expands to \mathbb{R}      │
│    abs: ["\\left\\lvert #1 \\right\\rvert", 1],          │
│    ...                                                      │
│  }                                                          │
│                                                             │
│  Custom shortcuts for common notation                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Conditional Loading Logic

```
┌─────────────────────────────────────┐
│  Jekyll processes layout            │
│  {% include math.html %}            │
└────────────┬────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────┐
│  Liquid checks: {% if page.math %}       │
└────────┬─────────────────┬───────────────┘
         │                 │
    page.math = true   page.math = false/unset
         │                 │
         ▼                 ▼
┌────────────────┐   ┌─────────────────┐
│ Load MathJax   │   │ Skip everything │
│                │   │                 │
│ • Config       │   │ Output: (empty) │
│ • CDN script   │   │                 │
│ • Styles       │   │ Result: Fast    │
│ • Fallback     │   │ page load, no   │
│                │   │ math overhead   │
│ Result: Math   │   └─────────────────┘
│ renders        │
└────────────────┘

This conditional loading ensures:
  • Non-math pages load fast (no MathJax)
  • Math pages get full rendering support
  • No manual script management needed
  • Automatic per-post optimization
```

---

## Performance Timeline

```
0ms
│
├─ Page HTML arrives
│
├─ CSS loads
│
├─ JavaScript starts (async, non-blocking)
│
├─ Page renders with raw LaTeX ($E = mc^2$)
│  └─ User sees content immediately
│
100ms
│
├─ MathJax CDN loaded
│
├─ MathJax configuration executes
│
├─ MathJax scans page for math
│
200ms
│
├─ MathJax processes first equations
│
├─ SVG rendering begins
│
├─ Equations replace LaTeX source
│  └─ Smooth transition (no flash)
│
300ms
│
├─ All equations rendered
│
├─ Assistive MathML added
│
├─ Right-click menu enabled
│
├─ Page fully interactive
│
└─ Total: ~300ms for typical post

CACHED LOAD (subsequent visits):
0ms - 50ms: Much faster due to cached CDN
```

---

## Accessibility Pipeline

```
MathJax Renders Equation
        │
        ▼
┌─────────────────────────────────────────┐
│  Generated DOM Structure:               │
│                                          │
│  <mjx-container>                        │
│    <svg>                                │
│      <!-- Visual representation -->     │
│    </svg>                               │
│                                          │
│    <mjx-assistive-mml>                 │
│      <math>                             │
│        <!-- MathML for screen readers -->│
│      </math>                            │
│    </mjx-assistive-mml>                │
│  </mjx-container>                       │
└─────────────────┬───────────────────────┘
                  │
                  ├─► Visual Users: See SVG (beautiful rendering)
                  │
                  └─► Screen Reader Users: Read MathML
                      │
                      └─► Announces: "Equation: E equals m c squared"


CSS Ensures Separation:

.mjx-assistive-mml {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  /* Hidden from visual display */
  /* But accessible to screen readers */
}
```

---

## Mobile Responsiveness Flow

```
Desktop View (1920px wide)
┌────────────────────────────────────────────────────────────┐
│                                                             │
│  Text text text text text                                  │
│                                                             │
│              ┌────────────────────────┐                    │
│              │  E = mc²               │  ← Centered        │
│              └────────────────────────┘                    │
│                                                             │
│  More text text text                                       │
└─────────────────────────────────────────────────────────────┘


Tablet View (768px wide)
┌──────────────────────────────────────────────┐
│                                               │
│  Text text text text                         │
│                                               │
│         ┌────────────────────┐               │
│         │  E = mc²           │  ← Centered   │
│         └────────────────────┘               │
│                                               │
│  More text text                               │
└───────────────────────────────────────────────┘


Mobile View (375px wide)
┌────────────────────────────┐
│                             │
│  Text text text             │
│                             │
│  ┌────────────────────────┐│  ← Display equations
│  │  E = mc²               ││     may scroll if long
│  └────────────────────────┘│
│  ◄─────────────────────►   │  ← Horizontal scroll
│                             │     for long equations
│  More text                  │
└─────────────────────────────┘


CSS Handling:

@media (max-width: 480px) {
  mjx-container[display="true"] {
    overflow-x: auto;      /* Scroll if needed */
    font-size: 90%;        /* Slightly smaller */
    max-width: 100%;       /* Never break layout */
  }
}
```

---

## Error Handling Flow

```
┌─────────────────────────────────┐
│  MathJax attempts to load       │
└────────────┬────────────────────┘
             │
             ▼
      Primary CDN OK?
             │
        ┌────┴────┐
       Yes        No
        │          │
        │          ▼
        │    ┌──────────────────────┐
        │    │ Wait 5 seconds       │
        │    └──────┬───────────────┘
        │           │
        │           ▼
        │    ┌──────────────────────┐
        │    │ Try Fallback CDN     │
        │    └──────┬───────────────┘
        │           │
        │      ┌────┴────┐
        │     Yes        No
        │      │          │
        └──────┤          │
               │          ▼
               │    ┌──────────────────────┐
               │    │ Show raw LaTeX       │
               │    │ (graceful degradation)│
               │    └──────────────────────┘
               │
               ▼
        ┌─────────────────────┐
        │ MathJax Loaded      │
        └──────────┬──────────┘
               │
               ▼
        LaTeX Syntax Valid?
               │
          ┌────┴────┐
         Yes        No
          │          │
          │          ▼
          │    ┌─────────────────────┐
          │    │ Show error in place │
          │    │ of equation          │
          │    │ (red text in box)   │
          │    └─────────────────────┘
          │
          ▼
    ┌────────────────┐
    │ Render Success │
    └────────────────┘
```

---

## File Dependencies

```
_config.yml
    │
    ├─► kramdown: math_engine: mathjax
    │   (Tells Kramdown to preserve $$ delimiters)
    │
    └─► defaults: math: false
        (Default is no math for performance)

_layouts/default.html
    │
    └─► {% include math.html %}
        (Conditionally loads math rendering)

_includes/math.html
    │
    ├─► {% if page.math %}
    │   (Only loads if front matter has math: true)
    │
    ├─► <script>window.MathJax = {...}</script>
    │   (MathJax configuration)
    │
    ├─► <script src="cdn.jsdelivr.net/..."></script>
    │   (Primary CDN)
    │
    ├─► <script>/* fallback logic */</script>
    │   (Fallback CDN loader)
    │
    └─► <style>/* math CSS */</style>
        (Responsive and accessibility styles)

_posts/YYYY-MM-DD-post.md
    │
    └─► Front matter: math: true
        (Enables math rendering for this post)
```

---

## User Interaction Flow

```
User Visits Page
      │
      ▼
┌──────────────────────┐
│ Page Loads           │
│ • HTML renders       │
│ • MathJax loads      │
│ • Equations render   │
└──────┬───────────────┘
       │
       ├──► Read Content
       │    • Equations inline with text
       │    • Display math centered
       │    • Mobile: scroll long equations
       │
       ├──► Right-Click Equation
       │    │
       │    └─► Menu Appears
       │        │
       │        ├─► Copy as LaTeX
       │        ├─► Copy as MathML
       │        ├─► Copy as SVG
       │        ├─► Show Math As...
       │        ├─► Scale Equation
       │        └─► Accessibility Settings
       │
       ├──► Use Screen Reader
       │    │
       │    └─► Announces Equation
       │        • Reads hidden MathML
       │        • Speaks math naturally
       │        • Can explore subexpressions
       │
       └──► Share/Reference
            │
            └─► Copy equation source
                • Paste in own document
                • Share exact notation
                • Reference in discussion
```

---

## Build Process Integration

```
Local Development:
  bundle exec jekyll serve
        │
        ▼
  Jekyll watches files
        │
        ├─► _config.yml read
        ├─► _posts/*.md processed by Kramdown
        ├─► _layouts applied
        ├─► _includes inserted
        └─► _site/ generated
        │
        ▼
  Browser connects: localhost:4000
  LiveReload watches for changes
  Math renders in real-time


Production Deployment (GitHub Pages):
  git push origin main
        │
        ▼
  GitHub Actions triggered
        │
        ├─► Checkout code
        ├─► Set up Ruby
        ├─► bundle install
        ├─► bundle exec jekyll build
        │   │
        │   ├─► _config.yml
        │   ├─► Kramdown processes posts
        │   ├─► Layouts applied
        │   └─► _includes/math.html inserted
        │
        └─► Deploy to gh-pages branch
        │
        ▼
  Site live at username.github.io
  Math renders for all visitors
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Performance optimization (conditional loading)
- ✅ Reliability (CDN fallback)
- ✅ Accessibility (hidden MathML)
- ✅ Maintainability (clear component structure)
- ✅ Scalability (works for 1 or 1000 equations)
