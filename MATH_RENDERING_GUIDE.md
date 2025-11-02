# Math Rendering Guide - MathJax 3

This document provides complete documentation for the math rendering system in this Jekyll blog.

## Table of Contents

1. [Quick Start](#quick-start)
2. [System Overview](#system-overview)
3. [Configuration Details](#configuration-details)
4. [Writing Math in Posts](#writing-math-in-posts)
5. [Performance Optimization](#performance-optimization)
6. [Troubleshooting](#troubleshooting)
7. [Browser Compatibility](#browser-compatibility)
8. [Accessibility Features](#accessibility-features)
9. [Advanced Usage](#advanced-usage)
10. [Migration Guide](#migration-guide)

---

## Quick Start

### For Content Writers

1. **Add front matter to your post:**
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   math: true  # Enable math rendering
   ---
   ```

2. **Write inline math with single dollar signs:**
   ```latex
   The equation $E = mc^2$ is famous.
   ```

3. **Write display math with double dollar signs:**
   ```latex
   $$
   \int_a^b f(x)\,dx = F(b) - F(a)
   $$
   ```

4. **Test locally:**
   ```bash
   bundle exec jekyll serve
   # Visit http://localhost:4000
   # Check browser console for errors
   ```

That's it! See the [sample post](/Users/ybang_mac/Development/blog/_posts/2025-11-02-math-rendering-examples.md) for extensive examples.

---

## System Overview

### Technology Stack

**Math Rendering Engine:** MathJax 3.2.2
- **Why MathJax?** Complete LaTeX support, better accessibility, copy-paste functionality
- **Why version 3?** 60-80% faster than v2, modern ES6 modules, better customization
- **Output Format:** SVG (scales perfectly, accessible, works everywhere)

**Markdown Processor:** Kramdown
- Preserves `$$` delimiters for MathJax to process
- GitHub Pages compatible
- No conflicts with math syntax

**CDN Strategy:**
- Primary: jsDelivr (fast, reliable)
- Fallback: cdnjs (automatic failover after 5 seconds)
- Both use SRI (Subresource Integrity) for security

### Architecture

```
┌─────────────────────────────────────────────┐
│ Post with math: true in front matter        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ _layouts/default.html                       │
│ {% include math.html %}                     │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ _includes/math.html                         │
│ • Loads MathJax config                      │
│ • Loads MathJax from CDN                    │
│ • Sets up fallback CDN                      │
│ • Applies custom styles                     │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ MathJax processes $...$ and $$...$$ blocks  │
│ Renders as SVG with accessibility markup    │
└─────────────────────────────────────────────┘
```

### File Structure

```
blog/
├── _config.yml                 # Kramdown math_engine settings
├── _includes/
│   └── math.html              # MathJax configuration and loading
├── _layouts/
│   └── default.html           # Includes math.html
├── _posts/
│   └── YYYY-MM-DD-title.md    # Posts with math: true
└── MATH_RENDERING_GUIDE.md    # This file
```

---

## Configuration Details

### _config.yml Settings

```yaml
kramdown:
  input: GFM
  math_engine: mathjax
  math_engine_opts:
    preview: true          # Show preview during rendering
    preview_as_code: true  # Preview as code block
```

**What these do:**
- `math_engine: mathjax` - Tells Kramdown to preserve `$$` for MathJax
- `preview: true` - Shows equation source while rendering (prevents FOUM)
- `preview_as_code: true` - Formats preview as code block

### MathJax Configuration

Located in `/Users/ybang_mac/Development/blog/_includes/math.html`

**Key Configuration Options:**

#### Delimiters
```javascript
inlineMath: [['$', '$'], ['\\(', '\\)']],
displayMath: [['$$', '$$'], ['\\[', '\\]']],
```
- Use `$...$` for inline math (recommended)
- Use `$$...$$` for display math (recommended)
- Alternative delimiters `\(...\)` and `\[...\]` also work

#### LaTeX Packages
```javascript
packages: {
  '[+]': ['ams', 'newcommand', 'configmacros', 'action']
}
```
- `ams` - AMS math symbols and environments
- `newcommand` - Custom macro definitions
- `configmacros` - Configuration-level macros
- `action` - Interactive features (tooltips, etc.)

#### Custom Macros

Pre-configured shortcuts for common notation:

```javascript
macros: {
  RR: "\\mathbb{R}",      // Real numbers: $\RR$
  NN: "\\mathbb{N}",      // Natural numbers: $\NN$
  ZZ: "\\mathbb{Z}",      // Integers: $\ZZ$
  QQ: "\\mathbb{Q}",      // Rationals: $\QQ$
  CC: "\\mathbb{C}",      // Complex numbers: $\CC$
  abs: ["\\left\\lvert #1 \\right\\rvert", 1],     // $\abs{x}$
  norm: ["\\left\\lVert #1 \\right\\rVert", 1],    // $\norm{v}$
  set: ["\\left\\{ #1 \\right\\}", 1],             // $\set{x > 0}$
  bra: ["\\left\\langle #1 \\right\\rvert", 1],    // $\bra{\psi}$
  ket: ["\\left\\lvert #1 \\right\\rangle", 1],    // $\ket{\phi}$
  braket: ["\\left\\langle #1 \\middle\\vert #2 \\right\\rangle", 2]  // $\braket{\psi}{\phi}$
}
```

**Add your own macros:**
```javascript
mycommand: "\\mathbf{#1}",  // Usage: $\mycommand{x}$
```

#### SVG Output Options
```javascript
svg: {
  fontCache: 'global',      // Cache fonts across pages
  scale: 1,                 // Default scale
  minScale: 0.5,            // Minimum scale on mobile
  matchFontHeight: true,    // Match surrounding text height
  mtextInheritFont: true,   // Inherit font for text in math
  displayAlign: 'center',   // Center display equations
}
```

#### Accessibility Options
```javascript
menuOptions: {
  settings: {
    assistiveMml: true,     // Hidden MathML for screen readers
    collapsible: false,     // Don't collapse equations
    explorer: true          // Enable interactive exploration
  }
}
```

---

## Writing Math in Posts

### Front Matter

**Required:** Add `math: true` to enable rendering:

```yaml
---
layout: post
title: "My Math Post"
date: 2025-11-02
math: true
---
```

**Without this, MathJax won't load** (improves performance on non-math posts).

### Inline Math

**Syntax:** `$...$`

**Example:**
```markdown
Einstein's equation $E = mc^2$ revolutionized physics.
```

**Renders as:** Einstein's equation $E = mc^2$ revolutionized physics.

**Tips:**
- No space after opening `$` or before closing `$`
- Use for math within sentences
- Keep it short (long expressions should be display math)

### Display Math

**Syntax:** `$$...$$` on separate lines

**Example:**
```markdown
The quadratic formula is:

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

This gives us the roots.
```

**Renders as:** Centered, larger equation on its own line.

**Tips:**
- Put `$$` on separate lines (blank line before and after)
- Use for important equations
- Better for complex expressions
- Automatically centered

### Common Patterns

#### Fractions
```latex
$\frac{a}{b}$           → a/b (inline)
$\frac{numerator}{denominator}$
```

#### Superscripts and Subscripts
```latex
$x^2$                   → x²
$x_i$                   → xᵢ
$x^{2n+1}$              → Use braces for multiple characters
$x_{i,j}$               → xᵢ,ⱼ
```

#### Greek Letters
```latex
$\alpha, \beta, \gamma, \delta$
$\Alpha, \Beta, \Gamma, \Delta$  (uppercase)
```

#### Integrals and Sums
```latex
$\int_a^b f(x)\,dx$              → ∫ₐᵇ f(x)dx (note the \, for spacing)
$\sum_{i=1}^n x_i$               → Σⁿᵢ₌₁ xᵢ
$\prod_{i=1}^n x_i$              → Πⁿᵢ₌₁ xᵢ
```

#### Matrices
```latex
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

#### Cases (Piecewise Functions)
```latex
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$
```

#### Aligned Equations
```latex
$$
\begin{align}
f(x) &= (x+1)^2 \\
&= x^2 + 2x + 1
\end{align}
$$
```

### Escaping Special Characters

**Problem:** Dollar signs in text
```markdown
The price is $100.
```

**Solution:** Escape with backslash
```markdown
The price is \$100.
```

**Other special characters:**
- `\$` → $
- `\%` → %
- `\#` → #
- `\&` → &
- `\_` → _
- `\{` → {
- `\}` → }

---

## Performance Optimization

### Load Time Analysis

**Without math (post has `math: false`):**
- MathJax not loaded
- Zero overhead
- Fast page load

**With math (post has `math: true`):**
- MathJax loads: ~100-150KB (gzipped)
- First load: ~200-300ms
- Cached: ~50ms
- Rendering: ~50-100ms per equation

### Best Practices

#### 1. Conditional Loading (Already Implemented)

Only posts with `math: true` load MathJax. This is automatic.

```yaml
---
math: true  # Only enable when needed
---
```

#### 2. Use Display Math for Complex Equations

**Slower (inline):**
```latex
The formula $\frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n-1}$ is complex.
```

**Faster (display):**
```latex
The formula is:
$$
s^2 = \frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n-1}
$$
```

**Why?** Display math renders in batches; inline math is processed one-by-one.

#### 3. Limit Inline Math

**Don't do this:**
```markdown
We have $x_1 = 1$, $x_2 = 2$, $x_3 = 3$, $x_4 = 4$, ...
```

**Better:**
```markdown
We have $x_1 = 1, x_2 = 2, x_3 = 3, x_4 = 4, \ldots$
```

#### 4. Async Loading (Already Implemented)

MathJax loads with `async` attribute - doesn't block page render.

#### 5. Font Caching (Already Implemented)

```javascript
fontCache: 'global'  // Fonts cached across all pages
```

### Performance Monitoring

Check browser console after page load:

```
MathJax 3 loaded and ready
MathJax rendering complete
```

**Measure rendering time:**
```javascript
// Open browser console on a math page
performance.getEntriesByType('resource')
  .filter(r => r.name.includes('mathjax'))
  .forEach(r => console.log(`${r.name}: ${r.duration}ms`));
```

### CDN Fallback

If primary CDN (jsDelivr) fails, automatically loads from fallback (cdnjs) after 5 seconds.

**To test fallback:**
1. Open browser DevTools → Network tab
2. Block requests to `cdn.jsdelivr.net`
3. Reload page
4. After 5 seconds, fallback loads from `cdnjs.cloudflare.com`

---

## Troubleshooting

### Math Not Rendering

**Symptom:** Raw LaTeX visible: `$x^2 + y^2 = r^2$`

**Checklist:**

1. **Check front matter:**
   ```yaml
   math: true  # Must be present
   ```

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors
   - Should see: "MathJax 3 loaded and ready"

3. **Check CDN loading:**
   - Network tab → Filter "mathjax"
   - Should show 200 status
   - If blocked, fallback should activate

4. **Check syntax:**
   ```latex
   $x^2$     ✓ Correct
   $ x^2$    ✗ Space after $
   $x^2 $    ✗ Space before $
   $$x^2$$   ✗ Display math needs blank lines
   ```

5. **Check Kramdown conflicts:**
   - Don't use `~~~math` code blocks
   - Use `$$...$$` directly in markdown

### Common Syntax Errors

#### 1. Unbalanced Delimiters

**Error:**
```latex
$\left( \frac{x}{y}$
```

**Fix:** Match `\left` with `\right`
```latex
$\left( \frac{x}{y} \right)$
```

#### 2. Special Characters Not Escaped

**Error:**
```latex
$f(x) = 100$  (if 100$ is in text)
```

**Fix:**
```latex
$f(x) = 100\text{ dollars}$
```

#### 3. Missing Backslashes

**Error:**
```latex
$sum_{i=1}^n x_i$
```

**Fix:**
```latex
$\sum_{i=1}^n x_i$
```

#### 4. Underscore in Text Mode

**Error:**
```latex
$x_variable_name$
```

**Fix:** Use braces or text mode
```latex
$x_{\text{variable\_name}}$
```

### Mobile Rendering Issues

**Symptom:** Equations overflow screen

**Already handled by CSS:**
```css
mjx-container[display="true"] {
  overflow-x: auto;
  max-width: 100%;
}
```

**If still overflowing:**
1. Break long equations into multiple lines
2. Use `align` environment
3. Reduce equation complexity

**Example:**
```latex
$$
\begin{align}
\text{Long expression} &= \text{part 1} \\
&\quad + \text{part 2} \\
&\quad + \text{part 3}
\end{align}
$$
```

### Dark Mode Issues

**Symptom:** Equations invisible in dark mode

**Already handled:**
```css
mjx-container svg {
  color: inherit;  /* Inherits text color from theme */
}
```

**If not working:**
- Check your theme's dark mode implementation
- Ensure body text color changes in dark mode
- MathJax will automatically match

### Copy-Paste Not Working

**Symptom:** Can't copy equation as LaTeX

**Solution:**
1. Right-click the equation
2. Select "Copy to Clipboard" → "LaTeX Command"
3. Paste

**Menu options:**
- Copy as LaTeX
- Copy as MathML
- Copy as SVG
- Show math as (various formats)

### Performance Issues

**Symptom:** Page loads slowly with math

**Diagnosis:**
```javascript
// In browser console
performance.timing.loadEventEnd - performance.timing.navigationStart
```

**Solutions:**
1. Reduce number of inline equations
2. Use display math for complex equations
3. Check if CDN is slow (try different network)
4. Consider using KaTeX for specific posts (faster but less features)

---

## Browser Compatibility

### Supported Browsers

✅ **Fully Supported:**
- Chrome 90+ (desktop & mobile)
- Firefox 88+ (desktop & mobile)
- Safari 14+ (desktop & mobile)
- Edge 90+
- Opera 75+

✅ **Mostly Supported:**
- Internet Explorer 11 (with polyfills, not recommended)
- Older Android browsers (4.4+)
- Samsung Internet 14+

### Browser-Specific Notes

#### Chrome/Edge
- Best performance
- Full SVG support
- Copy-paste works perfectly

#### Firefox
- Excellent rendering quality
- Slightly slower than Chrome
- Full feature support

#### Safari
- Good performance
- Some font rendering differences (minor)
- iOS Safari fully supported

#### Mobile Browsers
- Touch gestures work
- Right-click → long press
- Zoom supported
- Responsive by default

### Testing on Multiple Browsers

**Quick test:**
1. Open post with math on each browser
2. Check console for errors
3. Test copy-paste functionality
4. Test on mobile viewport
5. Test dark mode (if applicable)

**Test URLs:**
- Chrome: chrome://version
- Firefox: about:support
- Safari: about:

---

## Accessibility Features

### Screen Reader Support

**Built-in features:**
- Hidden MathML generated for each equation
- ARIA labels automatically added
- Semantic markup for assistive technology

**Testing:**
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate to equation
3. Should read as: "Equation: [LaTeX or spoken math]"

**Configuration:**
```javascript
assistiveMml: true  // Generates hidden MathML
```

### Keyboard Navigation

**Built-in:**
- Tab to equation
- Enter to explore
- Arrow keys to navigate subexpressions

**Enable explorer:**
```javascript
explorer: true  // Already enabled in config
```

### Color Contrast

**Automatic:**
- Math inherits text color from theme
- High contrast mode supported
- Respects user browser settings

**Manual override (if needed):**
```css
mjx-container {
  color: #000 !important;  /* Force black in light mode */
}

@media (prefers-color-scheme: dark) {
  mjx-container {
    color: #fff !important;  /* Force white in dark mode */
  }
}
```

### Right-Click Context Menu

**Features:**
- Copy equation in multiple formats
- Show as different notations
- Accessibility settings
- Zoom controls

**Enable:**
```javascript
enableMenu: true  // Already enabled
```

---

## Advanced Usage

### Custom Macros

**Add to `/Users/ybang_mac/Development/blog/_includes/math.html`:**

```javascript
macros: {
  // Existing macros...

  // Add your custom macros here:
  differential: ["\\frac{d #1}{d #2}", 2],  // \differential{y}{x}
  partiald: ["\\frac{\\partial #1}{\\partial #2}", 2],  // \partiald{f}{x}
  expect: ["\\mathbb{E}\\left[#1\\right]", 1],  // \expect{X}
  var: ["\\text{Var}\\left(#1\\right)", 1],  // \var{X}
}
```

**Usage in posts:**
```latex
The derivative $\differential{y}{x}$ and partial $\partiald{f}{x}$ are useful.

The expected value $\expect{X^2}$ and variance $\var{X}$ are key statistics.
```

### Physics Notation

**Add Dirac notation (already included):**
```javascript
macros: {
  bra: ["\\left\\langle #1 \\right\\rvert", 1],
  ket: ["\\left\\lvert #1 \\right\\rangle", 1],
  braket: ["\\left\\langle #1 \\middle\\vert #2 \\right\\rangle", 2],
  ketbra: ["\\left\\lvert #1 \\middle\\rangle\\middle\\langle #2 \\right\\rvert", 2],
}
```

**Usage:**
```latex
State: $\ket{\psi}$, dual: $\bra{\phi}$, inner product: $\braket{\phi}{\psi}$
```

### Chemistry Notation

**Add chemical equations:**
```javascript
// Requires mhchem extension (not included by default)
loader: {
  load: ['[tex]/mhchem']
},
tex: {
  packages: {
    '[+]': ['mhchem']
  }
}
```

**Usage:**
```latex
$$
\ce{CO2 + H2O -> H2CO3}
$$
```

### Code Highlighting with Math

**Syntax:**
````markdown
```python
# Calculate discriminant
discriminant = b**2 - 4*a*c  # This is $b^2 - 4ac$ in LaTeX
```
````

**Note:** Math inside code blocks is NOT rendered (as expected).

### Conditional Rendering

**Render only specific sections:**
```html
<div class="math-enabled">
  This area processes math: $x^2$
</div>

<div class="no-math">
  This area ignores math: $x^2$ (renders literally)
</div>
```

### Manual Re-rendering

**If dynamically adding equations with JavaScript:**
```javascript
// After adding new math content:
MathJax.typesetPromise([document.getElementById('new-content')])
  .then(() => console.log('New math rendered'))
  .catch((err) => console.error('Rendering failed:', err));
```

---

## Migration Guide

### From MathJax 2 to MathJax 3

**Already done for you**, but for reference:

**Old (v2):**
```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
```

**New (v3):**
```html
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
```

**Configuration changes:**
- `MathJax.Hub.Config()` → `window.MathJax = { ... }`
- Config must be set BEFORE loading script
- Different CDN URL structure

**Most LaTeX syntax unchanged** - your posts will work as-is.

### From KaTeX to MathJax

**If migrating from KaTeX:**

1. Replace KaTeX include with MathJax include
2. Update front matter (still `math: true`)
3. Test posts - most LaTeX works identically
4. Check for KaTeX-specific syntax (rare)

**Advantages gained:**
- More LaTeX features
- Better accessibility
- Copy-paste functionality

**Trade-offs:**
- Slightly slower (but v3 is fast)
- Larger bundle size

### From Server-Side Rendering

**If previously using Jekyll plugins:**

1. Remove server-side math plugins from `_config.yml`
2. Add `math: true` to posts
3. Let MathJax handle rendering client-side

**Advantages:**
- Works with GitHub Pages (no custom plugins)
- Faster build times
- More flexible configuration

---

## Reference

### File Locations

- **Configuration:** `/Users/ybang_mac/Development/blog/_includes/math.html`
- **Kramdown settings:** `/Users/ybang_mac/Development/blog/_config.yml`
- **Sample post:** `/Users/ybang_mac/Development/blog/_posts/2025-11-02-math-rendering-examples.md`
- **This guide:** `/Users/ybang_mac/Development/blog/MATH_RENDERING_GUIDE.md`

### External Resources

- [MathJax Documentation](https://docs.mathjax.org/en/latest/)
- [LaTeX Mathematics](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)
- [MathJax Accessibility](https://docs.mathjax.org/en/latest/basic/accessibility.html)

### Quick Command Reference

```bash
# Build site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Serve with drafts
bundle exec jekyll serve --drafts

# Check for errors
bundle exec jekyll doctor

# Clean build artifacts
bundle exec jekyll clean
```

### Support

**If you encounter issues:**
1. Check this guide's troubleshooting section
2. Check browser console for error messages
3. Verify CDN is loading (Network tab)
4. Test with sample post
5. Check MathJax documentation for specific LaTeX commands

---

## Changelog

### 2025-11-02 - Initial Setup
- Implemented MathJax 3.2.2
- Configured SVG output
- Added custom macros
- Set up conditional loading
- Created sample post
- Wrote comprehensive documentation

---

**Happy math writing!** This system is production-ready and optimized for your academic and technical content needs.
